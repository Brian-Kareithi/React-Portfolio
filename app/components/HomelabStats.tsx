"use client";

import { useEffect, useState } from "react";
import type { HomelabStats as Stats, Service } from "@/app/lib/homelab";
import { formatBytes, formatUptime } from "@/app/lib/homelab";

const REFRESH_MS = 30_000;

// Labels for each widget's stat keys, in display order (matches Homepage).
const STAT_LABELS: Record<string, [string, string, ((v: number) => string)?][]> = {
  jellyfin: [["movies", "Movies"], ["series", "Series"], ["episodes", "Episodes"], ["songs", "Songs"], ["streaming", "Streaming"]],
  sonarr: [["series", "Series"], ["wanted", "Wanted"], ["queued", "Queued"]],
  radarr: [["movies", "Movies"], ["wanted", "Wanted"], ["missing", "Missing"], ["queued", "Queued"]],
  lidarr: [["artists", "Artists"], ["wanted", "Wanted"], ["queued", "Queued"]],
  prowlarr: [["indexers", "Indexers"], ["grabs", "Grabs"], ["queries", "Queries"], ["failedGrabs", "Failed"]],
  seerr: [["pending", "Pending"], ["approved", "Approved"], ["available", "Available"]],
  qbittorrent: [
    ["downloadSpeed", "Down", (v) => `${formatBytes(v)}/s`],
    ["uploadSpeed", "Up", (v) => `${formatBytes(v)}/s`],
    ["leeching", "Leech"],
    ["seeding", "Seed"],
  ],
};

export default function HomelabStats({ initial }: { initial?: Stats | null }) {
  const [data, setData] = useState<Stats | null>(initial ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/homelab", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(json.error);
        setData(json);
        setError(null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      }
    };
    if (!initial) load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [initial]);

  if (!data) {
    return <p className="hs-empty q-mono">{error ?? "Connecting to homelab…"}</p>;
  }

  const { system, containers, groups } = data;
  // Either this browser lost the API, or the API itself is serving dreezy0's last snapshot.
  const offline = Boolean(error || data.stale);

  return (
    <div className="hs">
      <div className="hs-head">
        <p className="l-live">
          <span className="live-dot" data-stale={offline ? "" : undefined} aria-hidden="true" />
          <span className="q-mono">{system.hostname}</span>
        </p>
        <p className="q-small q-mono">
          {offline ? `Server offline · last seen ${seen(data.generatedAt)}` : `Updated ${seen(data.generatedAt)}`}
        </p>
      </div>

      <div className="hs-meters">
        <Meter label="CPU" percent={system.cpu.percent} detail={`${system.cpu.cores} cores · load ${system.cpu.load[0]}`} />
        <Meter
          label="Memory"
          percent={system.memory.percent}
          detail={`${formatBytes(system.memory.used)} / ${formatBytes(system.memory.total)}`}
        />
        {system.disk && (
          <Meter
            label="Storage"
            percent={system.disk.percent}
            detail={`${formatBytes(system.disk.free)} free of ${formatBytes(system.disk.total)}`}
          />
        )}
        <Tile label="Uptime" value={formatUptime(system.uptimeSeconds)} detail={`${containers.running}/${containers.total} containers up`} />
      </div>

      {groups.map((group) => (
        <div key={group.name} className="hs-group">
          <h3 className="hs-group-title">{group.name}</h3>
          <div className="hs-services">
            {group.services.map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Time alone for today; date and time once the snapshot is from an earlier day.
function seen(iso: string) {
  const d = new Date(iso);
  return d.toDateString() === new Date().toDateString()
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function Meter({ label, percent, detail }: { label: string; percent: number; detail: string }) {
  const level = percent > 85 ? "hot" : percent > 65 ? "warm" : "ok";
  return (
    <div className="hs-card">
      <div className="hs-meter-top">
        <span className="hs-label">{label}</span>
        <span className="hs-value">{percent.toFixed(0)}%</span>
      </div>
      <div className="hs-bar" role="meter" aria-label={label} aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100}>
        <div data-level={level} style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
      <p className="hs-detail">{detail}</p>
    </div>
  );
}

function Tile({ label, value, detail }: { label: string; value: string; detail: string }) {
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

function StatusDot({ service }: { service: Service }) {
  const { state, health } = service;
  const [status, title] =
    state !== "running"
      ? state === "unknown"
        ? ["none", "Not containerized"]
        : ["down", state]
      : health === "unhealthy"
        ? ["down", "Unhealthy"]
        : health === "healthy"
          ? ["healthy", "Healthy"]
          : ["running", "Running"];
  return <span title={title} aria-label={title} role="img" className="hs-dot" data-status={status} />;
}

function ServiceCard({ service }: { service: Service }) {
  const labels = service.widgetType ? STAT_LABELS[service.widgetType] : undefined;
  const icon = service.icon && !service.icon.startsWith("mdi-")
    ? `https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/${service.icon.replace(/\.png$/, "")}.png`
    : null;

  return (
    <article className="hs-card hs-service">
      <div className="hs-service-head">
        {icon ? (
          // eslint-disable-next-line @next/next/no-img-element
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

      {labels && service.stats && (
        <dl className="hs-widget">
          {labels.map(([key, label, fmt]) => (
            <div key={key}>
              <dt>{label}</dt>
              <dd>
                {service.stats![key] == null ? "–" : fmt ? fmt(service.stats![key]) : service.stats![key].toLocaleString()}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {service.error && <p className="hs-detail hs-warn">Stats unavailable</p>}
    </article>
  );
}
