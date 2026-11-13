import type { CSSProperties } from "react";

const stagger = (i: number) => ({ "--d": i }) as CSSProperties;

/** Placeholder with the same shape as the live stats, shown until the first response. */
export function LiveStatsSkeleton() {
  return (
    <div className="hs" role="status" aria-label="Loading homelab stats">
      <div className="hs-head">
        <span className="hs-sk" style={{ width: "7rem" }} />
        <span className="hs-sk" style={{ width: "5rem" }} />
      </div>
      <div className="hs-meters">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="hs-card hs-card-sk hs-gauge" style={stagger(i)}>
            <span className="hs-sk hs-ring" />
            <span className="hs-gauge-text">
              <span className="hs-sk" style={{ width: "40%" }} />
              <span className="hs-sk hs-sk-lg" style={{ width: "55%" }} />
              <span className="hs-sk" style={{ width: "75%" }} />
            </span>
          </div>
        ))}
      </div>
      <div className="sb sb-sk">
        <div className="sb-list">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className="hs-sk" style={{ ...stagger(i + 4), width: `${60 + ((i * 13) % 35)}%`, height: "0.9rem" }} />
          ))}
        </div>
        <div className="sb-detail">
          <span className="hs-sk hs-sk-lg" style={{ width: "45%" }} />
          <span className="hs-sk" style={{ width: "80%" }} />
          <span className="hs-sk" style={{ width: "65%" }} />
        </div>
      </div>
    </div>
  );
}
