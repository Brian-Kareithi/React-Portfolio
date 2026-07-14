"use client";
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FiHexagon } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 border-t py-6 px-4"
      style={{
        borderColor: "var(--color-glass-border-strong)",
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap"
                style={{
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                }}>
                Click me
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "4px solid var(--color-border)",
                  }} />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 -mt-px"
                  style={{
                    borderLeft: "3px solid transparent",
                    borderRight: "3px solid transparent",
                    borderTop: "3px solid var(--color-bg-secondary)",
                  }} />
              </div>
            </div>
            <a href="/niche"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{
                color: "var(--color-accent)",
                border: "1px solid var(--color-accent)",
                boxShadow: "0 0 12px var(--color-accent-glow)",
              }}>
              <FiHexagon className="w-3.5 h-3.5" />
              Niche
            </a>
          </div>
          {[
            { href: "https://github.com/Brian-Kareithi", icon: FaGithub, label: "GitHub" },
            { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: FaLinkedinIn, label: "LinkedIn" },
            { href: "https://www.instagram.com/kareithiv", icon: FaInstagram, label: "Instagram" },
            { href: "mailto:kareithibrian2@gmail.com", icon: FaEnvelope, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg transition-all duration-200 hover:scale-110"
              style={{ color: "var(--color-text-muted)" }}
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          © {year} Brian Kareithi
        </p>

        <p className="text-[10px] xs:text-[11px] leading-relaxed text-center max-w-xs"
          style={{ color: "var(--color-text-muted)", opacity: 0.6 }}>
          Cybersecurity & Full-Stack Developer
        </p>
      </div>
    </footer>
  );
}
