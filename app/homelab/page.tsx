import type { Metadata } from "next";
import HomelabClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Proof of reliability: Brian Kareithi runs a 19-device, 24/7 Proxmox homelab with RAID-protected storage, nightly backups, a managed network and ESP32 automation, with zero data lost.";

export const metadata: Metadata = pageMeta({
  title: "Homelab",
  description,
  path: "/homelab",
});

export default function HomelabPage() {
  return <HomelabClient />;
}
