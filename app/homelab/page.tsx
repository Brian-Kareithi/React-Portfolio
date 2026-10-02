import type { Metadata } from "next";
import HomelabClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Brian Kareithi's homelab: a 19-device, 24/7 Proxmox setup with RAID-protected storage, nightly backups, a managed lab network and ESP32 automation, built and maintained by hand in Nairobi, Kenya.";

export const metadata: Metadata = pageMeta({
  title: "Homelab",
  description,
  path: "/homelab",
});

export default function HomelabPage() {
  return <HomelabClient />;
}
