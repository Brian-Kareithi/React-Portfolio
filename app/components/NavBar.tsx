"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FileDown, Search } from "lucide-react";
import { useCommandPalette } from "@/app/components/CommandPalette";
import useScrollProgress from "@/app/components/ui/useScrollProgress";
import { primaryNav, routes, externalLinks } from "@/app/lib/nav";
import { siteConfig } from "@/app/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open: openPalette } = useCommandPalette();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
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

  const go = (path: string) => {
    setMenuOpen(false);
    if (path === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push(path);
  };

  return (
    <>
      <nav
        className={`fixed z-[60] mx-auto overflow-hidden glass-nav transition-[top,left,right,max-width,border-radius] duration-300 ease-out ${
          scrolled ? "left-0 right-0 max-w-full" : "left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 max-w-5xl"
        }`}
        style={{
          top: scrolled ? 0 : 14,
          borderColor: "var(--color-border)",
          borderWidth: scrolled ? "0 0 1px" : undefined,
          borderRadius: scrolled ? 0 : 12,
          boxShadow: "none",
        }}
        aria-label="Primary"
      >
        {/* Docked: the bar spans the viewport and its row lines up with the page content */}
        <div
          className={`flex items-center justify-between gap-4 h-14 ${
            scrolled ? "mx-auto box-content max-w-5xl px-4 sm:px-6 lg:px-8" : "pl-5 pr-2 sm:pl-6"
          }`}
        >
          <button
            onClick={() => go("/")}
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-70"
            aria-label="Brian Kareithi, home"
          >
            <Image src="/logo.png" alt="" width={112} height={34} className="h-8 w-auto" priority />
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {primaryNav.map((r) => {
              const active = r.path === pathname;
              return (
                <button
                  key={r.path}
                  onClick={() => go(r.path)}
                  className="rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style={{
                    color: active ? "var(--color-text-primary)" : "var(--color-text-muted)",
                    backgroundColor: active ? "var(--color-highlight)" : "transparent",
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  {r.label}
                  {r.tag && <NavTag label={r.tag} />}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            {/* One search entry point per breakpoint: icon on phones, labelled field from sm up */}
            <button
              onClick={openPalette}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:text-[var(--color-accent)] sm:hidden"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              onClick={openPalette}
              className="hidden h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-colors duration-200 hover:border-[var(--color-accent)] sm:flex"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
              aria-label="Search the site (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Search</span>
              <kbd className="ml-2 rounded border px-1.5 py-px font-mono text-[10px]" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>Ctrl K</kbd>
            </button>

            <span className="hidden sm:block">
              <a
                  href={siteConfig.resumePdf}
                  download
                  className="btn-neon btn-neon-primary !min-h-0 !px-3 !py-2 !text-[12px]"
                  aria-label="Download resume (PDF)"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Resume</span>
              </a>
            </span>

            <button
              className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className="h-px w-5 transition-transform duration-300"
                style={{ backgroundColor: "var(--color-text-primary)", transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none" }}
              />
              <span
                className="h-px w-5 transition-transform duration-300"
                style={{ backgroundColor: "var(--color-text-primary)", transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden" style={{ opacity: scrolled ? 1 : 0, transition: "opacity 0.3s ease" }}>
          <div
            ref={progressRef}
            className="h-full w-full origin-left"
            style={{ backgroundColor: "var(--color-accent)", transform: "scaleX(0)" }}
          />
        </div>
      </nav>

      {/* Mobile editorial overlay */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden transition-[opacity,visibility] duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col overflow-y-auto px-4 pb-8 pt-20">
          <p className="field-label mb-4">Index</p>
          <ul className="flex-1 space-y-1">
            {routes.map((r, i) => {
              const active = r.path === pathname;
              return (
                <li
                  key={r.path}
                  style={{
                    transitionDelay: menuOpen ? `${i * 35 + 60}ms` : "0ms",
                    transform: menuOpen ? "none" : "translateY(12px)",
                    opacity: menuOpen ? 1 : 0,
                    transitionProperty: "opacity, transform",
                    transitionTimingFunction: "ease, cubic-bezier(0.22,1,0.36,1)",
                    transitionDuration: "0.4s, 0.4s",
                  }}
                >
                  <button
                    onClick={() => go(r.path)}
                    className="group flex min-h-[44px] w-full items-baseline gap-4 border-b py-3 text-left"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span className="index-num" style={{ color: active ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                      {r.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className="block font-serif-accent text-3xl leading-tight sm:text-4xl"
                        style={{ color: active ? "var(--color-accent)" : "var(--color-text-primary)" }}
                      >
                        {r.label}
                        {r.tag && <NavTag label={r.tag} />}
                      </span>
                      <span className="block text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {r.description}
                      </span>
                    </span>
                  </button>
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
                className="field-label hover:text-[var(--color-accent)] transition-colors"
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

function NavTag({ label }: { label: string }) {
  return (
    <span
      className="ml-1.5 inline-block rounded-lg px-1.5 py-px align-middle text-[9px] font-semibold uppercase tracking-wider"
      style={{ backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }}
    >
      {label}
    </span>
  );
}
