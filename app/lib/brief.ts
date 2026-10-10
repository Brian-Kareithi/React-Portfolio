import { siteConfig } from "@/app/lib/site";

/**
 * The 20-second version for hiring managers: who I am, when I can start, and
 * the three strongest evidence links. Kept short on purpose, every line must
 * stay traceable to a page on the site.
 */
export interface BriefWin {
  title: string;
  line: string;
  href: string;
}

export const brief = {
  headline: "Full-stack developer, web & mobile, with the infrastructure background to back it up.",
  roles: [
    "Full-stack developer",
    "Frontend / React engineer",
    "React Native developer",
    "IT & infrastructure",
  ],
  availability: "Open to full-time, contract and freelance",
  location: `${siteConfig.location} · EAT (UTC+3)`,
  overlap: "Comfortable overlapping EU and US-East working hours",
  start: "Available now",
  wins: [
    {
      title: "Shipped a road-safety platform",
      line: "Role-based dashboards, QR-verified digital licences, demerit points and an auditable appeals workflow. Public source and a live demo.",
      href: "/projects#roadsafe360",
    },
    {
      title: "Run a school's core product",
      line: "Teacher and Parent portals plus a React Native parent app, in daily use by real teachers and parents at Steadfast Academy.",
      href: "/projects#steadfast-parent",
    },
    {
      title: "Operate a 24/7 homelab",
      line: "A Proxmox node on RAID-1 with 19 managed devices and zero bytes lost. Where I break things on purpose before they reach production.",
      href: "/homelab",
    },
  ] as BriefWin[],
  contact: { resume: "/resume", message: "/contact" },
} as const;
