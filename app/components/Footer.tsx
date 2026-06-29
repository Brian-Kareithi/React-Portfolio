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
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
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

        <p className="text-[10px] leading-relaxed text-center max-w-xs"
          style={{ color: "var(--color-text-muted)", opacity: 0.6 }}>
          Cybersecurity & Full-Stack Developer
        </p>
      </div>
    </footer>
  );
}
