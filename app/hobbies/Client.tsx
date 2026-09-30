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
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import FridaySurprise from "./FridaySurprise";

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

export const gearCategories: GearCategory[] = [
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
        specs: ["Intel Xeon / Core i5", "16GB ECC DDR4 RAM", "3TB HDD Storage", "RAID 1 Config", "Proxmox VE", "24/7 Self-Hosted"],
      },
      {
        name: "HP Tower (Kali Linux)",
        outcome: "A second HP tower running Kali Linux, dedicated purely to penetration testing and security practice.",
        skill: "Penetration Testing",
        icon: <ShieldCheck className="w-3.5 h-3.5" />,
        specs: ["HP Tower", "Kali Linux", "Dedicated to penetration testing"],
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
        name: "3TB HDDs & SSDs",
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

export const builds = [
  {
    title: "Home Automation",
    outcome: "The lab lights, locks and devices run on my own automation: phone presence detection switches rooms automatically, RGB scenes coordinate across multiple rooms, and voice commands control it all.",
    stack: "ESP32 endpoints · custom firmware · presence sniffing · REST hooks",
    status: "Live 24/7",
    icon: <Wifi className="w-3.5 h-3.5" />,
  },
  {
    title: "Media & Backup Server",
    outcome: "An always-on server streaming 4K to every screen in the lab while automated nightly backups protect 3TB of RAID-1 storage, with no data lost since day one.",
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

export const labStats = [
  { label: "Server Uptime", value: "24/7", note: "Proxmox node, always on", icon: <Activity className="w-3.5 h-3.5" /> },
  { label: "Storage Protected", value: "3TB", note: "RAID-1 mirrored array", icon: <Database className="w-3.5 h-3.5" /> },
  { label: "Data Lost", value: "0 B", note: "since day one", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { label: "Devices Managed", value: "18", note: "every lease assigned by me", icon: <Radio className="w-3.5 h-3.5" /> },
];

export const tinkering = [
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
    <div className="mb-8">
      <p className="field-label mb-2 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
        {label}
      </p>
      <h2 className="display-xl text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h2>
    </div>
  );
}

const services = [
  { label: "Jellyfin", note: "Media server", icon: <Monitor className="w-4 h-4" /> },
  { label: "Backups", note: "Nightly", icon: <HardDrive className="w-4 h-4" /> },
  { label: "ESP32 Mesh", note: "Automation", icon: <Radio className="w-4 h-4" /> },
];

function TopologyNode({ icon, title, note, strong = false }: { icon: ReactNode; title: string; note: string; strong?: boolean }) {
  return (
    <div
      className="flex items-center gap-3 rounded-full border px-4 py-2.5"
      style={{
        backgroundColor: strong ? "var(--color-accent)" : "var(--color-bg-card)",
        borderColor: strong ? "var(--color-accent)" : "var(--color-border)",
        color: strong ? "var(--color-on-accent)" : "var(--color-text-primary)",
      }}
    >
      <span
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: strong ? "var(--palette-lavender-mist)" : "var(--color-highlight)", color: "var(--palette-true-cobalt)" }}
      >
        {icon}
      </span>
      <span className="text-left">
        <span className="block text-sm font-semibold leading-tight">{title}</span>
        <span className="block text-[11px] opacity-75">{note}</span>
      </span>
    </div>
  );
}

const Wire = ({ dashed = false }: { dashed?: boolean }) => (
  <span aria-hidden="true" className="h-8 w-0" style={{ borderLeft: `2px ${dashed ? "dashed" : "solid"} var(--color-accent-secondary)` }} />
);

export default function HobbiesClient() {
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
      <header className="fixed left-5 right-5 top-3.5 z-50 mx-auto max-w-5xl overflow-hidden rounded-full glass-nav">
        <div className="flex h-14 items-center justify-between pl-2 pr-5">
          <Link
            href="/"
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full pr-4 text-sm font-medium transition-colors duration-200 hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-x-0.5"
              style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}
            >
              <ArrowLeft className="w-4 h-4" />
            </span>
            Back to Portfolio
          </Link>
          <span className="hidden font-serif-accent text-lg sm:block" style={{ color: "var(--color-text-primary)" }}>
            Homelab
          </span>
        </div>
      </header>

      <section id="hobbies" className="min-h-screen w-full pt-28 md:pt-32 pb-24 md:pb-32 px-5 sm:px-10 lg:px-16 relative overflow-hidden isolate"
        style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal className="relative z-10">
      <div className="max-w-5xl mx-auto w-full">

        <Breadcrumbs />
        <SectionHeader
          index="08"
          label="Homelab"
          title={<>Life outside the <em className="font-serif-accent">terminal</em></>}
          description="Servers, sensors and solder-side experiments: a homelab running 24/7, where professional skills are validated under real-world conditions."
        />

        {/* Lab status */}
        <StaggerReveal staggerDelay={80}>
        <div className="ink-slab mb-20 px-6 py-8 sm:px-10">
          <p className="mb-8 flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: "var(--color-accent)" }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            </span>
            All systems normal
          </p>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {labStats.map((s) => (
              <div key={s.label}>
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "var(--color-surface-strong)", color: "var(--color-accent)" }}>
                  {s.icon}
                </span>
                <p className="display-xl text-4xl" style={{ color: "var(--color-text-primary)" }}>{s.value}</p>
                <p className="mt-1 text-sm font-medium" style={{ color: "var(--color-accent)" }}>{s.label}</p>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
        </StaggerReveal>

        {/* Network topology */}
        <div className="mb-20">
          <SubHead label="Topology" title="How it's wired together" />
          <div className="flex flex-col items-center rounded-[2rem] px-5 py-10 sm:px-10" style={{ backgroundColor: "var(--color-highlight)" }}>
            <span className="pill font-mono !text-[11px]"><Wifi className="w-3.5 h-3.5" /> Internet</span>
            <Wire dashed />
            <TopologyNode icon={<Wifi className="w-4 h-4" />} title="Router" note="Safaricom 4G LTE" />
            <Wire />
            <TopologyNode icon={<Server className="w-4 h-4" />} title="HP Tower Server" note="Proxmox VE · 24/7 · RAID-1 · 3TB" strong />
            <Wire />
            {/* Fan-out bar to the three services */}
            <div className="relative w-full max-w-2xl">
              <span aria-hidden="true" className="absolute left-[16.66%] right-[16.66%] top-0 hidden sm:block" style={{ borderTop: "2px solid var(--color-accent-secondary)" }} />
              <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                {services.map((s) => (
                  <div key={s.label} className="flex flex-col items-center">
                    <span aria-hidden="true" className="hidden h-6 w-0 sm:block" style={{ borderLeft: "2px solid var(--color-accent-secondary)" }} />
                    <TopologyNode icon={s.icon} title={s.label} note={s.note} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gear */}
        <div className="mb-20">
          <SubHead label="Equipment" title="The gear that runs it" />

          <div className="mb-6 flex flex-wrap gap-2">
            {tabs.map((t) => {
              const active = activeCat === t.title;
              return (
                <button key={t.title} onClick={() => setActiveCat(t.title)} aria-pressed={active}
                  className="min-h-[44px] whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-[var(--color-accent)]"
                  style={active
                    ? { backgroundColor: "var(--color-accent)", borderColor: "var(--color-accent)", color: "var(--color-on-accent)" }
                    : { borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)" }}>
                  {t.title}
                  <span className="ml-1.5 font-mono text-xs opacity-70">{t.count}</span>
                </button>
              );
            })}
          </div>

          <StaggerReveal key={activeCat} staggerDelay={50}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => {
              const open = expandedItem === item.key;
              return (
                <div key={item.key} className="flat-card flex flex-col p-5" style={open ? { borderColor: "var(--color-accent)" } : undefined}>
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="pill !py-1 !text-[10px]">{item.skill}</span>
                  </div>
                  <h3 className="font-serif-accent text-xl leading-tight" style={{ color: "var(--color-text-primary)" }}>
                    {item.name}
                  </h3>
                  <p className="mb-3 text-[11px]" style={{ color: "var(--color-text-muted)" }}>{item.category}</p>
                  <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {item.outcome}
                  </p>

                  <button onClick={() => toggleItem(item.key)}
                    aria-expanded={open}
                    className="mt-4 flex min-h-[44px] items-center gap-1.5 self-start text-xs font-medium transition-colors duration-200 hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-text-muted)" }}>
                    {open ? "Hide" : "Show"} {item.specs.length} specs
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>

                  {open && (
                    <div className="animate-fade-in-up flex flex-wrap gap-1.5 border-t pt-3" style={{ borderColor: "var(--color-border)" }}>
                      {item.specs.map((spec) => (
                        <span key={spec} className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                          style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-text-secondary)" }}>
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          </StaggerReveal>
        </div>

        {/* Builds */}
        <div className="mb-20">
          <SubHead label="What I build" title="Weekend deployments" />
          <StaggerReveal staggerDelay={80}>
          <div className="grid gap-5 md:grid-cols-3">
            {builds.map((p) => (
              <div key={p.title} className="plate flex flex-col p-6">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }}>
                    {p.icon}
                  </span>
                  <span className="pill !py-1 !text-[10px]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: "var(--color-success)" }} />
                    {p.status}
                  </span>
                </div>
                <h3 className="font-serif-accent mb-2 text-2xl" style={{ color: "var(--color-text-primary)" }}>
                  {p.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {p.outcome}
                </p>
                <p className="mt-4 border-t pt-4 font-mono text-[11px] leading-relaxed" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                  {p.stack}
                </p>
              </div>
            ))}
          </div>
          </StaggerReveal>
        </div>

        {/* Tinkering + quote */}
        <div className="mb-20 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SubHead label="On the bench" title="Currently tinkering" />
            <ul className="space-y-3">
              {tinkering.map((t) => (
                <li key={t.title} className="flex items-start gap-4 rounded-2xl border p-4" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}>
                    {t.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {t.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {t.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center lg:col-span-2">
            <blockquote>
              <span className="font-serif-accent block text-7xl leading-none" style={{ color: "var(--color-accent-secondary)" }} aria-hidden="true">&ldquo;</span>
              <p className="display-xl -mt-4 text-2xl leading-snug sm:text-3xl" style={{ color: "var(--color-text-primary)" }}>
                Every device in this lab serves real life: monitored, backed up, and refined until it is reliable.
              </p>
              <footer className="mt-4 font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>
                brian@homelab
              </footer>
            </blockquote>
          </div>
        </div>

        {/* End-of-week surprise */}
        <div className="mb-20">
          <SubHead label="Off the clock" title="Is it Friday yet?" />
          <FridaySurprise />
        </div>

        <StaggerReveal>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-neon btn-neon-ghost">
            Back to Portfolio
          </Link>
          <Link href="/contact" className="btn-neon btn-neon-primary">
            Get in Touch
          </Link>
        </div>
        </StaggerReveal>

        <NextSection
          title="Beyond the lab"
          description="The professional side of the skills this lab sharpens."
          links={[
            { href: "/engineering", label: "Engineering", description: "The discipline that keeps the lab running." },
            { href: "/troubleshooting", label: "Diagnostics", description: "Root-cause work inspired by real failures." },
            { href: "/contact", label: "Contact", description: "Got a similar build in mind? Let's talk." },
          ]}
        />
      </div>
      </ScrollReveal>
      </section>
    </>
  );
}
