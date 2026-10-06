export type ResumeRoleId = "frontend" | "fullstack" | "mobile" | "it-support" | "infrastructure";

export interface ResumeRole {
  id: ResumeRoleId;
  /** The role I am primarily applying for. The others come with the territory. */
  primary?: boolean;
  /** Tab label */
  label: string;
  /** Used in the PDF filename */
  fileLabel: string;
  headline: string;
  summary: string;
  /** Three at-a-glance facts shown under the headline */
  highlights: { value: string; label: string }[];
  /** Grouped so the skills block reads as a map, not a word cloud */
  skillGroups: { group: string; items: string[] }[];
  experience: string[];
  projects: { title: string; note: string; stack: string }[];
}

export const resumeRoles: ResumeRole[] = [
  {
    id: "fullstack",
    primary: true,
    label: "Full-Stack Developer",
    fileLabel: "Full-Stack-Developer",
    headline: "Full-Stack Developer, Web & Cloud-Native Systems",
    summary:
      "I am a full-stack developer. I started in IT and security, then taught myself to build, and I take features from the data model to deployment with Next.js, TypeScript, Node.js and Firebase or PostgreSQL. I have delivered 50+ client projects, and I know the network and security side because I have worked on it.",
    highlights: [
      { value: "50+", label: "projects delivered" },
      { value: "3 yrs", label: "in tech" },
      { value: "6", label: "certifications" },
    ],
    skillGroups: [
      { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "Express", "REST APIs", "JWT auth"] },
      { group: "Data & Cloud", items: ["PostgreSQL", "Firebase", "MongoDB", "SQLite", "Docker", "AWS"] },
    ],
    experience: [
      "Developed responsive Teacher and Parent portals with Next.js and React",
      "Integrated frontend applications with backend APIs",
      "Worked with school information systems and the data model behind them",
      "Built the Parent mobile application using Expo / React Native",
      "Supported users and troubleshooting across the stack",
      "Assisted with IT infrastructure and technical support",
    ],
    projects: [
      { title: "RoadSafe360", note: "Designed the data model and Firebase security rules; QR licences, demerit points and appeals end to end", stack: "Next.js · Firebase · TypeScript" },
      { title: "Steadfast Parent Portal", note: "Web and mobile experience on a Node.js API and PostgreSQL", stack: "Next.js · Expo · Node.js · PostgreSQL" },
      { title: "QuickPrint", note: "QR-based upload and print platform built for a cyber café workflow", stack: "React · Express · SQLite" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend Engineer",
    fileLabel: "Frontend-Engineer",
    headline: "Full-Stack Developer, Frontend Strength",
    summary:
      "I am a full-stack developer, and the interface is where I care most. I build fast, accessible screens with React, Next.js and TypeScript, and because I also know the APIs, networks and security behind them, what I build holds up in production.",
    highlights: [
      { value: "50+", label: "projects delivered" },
      { value: "3 yrs", label: "in tech" },
      { value: "6", label: "certifications" },
    ],
    skillGroups: [
      { group: "Core", items: ["React 19", "Next.js 16", "TypeScript", "JavaScript"] },
      { group: "UI & Motion", items: ["Tailwind CSS", "Framer Motion", "Three.js / R3F", "GSAP"] },
      { group: "Data & Tooling", items: ["REST APIs", "Recharts", "Leaflet", "Git / GitHub", "Vercel"] },
    ],
    experience: [
      "Developed responsive Teacher and Parent portals with Next.js and React",
      "Integrated frontend applications with backend APIs",
      "Built the Parent mobile application using Expo / React Native, sharing patterns with the web UI",
      "Worked with school information systems to shape the data each screen needs",
      "Supported users and troubleshooting, turning real feedback into interface fixes",
    ],
    projects: [
      { title: "Sapio Homes", note: "Client real-estate site with a 3D property viewer, search by budget and floor area, and booking flow", stack: "Next.js · React Three Fiber · Tailwind" },
      { title: "RoadSafe360", note: "Role-based dashboards, QR licence view, appeals workflow and Leaflet map analytics", stack: "Next.js · Recharts · Leaflet" },
      { title: "Steadfast Parent Portal", note: "Responsive parent and teacher portals integrated with a Node.js API", stack: "Next.js · TypeScript" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Developer",
    fileLabel: "Mobile-Developer",
    headline: "Full-Stack Developer, Mobile Strength",
    summary:
      "I am a full-stack developer who also builds mobile apps. My Expo / React Native Parent app is used by real families, and I write native Kotlin when the job needs it. Because I also work on the web and API side, I am never waiting on someone else to finish a feature.",
    highlights: [
      { value: "iOS + Android", label: "from one codebase" },
      { value: "3", label: "mobile apps built" },
      { value: "6", label: "certifications" },
    ],
    skillGroups: [
      { group: "Cross-platform", items: ["React Native", "Expo", "TypeScript"] },
      { group: "Native Android", items: ["Kotlin", "Android SDK", "Room Database", "MPAndroidChart"] },
      { group: "Integration", items: ["REST APIs", "Firebase", "Node.js"] },
    ],
    experience: [
      "Built the Parent mobile application using Expo / React Native for Android and iOS",
      "Integrated the app with backend APIs for progress tracking and communication",
      "Developed the responsive Teacher and Parent web portals it pairs with",
      "Supported users and troubleshooting, closing the loop from feedback to fix",
      "Worked with school information systems",
    ],
    projects: [
      { title: "Steadfast Parent App", note: "Expo / React Native app for Android and iOS used by real families", stack: "Expo · React Native · TypeScript" },
      { title: "Fitness Tracker", note: "Native Kotlin Android app for sleep and diet tracking, in daily use", stack: "Kotlin · Room · MPAndroidChart" },
      { title: "Custom Jellyfin Client", note: "React Native media client built for a self-hosted server", stack: "React Native · Expo · Jellyfin API" },
    ],
  },
  {
    id: "it-support",
    label: "IT Support",
    fileLabel: "IT-Support",
    headline: "Full-Stack Developer, IT Support Background",
    summary:
      "IT support is where I began and it still comes with me. Hands-on support and school information systems at Steadfast Academy, CompTIA Security+ and CCNA, and a 19-device homelab I run myself. Because I also build the systems I support, I fix root causes and have cut internet downtime instead of repeating the same fixes.",
    highlights: [
      { value: "Daily", label: "user support" },
      { value: "CCNA", label: "+ Security+" },
      { value: "24/7", label: "homelab uptime" },
    ],
    skillGroups: [
      { group: "Support", items: ["Troubleshooting", "Technical Support", "School Information Systems"] },
      { group: "Systems", items: ["Linux", "Proxmox", "Docker", "System Administration"] },
      { group: "Networking & Security", items: ["Networking", "CCNA", "Security+", "Cybersecurity"] },
    ],
    experience: [
      "Supported users and troubleshooting day to day at Steadfast Academy",
      "Assisted with IT infrastructure and technical support",
      "Worked with school information systems",
      "Developed the Teacher and Parent portals, so I understand the systems I support from the inside",
      "Integrated frontend applications with backend APIs",
    ],
    projects: [
      { title: "Steadfast Academy", note: "Day-to-day IT support, troubleshooting and school information systems", stack: "Support · Systems" },
      { title: "Homelab", note: "19-device self-hosted lab with RAID-1, 24/7 uptime and zero data lost", stack: "Proxmox · Linux · Networking" },
      { title: "QuickPrint", note: "Ephemeral upload and print infrastructure for a cyber café workflow", stack: "Node.js · Express" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure & Security",
    fileLabel: "Infrastructure-Security",
    headline: "Full-Stack Developer, Systems & Security Depth",
    summary:
      "Security and infrastructure are where my career began. Six certifications across Azure, AWS, Cisco, CompTIA, Google and IBM, information security work for the ICT Authority of Kenya, and a self-managed 19-device Proxmox homelab with RAID-1 and 24/7 uptime. I can also code, so I automate the fixes.",
    highlights: [
      { value: "19", label: "homelab devices" },
      { value: "6", label: "certifications" },
      { value: "0", label: "data lost in homelab" },
    ],
    skillGroups: [
      { group: "Infrastructure", items: ["Proxmox", "Linux", "Docker", "RAID-1", "System Administration"] },
      { group: "Cloud", items: ["Azure", "AWS", "Firebase", "Vercel"] },
      { group: "Network & Security", items: ["Networking", "CCNA", "Security+", "SSL/TLS", "Threat Detection"] },
    ],
    experience: [
      "Assisted with IT infrastructure and technical support",
      "Supported users and troubleshooting",
      "Worked with school information systems",
      "Integrated frontend applications with backend APIs",
      "Developed Teacher and Parent portals, bringing a security and reliability mindset to application work",
    ],
    projects: [
      { title: "Homelab", note: "Self-hosted Proxmox lab with managed network, RAID-1 and ESP32 automation", stack: "Proxmox · Docker · Linux" },
      { title: "CyberShield", note: "Network security tooling for threat detection over SSL/TLS", stack: "Python · Network Security" },
      { title: "Network API", note: "Socket-programming and REST API project with SSL/TLS", stack: "Python · Sockets · REST" },
    ],
  },
];

/** Earlier roles, shown under the current one on every tailored resume. */
export const resumeHistory = [
  { role: "Co-Founder & Backend Developer", org: "Thee Entity Limited", period: "2025 – Present", line: "Designed the cloud-native architecture and an automated deployment pipeline, keeping infrastructure cost lean." },
  { role: "Information Security Specialist", org: "ICT Authority of Kenya", period: "2022 – 2024", line: "Supported security hardening, incident monitoring and vulnerability remediation for internal government systems." },
  { role: "Freelance Full-Stack Developer", org: "Fiverr & Upwork", period: "2022 – 2024", line: "Delivered 50+ web projects for clients with consistently positive feedback." },
];

export const resumeCertifications = [
  "Microsoft Azure Fundamentals (Microsoft, 2022)",
  "CompTIA Security+ (CompTIA, 2022)",
  "AWS Cloud Practitioner (Amazon Web Services, 2023)",
  "Google Cybersecurity Professional (Google, 2023)",
  "CCNA (Cisco, 2023)",
  "IBM Cybersecurity Analyst (IBM, 2024)",
];

export const resumeEducation = {
  degree: "BSc Information Technology",
  institution: "Umma University",
  period: "Graduated",
  note: "Cybersecurity focus · degree completed",
};
