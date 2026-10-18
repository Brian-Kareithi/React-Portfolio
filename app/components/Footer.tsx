"use client";

import Link from "next/link";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { primaryNav } from "@/app/lib/nav";
import { siteConfig } from "@/app/lib/site";

const socials = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.instagram, icon: Instagram, label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer band-dark">
      <div className="wrap site-footer-inner">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-name">Brian Kareithi</Link>
          <span className="site-footer-meta">Full-stack developer · © {year} · Nairobi, Kenya</span>
        </div>

        <nav aria-label="Footer navigation" className="site-footer-nav">
          {primaryNav.map((item) => (
            <Link key={item.path} href={item.path} className="site-footer-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer-actions">
          <a href={`mailto:${siteConfig.email}`} aria-label={`Email ${siteConfig.email}`} className="site-footer-email">
            <Mail aria-hidden="true" />
            Email
          </a>
          <span className="site-footer-divider" aria-hidden="true" />
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-icon"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
          <a href="#top" aria-label="Back to top" title="Back to top" className="site-footer-icon site-footer-top">
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
