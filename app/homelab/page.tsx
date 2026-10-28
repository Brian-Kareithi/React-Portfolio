import type { Metadata } from "next";
import HomelabClient from "./Client";
import { pageMeta } from "@/app/lib/site";
import { getHomelabStats } from "@/app/lib/homelab-server";

const description =
  "A homelab that runs 24/7: Proxmox, RAID-1 storage, a managed network and ESP32 automation, with no data lost so far.";

export const metadata: Metadata = pageMeta({
  title: "Homelab: 24/7 Proxmox and Network Lab",
  heading: "Homelab",
  description,
  path: "/homelab",
});

export const revalidate = 30;

export default async function HomelabPage() {
  const initial = await getHomelabStats().catch(() => null);
  return <HomelabClient initialStats={initial} />;
}
