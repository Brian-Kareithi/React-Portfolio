import type { Metadata } from "next";
import AboutClient from "./Client";
import { pageMeta } from "@/app/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "The professional journey of Brian Kareithi — BSc Information Technology, six security and cloud certifications, public-sector security work, freelance full-stack development, and a startup co-founded in Nairobi, Kenya.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutClient />;
}