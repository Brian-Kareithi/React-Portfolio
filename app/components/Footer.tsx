"use client";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 border-t py-8 px-4 glass"
      style={{
        borderColor: "var(--color-glass-border-strong)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <span>© {year} Brian Kareithi</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Built with</span>
            <FaHeart className="w-3 h-3" style={{ color: "var(--color-accent)" }} />
            <span className="hidden sm:inline">using Next.js</span>
          </div>

          <div className="flex items-center gap-4">
            {[
              { href: "https://github.com/Brian-Kareithi", icon: FaGithub, label: "GitHub" },
              { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: FaLinkedinIn, label: "LinkedIn" },
              { href: "mailto:kareithibrian2@gmail.com", icon: FaEnvelope, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110 glass-sm"
                style={{
                  color: "var(--color-text-secondary)",
                  borderColor: "var(--color-glass-border)",
                }}
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs" style={{ color: "var(--color-text-muted)" }}>
            {["Home", "About", "Tech Stack", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`}
                className="hover:underline transition-colors"
                style={{ color: "var(--color-text-muted)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-6 pt-4 text-center text-xs border-t"
          style={{
            color: "var(--color-text-muted)",
            borderColor: "var(--color-border)",
          }}
        >
          Cybersecurity & Full-Stack Developer — Building secure, scalable digital solutions
        </div>
      </div>
    </footer>
  );
}
