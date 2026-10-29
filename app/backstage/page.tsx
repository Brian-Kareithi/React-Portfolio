import type { Metadata } from "next";
import { FlagChallenge } from "@/components/backstage/FlagChallenge";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Backstage",
  description: "Nothing to see here.",
  robots: { index: false, follow: false },
};

export default function BackstagePage() {
  return (
    <div className="q-page q-dark b-page" data-nav="dark">
      <div className="q-wrap b-wrap">
        <Eyebrow index="●">Backstage</Eyebrow>
        <h1 data-split className="q-title">
          You read <em>robots.txt</em>
        </h1>
        <FlagChallenge />
      </div>
    </div>
  );
}
