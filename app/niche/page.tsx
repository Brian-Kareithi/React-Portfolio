"use client";
import { Server, Cpu, Shield, Activity, HardDrive, Smartphone, Zap, Terminal, Brain, Database, Network, Home, Clock, Wifi, Lock } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";

const niches = [
  {
    id: "home-automation",
    title: "Home Automation",
    description: "Intelligent IoT network that responds to presence and creates ambient experiences.",
    icon: <Home className="w-5 h-5" />,
    features: ["Phone detection via WiFi presence", "RGB lighting automation", "Multi-room device coordination", "Voice command integration"],
  },
  {
    id: "media-server",
    title: "Media & Backup Server",
    description: "High-performance home server with automated backup and media streaming capabilities.",
    icon: <Server className="w-5 h-5" />,
    features: ["2TB RAID 1 Storage", "16GB DDR4 RAM", "Automated photo backup", "4K Media Streaming"],
  },
  {
    id: "robotics",
    title: "Robotics & Embedded",
    description: "Building intelligent robots and automation systems for real-world applications.",
    icon: <Cpu className="w-5 h-5" />,
    features: ["Line-following robot with computer vision", "Home surveillance drone prototype", "Voice-controlled assistant robot", "Automated plant watering system"],
  },
];

const services = [
  { name: "Nextcloud", description: "Self-hosted cloud storage and collaboration", icon: <Smartphone className="w-4 h-4" /> },
  { name: "Plex Media Server", description: "Media streaming for all devices", icon: <HardDrive className="w-4 h-4" /> },
  { name: "Home Assistant", description: "Open-source home automation platform", icon: <Zap className="w-4 h-4" /> },
  { name: "Pi-hole", description: "Network-wide ad blocking and DNS sinkhole", icon: <Shield className="w-4 h-4" /> },
  { name: "Jellyfin", description: "Free software media system", icon: <Activity className="w-4 h-4" /> },
  { name: "Git Server", description: "Self-hosted Git repository manager", icon: <Terminal className="w-4 h-4" /> },
];

const philosophy = [
  { icon: Lock, title: "Privacy First", desc: "Self-hosted solutions ensure complete data ownership and eliminate third-party surveillance." },
  { icon: Activity, title: "Continuous Learning", desc: "Every automation is an opportunity to explore new protocols and system architectures." },
  { icon: Clock, title: "Efficiency", desc: "Automating repetitive tasks creates more time for meaningful work and creative projects." },
  { icon: Shield, title: "Security Research", desc: "Building and securing personal systems provides invaluable insights for enterprise security." },
];

export default function Niche() {
  return (
    <section id="niche" className="min-h-screen w-full py-24 md:py-32 px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">

        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            PERSONAL PROJECTS
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: "var(--color-text-primary)" }}>
            Home Lab & Robotics
          </h1>
          <p className="max-w-2xl text-base md:text-lg font-light leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}>
            Where professional skills meet personal passion — a living ecosystem of automation,
            robotics, and self-hosted services.
          </p>
        </div>

        {/* Passion Projects */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--color-text-primary)" }}>
            Projects
          </h2>
          <div className="space-y-4">
            {niches.map((niche) => (
              <div key={niche.id} className="border rounded-xl p-6 transition-all duration-300 liquid-card"
                style={{ borderColor: "var(--color-glass-border-strong)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-tertiary)" }}>
                    {niche.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
                      {niche.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: "var(--color-text-secondary)" }}>
                      {niche.description}
                    </p>
                    <ul className="space-y-1">
                      {niche.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm"
                          style={{ color: "var(--color-text-muted)" }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "var(--color-text-muted)" }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--color-text-primary)" }}>
            Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((service, idx) => (
              <div key={idx} className="border rounded-xl px-5 py-4 transition-all duration-300 liquid-card"
                style={{ borderColor: "var(--color-glass-border)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-tertiary)" }}>
                    {service.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      {service.name}
                    </div>
                    <div className="text-xs mt-0.5 truncate" style={{ color: "var(--color-text-muted)" }}>
                      {service.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--color-text-primary)" }}>
            Philosophy
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {philosophy.map((item, idx) => (
              <div key={idx} className="border rounded-xl p-5 transition-all duration-300 liquid-card"
                style={{ borderColor: "var(--color-glass-border)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
                  <h3 className="font-medium text-sm" style={{ color: "var(--color-text-primary)" }}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t pt-12 text-center"
          style={{ borderColor: "var(--color-border)" }}>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
            Interested in building something like this? Let&apos;s talk.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text-light)",
              }}>
              Contact Me
            </Link>
            <Link href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
              }}>
              Back to Portfolio
            </Link>
          </div>
        </div>

      </div>
      </ScrollReveal>
    </section>
  );
}
