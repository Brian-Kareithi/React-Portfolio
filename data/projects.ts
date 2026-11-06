export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  tagline: string;
  status: "Shipped" | "Active" | "Completed";
  problem: string;
  solution: string[];
  architecture: { stages: string[]; branch?: { under: number; label: string } };
  stack: string[];
  contribution: string;
  outcome?: string;
  screenshot?: { src: string; alt: string };
  access: {
    repo?: string;
    demo?: string;
    note: string;
  };
  exhibit?: {
    label: string;
    fileUrl: string;
    fileName: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "homelab-app",
    index: "01",
    title: "Homelab",
    tagline: "Native Android dashboard for my self-hosted homelab",
    status: "Shipped",
    problem:
      "My homelab runs Jellyfin, the *arr stack, qBittorrent and Seerr behind a Homepage dashboard, which is clumsy on a phone. I wanted to check the whole lab from my pocket without putting service API keys on the device.",
    solution: [
      "Dashboard built from Homepage's /api/services: add a service on the server and it appears in the app, with CPU, RAM and disk gauges and Docker status",
      "Talks to one URL only. Homepage's server-side widget proxy adds the Sonarr, Radarr and Jellyfin keys, so the app stores no service credentials",
      "Auto mode probes the LAN for 1.5 s and falls back to Tailscale, re-checking when the network changes",
      "Activity feed with Jellyfin now-playing, the Sonarr queue and active torrents, plus per-service detail screens",
      "Offline snapshot cache, and a WorkManager check every 15 minutes that notifies when a container stops, the server goes down or a torrent finishes",
    ],
    architecture: {
      stages: ["Compose UI", "Repository + Cache", "Homepage API", "Service Widgets"],
      branch: { under: 2, label: "LAN / Tailscale Resolver" },
    },
    stack: ["Kotlin", "Jetpack Compose", "Material 3", "Retrofit", "kotlinx.serialization", "DataStore", "WorkManager", "Coil", "Tailscale"],
    contribution:
      "Solo build. Networking, widget mappers, Compose UI, notifications and unit tests, with a small manual DI container instead of Hilt.",
    screenshot: {
      src: "/projects/homelab/overview.png",
      alt: "Homelab Android app: the dashboard in light and dark themes with CPU, RAM and disk gauges and media service cards, and the Jellyfin detail screen",
    },
    access: {
      repo: "https://github.com/Brian-Kareithi/Homelab",
      note: "Public repository. Build the APK with Gradle",
    },
  },
  {
    id: "quickprint",
    index: "02",
    title: "QuickPrint",
    tagline: "Print-shop management and customer ordering portal",
    status: "Shipped",
    problem:
      "Cyber cafés and print shops run on WhatsApp attachments, flash drives and a shouted queue. QuickPrint gives each shop a QR code: customers upload, choose print options and see the price from their phone, and the shop works a live queue.",
    solution: [
      "Shop-branded upload portal reached by QR code, with print options, live pricing and order tracking",
      "Live print queue with searchable orders and one-tap status updates",
      "Cash, M-Pesa, Airtel Money and bank transfer, with payment status tracking",
      "Printable QR posters, team and cashier access, and per-shop branding",
      "Revenue, peak-hour and printer-utilisation analytics, plus a platform admin for super admins",
    ],
    architecture: {
      stages: ["Next.js Portal (QR Upload)", "REST API", "Database"],
      branch: { under: 1, label: "Queue & Payments" },
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "REST API", "Docker"],
    contribution: "Built the web app end to end: customer portal, shop dashboard, admin console and QR tooling. Backend in a separate repository.",
    screenshot: {
      src: "/projects/quickprint/landing.png",
      alt: "QuickPrint landing page: Your print shop, run from one QR code, beside an order card showing a 24-page PDF paid with M-Pesa and ready in about 12 minutes",
    },
    access: {
      repo: "https://github.com/Brian-Kareithi/QuickPrint",
      demo: "https://quickprint-ten.vercel.app/auth/login",
      note: "Public repository. Backend: github.com/Thee-Entity/QuickPrint-Backend",
    },
  },
  {
    id: "roadsafe360",
    index: "03",
    title: "RoadSafe360",
    tagline: "Road safety and driver demerit platform",
    status: "Shipped",
    problem:
      "Road authorities need to track licences, offences and demerit points without paper trails, with an auditable appeals process. RoadSafe360 covers the whole workflow, from offence to suspension to appeal.",
    solution: [
      "Role-based dashboards for drivers, police, authorities and admins",
      "Digital licences with QR verification and automatic demerit points",
      "Offence tracking, with deductions tied to severity",
      "Appeals that restore points when approved",
      "Regional analytics with charts and a Leaflet map",
    ],
    architecture: {
      stages: ["Next.js Frontend", "Firebase Auth", "Firestore / Storage"],
      branch: { under: 1, label: "Role-based Dashboards" },
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Firebase", "Recharts", "Leaflet"],
    contribution:
      "Data model and security rules, dashboards, QR licences, appeals and the analytics map.",
    access: {
      repo: "https://github.com/Brian-Kareithi/RoadSafe360",
      demo: "https://roadsafe-opal.vercel.app/auth",
      note: "Public repository",
    },
    screenshot: { src: "/projects/roadsafe360.png", alt: "RoadSafe360 sign-in screen with quick-login roles for admin, police, driver and authority" },
    exhibit: {
      label: "Project Deck",
      fileUrl: "/roadsafe360-pbl-road-safety-system.pptx",
      fileName: "RoadSafe360 PBL Road Safety System.pptx",
    },
  },
  {
    id: "pos-system",
    index: "04",
    title: "POS System",
    tagline: "Point of sale for multi-branch retail",
    status: "Active",
    problem:
      "A shop needs one place to sell at the till, track stock across branches and expiry batches, and see exactly who changed a price, gave a discount or voided a sale.",
    solution: [
      "A till with scan-or-tap selling and keyboard shortcuts for search, charge, hold and discount",
      "Stock by branch, with expiry batches and low-stock status",
      "Reorder and busy-hour insights drawn from the shop's own sales history",
      "Income, expenses and profit for any period, exported to CSV, Excel and PDF",
      "An audit log of price changes, discounts, voids and refunds",
    ],
    architecture: {
      stages: ["Till & Back Office UI", "API Layer", "Branch Data Store"],
      branch: { under: 1, label: "Roles & Audit Trail" },
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    contribution:
      "Client work, in progress. I am building the till, the back office and the audit trail end to end.",
    access: {
      demo: "https://pos-zeta-eight.vercel.app/",
      note: "Client project: source is proprietary",
    },
    screenshot: { src: "/projects/pos/overview.png", alt: "POS System dashboard showing net sales, profit and cash flow for the day" },
  },
  {
    id: "steadfast-parent",
    index: "05",
    title: "Steadfast Parent Portal",
    tagline: "School platform for parents, teachers and students",
    status: "Active",
    problem:
      "Parents needed to follow a child's progress and reach teachers on web and mobile, without paper notices or group chats.",
    solution: [
      "Responsive Parent and Teacher portals",
      "Frontend integration for progress tracking and messaging",
      "Companion mobile app with Expo / React Native",
      "Engagement and communication workflows, end to end",
    ],
    architecture: {
      stages: ["Next.js Web", "Expo Mobile", "Node.js API", "PostgreSQL"],
    },
    stack: ["Next.js", "React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL"],
    contribution:
      "Part of my role at Steadfast. The web and mobile parent experience, API integration and school systems.",
    access: {
      note: "Private school system",
    },
  },
  {
    id: "fitness-tracker",
    index: "06",
    title: "Fitness Tracker",
    tagline: "Sleep and diet tracker for Android",
    status: "Active",
    problem:
      "Fitness apps buried the two things I track, sleep and diet. So I built a Kotlin app for exactly those.",
    solution: [
      "Sleep and habit logging with progress charts",
      "Meal logging and health metrics",
      "Local-first with Room, no account or backend",
      "Used daily and shaped by real use",
    ],
    architecture: {
      stages: ["Android UI (Kotlin)", "Room Database", "Local Storage"],
    },
    stack: ["Kotlin", "Android SDK", "Room Database", "MPAndroidChart"],
    contribution: "Solo project. Designed, built and maintained by me.",
    access: {
      repo: "https://github.com/Brian-Kareithi/Physical-Fitness",
      note: "Public repository",
    },
  },
  {
    id: "flip-book-portfolio",
    index: "07",
    title: "Flip-Book Portfolio",
    tagline: "A portfolio bound as an interactive book",
    status: "Shipped",
    problem:
      "Portfolios all look the same. I wanted one that reads like a bound volume, where each chapter is a page you turn.",
    solution: [
      "Drag, swipe or use the keyboard to turn pages",
      "Seventeen leaves, from cover to back cover",
      "An index drawer with live reading progress",
      "Candlelight theme and optional page-turn sounds",
    ],
    architecture: {
      stages: ["Next.js Frontend", "Book Engine (Page Flip)", "Static Content"],
      branch: { under: 1, label: "Sound & Theme" },
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web Audio API"],
    contribution:
      "Solo build. Book engine, content model, theming and sound.",
    access: {
      demo: "https://flip-book-portfolio-omega.vercel.app/",
      note: "Private repository",
    },
    screenshot: { src: "/projects/flip-book.png", alt: "Flip-Book Portfolio cover: a leather-bound book titled Brian Kareithi on a wooden desk" },
  },
  {
    id: "portfolio-v2-3d",
    index: "08",
    title: "Portfolio V2 (3D)",
    tagline: "Scroll-driven 3D portfolio built with Three.js",
    status: "Shipped",
    problem:
      "My first portfolio proved clean UI. This one shows range: real-time 3D and scroll-driven storytelling.",
    solution: [
      "A Three.js scene choreographed to scroll",
      "Light and dark themes across the scene and content",
      "Full portfolio content, from hero to contact",
      "A section linking V1 and V2 to show growth",
    ],
    architecture: {
      stages: ["Vite Frontend", "Three.js Scene", "GSAP Scroll Rig"],
    },
    stack: ["Vite", "Three.js", "JavaScript", "GSAP", "CSS3"],
    contribution: "Solo build. 3D scene, scroll choreography, theming and content.",
    access: {
      demo: "https://portfoliov2-ruby.vercel.app/",
      note: "Private repository",
    },
  },
];

export interface OtherProject {
  title: string;
  type: string;
  status: "completed" | "active" | "archived";
  description: string;
  details: string[];
  stack: string[];
  repo: string;
}

export const otherProjects: OtherProject[] = [
  {
    title: "Steadfast Library Module",
    type: "Web Application",
    status: "active",
    description: "Dedicated web-based library management solution integrated into the academy ecosystem.",
    details: [
      "Digital resource management and library administration workflows.",
      "Student and staff access management with role-based permissions.",
      "Built for efficiency, maintainability, and seamless integration with existing systems.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    repo: "",
  },
  {
    title: "Custom Jellyfin Client",
    type: "Mobile Application",
    status: "active",
    description: "Self-hosted media client built specifically for my home server environment.",
    details: [
      "A mobile Jellyfin client tailored to my own workflow, preferences and media habits.",
      "Direct integration with a self-hosted Jellyfin server on the homelab.",
    ],
    stack: ["React Native", "Expo", "Jellyfin API", "TypeScript"],
    repo: "https://github.com/Brian-Kareithi/Jellyfin-Mobile",
  },
  {
    title: "House Hunters",
    type: "Web Platform",
    status: "archived",
    description: "Student housing discovery platform conceived during university, frontend and backend.",
    details: [
      "Helped campus students discover and compare rental properties by preference.",
      "RESTful API for property data, user management and location-based search.",
      "Never fully completed due to limited market demand at the time, kept as reference work.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    repo: "https://github.com/Brian-Kareithi/House-Hunters-Frontend",
  },
  {
    title: "Network API",
    type: "Library / API",
    status: "completed",
    description: "Python-based networking API supporting cybersecurity infrastructure.",
    details: [
      "Networking utilities and secure communication mechanisms for larger cybersecurity systems.",
      "Built as infrastructure for a final-year cybersecurity project.",
    ],
    stack: ["Python", "Socket Programming", "SSL/TLS", "REST API"],
    repo: "https://github.com/Brian-Kareithi/network-api",
  },
  {
    title: "CyberShield",
    type: "Security Research",
    status: "completed",
    description: "Final-year project focused on improving mobile device security on public networks.",
    details: [
      "Public Wi-Fi exposes users to traffic interception, spoofing and malicious access points.",
      "Protective mechanisms that monitor and secure mobile device communications on hostile networks.",
    ],
    stack: ["Python", "Network Security", "SSL/TLS", "Threat Detection"],
    repo: "https://github.com/Brian-Kareithi/cybershield",
  },
];
