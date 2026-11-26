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
  /** A demo video shown in place of the screenshot, with the screenshot or poster as its first frame. */
  video?: { src: string; /** Smaller portrait cut served to phones. */ mobileSrc?: string; poster: string; label: string };
  /** For projects split across several repositories: one entry per codebase. */
  parts?: { name: string; role: string; stack: string[]; repo: string; host?: string }[];
  /** Extra screens, shown as a gallery. `phone` frames are portrait. */
  gallery?: { src: string; title: string; caption: string; form: "desktop" | "phone" }[];
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
    id: "super-admin",
    index: "01",
    title: "Steadfast Super Admin",
    tagline: "Native Android port of a school's super-admin portal",
    status: "Shipped",
    problem:
      "Steadfast's super admins run the whole school from a Next.js web portal, covering users, classes, discipline, leave, exams and the timetable. It was built for a desktop, with a sidebar, wide tables and hover menus, so I rebuilt it as a native Android app with the same features.",
    solution: [
      "Every screen, tab, dialog and action from the web portal, across 29 modules in four sections: Overview, Manage, Operations and System",
      "Uses the same REST API as the web. A 401 triggers one token refresh shared by every request in flight, then one retry, and losing signal never signs you out",
      "The refresh token is encrypted with AES-256-GCM under an Android Keystore key, replacing the web's httpOnly cookie. Any account that isn't a super admin is signed out right after login",
      "A small port of TanStack Query: one cache per key, refetching when data goes stale or the app returns, and invalidation by key prefix",
      "Desktop layouts become a drawer, bottom sheets and stacked cards under liquid-glass chrome, with smart search, deep links and background notification polling",
    ],
    architecture: {
      stages: ["Compose UI", "Query Cache", "ApiClient (OkHttp)", "Steadfast REST API"],
      branch: { under: 2, label: "Keystore Token Refresh" },
    },
    stack: ["Kotlin", "Jetpack Compose", "Material 3", "Navigation Compose", "OkHttp", "kotlinx.serialization", "DataStore", "Android Keystore", "WorkManager", "Coil", "Haze"],
    contribution:
      "Solo build. Networking and auth, the query cache, the app shell, every module's screens and 44 unit tests, with a small manual DI container instead of Hilt.",
    access: {
      note: "Private repository. Signing in needs a Steadfast super-admin account",
    },
  },
  {
    id: "samsung-tv",
    index: "02",
    title: "Samsung TV Idle Screen",
    tagline: "Motorsport ambient screen for an idle Samsung Tizen TV",
    status: "Shipped",
    problem:
      "An idle TV either shows a blank No Signal screen or sits on a streaming app's menu. The TV can't report its input, so I needed a way to tell when it was idle and show something worth looking at: a clock, the weather and race photos.",
    solution: [
      "A Python watcher polls the TV over its WebSocket API and treats it as idle when it is on, no streaming app is visible and the screen itself isn't showing",
      "After 5 idle minutes it opens the page in the TV browser and presses OK so it goes full screen. If someone switches input, it waits 15 minutes before reopening",
      "Big Nairobi clock and Open-Meteo weather, independent of the TV's own settings",
      "243 Wikimedia Commons race photos across seven series, each credited on screen, rotating every 20 s with a Ken Burns drift",
      "A tech-joke card with a fake blur, since the 2018 Tizen browser has no backdrop-filter, written in ES5 to run on it",
    ],
    architecture: {
      stages: ["Idle Watcher (Python)", "Samsung TV WebSocket API", "Tizen Browser", "Idle Screen (ES5)"],
      branch: { under: 3, label: "Heartbeat Ping" },
    },
    stack: ["Python", "samsungtvws", "JavaScript (ES5)", "HTML", "CSS", "Open-Meteo", "JokeAPI", "Tizen"],
    contribution:
      "Solo build. Idle detection, TV remote control, the idle screen, and curating and crediting the photo set.",
    screenshot: {
      src: "/projects/samsung-tv/overview.jpg",
      alt: "Samsung TV idle screen: a large clock and Nairobi weather over a Formula 1 race photo, with a tech-joke card and the photo credit",
    },
    access: {
      repo: "https://github.com/Brian-Kareithi/Samsung-TV",
      note: "Public repository. Runs on a PC on the same network as the TV",
    },
  },
  {
    id: "homelab-app",
    index: "03",
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
    index: "04",
    title: "QuickPrint",
    tagline: "Multi-tenant print-shop platform: web portal, Android app and a real-time API",
    status: "Shipped",
    problem:
      "Cyber cafés and print shops run on WhatsApp attachments, flash drives and a shouted queue. QuickPrint gives each shop a QR code and a 5-character counter code: customers send files from a phone browser or the Android app, see an honest price, pay with M-Pesa or cash and chat with the shop, while the shop works a live queue.",
    solution: [
      "Connect to a shop by QR poster, shop link or 5-character code, then upload with no account. Only the file types that shop accepts are offered, and PDF page counts are detected",
      "Per-file print options (pages, copies, colour, paper, sides, quality, binding, finishing) priced by the server from the shop's own pricing rules",
      "Cash, M-Pesa Till, Paybill or Send Money, Airtel Money and bank transfer, with the shop's exact payment steps and staff-confirmed payment status",
      "A live print queue and searchable orders over Socket.IO, plus revenue, peak-hour and printer analytics, team and cashier access, and per-shop branding",
      "Customer–shop chat under a fruit nickname such as Cute Pineapple 🍍. Shops get live toasts, desktop alerts and an unread count on the browser tab, and the Android app sends a notification only when the shop replies",
      "Privacy by design: files are deleted an hour after an order is done, chats after 30 days, chat keys are stored only as SHA-256 hashes, and a Terms & Privacy page follows Kenya's Data Protection Act 2019",
    ],
    architecture: {
      stages: ["Next.js Web Portal + Android App", "NestJS REST API", "PostgreSQL (Prisma)"],
      branch: { under: 1, label: "Socket.IO Queue & Chat · Retention Jobs" },
    },
    stack: [
      "Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "NestJS 10", "PostgreSQL", "Prisma 6", "Socket.IO",
      "JWT", "Kotlin", "Jetpack Compose", "WorkManager", "Docker", "Railway", "Vercel",
    ],
    contribution:
      "Solo build across all three repositories: the NestJS API and data model, the Next.js customer portal, shop dashboard and admin console, and the native Android app, plus deployment on Railway and Vercel.",
    screenshot: {
      src: "/projects/quickprint/landing.png",
      alt: "QuickPrint landing page: Your print shop, run from one QR code, beside an order card showing a 24-page PDF paid with M-Pesa and ready in about 12 minutes",
    },
    video: {
      src: "/projects/quickprint/quickprint.mp4",
      mobileSrc: "/projects/quickprint/quickprint%20mobile.mp4",
      poster: "/projects/quickprint/brag.jpg",
      label: "QuickPrint product demo",
    },
    parts: [
      {
        name: "Web portal",
        role: "Customer upload portal, shop dashboard with queue, orders, messages and analytics, and the super-admin console.",
        stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Socket.IO client", "Recharts", "Zod"],
        repo: "https://github.com/Brian-Kareithi/QuickPrint",
        host: "Vercel",
      },
      {
        name: "API",
        role: "Multi-tenant REST API with real-time queue and chat, server-side pricing, QR posters, rate limits and scheduled data retention.",
        stack: ["NestJS 10", "PostgreSQL", "Prisma 6", "Socket.IO", "JWT", "@nestjs/schedule"],
        repo: "https://github.com/Thee-Entity/QuickPrint-Backend",
        host: "Railway",
      },
      {
        name: "Android app",
        role: "Customer app: connect by code, QR or link, upload, choose options, order, and chat with reply notifications.",
        stack: ["Kotlin", "Jetpack Compose", "Material 3", "OkHttp", "WorkManager", "Google code scanner"],
        repo: "https://github.com/Brian-Kareithi/QuickPrint-Android",
        host: "Android 7.0+",
      },
    ],
    gallery: [
      { src: "/projects/quickprint/web/shop.png", title: "Shop portal", caption: "The shop-branded page a customer reaches from the QR poster.", form: "desktop" },
      { src: "/projects/quickprint/web/dashboard.png", title: "Dashboard", caption: "Today's numbers, onboarding checklist and the open-for-orders switch.", form: "desktop" },
      { src: "/projects/quickprint/web/orders.png", title: "Orders", caption: "Search orders and confirm payments.", form: "desktop" },
      { src: "/projects/quickprint/web/inbox.png", title: "Messages", caption: "Every customer chat, with the linked order beside it.", form: "desktop" },
      { src: "/projects/quickprint/web/chat-popup.png", title: "Chat popup", caption: "Customers message the shop without an account.", form: "desktop" },
      { src: "/projects/quickprint/web/terms.png", title: "Terms & Privacy", caption: "What is kept, for how long, and the customer's rights.", form: "desktop" },
      { src: "/projects/quickprint/android/home.png", title: "Connect", caption: "Shop code, QR scan or link.", form: "phone" },
      { src: "/projects/quickprint/android/upload.png", title: "Upload", caption: "Only the file types the shop accepts.", form: "phone" },
      { src: "/projects/quickprint/android/options.png", title: "Options", caption: "Pages, copies, colour, binding.", form: "phone" },
      { src: "/projects/quickprint/android/review.png", title: "Review", caption: "Server-priced breakdown.", form: "phone" },
      { src: "/projects/quickprint/android/order-placed.png", title: "Placed", caption: "Order number and payment steps.", form: "phone" },
      { src: "/projects/quickprint/android/chat.png", title: "Chat", caption: "Talk to the shop as Nice Avocado.", form: "phone" },
      { src: "/projects/quickprint/android/notification.png", title: "Reply alert", caption: "Only when the shop answers.", form: "phone" },
    ],
    access: {
      repo: "https://github.com/Brian-Kareithi/QuickPrint",
      demo: "https://quickprint-ten.vercel.app",
      note: "Three public repositories: web, API and Android",
    },
  },
  {
    id: "roadsafe360",
    index: "05",
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
    index: "06",
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
    index: "07",
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
    screenshot: { src: "/projects/steadfast-parent/login.png", alt: "Steadfast Parent Portal sign-in screen in the dark theme, with the academy crest and email and password fields" },
    access: {
      note: "Private school system",
    },
  },
  {
    id: "steadfast-library",
    index: "08",
    title: "Steadfast Library Portal",
    tagline: "Librarian workspace for a school library",
    status: "Shipped",
    problem:
      "The school library tracked books, loans and fines by hand, so nobody could say which copies were out, who was overdue or what to buy next. The librarian needed one workspace for the catalogue, the issue desk and the fines book.",
    solution: [
      "A catalogue with copies tracked by accession number and barcode, bulk import and CSV export",
      "A step-by-step issue desk: search by title, author or ISBN, or scan a barcode to look up and select the book, then return it the same way",
      "Reservations with queue positions and an estimate of when each copy will be free",
      "A fines ledger for recording payments, adjusting, waiving or resolving fines, and marking books lost",
      "Purchase requests from request to fulfilment, copy transfers between locations, and usage reports",
    ],
    architecture: {
      stages: ["Next.js Workspace", "Library API Client", "Steadfast REST API"],
      branch: { under: 0, label: "Librarian-only Session Guard" },
    },
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Radix UI", "REST API"],
    contribution:
      "Built the frontend: catalogue, issue desk, reservations, fines, reports and the app shell, on the shared Steadfast backend.",
    screenshot: { src: "/projects/steadfast-library/login.png", alt: "Steadfast Library sign-in card for library staff, with work email, password and remember-me fields" },
    access: {
      note: "Private school system",
    },
  },
  {
    id: "steadfast-hr",
    index: "09",
    title: "Steadfast HR Portal",
    tagline: "HR office portal for staff leave, letters and records",
    status: "Shipped",
    problem:
      "HR at the school coordinates staff leave, complaints, formal letters and parent announcements, and needs to look up staff and student records. Each of those lived in a different place, and HR may only decide some leave requests: others must go to the Principal.",
    solution: [
      "A dashboard with a pending-approvals queue, today's attendance, the inbox and leave and ticket analytics",
      "Leave decisions routed by who is asking: HR can approve most staff requests, while requests from senior staff go to the Principal",
      "Tickets HR can claim, assign, escalate, schedule a meeting for and resolve, plus staff letters with PDF download",
      "Announcements to the whole school, a class, a stream or chosen students, with scheduling, pinning and a live preview",
      "Read-only staff and student records, with sensitive fields stripped before they are shown",
    ],
    architecture: {
      stages: ["Next.js Portal", "Route Guard (proxy.ts)", "API Client", "Steadfast REST API"],
      branch: { under: 1, label: "HR-only Role Check" },
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "REST API"],
    contribution:
      "Solo build of the frontend: every screen, the two-layer route guard, the command menu and the light and dark themes.",
    screenshot: { src: "/projects/steadfast-hr/login.png", alt: "Steadfast HR Portal sign-in: a teal panel listing leave coordination, ticket triage and announcements beside the sign-in card and cat mascot" },
    access: {
      note: "Private school system",
    },
  },
  {
    id: "fitness-tracker",
    index: "10",
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
    index: "11",
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
    index: "12",
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
