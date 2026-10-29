import { Section } from "@/components/ui/Section";
import { diagnosticKit } from "@/data/troubleshooting";

export function DiagnosticKit() {
  return (
    <Section id="kit" index="04" label="Kit" title={<>What&apos;s in <em>the bag</em></>}>
      <ul className="d-kit">
        {diagnosticKit.map((tool) => (
          <li key={tool} className="q-chip">
            {tool}
          </li>
        ))}
      </ul>
    </Section>
  );
}
