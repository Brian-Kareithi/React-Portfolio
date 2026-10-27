import type { Metadata } from "next";
import HomelabClient from "./Client";
import { pageMeta } from "@/app/lib/site";
import { fetchHomelabStats } from "@/app/lib/homelab";

const description =
  "A homelab that runs 24/7: Proxmox, RAID-1 storage, a managed network and ESP32 automation, with zero data lost.";

export const metadata: Metadata = pageMeta({
  title: "Homelab: 24/7 Proxmox and Network Lab",
  heading: "Homelab",
  description,
  path: "/homelab",
});

export const revalidate = 30;

export default async function HomelabPage() {
  // Server-render the first snapshot so the live section isn't empty on load;
  // HomelabStats then polls /api/homelab to keep it live.
  const initial = await fetchHomelabStats().catch(() => null);
  return <HomelabClient initialStats={initial} />;
}
