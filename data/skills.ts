import { Boxes, Braces, Cloud, Database, GitPullRequest, ServerCog, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  BiLogoTypescript, BiLogoJava, BiLogoPython, BiLogoJavascript, BiLogoReact,
  BiLogoNodejs, BiLogoHtml5, BiLogoCss3, BiLogoFlutter, BiLogoVuejs, BiLogoFigma,
} from "react-icons/bi";
import { SiKotlin, SiCplusplus, SiDotnet, SiNextdotjs, SiFirebase, SiDocker, SiAmazonwebservices, SiProxmox } from "react-icons/si";
import { FaApple, FaWindows, FaLinux, FaAndroid } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";

export interface Capability {
  title: string;
  description: string;
  points: string[];
}

export interface SkillDomain {
  id: string;
  label: string;
  index: string;
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
    tagline: "Software designed to be maintained.",
    summary:
      "From typed full-stack TypeScript to embedded C/C++, I design for architecture, testability and long-term maintenance.",
    capabilities: [
      {
        title: "Full-Stack Engineering",
        description: "Database schema to polished UI, with clean layers between data, domain and presentation.",
        points: ["Client + server + API design", "State management & data flow", "Error handling & edge cases"],
      },
      {
        title: "Systems & Embedded Programming",
        description: "C/C++ firmware for microcontrollers, written from scratch under tight resource limits.",
        points: ["ESP32/embedded firmware", "Memory & resource management", "Low-level I/O & protocols"],
      },
      {
        title: "Clean, Maintainable Code",
        description: "Code the next engineer can read: strong typing, clear names, tests that explain intent.",
        points: ["TypeScript strict typing", "SOLID principles", "Testable architecture"],
      },
    ],
    tools: ["TypeScript", "JavaScript", "Python", "Java", "C#", "C++", "Kotlin", "Dart", "Rust"],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    index: "02",
    tagline: "Looking for the root cause before the quick fix.",
    summary:
      "I isolate variables, reproduce failures and trace root causes to the line, packet or component behind them.",
    capabilities: [
      {
        title: "Diagnostic Methodology",
        description: "Reproduce, isolate, hypothesize, test, verify. Fixes backed by evidence.",
        points: ["Root-cause analysis, not symptom-patching", "Binary search through problem space", "Log-driven evidence gathering"],
      },
      {
        title: "Debugging & Profiling",
        description: "Debuggers, profilers and metrics, matched to the signal.",
        points: ["Runtime debugging & breakpoints", "Performance & memory profiling", "Network traffic analysis"],
      },
      {
        title: "System & Network Forensics",
        description: "When something fails silently, I rebuild what happened from logs, OS events and packet captures.",
        points: ["Event & syslog analysis", "Packet capture & inspection", "Hardware fault isolation"],
      },
    ],
    tools: ["Wireshark", "gdb / LLDB", "Chrome DevTools", "systemd journal", "Process Monitor", "Hardware testers"],
  },
  {
    id: "hardware",
    label: "Hardware",
    index: "03",
    tagline: "Software only works when the silicon underneath behaves.",
    summary:
      "I build, repair and diagnose real machines, from servers and RAID arrays to laptops and ESP32 boards.",
    capabilities: [
      {
        title: "PC Assembly & Repair",
        description: "Builds, part swaps, thermals and fault diagnosis down to the component.",
        points: ["Motherboard & PSU diagnostics", "RAM / storage failure isolation", "Thermal & power integrity"],
      },
      {
        title: "Network & Server Hardware",
        description: "Dedicated servers with ECC memory and RAID, kept up 24/7.",
        points: ["RAID configuration & verify", "Server virtualization hosts", "Cable & interconnect management"],
      },
      {
        title: "Embedded & Electronics",
        description: "I wire the board, write the firmware and tune it on the bench.",
        points: ["ESP32 / MCU circuit design", "Sensor interfacing (I2C/SPI/UART)", "Bench debugging & measurement"],
      },
    ],
    tools: ["Multimeter", "Soldering iron", "Oscilloscope", "ESP32 DevKits", "Spare parts inventory", "Diagnostic boot media"],
  },
  {
    id: "security",
    label: "Security",
    index: "04",
    tagline: "Security is a property of the whole system, not a feature.",
    summary:
      "I work on security at every layer, from network hardening to secure application design.",
    capabilities: [
      {
        title: "Network & Infrastructure Hardening",
        description: "Defense-in-depth and least privilege by default.",
        points: ["Firewall & access control", "Vulnerability assessment", "Harden OS & services"],
      },
      {
        title: "Application & Mobile Security",
        description: "Security built in from the start, with a focus on mobile on hostile public networks.",
        points: ["Secure coding practices", "Mobile threat defense", "Encryption & TLS everywhere"],
      },
      {
        title: "Security Operations",
        description: "Monitoring, detection and response. I look at systems the way an attacker would, then harden them.",
        points: ["Threat detection & SIEM", "Incident response", "Security frameworks & audit"],
      },
    ],
    tools: ["CompTIA Security+", "CCNA", "Wireshark", "Nmap", "Azure Security", "IBM CERT"],
  },
  {
    id: "networking",
    label: "Networking",
    index: "05",
    tagline: "Every app is only as good as the network that carries it.",
    summary:
      "I design, configure and troubleshoot networks, and run a fully managed lab network.",
    capabilities: [
      {
        title: "Network Design & Architecture",
        description: "Resilient, segmented networks with clear security boundaries.",
        points: ["Subnetting & VLAN design", "Routing & switching", "Network segmentation"],
      },
      {
        title: "Configuration & Administration",
        description: "Routers, switches, wireless and firewalls, configured by hand.",
        points: ["Router & switch config", "Static routes & DHCP", "Firewall & NAT rules"],
      },
      {
        title: "Performance & Fault Diagnosis",
        description: "Latency, drops and failures traced along the full path.",
        points: ["Packet-level analysis", "Latency & throughput testing", "Connectivity troubleshooting"],
      },
    ],
    tools: ["Cisco (CCNA)", "Wireshark", "Ping/Traceroute", "Nmap", "Proxmox Networking", "DHCP/DNS"],
  },
  {
    id: "cloudops",
    label: "Cloud & DevOps",
    index: "06",
    tagline: "From dev machine to production, automated and reproducible.",
    summary:
      "Containers, virtualization and deployment pipelines that are fast, repeatable and predictable.",
    capabilities: [
      {
        title: "Cloud Platforms & Services",
        description: "AWS, Azure and Google Cloud, from core services to cost-aware architecture.",
        points: ["AWS / Azure / GCP services", "Serverless & containers", "Cost-conscious architecture"],
      },
      {
        title: "Containers & Virtualization",
        description: "Docker, plus Proxmox for virtualization.",
        points: ["Docker & Compose", "Proxmox VE virtualization", "Image & registry management"],
      },
      {
        title: "CI/CD & Infrastructure as Code",
        description: "Pipelines, automation and infrastructure defined in code.",
        points: ["Automated build & deploy", "Repeatable deployments", "Backups & monitoring (24/7)"],
      },
    ],
    tools: ["AWS", "Azure", "GCP", "Docker", "Proxmox", "CI/CD Pipelines"],
  },
];

export interface TechItem {
  title: string;
  icon: IconType;
}

export interface TechCategory {
  heading: string;
  items: TechItem[];
}

export const techs: TechCategory[] = [
  {
    heading: "Languages",
    items: [
      { title: "JavaScript", icon: BiLogoJavascript },
      { title: "TypeScript", icon: BiLogoTypescript },
      { title: "Python", icon: BiLogoPython },
      { title: "Java", icon: BiLogoJava },
      { title: "C#", icon: SiDotnet },
      { title: "C++", icon: SiCplusplus },
      { title: "Kotlin", icon: SiKotlin },
      { title: "HTML5", icon: BiLogoHtml5 },
      { title: "CSS3", icon: BiLogoCss3 },
    ],
  },
  {
    heading: "Frameworks & Libraries",
    items: [
      { title: "React", icon: BiLogoReact },
      { title: "Next.js", icon: SiNextdotjs },
      { title: "Node.js", icon: BiLogoNodejs },
      { title: "Flutter", icon: BiLogoFlutter },
      { title: "Vue.js", icon: BiLogoVuejs },
    ],
  },
  {
    heading: "Operating Systems",
    items: [
      { title: "Windows 10", icon: FaWindows },
      { title: "Windows 11", icon: FaWindows },
      { title: "macOS", icon: FaApple },
      { title: "iOS", icon: FaApple },
      { title: "Android", icon: FaAndroid },
      { title: "Linux", icon: FaLinux },
    ],
  },
  {
    heading: "Databases & Cloud",
    items: [
      { title: "MongoDB", icon: DiMongodb },
      { title: "Firebase", icon: SiFirebase },
      { title: "AWS", icon: SiAmazonwebservices },
    ],
  },
  {
    heading: "DevOps & Tools",
    items: [
      { title: "Docker", icon: SiDocker },
      { title: "Proxmox", icon: SiProxmox },
      { title: "Figma", icon: BiLogoFigma },
    ],
  },
];

export const principles = [
  {
    title: "The right tool for the job",
    desc: "I choose by fit, not habit: TypeScript for web, Kotlin for Android, C/C++ where the silicon matters.",
  },
  {
    title: "Clean layered architecture",
    desc: "Separate data, domain and presentation, so a change in one layer never ripples through the rest.",
  },
  {
    title: "Security by default",
    desc: "Validate input, encrypt in transit, enforce least privilege, assume hostile networks.",
  },
  {
    title: "Optimize the right things",
    desc: "Measure first. Fix real bottlenecks, not imagined ones.",
  },
];

export interface StackLayer {
  title: string;
  icon: LucideIcon;
  stack: string;
  desc: string;
}

export const architecture: StackLayer[] = [
  {
    title: "Frontend",
    icon: Boxes,
    stack: "Next.js · React · TypeScript · Tailwind",
    desc: "Server components, incremental rendering and design systems.",
  },
  {
    title: "Mobile",
    icon: Braces,
    stack: "React Native · Expo · Kotlin",
    desc: "Cross-platform apps for both stores, plus native Kotlin with offline-first design.",
  },
  {
    title: "Backend & APIs",
    icon: ServerCog,
    stack: "Node.js · Express · Next.js API",
    desc: "Typed REST APIs with auth, validation and clean separation.",
  },
  {
    title: "Data",
    icon: Database,
    stack: "PostgreSQL · MongoDB · SQLite · Firebase",
    desc: "Schemas and queries shaped around access patterns, relational or document.",
  },
  {
    title: "Cloud & Infra",
    icon: Cloud,
    stack: "AWS · Azure · GCP · Docker · Proxmox",
    desc: "Containers, virtualization and automation that keep costs low and reliability high.",
  },
  {
    title: "Delivery",
    icon: GitPullRequest,
    stack: "Git · CI/CD · Automated deploy",
    desc: "Pipelines from commit to production, with monitoring and backups built in.",
  },
];

export const workflow = [
  { step: "01", title: "Understand", desc: "Pin down the goal, constraints and real users first." },
  { step: "02", title: "Design", desc: "Map architecture, data flow and security boundaries." },
  { step: "03", title: "Build", desc: "Small, reviewable steps, with tests." },
  { step: "04", title: "Verify", desc: "Test, lint and profile under realistic load." },
  { step: "05", title: "Ship", desc: "Deploy through automation, then monitor and harden." },
  { step: "06", title: "Iterate", desc: "Refactor, measure, repeat." },
];
