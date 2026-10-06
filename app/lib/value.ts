export interface ValuePoint {
  id: string;
  /** The headline of this part of the story */
  edge: string;
  /** Why it matters, in my own words */
  benefit: string;
  /** Verifiable evidence elsewhere on the site */
  proof: string;
  href: string;
}

/**
 * The story told in five parts, in the first person.
 * Every proof line must stay traceable to the About, Projects or Homelab pages.
 */
export const valuePoints: ValuePoint[] = [
  {
    id: "full-spectrum",
    edge: "I started in IT, so I build with the whole system in mind",
    benefit: "I did not begin in a framework tutorial. I began with networks, servers and people who needed things to work. That is why I trace a bug from the screen all the way down to the network instead of stopping at the code.",
    proof: "Next.js and React Native apps, CCNA, Linux, and a 19-device Proxmox homelab I run myself.",
    href: "/homelab",
  },
  {
    id: "security",
    edge: "Security is how I was trained to think",
    benefit: "Some of my first professional work was protecting government systems, not decorating websites. I still design with that instinct, so security is part of the build from the first commit.",
    proof: "Security+, Google and IBM cybersecurity certificates, and information security work for the ICT Authority of Kenya (2022 - 2024).",
    href: "/about",
  },
  {
    id: "shipped",
    edge: "I build for people who actually use it",
    benefit: "At Steadfast Academy my users are teachers and parents. When something is unclear or broken, I hear about it quickly, which keeps me honest about what a good product feels like.",
    proof: "Teacher and Parent portals and a mobile app at Steadfast Academy, and a live client site for Sapio Homes.",
    href: "/projects",
  },
  {
    id: "client-ready",
    edge: "Freelancing taught me to listen first",
    benefit: "Fiverr and Upwork clients do not accept excuses. Over 50 projects I learned to ask the right questions, respect a budget and explain things in plain language. Co-founding Thee Entity taught me the same lesson from the other side.",
    proof: "50+ freelance projects delivered, and co-founder of Thee Entity, running infrastructure on a lean budget.",
    href: "/about",
  },
  {
    id: "root-cause",
    edge: "I would rather fix the cause than restart the router",
    benefit: "Dropped connections and slow networks are what people notice first. I cut internet downtime by finding the real fault, not by rebooting and hoping, and I write down what I found so it does not come back.",
    proof: "A five-step, evidence-driven method, and a homelab that has run 24/7 with zero data lost.",
    href: "/troubleshooting",
  },
];
