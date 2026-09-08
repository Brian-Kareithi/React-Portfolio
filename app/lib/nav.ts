import { siteConfig } from "@/app/lib/site";

export interface NavRoute {
  path: string;
  label: string;
  /** Field-manual index, matches the page's own SectionHeader index. */
  index: string;
  description: string;
}

/** Every internal route, in reading order. */
export const routes: NavRoute[] = [
  { path: "/", label: "Home", index: "00", description: "Identity & index" },
  { path: "/about", label: "About", index: "01", description: "Journey, education & certifications" },
  { path: "/techstack", label: "Tech Stack", index: "02", description: "Languages, frameworks & platforms" },
  { path: "/projects", label: "Selected Work", index: "03", description: "Delivered products & experiments" },
  { path: "/contact", label: "Contact", index: "04", description: "Start a conversation" },
  { path: "/expertise", label: "Expertise", index: "05", description: "Six hands-on skill domains" },
  { path: "/troubleshooting", label: "Diagnostics", index: "06", description: "An evidence-driven method" },
  { path: "/engineering", label: "Engineering", index: "07", description: "How the software gets built" },
  { path: "/hobbies", label: "Homelab", index: "08", description: "Servers, sensors & firmware" },
];

/** Tight primary set shown in the desktop bar; the palette covers the rest. */
export const primaryNav: NavRoute[] = routes.filter((r) =>
  ["/", "/about", "/techstack", "/projects", "/contact"].includes(r.path)
);

export interface ExternalLink {
  label: string;
  href: string;
  hint: string;
}

export const externalLinks: ExternalLink[] = [
  { label: "GitHub", href: siteConfig.github, hint: "Brian-Kareithi" },
  { label: "LinkedIn", href: siteConfig.linkedin, hint: "brian-kareithi" },
  { label: "Instagram", href: siteConfig.instagram, hint: "kareithiv" },
  { label: "Email", href: `mailto:${siteConfig.email}`, hint: siteConfig.email },
  { label: "llms.txt", href: "/llms.txt", hint: "Machine-readable profile" },
];
