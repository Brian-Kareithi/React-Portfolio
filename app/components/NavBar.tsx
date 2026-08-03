"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/app/components/ThemeProvider";
import useScrollProgress from "@/app/components/ui/useScrollProgress";
import { FiSun, FiMoon } from "react-icons/fi";

const sections = [
  { path: "/home", id: "home", label: "Home" },
  { path: "/about", id: "about", label: "About" },
  { path: "/techstack", id: "techstack", label: "Stack" },
  { path: "/projects", id: "projects", label: "Work" },
  { path: "/contact", id: "contact", label: "Contact" },
];

// The navbar background doubles as the scroll-progress indicator. These
// resolve against the active theme at paint time, so theme switches need
// no re-application.
const PROGRESS_DONE = "var(--color-glass-nav-done)";
const PROGRESS_BASE = "color-mix(in srgb, var(--color-glass-nav-bg) 36%, transparent)";
// Cooled glass left behind by the sweep (slightly less intense than the fill body).
const PROGRESS_TAIL = "color-mix(in srgb, var(--color-glass-nav-done) 80%, transparent)";
// White-hot peak at the leading edge.
const PROGRESS_HOT = "color-mix(in srgb, var(--color-accent-light) 6%, white)";
// Slightly brighter than the base glass, used to bleed glow ahead of the edge.
const PROGRESS_BLEED = "color-mix(in srgb, var(--color-glass-nav-bg) 55%, transparent)";
// Faint vertical reflection so the whole navbar reads as glass.
const PROGRESS_SHEEN = "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0) 45%, rgba(255,255,255,0.04))";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement | null>(null);
  const prevPctRef = useRef(0);

  useEffect(() => {
    if (pathname !== "/home") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // The navbar itself is the progress indicator. The filled region reads as
  // a light streak sweeping across the glass: the gradient ramps up from a
  // cooled tail at the start, brightening toward the leading edge, and peaks
  // in a sharp white-hot arrow point that falls off quickly ahead of it.
  // The hot band brightens slightly while scrolling fast. Styles are written
  // directly in the animation frame loop, so no React state or re-renders
  // are involved.
  useScrollProgress({
    from: pathname === "/home" ? "#home" : null,
    to: pathname === "/home" || pathname === "/contact" ? "#contact" : null,
    onFrame: (progress) => {
      const nav = navRef.current;
      if (!nav) return;
      const pct = progress * 100;
      const speed = Math.abs(pct - prevPctRef.current);
      prevPctRef.current = pct;
      const hotAlpha = Math.min(1, 0.86 + Math.min(speed, 7) * 0.02);
      const hot = `color-mix(in srgb, ${PROGRESS_HOT} ${(hotAlpha * 100).toFixed(0)}%, transparent)`;

      if (pct <= 0.01) {
        nav.style.background = `${PROGRESS_SHEEN}, linear-gradient(90deg, ${PROGRESS_BASE} 0%, ${PROGRESS_BASE} 100%)`;
        return;
      }
      if (pct >= 99.9) {
        nav.style.background = `${PROGRESS_SHEEN}, linear-gradient(90deg, ${PROGRESS_DONE} 0%, ${PROGRESS_DONE} 100%)`;
        return;
      }

      const fill = `linear-gradient(90deg, ${PROGRESS_TAIL} 0%, ${PROGRESS_DONE} calc(${pct.toFixed(3)}% - 18%), ${PROGRESS_DONE} calc(${pct.toFixed(3)}% - 12px), ${hot} calc(${pct.toFixed(3)}% - 5px), ${hot} calc(${pct.toFixed(3)}%), ${PROGRESS_BLEED} calc(${pct.toFixed(3)}% + 8px), ${PROGRESS_BASE} calc(${pct.toFixed(3)}% + 18px), ${PROGRESS_BASE} 100%)`;
      nav.style.background = `${PROGRESS_SHEEN}, ${fill}`;
    },
  });

  const displayActive = pathname === "/home"
    ? activeSection
    : sections.find((section) => section.path === pathname)?.id ?? "";

  const navigateTo = (path: string, id: string) => {
    setIsMobileMenuOpen(false);
    if (pathname === "/home") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    if (path === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push(path);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-[60] glass-nav w-[95%] top-3 left-[2.5%] right-[2.5%] rounded-2xl"
      >
        <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-8 py-2.5 xs:py-3">
          <button
            onClick={() => navigateTo("/home", "home")}
            className="transition-all duration-300 hover:scale-105"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Brian Kareithi"
              className="h-9 w-auto"
            />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.path}
                className="relative px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  color: displayActive === section.id ? "var(--color-accent)" : "var(--color-text-secondary)",
                }}
                onClick={() => navigateTo(section.path, section.id)}
              >
                {section.label}
                {displayActive === section.id && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1.5px] rounded-full"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                )}
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="w-3.5 h-3.5" /> : <FiMoon className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-300"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="w-3.5 h-3.5" /> : <FiMoon className="w-3.5 h-3.5" />}
            </button>

            <button className="flex flex-col items-center justify-center w-10 h-10 group" onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
              <span className={`w-5 h-px rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-px" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
              <span className={`w-5 h-px rounded-full transition-all duration-300 mt-[5px] ${isMobileMenuOpen ? "opacity-0" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
              <span className={`w-5 h-px rounded-full transition-all duration-300 mt-[5px] ${isMobileMenuOpen ? "-rotate-45 -translate-y-px" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`
          fixed top-0 right-0 h-full z-[70]
          transform transition-transform duration-500 ease-in-out
          md:hidden
          w-[75vw] xs:w-[70vw] sm:w-[65vw] max-w-[300px] min-w-[200px]
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-bg-primary) 80%, transparent)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderLeft: "1px solid var(--color-glass-border-strong)",
        }}
      >
        <div className="flex flex-col h-full pt-16">
          <div className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: "var(--color-border)" }}>
            <span className="font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>
              Navigation
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="Close menu">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.path}>
                  <button
                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      color: displayActive === section.id ? "var(--color-accent)" : "var(--color-text-secondary)",
                      backgroundColor: displayActive === section.id ? "var(--color-surface)" : "transparent",
                    }}
                    onClick={() => navigateTo(section.path, section.id)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[65] md:hidden transition-all duration-500"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-text-primary) 30%, transparent)" }}
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
