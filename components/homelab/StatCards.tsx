const levelFor = (percent: number) => (percent > 85 ? "hot" : percent > 65 ? "warm" : "ok");

const R = 26;
const C = 2 * Math.PI * R;

/** A labelled percentage drawn as a ring gauge that warms up past 65% and 85%. */
export function MeterCard({ label, percent, detail }: { label: string; percent: number; detail: string }) {
  const p = Math.min(Math.max(percent, 0), 100);
  return (
    <div className="hs-card hs-gauge">
      <svg className="hs-ring" viewBox="0 0 64 64" role="meter" aria-label={label} aria-valuenow={Math.round(p)} aria-valuemin={0} aria-valuemax={100}>
        <circle className="hs-ring-track" cx="32" cy="32" r={R} />
        <circle
          className="hs-ring-fill"
          data-level={levelFor(p)}
          cx="32"
          cy="32"
          r={R}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - p / 100)}
        />
      </svg>
      <div className="hs-gauge-text">
        <span className="hs-label">{label}</span>
        <span className="hs-value">{p.toFixed(0)}%</span>
        <p className="hs-detail">{detail}</p>
      </div>
    </div>
  );
}

export function ValueCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="hs-card hs-gauge">
      <span className="hs-ring hs-ring-live" aria-hidden="true">
        <span className="live-dot" />
      </span>
      <div className="hs-gauge-text">
        <span className="hs-label">{label}</span>
        <span className="hs-value">{value}</span>
        <p className="hs-detail">{detail}</p>
      </div>
    </div>
  );
}
