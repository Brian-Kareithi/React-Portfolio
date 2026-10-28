import type { HomelabStats } from "@/app/lib/homelab";

const SNAPSHOT_KEY = "homelab:last";
const SAVE_EVERY_MS = 2 * 60_000;

let lastGood: HomelabStats | null = null;
let lastSavedAt = 0;

async function fetchLive(): Promise<HomelabStats> {
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

function redis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), headers: { Authorization: `Bearer ${token}` } } : null;
}

async function saveSnapshot(stats: HomelabStats) {
  const db = redis();
  if (!db || Date.now() - lastSavedAt < SAVE_EVERY_MS) return;
  lastSavedAt = Date.now();
  try {
    await fetch(`${db.url}/set/${SNAPSHOT_KEY}`, {
      method: "POST",
      headers: db.headers,
      body: JSON.stringify(stats),
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
  } catch (err) {
    console.error("[homelab] saving snapshot failed", err);
  }
}

async function loadSnapshot(): Promise<HomelabStats | null> {
  const db = redis();
  if (!db) return null;
  try {
    const res = await fetch(`${db.url}/get/${SNAPSHOT_KEY}`, { headers: db.headers, cache: "no-store", signal: AbortSignal.timeout(4000) });
    const { result } = (await res.json()) as { result: string | null };
    return result ? (JSON.parse(result) as HomelabStats) : null;
  } catch (err) {
    console.error("[homelab] loading snapshot failed", err);
    return null;
  }
}

export async function getHomelabStats(): Promise<HomelabStats> {
  try {
    const stats = await fetchLive();
    lastGood = stats;
    await saveSnapshot(stats);
    return { ...stats, stale: false };
  } catch (err) {
    console.error("[homelab] live stats unavailable", err);
    const fallback = lastGood ?? (await loadSnapshot());
    if (!fallback) throw err;
    return { ...fallback, stale: true };
  }
}
