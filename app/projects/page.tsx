import type { Metadata } from "next";
import ProjectsClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "A selection of Brian Kareithi's delivered work — education platforms, mobile apps, self-hosted media clients, and cybersecurity tooling. Open-source repositories are available on GitHub.";

export const metadata: Metadata = pageMeta({
  title: "Selected Work",
  description,
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}