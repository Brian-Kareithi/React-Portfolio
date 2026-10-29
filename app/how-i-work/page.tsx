import type { Metadata } from "next";
import { BuiltToStandard } from "@/components/how-i-work/BuiltToStandard";
import { Capabilities } from "@/components/how-i-work/Capabilities";
import { DeliverySteps } from "@/components/how-i-work/DeliverySteps";
import { Principles } from "@/components/how-i-work/Principles";
import { StackLayers } from "@/components/how-i-work/StackLayers";
import { Toolbox } from "@/components/how-i-work/Toolbox";
import { ValuePoints } from "@/components/how-i-work/ValuePoints";
import { NextSection } from "@/components/ui/NextSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "How I Work: From Idea to Production",
  heading: "How I Work",
  description: "How Brian Kareithi builds software: his principles, his stack by layer, and the six steps from idea to production.",
  path: "/how-i-work",
});

export default function HowIWorkPage() {
  return (
    <div id="how-i-work">
      <div className="q-page">
        <div className="q-wrap">
          <PageHeader
            index="02"
            label="How I work"
            title={<>How I <em>deliver</em></>}
            description="What I bring to a project, the principles behind it, my stack by layer, and the path from an idea to production."
          />
          <ValuePoints />
          <Principles />
          <StackLayers />
        </div>

        <DeliverySteps />

        <div className="q-wrap">
          <BuiltToStandard />
          <Capabilities />
          <Toolbox />

          <NextSection
            title="See it in practice"
            links={[
              { href: "/projects", label: "Selected work", description: "Case studies and live demos." },
              { href: "/troubleshooting", label: "Diagnostics", description: "How I find root causes." },
              { href: "/homelab", label: "Homelab", description: "The infrastructure I run 24/7." },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
