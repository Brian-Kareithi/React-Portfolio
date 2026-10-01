"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  Code, Wrench, CircuitBoard, ShieldCheck, Network, Container,
  ArrowRight, CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";

interface Capability {
  title: string;
  description: string;
  points: string[];
}

interface SkillDomain {
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

const spearhead = [
  { value: "50+", label: "Projects Delivered" },
  { value: "6", label: "Certifications" },
  { value: "19", label: "Devices Managed" },
  { value: "9", label: "Languages" },
  { value: "3", label: "Clouds" },
  { value: "3TB", label: "RAID Protected" },
];

export default function ExpertiseClient() {
  const [activeDomain, setActiveDomain] = useState(domains[0].id);
  const current = domains.find((d) => d.id === activeDomain)!;

  return (
    <section id="expertise" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3.75 sm:px-7.5 lg:px-12 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="05"
          label="Capabilities"
          variant="center"
          title={<>What I&rsquo;m <em className="font-serif-accent">good at</em></>}
          description="Six domains, one mindset: deep, hands-on mastery across the entire technology stack, from bare silicon to cloud-native systems."
        />

        {/* Spearhead stats as round badges */}
        <StaggerReveal staggerDelay={60}>
        <div className="mb-16 flex flex-wrap justify-center gap-4 sm:mb-20 sm:gap-6">
          {spearhead.map((s, i) => (
            <div
              key={s.label}
              className="flex h-28 w-28 flex-col items-center justify-center rounded-full border text-center sm:h-32 sm:w-32"
              style={{
                backgroundColor: i % 2 === 0 ? "var(--color-bg-card)" : "var(--color-highlight)",
                borderColor: "var(--color-border)",
              }}
            >
              <span className="display-xl text-3xl sm:text-4xl" style={{ color: "var(--color-accent)" }}>
                {s.value}
              </span>
              <span className="mt-1 max-w-[5.5rem] text-[10px] font-medium leading-tight" style={{ color: "var(--color-text-secondary)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        </StaggerReveal>

        {/* Domain menu + detail */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div
            className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Skill domains"
          >
            {domains.map((d) => {
              const active = d.id === activeDomain;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDomain(d.id)}
                  role="tab"
                  aria-selected={active}
                  className="group flex min-h-[44px] flex-shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-left transition-all duration-200 lg:rounded-2xl lg:px-5 lg:py-4"
                  style={{
                    backgroundColor: active ? "var(--color-accent)" : "var(--color-bg-card)",
                    borderColor: active ? "var(--color-accent)" : "var(--color-border)",
                    color: active ? "var(--color-on-accent)" : "var(--color-text-secondary)",
                  }}
                >
                  <span className="font-mono text-[11px] opacity-70">{d.index}</span>
                  <span className="inline-flex" aria-hidden="true">{d.icon}</span>
                  <span className="whitespace-nowrap text-sm font-medium lg:font-serif-accent lg:text-2xl lg:font-normal">{d.label}</span>
                </button>
              );
            })}
          </div>

          <div key={current.id} className="ink-slab animate-fade-in-up p-6 xs:p-8 md:p-10 lg:col-span-8">
            <p className="font-mono text-xs mb-4" style={{ color: "var(--color-accent)" }}>
              {current.index} / 06 · {current.label}
            </p>
            <h3 className="display-xl mb-4 text-3xl sm:text-4xl">
              {current.tagline}
            </h3>
            <p className="mb-6 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {current.summary}
            </p>

            <div className="mb-8 flex flex-wrap gap-1.5">
              {current.tools.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1 font-mono text-[11px]" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="grid gap-3">
              {current.capabilities.map((cap, i) => (
                <div key={cap.title} className="flat-card p-5">
                  <p className="font-serif-accent mb-2 text-3xl leading-none" style={{ color: "var(--color-accent)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mb-1.5 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    {cap.title}
                  </h4>
                  <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {cap.description}
                  </p>
                  <ul className="space-y-1.5">
                    {cap.points.map((p) => (
                      <li key={p} className="flex items-start gap-1.5 text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                        <CheckCircle className="mt-0.5 w-3 h-3 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA links */}
        <StaggerReveal>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-[2rem] px-6 py-6 sm:px-8" style={{ backgroundColor: "var(--color-highlight)" }}>
          <p className="max-w-xl text-base" style={{ color: "var(--color-text-primary)" }}>
            This is the &ldquo;what&rdquo;. For the <em className="font-serif-accent" style={{ color: "var(--color-accent)" }}>how</em> I think and work, dive into Diagnostics and Engineering.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/troubleshooting" className="btn-neon btn-neon-ghost">
              Diagnostics
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/engineering" className="btn-neon btn-neon-primary">
              Engineering
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        </StaggerReveal>

        <NextSection
          title="See the how and the work"
          description="Capabilities are the what. Dig into the methodology and the results."
          links={[
            { href: "/troubleshooting", label: "Diagnostics", description: "A repeatable, evidence-driven method for root causes." },
            { href: "/engineering", label: "Engineering", description: "Architecture principles and delivery workflow." },
            { href: "/projects", label: "Selected Work", description: "Products, apps and experiments built with these skills." },
          ]}
        />
      </div>
      </ScrollReveal>
    </section>
  );
}
