"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Command } from "lucide-react";
import { useCommandPalette } from "@/app/components/CommandPalette";
import useScrollProgress from "@/app/components/ui/useScrollProgress";
import { primaryNav, routes, externalLinks } from "@/app/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open: openPalette } = useCommandPalette();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false);
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
        className="fixed left-5 right-5 z-[60] mx-auto max-w-5xl overflow-hidden glass-nav transition-[top,box-shadow] duration-300 ease-out"
        style={{
          top: scrolled ? 8 : 14,
          borderColor: "var(--color-border)",
          borderRadius: 999,
          boxShadow: scrolled ? "3px 3px 0 var(--color-highlight)" : "none",
        }}
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4 pl-5 pr-2 sm:pl-6 h-14">
          <button
            onClick={() => go("/")}
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-70"
            aria-label="Brian Kareithi, home"
          >
            <Image src="/logo.png" alt="" width={112} height={34} className="h-8 w-auto" priority />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {primaryNav.map((r) => {
              const active = r.path === pathname;
              return (
                <button
                  key={r.path}
                  onClick={() => go(r.path)}
                  className="rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 hover:text-[var(--color-accent)]"
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
            <button
              onClick={openPalette}
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-medium transition-colors duration-200 hover:border-[var(--color-accent)]"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
              aria-label="Open command palette (Ctrl+K)"
            >
              <Command className="w-3 h-3" />
              <span className="font-mono">
                Ctrl <span className="ml-px rounded-sm px-1 py-px text-[10px]" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>K</span>
              </span>
            </button>

            <button
              className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
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
        className={`fixed inset-0 z-[55] md:hidden transition-[opacity,visibility] duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-20">
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
            {externalLinks.map((l) => (
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
      className="ml-1.5 inline-block rounded-full px-1.5 py-px align-middle text-[9px] font-semibold uppercase tracking-wider"
      style={{ backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }}
    >
      {label}
    </span>
  );
}
