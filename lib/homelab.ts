import { homelabServices } from "@/data/homelab";

/** Shape returned by the stats API on dreezy0, proxied through /api/homelab. */
type ContainerState = {
  state: string;
  health: "healthy" | "unhealthy" | "health: starting" | null;
  status?: string;
};

type ServiceStats = Record<string, number>;

export type Service = ContainerState & {
  name: string;
  description: string | null;
  icon: string | null;
  widgetType: string | null;
  stats: ServiceStats | null;
  error?: string;
};

export type HomelabStats = {
  generatedAt: string;
  stale?: boolean;
  system: {
    hostname: string;
    uptimeSeconds: number;
    cpu: { percent: number; cores: number; load: [number, number, number] };
    memory: { total: number; used: number; percent: number };
    disk: { total: number; used: number; free: number; percent: number } | null;
  };
  containers: {
    total: number;
    running: number;
    healthy: number;
    unhealthy: number;
    list: (ContainerState & { name: string; image: string })[];
  };
  groups: { name: string; services: Service[] }[];
};

export type DeviceStatus = "healthy" | "running" | "down" | "unknown";

export interface Device {
  name: string;
  note: string;
  status: DeviceStatus;
}

export const HOMELAB_STATS_ENDPOINT = "/api/homelab";

/** Client-side read of the homelab stats route. Resolves to null when the lab is unreachable. */
export async function fetchHomelabStats(init?: RequestInit): Promise<HomelabStats | null> {
  const res = await fetch(HOMELAB_STATS_ENDPOINT, init);
  return res.ok ? res.json() : null;
}

export function devicesFromStats(stats: HomelabStats | null | undefined): Device[] {
  const services = stats?.groups.flatMap((g) => g.services) ?? [];
  if (!services.length) return homelabServices;
  return services.map((s) => ({
    name: s.name,
    note: s.description ?? "",
    status:
      s.state === "unknown" ? "unknown"
      : s.state !== "running" || s.health === "unhealthy" ? "down"
      : s.health === "healthy" ? "healthy"
      : "running",
  }));
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(decimals)} ${units[i]}`;
}

export function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return d ? `${d}d ${h}h` : h ? `${h}h ${m}m` : `${m}m`;
}
