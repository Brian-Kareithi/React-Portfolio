import type { Metadata } from "next";
import HomelabClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "A homelab that runs 24/7: Proxmox, RAID-1 storage, a managed network and ESP32 automation, with zero data lost.";

export const metadata: Metadata = pageMeta({
  title: "Homelab: 24/7 Proxmox and Network Lab",
  heading: "Homelab",
  description,
  path: "/homelab",
});

export default function HomelabPage() {
  return <HomelabClient />;
}
