import type { Device } from "@/lib/homelab";

export const HUB_NAME = "dreezy0";
export const HUB_NOTE = "HP Tower Server. Runs every service here in Docker, 24/7.";

export const labMachines: Device[] = [
  { name: "Dreezy1", note: "HP 820 G3. Test bench for risky experiments.", status: "unknown" },
  { name: "Dreezy2", note: "HP 745 G7. Second dev machine for VMs and dev servers.", status: "unknown" },
  { name: "Dreezy3", note: "Dell OptiPlex. Lab node for extra services.", status: "unknown" },
  { name: "Dreezy4", note: "Galaxy A05s. Remote control for the lab over SSH.", status: "unknown" },
  { name: "Dreezy5", note: "HP Tower running Kali Linux, for penetration testing practice.", status: "unknown" },
  { name: "Dreezy6", note: "ROG Zephyrus G14. Daily driver where every build starts.", status: "unknown" },
];

/** Shown on the 3D map when live stats are unavailable. */
export const homelabServices: Device[] = [
  { name: "Jellyfin", note: "Media server for movies, series and music.", status: "unknown" },
  { name: "Sonarr", note: "Tracks and fetches series.", status: "unknown" },
  { name: "Radarr", note: "Tracks and fetches movies.", status: "unknown" },
  { name: "Lidarr", note: "Tracks and fetches music.", status: "unknown" },
  { name: "Prowlarr", note: "Indexer manager for the *arr stack.", status: "unknown" },
  { name: "qBittorrent", note: "Download client.", status: "unknown" },
  { name: "Seerr", note: "Request system for the media stack.", status: "unknown" },
  { name: "Ombi", note: "Media requests for friends and family.", status: "unknown" },
  { name: "Coolify", note: "Self-hosted app deployments.", status: "unknown" },
  { name: "Homepage", note: "The dashboard these stats come from.", status: "unknown" },
  { name: "Uptime Kuma", note: "Uptime monitoring and alerts.", status: "unknown" },
];

export interface NetworkNode {
  id: string;
  label: string;
  runs: string;
}

/** Nodes on the flat SVG map, the fallback for devices that cannot render 3D. */
export const networkNodes: NetworkNode[] = [
  { id: "dreezy6", label: "Dreezy6", runs: "ROG Zephyrus G14. Daily driver: VMs, Docker and dev servers side by side." },
  { id: "dreezy1", label: "Dreezy1", runs: "HP 820 G3. Test bench. Risky experiments run here, never on the main machine." },
  { id: "dreezy2", label: "Dreezy2", runs: "HP 745 G7. Second dev machine for VMs and long-running dev servers." },
  { id: "dreezy3", label: "Dreezy3", runs: "Dell OptiPlex. Lab node for extra services and experiments." },
  { id: "dreezy4", label: "Dreezy4", runs: "Galaxy A05s. Remote control for the lab: SSH, automation and camera feeds." },
  { id: "dreezy5", label: "Dreezy5", runs: "HP Tower running Kali Linux, dedicated to penetration testing practice." },
  { id: "auto", label: "Home automation", runs: "Sensors and switches wired into the same network." },
  { id: "robot", label: "Robotics", runs: "Embedded boards and robotics builds, flashed and tested at the bench." },
];

export const labStats = [
  { label: "Server Uptime", value: "24/7", note: "Proxmox node, always on" },
  { label: "Storage Protected", value: "3TB", note: "RAID-1 mirrored array" },
  { label: "Data Lost", value: "0 B", note: "since day one" },
  { label: "Devices Managed", value: "19", note: "every lease assigned by me" },
];

export const topologyServices = [
  { label: "Jellyfin", note: "Media server" },
  { label: "Backups", note: "Nightly" },
  { label: "ESP32 mesh", note: "Automation" },
];

export interface GearItem {
  name: string;
  outcome: string;
  skill: string;
  specs: string[];
}

export interface GearCategory {
  title: string;
  items: GearItem[];
}

export const gearCategories: GearCategory[] = [
  {
    title: "Computing",
    items: [
      {
        name: "Dreezy0 · HP Tower Server",
        outcome: "The always-on server that runs the lab: media, requests, deployments and backups in Docker.",
        skill: "Server Administration",
        specs: ["Intel Xeon / Core i5", "16GB ECC DDR4 RAM", "3TB HDD Storage", "RAID 1 Config", "Proxmox VE", "Docker host", "24/7 Self-Hosted"],
      },
      {
        name: "Dreezy1 · HP 820 G3",
        outcome: "Test bench. Risky experiments run here, never on the main machine.",
        skill: "Lab & Testing",
        specs: ["Intel Core i5-6200U", "12GB DDR4 RAM", "256GB SATA SSD", "12.5\" FHD Display"],
      },
      {
        name: "Dreezy2 · HP 745 G7",
        outcome: "Second dev machine for VMs, Docker and long-running dev servers.",
        skill: "Dev Environment",
        specs: ["AMD Ryzen 5 PRO 3500U", "16GB DDR4 RAM", "512GB NVMe SSD", "14\" FHD Display", "Radeon Vega 8 Graphics"],
      },
      {
        name: "Dreezy3 · Dell OptiPlex",
        outcome: "Lab node for extra services and experiments, keeping load off the main server.",
        skill: "Lab Node",
        specs: ["Dell OptiPlex desktop", "Lab node"],
      },
      {
        name: "Dreezy5 · HP Tower (Kali Linux)",
        outcome: "Kali Linux, dedicated to penetration testing practice.",
        skill: "Penetration Testing",
        specs: ["HP Tower", "Kali Linux", "Dedicated to penetration testing"],
      },
      {
        name: "Dreezy6 · ROG Zephyrus G14",
        outcome: "Daily driver. Every build starts here, with VMs, Docker and dev servers side by side.",
        skill: "Dev Environment",
        specs: ["ASUS ROG Zephyrus G14 (GA401QM)", "AMD Ryzen 9 5900HS", "NVIDIA RTX 3060 Laptop GPU", "24GB DDR4 RAM", "1TB NVMe SSD", "14\" FHD 144Hz Display"],
      },
    ],
  },
  {
    title: "Displays",
    items: [
      {
        name: "ThinkVision 24\"",
        outcome: "Main screen for code and dashboards.",
        skill: "Monitoring",
        specs: ["24\" Full HD (1920x1080)", "IPS Panel", "VGA + DVI + DP Inputs", "Tilt-Adjustable Stand"],
      },
      {
        name: "Lenovo Monitor",
        outcome: "Second screen for logs and metrics.",
        skill: "Ops Visibility",
        specs: ["22-24\" Lenovo Branded", "Full HD Resolution", "VGA + HDMI Inputs", "Workspace Multiplier"],
      },
      {
        name: "18\" Portable Monitor",
        outcome: "Portable display for servers, hardware and demos.",
        skill: "On-the-Go",
        specs: ["18\" IPS Portable Display", "USB-C Powered", "1080p Resolution", "Plug-and-Play w/ Laptop"],
      },
    ],
  },
  {
    title: "Peripherals",
    items: [
      {
        name: "AULA S2027",
        outcome: "Daily keyboard for long coding sessions.",
        skill: "Gaming & Typing",
        specs: ["AULA S2027 Gaming Keyboard", "Full RGB Backlight", "Mechanical Feel Keys", "Anti-Ghosting", "USB Wired Connection"],
      },
      {
        name: "Glorious Model O",
        outcome: "Main mouse. Light and precise.",
        skill: "Daily Driver",
        specs: ["68g Ultra-Lightweight", "Glorious 16K Optical Sensor", "Up to 12,000 DPI", "Honeycomb Shell Design", "RGB Lighting", "PTFE Mouse Feet"],
      },
      {
        name: "Safaricom Router",
        outcome: "Lab backbone. Static leases, port forwarding and uptime monitoring, all managed by me.",
        skill: "Networking",
        specs: ["Safaricom 4G LTE Router", "Dual-Band WiFi", "Up to 150Mbps", "Ethernet LAN Ports", "Carrier-Provided"],
      },
    ],
  },
  {
    title: "Mobile & Audio",
    items: [
      {
        name: "Dreezy4 · Galaxy A05s",
        outcome: "Remote control for the lab: SSH, automation and camera feeds.",
        skill: "Remote Ops",
        specs: ["Samsung Galaxy A05s", "Snapdragon 680", "6.7\" PLS LCD 90Hz", "4GB RAM / 64GB Storage", "50MP Triple Camera", "5000mAh Battery"],
      },
      {
        name: "F+ Kaduda",
        outcome: "Backup line for calls and texts.",
        skill: "Reliability",
        specs: ["F+ Kaduda Feature Phone", "Basic Call & Text", "Dual SIM", "Long Battery Life"],
      },
      {
        name: "ORAiMO SpaceBuds Neo Plus",
        outcome: "Calls and focus audio.",
        skill: "Audio",
        specs: ["ORAiMO SpaceBuds Neo Plus", "True Wireless Stereo", "Bluetooth 5.3", "Touch Controls", "IPX5 Water Resistant", "~24h Battery (Case)"],
      },
      {
        name: "ORAiMO SmartWatch 5N",
        outcome: "Alerts on the wrist mid-debug.",
        skill: "Notifications",
        specs: ["ORAiMO SmartWatch 5N", "1.3\" AMOLED Display", "Heart Rate & SpO2 Monitor", "Step & Sleep Tracking", "Bluetooth Call Sync", "7-Day Battery Life"],
      },
    ],
  },
  {
    title: "Spare Gear",
    items: [
      {
        name: "3TB HDDs & SSDs",
        outcome: "Spare drives for backups and experiments.",
        skill: "Storage",
        specs: ["Mixed 2.5\" & 3.5\" Drives", "SSD + HDD Combo", "Used for Backups & Experiments"],
      },
      {
        name: "Digital Camera",
        outcome: "Reference shots for documentation.",
        skill: "Documentation",
        specs: ["Compact Digital Camera", "Optical Zoom Lens", "SD Card Storage", "Great for Reference Shots"],
      },
      {
        name: "ESP32 Dev Kit",
        outcome: "The core of my IoT work, running firmware I wrote.",
        skill: "Embedded / IoT",
        specs: ["ESP32-WROOM-32 Module", "Dual-Core Xtensa LX6", "WiFi + BLE 4.2", "GPIO / I2C / SPI / UART", "Full Dev Board w/ USB", "Used in Robotics & Automation"],
      },
    ],
  },
];

export const labBuilds = [
  {
    title: "Home Automation",
    outcome: "Lights, locks and devices on my own automation. Phone presence switches rooms, and voice commands run the rest.",
    stack: "ESP32 endpoints · custom firmware · presence sniffing · REST hooks",
    status: "Live 24/7",
  },
  {
    title: "Robotics & Embedded",
    outcome: "Line-following robots, drone prototypes and ESP32 systems, with PID control tuned by hand on the bench.",
    stack: "ESP32-WROOM · C/C++ firmware · sensors · bench debugging",
    status: "Built & Tested",
  },
];
