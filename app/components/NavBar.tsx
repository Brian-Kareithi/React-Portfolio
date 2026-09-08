"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Sun, Moon, Command } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";
import { useCommandPalette } from "@/app/components/CommandPalette";
import useScrollProgress from "@/app/components/ui/useScrollProgress";
import { primaryNav, routes, externalLinks } from "@/app/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
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
        className="fixed inset-x-0 z-[60] glass-nav transition-[top,border-radius,box-shadow,border-color] duration-300 ease-out"
        style={{
          top: scrolled ? 0 : 12,
          left: scrolled ? 0 : 12,
          right: scrolled ? 0 : 12,
          borderColor: "var(--color-border)",
          borderRadius: scrolled ? 0 : "0.75rem",
          boxShadow: scrolled ? "none" : "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-14">
          <button
            onClick={() => go("/")}
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-70"
            aria-label="Brian Kareithi — home"
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
                  className="group relative px-3 py-2 text-[13px] font-medium transition-colors duration-200"
                  style={{ color: active ? "var(--color-text-primary)" : "var(--color-text-muted)" }}
                >
                  <span className="index-num mr-1.5 align-middle opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ color: "var(--color-accent)" }}>
                    {r.index}
                  </span>
                  {r.label}
                  <span
                    className="absolute -bottom-[1px] left-3 right-3 h-px origin-left transition-transform duration-300"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={openPalette}
              className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors duration-200 hover:border-[var(--color-accent)]"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
              aria-label="Open command palette (Ctrl+K)"
            >
              <Command className="w-3 h-3" />
              <span className="font-mono">
                Ctrl <span className="ml-px rounded-sm px-1 py-px text-[10px]" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>K</span>
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors duration-200 hover:text-[var(--color-accent)]"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              className="md:hidden relative flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
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
        <div className="flex h-full flex-col px-6 pt-20 pb-8 overflow-y-auto">
          <p className="field-label mb-6">Index</p>
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
                    className="group flex w-full items-baseline gap-4 border-b py-3.5 text-left"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span className="index-num" style={{ color: active ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                      {r.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className="block text-2xl font-bold tracking-tight"
                        style={{ color: active ? "var(--color-accent)" : "var(--color-text-primary)" }}
                      >
                        {r.label}
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
