import type { Metadata } from "next";
import ResumeClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Brian Kareithi's resume, a full-stack developer first, with versions leading on Frontend, Mobile, IT Support or Infrastructure & Security strengths. Download the PDF that fits your opening.";

export const metadata: Metadata = pageMeta({
  title: "Resume",
  description,
  path: "/resume",
});

export default function ResumePage() {
  return <ResumeClient />;
}
