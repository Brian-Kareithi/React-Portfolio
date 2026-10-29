"use client";

import { useEffect, useState } from "react";
import { LiveStatsSkeleton } from "@/components/homelab/LiveStatsSkeleton";
import { ServiceCard } from "@/components/homelab/ServiceCard";
import { MeterCard, ValueCard } from "@/components/homelab/StatCards";
import { formatBytes, formatUptime, HOMELAB_STATS_ENDPOINT, type HomelabStats } from "@/lib/homelab";

const REFRESH_MS = 30_000;

function formatSeen(iso: string) {
  const d = new Date(iso);
  return d.toDateString() === new Date().toDateString()
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

/** Polls the homelab every 30 seconds: host meters, uptime and every service grouped as on the Homepage dashboard. */
export function LiveStats({ initial }: { initial?: HomelabStats | null }) {
  const [data, setData] = useState<HomelabStats | null>(initial ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(HOMELAB_STATS_ENDPOINT, { cache: "no-store" });
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
    return error ? <p className="hs-empty q-mono">{error}</p> : <LiveStatsSkeleton />;
  }

  const { system, containers, groups } = data;
  const offline = Boolean(error || data.stale);

  return (
    <div className="hs">
      <div className="hs-head">
        <p className="l-live">
          <span className="live-dot" data-stale={offline ? "" : undefined} aria-hidden="true" />
          <span className="q-mono">{system.hostname}</span>
        </p>
        <p className="q-small q-mono">
          {offline ? `Server offline · last seen ${formatSeen(data.generatedAt)}` : `Updated ${formatSeen(data.generatedAt)}`}
        </p>
      </div>

      <div className="hs-meters">
        <MeterCard label="CPU" percent={system.cpu.percent} detail={`${system.cpu.cores} cores · load ${system.cpu.load[0]}`} />
        <MeterCard label="Memory" percent={system.memory.percent} detail={`${formatBytes(system.memory.used)} / ${formatBytes(system.memory.total)}`} />
        {system.disk && (
          <MeterCard label="Storage" percent={system.disk.percent} detail={`${formatBytes(system.disk.free)} free of ${formatBytes(system.disk.total)}`} />
        )}
        <ValueCard label="Uptime" value={formatUptime(system.uptimeSeconds)} detail={`${containers.running}/${containers.total} containers up`} />
      </div>

      {groups.map((group) => (
        <div key={group.name} className="hs-group">
          <h3 className="hs-group-title">{group.name}</h3>
          <div className="hs-services">
            {group.services.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
