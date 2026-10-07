import { siteConfig } from "@/app/lib/site";

export interface NavRoute {
  path: string;
  label: string;
  /** Field-manual index, matches the page's own SectionHeader index. */
  index: string;
  description: string;
  /** Optional pill shown beside the label in the navbar. */
  tag?: string;
}

/** Every internal route, in reading order. */
export const routes: NavRoute[] = [
  { path: "/", label: "Home", index: "00", description: "The short version" },
  { path: "/about", label: "About", index: "01", description: "My path into this work" },
  { path: "/how-i-work", label: "How I Work", index: "02", description: "Idea to production" },
  { path: "/projects", label: "Selected Work", index: "03", description: "Live products and case studies" },
  { path: "/contact", label: "Contact", index: "04", description: "Hire me or say hello" },
  { path: "/homelab", label: "Homelab", index: "05", description: "The lab that never sleeps" },
  { path: "/troubleshooting", label: "Diagnostics", index: "06", description: "How I find the real fault" },
  { path: "/resume", label: "Resume", index: "07", description: "Tailored PDF by role" },
  { path: "/games", label: "Minigames", index: "08", description: "Capture the flag, and more" },
];

/** Tight primary set shown in the desktop bar; the palette covers the rest. */
export const primaryNav: NavRoute[] = routes.filter((r) =>
  ["/", "/about", "/how-i-work", "/projects", "/contact"].includes(r.path)
);

export interface ExternalLink {
  label: string;
  href: string;
  hint: string;
}

export const externalLinks: ExternalLink[] = [
  { label: "GitHub", href: siteConfig.github, hint: "Brian-Kareithi" },
  { label: "LinkedIn", href: siteConfig.linkedin, hint: "brian-kareithi" },
  { label: "Email", href: `mailto:${siteConfig.email}`, hint: siteConfig.email },
  { label: "llms.txt", href: "/llms.txt", hint: "Machine-readable profile" },
];
