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
      <style>{`
        @keyframes labelPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes wave1 {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes wave2 {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes wave3 {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}</style>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap"
                style={{
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                  animation: "labelPulse 2s ease-in-out infinite",
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
            <div className="relative flex items-center justify-center">
              <div className="absolute" style={{
                width: 80, height: 28,
                borderRadius: "0.5rem",
                border: "1.5px solid var(--color-accent)",
                animation: "wave1 2s ease-out infinite",
                boxShadow: "0 0 8px var(--color-accent-glow)",
              }} />
              <div className="absolute" style={{
                width: 80, height: 28,
                borderRadius: "0.5rem",
                border: "1.5px solid var(--color-accent)",
                animation: "wave2 2s ease-out infinite",
                animationDelay: "0.4s",
                boxShadow: "0 0 6px var(--color-accent-glow)",
              }} />
              <div className="absolute" style={{
                width: 80, height: 28,
                borderRadius: "0.5rem",
                border: "1px solid var(--color-accent)",
                animation: "wave3 2s ease-out infinite",
                animationDelay: "0.8s",
                boxShadow: "0 0 4px var(--color-accent-glow)",
              }} />
              <a href="/niche"
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{
                  color: "var(--color-accent)",
                  border: "1px solid var(--color-accent)",
                  boxShadow: "0 0 12px var(--color-accent-glow)",
                }}>
                <FiHexagon className="w-3.5 h-3.5" />
                Niche
              </a>
            </div>
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
