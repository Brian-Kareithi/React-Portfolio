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

function statusOf({ state, health }: Service): [status: string, title: string] {
  if (state === "unknown") return ["none", "Not containerized"];
  if (state !== "running") return ["down", state];
  if (health === "unhealthy") return ["down", "Unhealthy"];
  if (health === "healthy") return ["healthy", "Healthy"];
  return ["running", "Running"];
}

function StatusDot({ service }: { service: Service }) {
  const [status, title] = statusOf(service);
  return <span title={title} aria-label={title} role="img" className="hs-dot" data-status={status} />;
}

/** One self-hosted service: icon, health, description and its widget stats when it has any. */
export function ServiceCard({ service }: { service: Service }) {
  const fields = service.widgetType ? STAT_FIELDS[service.widgetType] : undefined;
  const stats = service.stats;
  const icon = service.icon && !service.icon.startsWith("mdi-") ? `${ICON_CDN}/${service.icon.replace(/\.png$/, "")}.png` : null;

  return (
    <article className="hs-card hs-service">
      <div className="hs-service-head">
        {icon ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote icon CDN, not worth routing through next/image
          <img src={icon} alt="" className="hs-icon" loading="lazy" />
        ) : (
          <div className="hs-icon" data-blank="" />
        )}
        <div className="hs-service-text">
          <p className="hs-service-name">
            <span>{service.name}</span>
            <StatusDot service={service} />
          </p>
          {service.description && <p className="hs-detail">{service.description}</p>}
        </div>
      </div>

      {fields && stats && (
        <dl className="hs-widget">
          {fields.map(([key, label, format]) => (
            <div key={key}>
              <dt>{label}</dt>
              <dd>{stats[key] == null ? "–" : format ? format(stats[key]) : stats[key].toLocaleString()}</dd>
            </div>
          ))}
        </dl>
      )}
      {service.error && <p className="hs-detail hs-warn">Stats unavailable</p>}
    </article>
  );
}
