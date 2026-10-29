import { Section } from "@/components/ui/Section";
import { principles } from "@/data/skills";

export function Principles() {
  return (
    <Section id="principles" index="02" label="Principles" title={<>What I <em>optimise for</em></>}>
      <ol className="w-principles">
        {principles.map((principle, i) => (
          <li key={principle.title}>
            <span className="w-principle-num">{i + 1}</span>
            <div>
              <h3 className="q-h3">{principle.title}</h3>
              <p className="q-body" style={{ marginTop: "0.5rem" }}>
                {principle.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
