export interface FocusArea {
  id: string;
  index: string;
  label: string;
  tools: string[];
}

/** Core focus areas: software, mobile, and infrastructure. */
export const focusAreas: FocusArea[] = [
  {
    id: "software",
    index: "01",
    label: "Software Engineering",
    tools: ["React", "Next.js", "TypeScript", "Node.js", "REST APIs"],
  },
  {
    id: "mobile",
    index: "02",
    label: "Mobile Development",
    tools: ["React Native", "Expo", "Android", "iOS"],
  },
  {
    id: "it",
    index: "03",
    label: "IT & Infrastructure",
    tools: ["Linux", "Networking", "System Administration", "Technical Support"],
  },
];

/** Directions I'm actively learning, not billing for yet. */
export const alsoExploring: string[] = ["AI", "GIS", "Cloud", "Cybersecurity", "DevOps"];
