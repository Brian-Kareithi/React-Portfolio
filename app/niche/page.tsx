"use client";
import { Server, Cpu, Monitor, Smartphone, Headphones, Watch, Router, Keyboard, HardDrive, Camera, Cpu as CpuIcon, Wifi } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";

const gearCategories = [
  {
    title: "Computing",
    icon: <Cpu className="w-4 h-4" />,
    items: [
      { name: "HP 745 G7", detail: "Ryzen edition — daily driver laptop", icon: <Cpu className="w-3.5 h-3.5" /> },
      { name: "HP 820 G3", detail: "12GB RAM, 256GB SSD — secondary laptop", icon: <Cpu className="w-3.5 h-3.5" /> },
      { name: "HP Tower Server", detail: "2TB storage, 16GB RAM — self-hosted backbone", icon: <Server className="w-3.5 h-3.5" /> },
    ],
  },
  {
    title: "Displays",
    icon: <Monitor className="w-4 h-4" />,
    items: [
      { name: "ThinkVision 24\"", detail: "Primary monitor — sharp and reliable", icon: <Monitor className="w-3.5 h-3.5" /> },
      { name: "Lenovo Monitor", detail: "Secondary display — keeps things flowing", icon: <Monitor className="w-3.5 h-3.5" /> },
      { name: "18\" Portable Monitor", detail: "On-the-go productivity screen", icon: <Monitor className="w-3.5 h-3.5" /> },
    ],
  },
  {
    title: "Peripherals",
    icon: <Keyboard className="w-4 h-4" />,
    items: [
      { name: "Newmen Keyboard", detail: "Daily typing and coding companion", icon: <Keyboard className="w-3.5 h-3.5" /> },
      { name: "Newmen Mouse", detail: "Simple, reliable, gets the job done", icon: <Cpu className="w-3.5 h-3.5" /> },
      { name: "Safaricom Router", detail: "Keeping the lab connected", icon: <Wifi className="w-3.5 h-3.5" /> },
    ],
  },
  {
    title: "Mobile & Audio",
    icon: <Smartphone className="w-4 h-4" />,
    items: [
      { name: "Galaxy A05s", detail: "Daily driver phone", icon: <Smartphone className="w-3.5 h-3.5" /> },
      { name: "F+ Kaduda", detail: "Secondary device", icon: <Smartphone className="w-3.5 h-3.5" /> },
      { name: "ORAiMO SpaceBuds Neo Plus", detail: "Wireless earbuds for focus and calls", icon: <Headphones className="w-3.5 h-3.5" /> },
      { name: "ORAiMO SmartWatch 5N", detail: "Health tracking and notifications", icon: <Watch className="w-3.5 h-3.5" /> },
    ],
  },
  {
    title: "Spare Gear",
    icon: <HardDrive className="w-4 h-4" />,
    items: [
      { name: "2TB HDDs & SSDs", detail: "Storage for archiving, backups, and experiments", icon: <HardDrive className="w-3.5 h-3.5" /> },
      { name: "Digital Camera", detail: "Capturing moments and references", icon: <Camera className="w-3.5 h-3.5" /> },
      { name: "ESP32 Dev Kit", detail: "Full kit for IoT and robotics prototyping", icon: <CpuIcon className="w-3.5 h-3.5" /> },
    ],
  },
];

const projects = [
  {
    title: "Home Automation",
    desc: "IoT network with phone detection, RGB lighting, multi-room coordination, and voice commands.",
    icon: <Wifi className="w-4 h-4" />,
  },
  {
    title: "Media & Backup Server",
    desc: "Automated backups, 4K streaming, and 2TB RAID storage — always on.",
    icon: <Server className="w-4 h-4" />,
  },
  {
    title: "Robotics & Embedded",
    desc: "Line-following robots, drone prototypes, ESP32-powered automation systems.",
    icon: <Cpu className="w-4 h-4" />,
  },
];

export default function Niche() {
  return (
    <section id="niche" className="min-h-screen w-full py-24 md:py-32 px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">

        {/* Minimal Header */}
        <div className="mb-20 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}>
            /niche
          </h1>
          <div className="w-6 h-px mx-auto mt-3 mb-4" style={{ backgroundColor: "var(--color-accent)" }} />
          <p className="max-w-lg mx-auto text-xs md:text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}>
            Machines, tools, and experiments — where professional skills meet hands-on passion.
          </p>
        </div>

        {/* My Gear */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-2"
              style={{ color: "var(--color-text-muted)" }}>
              Equipment
            </p>
            <h2 className="text-xl md:text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}>
              My Gear
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {gearCategories.map((cat, i) => (
              <StaggerReveal key={cat.title} staggerDelay={i * 60}>
              <div className="p-5 rounded-xl liquid-card transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-glass-border-strong)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                    {cat.icon}
                  </div>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    {cat.title}
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="mt-0.5" style={{ color: "var(--color-accent)" }}>{item.icon}</span>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                          {item.name}
                        </p>
                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </StaggerReveal>
            ))}
          </div>
        </div>

        {/* Projects — minimal */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-2"
              style={{ color: "var(--color-text-muted)" }}>
              What I Build
            </p>
            <h2 className="text-xl md:text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}>
              Projects
            </h2>
          </div>
          <StaggerReveal staggerDelay={100}>
          <div className="grid sm:grid-cols-3 gap-3">
            {projects.map((p) => (
              <div key={p.title}
                className="p-5 rounded-xl liquid-card transition-all duration-300 hover:-translate-y-0.5 text-center"
                style={{ borderColor: "var(--color-glass-border-strong)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                  {p.icon}
                </div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: "var(--color-text-primary)" }}>
                  {p.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
          </StaggerReveal>
        </div>

        {/* Philosophy — one line */}
        <div className="text-center max-w-lg mx-auto">
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            "Every device in this lab tells a story — of late-night debugging, of breakthrough moments, 
            of systems built to serve real life, not just demos."
          </p>
        </div>

        {/* Minimal CTA */}
        <StaggerReveal>
        <div className="mt-12 pt-8 text-center border-t"
          style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
              }}>
              Back to Portfolio
            </Link>
            <Link href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text-light)",
              }}>
              Get in Touch
            </Link>
          </div>
        </div>
        </StaggerReveal>

      </div>
      </ScrollReveal>
    </section>
  );
}
