const levelFor = (percent: number) => (percent > 85 ? "hot" : percent > 65 ? "warm" : "ok");

/** A labelled percentage with a coloured bar that warms up past 65% and 85%. */
export function MeterCard({ label, percent, detail }: { label: string; percent: number; detail: string }) {
  return (
    <div className="hs-card">
      <div className="hs-meter-top">
        <span className="hs-label">{label}</span>
        <span className="hs-value">{percent.toFixed(0)}%</span>
      </div>
      <div className="hs-bar" role="meter" aria-label={label} aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100}>
        <div data-level={levelFor(percent)} style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
      <p className="hs-detail">{detail}</p>
    </div>
  );
}

export function ValueCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="hs-card">
      <div className="hs-meter-top">
        <span className="hs-label">{label}</span>
        <span className="hs-value">{value}</span>
      </div>
      <p className="hs-detail">{detail}</p>
    </div>
  );
}
