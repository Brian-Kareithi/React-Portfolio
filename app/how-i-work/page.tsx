import type { Metadata } from "next";
import HowIWorkClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "How Brian Kareithi builds software: his principles, his stack by layer, and the six steps from idea to production.";

export const metadata: Metadata = pageMeta({
  title: "How I Work: From Idea to Production",
  heading: "How I Work",
  description,
  path: "/how-i-work",
});

export default function HowIWorkPage() {
  return <HowIWorkClient />;
}
