export interface ResumeRole {
  id: "software" | "mobile" | "it";
  label: string;
  headline: string;
  summary: string;
  topSkills: string[];
  experience: string[];
  projects: { title: string; note: string }[];
}

export const resumeRoles: ResumeRole[] = [
  {
    id: "software",
    label: "Software Engineering",
    headline: "Software Engineer, Web & Cloud-Native Systems",
    summary:
      "I build full-stack web applications end to end, from data model to deployment, with Next.js, TypeScript and Node.js. Recent work spans a role-based platform for road-safety management and a client real-estate site with a 3D property viewer.",
    topSkills: ["React", "Next.js", "TypeScript", "Node.js", "REST APIs", "PostgreSQL", "Firebase", "Docker"],
    experience: [
      "Developed responsive Teacher and Parent portals with Next.js and React",
      "Integrated frontend applications with backend APIs",
      "Worked with school information systems",
      "Built the Parent mobile application using Expo / React Native",
      "Supported users and troubleshooting",
      "Assisted with IT infrastructure and technical support",
    ],
    projects: [
      { title: "RoadSafe360", note: "Role-based dashboards, Firebase backend, QR licence & appeals workflow" },
      { title: "Sapio Homes", note: "Client real-estate site with a 3D property viewer and booking flow" },
      { title: "Steadfast Parent Portal", note: "Next.js web platform integrated with a Node.js API" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Development",
    headline: "Mobile Developer, React Native & Expo",
    summary:
      "I ship cross-platform mobile apps with React Native and Expo, from the Steadfast Parent app used by real families to personal tools like a Kotlin fitness tracker I use every day.",
    topSkills: ["React Native", "Expo", "TypeScript", "Kotlin", "Android SDK", "Firebase", "REST APIs"],
    experience: [
      "Built the Parent mobile application using Expo / React Native",
      "Developed responsive Teacher and Parent portals",
      "Integrated frontend applications with backend APIs",
      "Supported users and troubleshooting",
      "Worked with school information systems",
      "Assisted with IT infrastructure and technical support",
    ],
    projects: [
      { title: "Steadfast Parent App", note: "Expo / React Native app for Android and iOS" },
      { title: "Fitness Tracker", note: "Native Kotlin Android app for sleep and diet tracking, in daily use" },
      { title: "Custom Jellyfin Client", note: "React Native media client built for a self-hosted server" },
    ],
  },
  {
    id: "it",
    label: "IT & Infrastructure",
    headline: "IT Support & Infrastructure",
    summary:
      "I keep systems running and users unblocked: hands-on IT support, school information systems, networking, and a self-managed 18-device homelab running on Proxmox with 24/7 uptime.",
    topSkills: ["Linux", "Networking", "System Administration", "Docker", "Proxmox", "Technical Support", "CCNA"],
    experience: [
      "Assisted with IT infrastructure and technical support",
      "Supported users and troubleshooting",
      "Worked with school information systems",
      "Developed responsive Teacher and Parent portals",
      "Integrated frontend applications with backend APIs",
      "Built the Parent mobile application using Expo / React Native",
    ],
    projects: [
      { title: "Homelab", note: "18-device self-hosted Proxmox lab, RAID-1, 24/7 uptime, zero data lost" },
      { title: "Steadfast Academy", note: "Day-to-day IT support, troubleshooting and school information systems" },
      { title: "QuickPrint", note: "Ephemeral upload/print infrastructure built for a cyber café workflow" },
    ],
  },
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
  period: "2021 - Present",
  note: "Cybersecurity focus",
};
