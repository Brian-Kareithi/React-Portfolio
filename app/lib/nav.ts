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
  { path: "/", label: "Home", index: "00", description: "Who I am, at a glance" },
  { path: "/about", label: "About", index: "01", description: "My story, experience & certifications" },
  { path: "/how-i-work", label: "How I Work", index: "02", description: "The way I build, end to end" },
  { path: "/projects", label: "Selected Work", index: "03", description: "Things I've built, with live demos" },
  { path: "/contact", label: "Contact", index: "04", description: "Say hello or start a project" },
  { path: "/homelab", label: "Homelab", index: "05", description: "The lab I run at home, 24/7" },
  { path: "/troubleshooting", label: "Diagnostics", index: "06", description: "How I find and fix root causes" },
  { path: "/resume", label: "Resume", index: "07", description: "Full-stack first, tailored per role" },
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
