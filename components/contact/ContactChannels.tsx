"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { github, instagram, linkedin } from "@/data/socials";
import { useLocalTime } from "@/hooks/useLocalTime";
import { siteConfig } from "@/lib/site";

const elsewhere = [github, linkedin, instagram];

/** Direct ways to reach me: email, phone, location with live local time, and social profiles. */
export function ContactChannels() {
  const time = useLocalTime();

  const channels = [
    { icon: Mail, title: "Email me", value: siteConfig.email, href: `mailto:${siteConfig.email}`, external: false },
    { icon: Phone, title: "Call me", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}`, external: false },
    { icon: MapPin, title: "Based in", value: `Nairobi, Kenya · ${time ?? "--:--"} EAT`, href: "https://www.google.com/maps/place/Nairobi,+Kenya", external: true },
  ];

  return (
    <aside className="c-side">
      <ul className="c-cards">
        {channels.map(({ icon: Icon, title, value, href, external }) => (
          <li key={title}>
            <a href={href} className="c-card" target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
              <span className="c-card-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="c-card-text">
                <strong>{title}</strong>
                <span>{value}</span>
              </span>
              <span className="c-card-go" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="c-elsewhere">
        <span className="q-eyebrow">Elsewhere</span>
        {elsewhere.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="q-link">
            {link.label} <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </p>
    </aside>
  );
}
