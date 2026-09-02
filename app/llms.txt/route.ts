import { NextResponse } from "next/server";
import { siteConfig } from "@/app/lib/site";

export function GET() {
  const text = `# Brian Kareithi — llms.txt
> Full-Stack Developer, React Native & Cybersecurity Specialist (Nairobi, Kenya)

## About
Brian Kareithi builds secure, scalable software end-to-end: typed full-stack
applications, cross-platform mobile apps, and cloud-native infrastructure. He
holds six certifications (Azure Fundamentals, CompTIA Security+, AWS Cloud
Practitioner, Google Cybersecurity Professional, CCNA, IBM Cybersecurity
Analyst) and has delivered 50+ projects across public, private and
entrepreneurial sectors.

## Contact
- Email: ${siteConfig.email}
- Phone: ${siteConfig.phoneDisplay}
- Location: ${siteConfig.location}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}

## Key facts
- BSc Information Technology, Umma University (cybersecurity focus)
- 5+ years in tech, 50+ projects delivered
- 18-device homelab: 24/7 Proxmox, RAID-1, ESP32 automation
- Recent focus: React Native (Expo), Next.js, secure cloud architecture

## Pages
- [Home](${siteConfig.url}/) — Overview, roles and quick links
- [About](${siteConfig.url}/about) — Journey, education, certifications, experience
- [Expertise](${siteConfig.url}/expertise) — Six skill domains with capabilities
- [Engineering](${siteConfig.url}/engineering) — Principles, architecture, workflow
- [Diagnostics](${siteConfig.url}/troubleshooting) — Troubleshooting method and case studies
- [Tech Stack](${siteConfig.url}/techstack) — Languages, frameworks, tools by proficiency
- [Selected Work](${siteConfig.url}/projects) — Projects, apps and experiments
- [Homelab](${siteConfig.url}/hobbies) — Gear, builds and lab experiments
- [Contact](${siteConfig.url}/contact) — Email and contact form
`;

  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}