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
          fixed z-50
          transition-all duration-500 ease-out
          ${isScrolled ? "w-full top-0 left-0 right-0 rounded-none" : "w-[95%] top-4 left-[2.5%] right-[2.5%] rounded-2xl"}
          backdrop-blur-[1px]
          before:absolute before:inset-0 before:rounded-inherit
          before:bg-gradient-to-br before:from-white/[0.03] before:via-transparent before:to-transparent
          before:content-[''] before:-z-10 before:opacity-0 hover:before:opacity-50
          before:transition-opacity before:duration-500
          ${isScrolled ? "" : "border"}
        `}
        style={{
          backgroundColor: isScrolled ? "var(--color-bg-secondary)" : "var(--color-bg-card)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-8 py-3">
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

            <button className="flex flex-col space-y-1.5 p-2 group" onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
              <span className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
              <span className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
              <span className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`
          fixed top-0 right-0 h-full z-50
          transform transition-transform duration-500 ease-in-out
          backdrop-blur-[2px]
          md:hidden
          w-[85vw] max-w-[300px] min-w-[250px]
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          borderLeft: "1px solid var(--color-border)",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b"
            style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{greeting.icon}</span>
              <span className="font-medium text-lg" style={{ color: "var(--color-text-primary)" }}>
                {greeting.text}
              </span>
            </div>
            <button
              className="text-3xl p-1 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90 ml-2"
              style={{ color: "var(--color-text-secondary)" }}
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="p-5 space-y-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className="relative w-full text-left px-4 py-4 rounded-xl font-medium transition-all duration-300 overflow-hidden text-base"
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

          <div className="p-5 pt-0 mt-auto">
            <div className="text-center text-sm"
              style={{ color: "var(--color-text-muted)" }}>
              Navigate through sections
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden transition-all duration-500"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
