import { Accessibility, Gauge, Globe, ShieldCheck, BadgeCheck } from "lucide-react";
import { standards, auditScores, type StandardGroup } from "@/app/lib/standards";

const ICONS: Record<StandardGroup["id"], typeof Gauge> = {
  accessibility: Accessibility,
  performance: Gauge,
  security: ShieldCheck,
  reach: Globe,
};

/** The engineering standards this site is built to, grouped, with optional measured scores. */
export default function BuiltToStandard() {
  return (
    <div className="mb-20">
      <div className="mb-8">
        <p className="field-label mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
          Standards
        </p>
        <h2 className="display-xl text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
          Built to a standard, not a deadline
        </h2>
      </div>

      {auditScores.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-xl border px-5 py-4" style={{ borderColor: "var(--color-border)" }}>
          <p className="field-label flex items-center gap-2">
            <BadgeCheck className="h-3.5 w-3.5" style={{ color: "var(--color-accent)" }} />
            Lighthouse, deployed
          </p>
          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            {auditScores.map((s) => (
              <div key={s.label}>
                <dd className="display-xl text-3xl tabular-nums" style={{ color: "var(--color-accent)" }}>{s.score}</dd>
                <dt className="field-label">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {standards.map((group) => {
          const Icon = ICONS[group.id];
          return (
            <div key={group.id} className="flat-card flex flex-col p-6">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="font-serif-accent text-2xl" style={{ color: "var(--color-text-primary)" }}>{group.label}</h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{group.summary}</p>
              <ul className="mt-auto space-y-2 border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
