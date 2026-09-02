"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/app/components/ThemeProvider";
import useScrollProgress from "@/app/components/ui/useScrollProgress";
import { Sun, Moon } from "lucide-react";

const sections = [
  { path: "/", label: "Home", description: "Overview and quick links" },
  { path: "/about", label: "About", description: "Journey, education & certifications" },
  { path: "/expertise", label: "Expertise", description: "Six skill domains" },
  { path: "/engineering", label: "Engineering", description: "How I build software" },
  { path: "/projects", label: "Work", description: "Selected projects" },
  { path: "/contact", label: "Contact", description: "Get in touch" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const activeSection = sections.find((section) => section.path === pathname)?.path ?? "";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useScrollProgress({
    onFrame: (progress) => {
      const bar = progressRef.current;
      if (!bar) return;
      bar.style.width = `${progress * 100}%`;
    },
  });

  const navigateTo = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push(path);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav ref={navRef} className="fixed z-[60] glass-nav w-[95%] top-3 left-[2.5%] right-[2.5%]">
        <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-8 py-2.5 xs:py-3">
          <div className="absolute bottom-0 left-4 right-4">
            <div ref={progressRef} className="h-[2px] w-0" style={{ backgroundColor: "var(--color-accent)" }} />
          </div>
          <button onClick={() => navigateTo("/")} className="transition-opacity duration-300 hover:opacity-70" aria-label="Go to home">
            <Image src="/logo.png" alt="Brian Kareithi — home" width={120} height={36} className="h-9 w-auto" priority />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.path}
                className="relative px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  color: activeSection === section.path ? "var(--color-accent)" : "var(--color-text-secondary)",
                }}
                onClick={() => navigateTo(section.path)}
              >
                {section.label}
                {activeSection === section.path && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1.5px] rounded-full"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                )}
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-lg transition-all duration-300 hover:opacity-70"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-300"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              className="flex flex-col items-center justify-center w-10 h-10 group"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`w-5 h-px rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-px" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }}
              />
              <span
                className={`w-5 h-px rounded-full transition-all duration-300 mt-[5px] ${isMobileMenuOpen ? "opacity-0" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }}
              />
              <span
                className={`w-5 h-px rounded-full transition-all duration-300 mt-[5px] ${isMobileMenuOpen ? "-rotate-45 -translate-y-px" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }}
              />
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
          backgroundColor: "var(--color-bg-secondary)",
          borderLeft: "1px solid var(--color-border-hover)",
        }}
      >
        <div className="flex flex-col h-full pt-16">
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--color-border)" }}>
            <span className="font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>
              Navigation
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="Close menu"
            >
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
                    className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
                    style={{
                      color: activeSection === section.path ? "var(--color-accent)" : "var(--color-text-secondary)",
                      backgroundColor: activeSection === section.path ? "var(--color-surface)" : "transparent",
                    }}
                    onClick={() => navigateTo(section.path)}
                  >
                    <span className="block text-sm font-medium">{section.label}</span>
                    <span className="block text-[10px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                      {section.description}
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                  onClick={() => navigateTo("/hobbies")}
                >
                  <span className="block">Homelab</span>
                  <span className="block text-[10px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    Gear, builds & lab experiments
                  </span>
                </button>
              </li>
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
