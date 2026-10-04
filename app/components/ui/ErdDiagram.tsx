import { ArrowRight, KeyRound, Link2 } from "lucide-react";
import type { ErdEntity, ErdRelation } from "@/app/lib/project-docs";

const cardinalityLabel: Record<ErdRelation["cardinality"], string> = {
  "1:1": "one to one",
  "1:N": "one to many",
  "N:M": "many to many",
};

/** Entity-relationship diagram: one table per entity, then each relationship spelled out. */
export function ErdDiagram({ entities, relations }: { entities: ErdEntity[]; relations: ErdRelation[] }) {
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Entities">
        {entities.map((entity) => (
          <li
            key={entity.name}
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}
          >
            <div className="border-b px-3.5 py-2.5" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              <p className="font-mono text-[13px] font-semibold" style={{ color: "var(--color-text-primary)" }}>{entity.name}</p>
              {entity.note && <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>{entity.note}</p>}
            </div>
            <table className="w-full text-left">
              <caption className="sr-only">Fields of {entity.name}</caption>
              <tbody>
                {entity.fields.map((field) => (
                  <tr key={field.name} className="border-b last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
                    <td className="w-6 py-1.5 pl-3.5 align-middle">
                      {field.key === "pk" && <KeyRound className="h-3 w-3" style={{ color: "var(--color-accent)" }} aria-label="Primary key" />}
                      {field.key === "fk" && <Link2 className="h-3 w-3" style={{ color: "var(--color-text-muted)" }} aria-label="Foreign key" />}
                    </td>
                    <th scope="row" className="py-1.5 pr-3 font-mono text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>
                      {field.name}
                    </th>
                    <td className="py-1.5 pr-3.5 text-right font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                      {field.type}
                      {field.key === "uq" && " · unique"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </li>
        ))}
      </ul>

      <p className="field-label mb-3 mt-6">Relationships</p>
      <ul className="grid gap-x-8 gap-y-2 text-sm md:grid-cols-2" aria-label="Relationships">
        {relations.map((r) => (
          <li key={`${r.from}-${r.to}-${r.label}`} className="flex flex-wrap items-center gap-x-2 gap-y-1" style={{ color: "var(--color-text-secondary)" }}>
            <span className="font-mono text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>{r.from}</span>
            <ArrowRight className="h-3 w-3 flex-shrink-0" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            <span className="font-mono text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>{r.to}</span>
            <span className="rounded-md border px-1.5 py-px font-mono text-[10px]" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }} title={cardinalityLabel[r.cardinality]}>
              {r.cardinality}
            </span>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{r.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
