"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import useLocalTime from "@/app/components/ui/useLocalTime";
import type { HomelabStats } from "@/app/lib/homelab";
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
const built = ["Next.js", "React", "TypeScript", "Tailwind"];

function useLabStatus() {
  const [lab, setLab] = useState<{ stale: boolean; seen: string } | null>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/homelab", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: HomelabStats | null) => {
        if (!d?.generatedAt) return;
        const seen = new Date(d.generatedAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
        setLab({ stale: Boolean(d.stale), seen });
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  return lab;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const time = useLocalTime("Africa/Nairobi");
  const lab = useLabStatus();

  return (
    <footer className="site-footer">
      <div className="q-wrap">
        <div className="sf-sign">
          <Link href="/contact" className="sf-sign-title">
            Let&apos;s build <em>something</em>
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <dl className="sf-sign-meta">
            <div>
              <dt>Nairobi</dt>
              <dd><time>{time ?? "--:--"}</time> EAT</dd>
            </div>
            {lab && (
              <div>
                <dt>Homelab</dt>
                <dd>
                  <span className="sf-lab-dot" data-stale={lab.stale || undefined} aria-hidden="true" />
                  {lab.stale ? `Last seen ${lab.seen}` : "Online"}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="sf-top">
          <div className="sf-id">
            <Link href="/" className="sf-brand">Brian Kareithi<i>.</i></Link>
            <span>Full-stack developer</span>
          </div>

          <nav aria-label="Footer" className="sf-nav">
            {links.map((l) => (
              <Link key={l.path} href={l.path} className="sf-link" aria-current={l.path === pathname ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>

          <p className="sf-blurb">
            Web and mobile products from the interface down to the infrastructure, built in {siteConfig.location}.
          </p>
        </div>

        <div className="sf-bottom">
          <div className="sf-socials">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="sf-social"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="sf-copy">© {year} Brian Kareithi. All rights reserved.</p>

          <div className="sf-right">
            <ul className="sf-built" aria-label="Built with">
              {built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <SoundToggle />
            <a href="#top" aria-label="Back to top" title="Back to top" className="sf-icon">
              <ArrowUp aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
