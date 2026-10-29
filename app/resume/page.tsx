import type { Metadata } from "next";
import { ResumeBuilder } from "@/components/resume/ResumeBuilder";
import { NextSection } from "@/components/ui/NextSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Resume, Tailored PDF by Role",
  heading: "Resume",
  description: "Download Brian Kareithi's resume as a PDF tailored to your role: full-stack, frontend, mobile, IT support or infrastructure.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div id="resume" className="q-page">
      <div className="q-wrap">
        <PageHeader
          index="07"
          label="Resume"
          title={<>One background, <em>told</em> for the role</>}
          description="Full-stack first. Pick the angle that fits, preview it here, and download it as a PDF."
        />

        <ResumeBuilder />

        <NextSection
          title="The full picture"
          links={[
            { href: "/projects", label: "Selected work", description: "Full case studies." },
            { href: "/about", label: "About", description: "Journey, education and certifications." },
            { href: "/contact", label: "Contact", description: "Questions about any of this." },
          ]}
        />
      </div>
    </div>
  );
}
