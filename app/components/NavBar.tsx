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

  const navigateTo = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const section = sections.find((s) => s.id === sectionId);
    if (section?.route) {
      router.push(`/${sectionId}`);
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
          fixed z-50 glass-nav
          transition-all duration-500 ease-out
          ${isScrolled ? "w-full top-0 left-0 right-0 rounded-none" : "w-[95%] top-2 xs:top-4 left-[2.5%] right-[2.5%] rounded-2xl"}
          before:absolute before:inset-0 before:rounded-inherit
          before:bg-gradient-to-br before:from-white/[0.03] before:via-transparent before:to-transparent
          before:content-[''] before:-z-10 before:opacity-0 hover:before:opacity-50
          before:transition-opacity before:duration-500
        `}
      >
        <div className="flex items-center justify-between w-full px-3 xs:px-4 sm:px-6 md:px-8 py-2.5 xs:py-3">
          <div className="flex items-center space-x-2">
            <span className="text-base md:text-lg">{greeting.icon}</span>
            <span className="font-medium hidden sm:block text-sm md:text-base"
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

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-300"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>

            <button className="flex flex-col items-center justify-center w-10 h-10 group" onClick={toggleMobileMenu}
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
          fixed top-0 right-0 h-full z-50 glass-lg
          transform transition-transform duration-500 ease-in-out
          md:hidden
          w-[80vw] max-w-[320px] min-w-[260px]
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{
          borderLeft: "1px solid var(--color-glass-border-strong)",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 xs:p-5 border-b"
            style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center space-x-3 min-w-0">
              <span className="text-xl xs:text-2xl flex-shrink-0">{greeting.icon}</span>
              <span className="font-medium text-sm xs:text-lg truncate" style={{ color: "var(--color-text-primary)" }}>
                {greeting.text}
              </span>
            </div>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90 ml-2 flex-shrink-0"
              style={{ color: "var(--color-text-secondary)" }}
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="p-4 xs:p-5 space-y-2 xs:space-y-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className="relative w-full text-left px-3 xs:px-4 py-3.5 xs:py-4 rounded-xl font-medium transition-all duration-300 overflow-hidden text-sm xs:text-base min-h-[48px] hover:glass-sm"
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

          <div className="p-4 xs:p-5 pt-0 mt-auto">
            <div className="text-center text-xs xs:text-sm"
              style={{ color: "var(--color-text-muted)" }}>
              Navigate through sections
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden transition-all duration-500"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
