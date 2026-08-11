"use client";
import { useState, useCallback } from "react";
import { Server, Cpu, Monitor, Smartphone, Headphones, Watch, Keyboard, HardDrive, Camera, Cpu as CpuIcon, Wifi, ChevronDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import HobbiesLoading from "@/app/components/HobbiesLoading";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";

interface GearItem {
  name: string;
  outcome: string;
  skill: string;
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
      {
        name: "HP 745 G7",
        outcome: "My daily driver, every build, container, and prototype starts here. VMs, Docker stacks and dev servers run side-by-side without flinching.",
        skill: "Dev Environment",
        icon: <Cpu className="w-3.5 h-3.5" />,
        specs: ["AMD Ryzen 5 PRO 3500U", "16GB DDR4 RAM", "512GB NVMe SSD", "14\" FHD Display", "Radeon Vega 8 Graphics"],
      },
      {
        name: "HP 820 G3",
        outcome: "Dedicated test bench, disposable VMs and network experiments run here so nothing risky ever touches the main machine.",
        skill: "Lab & Testing",
        icon: <Cpu className="w-3.5 h-3.5" />,
        specs: ["Intel Core i5-6200U", "12GB DDR4 RAM", "256GB SATA SSD", "12.5\" FHD Display"],
      },
      {
        name: "HP Tower Server",
        outcome: "Self-hosted Proxmox node that virtualises the whole lab: media server, backups and dev services running 24/7 with RAID-1 resilience.",
        skill: "Server Administration",
        icon: <Server className="w-3.5 h-3.5" />,
        specs: ["Intel Xeon / Core i5", "16GB ECC DDR4 RAM", "2TB HDD Storage", "RAID 1 Config", "Proxmox VE", "24/7 Self-Hosted"],
      },
    ],
  },
  {
    title: "Displays",
    icon: <Monitor className="w-4 h-4" />,
    items: [
      {
        name: "ThinkVision 24\"",
        outcome: "Primary canvas, with code, dashboards and camera feeds watched live while the lab runs.",
        skill: "Monitoring",
        icon: <Monitor className="w-3.5 h-3.5" />,
        specs: ["24\" Full HD (1920x1080)", "IPS Panel", "VGA + DVI + DP Inputs", "Tilt-Adjustable Stand"],
      },
      {
        name: "Lenovo Monitor",
        outcome: "Second screen keeps logs, metrics and automation dashboards visible without breaking focus.",
        skill: "Ops Visibility",
        icon: <Monitor className="w-3.5 h-3.5" />,
        specs: ["22-24\" Lenovo Branded", "Full HD Resolution", "VGA + HDMI Inputs", "Workspace Multiplier"],
      },
      {
        name: "18\" Portable Monitor",
        outcome: "Field display, plug in anywhere to inspect a server, debug hardware or demo a build on the go.",
        skill: "On-the-Go",
        icon: <Monitor className="w-3.5 h-3.5" />,
        specs: ["18\" IPS Portable Display", "USB-C Powered", "1080p Resolution", "Plug-and-Play w/ Laptop"],
      },
    ],
  },
  {
    title: "Peripherals",
    icon: <Keyboard className="w-4 h-4" />,
    items: [
      {
        name: "AULA S2027",
        outcome: "New daily typing board, RGB-lit and responsive, built for long coding marathons and late-night terminal sessions.",
        skill: "Gaming & Typing",
        icon: <Keyboard className="w-3.5 h-3.5" />,
        specs: ["AULA S2027 Gaming Keyboard", "Full RGB Backlight", "Mechanical Feel Keys", "Anti-Ghosting", "USB Wired Connection"],
      },
      {
        name: "Newmen Keyboard",
        outcome: "Types the thousands of lines that run this lab, with custom keybinds mapped for my most-used commands.",
        skill: "Daily Driver",
        icon: <Keyboard className="w-3.5 h-3.5" />,
        specs: ["Newmen Mechanical Feel", "Full Keyboard Layout", "LED Backlit Keys", "USB Wired Connection", "Spill-Resistant Design"],
      },
      {
        name: "Glorious Model O",
        outcome: "Current main mouse, 68g of featherweight precision for fast cursor work, long coding sessions and competitive play.",
        skill: "Daily Driver",
        icon: <Cpu className="w-3.5 h-3.5" />,
        specs: ["68g Ultra-Lightweight", "Glorious 16K Optical Sensor", "Up to 12,000 DPI", "Honeycomb Shell Design", "RGB Lighting", "PTFE Mouse Feet"],
      },
      {
        name: "Newmen Mouse",
        outcome: "Workhorse pointer for long coding sessions and rapid-fire terminal work.",
        skill: "Daily Driver",
        icon: <Cpu className="w-3.5 h-3.5" />,
        specs: ["Newmen Optical Sensor", "1600 DPI Default", "3-Button + Scroll", "Ergonomic Design", "USB Wired"],
      },
      {
        name: "Safaricom Router",
        outcome: "Lab backbone, every device on this network is managed by me: static leases, port forwarding and uptime monitoring.",
        skill: "Networking",
        icon: <Wifi className="w-3.5 h-3.5" />,
        specs: ["Safaricom 4G LTE Router", "Dual-Band WiFi", "Up to 150Mbps", "Ethernet LAN Ports", "Carrier-Provided"],
      },
    ],
  },
  {
    title: "Mobile & Audio",
    icon: <Smartphone className="w-4 h-4" />,
    items: [
      {
        name: "Galaxy A05s",
        outcome: "Remote control for the lab, SSH sessions, automation triggers and live camera feeds from anywhere.",
        skill: "Remote Ops",
        icon: <Smartphone className="w-3.5 h-3.5" />,
        specs: ["Samsung Galaxy A05s", "Snapdragon 680", "6.7\" PLS LCD 90Hz", "4GB RAM / 64GB Storage", "50MP Triple Camera", "5000mAh Battery"],
      },
      {
        name: "F+ Kaduda",
        outcome: "No-frills backup line for calls and texts while the smartphone is doing lab duty.",
        skill: "Reliability",
        icon: <Smartphone className="w-3.5 h-3.5" />,
        specs: ["F+ Kaduda Feature Phone", "Basic Call & Text", "Dual SIM", "Long Battery Life"],
      },
      {
        name: "ORAiMO SpaceBuds Neo Plus",
        outcome: "Hands-free calls and focus audio for deep work and long lab sessions.",
        skill: "Audio",
        icon: <Headphones className="w-3.5 h-3.5" />,
        specs: ["ORAiMO SpaceBuds Neo Plus", "True Wireless Stereo", "Bluetooth 5.3", "Touch Controls", "IPX5 Water Resistant", "~24h Battery (Case)"],
      },
      {
        name: "ORAiMO SmartWatch 5N",
        outcome: "Health and notification hub, alerts hit the wrist so nothing is missed mid-debug.",
        skill: "Notifications",
        icon: <Watch className="w-3.5 h-3.5" />,
        specs: ["ORAiMO SmartWatch 5N", "1.3\" AMOLED Display", "Heart Rate & SpO2 Monitor", "Step & Sleep Tracking", "Bluetooth Call Sync", "7-Day Battery Life"],
      },
    ],
  },
  {
    title: "Spare Gear",
    icon: <HardDrive className="w-4 h-4" />,
    items: [
      {
        name: "2TB HDDs & SSDs",
        outcome: "RAID-1 storage for backups and archives, with redundancy configured, tested and verified.",
        skill: "Storage",
        icon: <HardDrive className="w-3.5 h-3.5" />,
        specs: ["Mixed 2.5\" & 3.5\" Drives", "SSD + HDD Combo", "Used for Backups & Experiments"],
      },
      {
        name: "Digital Camera",
        outcome: "Reference shots for documentation, builds and project write-ups.",
        skill: "Documentation",
        icon: <Camera className="w-3.5 h-3.5" />,
        specs: ["Compact Digital Camera", "Optical Zoom Lens", "SD Card Storage", "Great for Reference Shots"],
      },
      {
        name: "ESP32 Dev Kit",
        outcome: "The heart of my IoT work, sensor networks, home automation endpoints and robot brains, all running custom firmware I wrote.",
        skill: "Embedded / IoT",
        icon: <CpuIcon className="w-3.5 h-3.5" />,
        specs: ["ESP32-WROOM-32 Module", "Dual-Core Xtensa LX6", "WiFi + BLE 4.2", "GPIO / I2C / SPI / UART", "Full Dev Board w/ USB", "Used in Robotics & Automation"],
      },
    ],
  },
];

const projects = [
  {
    title: "Home Automation",
    outcome: "The lab lights, locks and devices run on my own automation: phone presence detection switches rooms automatically, RGB scenes coordinate across multiple rooms, and voice commands control it all.",
    how: "ESP32 endpoints · custom firmware · presence sniffing · REST hooks",
    status: "LIVE 24/7",
    icon: <Wifi className="w-4 h-4" />,
  },
  {
    title: "Media & Backup Server",
    outcome: "An always-on server streaming 4K to every screen in the lab while automated nightly backups protect 2TB of RAID-1 storage, with no data lost since day one.",
    how: "Proxmox VE · RAID 1 · cron automation · self-hosted services",
    status: "LIVE 24/7",
    icon: <Server className="w-4 h-4" />,
  },
  {
    title: "Robotics & Embedded",
    outcome: "Line-following robots, drone prototypes and ESP32 automation systems, with firmware written from scratch, PID control and sensor fusion tuned by hand on the bench.",
    how: "ESP32-WROOM · C/C++ firmware · sensors · bench debugging",
    status: "BUILT & TESTED",
    icon: <Cpu className="w-4 h-4" />,
  },
];

export default function Hobbies() {
  const [loading, setLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleLoadingFinish = useCallback(() => {
    setLoading(false);
  }, []);

  const toggleItem = (key: string) => {
    setExpandedItem(expandedItem === key ? null : key);
  };

  if (loading) {
    return <HobbiesLoading onFinish={handleLoadingFinish} />;
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
        style={{
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
          borderBottom: "1px solid var(--color-glass-border)",
        }}
      >
        <div className="flex items-center justify-between h-14 max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            href="/home"
            className="group inline-flex items-center gap-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:-translate-x-0.5"
              style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
            Back to Portfolio
          </Link>
          <span className="hidden sm:block text-[10px] font-semibold tracking-[0.25em] uppercase"
            style={{ color: "var(--color-text-muted)" }}>
            Hobbies
          </span>
        </div>
      </header>

      <section id="hobbies" className="min-h-screen w-full pt-16 md:pt-20 pb-24 md:pb-32 px-4 relative overflow-hidden isolate"
        style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/nichebackground.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{ opacity: 0.6 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45))" }}
      />
      <ScrollReveal className="relative z-10">
      <div className="max-w-5xl mx-auto w-full">

        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}>
            Hobbies
          </h1>
          <div className="w-6 h-px mx-auto mt-3 mb-4" style={{ backgroundColor: "var(--color-accent)" }} />
          <p className="max-w-lg mx-auto text-xs md:text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}>
            Machines, tools, and experiments, where professional skills meet hands-on passion.
          </p>
        </div>

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
                            <p className="text-[11px] mt-1 leading-relaxed line-clamp-2" style={{ color: "var(--color-text-muted)" }}>
                              {item.outcome}
                            </p>
                            <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase"
                              style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)", border: "1px solid var(--color-glass-border)" }}>
                              {item.skill}
                            </span>
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
          <StaggerReveal staggerDelay={80}>
          <div className="grid sm:grid-cols-3 gap-3">
            {projects.map((p) => (
              <div key={p.title}
                className="p-5 rounded-xl liquid-card transition-all duration-300 hover:scale-[1.02] text-center"
                style={{ borderColor: "var(--color-glass-border-strong)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                  {p.icon}
                </div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: "var(--color-text-primary)" }}>
                  {p.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase mb-3"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)", border: "1px solid var(--color-glass-border)" }}>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                  {p.status}
                </span>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {p.outcome}
                </p>
                <p className="text-[10px] mt-2.5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {p.how}
                </p>
              </div>
            ))}
          </div>
          </StaggerReveal>
        </div>

        <div className="text-center max-w-lg mx-auto">
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            &ldquo;Every device in this lab tells a story, of late-night debugging, of breakthrough moments, 
            of systems built to serve real life, not just demos.&rdquo;
          </p>
        </div>

        <StaggerReveal>
        <div className="mt-12 pt-8 text-center border-t"
          style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/home"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
              }}>
              Back to Portfolio
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
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
    </>
  );
}
