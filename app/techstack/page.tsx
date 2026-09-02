import type { Metadata } from "next";
import TechStackClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Brian Kareithi's technical stack — languages, frameworks, operating systems, databases, cloud platforms and DevOps tools, each mapped to its role and his proficiency.";

export const metadata: Metadata = pageMeta({
  title: "Tech Stack",
  description,
  path: "/techstack",
});

export default function TechStackPage() {
  return <TechStackClient />;
}