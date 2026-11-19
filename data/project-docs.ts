
export interface ErdField {
  name: string;
  type: string;
  key?: "pk" | "fk" | "uq";
}

export interface ErdEntity {
  name: string;
  note?: string;
  fields: ErdField[];
}

export interface ErdRelation {
  from: string;
  to: string;
  cardinality: "1:1" | "1:N" | "N:M";
  label: string;
}

export interface ProjectDoc {
  purpose: string;
  audience: { who: string; needs: string }[];
  scope: { in: string[]; out: string[] };
  qualities: string[];
  erd?: { entities: ErdEntity[]; relations: ErdRelation[] };
  dataNote?: string;
}

const id = (name = "id"): ErdField => ({ name, type: "uuid", key: "pk" });
const fk = (name: string): ErdField => ({ name, type: "uuid", key: "fk" });

export const projectDocs: Record<string, ProjectDoc> = {
  "super-admin": {
    purpose: "Let a school's super admins do everything the web portal does from an Android phone, against the same backend.",
    audience: [
      { who: "Super admins", needs: "Approve, assign and fix things across users, classes, discipline, leave, exams and the timetable while away from a desk." },
      { who: "School leadership", needs: "See what is waiting on them and hear about new notifications without opening a laptop." },
    ],
    scope: {
      in: [
        "All 29 web portal modules, with the same tabs, dialogs and actions",
        "Sign-in with two-factor, trusted devices, password reset and forced password change",
        "Smart search, quick actions and a notification bell",
        "Background notification polling and deep links into any screen",
      ],
      out: ["Roles other than super admin", "A separate mobile backend or API", "iOS"],
    },
    qualities: ["Matches the web portal feature for feature", "Tokens never stored in plain text", "Dropping offline never ends the session"],
    dataNote:
      "No local database. The app reads and writes through the same Steadfast REST API as the web portal, and the data model lives in the backend. The phone keeps only the Keystore-encrypted refresh token, preferences and a cached copy of the user's quick actions.",
  },

  "samsung-tv": {
    purpose: "Turn an idle Samsung TV into an ambient screen with the time, the weather and motorsport photos, opened automatically.",
    audience: [{ who: "Anyone in the room", needs: "Time and weather at a glance, and something better than No Signal on an idle TV." }],
    scope: {
      in: ["Idle detection over the Samsung TV WebSocket API", "Opening the page full screen on the TV", "Clock and Nairobi weather", "Rotating, credited motorsport wallpapers", "Tech-joke card", "Windows auto-start"],
      out: ["A Tizen app installed on the TV", "Detecting HDMI input or No Signal (the TV doesn't expose it)", "Running without a PC on the network"],
    },
    qualities: ["Never interrupts someone watching", "Runs on a 2018 Tizen browser", "Every photo credited"],
    dataNote: "No database. Photos and jokes are static files (screen/photos.js, screen/quotes.js); the watcher keeps its state in memory and the TV pairing token in a local file.",
  },

  "homelab-app": {
    purpose: "Put a phone-friendly view of my self-hosted homelab in one app, without storing service credentials on the device.",
    audience: [
      { who: "Homelab owner", needs: "Check server health, media services and activity from a phone, at home or away." },
      { who: "Self-hosting tinkerer", needs: "A dashboard that reflects whatever services are configured on the server." },
    ],
    scope: {
      in: [
        "Dashboard driven by Homepage's /api/services with CPU, RAM, disk and Docker status",
        "Activity feed for Jellyfin now-playing, the Sonarr queue and active torrents",
        "Per-service detail screens",
        "Automatic LAN vs Tailscale resolution with an offline snapshot cache",
        "Background checks with notifications for stopped containers, downtime or finished torrents",
      ],
      out: ["Managing or reconfiguring services from the app", "Storing Sonarr, Radarr or Jellyfin API keys on the device", "iOS"],
    },
    qualities: ["Single endpoint with no device-held service keys", "Works on LAN and over Tailscale", "Useful offline from cached snapshots"],
    dataNote:
      "No database. The app reads from the Homepage API and caches snapshots locally for offline use; service credentials stay on the server-side widget proxy.",
  },

  roadsafe360: {
    purpose: "Give road authorities one auditable record of licences, offences, demerit points and appeals.",
    audience: [
      { who: "Drivers", needs: "See licence status and demerit points, and contest an offence they believe is wrong." },
      { who: "Police officers", needs: "Issue an offence in the field and verify a licence by scanning its QR code." },
      { who: "Road authority", needs: "Review appeals and read regional safety trends to target enforcement." },
      { who: "System administrators", needs: "Manage accounts, roles and the offence catalogue." },
    ],
    scope: {
      in: [
        "Role-based access for four user types",
        "Digital licence with QR verification",
        "Offence issuance with severity-based demerit points",
        "Appeal submission, review and point restoration",
        "Regional analytics with charts and a map",
      ],
      out: ["Fine payment processing", "Integration with a live national licensing database", "Native mobile apps"],
    },
    qualities: ["Auditability of every point change", "Least-privilege access per role", "Responsive on field devices"],
    erd: {
      entities: [
        { name: "users", note: "Every account, any role", fields: [id(), { name: "email", type: "string", key: "uq" }, { name: "role", type: "enum" }, { name: "name", type: "string" }] },
        { name: "drivers", note: "Licence holder profile", fields: [id(), fk("user_id"), { name: "licence_no", type: "string", key: "uq" }, { name: "qr_token", type: "string", key: "uq" }, { name: "demerit_points", type: "int" }, { name: "status", type: "enum" }] },
        { name: "offence_types", note: "Catalogue", fields: [id(), { name: "name", type: "string" }, { name: "severity", type: "enum" }, { name: "points", type: "int" }] },
        { name: "offences", fields: [id(), fk("driver_id"), fk("officer_id"), fk("offence_type_id"), { name: "location", type: "geopoint" }, { name: "issued_at", type: "timestamp" }, { name: "status", type: "enum" }] },
        { name: "appeals", fields: [id(), fk("offence_id"), fk("reviewed_by"), { name: "reason", type: "text" }, { name: "status", type: "enum" }, { name: "decided_at", type: "timestamp" }] },
      ],
      relations: [
        { from: "users", to: "drivers", cardinality: "1:1", label: "has profile" },
        { from: "drivers", to: "offences", cardinality: "1:N", label: "receives" },
        { from: "users", to: "offences", cardinality: "1:N", label: "issues (officer)" },
        { from: "offence_types", to: "offences", cardinality: "1:N", label: "classifies" },
        { from: "offences", to: "appeals", cardinality: "1:N", label: "is contested by" },
        { from: "users", to: "appeals", cardinality: "1:N", label: "reviews (authority)" },
      ],
    },
  },

  "pos-system": {
    purpose: "Give a multi-branch shop one system for selling, stock, accounts and a trustworthy record of every change.",
    audience: [
      { who: "Owner", needs: "See sales, profit and cash flow across every branch, and who changed what." },
      { who: "Manager", needs: "Watch stock, reorder in time and review the day." },
      { who: "Cashier", needs: "Sell quickly with cash, card, M-Pesa or bank transfer." },
      { who: "Stockkeeper", needs: "Receive stock into the right branch and batch, with expiry dates." },
    ],
    scope: {
      in: [
        "Till with scan or tap selling",
        "Stock by branch with expiry batches",
        "Reorder and busy-hour insights",
        "Accounting for any period",
        "Audit log of price changes, discounts, voids and refunds",
        "CSV, Excel and PDF exports",
      ],
      out: ["Customer-facing storefront", "Supplier portal", "Payroll"],
    },
    qualities: ["Fast at the till", "Every sensitive action is traceable", "Role-based access"],
    dataNote:
      "The data model is kept private with the client's source. The live demo exposes branches, stock batches with expiry, sales, accounts and an audit trail.",
  },

  "steadfast-parent": {
    purpose: "Keep parents informed about a child's progress and in direct contact with teachers, on web and mobile.",
    audience: [
      { who: "Parents and guardians", needs: "Follow progress and message teachers without paper notices or group chats." },
      { who: "Teachers", needs: "Record progress and reach parents from one place." },
      { who: "School administration", needs: "One system of record shared with the other academy tools." },
    ],
    scope: {
      in: ["Parent portal (web)", "Teacher portal (web)", "Companion mobile app (Android and iOS)", "Progress tracking and messaging via the backend API"],
      out: ["Fee payment", "Timetable authoring", "Student-facing app"],
    },
    qualities: ["Child data privacy and access control", "Consistent behaviour across web and mobile", "Low-bandwidth tolerance on mobile"],
    erd: {
      entities: [
        { name: "users", fields: [id(), { name: "email", type: "string", key: "uq" }, { name: "role", type: "enum" }, { name: "name", type: "string" }] },
        { name: "students", fields: [id(), { name: "admission_no", type: "string", key: "uq" }, fk("class_id"), { name: "name", type: "string" }] },
        { name: "classes", fields: [id(), { name: "name", type: "string" }, fk("teacher_id")] },
        { name: "guardianships", note: "Parent to student link", fields: [fk("parent_id"), fk("student_id"), { name: "relationship", type: "string" }] },
        { name: "progress_reports", fields: [id(), fk("student_id"), fk("author_id"), { name: "term", type: "string" }, { name: "summary", type: "text" }] },
        { name: "messages", fields: [id(), fk("sender_id"), fk("recipient_id"), fk("student_id"), { name: "body", type: "text" }, { name: "sent_at", type: "timestamp" }] },
      ],
      relations: [
        { from: "users", to: "guardianships", cardinality: "1:N", label: "parent of" },
        { from: "students", to: "guardianships", cardinality: "1:N", label: "has guardians" },
        { from: "classes", to: "students", cardinality: "1:N", label: "enrols" },
        { from: "users", to: "classes", cardinality: "1:N", label: "teaches" },
        { from: "students", to: "progress_reports", cardinality: "1:N", label: "is assessed in" },
        { from: "users", to: "messages", cardinality: "1:N", label: "sends / receives" },
      ],
    },
  },

  "steadfast-library": {
    purpose: "Give the school librarian one workspace for the catalogue, the issue desk, reservations and fines.",
    audience: [
      { who: "Librarian", needs: "Issue and return books quickly, chase overdue loans and settle fines without a paper ledger." },
      { who: "Students and staff", needs: "Reserve a book and know roughly when it will be free." },
      { who: "School administration", needs: "Usage reports and a clear record of what the library asked to buy." },
    ],
    scope: {
      in: [
        "Catalogue with copies, barcodes, bulk import and CSV export",
        "Issue and return by search or barcode scan",
        "Reservations with queue positions",
        "Fines ledger: pay, adjust, waive, resolve, mark lost",
        "Purchase requests, copy transfers and usage reports",
      ],
      out: ["Borrower self-service kiosk", "Online payment of fines", "Catalogue data from outside the school"],
    },
    qualities: ["Fast at the issue desk", "Every fine change recorded", "Only librarians can sign in"],
    dataNote:
      "No local database. The portal reads and writes through the shared Steadfast REST API, and the data model lives in the backend repository.",
  },

  "steadfast-hr": {
    purpose: "Give the school's HR office one portal for staff leave, tickets, letters and announcements, with read-only access to the records it needs.",
    audience: [
      { who: "HR officer", needs: "Decide leave, handle complaints, issue letters and reach parents from one place." },
      { who: "Staff", needs: "Leave requests decided promptly by the right person." },
      { who: "Parents", needs: "Clear, targeted announcements and a route for complaints." },
    ],
    scope: {
      in: [
        "Leave decisions with routing by requester",
        "Ticket triage, escalation and meetings",
        "Staff letters with PDF download",
        "Targeted parent announcements with a live preview",
        "Read-only staff, student, attendance and consent records",
        "Own leave, letters and profile",
      ],
      out: ["Recruitment and onboarding", "Payroll", "Editing student records"],
    },
    qualities: ["HR sees only what HR needs", "Approval goes to the right person", "Works on a phone as well as a desk"],
    dataNote:
      "No local database. The portal reads and writes through the shared Steadfast REST API, and the data model lives in the backend repository.",
  },

  quickprint: {
    purpose: "Run a print shop from one QR code: customers upload and pay from their phone, and the shop works a live queue.",
    audience: [
      { who: "Print-shop customers", needs: "Upload a file, choose print options and see the price from their own phone, with no app or account fuss." },
      { who: "Shop owners and cashiers", needs: "A live queue, payment status and daily numbers, without chasing WhatsApp attachments." },
      { who: "Platform admins", needs: "Oversight of every shop, plus controls for how long customer files are kept." },
    ],
    scope: {
      in: ["Shop-branded customer portal opened by QR code", "Live print queue and searchable orders", "Cash, M-Pesa, Airtel Money and bank payments", "Printable QR posters and shop branding", "Team and cashier access", "Revenue, peak-hour and printer analytics", "Super-admin console for shops, users and retention"],
      out: ["Native mobile apps (installable web app instead)", "Card payments", "Printer drivers: jobs are printed from the shop's own machine"],
    },
    qualities: ["Customers need nothing but a phone browser", "Honest prices before the customer pays", "Files do not linger after an order is done"],
    dataNote: "Frontend in Next.js 16 talking to a separate REST backend (Thee-Entity/QuickPrint-Backend). The data model lives in the backend repository.",
  },

  "fitness-tracker": {
    purpose: "Track sleep and diet in one Android app that stores everything on the device.",
    audience: [{ who: "Me, as the daily user", needs: "Log sleep, meals and habits in seconds and see trends, without an account." }],
    scope: {
      in: ["Sleep logging", "Meal and nutrition logging", "Habit tracking", "Progress charts"],
      out: ["Cloud sync or accounts", "Social features", "Wearable integration"],
    },
    qualities: ["Local-first and private", "Fast daily entry", "Offline by design"],
    erd: {
      entities: [
        { name: "sleep_logs", fields: [{ name: "id", type: "int", key: "pk" }, { name: "date", type: "date" }, { name: "bedtime", type: "time" }, { name: "wake_time", type: "time" }, { name: "quality", type: "int" }] },
        { name: "meals", fields: [{ name: "id", type: "int", key: "pk" }, { name: "date", type: "date" }, { name: "name", type: "string" }, { name: "calories", type: "int" }] },
        { name: "habits", fields: [{ name: "id", type: "int", key: "pk" }, { name: "name", type: "string" }, { name: "target_per_week", type: "int" }] },
        { name: "habit_logs", fields: [{ name: "id", type: "int", key: "pk" }, { name: "habit_id", type: "int", key: "fk" }, { name: "date", type: "date" }, { name: "done", type: "bool" }] },
      ],
      relations: [{ from: "habits", to: "habit_logs", cardinality: "1:N", label: "is recorded in" }],
    },
  },

  "flip-book-portfolio": {
    purpose: "Present a portfolio as a bound book so the structure of the content is the interface.",
    audience: [
      { who: "Portfolio visitors", needs: "Skim chapters quickly and jump to the details that matter via the index." },
      { who: "Fellow developers", needs: "See what a non-standard portfolio interaction model looks like." },
    ],
    scope: {
      in: ["Page turning by drag, swipe and keyboard", "Index of leaves with reading progress", "Day and night themes", "Optional page-turn sound"],
      out: ["Content management system", "User accounts"],
    },
    qualities: ["Interaction feels physical but stays accessible by keyboard", "Sound is opt-in", "Runs from static content"],
    dataNote: "No database. Content is a static, typed list of leaves (cover, title page, eleven chapters, finis, back cover) bundled with the app.",
  },

  "portfolio-v2-3d": {
    purpose: "Show range beyond standard UI: real-time 3D and scroll-driven storytelling carrying the full resume.",
    audience: [
      { who: "Portfolio visitors", needs: "A clear view of the same experience in a more visual format." },
      { who: "Creative-technology teams", needs: "Evidence of Three.js and animation craft." },
    ],
    scope: {
      in: ["Scroll-choreographed Three.js scene", "Light and dark themes across scene and content", "About, projects, experience and contact sections", "Preloader and section transitions"],
      out: ["Backend or CMS", "Mobile-specific 3D optimisation beyond a responsive layout"],
    },
    qualities: ["Smooth scroll-linked animation", "Theme parity between 3D and DOM layers"],
    dataNote: "No database. All sections read from static content defined in the front end.",
  },
};
