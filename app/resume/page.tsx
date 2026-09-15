import type { Metadata } from "next";
import ResumeClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Brian Kareithi's resume, tailored to the role: Software Engineering, Mobile Development, or IT & Infrastructure. Real experience, projects and certifications, reordered by what matters for each role.";

export const metadata: Metadata = pageMeta({
  title: "Resume",
  description,
  path: "/resume",
});

export default function ResumePage() {
  return <ResumeClient />;
}
