"use client";
import { useState, useEffect } from "react";
import { Wifi, CloudUpload, Server, Cpu, Shield, Activity, HardDrive, Smartphone, Zap, ChevronRight, Terminal, Brain, Database, Network, Home, Lock, Clock } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";

const niches = [
  {
    id: "home-automation",
    title: "Home Automation",
    description: "Intelligent IoT network that responds to presence and creates ambient experiences",
    icon: <Home className="w-6 h-6" />,
    status: "Active Development",
    color: "#3b82f6",
    features: ["Phone detection via WiFi presence", "RGB lighting automation", "Multi-room device coordination", "Voice command integration"],
    components: ["Raspberry Pi 4 Controller", "ESP32 Microcontrollers", "Custom REST API", "MQTT Protocol"],
  },
  {
    id: "media-server",
    title: "Media & Backup Server",
    description: "High-performance home server with automated backup and media streaming capabilities",
    icon: <Server className="w-6 h-6" />,
    status: "Operational",
    color: "#8b5cf6",
    features: ["2TB RAID 1 Storage", "16GB DDR4 RAM", "Automated photo backup", "4K Media Streaming"],
    stats: [
      { label: "Storage Used", value: "1.2TB" },
      { label: "Uptime", value: "99.8%" },
      { label: "Services", value: "12+" },
    ],
  },
  {
    id: "robotics",
    title: "Robotics & Embedded",
    description: "Building intelligent robots and automation systems for real-world applications",
    icon: <Cpu className="w-6 h-6" />,
    status: "Experimental",
    color: "#10b981",
    projects: ["Line-following robot with computer vision", "Home surveillance drone prototype", "Voice-controlled assistant robot", "Automated plant watering system"],
    technologies: ["Arduino", "Raspberry Pi", "ROS (Robot Operating System)", "Computer Vision (OpenCV)"],
  },
];

const services = [
  { name: "Nextcloud", description: "Self-hosted cloud storage and collaboration", icon: <CloudUpload className="w-5 h-5" />, status: "Active", port: 8080 },
  { name: "Plex Media Server", description: "Media streaming for all devices", icon: <HardDrive className="w-5 h-5" />, status: "Active", port: 32400 },
  { name: "Home Assistant", description: "Open-source home automation platform", icon: <Zap className="w-5 h-5" />, status: "Active", port: 8123 },
  { name: "Pi-hole", description: "Network-wide ad blocking and DNS sinkhole", icon: <Shield className="w-5 h-5" />, status: "Active", port: 53 },
  { name: "Jellyfin", description: "Free software media system", icon: <Activity className="w-5 h-5" />, status: "Standby", port: 8096 },
  { name: "Git Server", description: "Self-hosted Git repository manager", icon: <Terminal className="w-5 h-5" />, status: "Active", port: 3000 },
];

const techStack = [
  { name: "Raspberry Pi 4", description: "4GB RAM • 64-bit • ARM Cortex-A72", icon: <Cpu className="w-6 h-6" /> },
  { name: "ESP32", description: "WiFi • Bluetooth • Dual Core • IoT", icon: <Brain className="w-6 h-6" /> },
  { name: "2TB HDD RAID", description: "RAID 1 • 7200 RPM • NAS Storage", icon: <Database className="w-6 h-6" /> },
  { name: "Custom Network", description: "VLAN • QoS • IoT Isolation", icon: <Network className="w-6 h-6" /> },
];

const philosophy = [
  { icon: Lock, title: "Privacy First", desc: "Self-hosted solutions ensure complete data ownership and eliminate third-party surveillance." },
  { icon: Activity, title: "Continuous Learning", desc: "Every automation is an opportunity to explore new protocols and system architectures." },
  { icon: Clock, title: "Efficiency", desc: "Automating repetitive tasks creates more time for meaningful work and creative projects." },
  { icon: Shield, title: "Security Research", desc: "Building and securing personal systems provides invaluable insights for enterprise security." },
];

export default function Niche() {
  const [automationStatus, setAutomationStatus] = useState({
    phoneDetected: true,
    lightsActive: true,
    backupRunning: false,
    serverOnline: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setAutomationStatus((prev) => ({
        ...prev,
        backupRunning: prev.phoneDetected && prev.lightsActive ? !prev.backupRunning : false,
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen w-full py-24 md:py-32 px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", backgroundColor: "var(--color-bg-card)" }}>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            TECHNICAL PASSIONS & PERSONAL PROJECTS
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ color: "var(--color-text-primary)" }}>
            Home Lab & Robotics
          </h1>
          <div className="w-16 h-0.5 mx-auto mb-8 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }} />
          <p className="max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}>
            Where professional skills meet personal passion. A living ecosystem of automation,
            robotics, and self-hosted services.
          </p>
        </div>

        <div className="mb-20">
          <div className="border rounded-2xl p-6 md:p-8 transition-all duration-300"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: "var(--color-text-primary)" }}>
                  Ecosystem Dashboard
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  Real-time status of my automated environment
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-tertiary)" }}>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span style={{ color: "var(--color-text-secondary)" }}>All Systems Operational</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Phone Detection", value: automationStatus.phoneDetected ? "Connected" : "Offline", active: automationStatus.phoneDetected, icon: Smartphone, color: "#10b981" },
                { label: "RGB Lighting", value: automationStatus.lightsActive ? "Active" : "Standby", active: automationStatus.lightsActive, icon: Zap, color: "#3b82f6" },
                { label: "Backup Status", value: automationStatus.backupRunning ? "Running" : "Idle", active: automationStatus.backupRunning, icon: CloudUpload, color: "#8b5cf6" },
                { label: "Home Server", value: automationStatus.serverOnline ? "Online" : "Offline", active: automationStatus.serverOnline, icon: Server, color: "#f59e0b" },
              ].map((item, idx) => (
                <div key={idx} className="border rounded-xl p-5 transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    borderColor: item.active ? `${item.color}50` : "var(--color-border)",
                    backgroundColor: item.active ? `${item.color}08` : "var(--color-surface)",
                  }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.active ? item.color : "var(--color-text-muted)" }} />
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{item.label}</div>
                      <div className="text-base font-semibold" style={{ color: item.active ? item.color : "var(--color-text-muted)" }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-xl p-6"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              <h4 className="font-semibold mb-6 flex items-center gap-2"
                style={{ color: "var(--color-text-primary)" }}>
                <Wifi className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
                Automation Workflow
              </h4>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {[
                  { icon: Smartphone, title: "Phone Connects to WiFi", sub: "Presence detection triggers automation", color: "#3b82f6" },
                  { icon: Zap, title: "RGB Lights Activate", sub: "Ambient lighting adjusts to presence", color: "#10b981" },
                  { icon: CloudUpload, title: "Auto Backup Starts", sub: "Photos sync to home server", color: "#8b5cf6" },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 md:gap-0">
                    <div className="text-center group">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 mx-auto transition-transform group-hover:scale-110"
                        style={{ border: `1px solid ${step.color}40`, backgroundColor: `${step.color}10` }}>
                        <step.icon className="w-8 h-8" style={{ color: step.color }} />
                      </div>
                      <div className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{step.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{step.sub}</div>
                    </div>
                    {idx < 2 && <ChevronRight className="w-6 h-6 hidden md:block" style={{ color: "var(--color-text-muted)" }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-8"
            style={{ color: "var(--color-text-primary)" }}>
            Technical Passion Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {niches.map((niche) => (
              <div key={niche.id} className="group border rounded-xl p-6 transition-all duration-500 hover:scale-[1.03]"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${niche.color}15`, border: `1px solid ${niche.color}30` }}>
                    {niche.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                      {niche.title}
                    </h4>
                    <span className="text-xs px-2 py-0.5 rounded-full inline-block mt-1"
                      style={{
                        border: `1px solid ${niche.color}30`,
                        backgroundColor: `${niche.color}10`,
                        color: niche.color,
                      }}>
                      {niche.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {niche.description}
                </p>
                {niche.features && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-3"
                      style={{ color: "var(--color-text-muted)" }}>
                      Key Features
                    </div>
                    <ul className="space-y-2">
                      {niche.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm"
                          style={{ color: "var(--color-text-secondary)" }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: niche.color }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {niche.stats && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {niche.stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-3 rounded-lg border"
                        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                        <div className="text-lg font-bold" style={{ color: niche.color }}>{stat.value}</div>
                        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                {niche.projects && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-3"
                      style={{ color: "var(--color-text-muted)" }}>
                      Projects
                    </div>
                    <ul className="space-y-2">
                      {niche.projects.map((project, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm"
                          style={{ color: "var(--color-text-secondary)" }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: niche.color }} />
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="border rounded-2xl p-6 md:p-8"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: "var(--color-text-primary)" }}>
                  Home Server Services
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>2TB Storage • 16GB RAM • 12+ Running Services</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-tertiary)" }}>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span style={{ color: "var(--color-text-secondary)" }}>6 Active Services</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, idx) => (
                <div key={idx} className="border rounded-xl p-5 transition-all duration-300 hover:scale-[1.03]"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "var(--color-bg-tertiary)", border: "1px solid var(--color-border)" }}>
                        {service.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
                          {service.name}
                        </h5>
                        <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
                          service.status === "Active" ? "text-green-400" : "text-amber-400"
                        }`}
                          style={{
                            backgroundColor: service.status === "Active" ? "#10b98115" : "#f59e0b15",
                            border: `1px solid ${service.status === "Active" ? "#10b98130" : "#f59e0b30"}`,
                          }}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-3 border-t"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                    <span>Port: {service.port}</span>
                    <span>HTTP/HTTPS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center"
            style={{ color: "var(--color-text-primary)" }}>
            Home Lab Technology
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, idx) => (
              <div key={idx} className="group border rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.05]"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "var(--color-bg-tertiary)", border: "1px solid var(--color-border)" }}>
                  {tech.icon}
                </div>
                <h4 className="font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
                  {tech.name}
                </h4>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-2xl p-6 md:p-8"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="lg:w-1/3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "var(--color-accent-glow)", border: "1px solid var(--color-border)" }}>
                <Wifi className="w-7 h-7" style={{ color: "var(--color-accent)" }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>
                Why Home Automation?
              </h3>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Building intelligent systems that adapt to life, not forcing life to adapt to technology.
              </p>
            </div>
            <div className="lg:w-2/3">
              <div className="grid sm:grid-cols-2 gap-4">
                {philosophy.map((item, idx) => (
                  <div key={idx} className="border rounded-xl p-5 transition-all duration-300 hover:scale-[1.03]"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"
                      style={{ color: "var(--color-text-primary)" }}>
                      <item.icon className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="mb-6" style={{ color: "var(--color-text-muted)" }}>
            This ecosystem represents the intersection of professional expertise and personal curiosity.
          </p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--color-bg-tertiary)",
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-border)",
            }}>
            Back to Portfolio
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
