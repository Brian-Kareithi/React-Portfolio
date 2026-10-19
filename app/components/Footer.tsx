"use client";

import Link from "next/link";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
import SoundToggle from "@/app/components/SoundToggle";
import { routes } from "@/app/lib/nav";
import { siteConfig } from "@/app/lib/site";

const socials = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.instagram, icon: Instagram, label: "Instagram" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

const links = routes.filter((r) => r.path !== "/");

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="q-wrap sf-inner">
        <p className="sf-note">
          <Link href="/" className="sf-brand">Brian Kareithi</Link>
          <span>© {year}</span>
        </p>

        <nav aria-label="Footer" className="sf-nav">
          {links.map((l) => (
            <Link key={l.path} href={l.path} className="sf-link">{l.label}</Link>
          ))}
        </nav>

        <div className="sf-tools">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="sf-icon"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
          <SoundToggle />
          <a href="#top" aria-label="Back to top" title="Back to top" className="sf-icon">
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
