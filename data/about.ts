export const currentRole = {
  role: "IT Support / Frontend Development",
  company: "Steadfast Academy",
  period: "2025 - Present",
  summary: "I build and support the systems a school runs on every day. Real users and real deadlines, so keeping things running matters.",
  duties: [
    "Teacher and Parent portals (Next.js, React)",
    "Parent mobile app (Expo / React Native)",
    "Frontend integration with backend APIs",
    "School information systems",
    "User support and troubleshooting",
    "IT infrastructure support",
  ],
};

export type TimelineCategory = "education" | "certification" | "professional" | "entrepreneurial";

export interface TimelineItem {
  title: string;
  institution: string;
  period: string;
  year: number;
  description: string;
  category: TimelineCategory;
  metrics?: string[];
}

export const timelineCategories: Record<TimelineCategory, { label: string; tag: string }> = {
  education: { label: "Education", tag: "Education" },
  certification: { label: "Certifications", tag: "Certification" },
  professional: { label: "Professional", tag: "Professional" },
  entrepreneurial: { label: "Entrepreneurial", tag: "Founder" },
};

/** Entries after this year are shown as "Next". */
export const TIMELINE_CURRENT_YEAR = 2025;

export const timeline: TimelineItem[] = [
  { title: "KCPE Certificate", institution: "Lily Academy", period: "2013 - 2016", year: 2013, category: "education", description: "Primary school, with distinction in maths and sciences.", metrics: ["Distinction in STEM subjects"] },
  { title: "KCSE, Science & Technology", institution: "Thika High School", period: "2017 - 2020", year: 2017, category: "education", description: "Secondary school with a science and technology focus.", metrics: ["STEM specialization", "Science competitions"] },
  { title: "BSc Information Technology", institution: "Umma University", period: "Graduated", year: 2021, category: "education", description: "Degree in IT with a cybersecurity focus.", metrics: ["Cybersecurity Club leadership", "AI/ML research focus"] },
  { title: "Microsoft Azure Fundamentals", institution: "Microsoft", period: "2022", year: 2022, category: "certification", description: "Cloud concepts and core Azure services." },
  { title: "CompTIA Security+", institution: "CompTIA", period: "2022", year: 2022, category: "certification", description: "Baseline cybersecurity skills and risk management." },
  { title: "AWS Cloud Practitioner", institution: "Amazon Web Services", period: "2023", year: 2023, category: "certification", description: "AWS cloud concepts, architecture and cost." },
  { title: "Google Cybersecurity Professional", institution: "Google", period: "2023", year: 2023, category: "certification", description: "Threat detection and security operations." },
  { title: "CCNA", institution: "Cisco", period: "2023", year: 2023, category: "certification", description: "Network fundamentals and network security." },
  { title: "IBM Cybersecurity Analyst", institution: "IBM", period: "2024", year: 2024, category: "certification", description: "Threat intelligence and enterprise security management." },
  { title: "Information Security Specialist", institution: "ICT Authority of Kenya", period: "2022 - 2024", year: 2022, category: "professional", description: "Security operations for internal government systems.", metrics: ["Security hardening", "Incident monitoring and response", "Vulnerability assessment and fixes"] },
  { title: "Freelance Full-Stack Developer", institution: "Fiverr & Upwork", period: "2022 - 2024", year: 2022, category: "professional", description: "Web applications for freelance clients.", metrics: ["50+ small to mid-sized projects", "Consistently positive client feedback"] },
  { title: "IT Support / Frontend Development", institution: "Steadfast Academy", period: "2025 - Present", year: 2025, category: "professional", description: "Teacher and Parent portals, a mobile app and day-to-day IT support.", metrics: ["Teacher & Parent portals (Next.js, React)", "Parent mobile app (Expo / React Native)", "School information systems"] },
  { title: "Co-Founder & Backend Developer", institution: "Thee Entity Limited", period: "2025 - Present", year: 2025, category: "entrepreneurial", description: "Co-founded a small tech studio building cloud-native products.", metrics: ["Cloud-native architecture", "Automated deployment pipeline", "Infrastructure on a lean budget"] },
  { title: "Cybersecurity Leadership", institution: "Future Focus", period: "2026 & Beyond", year: 2026, category: "professional", description: "Next: lead security initiatives and mentor newcomers.", metrics: ["Enterprise security leadership", "Open-source contribution", "Mentorship"] },
];

export const closingNotes = [
  { title: "I adapt fast", desc: "Government, freelance clients, a school and a startup. Each asked for something different." },
  { title: "One picture", desc: "Development, support, networking and security are one skill set, and each makes me better at the others." },
  { title: "Still learning", desc: "Six certifications since 2022 and a lab I maintain by hand." },
];
