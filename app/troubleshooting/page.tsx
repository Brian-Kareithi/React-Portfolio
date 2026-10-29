import type { Metadata } from "next";
import { DebugGame } from "@/components/troubleshooting/DebugGame";
import { DiagnosticKit } from "@/components/troubleshooting/DiagnosticKit";
import { FieldNotes } from "@/components/troubleshooting/FieldNotes";
import { MethodSteps } from "@/components/troubleshooting/MethodSteps";
import { NextSection } from "@/components/ui/NextSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Diagnostics: Finding the Root Cause",
  heading: "Diagnostics",
  description: "A five-step, evidence-driven method for finding root causes across software, hardware and networks, with seven real case studies.",
  path: "/troubleshooting",
});

export default function TroubleshootingPage() {
  return (
    <div id="troubleshooting" className="q-page">
      <div className="q-wrap">
        <PageHeader
          index="06"
          label="Diagnostics"
          title={<>Finding the <em>real fault</em></>}
          description="I follow the evidence to the root cause across software, hardware and networks, then write it down so it stays fixed."
        />

        <MethodSteps />
        <FieldNotes />

        <Section id="debug" index="03" label="Your turn" title={<>Debug it <em>yourself</em></>}>
          <div className="d-frame">
            <DebugGame />
          </div>
        </Section>

        <DiagnosticKit />

        <NextSection
          title="The method in use"
          links={[
            { href: "/homelab", label: "Homelab", description: "A live lab where the method is tested." },
            { href: "/how-i-work", label: "How I work", description: "How I build and ship." },
            { href: "/projects", label: "Selected work", description: "Shipped systems, method applied." },
          ]}
        />
      </div>
    </div>
  );
}
