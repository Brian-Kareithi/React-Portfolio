import { standards, auditScores } from "@/app/lib/standards";

export default function BuiltToStandard() {
  return (
    <section aria-labelledby="standards-title" className="q-section">
      <div className="q-section-head">
        <p className="q-eyebrow"><b>04</b> Standards</p>
        <h2 id="standards-title" data-split className="q-h2">
          Built to a standard, <em>not a deadline</em>
        </h2>
      </div>

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
    </section>
  );
}
