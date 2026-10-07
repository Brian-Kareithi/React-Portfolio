import type { Metadata } from "next";
import ResumeClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Download Brian Kareithi's resume as a PDF tailored to your role: full-stack, frontend, mobile, IT support or infrastructure.";

export const metadata: Metadata = pageMeta({
  title: "Resume, Tailored PDF by Role",
  heading: "Resume",
  description,
  path: "/resume",
});

export default function ResumePage() {
  return <ResumeClient />;
}
