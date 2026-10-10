/**
 * The engineering standards every build on this site is held to. Each line is a
 * deliberate choice you can verify in the source, so this is evidence, not a claim.
 */

export interface StandardGroup {
  id: "accessibility" | "performance" | "security" | "reach";
  label: string;
  summary: string;
  items: string[];
}

export const standards: StandardGroup[] = [
  {
    id: "accessibility",
    label: "Accessibility",
    summary: "Usable by keyboard, screen reader and reduced-motion users.",
    items: [
      "Every control is reachable and operable by keyboard, with a visible focus ring",
      "Motion respects prefers-reduced-motion: animation is an accent, never required",
      "Semantic landmarks, labelled fields and aria-live status regions",
      "Collapsed panels are inert, so hidden content leaves the tab order",
    ],
  },
  {
    id: "performance",
    label: "Performance",
    summary: "Fast on a mid-range phone and a slow connection.",
    items: [
      "Next.js Image with responsive sizes, lazy loading and blur placeholders",
      "No animation library: IntersectionObserver and CSS transitions only",
      "Heavy libraries such as the PDF engine are dynamically imported on demand",
      "Self-hosted fonts via next/font, so text never shifts on load",
    ],
  },
  {
    id: "security",
    label: "Security",
    summary: "Secrets stay server-side and access is least-privilege.",
    items: [
      "Security headers set at the framework level",
      "AI and backend secrets held in Firebase Functions, never in the browser",
      "Role-based, least-privilege access on every multi-user system",
      "Validated input and TLS in transit on every request",
    ],
  },
  {
    id: "reach",
    label: "Reach",
    summary: "Found by search engines, readable by machines, resilient on any screen.",
    items: [
      "Per-route metadata, a sitemap, robots rules and JSON-LD structured data",
      "A machine-readable /llms.txt profile for AI tools and crawlers",
      "Content renders without JavaScript; responsive from 320px up",
      "Accessible colour contrast in both light and dark themes",
    ],
  },
];

/**
 * Optional measured results. Leave empty until you have a real Lighthouse run.
 * Run Lighthouse against the deployed site, then add entries like:
 *   { label: "Performance", score: 100 }
 * The section only shows this row when at least one score is present.
 */
export interface AuditScore {
  label: string;
  score: number;
}

export const auditScores: AuditScore[] = [];
