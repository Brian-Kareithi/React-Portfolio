"use client";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Link from "next/link";

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
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        <div className="flex items-center gap-4">
          <Link href="/hobbies"
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105"
            style={{
              color: "var(--color-accent)",
              border: "1px solid var(--color-accent)",
            }}>
            Hobbies
          </Link>
          {[
            { href: "https://github.com/Brian-Kareithi", icon: FaGithub, label: "GitHub" },
            { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: FaLinkedinIn, label: "LinkedIn" },
            { href: "https://www.instagram.com/kareithiv", icon: FaInstagram, label: "Instagram" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-105"
              style={{ color: "var(--color-text-muted)" }}
              aria-label={label}
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            &copy; {year} Brian Kareithi
          </p>
          <p className="text-[10px] xs:text-[11px]" style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
            Cybersecurity &amp; Full-Stack Developer
          </p>
        </div>
      </div>
    </footer>
  );
}
