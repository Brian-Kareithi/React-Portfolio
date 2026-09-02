import type { Metadata } from "next";
import HobbiesClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Brian Kareithi's homelab — an 18-device, 24/7 Proxmox setup with RAID-protected storage, ESP32 automation, custom firmware, self-hosted media and a full lab network, all built and maintained by hand in Nairobi, Kenya.";

export const metadata: Metadata = pageMeta({
  title: "Homelab",
  description,
  path: "/hobbies",
});

export default function HobbiesPage() {
  return <HobbiesClient />;
}