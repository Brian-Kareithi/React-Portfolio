interface SpecRow {
  k: string;
  v: string;
}

interface SpecSheetProps {
  title?: string;
  rows: SpecRow[];
  className?: string;
}

/** Field-manual dt/dd block: a labelled row of monospace data, reused across pages. */
export function SpecSheet({ title, rows, className = "" }: SpecSheetProps) {
  return (
    <dl className={`border ${className}`} style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}>
      {title && (
        <div className="flex items-center gap-2 border-b px-3.5 py-2.5" style={{ borderColor: "var(--color-border)" }}>
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
          <span className="field-label">{title}</span>
        </div>
      )}
      {rows.map((row, i) => (
        <div
          key={row.k}
          className="grid grid-cols-[7rem_1fr] gap-3 px-3.5 py-2.5 xs:grid-cols-[8.5rem_1fr]"
          style={{ borderTop: i === 0 && !title ? "none" : "1px solid var(--color-border)" }}
        >
          <dt className="field-label break-words pt-0.5" style={{ overflowWrap: "anywhere" }}>{row.k}</dt>
          <dd className="text-[11px] leading-relaxed xs:text-xs" style={{ color: "var(--color-text-secondary)", overflowWrap: "anywhere" }}>
            {row.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}
