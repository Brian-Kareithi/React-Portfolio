"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/app/components/ThemeProvider";
import { FiSun, FiMoon } from "react-icons/fi";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "techstack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "niche", label: "Niche", route: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [greeting, setGreeting] = useState({ text: "", icon: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const el = document.getElementById(sections[0].id);
    if (el) setActiveSection(sections[0].id);
  }, [pathname]);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let text = "";
      let icon = "";

      if (hour >= 5 && hour < 12) { text = "Good Morning"; icon = "☀️"; }
      else if (hour >= 12 && hour < 17) { text = "Good Afternoon"; icon = "🌤️"; }
      else { text = "Good Evening"; icon = "🌙"; }

      setGreeting({ text, icon });
    };
    updateGreeting();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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

    for (const s of sections) {
      if (!s.route) {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [pathname]);

  const navigateTo = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const section = sections.find((s) => s.id === sectionId);
    if (section?.route) {
      router.push(`/${sectionId}`);
      return;
    }
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`
          fixed z-[60] glass-nav
          transition-all duration-500 ease-out
          ${isScrolled ? "w-full top-0 left-0 right-0 rounded-none" : "w-[95%] top-2 xs:top-4 left-[2.5%] right-[2.5%] rounded-2xl"}
          before:absolute before:inset-0 before:rounded-inherit
          before:bg-gradient-to-br before:from-white/[0.03] before:via-transparent before:to-transparent
          before:content-[''] before:-z-10 before:opacity-0 hover:before:opacity-50
          before:transition-opacity before:duration-500
        `}
      >
          <div className="flex items-center justify-between w-full px-2 xs:px-3 sm:px-6 md:px-8 py-2.5 xs:py-3">
          <div className="flex items-center space-x-1.5 xs:space-x-2 min-w-0">
            <span className="text-sm xs:text-base md:text-lg flex-shrink-0">{greeting.icon}</span>
            <span className="font-medium truncate hidden xs:block text-xs xs:text-sm sm:text-sm md:text-base"
              style={{ color: "var(--color-text-primary)" }}>
              {greeting.text}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                className="relative px-3 md:px-4 lg:px-5 py-2 rounded-xl font-medium transition-all duration-300 overflow-hidden text-sm md:text-base"
                style={{
                  color: activeSection === section.id ? "var(--color-accent)" : "var(--color-text-secondary)",
                }}
                onClick={() => navigateTo(section.id)}
              >
                <span className="relative z-10">{section.label}</span>
                {activeSection === section.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[1px]"
                    style={{ backgroundColor: "var(--color-accent)" }} />
                )}
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-xl transition-all duration-300"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-1 xs:gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 xs:p-2 rounded-xl transition-all duration-300"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>

            <button className="flex flex-col items-center justify-center w-11 h-11 group -mr-1.5 xs:mr-0" onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
              <span className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
              <span className={`w-5 h-[1.5px] rounded-full transition-all duration-300 mt-[4px] ${isMobileMenuOpen ? "opacity-0" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
              <span className={`w-5 h-[1.5px] rounded-full transition-all duration-300 mt-[4px] ${isMobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
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
        <div className="flex flex-col h-full pt-14 xs:pt-16">
          <div className="flex items-center justify-between p-3 xs:p-4 border-b"
            style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center space-x-2 xs:space-x-3 min-w-0 flex-1 mr-2">
              <span className="text-lg xs:text-xl md:text-2xl flex-shrink-0">{greeting.icon}</span>
              <span className="font-medium text-xs xs:text-sm sm:text-base truncate" style={{ color: "var(--color-text-primary)" }}>
                {greeting.text}
              </span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-9 h-9 xs:w-10 xs:h-10 rounded-xl hover:liquid-glass transition-all duration-200 flex-shrink-0"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="Close menu">
              <svg className="w-4 h-4 xs:w-5 xs:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="p-3 xs:p-4 space-y-1 xs:space-y-1.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className="relative w-full text-left px-3 xs:px-4 py-3 xs:py-3.5 rounded-xl font-medium transition-all duration-300 overflow-hidden text-sm xs:text-base min-h-[44px] hover:liquid-glass active:scale-[0.98]"
                    style={{
                      color: activeSection === section.id ? "var(--color-accent)" : "var(--color-text-secondary)",
                    }}
                    onClick={() => navigateTo(section.id)}
                  >
                    <span className="relative z-10">{section.label}</span>
                    {activeSection === section.id && (
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[2px] h-3/5"
                        style={{ backgroundColor: "var(--color-accent)" }} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 xs:p-4 pt-0 mt-auto">
            <div className="text-center text-[10px] xs:text-xs"
              style={{ color: "var(--color-text-muted)" }}>
              Navigate through sections
            </div>
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
