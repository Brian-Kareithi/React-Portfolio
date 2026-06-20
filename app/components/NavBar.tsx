"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/app/components/ThemeProvider";
import { FiSun, FiMoon, FiSearch, FiArrowRight } from "react-icons/fi";

const sections = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "techstack", label: "Tech Stack", path: "/techstack" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "contact", label: "Contact", path: "/contact" },
  { id: "niche", label: "Niche", path: "/niche" },
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
    const current = sections.find((s) => s.path === pathname);
    if (current) setActiveSection(current.id);
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
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (path: string) => {
    router.push(path, { scroll: false });
    setIsMobileMenuOpen(false);
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
        <div className="flex items-center justify-between w-full px-3 sm:px-4 md:px-5 py-1.5">
          <div className="flex items-center space-x-1.5">
            <span className="text-sm md:text-base">{greeting.icon}</span>
            <span className="font-medium hidden sm:block text-xs md:text-sm"
              style={{ color: "var(--color-text-primary)" }}>
              {greeting.text}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1.5">
            <SearchBar sections={sections} navigateTo={navigateTo} />

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-xl transition-all duration-300"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="w-3.5 h-3.5" /> : <FiMoon className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-xl transition-all duration-300"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="w-3.5 h-3.5" /> : <FiMoon className="w-3.5 h-3.5" />}
            </button>

            <button className="flex flex-col space-y-1 p-1.5 group" onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
              <span className={`w-4 h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
              <span className={`w-4 h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                style={{ backgroundColor: "var(--color-text-primary)" }} />
              <span className={`w-4 h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
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
          <div className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center space-x-2">
              <span className="text-xl">{greeting.icon}</span>
              <span className="font-medium text-base" style={{ color: "var(--color-text-primary)" }}>
                {greeting.text}
              </span>
            </div>
            <button
              className="text-2xl p-1 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90 ml-2"
              style={{ color: "var(--color-text-secondary)" }}
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className="relative w-full text-left px-3 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden text-sm"
                    style={{
                      color: activeSection === section.id ? "var(--color-accent)" : "var(--color-text-secondary)",
                    }}
                    onClick={() => navigateTo(section.path)}
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

          <div className="p-4 pt-0 mt-auto">
            <div className="text-center text-xs"
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

function SearchBar({ sections, navigateTo }: { sections: { id: string; label: string; path: string }[]; navigateTo: (path: string) => void }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = sections.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
    inputRef.current?.blur();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0 && filtered[activeIndex]) {
      navigateTo(filtered[activeIndex].path);
      close();
    } else if (e.key === "Escape") {
      close();
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all duration-300 cursor-text min-w-[160px]"
        style={{
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-muted)",
        }}
        onClick={() => {
          inputRef.current?.focus();
          setIsOpen(true);
        }}
      >
        <FiSearch className="w-3.5 h-3.5 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-xs w-full placeholder:text-inherit"
          style={{ color: "var(--color-text-primary)" }}
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl border"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            borderColor: "var(--color-border)",
          }}
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-2.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
              No results found
            </div>
          ) : (
            filtered.map((section, i) => (
              <button
                key={section.id}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs transition-all duration-200 text-left"
                style={{
                  color: i === activeIndex ? "var(--color-accent)" : "var(--color-text-secondary)",
                  backgroundColor: i === activeIndex ? "var(--color-bg-card)" : "transparent",
                }}
                onClick={() => {
                  navigateTo(section.path);
                  close();
                }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <FiArrowRight className="w-3 h-3 shrink-0 opacity-50" />
                <span>{section.label}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
