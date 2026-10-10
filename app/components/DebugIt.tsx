"use client";
import { useState } from "react";
import { CheckCircle, CircleAlert, RotateCcw, XCircle } from "lucide-react";
import { puzzles, type Choice, type Verdict } from "@/app/lib/debug-puzzles";
import { Mascot } from "@/app/components/Mascot";

interface Attempt {
  nodeId: string;
  choice: Choice;
}

const VERDICT: Record<Verdict, { label: string; color: string }> = {
  good: { label: "Good call", color: "var(--palette-sand)" },
  detour: { label: "A detour", color: "#e8c27a" },
  wrong: { label: "Wrong turn", color: "#f0a0a0" },
};

// A case file you drive yourself. Pick the next diagnostic step from three; wasted moves are
// counted and explained, so a wrong turn teaches the same thing the write-up above does.
export default function DebugIt() {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [nodeId, setNodeId] = useState(puzzles[0].start);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [solved, setSolved] = useState(false);

  const puzzle = puzzles[puzzleIdx];
  const node = puzzle.nodes[nodeId];
  const wasted = attempts.filter((a) => a.choice.verdict !== "good").length;
  const last = attempts[attempts.length - 1];

  const load = (idx: number) => {
    setPuzzleIdx(idx);
    setNodeId(puzzles[idx].start);
    setAttempts([]);
    setSolved(false);
  };

  const pick = (choice: Choice) => {
    setAttempts((a) => [...a, { nodeId, choice }]);
    if (choice.verdict !== "good" || !choice.next) return;
    if (choice.next === "done") setSolved(true);
    else setNodeId(choice.next);
  };

  return (
    <div className="ink-slab overflow-hidden">
      <div className="flex flex-wrap gap-2 border-b px-5 py-3 sm:px-6" style={{ borderColor: "var(--color-border)" }} role="tablist" aria-label="Case files">
        {puzzles.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={i === puzzleIdx}
            onClick={() => load(i)}
            className="min-h-[36px] rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              borderColor: i === puzzleIdx ? "var(--color-accent)" : "var(--color-border)",
              backgroundColor: i === puzzleIdx ? "var(--color-accent)" : "transparent",
              color: i === puzzleIdx ? "var(--color-on-accent)" : "var(--color-text-secondary)",
            }}
          >
            {p.domain}
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>
          wasted steps: {wasted}
        </span>
      </div>

      <div className="space-y-5 px-5 py-6 sm:px-6">
        <div>
          <h3 className="font-serif-accent text-2xl" style={{ color: "var(--color-text-primary)" }}>{puzzle.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            <span className="field-label mr-2">Report</span>
            {puzzle.report}
          </p>
        </div>

        {!solved ? (
          <>
            <pre
              className="overflow-x-auto rounded-lg border p-4 font-mono text-[12px] leading-relaxed"
              style={{ borderColor: "var(--color-border)", backgroundColor: "rgba(0,0,0,0.25)", color: "var(--color-text-primary)" }}
              aria-label="Evidence"
            >
              {node.evidence.join("\n")}
            </pre>

            <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{node.question}</p>

            <div className="grid gap-2">
              {node.choices.map((c) => (
                <button
                  key={c.label}
                  onClick={() => pick(c)}
                  className="flat-card min-h-[44px] px-4 py-3 text-left text-sm transition-colors"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <span className="mr-2 font-mono" style={{ color: "var(--color-accent)" }} aria-hidden="true">&gt;</span>
                  {c.label}
                </button>
              ))}
            </div>

            {last && last.choice.verdict !== "good" && (
              <p
                role="status"
                className="animate-fade-in-up flex gap-2.5 rounded-lg border px-4 py-3 text-sm leading-relaxed"
                style={{ borderColor: VERDICT[last.choice.verdict].color, color: "var(--color-text-secondary)" }}
              >
                {last.choice.verdict === "wrong" ? (
                  <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: VERDICT.wrong.color }} aria-hidden="true" />
                ) : (
                  <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: VERDICT.detour.color }} aria-hidden="true" />
                )}
                <span>
                  <strong style={{ color: VERDICT[last.choice.verdict].color }}>{VERDICT[last.choice.verdict].label}.</strong>{" "}
                  {last.choice.result}
                </span>
              </p>
            )}
            {last && last.choice.verdict === "good" && (
              <p role="status" className="animate-fade-in-up flex gap-2.5 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: VERDICT.good.color }} aria-hidden="true" />
                <span>
                  <strong style={{ color: VERDICT.good.color }}>{VERDICT.good.label}.</strong> {last.choice.result}
                </span>
              </p>
            )}
          </>
        ) : (
          <div className="animate-fade-in-up space-y-4">
            <div className="flex items-start gap-4">
              <Mascot mood="happy" size={48} />
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                <strong style={{ color: "var(--color-text-primary)" }}>
                  {wasted === 0 ? "Clean run." : `Solved with ${wasted} wasted ${wasted === 1 ? "step" : "steps"}.`}
                </strong>{" "}
                {wasted === 0 ? "You followed the evidence the whole way." : "Every wrong turn above is one I have made at least once."}
              </p>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: "var(--color-surface-strong)" }}>
              <p className="field-label mb-1.5">Root cause</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>{puzzle.rootCause}</p>
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
              <p className="field-label mb-1.5">Fix</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{puzzle.fix}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => load(puzzleIdx)} className="btn-neon btn-neon-ghost">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Play again
              </button>
              {puzzles.length > 1 && (
                <button onClick={() => load((puzzleIdx + 1) % puzzles.length)} className="btn-neon btn-neon-primary">
                  Next case
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
