"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { externalLinks, routes } from "@/lib/navigation";

type PaletteItem =
  | { kind: "route"; label: string; sub: string; index: string; href: string }
  | { kind: "external"; label: string; sub: string; href: string };

/** Searchable list of pages and outside links. Mounted only while open, so every open starts fresh. */
export function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(true);

  useEffect(() => {
    const returnFocusTo = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      clearTimeout(timer);
      returnFocusTo?.focus?.();
    };
  }, []);

  const items = useMemo<PaletteItem[]>(
    () => [
      ...routes
        .filter((r) => r.path !== pathname)
        .map((r) => ({ kind: "route" as const, label: r.label, sub: r.description, index: r.index, href: r.path })),
      ...externalLinks.map((l) => ({ kind: "external" as const, label: l.label, sub: l.hint, href: l.href })),
    ],
    [pathname],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((it) => `${it.label} ${it.sub}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (item: PaletteItem | undefined) => {
    if (!item) return;
    if (item.kind === "route") router.push(item.href);
    else if (item.href.startsWith("mailto:") || item.href.startsWith("/")) window.location.assign(item.href);
    else window.open(item.href, "_blank", "noopener,noreferrer");
    onClose();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[active]);
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-[12vh]" role="presentation">
      <div
        className="absolute inset-0"
        onMouseDown={onClose}
        style={{ backgroundColor: "color-mix(in srgb, var(--palette-ink) 14%, transparent)", backdropFilter: "blur(8px) saturate(140%)" }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
        className="glass-panel relative w-full max-w-xl overflow-hidden rounded-3xl"
        style={{ background: "color-mix(in srgb, var(--palette-cream) 94%, transparent)", backdropFilter: "blur(24px) saturate(170%)", WebkitBackdropFilter: "blur(24px) saturate(170%)" }}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3.5" style={{ borderColor: "var(--color-border)" }}>
          <Search className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-text-muted)" }} />
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
            className="hidden rounded px-1.5 py-0.5 font-mono text-[11px] xs:block"
            style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
          >
            ESC
          </kbd>
        </div>

        <div ref={listRef} data-lenis-prevent className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
              Nothing matches “{query}”.
            </p>
          )}
          {filtered.map((item, i) => {
            const isActive = i === active;
            const ActiveIcon = item.kind === "external" ? ArrowUpRight : CornerDownLeft;
            return (
              <button
                key={`${item.kind}-${item.label}`}
                data-idx={i}
                onMouseMove={() => setActive(i)}
                onClick={() => run(item)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left"
                style={{ backgroundColor: isActive ? "var(--color-surface)" : "transparent" }}
              >
                <span
                  className="index-num w-7 flex-shrink-0 text-center"
                  style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-muted)" }}
                >
                  {item.kind === "route" ? item.index : "↗"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                    {item.label}
                  </span>
                  <span className="block truncate text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                    {item.sub}
                  </span>
                </span>
                {isActive && <ActiveIcon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-2.5" style={{ borderColor: "var(--color-border)" }}>
          <span className="field-label min-w-0">Brian Kareithi · index</span>
          <span className="flex items-center gap-2 font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>
            <span>↑↓ move</span>
            <span>↵ open</span>
          </span>
        </div>
      </div>
    </div>
  );
}
