import { NextResponse } from "next/server";
import { siteConfig } from "@/app/lib/site";

export function GET() {
  const text = `# Brian Kareithi — llms.txt
> Software Engineer — Web, Mobile & Cloud-Native Systems (Nairobi, Kenya)

## About
Brian Kareithi builds secure, cloud-native products across three areas:
software engineering (React, Next.js, TypeScript, Node.js), mobile
development (React Native, Expo), and IT & infrastructure (Linux,
networking, system administration). He works in IT support and frontend
development at Steadfast Academy, holds six certifications (Azure
Fundamentals, CompTIA Security+, AWS Cloud Practitioner, Google
Cybersecurity Professional, CCNA, IBM Cybersecurity Analyst), and has
delivered 50+ projects.

## Contact
- Email: ${siteConfig.email}
- Phone: ${siteConfig.phoneDisplay}
- Location: ${siteConfig.location}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}

## Key facts
- BSc Information Technology, Umma University (cybersecurity focus)
- 3 years in tech, 50+ projects delivered
- 18-device homelab: 24/7 Proxmox, RAID-1, ESP32 automation
- Recent focus: React Native (Expo), Next.js, secure cloud architecture

## Pages
- [Home](${siteConfig.url}/) — Overview, roles and quick links
- [About](${siteConfig.url}/about) — Journey, education, certifications, experience
- [Expertise](${siteConfig.url}/expertise) — Six skill domains with capabilities
- [Engineering](${siteConfig.url}/engineering) — Principles, architecture, workflow
- [Diagnostics](${siteConfig.url}/troubleshooting) — Troubleshooting method and case studies
- [Tech Stack](${siteConfig.url}/techstack) — Languages, frameworks, tools by proficiency
- [Selected Work](${siteConfig.url}/projects) — Case studies: problem, solution, architecture
- [Homelab](${siteConfig.url}/hobbies) — Gear, builds and lab experiments
- [Resume](${siteConfig.url}/resume) — Role-tailored resume: software, mobile, or IT
- [Contact](${siteConfig.url}/contact) — Email and contact form
`;

  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}