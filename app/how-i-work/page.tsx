import type { Metadata } from "next";
import HowIWorkClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "What to expect when Brian Kareithi joins your team: engineering principles, ownership of every layer from frontend to cloud, and a delivery workflow from idea to production across programming, security, networking and infrastructure.";

export const metadata: Metadata = pageMeta({
  title: "How I Work",
  description,
  path: "/how-i-work",
});

export default function HowIWorkPage() {
  return <HowIWorkClient />;
}
