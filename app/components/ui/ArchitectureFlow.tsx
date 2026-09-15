interface ArchitectureFlowProps {
  /** Left-to-right pipeline stages, e.g. ["Frontend", "API", "Backend", "Database"]. */
  stages: string[];
  /** Optional branch drawn beneath one stage, e.g. { under: 2, label: "Services" }. */
  branch?: { under: number; label: string };
}

const BOX_WIDTH_REM = 7.5;
const ARROW_WIDTH_REM = 2;

/** A compact, monospace box-and-arrow diagram for a case study's architecture. */
export function ArchitectureFlow({ stages, branch }: ArchitectureFlowProps) {
  return (
    <div className="overflow-x-auto">
      <div className="inline-flex min-w-full flex-col items-start gap-0 font-mono text-[11px]" style={{ color: "var(--color-text-secondary)" }}>
        <div className="flex items-stretch">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center">
              <span
                className="flex items-center justify-center whitespace-nowrap border px-2 py-2 text-center font-medium"
                style={{ width: `${BOX_WIDTH_REM}rem`, borderColor: "var(--color-border-hover)", color: "var(--color-text-primary)" }}
              >
                {stage}
              </span>
              {i < stages.length - 1 && (
                <span
                  className="flex items-center justify-center"
                  style={{ width: `${ARROW_WIDTH_REM}rem`, color: "var(--color-text-muted)" }}
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              )}
            </div>
          ))}
        </div>
        {branch && (
          <div className="flex flex-col items-center pt-1" style={{ marginLeft: `${branch.under * (BOX_WIDTH_REM + ARROW_WIDTH_REM)}rem` }}>
            <span style={{ color: "var(--color-text-muted)" }} aria-hidden="true">
              &darr;
            </span>
            <span
              className="flex items-center justify-center whitespace-nowrap border px-2 py-2 text-center font-medium"
              style={{ width: `${BOX_WIDTH_REM}rem`, borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
            >
              {branch.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
