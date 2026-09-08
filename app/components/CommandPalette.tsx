"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowUpRight, CornerDownLeft, Search, SunMedium, MoonStar } from "lucide-react";
import { routes, externalLinks } from "@/app/lib/nav";
import { useTheme } from "@/app/components/ThemeProvider";

interface PaletteContextValue {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return ctx;
}

type Item =
  | { kind: "route"; label: string; sub: string; index: string; href: string }
  | { kind: "external"; label: string; sub: string; href: string }
  | { kind: "action"; label: string; sub: string; run: () => void };

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement;
    setQuery("");
    setActive(0);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => (isOpen ? close() : open()), [isOpen, open, close]);

  // Global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // Lock scroll + focus input while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
      returnFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  const items = useMemo<Item[]>(() => {
    const routeItems: Item[] = routes
      .filter((r) => r.path !== pathname)
      .map((r) => ({
        kind: "route" as const,
        label: r.label,
        sub: r.description,
        index: r.index,
        href: r.path,
      }));
    const externals: Item[] = externalLinks.map((l) => ({
      kind: "external" as const,
      label: l.label,
      sub: l.hint,
      href: l.href,
    }));
    const actions: Item[] = [
      {
        kind: "action" as const,
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        sub: "Toggle appearance",
        run: toggleTheme,
      },
    ];
    return [...routeItems, ...actions, ...externals];
  }, [pathname, theme, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.sub}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  const runItem = useCallback(
    (it: Item | undefined) => {
      if (!it) return;
      if (it.kind === "route") {
        router.push(it.href);
        close();
      } else if (it.kind === "external") {
        if (it.href.startsWith("mailto:") || it.href.startsWith("/")) {
          window.location.href = it.href;
        } else {
          window.open(it.href, "_blank", "noopener,noreferrer");
        }
        close();
      } else {
        it.run();
      }
    },
    [router, close]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(filtered[active]);
    } else if (e.key === "Tab") {
      // trap focus inside the dialog
      e.preventDefault();
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <PaletteContext.Provider value={{ open, close, toggle, isOpen }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] animate-overlay-fade"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-primary) 55%, transparent)", backdropFilter: "blur(4px)" }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={onKeyDown}
            className="relative w-full max-w-xl animate-palette-in overflow-hidden rounded-xl"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border-hover)",
            }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3.5 border-b"
              style={{ borderColor: "var(--color-border)" }}
            >
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-text-muted)" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Jump to a page, or search…"
                aria-label="Search pages and links"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--color-text-primary)" }}
              />
              <kbd
                className="hidden xs:block font-mono text-[10px] px-1.5 py-0.5 rounded"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
              >
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
                  Nothing matches “{query}”.
                </p>
              )}
              {filtered.map((it, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={`${it.kind}-${it.label}`}
                    data-idx={i}
                    onMouseMove={() => setActive(i)}
                    onClick={() => runItem(it)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-150"
                    style={{ backgroundColor: isActive ? "var(--color-surface)" : "transparent" }}
                  >
                    <span
                      className="index-num w-7 flex-shrink-0 text-center"
                      style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-muted)" }}
                    >
                      {it.kind === "route" ? it.index : it.kind === "action" ? "·" : "↗"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium truncate" style={{ color: "var(--color-text-primary)" }}>
                        {it.label}
                      </span>
                      <span className="block text-[11px] truncate" style={{ color: "var(--color-text-muted)" }}>
                        {it.sub}
                      </span>
                    </span>
                    {isActive &&
                      (it.kind === "external" ? (
                        <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                      ) : it.kind === "action" ? (
                        theme === "dark" ? (
                          <SunMedium className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                        ) : (
                          <MoonStar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                        )
                      ) : (
                        <CornerDownLeft className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                      ))}
                  </button>
                );
              })}
            </div>

            <div
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span className="field-label min-w-0">Brian Kareithi — index</span>
              <span className="flex items-center gap-2 font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                <span>↑↓ move</span>
                <span>↵ open</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </PaletteContext.Provider>
  );
}
