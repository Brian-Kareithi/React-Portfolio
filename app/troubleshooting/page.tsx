import type { Metadata } from "next";
import TroubleshootingClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "How Brian Kareithi fixes problems for good: a five-step, evidence-driven process for finding root causes across software, hardware and networks, with real field case studies.";

export const metadata: Metadata = pageMeta({
  title: "Diagnostics",
  description,
  path: "/troubleshooting",
});

export default function TroubleshootingPage() {
  return <TroubleshootingClient />;
}