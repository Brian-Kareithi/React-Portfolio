/**
 * Product documentation for each case study: audience, scope and data model.
 * Keyed by CaseStudy.id. Rendered on /projects and exported to /docs/projects/*.md
 * by `npm run docs`, so the site and the repository documentation never drift.
 */

export interface ErdField {
  name: string;
  type: string;
  /** pk = primary key, fk = foreign key, uq = unique */
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
  /** Cardinality read from `from` to `to`. */
  cardinality: "1:1" | "1:N" | "N:M";
  label: string;
}

export interface ProjectDoc {
  /** One-line statement of what the product is for. */
  purpose: string;
  /** Who uses it and what each group needs from it. */
  audience: { who: string; needs: string }[];
  scope: { in: string[]; out: string[] };
  /** Quality attributes the design was shaped around. */
  qualities: string[];
  /** Entity-relationship model. Omitted when the product has no persistent data layer. */
  erd?: { entities: ErdEntity[]; relations: ErdRelation[] };
  /** Shown instead of an ERD when the product has no database. */
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

  "sapio-homes": {
    purpose: "Let prospective buyers find a unit, see the building, and book a visit without a phone call.",
    audience: [
      { who: "Prospective buyers", needs: "Filter by budget and floor area, preview the development, book a site visit." },
      { who: "Existing unit owners", needs: "Find the property management services on offer." },
      { who: "Sapio sales team", needs: "Receive qualified visit bookings with the unit of interest attached." },
    ],
    scope: {
      in: [
        "Search by unit type, budget and floor area",
        "3D building viewer",
        "Site-visit booking per development",
        "Project pages with pricing, floor plans and amenities",
        "Property management service pages",
      ],
      out: ["Online payment or reservation deposits", "Customer account area", "Content management UI for the client"],
    },
    qualities: ["Fast first load despite the 3D viewer", "Mobile-first browsing", "Accurate pricing data per unit"],
    erd: {
      entities: [
        { name: "developments", fields: [id(), { name: "slug", type: "string", key: "uq" }, { name: "name", type: "string" }, { name: "location", type: "string" }, { name: "model_url", type: "string" }] },
        { name: "unit_types", fields: [id(), fk("development_id"), { name: "name", type: "string" }, { name: "floor_area_m2", type: "int" }, { name: "price", type: "decimal" }, { name: "floor_plan_url", type: "string" }] },
        { name: "amenities", fields: [id(), fk("development_id"), { name: "label", type: "string" }] },
        { name: "site_visits", fields: [id(), fk("development_id"), fk("unit_type_id"), { name: "visitor_name", type: "string" }, { name: "contact", type: "string" }, { name: "slot", type: "timestamp" }] },
      ],
      relations: [
        { from: "developments", to: "unit_types", cardinality: "1:N", label: "offers" },
        { from: "developments", to: "amenities", cardinality: "1:N", label: "includes" },
        { from: "developments", to: "site_visits", cardinality: "1:N", label: "is visited via" },
        { from: "unit_types", to: "site_visits", cardinality: "1:N", label: "is the interest of" },
      ],
    },
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
      { who: "Recruiters and hiring managers", needs: "Skim chapters quickly and jump to what matters via the index." },
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
      { who: "Recruiters and hiring managers", needs: "The same facts as a conventional resume, presented memorably." },
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
