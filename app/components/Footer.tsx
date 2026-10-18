"use client";
import Link from "next/link";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { primaryNav } from "@/app/lib/nav";

const socials = [
  { href: "https://github.com/Brian-Kareithi", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/kareithi._/", icon: Instagram, label: "Instagram" },
  { href: "mailto:kareithibrian2@gmail.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="compact-footer band-dark">
      <div className="wrap compact-footer-inner">
        <div className="compact-footer-brand">
          <Link href="/" className="font-semibold" style={{ color: "var(--color-text-primary)" }}>Brian Kareithi</Link>
          <span style={{ color: "var(--color-text-muted)" }}>© {year} · Nairobi, Kenya</span>
        </div>

        <nav aria-label="Footer navigation" className="compact-footer-nav">
          {primaryNav.map((item) => (
            <Link key={item.path} href={item.path} className="link-underline" style={{ color: "var(--color-text-secondary)" }}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="compact-footer-actions">
          {socials.map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
              <Icon aria-hidden="true" />
            </a>
          ))}
          <a href="#top" aria-label="Back to top" className="compact-back-top"><ArrowUp aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
