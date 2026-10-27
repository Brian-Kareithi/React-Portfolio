export type ContainerState = {
  state: string;
  health: "healthy" | "unhealthy" | "health: starting" | null;
  status?: string;
};

export type ServiceStats = Record<string, number>;

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

// The named machines on the lab network (dreezy0, the server, is the hub).
export const labMachines: Device[] = [
  { name: "Dreezy1", note: "HP 820 G3. Test bench for risky experiments.", status: "unknown" },
  { name: "Dreezy2", note: "HP 745 G7. Second dev machine for VMs and dev servers.", status: "unknown" },
  { name: "Dreezy3", note: "Dell OptiPlex. Lab node for extra services.", status: "unknown" },
  { name: "Dreezy4", note: "Galaxy A05s. Remote control for the lab over SSH.", status: "unknown" },
  { name: "Dreezy5", note: "HP Tower. Second tower, adding capacity to the lab.", status: "unknown" },
  { name: "Dreezy6", note: "ROG Zephyrus G14. Daily driver where every build starts.", status: "unknown" },
];

// Shown until (or if never) the live stats arrive.
export const homelabDevices: Device[] = [
  { name: "Jellyfin", note: "Media server for movies, series and music.", status: "unknown" },
  { name: "Sonarr", note: "Tracks and fetches series.", status: "unknown" },
  { name: "Radarr", note: "Tracks and fetches movies.", status: "unknown" },
  { name: "Lidarr", note: "Tracks and fetches music.", status: "unknown" },
  { name: "Prowlarr", note: "Indexer manager for the *arr stack.", status: "unknown" },
  { name: "qBittorrent", note: "Download client.", status: "unknown" },
  { name: "Seerr", note: "Request system for the media stack.", status: "unknown" },
  { name: "Ombi", note: "Media requests for friends and family.", status: "unknown" },
  { name: "Coolify", note: "Self-hosted app deployments.", status: "unknown" },
  { name: "Homepage", note: "The dashboard these stats come from.", status: "unknown" },
  { name: "Uptime Kuma", note: "Uptime monitoring and alerts.", status: "unknown" },
];

export function devicesFromStats(stats: HomelabStats | null | undefined): Device[] {
  const services = stats?.groups.flatMap((g) => g.services) ?? [];
  if (!services.length) return homelabDevices;
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

export async function fetchHomelabStats(): Promise<HomelabStats> {
  const url = process.env.HOMELAB_STATS_URL;
  const token = process.env.HOMELAB_STATS_TOKEN;
  if (!url || !token) throw new Error("HOMELAB_STATS_URL / HOMELAB_STATS_TOKEN not set");

  const res = await fetch(`${url.replace(/\/$/, "")}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 30 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`homelab stats responded ${res.status}`);
  return res.json();
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
