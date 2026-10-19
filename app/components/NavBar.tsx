"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { useCommandPalette } from "@/app/components/CommandPalette";
import useScrollProgress from "@/app/components/ui/useScrollProgress";
import { primaryNav, routes, externalLinks } from "@/app/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const { open: openPalette } = useCommandPalette();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      const raf = requestAnimationFrame(() => sheetRef.current?.querySelector<HTMLElement>("a")?.focus());
      const trap = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !sheetRef.current) return;
        const items = [menuBtnRef.current, ...sheetRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === items.length - 1 ? 0 : i + 1);
        e.preventDefault();
        items[next]?.focus();
      };
      window.addEventListener("keydown", trap);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("keydown", trap);
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      menuBtnRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useScrollProgress({
    onFrame: (progress) => {
      const bar = progressRef.current;
      if (bar) bar.style.transform = `scaleX(${progress})`;
    },
  });

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    setMenuOpen(false);
    if (path !== pathname || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="q-nav" data-scrolled={scrolled || undefined}>
        <div className="q-nav-shell">
        <nav className="q-nav-inner" aria-label="Primary">
          <Link href="/" onClick={(e) => onNavClick(e, "/")} className="q-wordmark" aria-label="Brian Kareithi, home">
            Brian Kareithi<i>.</i>
          </Link>

          <div className="q-nav-links">
            {primaryNav.map((r) => {
              const active = r.path === pathname;
              return (
                <Link
                  key={r.path}
                  href={r.path}
                  onClick={(e) => onNavClick(e, r.path)}
                  className="q-nav-link"
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                >
                  {r.label}
                </Link>
              );
            })}
          </div>

          <div className="q-nav-tools">
            <button onClick={openPalette} className="q-nav-icon q-only-small" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <button onClick={openPalette} className="q-nav-search" aria-label="Search the site (Ctrl+K)">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Search</span>
              <kbd>Ctrl K</kbd>
            </button>
            <button
              ref={menuBtnRef}
              aria-controls="mobile-menu"
              className="q-nav-icon q-burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span style={{ transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none" }} />
              <span style={{ transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </nav>
        <div className="q-progress" aria-hidden="true">
          <div ref={progressRef} />
        </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={sheetRef}
        className={`menu-sheet fixed inset-0 z-[55] lg:hidden transition-[opacity,visibility] duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="flex h-full flex-col overflow-y-auto px-4 pb-8 pt-20">
          <p className="q-eyebrow" style={{ marginBottom: "1rem" }}>Index</p>
          <ul className="flex-1">
            {routes.map((r, i) => {
              const active = r.path === pathname;
              return (
                <li
                  key={r.path}
                  style={{
                    transitionDelay: menuOpen ? `${i * 25 + 40}ms` : "0ms",
                    transform: menuOpen ? "none" : "translateY(12px)",
                    opacity: menuOpen ? 1 : 0,
                    transitionProperty: "opacity, transform",
                    transitionDuration: "0.3s",
                  }}
                >
                  <Link
                    href={r.path}
                    onClick={(e) => onNavClick(e, r.path)}
                    aria-current={active ? "page" : undefined}
                    className="group flex min-h-[44px] w-full items-baseline gap-4 border-b py-3 text-left"
                    style={{ borderColor: "var(--hairline-strong)" }}
                  >
                    <span className="index-num">{r.index}</span>
                    <span className="flex-1">
                      <span className="q-h3 block" style={{ color: active ? "var(--palette-berry)" : undefined }}>
                        {r.label}
                      </span>
                      <span className="q-small block">{r.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {externalLinks.filter((l) => l.href !== "/llms.txt").map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="field-label inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--color-accent)]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
