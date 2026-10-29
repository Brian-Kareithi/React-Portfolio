import { labStats } from "@/data/homelab";

export function LabStatus() {
  return (
    <section aria-label="Lab status" className="l-status">
      <p className="l-live">
        <span className="live-dot" aria-hidden="true" /> All systems normal
      </p>
      <dl className="l-stats">
        {labStats.map((stat) => (
          <div key={stat.label} className="l-stat">
            <dd>{stat.value}</dd>
            <dt>{stat.label}</dt>
            <p>{stat.note}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
