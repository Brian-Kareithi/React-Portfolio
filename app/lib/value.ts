export interface ValuePoint {
  id: string;
  /** The headline of this reason */
  edge: string;
  /** Why it matters, in my own words */
  benefit: string;
  /** Verifiable evidence elsewhere on the site */
  proof: string;
  href: string;
}

/**
 * Why I am good at what I do, in five reasons, in the first person.
 * Every proof line must stay traceable to the About, Projects or Homelab pages.
 */
export const valuePoints: ValuePoint[] = [
  {
    id: "full-spectrum",
    edge: "I see the whole system",
    benefit: "I started with networks, servers and people who needed things to work. When something breaks, I trace it from the screen down to the wire.",
    proof: "Next.js and React Native apps, CCNA, Linux and a 19-device Proxmox homelab I run myself.",
    href: "/homelab",
  },
  {
    id: "security",
    edge: "Security comes first",
    benefit: "My first professional work was protecting government systems. Security is part of every build from the first commit, not a patch at the end.",
    proof: "Security+, Google and IBM cybersecurity certificates, and information security work for the ICT Authority of Kenya (2022 - 2024).",
    href: "/about",
  },
  {
    id: "shipped",
    edge: "I build for real users",
    benefit: "At Steadfast Academy my users are teachers and parents. When something is unclear or broken, they tell me fast.",
    proof: "Teacher and Parent portals and a mobile app at Steadfast Academy, plus a live client site for Sapio Homes.",
    href: "/projects",
  },
  {
    id: "client-ready",
    edge: "I listen before I build",
    benefit: "Freelance clients taught me to ask the right questions, respect a budget and explain things in plain language.",
    proof: "50+ freelance projects delivered, and co-founder of Thee Entity.",
    href: "/about",
  },
  {
    id: "root-cause",
    edge: "I fix the cause",
    benefit: "I cut internet downtime by finding the real fault instead of rebooting and hoping, then wrote down what I found so it stayed fixed.",
    proof: "A five-step, evidence-driven method, and a homelab that has run 24/7 with zero data lost.",
    href: "/troubleshooting",
  },
];
