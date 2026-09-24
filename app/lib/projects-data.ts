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
    tagline: "Road safety & driver demerit management platform",
    status: "Shipped",
    problem:
      "Road authorities need a way to track driver licences, traffic offences and demerit points without paper trails or siloed records, and appeals need a transparent, auditable process. RoadSafe360 models that entire workflow end to end, from offence issuance through licence suspension to appeal resolution.",
    solution: [
      "Role-based dashboards for drivers, police officers, road authorities and admins, each scoped to what that role needs",
      "Digital licences with QR-code verification and automatic demerit point calculation",
      "Traffic offence issuance and tracking, with point deductions tied to offence severity",
      "An appeals workflow that lets drivers contest offences, with point restoration on approval",
      "Regional road-safety analytics with interactive charts and a Leaflet map",
    ],
    architecture: {
      stages: ["Next.js Frontend", "Firebase Auth", "Firestore / Storage"],
      branch: { under: 1, label: "Role-based Dashboards" },
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Firebase", "Recharts", "Leaflet"],
    contribution:
      "Designed the data model and Firebase security rules, built the role-based dashboards, the QR licence and appeals workflow, and the map-based analytics view.",
    access: {
      kind: "public",
      repo: "https://github.com/Brian-Kareithi/RoadSafe360",
      demo: "https://roadsafe-opal.vercel.app/auth",
      note: "Public repository",
    },
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
    tagline: "Real-estate development & property discovery platform",
    status: "Shipped",
    problem:
      "Sapio Homes needed a marketing and discovery site for its Nairobi apartment developments that could do more than list units: prospective buyers needed to filter by budget and floor area, visualise a building before it was finished, and book a site visit without a phone call.",
    solution: [
      "Interactive property search filtered by unit type, budget and floor area",
      "A 3D building viewer built with React Three Fiber so buyers can explore a development before visiting",
      "Site-visit booking calendar integrated into each project page",
      "Detailed project pages with pricing, floor plans and amenities",
      "Property management service pages for existing unit owners",
    ],
    architecture: {
      stages: ["Next.js Frontend", "Next.js API Routes", "Three.js / R3F Viewer"],
      branch: { under: 1, label: "Booking & Property Data" },
    },
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Three.js", "React Three Fiber", "Framer Motion"],
    contribution:
      "Built as a client engagement: architected the site structure, implemented the 3D property viewer and the booking flow, and integrated pricing and floor-plan data per development.",
    access: {
      kind: "client",
      demo: "https://sapio-homes.vercel.app",
      note: "Client project: source is proprietary",
    },
  },
  {
    id: "steadfast-parent",
    index: "03",
    title: "Steadfast Parent Portal",
    tagline: "Education management platform for parents, teachers and students",
    status: "Active",
    problem:
      "Steadfast Academy needed a way for parents to track a child's progress, communicate with teachers and stay engaged with school life, without relying on paper notices or ad hoc group chats, across both web and mobile.",
    solution: [
      "Built a responsive Parent portal alongside the Teacher portal on the web",
      "Integrated the frontend with backend APIs for progress tracking and communication",
      "Built the companion mobile app with Expo / React Native for Android and iOS",
      "Implemented academic engagement and communication workflows end to end",
    ],
    architecture: {
      stages: ["Next.js Web", "Expo Mobile", "Node.js API", "PostgreSQL"],
    },
    stack: ["Next.js", "React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL"],
    contribution:
      "Part of my role at Steadfast Academy: the web and mobile parent experience, the API integration, and coordination with the school's information systems.",
    access: {
      kind: "internal",
      note: "Private school system",
    },
  },
  {
    id: "quickprint",
    index: "04",
    title: "QuickPrint",
    tagline: "QR-based document submission & printing platform",
    status: "Completed",
    problem:
      "Cyber café printing usually means handing a flash drive to a stranger's computer, a privacy risk and a slow workflow. QuickPrint replaces it with a self-service, ephemeral upload flow built for a single-till café.",
    solution: [
      "Customers scan a QR code to open a temporary upload portal on their own phone",
      "Documents upload to a transient server, get printed, then are automatically deleted",
      "No flash drives or shared storage, reducing the risk of files left behind",
      "Built for the specific constraints of a single-till cyber café workflow",
    ],
    architecture: {
      stages: ["Client (QR Upload)", "Express API", "SQLite"],
      branch: { under: 1, label: "Auto-delete Job" },
    },
    stack: ["React", "Node.js", "Express", "SQLite", "QR Code API"],
    contribution: "Designed and built end to end, from the QR upload flow to the ephemeral file lifecycle.",
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
    tagline: "Personal health & habit tracking Android app",
    status: "Active",
    problem:
      "Off-the-shelf fitness apps buried the two things I actually wanted to track, sleep and diet, under features I didn't need, so I built a Kotlin app scoped to exactly what I use daily.",
    solution: [
      "Sleep tracking and habit monitoring with daily logging and progress charts",
      "Diet and nutrition tracking with meal logging and health metrics",
      "Local-first storage with Room Database, no account or backend required",
      "Actively used and iterated on daily, driven by real usage rather than a spec",
    ],
    architecture: {
      stages: ["Android UI (Kotlin)", "Room Database", "Local Storage"],
    },
    stack: ["Kotlin", "Android SDK", "Room Database", "MPAndroidChart"],
    contribution: "Solo personal project: designed, built and continue to maintain it.",
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
    tagline: "A portfolio bound as an interactive book, with a full page-flipping experience",
    status: "Shipped",
    problem:
      "Portfolio sites all look the same: grids of cards and scroll sections. I wanted a portfolio that reads like a bound volume, where each chapter (identity, journey, tech stack, selected work, expertise, homelab, contact) is a leaf you physically turn.",
    solution: [
      "A skeuomorphic book with drag-a-corner, swipe, arrow-key and Home/End page turning",
      "Seventeen leaves from Cover and Title Page through eleven chapters to Finis and Back Cover",
      "An Index of Leaves drawer for jumping to any chapter, with live reading progress",
      "Candlelight day/night theme and toggleable page-turn sounds for atmosphere",
    ],
    architecture: {
      stages: ["Next.js Frontend", "Book Engine (Page Flip)", "Static Content"],
      branch: { under: 1, label: "Sound & Theme" },
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web Audio API"],
    contribution:
      "Designed and built solo: the book engine, the chapter content model, the candlelight theming and the sound design.",
    access: {
      kind: "public",
      repo: "https://github.com/Brian-Kareithi/Flip-book-portfolio",
      demo: "https://flip-book-portfolio-omega.vercel.app/",
      note: "Public repository",
    },
  },
  {
    id: "portfolio-v2-3d",
    index: "07",
    title: "Portfolio V2 (3D)",
    tagline: "Scroll-driven 3D portfolio experience built with Three.js",
    status: "Shipped",
    problem:
      "My first portfolio proved I could ship clean UI, but I wanted a second version that showed range: real-time 3D, scroll-choreographed storytelling and a themeable experience, while still carrying the full resume (about, projects, experience, contact).",
    solution: [
      "A Three.js experience canvas choreographed to scroll, with preloader and section transitions",
      "Light/dark theme toggle carried across the 3D scene and the content layer",
      "Full portfolio content: hero, about and skills grid, project archive, experience cards, contact dashboard",
      "Personal-portfolio lineage section linking V1 (Vite) and V2 (Next.js) to show growth",
    ],
    architecture: {
      stages: ["Vite Frontend", "Three.js Scene", "GSAP Scroll Rig"],
    },
    stack: ["Vite", "Three.js", "JavaScript", "GSAP", "CSS3"],
    contribution: "Solo build: the 3D scene, scroll choreography, theming and all content sections.",
    access: {
      kind: "public",
      repo: "https://github.com/Brian-Kareithi/3d-website",
      demo: "https://portfoliov2-ruby.vercel.app/",
      note: "Public repository",
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
