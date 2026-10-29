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
          <div key={i} className="hs-card hs-card-sk" style={stagger(i)}>
            <span className="hs-sk" style={{ width: "40%" }} />
            <span className="hs-sk hs-sk-lg" style={{ width: "55%" }} />
            <span className="hs-sk" style={{ width: "75%" }} />
          </div>
        ))}
      </div>
      <div className="hs-services">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="hs-card hs-card-sk" style={stagger(i + 4)}>
            <div className="hs-service-head">
              <span className="hs-sk hs-sk-icon" />
              <span className="hs-service-text" style={{ flex: 1 }}>
                <span className="hs-sk" style={{ width: "60%" }} />
                <span className="hs-sk" style={{ width: "85%" }} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
