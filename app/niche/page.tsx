"use client";
import { useState } from "react";
import { Server, Cpu, Monitor, Smartphone, Headphones, Watch, Router, Keyboard, HardDrive, Camera, Cpu as CpuIcon, Wifi, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";

interface GearItem {
  name: string;
  detail: string;
  specs: string[];
  icon: React.ReactNode;
}

interface GearCategory {
  title: string;
  icon: React.ReactNode;
  items: GearItem[];
}

const gearCategories: GearCategory[] = [
  {
    title: "Computing",
    icon: <Cpu className="w-4 h-4" />,
    items: [
      { name: "HP 745 G7", detail: "Ryzen edition — daily driver", icon: <Cpu className="w-3.5 h-3.5" />, specs: ["AMD Ryzen 5 PRO 3500U", "16GB DDR4 RAM", "512GB NVMe SSD", "14\" FHD Display", "Radeon Vega 8 Graphics"] },
      { name: "HP 820 G3", detail: "12GB RAM, 256GB SSD — secondary", icon: <Cpu className="w-3.5 h-3.5" />, specs: ["Intel Core i5-6200U", "12GB DDR4 RAM", "256GB SATA SSD", "12.5\" FHD Display"] },
      { name: "HP Tower Server", detail: "2TB storage, 16GB RAM — backbone", icon: <Server className="w-3.5 h-3.5" />, specs: ["Intel Xeon / Core i5", "16GB ECC DDR4 RAM", "2TB HDD Storage", "RAID 1 Config", "Proxmox VE", "24/7 Self-Hosted"] },
    ],
  },
  {
    title: "Displays",
    icon: <Monitor className="w-4 h-4" />,
    items: [
      { name: "ThinkVision 24\"", detail: "Primary monitor", icon: <Monitor className="w-3.5 h-3.5" />, specs: ["24\" Full HD (1920x1080)", "IPS Panel", "VGA + DVI + DP Inputs", "Tilt-Adjustable Stand"] },
      { name: "Lenovo Monitor", detail: "Secondary display", icon: <Monitor className="w-3.5 h-3.5" />, specs: ["22-24\" Lenovo Branded", "Full HD Resolution", "VGA + HDMI Inputs", "Workspace Multiplier"] },
      { name: "18\" Portable Monitor", detail: "On-the-go productivity", icon: <Monitor className="w-3.5 h-3.5" />, specs: ["18\" IPS Portable Display", "USB-C Powered", "1080p Resolution", "Plug-and-Play w/ Laptop"] },
    ],
  },
  {
    title: "Peripherals",
    icon: <Keyboard className="w-4 h-4" />,
    items: [
      { name: "Newmen Keyboard", detail: "Daily typing companion", icon: <Keyboard className="w-3.5 h-3.5" />, specs: ["Newmen Mechanical Feel", "Full Keyboard Layout", "LED Backlit Keys", "USB Wired Connection", "Spill-Resistant Design"] },
      { name: "Newmen Mouse", detail: "Reliable workhorse", icon: <Cpu className="w-3.5 h-3.5" />, specs: ["Newmen Optical Sensor", "1600 DPI Default", "3-Button + Scroll", "Ergonomic Design", "USB Wired"] },
      { name: "Safaricom Router", detail: "Keeping the lab connected", icon: <Wifi className="w-3.5 h-3.5" />, specs: ["Safaricom 4G LTE Router", "Dual-Band WiFi", "Up to 150Mbps", "Ethernet LAN Ports", "Carrier-Provided"] },
    ],
  },
  {
    title: "Mobile & Audio",
    icon: <Smartphone className="w-4 h-4" />,
    items: [
      { name: "Galaxy A05s", detail: "Daily driver phone", icon: <Smartphone className="w-3.5 h-3.5" />, specs: ["Samsung Galaxy A05s", "Snapdragon 680", "6.7\" PLS LCD 90Hz", "4GB RAM / 64GB Storage", "50MP Triple Camera", "5000mAh Battery"] },
      { name: "F+ Kaduda", detail: "Secondary device", icon: <Smartphone className="w-3.5 h-3.5" />, specs: ["F+ Kaduda Feature Phone", "Basic Call & Text", "Dual SIM", "Long Battery Life"] },
      { name: "ORAiMO SpaceBuds Neo Plus", detail: "Wireless earbuds", icon: <Headphones className="w-3.5 h-3.5" />, specs: ["ORAiMO SpaceBuds Neo Plus", "True Wireless Stereo", "Bluetooth 5.3", "Touch Controls", "IPX5 Water Resistant", "~24h Battery (Case)"] },
      { name: "ORAiMO SmartWatch 5N", detail: "Health & notifications", icon: <Watch className="w-3.5 h-3.5" />, specs: ["ORAiMO SmartWatch 5N", "1.3\" AMOLED Display", "Heart Rate & SpO2 Monitor", "Step & Sleep Tracking", "Bluetooth Call Sync", "7-Day Battery Life"] },
    ],
  },
  {
    title: "Spare Gear",
    icon: <HardDrive className="w-4 h-4" />,
    items: [
      { name: "2TB HDDs & SSDs", detail: "Storage for archiving", icon: <HardDrive className="w-3.5 h-3.5" />, specs: ["Mixed 2.5\" & 3.5\" Drives", "SSD + HDD Combo", "Used for Backups & Experiments"] },
      { name: "Digital Camera", detail: "Capturing moments", icon: <Camera className="w-3.5 h-3.5" />, specs: ["Compact Digital Camera", "Optical Zoom Lens", "SD Card Storage", "Great for Reference Shots"] },
      { name: "ESP32 Dev Kit", detail: "IoT prototyping", icon: <CpuIcon className="w-3.5 h-3.5" />, specs: ["ESP32-WROOM-32 Module", "Dual-Core Xtensa LX6", "WiFi + BLE 4.2", "GPIO / I2C / SPI / UART", "Full Dev Board w/ USB", "Used in Robotics & Automation"] },
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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setExpandedItem(expandedItem === key ? null : key);
  };

  return (
    <section id="niche" className="min-h-screen w-full pt-16 md:pt-20 pb-24 md:pb-32 px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">

        {/* Minimal Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}>
            Fun
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
              <div className="p-5 rounded-xl liquid-card transition-all duration-300"
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
                <div className="space-y-1.5">
                  {cat.items.map((item, idx) => {
                    const key = `${cat.title}-${idx}`;
                    const open = expandedItem === key;
                    return (
                      <div key={idx}>
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg transition-all duration-200 hover:liquid-card"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-accent)" }}>{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-medium">{item.name}</p>
                              <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                                style={{ color: "var(--color-text-muted)" }} />
                            </div>
                            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                              {item.detail}
                            </p>
                          </div>
                        </button>
                        {open && (
                          <div className="mx-2 mb-2 px-3 py-2.5 rounded-lg animate-fade-in-up"
                            style={{ backgroundColor: "var(--color-surface)" }}>
                            <ul className="space-y-1">
                              {item.specs.map((spec, si) => (
                                <li key={si} className="flex items-start gap-2 text-[11px]"
                                  style={{ color: "var(--color-text-secondary)" }}>
                                  <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: "var(--color-accent)" }} />
                                  {spec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              </StaggerReveal>
            ))}
          </div>
        </div>

        {/* Projects */}
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

        {/* Philosophy */}
        <div className="text-center max-w-lg mx-auto">
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            &ldquo;Every device in this lab tells a story — of late-night debugging, of breakthrough moments, 
            of systems built to serve real life, not just demos.&rdquo;
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
