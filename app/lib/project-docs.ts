
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

  quickprint: {
    purpose: "Replace flash drives at a cyber café with a phone-based upload that deletes itself after printing.",
    audience: [
      { who: "Café customers", needs: "Send a document to print from their own phone, without handing over a drive." },
      { who: "Café operator", needs: "A single queue at the till and no leftover customer files." },
    ],
    scope: {
      in: ["QR code that opens a temporary upload page", "Upload to a transient server", "Print queue for the till", "Automatic deletion after printing"],
      out: ["Customer accounts", "Payment handling", "Multi-till or multi-branch support"],
    },
    qualities: ["Privacy: nothing persists after the job", "Works on any phone browser, no install", "Simple enough for one operator"],
    erd: {
      entities: [
        { name: "upload_sessions", note: "Created per QR code", fields: [id(), { name: "token", type: "string", key: "uq" }, { name: "expires_at", type: "timestamp" }, { name: "status", type: "enum" }] },
        { name: "documents", fields: [id(), fk("session_id"), { name: "filename", type: "string" }, { name: "size_bytes", type: "int" }, { name: "uploaded_at", type: "timestamp" }, { name: "deleted_at", type: "timestamp" }] },
        { name: "print_jobs", fields: [id(), fk("document_id"), { name: "copies", type: "int" }, { name: "status", type: "enum" }, { name: "printed_at", type: "timestamp" }] },
      ],
      relations: [
        { from: "upload_sessions", to: "documents", cardinality: "1:N", label: "receives" },
        { from: "documents", to: "print_jobs", cardinality: "1:N", label: "is printed as" },
      ],
    },
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
