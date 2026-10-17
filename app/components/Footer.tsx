"use client";
import Link from "next/link";
import { ArrowRight, ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
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
    <footer className="relative z-10 w-full">
      {/* Final call to action: a solid cobalt block on every page */}
      <section aria-labelledby="cta-title" className="band band-accent overflow-x-clip">
        <div className="wrap">
          <p className="field-label eyebrow mb-6" style={{ color: "var(--palette-sand)" }}>
            Next step
          </p>
          <h2 id="cta-title" className="display-xl title-xl max-w-[14ch]">
            Let&apos;s build something <span className="font-serif-accent" style={{ color: "var(--palette-sand)" }}>good.</span>
          </h2>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <a href="mailto:kareithibrian2@gmail.com" className="btn-neon btn-neon-primary justify-center">
              <Mail className="h-4 w-4" /> Say hello
            </a>
            <Link href="/contact" className="btn-neon btn-neon-ghost justify-center">
              Contact page <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="band-dark overflow-hidden pt-16 pb-8 sm:pt-20">
        <div className="wrap">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-serif-accent text-2xl" style={{ color: "var(--color-text-primary)" }}>
                Brian Kareithi
              </p>
              <p className="mt-2 max-w-[260px] text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                Full-stack developer in Nairobi, Kenya.
              </p>
              <div className="mt-4 flex gap-2">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="icon-chip flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <nav className="md:col-span-5" aria-label="Site index">
              <p className="field-label mb-3">Index</p>
              <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {routes.map((r) => (
                  <li key={r.path}>
                    <Link
                      href={r.path}
                      className="group flex min-h-[44px] items-center gap-2 text-sm transition-colors duration-200"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <span className="index-num">{r.index}</span>
                      <span className="link-underline group-hover:text-[var(--color-accent)]">{r.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-3">
              <p className="field-label mb-3">Direct</p>
              <ul className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <li>
                  <a href="mailto:kareithibrian2@gmail.com" className="link-underline inline-flex min-h-[44px] items-center break-all hover:text-[var(--color-accent)]">
                    kareithibrian2@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+254119343294" className="link-underline inline-flex min-h-[44px] items-center hover:text-[var(--color-accent)]">
                    +254 119 343 294
                  </a>
                </li>
                <li className="flex min-h-[44px] items-center" style={{ color: "var(--color-text-muted)" }}>Nairobi, Kenya</li>
                {externalLinks
                  .filter((l) => l.href.startsWith("/"))
                  .map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="link-underline inline-flex min-h-[44px] items-center hover:text-[var(--color-accent)]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Wordmark */}
          <p aria-hidden="true" className="wordmark mt-16 select-none sm:mt-20" style={{ color: "var(--palette-cream)" }}>
            Kareithi<span style={{ color: "var(--palette-sand)" }}>.</span>
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              &copy; {year} Brian Kareithi · Nairobi, Kenya · Built with Next.js
            </p>
            <a href="#top" className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium" style={{ color: "var(--color-accent)" }}>
              <span className="link-underline">Back to the beginning</span>
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
