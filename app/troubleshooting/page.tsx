import type { Metadata } from "next";
import TroubleshootingClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "A five-step, evidence-driven method for finding root causes across software, hardware and networks, with seven real case studies.";

export const metadata: Metadata = pageMeta({
  title: "Diagnostics: Finding the Root Cause",
  heading: "Diagnostics",
  description,
  path: "/troubleshooting",
});

export default function TroubleshootingPage() {
  return <TroubleshootingClient />;
}