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

const domains: SkillDomain[] = [
  {
    id: "programming",
    label: "Programming",
    index: "01",
    icon: <Code className="w-4 h-4" />,
    tagline: "I don't just write code, I engineer software.",
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
    tagline: "Anyone can restart a machine. I find out why it crashed.",
    summary:
      "A systematic, evidence-driven diagnostic method. I isolate variables, reproduce failures, and trace root causes down to the exact line of code, packet, or hardware component.",
    capabilities: [
      {
        title: "Diagnostic Methodology",
        description: "A repeatable process: reproduce, isolate, hypothesize, test, and verify. No guesswork, no cargo-cult fixes.",
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
      "I build, repair, and diagnose real machines. A 18-node homelab, RAID arrays, laptops stripped to the board, and ESP32 projects all run on hardware I assembled and debugged by hand.",
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
      "Six security certifications and real public-sector experience. I protect infrastructure at every layer, from network hardening to secure application design and mobile threat defense.",
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
        points: ["AWS / Azure / GCP services", "Serverless & containers", "Cost optimization (60% saved)"],
      },
      {
        title: "Containers & Virtualization",
        description: "Docker everywhere, and a Proxmox cluster for bare-metal-to-VM virtualization at home and at work.",
        points: ["Docker & Compose", "Proxmox VE virtualization", "Image & registry management"],
      },
      {
        title: "CI/CD & Infrastructure as Code",
        description: "Deployments that run themselves: pipelines, automation, and infrastructure defined in code.",
        points: ["Automated build & deploy", "15-minute deployments", "Backups & monitoring (24/7)"],
      },
    ],
    tools: ["AWS", "Azure", "GCP", "Docker", "Proxmox", "CI/CD Pipelines"],
  },
];

const spearhead = [
  { value: "50+", label: "Projects Delivered" },
  { value: "6", label: "Certifications" },
  { value: "18", label: "Devices Managed" },
  { value: "9", label: "Languages" },
  { value: "3", label: "Clouds" },
  { value: "2TB", label: "RAID Protected" },
];

export default function ExpertiseClient() {
  const [activeDomain, setActiveDomain] = useState(domains[0].id);
  const current = domains.find((d) => d.id === activeDomain)!;

  return (
    <section id="expertise" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3 xs:px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-7xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="05"
          label="Capabilities"
          title={<>What I&rsquo;m <em className="font-serif-accent">good at</em></>}
          description="Six domains, one mindset: deep, hands-on mastery across the entire technology stack, from bare silicon to cloud-native systems."
        />

        {/* Spearhead stats */}
        <StaggerReveal staggerDelay={60}>
        <div className="grid grid-cols-3 lg:grid-cols-6 border divide-x divide-y lg:divide-y-0 mb-14 xs:mb-16 sm:mb-20"
          style={{ borderColor: "var(--color-border)" }}>
          {spearhead.map((s) => (
            <div key={s.label} className="py-6 px-2 text-center">
              <span className="text-2xl sm:text-3xl font-bold block" style={{ color: "var(--color-accent)" }}>
                {s.value}
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--color-text-muted)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        </StaggerReveal>

        {/* Domain selector */}
        <div className="border" style={{ borderColor: "var(--color-border)" }}>
          <StaggerReveal staggerDelay={60}>
          <div className="flex flex-wrap lg:grid lg:grid-cols-6 border-b" style={{ borderColor: "var(--color-border)" }}>
            {domains.map((d) => {
              const active = d.id === activeDomain;
              return (
                <button key={d.id} onClick={() => setActiveDomain(d.id)}
                  className="group flex-1 lg:flex-none px-3 py-3 sm:py-4 text-[10px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-300 relative min-w-[120px]"
                  style={{
                    color: active ? "var(--color-accent)" : "var(--color-text-muted)",
                  }}>
                  <span className="mr-1.5 inline-flex align-middle">{d.icon}</span>
                  {d.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-in-out ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                    style={{ backgroundColor: "var(--color-accent)" }} />
                </button>
              );
            })}
          </div>
          </StaggerReveal>

          <div key={current.id} className="animate-fade-in-up p-5 xs:p-6 sm:p-8 md:p-12">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left: overview */}
              <div className="lg:col-span-1">
                <p className="font-mono text-[10px] xs:text-xs mb-3" style={{ color: "var(--color-accent)" }}>
                  {current.index} / 06
                </p>
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold leading-tight mb-3"
                  style={{ color: "var(--color-text-primary)" }}>
                  {current.tagline}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {current.summary}
                </p>

                <div className="mt-6">
                  <p className="text-[9px] tracking-[0.2em] uppercase mb-2.5" style={{ color: "var(--color-text-muted)" }}>
                    Tools &amp; Expertise
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {current.tools.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[10px] font-mono liquid-card"
                        style={{ borderColor: "var(--color-glass-border)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: capabilities */}
              <div className="lg:col-span-2 space-y-4">
                {current.capabilities.map((cap, i) => (
                  <div key={cap.title} className="liquid-card p-5 sm:p-6"
                    style={{ borderColor: "var(--color-glass-border)" }}>
                    <div className="flex items-start gap-3.5">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs"
                        style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm sm:text-base mb-1.5"
                          style={{ color: "var(--color-text-primary)" }}>
                          {cap.title}
                        </h4>
                        <p className="text-xs sm:text-sm leading-relaxed mb-3"
                          style={{ color: "var(--color-text-secondary)" }}>
                          {cap.description}
                        </p>
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                          {cap.points.map((p) => (
                            <span key={p} className="inline-flex items-center gap-1.5 text-[11px]"
                              style={{ color: "var(--color-text-muted)" }}>
                              <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA links */}
        <StaggerReveal>
        <div className="pt-10 mt-14 border-t" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-sm max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
              This is the &ldquo;what&rdquo;. For the <em className="font-serif-accent">how</em> I think and work, dive into Diagnostics and Engineering.
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
