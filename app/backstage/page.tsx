import type { Metadata } from "next";
import { FlagChallenge } from "@/components/backstage/FlagChallenge";
import { NextSection } from "@/components/ui/NextSection";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Backstage",
  description: "Nothing to see here.",
  robots: { index: false, follow: false },
};

export default function BackstagePage() {
  return (
    <div id="backstage" className="q-page">
      <div className="q-wrap">
        <PageHeader
          index="00"
          label="Backstage"
          title={<>You read <em>robots.txt</em></>}
          description="Most people never open that file. Here is what I left for the ones who do. It is not encrypted, just wrapped."
        />

        <FlagChallenge />

        <NextSection
          title="Found your way here?"
          links={[
            { href: "/games", label: "Minigames", description: "A sandboxed CTF and a guessing game." },
            { href: "/troubleshooting", label: "Diagnostics", description: "How I find the real fault." },
            { href: "/homelab", label: "Homelab", description: "The lab that never sleeps." },
          ]}
        />
      </div>
    </div>
  );
}
