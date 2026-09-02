import type { Metadata } from "next";
import EngineeringClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "How Brian Kareithi builds software: four engineering principles, a six-layer full-stack architecture, a delivery workflow that ships in minutes, and the toolbox behind every project.";

export const metadata: Metadata = pageMeta({
  title: "Engineering",
  description,
  path: "/engineering",
});

export default function EngineeringPage() {
  return <EngineeringClient />;
}