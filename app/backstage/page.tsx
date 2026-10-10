import type { Metadata } from "next";
import BackstageClient from "./Client";

export const metadata: Metadata = {
  title: "Backstage",
  description: "Nothing to see here.",
  robots: { index: false, follow: false },
};

export default function BackstagePage() {
  return <BackstageClient />;
}
