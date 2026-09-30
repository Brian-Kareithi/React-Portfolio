import type { CSSProperties } from "react";
import {
  Box, CalendarCheck, ChevronDown, ChevronRight, CornerDownRight, Database, HardDrive,
  KeyRound, Layers, LayoutDashboard, Monitor, Music, Server, Smartphone, Timer, Workflow,
  type LucideIcon,
} from "lucide-react";

interface ArchitectureFlowProps {
  /** Pipeline stages in order, e.g. ["Frontend", "API", "Backend", "Database"]. */
  stages: string[];
  /** Optional branch drawn beneath one stage, e.g. { under: 2, label: "Services" }. */
  branch?: { under: number; label: string };
}

/** Picks an icon from the words in a stage name. First match wins. */
const iconRules: [RegExp, LucideIcon][] = [
  [/dashboard/i, LayoutDashboard],
  [/auth/i, KeyRound],
  [/booking|property/i, CalendarCheck],
  [/job|delete|cron/i, Timer],
  [/sound|theme|audio/i, Music],
  [/three|r3f|scene|viewer/i, Box],
  [/engine|flip|gsap|rig/i, Workflow],
  [/expo|mobile|android/i, Smartphone],
  [/firestore|postgres|sqlite|room|database|mongo/i, Database],
  [/api|express|node|server/i, Server],
  [/storage|static|content/i, HardDrive],
  [/frontend|web|client|ui|vite|next/i, Monitor],
];

const iconFor = (label: string) => iconRules.find(([re]) => re.test(label))?.[1] ?? Layers;

/**
 * Architecture diagram: numbered nodes joined by arrows, left to right on wider
 * screens and top to bottom on phones. A branch hangs off its parent stage.
 */
export function ArchitectureFlow({ stages, branch }: ArchitectureFlowProps) {
  const BranchIcon = branch ? iconFor(branch.label) : null;

  return (
    <ol
      aria-label={`Architecture: ${stages.join(", then ")}${branch ? `; ${branch.label} branches from ${stages[branch.under]}` : ""}`}
      className="arch-grid grid gap-y-8 sm:gap-x-10 sm:gap-y-10"
      style={{ "--n": stages.length } as CSSProperties}
    >
      {stages.map((stage, i) => {
        const Icon = iconFor(stage);
        const last = i === stages.length - 1;
        return (
          <li key={stage} className="relative" style={{ order: i * 2 }}>
            <Node icon={Icon} step={String(i + 1).padStart(2, "0")} label={stage} />
            {!last && (
              <span aria-hidden="true" className="arch-connector" style={{ color: "var(--color-accent)" }}>
                <span className="arch-line" />
                <ChevronDown className="arch-arrow-down h-4 w-4" />
                <ChevronRight className="arch-arrow-right h-4 w-4" />
              </span>
            )}
          </li>
        );
      })}

      {branch && BranchIcon && (
        <li
          className="arch-branch relative ml-8 sm:ml-0"
          style={{ order: branch.under * 2 + 1, "--col": branch.under + 1 } as CSSProperties}
        >
          <span aria-hidden="true" className="arch-branch-line hidden sm:block" />
          <Node icon={BranchIcon} step="↳" label={branch.label} branch />
        </li>
      )}

    </ol>
  );
}

function Node({ icon: Icon, step, label, branch = false }: { icon: LucideIcon; step: string; label: string; branch?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 sm:flex-col sm:gap-2 sm:px-3 sm:py-4 sm:text-center ${branch ? "border-dashed" : ""}`}
      style={{
        backgroundColor: branch ? "var(--color-highlight)" : "var(--color-bg-card)",
        borderColor: branch ? "var(--color-accent-secondary)" : "var(--color-border)",
      }}
    >
      <span
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
        style={
          branch
            ? { backgroundColor: "var(--color-bg-card)", color: "var(--color-accent)" }
            : { backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }
        }
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
          {branch ? <CornerDownRight className="inline h-3 w-3" aria-label="Branch" /> : step}
        </span>
        <span className="block text-xs font-semibold leading-snug" style={{ color: "var(--color-text-primary)" }}>
          {label}
        </span>
      </span>
    </div>
  );
}
