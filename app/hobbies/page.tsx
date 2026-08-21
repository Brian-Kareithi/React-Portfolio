"use client";
import { useState, ReactNode } from "react";
import {
  Server, Cpu, Monitor, Smartphone, Headphones, Watch, Keyboard, HardDrive,
  Camera, Wifi, ChevronDown, ArrowLeft, Activity, Database, ShieldCheck, Radio,
} from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

interface GearItem {
  name: string;
  outcome: string;
  skill: string;
  specs: string[];
  icon: ReactNode;
}

interface GearCategory {
  title: string;
  icon: ReactNode;
  items: GearItem[];
}

const gearCategories: GearCategory[] = [
  {
    title: "Computing",
    icon: <Cpu className="w-3.5 h-3.5" />,
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
    icon: <Monitor className="w-3.5 h-3.5" />,
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
    icon: <Keyboard className="w-3.5 h-3.5" />,
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
    icon: <Smartphone className="w-3.5 h-3.5" />,
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
    icon: <HardDrive className="w-3.5 h-3.5" />,
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
        icon: <Cpu className="w-3.5 h-3.5" />,
        specs: ["ESP32-WROOM-32 Module", "Dual-Core Xtensa LX6", "WiFi + BLE 4.2", "GPIO / I2C / SPI / UART", "Full Dev Board w/ USB", "Used in Robotics & Automation"],
      },
    ],
  },
];

const builds = [
  {
    title: "Home Automation",
    outcome: "The lab lights, locks and devices run on my own automation: phone presence detection switches rooms automatically, RGB scenes coordinate across multiple rooms, and voice commands control it all.",
    stack: "ESP32 endpoints · custom firmware · presence sniffing · REST hooks",
    status: "Live 24/7",
    icon: <Wifi className="w-3.5 h-3.5" />,
  },
  {
    title: "Media & Backup Server",
    outcome: "An always-on server streaming 4K to every screen in the lab while automated nightly backups protect 2TB of RAID-1 storage, with no data lost since day one.",
    stack: "Proxmox VE · RAID 1 · cron automation · self-hosted services",
    status: "Live 24/7",
    icon: <Server className="w-3.5 h-3.5" />,
  },
  {
    title: "Robotics & Embedded",
    outcome: "Line-following robots, drone prototypes and ESP32 automation systems, with firmware written from scratch, PID control and sensor fusion tuned by hand on the bench.",
    stack: "ESP32-WROOM · C/C++ firmware · sensors · bench debugging",
    status: "Built & Tested",
    icon: <Cpu className="w-3.5 h-3.5" />,
  },
];

const labStats = [
  { label: "Server Uptime", value: "24/7", note: "Proxmox node, always on", icon: <Activity className="w-3.5 h-3.5" /> },
  { label: "Storage Protected", value: "2TB", note: "RAID-1 mirrored array", icon: <Database className="w-3.5 h-3.5" /> },
  { label: "Data Lost", value: "0 B", note: "since day one", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { label: "Devices Managed", value: "18", note: "every lease assigned by me", icon: <Radio className="w-3.5 h-3.5" /> },
];

const tinkering = [
  {
    title: "ESP32 Sensor Mesh",
    desc: "Room-presence detection nodes feeding the automation engine over WiFi.",
    icon: <Radio className="w-3.5 h-3.5" />,
  },
  {
    title: "Proxmox Experiments",
    desc: "Cluster and failover drills on spare hardware, snapshots before every risky move.",
    icon: <Server className="w-3.5 h-3.5" />,
  },
  {
    title: "Custom Firmware",
    desc: "Hand-rolled C/C++ for every endpoint in the lab, no stock sketches allowed.",
    icon: <Cpu className="w-3.5 h-3.5" />,
  },
];

function SubHead({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-5 xs:mb-6">
      <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-1.5 flex items-center gap-2"
        style={{ color: "var(--color-text-muted)" }}>
        <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
        {label}
      </p>
      <h2 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h2>
    </div>
  );
}

export default function Hobbies() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<string>("All");

  const toggleItem = (key: string) => {
    setExpandedItem(expandedItem === key ? null : key);
  };

  const totalCount = gearCategories.reduce((n, c) => n + c.items.length, 0);
  const tabs = [
    { title: "All", count: totalCount },
    ...gearCategories.map((c) => ({ title: c.title, count: c.items.length })),
  ];
  const visibleItems = (activeCat === "All" ? gearCategories : gearCategories.filter((c) => c.title === activeCat))
    .flatMap((c) => c.items.map((item, idx) => ({ ...item, key: `${c.title}-${idx}`, category: c.title })));

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
            Homelab
          </span>
        </div>
      </header>

      <section id="hobbies" className="min-h-screen w-full pt-24 md:pt-28 pb-24 md:pb-32 px-4 relative overflow-hidden isolate bg-blueprint"
        style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal className="relative z-10">
      <div className="max-w-5xl mx-auto w-full">

        <SectionHeader
          index="05"
          label="Homelab"
          title={<>Life outside the <em className="font-serif-accent">terminal</em></>}
          description="Servers, sensors and solder-side experiments — a homelab that never sleeps, where professional skills get stress-tested for fun."
        />

        {/* Lab status — terminal strip */}
        <StaggerReveal staggerDelay={80}>
        <div className="flat-card overflow-hidden mb-14 xs:mb-16 sm:mb-20">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b"
            style={{ borderColor: "var(--color-border)" }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
            <p className="font-mono text-[11px] ml-2 truncate" style={{ color: "var(--color-text-muted)" }}>
              brian@homelab:~$ ./status.sh
            </p>
            <span className="hidden sm:block ml-auto font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
              exit 0
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {labStats.map((s) => (
              <div key={s.label} className="p-4 md:p-5">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg mb-3"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                  {s.icon}
                </span>
                <p className="text-xl md:text-2xl font-bold tracking-tight font-mono" style={{ color: "var(--color-text-primary)" }}>
                  {s.value}
                </p>
                <p className="text-[9px] font-medium tracking-[0.2em] uppercase mt-1" style={{ color: "var(--color-accent)" }}>
                  {s.label}
                </p>
                <p className="text-[10px] mt-0.5 opacity-70" style={{ color: "var(--color-text-muted)" }}>
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
        </StaggerReveal>

        {/* Gear */}
        <div className="mb-14 xs:mb-16 sm:mb-20">
          <SubHead label="Equipment" title="The gear that runs it" />

          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((t) => {
              const active = activeCat === t.title;
              return (
                <button key={t.title} onClick={() => setActiveCat(t.title)}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-200"
                  style={active
                    ? { backgroundColor: "var(--color-accent)", color: "var(--color-text-light)" }
                    : { border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                  {t.title}
                  <span className="ml-1.5 opacity-60 font-mono">{t.count}</span>
                </button>
              );
            })}
          </div>

          <StaggerReveal key={activeCat} staggerDelay={50}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4">
            {visibleItems.map((item) => {
              const open = expandedItem === item.key;
              return (
                <div key={item.key} className={`flat-card p-4 flex flex-col ${open ? "!border-[var(--color-accent)]" : ""}`}>
                  <button onClick={() => toggleItem(item.key)}
                    className="flex items-start justify-between gap-2 text-left w-full group">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-primary)" }}>
                          {item.name}
                        </p>
                        <p className="font-mono text-[9px] uppercase tracking-wider truncate" style={{ color: "var(--color-text-muted)" }}>
                          {item.category}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      style={{ color: "var(--color-text-muted)" }} />
                  </button>

                  <p className="text-xs leading-relaxed mt-3 flex-1" style={{ color: "var(--color-text-secondary)" }}>
                    {item.outcome}
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase"
                      style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                      {item.skill}
                    </span>
                    <button onClick={() => toggleItem(item.key)}
                      className="font-mono text-[10px] transition-colors duration-200 hover:text-[var(--color-accent)]"
                      style={{ color: "var(--color-text-muted)" }}>
                      [{item.specs.length}] specs
                    </button>
                  </div>

                  {open && (
                    <div className="mt-3 pt-3 border-t animate-fade-in-up" style={{ borderColor: "var(--color-border)" }}>
                      <div className="flex flex-wrap gap-1.5">
                        {item.specs.map((spec, si) => (
                          <span key={si} className="font-mono text-[10px] px-2 py-1 rounded-md"
                            style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text-secondary)" }}>
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          </StaggerReveal>
        </div>

        {/* Builds */}
        <div className="mb-14 xs:mb-16 sm:mb-20">
          <SubHead label="What I Build" title="Weekend deployments" />
          <StaggerReveal staggerDelay={80}>
          <div className="grid sm:grid-cols-3 gap-3 xs:gap-4">
            {builds.map((p) => (
              <div key={p.title} className="flat-card p-4 md:p-5 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                    {p.icon}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase"
                    style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: "var(--color-accent)" }} />
                    {p.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: "var(--color-text-primary)" }}>
                  {p.title}
                </h3>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-text-secondary)" }}>
                  {p.outcome}
                </p>
                <p className="font-mono text-[10px] leading-relaxed mt-3 pt-3 border-t" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                  {p.stack}
                </p>
              </div>
            ))}
          </div>
          </StaggerReveal>
        </div>

        {/* Tinkering + quote */}
        <div className="grid lg:grid-cols-5 gap-3 xs:gap-4 mb-14 xs:mb-16 sm:mb-20">
          <div className="lg:col-span-3">
            <SubHead label="On the Bench" title="Currently tinkering" />
            <div className="flat-card">
              {tinkering.map((t, i) => (
                <div key={t.title}
                  className={`flex items-start gap-3 p-4 ${i < tinkering.length - 1 ? "border-b" : ""}`}
                  style={{ borderColor: "var(--color-border)" }}>
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                    {t.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      {t.title}
                    </p>
                    <p className="text-xs leading-relaxed mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex items-center">
            <blockquote className="border-l-2 pl-4"
              style={{ borderColor: "var(--color-accent)" }}>
              <p className="text-xs md:text-sm leading-relaxed italic" style={{ color: "var(--color-text-secondary)" }}>
                &ldquo;Every device in this lab tells a story, of late-night debugging, of breakthrough moments,
                of systems built to serve real life, not just demos.&rdquo;
              </p>
              <footer className="font-mono text-[10px] mt-3 tracking-wider uppercase" style={{ color: "var(--color-text-muted)" }}>
                — brian@homelab
              </footer>
            </blockquote>
          </div>
        </div>

        <StaggerReveal>
        <div className="pt-8 text-center border-t" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/home" className="btn-neon btn-neon-ghost">
              Back to Portfolio
            </Link>
            <Link href="/contact" className="btn-neon btn-neon-primary">
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
