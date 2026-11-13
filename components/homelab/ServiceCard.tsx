import { guideFor } from "@/data/service-guides";
import { formatBytes, type Service } from "@/lib/homelab";

type StatField = [key: string, label: string, format?: (value: number) => string];

const speed = (v: number) => `${formatBytes(v)}/s`;

/** Which widget stats to show for each Homepage widget type, in order. */
const STAT_FIELDS: Record<string, StatField[]> = {
  jellyfin: [["movies", "Movies"], ["series", "Series"], ["episodes", "Episodes"], ["songs", "Songs"], ["streaming", "Streaming"]],
  sonarr: [["series", "Series"], ["wanted", "Wanted"], ["queued", "Queued"]],
  radarr: [["movies", "Movies"], ["wanted", "Wanted"], ["missing", "Missing"], ["queued", "Queued"]],
  lidarr: [["artists", "Artists"], ["wanted", "Wanted"], ["queued", "Queued"]],
  prowlarr: [["indexers", "Indexers"], ["grabs", "Grabs"], ["queries", "Queries"], ["failedGrabs", "Failed"]],
  seerr: [["pending", "Pending"], ["approved", "Approved"], ["available", "Available"]],
  qbittorrent: [["downloadSpeed", "Down", speed], ["uploadSpeed", "Up", speed], ["leeching", "Leech"], ["seeding", "Seed"]],
};

const ICON_CDN = "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png";

export function statusOf({ state, health }: Service): [status: string, title: string] {
  if (state === "unknown") return ["none", "Not containerized"];
  if (state !== "running") return ["down", state];
  if (health === "unhealthy") return ["down", "Unhealthy"];
  if (health === "healthy") return ["healthy", "Healthy"];
  return ["running", "Running"];
}

export function StatusDot({ service }: { service: Service }) {
  const [status, title] = statusOf(service);
  return <span title={title} aria-label={title} role="img" className="hs-dot" data-status={status} />;
}

export function ServiceIcon({ service }: { service: Service }) {
  const icon = service.icon && !service.icon.startsWith("mdi-") ? `${ICON_CDN}/${service.icon.replace(/\.png$/, "")}.png` : null;
  return icon ? (
    // eslint-disable-next-line @next/next/no-img-element -- remote icon CDN, not worth routing through next/image
    <img src={icon} alt="" className="hs-icon" loading="lazy" />
  ) : (
    <span className="hs-icon" data-blank="" />
  );
}

/** One service in full: icon, health, description and its widget stats when it has any. */
export function ServiceDetail({ service }: { service: Service }) {
  const fields = service.widgetType ? STAT_FIELDS[service.widgetType] : undefined;
  const stats = service.stats;
  const [, title] = statusOf(service);
  const guide = guideFor(service.name);

  return (
    <div className="sb-detail-body">
      <div className="hs-service-head">
        <ServiceIcon service={service} />
        <div className="hs-service-text">
          <h4 className="sb-detail-title">{service.name}</h4>
          <p className="sb-detail-state">
            <StatusDot service={service} /> {title}
          </p>
        </div>
      </div>

      {service.description && <p className="q-body">{service.description}</p>}

      {fields && stats ? (
        <dl className="hs-widget">
          {fields.map(([key, label, format]) => (
            <div key={key}>
              <dt>{label}</dt>
              <dd>{stats[key] == null ? "–" : format ? format(stats[key]) : stats[key].toLocaleString()}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="q-small">No widget stats for this service.</p>
      )}
      {service.error && <p className="hs-detail hs-warn">Stats unavailable</p>}

      {guide && (
        <div className="sb-guide">
          <div>
            <h5 className="sb-guide-label">What it is</h5>
            <p>{guide.what}</p>
          </div>
          <div>
            <h5 className="sb-guide-label">In my lab</h5>
            <p>{guide.role}</p>
          </div>
          <ul className="sb-guide-tags" aria-label="Category">
            {guide.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
