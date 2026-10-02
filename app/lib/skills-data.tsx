import type { ReactNode } from "react";
import {
  Code, Wrench, CircuitBoard, ShieldCheck, Network, Container,
  Layers, Boxes, Workflow, GitPullRequest, Braces, Database, Cloud, ServerCog,
} from "lucide-react";
import {
  BiLogoTypescript, BiLogoJava, BiLogoPython, BiLogoJavascript, BiLogoReact,
  BiLogoNodejs, BiLogoHtml5, BiLogoCss3, BiLogoFlutter, BiLogoVuejs, BiLogoFigma,
} from "react-icons/bi";
import { SiKotlin, SiCplusplus, SiDotnet, SiNextdotjs, SiFirebase, SiDocker, SiAmazonwebservices, SiProxmox } from "react-icons/si";
import { FaApple, FaWindows, FaLinux, FaAndroid } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";

/** Shared by /how-i-work and the FRIDAY assistant. */

export interface Capability {
  title: string;
  description: string;
  points: string[];
}

export interface SkillDomain {
  id: string;
  label: string;
  index: string;
  icon: ReactNode;
  tagline: string;
  summary: string;
  capabilities: Capability[];
  tools: string[];
}

export const domains: SkillDomain[] = [
  {
    id: "programming",
    label: "Programming",
    index: "01",
    icon: <Code className="w-4 h-4" />,
    tagline: "Engineered software, not just written code.",
    summary:
      "Nine languages and counting. From typed full-stack TypeScript to embedded C/C++, I think in terms of architecture, testability, and long-term maintainability, not just syntax.",
    capabilities: [
      {
        title: "Full-Stack Engineering",
        description: "End-to-end ownership from database schema to pixel-perfect UI, with clean layering between data, domain, and presentation.",
        points: ["Client + server + API design", "State management & data flow", "Error handling & edge cases"],
      },
      {
        title: "Systems & Embedded Programming",
        description: "Low-level C/C++ firmware for microcontrollers, written from scratch with tight resource budgets and hard real-time constraints.",
        points: ["ESP32/embedded firmware", "Memory & resource management", "Low-level I/O & protocols"],
      },
      {
        title: "Clean, Maintainable Code",
        description: "Code written for the next engineer to read. Strong typing, clear naming, and tests that document intent.",
        points: ["TypeScript strict typing", "SOLID principles", "Testable architecture"],
      },
    ],
    tools: ["TypeScript", "JavaScript", "Python", "Java", "C#", "C++", "Kotlin", "Dart", "Rust"],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    index: "02",
    icon: <Wrench className="w-4 h-4" />,
    tagline: "Root-cause diagnostics, not restarts.",
    summary:
      "A systematic, evidence-driven diagnostic method. I isolate variables, reproduce failures, and trace root causes down to the exact line of code, packet, or hardware component.",
    capabilities: [
      {
        title: "Diagnostic Methodology",
        description: "A repeatable process: reproduce, isolate, hypothesize, test, and verify. Evidence-driven fixes, verified under real conditions.",
        points: ["Root-cause analysis, not symptom-patching", "Binary search through problem space", "Log-driven evidence gathering"],
      },
      {
        title: "Debugging & Profiling",
        description: "From stack traces to memory leaks, I use the right tool for the signal: debuggers, profilers, and metrics.",
        points: ["Runtime debugging & breakpoints", "Performance & memory profiling", "Network traffic analysis"],
      },
      {
        title: "System & Network Forensics",
        description: "When something fails silently, I trace it through logs, OS events, and packet captures to reconstruct what happened.",
        points: ["Event & syslog analysis", "Packet capture & inspection", "Hardware fault isolation"],
      },
    ],
    tools: ["Wireshark", "gdb / LLDB", "Chrome DevTools", "systemd journal", "Process Monitor", "Hardware testers"],
  },
  {
    id: "hardware",
    label: "Hardware",
    index: "03",
    icon: <CircuitBoard className="w-4 h-4" />,
    tagline: "Software only works when the silicon underneath behaves.",
    summary:
      "I build, repair, and diagnose real machines. A 19-node homelab, RAID arrays, laptops stripped to the board, and ESP32 projects all run on hardware I assembled and debugged by hand.",
    capabilities: [
      {
        title: "PC Assembly & Repair",
        description: "Full machine builds, component replacement, thermal management, and fault diagnosis down to the individual part.",
        points: ["Motherboard & PSU diagnostics", "RAM / storage failure isolation", "Thermal & power integrity"],
      },
      {
        title: "Network & Server Hardware",
        description: "Dedicated server builds with ECC memory, RAID arrays, and 24/7 uptime, maintained and monitored hands-on.",
        points: ["RAID configuration & verify", "Server virtualization hosts", "Cable & interconnect management"],
      },
      {
        title: "Embedded & Electronics",
        description: "Microcontroller circuits, sensors, and custom firmware. I wire the board, write the code, and tune it on the bench.",
        points: ["ESP32 / MCU circuit design", "Sensor interfacing (I2C/SPI/UART)", "Bench debugging & measurement"],
      },
    ],
    tools: ["Multimeter", "Soldering iron", "Oscilloscope", "ESP32 DevKits", "Spare parts inventory", "Diagnostic boot media"],
  },
  {
    id: "security",
    label: "Security",
    index: "04",
    icon: <ShieldCheck className="w-4 h-4" />,
    tagline: "Security is a property of the whole system, not a feature.",
    summary:
      "Six certifications across security, cloud and networking, plus hands-on security support work. I protect infrastructure at every layer, from network hardening to secure application design and mobile threat defense.",
    capabilities: [
      {
        title: "Network & Infrastructure Hardening",
        description: "Locking down systems and networks against attack, with defense-in-depth and least-privilege as defaults.",
        points: ["Firewall & access control", "Vulnerability assessment", "Harden OS & services"],
      },
      {
        title: "Application & Mobile Security",
        description: "Building security into software from the start, with special focus on mobile devices on hostile public networks.",
        points: ["Secure coding practices", "Mobile threat defense", "Encryption & TLS everywhere"],
      },
      {
        title: "Security Operations",
        description: "Monitoring, detection, and response. I think like an attacker to defend like an engineer.",
        points: ["Threat detection & SIEM", "Incident response", "Security frameworks & audit"],
      },
    ],
    tools: ["CompTIA Security+", "CCNA", "Wireshark", "Nmap", "Azure Security", "IBM CERT"],
  },
  {
    id: "networking",
    label: "Networking",
    index: "05",
    icon: <Network className="w-4 h-4" />,
    tagline: "Every app is only as good as the network that carries it.",
    summary:
      "CCNA-trained network engineering. I design, configure, and troubleshoot network infrastructure, and run a fully-managed lab network where every device lease is assigned by me.",
    capabilities: [
      {
        title: "Network Design & Architecture",
        description: "Planning resilient, segmented networks with sensible addressing and security boundaries.",
        points: ["Subnetting & VLAN design", "Routing & switching", "Network segmentation"],
      },
      {
        title: "Configuration & Administration",
        description: "Hands-on configuration of routers, switches, wireless, and firewall appliances.",
        points: ["Router & switch config", "Static routes & DHCP", "Firewall & NAT rules"],
      },
      {
        title: "Performance & Fault Diagnosis",
        description: "Tracing latency, drops, and connectivity failures through the full path.",
        points: ["Packet-level analysis", "Latency & throughput testing", "Connectivity troubleshooting"],
      },
    ],
    tools: ["Cisco (CCNA)", "Wireshark", "Ping/Traceroute", "Nmap", "Proxmox Networking", "DHCP/DNS"],
  },
  {
    id: "cloudops",
    label: "Cloud & DevOps",
    index: "06",
    icon: <Container className="w-4 h-4" />,
    tagline: "From dev machine to production, automated and reproducible.",
    summary:
      "Certified across AWS, Azure, and Google Cloud with hands-on containerization and server virtualization. I build deployment pipelines that are fast, repeatable, and predictable.",
    capabilities: [
      {
        title: "Cloud Platforms & Services",
        description: "Multi-cloud fluency across the big three, from foundational services to cost-optimized architecture.",
        points: ["AWS / Azure / GCP services", "Serverless & containers", "Cost-conscious architecture"],
      },
      {
        title: "Containers & Virtualization",
        description: "Docker everywhere, and a Proxmox cluster for bare-metal-to-VM virtualization at home and at work.",
        points: ["Docker & Compose", "Proxmox VE virtualization", "Image & registry management"],
      },
      {
        title: "CI/CD & Infrastructure as Code",
        description: "Deployments that run themselves: pipelines, automation, and infrastructure defined in code.",
        points: ["Automated build & deploy", "Repeatable deployments", "Backups & monitoring (24/7)"],
      },
    ],
    tools: ["AWS", "Azure", "GCP", "Docker", "Proxmox", "CI/CD Pipelines"],
  },
];

export interface TechItem {
  title: string;
  icon: ReactNode;
}

export interface TechCategory {
  heading: string;
  description: string;
  items: TechItem[];
}

export const techs: TechCategory[] = [
  {
    heading: "Languages",
    description: "Programming languages I work with",
    items: [
      { title: "JavaScript", icon: <BiLogoJavascript /> },
      { title: "TypeScript", icon: <BiLogoTypescript /> },
      { title: "Python", icon: <BiLogoPython /> },
      { title: "Java", icon: <BiLogoJava /> },
      { title: "C#", icon: <SiDotnet /> },
      { title: "C++", icon: <SiCplusplus /> },
      { title: "Kotlin", icon: <SiKotlin /> },
      { title: "HTML5", icon: <BiLogoHtml5 /> },
      { title: "CSS3", icon: <BiLogoCss3 /> },
    ],
  },
  {
    heading: "Frameworks & Libraries",
    description: "Frontend and backend frameworks",
    items: [
      { title: "React", icon: <BiLogoReact /> },
      { title: "Next.js", icon: <SiNextdotjs /> },
      { title: "Node.js", icon: <BiLogoNodejs /> },
      { title: "Flutter", icon: <BiLogoFlutter /> },
      { title: "Vue.js", icon: <BiLogoVuejs /> },
    ],
  },
  {
    heading: "Operating Systems",
    description: "Platforms and OS environments",
    items: [
      { title: "Windows 10", icon: <FaWindows /> },
      { title: "Windows 11", icon: <FaWindows /> },
      { title: "macOS", icon: <FaApple /> },
      { title: "iOS", icon: <FaApple /> },
      { title: "Android", icon: <FaAndroid /> },
      { title: "Linux", icon: <FaLinux /> },
    ],
  },
  {
    heading: "Databases & Cloud",
    description: "Data storage and cloud platforms",
    items: [
      { title: "MongoDB", icon: <DiMongodb /> },
      { title: "Firebase", icon: <SiFirebase /> },
      { title: "AWS", icon: <SiAmazonwebservices /> },
    ],
  },
  {
    heading: "DevOps & Tools",
    description: "Development, deployment, and virtualization tools",
    items: [
      { title: "Docker", icon: <SiDocker /> },
      { title: "Proxmox", icon: <SiProxmox /> },
      { title: "Figma", icon: <BiLogoFigma /> },
    ],
  },
];

export const principles = [
  {
    title: "The right tool for the job",
    icon: <Layers className="w-4 h-4" />,
    desc: "I've learned enough languages and frameworks to choose by fit, not habit. Typed TypeScript for web, Kotlin for Android, C/C++ where the silicon matters.",
  },
  {
    title: "Clean layered architecture",
    icon: <Boxes className="w-4 h-4" />,
    desc: "Separating data, domain, and presentation keeps systems testable and swappable. A change in one layer should never ripple through everything.",
  },
  {
    title: "Security by default",
    icon: <Braces className="w-4 h-4" />,
    desc: "Every layer of the stack is engineered with security in mind: validate input, encrypt transit, enforce least privilege, and assume hostile networks.",
  },
  {
    title: "Optimize the right things",
    icon: <Workflow className="w-4 h-4" />,
    desc: "Measure before you tune. I focus on real bottlenecks and measurable wins, not premature micro-optimization.",
  },
];

export const architecture = [
  {
    title: "Frontend",
    icon: <Boxes className="w-4 h-4" />,
    stack: "Next.js · React · TypeScript · Tailwind",
    desc: "Server components, incremental rendering, and design systems. I improve UI performance through architecture, not hacks.",
  },
  {
    title: "Mobile",
    icon: <Braces className="w-4 h-4" />,
    stack: "React Native · Expo · Kotlin",
    desc: "Cross-platform apps that ship to both stores, plus native Kotlin builds for Android with local databases and offline-first design.",
  },
  {
    title: "Backend & APIs",
    icon: <ServerCog className="w-4 h-4" />,
    stack: "Node.js · Express · Next.js API",
    desc: "RESTful and typed APIs with auth, validation, and clean separation. Designed to scale and easy to reason about.",
  },
  {
    title: "Data",
    icon: <Database className="w-4 h-4" />,
    stack: "PostgreSQL · MongoDB · SQLite · Firebase",
    desc: "Schema design, queries, and data modeling that fit the access patterns, not the other way around. Both relational and document stores.",
  },
  {
    title: "Cloud & Infra",
    icon: <Cloud className="w-4 h-4" />,
    stack: "AWS · Azure · GCP · Docker · Proxmox",
    desc: "Multi-cloud architecture with containers, virtualization, and automation. Built to keep infrastructure costs low without losing reliability.",
  },
  {
    title: "Delivery",
    icon: <GitPullRequest className="w-4 h-4" />,
    stack: "Git · CI/CD · Automated deploy",
    desc: "Repeatable pipelines that take a commit to production automatically, with monitoring and backups built in.",
  },
];

export const workflow = [
  { step: "01", title: "Understand", desc: "Clarify the goal, constraints, and the real users before writing a line of code." },
  { step: "02", title: "Design", desc: "Map the architecture, data flow, and security boundaries on paper first." },
  { step: "03", title: "Build", desc: "Implement in small, reviewable increments with tests alongside the code." },
  { step: "04", title: "Verify", desc: "Test, lint, and profile. Prove it works and is fast under realistic load." },
  { step: "05", title: "Ship", desc: "Deploy through automation, then monitor for regressions and harden." },
  { step: "06", title: "Iterate", desc: "Refactor, learn, measure. Software is a living system, never a finished one." },
];

export const stack = [
  { item: "TypeScript", use: "Full-stack & mobile" },
  { item: "React / Next.js", use: "Web & SSR platforms" },
  { item: "React Native / Expo", use: "iOS + Android" },
  { item: "Node.js", use: "Backend & APIs" },
  { item: "Kotlin", use: "Native Android" },
  { item: "C / C++", use: "Embedded firmware" },
  { item: "Python", use: "Security tooling & scripting" },
  { item: "Docker", use: "Containers everywhere" },
  { item: "Proxmox", use: "VM & lab virtualization" },
  { item: "AWS / Azure / GCP", use: "Cloud platforms" },
  { item: "PostgreSQL / MongoDB", use: "Data storage" },
  { item: "C#", use: "Backend services" },
];
