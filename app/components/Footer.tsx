"use client";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", description: "Overview & intro" },
  { href: "/about", label: "About", description: "Journey & certifications" },
  { href: "/expertise", label: "Expertise", description: "Skill domains" },
  { href: "/engineering", label: "Engineering", description: "How I build" },
  { href: "/projects", label: "Work", description: "Selected projects" },
];

const resourceLinks = [
  { href: "/techstack", label: "Tech Stack", description: "Tools & platforms" },
  { href: "/troubleshooting", label: "Diagnostics", description: "Problem-solving method" },
  { href: "/hobbies", label: "Homelab", description: "Gear & experiments" },
  { href: "/contact", label: "Contact", description: "Get in touch" },
  { href: "/llms.txt", label: "llms.txt", description: "Machine-readable profile" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 border-t py-10 px-4"
      style={{
        borderColor: "var(--color-glass-border-strong)",
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
              Brian Kareithi
            </p>
            <p className="text-xs leading-relaxed max-w-[220px]" style={{ color: "var(--color-text-muted)" }}>
              Full-stack developer, React Native engineer and cybersecurity specialist based in Nairobi, Kenya.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                { href: "https://github.com/Brian-Kareithi", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com/kareithiv", icon: Instagram, label: "Instagram" },
                { href: "mailto:kareithibrian2@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="transition-all duration-200 hover:scale-105"
                  style={{ color: "var(--color-text-muted)" }}
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Main footer navigation">
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent)" }}>
              Explore
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group block text-xs transition-colors duration-200 hover:opacity-70"
                    style={{ color: "var(--color-text-secondary)" }}>
                    <span className="font-medium">{link.label}</span>
                    <span className="block text-[10px]" style={{ color: "var(--color-text-muted)", opacity: 0.7 }}>
                      {link.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Secondary footer navigation">
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent)" }}>
              Resources
            </p>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group block text-xs transition-colors duration-200 hover:opacity-70"
                    style={{ color: "var(--color-text-secondary)" }}>
                    <span className="font-medium">{link.label}</span>
                    <span className="block text-[10px]" style={{ color: "var(--color-text-muted)", opacity: 0.7 }}>
                      {link.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent)" }}>
              Contact
            </p>
            <ul className="space-y-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
              <li>
                <a href="mailto:kareithibrian2@gmail.com" className="block transition-colors duration-200 hover:opacity-70 break-all">
                  kareithibrian2@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+254718593392" className="block transition-colors duration-200 hover:opacity-70">
                  +254 718 593 392
                </a>
              </li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-6 border-t"
          style={{ borderColor: "var(--color-border)" }}>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            &copy; {year} Brian Kareithi
          </p>
          <p className="text-[10px]" style={{ color: "var(--color-text-muted)", opacity: 0.6 }}>
            Cybersecurity &amp; Full-Stack Developer · Nairobi, Kenya · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}