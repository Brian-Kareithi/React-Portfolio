import { Section } from "@/components/ui/Section";
import { auditScores, standards } from "@/data/standards";

/** The accessibility, performance, security and reach standards this site is built to. */
export function BuiltToStandard() {
  return (
    <Section id="standards" index="04" label="Standards" title={<>Built to a <em>clear standard</em></>}>
      {auditScores.length > 0 && (
        <dl className="s-scores">
          {auditScores.map((s) => (
            <div key={s.label}>
              <dd>{s.score}</dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <div className="s-grid">
        {standards.map((group) => (
          <div key={group.id} className="s-item">
            <h3 className="q-h3">{group.label}</h3>
            <p className="q-body">{group.summary}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
