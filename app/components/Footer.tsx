"use client";
import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { routes, externalLinks } from "@/app/lib/nav";

const socials = [
  { href: "https://github.com/Brian-Kareithi", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/kareithi._/", icon: Instagram, label: "Instagram" },
  { href: "mailto:kareithibrian2@gmail.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ink-slab relative z-10 w-full !rounded-none px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-6">
        <div className="mb-4 flex flex-col gap-3 border-b pb-4 md:flex-row md:items-center md:justify-between" style={{ borderColor: "var(--color-border)" }}>
          <p className="display-xl text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
            Let&apos;s build something <span className="font-serif-accent" style={{ color: "var(--color-accent)" }}>good.</span>
          </p>
          <a href="mailto:kareithibrian2@gmail.com" className="btn-neon btn-neon-primary self-start md:self-auto">
            <Mail className="w-4 h-4" /> Say hello
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-serif-accent text-2xl" style={{ color: "var(--color-text-primary)" }}>
              Brian Kareithi
            </p>
            <p className="mt-2 max-w-[260px] text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Full-stack developer in Nairobi, Kenya.
            </p>
            <div className="mt-2 flex gap-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="icon-chip flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <nav className="md:col-span-5" aria-label="Site index">
            <p className="field-label mb-2.5">Index</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
              {routes.map((r) => (
                <li key={r.path}>
                  <Link
                    href={r.path}
                    className="group flex items-baseline gap-2 text-xs transition-colors duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <span className="index-num opacity-60">{r.index}</span>
                    <span className="link-underline group-hover:text-[var(--color-accent)]">{r.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="field-label mb-2.5">Direct</p>
            <ul className="space-y-1.5 text-xs" style={{ color: "var(--color-text-secondary)" }}>
              <li>
                <a href="mailto:kareithibrian2@gmail.com" className="link-underline break-all hover:text-[var(--color-accent)]">
                  kareithibrian2@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+254119343294" className="link-underline hover:text-[var(--color-accent)]">
                  +254 119 343 294
                </a>
              </li>
              <li style={{ color: "var(--color-text-muted)" }}>Nairobi, Kenya</li>
              {externalLinks
                .filter((l) => l.href.startsWith("/"))
                .map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-underline hover:text-[var(--color-accent)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-4 flex flex-col gap-2 border-t pt-3 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            &copy; {year} Brian Kareithi
          </p>
          <p className="font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
            Nairobi, Kenya · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
