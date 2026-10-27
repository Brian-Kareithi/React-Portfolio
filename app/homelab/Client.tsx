"use client";
import { useState, ReactNode } from "react";
import {
  Server, Cpu, Monitor, Smartphone, Headphones, Watch, Keyboard, HardDrive,
  Camera, Wifi, Activity, Database, ShieldCheck, Radio, Plus,
} from "lucide-react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import FridaySurprise from "./FridaySurprise";
import NetworkSwitch from "@/app/components/NetworkSwitch";
import HomelabStats from "@/app/components/HomelabStats";
import { devicesFromStats, type HomelabStats as Stats } from "@/app/lib/homelab";

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
        outcome: "Daily driver. Every build starts here, with VMs, Docker and dev servers side by side.",
        skill: "Dev Environment",
        icon: <Cpu className="w-3.5 h-3.5" />,
        specs: ["AMD Ryzen 5 PRO 3500U", "16GB DDR4 RAM", "512GB NVMe SSD", "14\" FHD Display", "Radeon Vega 8 Graphics"],
      },
      {
        name: "HP 820 G3",
        outcome: "Test bench. Risky experiments run here, never on the main machine.",
        skill: "Lab & Testing",
        icon: <Cpu className="w-3.5 h-3.5" />,
        specs: ["Intel Core i5-6200U", "12GB DDR4 RAM", "256GB SATA SSD", "12.5\" FHD Display"],
      },
      {
        name: "HP Tower Server",
        outcome: "The Proxmox node that runs the lab: media, backups and dev services.",
        skill: "Server Administration",
        icon: <Server className="w-3.5 h-3.5" />,
        specs: ["Intel Xeon / Core i5", "16GB ECC DDR4 RAM", "3TB HDD Storage", "RAID 1 Config", "Proxmox VE", "24/7 Self-Hosted"],
      },
      {
        name: "HP Tower (Kali Linux)",
        outcome: "Kali Linux, dedicated to penetration testing practice.",
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
        outcome: "Main screen for code and dashboards.",
        skill: "Monitoring",
        icon: <Monitor className="w-3.5 h-3.5" />,
        specs: ["24\" Full HD (1920x1080)", "IPS Panel", "VGA + DVI + DP Inputs", "Tilt-Adjustable Stand"],
      },
      {
        name: "Lenovo Monitor",
        outcome: "Second screen for logs and metrics.",
        skill: "Ops Visibility",
        icon: <Monitor className="w-3.5 h-3.5" />,
        specs: ["22-24\" Lenovo Branded", "Full HD Resolution", "VGA + HDMI Inputs", "Workspace Multiplier"],
      },
      {
        name: "18\" Portable Monitor",
        outcome: "Portable display for servers, hardware and demos.",
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
        outcome: "Daily keyboard for long coding sessions.",
        skill: "Gaming & Typing",
        icon: <Keyboard className="w-3.5 h-3.5" />,
        specs: ["AULA S2027 Gaming Keyboard", "Full RGB Backlight", "Mechanical Feel Keys", "Anti-Ghosting", "USB Wired Connection"],
      },
      {
        name: "Glorious Model O",
        outcome: "Main mouse. Light and precise.",
        skill: "Daily Driver",
        icon: <Cpu className="w-3.5 h-3.5" />,
        specs: ["68g Ultra-Lightweight", "Glorious 16K Optical Sensor", "Up to 12,000 DPI", "Honeycomb Shell Design", "RGB Lighting", "PTFE Mouse Feet"],
      },
      {
        name: "Safaricom Router",
        outcome: "Lab backbone. Static leases, port forwarding and uptime monitoring, all managed by me.",
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
        outcome: "Remote control for the lab: SSH, automation and camera feeds.",
        skill: "Remote Ops",
        icon: <Smartphone className="w-3.5 h-3.5" />,
        specs: ["Samsung Galaxy A05s", "Snapdragon 680", "6.7\" PLS LCD 90Hz", "4GB RAM / 64GB Storage", "50MP Triple Camera", "5000mAh Battery"],
      },
      {
        name: "F+ Kaduda",
        outcome: "Backup line for calls and texts.",
        skill: "Reliability",
        icon: <Smartphone className="w-3.5 h-3.5" />,
        specs: ["F+ Kaduda Feature Phone", "Basic Call & Text", "Dual SIM", "Long Battery Life"],
      },
      {
        name: "ORAiMO SpaceBuds Neo Plus",
        outcome: "Calls and focus audio.",
        skill: "Audio",
        icon: <Headphones className="w-3.5 h-3.5" />,
        specs: ["ORAiMO SpaceBuds Neo Plus", "True Wireless Stereo", "Bluetooth 5.3", "Touch Controls", "IPX5 Water Resistant", "~24h Battery (Case)"],
      },
      {
        name: "ORAiMO SmartWatch 5N",
        outcome: "Alerts on the wrist mid-debug.",
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
        outcome: "Spare drives for backups and experiments.",
        skill: "Storage",
        icon: <HardDrive className="w-3.5 h-3.5" />,
        specs: ["Mixed 2.5\" & 3.5\" Drives", "SSD + HDD Combo", "Used for Backups & Experiments"],
      },
      {
        name: "Digital Camera",
        outcome: "Reference shots for documentation.",
        skill: "Documentation",
        icon: <Camera className="w-3.5 h-3.5" />,
        specs: ["Compact Digital Camera", "Optical Zoom Lens", "SD Card Storage", "Great for Reference Shots"],
      },
      {
        name: "ESP32 Dev Kit",
        outcome: "The core of my IoT work, running firmware I wrote.",
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
    outcome: "Lights, locks and devices on my own automation. Phone presence switches rooms, and voice commands run the rest.",
    stack: "ESP32 endpoints · custom firmware · presence sniffing · REST hooks",
    status: "Live 24/7",
    icon: <Wifi className="w-3.5 h-3.5" />,
  },
  {
    title: "Robotics & Embedded",
    outcome: "Line-following robots, drone prototypes and ESP32 systems, with PID control tuned by hand on the bench.",
    stack: "ESP32-WROOM · C/C++ firmware · sensors · bench debugging",
    status: "Built & Tested",
    icon: <Cpu className="w-3.5 h-3.5" />,
  },
];

export const labStats = [
  { label: "Server Uptime", value: "24/7", note: "Proxmox node, always on", icon: <Activity className="w-3.5 h-3.5" /> },
  { label: "Storage Protected", value: "3TB", note: "RAID-1 mirrored array", icon: <Database className="w-3.5 h-3.5" /> },
  { label: "Data Lost", value: "0 B", note: "since day one", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { label: "Devices Managed", value: "19", note: "every lease assigned by me", icon: <Radio className="w-3.5 h-3.5" /> },
];

const services = [
  { label: "Jellyfin", note: "Media server" },
  { label: "Backups", note: "Nightly" },
  { label: "ESP32 mesh", note: "Automation" },
];

export default function HomelabClient({ initialStats }: { initialStats?: Stats | null }) {
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
    <div id="homelab" className="q-page">
      <div className="q-wrap">
        <Breadcrumbs />
        <SectionHeader
          index="05"
          label="Homelab"
          title={<>The lab that <em>never sleeps</em></>}
          description="Where I started and where I still learn. I broke plenty before it stayed up, and that is how I learned to keep services running."
        />

        <div className="term-window ink-slab l-map">
          <div className="term-window-bar" aria-hidden="true"><i /><i /><i /><span>homelab.map</span></div>
          <div className="l-map-body"><NetworkSwitch devices={devicesFromStats(initialStats)} /></div>
        </div>

        <section aria-label="Lab status" className="l-status">
          <p className="l-live"><span className="live-dot" aria-hidden="true" /> All systems normal</p>
          <dl className="l-stats">
            {labStats.map((s) => (
              <div key={s.label} className="l-stat">
                <dd>{s.value}</dd>
                <dt>{s.label}</dt>
                <p>{s.note}</p>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="live-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>01</b> Live</p>
            <h2 id="live-title" data-split className="q-h2">What&apos;s running <em>right now</em></h2>
          </div>
          <HomelabStats initial={initialStats} />
        </section>

        <section aria-labelledby="topology-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>02</b> Topology</p>
            <h2 id="topology-title" data-split className="q-h2">How it&apos;s <em>wired together</em></h2>
          </div>
          <ol className="l-chain">
            <li><span className="l-node"><Wifi aria-hidden="true" /> Internet</span></li>
            <li><span className="l-node"><Wifi aria-hidden="true" /> Router <small>Safaricom 4G LTE</small></span></li>
            <li><span className="l-node" data-strong><Server aria-hidden="true" /> HP Tower Server <small>Proxmox VE · RAID-1 · 3TB</small></span></li>
            <li>
              <ul className="l-leaves">
                {services.map((svc) => (
                  <li key={svc.label}><span className="l-node">{svc.label} <small>{svc.note}</small></span></li>
                ))}
              </ul>
            </li>
          </ol>
        </section>

        <section aria-labelledby="gear-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>03</b> Equipment</p>
            <h2 id="gear-title" data-split className="q-h2">The gear that <em>runs it</em></h2>
          </div>

          <div className="q-tabs" role="group" aria-label="Filter equipment">
            {tabs.map((t) => (
              <button key={t.title} onClick={() => setActiveCat(t.title)} aria-pressed={activeCat === t.title} className="q-tab">
                {t.title}
                <sup>{t.count}</sup>
              </button>
            ))}
          </div>

          <ul className="l-inventory">
            {visibleItems.map((item) => {
              const open = expandedItem === item.key;
              return (
                <li key={item.key}>
                  <button className="l-row" onClick={() => toggleItem(item.key)} aria-expanded={open}>
                    <span className="l-row-name">{item.name}</span>
                    <span className="l-row-cat">{item.category}</span>
                    <span className="l-row-outcome">{item.outcome}</span>
                    <span className="q-chip">{item.skill}</span>
                    <Plus className="l-row-plus" data-open={open || undefined} aria-hidden="true" />
                  </button>
                  {open && (
                    <div className="l-specs animate-fade-in-up">
                      <p className="q-body l-specs-outcome">{item.outcome}</p>
                      <ul>
                        {item.specs.map((spec) => (
                          <li key={spec} className="q-mono">{spec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="builds-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>04</b> Builds</p>
            <h2 id="builds-title" data-split className="q-h2">What I build <em>here</em></h2>
          </div>
          <div className="l-builds">
            {builds.map((b) => (
              <article key={b.title}>
                <p className="q-eyebrow"><span className="live-dot" aria-hidden="true" /> {b.status}</p>
                <h3 className="q-h3" style={{ fontSize: "clamp(1.8rem, 1.2rem + 2vw, 2.6rem)" }}>{b.title}</h3>
                <p className="q-body">{b.outcome}</p>
                <p className="q-mono q-small">{b.stack}</p>
              </article>
            ))}
          </div>
        </section>

        <blockquote className="l-quote">
          <p data-split>Every device here serves real life: monitored, backed up and refined until it is <em>reliable.</em></p>
        </blockquote>

        <section aria-labelledby="friday-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>05</b> Off the clock</p>
            <h2 id="friday-title" data-split className="q-h2">Is it <em>Friday</em> yet?</h2>
          </div>
          <FridaySurprise />
        </section>

        <NextSection
          title="From the lab to the work"
          links={[
            { href: "/troubleshooting", label: "Diagnostics", description: "Root-cause work from real failures." },
            { href: "/how-i-work", label: "How I work", description: "The principles behind the lab and the products." },
            { href: "/projects", label: "Selected work", description: "Where the habits ship." },
          ]}
        />
      </div>
    </div>
  );
}
