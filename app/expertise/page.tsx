import type { Metadata } from "next";
import ExpertiseClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Six hands-on skill domains — programming, troubleshooting, hardware, security, networking, and cloud & DevOps. Deep, practical mastery across the whole stack, backed by six industry certifications.";

export const metadata: Metadata = pageMeta({
  title: "Expertise",
  description,
  path: "/expertise",
});

export default function ExpertisePage() {
  return <ExpertiseClient />;
}