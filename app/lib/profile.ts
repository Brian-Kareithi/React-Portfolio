import { siteConfig } from "@/app/lib/site";

/** Plain-text profile shared by /llms.txt. */
export const profileText = `# Brian Kareithi: llms.txt
> Full-Stack Developer who started in IT and security (Nairobi, Kenya)

## About
Brian is a full-stack developer who started in IT support and security, which is why he builds software with the network, servers and users in mind. His main work is full-stack web and mobile development; IT and security come with the territory. He builds secure, cloud-native products across three areas:
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
- 19-device homelab: 24/7 Proxmox, RAID-1, ESP32 automation
- Recent focus: React Native (Expo), Next.js, secure cloud architecture

## Pages
- [Home](${siteConfig.url}/): Overview, roles and quick links
- [About](${siteConfig.url}/about): Journey, education, certifications, experience
- [How I Work](${siteConfig.url}/how-i-work): Principles, stack by layer, workflow and capabilities
- [Diagnostics](${siteConfig.url}/troubleshooting): Troubleshooting method and case studies
- [Selected Work](${siteConfig.url}/projects): Case studies: problem, solution, architecture
- [Homelab](${siteConfig.url}/homelab): 24/7 infrastructure: Proxmox, RAID-1, managed network, ESP32 automation
- [Resume](${siteConfig.url}/resume): Role-tailored resume with PDF download: frontend, full-stack, mobile, IT support, or infrastructure
- [Contact](${siteConfig.url}/contact): Email and contact form
`;
