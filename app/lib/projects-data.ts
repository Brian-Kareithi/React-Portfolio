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
  /** One measurable result. Leave unset until there is a real number to quote. */
  outcome?: string;
  /** A real capture of the product, stored in /public/projects. */
  screenshot?: { src: string; alt: string };
  access: {
    kind: "public" | "client" | "internal";
    repo?: string;
    demo?: string;
    note: string;
  };
  /** Optional supporting document (e.g. a presentation deck) shown as an inline exhibit. */
  exhibit?: {
    label: string;
    fileUrl: string;
    fileName: string;
  };
}

/** Featured systems, told as problem → solution → architecture → contribution. */
export const caseStudies: CaseStudy[] = [
  {
    id: "roadsafe360",
    index: "01",
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
      kind: "public",
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
    id: "sapio-homes",
    index: "02",
    title: "Sapio Homes",
    tagline: "Property discovery for Nairobi developments",
    status: "Shipped",
    problem:
      "Buyers needed to filter units by budget and floor area, see a building before it was finished, and book a site visit without a phone call.",
    solution: [
      "Property search by unit type, budget and floor area",
      "A 3D building viewer built with React Three Fiber",
      "Site-visit booking on every project page",
      "Project pages with pricing, floor plans and amenities",
      "Service pages for existing unit owners",
    ],
    architecture: {
      stages: ["Next.js Frontend", "Next.js API Routes", "Three.js / R3F Viewer"],
      branch: { under: 1, label: "Booking & Property Data" },
    },
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Three.js", "React Three Fiber", "Framer Motion"],
    contribution:
      "Client work. Site architecture, 3D viewer, booking flow and per-development pricing data.",
    access: {
      kind: "client",
      demo: "https://sapio-homes.vercel.app",
      note: "Client project: source is proprietary",
    },
    screenshot: { src: "/projects/sapio-homes.png", alt: "Sapio Homes landing page with property search by type, budget and floor area" },
  },
  {
    id: "steadfast-parent",
    index: "03",
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
      kind: "internal",
      note: "Private school system",
    },
  },
  {
    id: "quickprint",
    index: "04",
    title: "QuickPrint",
    tagline: "QR-based document printing for cyber cafés",
    status: "Completed",
    problem:
      "Cyber café printing means handing a flash drive to a stranger's computer. QuickPrint replaces it with a self-service upload that deletes itself.",
    solution: [
      "Scan a QR code to open an upload page on your phone",
      "Files print, then delete automatically",
      "No flash drives or shared storage",
      "Built for a single-till café workflow",
    ],
    architecture: {
      stages: ["Client (QR Upload)", "Express API", "SQLite"],
      branch: { under: 1, label: "Auto-delete Job" },
    },
    stack: ["React", "Node.js", "Express", "SQLite", "QR Code API"],
    contribution: "Built end to end, from QR upload to file deletion.",
    access: {
      kind: "public",
      repo: "https://github.com/Thee-Entity/QuickPrint-Client",
      note: "Public repository",
    },
  },
  {
    id: "fitness-tracker",
    index: "05",
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
      kind: "public",
      repo: "https://github.com/Brian-Kareithi/Physical-Fitness",
      note: "Public repository",
    },
  },
  {
    id: "flip-book-portfolio",
    index: "06",
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
      kind: "internal",
      demo: "https://flip-book-portfolio-omega.vercel.app/",
      note: "Private repository",
    },
    screenshot: { src: "/projects/flip-book.png", alt: "Flip-Book Portfolio cover: a leather-bound book titled Brian Kareithi on a wooden desk" },
  },
  {
    id: "portfolio-v2-3d",
    index: "07",
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
      kind: "internal",
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
  repoType: "public" | "private";
}

/** Smaller or archived builds, shown as a lighter-weight grid below the case studies. */
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
    repoType: "private",
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
    repoType: "public",
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
    repoType: "public",
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
    repoType: "public",
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
    repoType: "public",
  },
];
