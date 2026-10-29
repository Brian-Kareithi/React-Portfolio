import { Flag, RotateCcw } from "lucide-react";
import { missions, type Mission } from "@/lib/ctf";

interface CtfMissionListProps {
  solved: string[];
  current?: Mission;
  onReset: () => void;
}

/** Scoreboard: every flag with its difficulty, the current one highlighted and captured ones struck through. */
export function CtfMissionList({ solved, current, onReset }: CtfMissionListProps) {
  return (
    <div className="flat-card p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="field-label mb-1.5 flex items-center gap-2">
            <Flag className="h-3.5 w-3.5" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            Game 01
          </p>
          <h2 className="display-xl text-2xl sm:text-3xl" style={{ color: "var(--color-text-primary)" }}>
            Capture the <span className="font-serif-accent">flag</span>
          </h2>
        </div>
        <p className="rounded-md px-2 py-1 font-mono text-xs tabular-nums" style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}>
          {solved.length}/{missions.length}
        </p>
      </div>

      <ol className="space-y-1">
        {missions.map((mission, i) => {
          const isDone = solved.includes(mission.id);
          const isCurrent = current?.id === mission.id;
          return (
            <li
              key={mission.id}
              className="flex items-start gap-2.5 rounded-lg border px-3 py-2.5"
              style={{ borderColor: isCurrent ? "var(--color-accent)" : "transparent", backgroundColor: isCurrent ? "var(--color-surface)" : "transparent" }}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className="mt-0.5 flex-shrink-0 font-mono text-xs"
                style={{ color: isDone ? "var(--color-accent)" : "var(--color-text-muted)" }}
                aria-label={isDone ? "Captured" : "Not captured"}
              >
                {isDone ? "[x]" : "[ ]"}
              </span>
              <div className="min-w-0">
                <p
                  className="flex flex-wrap items-center gap-x-2 text-sm font-semibold"
                  style={{ color: isDone ? "var(--color-text-muted)" : "var(--color-text-primary)", textDecoration: isDone ? "line-through" : "none" }}
                >
                  <span className="font-mono text-[11px] font-normal" style={{ color: "var(--color-text-muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {mission.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  <span className="font-mono uppercase tracking-wide" style={{ color: "var(--color-accent)" }}>
                    {mission.level}
                  </span>{" "}
                  · {mission.brief}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <button
        onClick={onReset}
        className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-md text-xs transition-colors duration-200 hover:text-[var(--color-accent)]"
        style={{ color: "var(--color-text-muted)" }}
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset game
      </button>
    </div>
  );
}
