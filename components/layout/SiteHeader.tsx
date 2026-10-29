"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useCommandPalette } from "@/components/command-palette/CommandPaletteProvider";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { primaryRoutes } from "@/lib/navigation";

/** Fixed top bar: wordmark, primary links, search, the mobile menu toggle and a reading progress bar. */
export function SiteHeader() {
  const pathname = usePathname();
  const { open: openPalette } = useCommandPalette();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollProgress((progress) => {
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /** Closes the menu, and turns a plain click on the current page's link into a scroll to the top. */
  const handleNavigate = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
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
            <Link href="/" onClick={(e) => handleNavigate(e, "/")} className="q-wordmark" aria-label="Brian Kareithi, home">
              Brian Kareithi<i>.</i>
            </Link>

            <div className="q-nav-links">
              {primaryRoutes.map((route) => {
                const isActive = route.path === pathname;
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={(e) => handleNavigate(e, route.path)}
                    className="q-nav-link"
                    data-active={isActive}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {route.label}
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
                ref={menuButtonRef}
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

      <MobileMenu open={menuOpen} onClose={closeMenu} onNavigate={handleNavigate} toggleRef={menuButtonRef} />
    </>
  );
}
