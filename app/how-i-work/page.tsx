import type { Metadata } from "next";
import HowIWorkClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "How Brian Kareithi builds software: engineering principles, the stack at each layer from frontend to cloud, a delivery workflow from idea to production, and hands-on capabilities across programming, security, networking and infrastructure.";

export const metadata: Metadata = pageMeta({
  title: "How I Work",
  description,
  path: "/how-i-work",
});

export default function HowIWorkPage() {
  return <HowIWorkClient />;
}
