"use client";

import { CaseStudy } from "@/components/projects/CaseStudy";
import { useCaseStudySelection } from "@/components/projects/CaseStudySelection";
import { caseStudies } from "@/data/projects";

/** The full write-up for whichever case study the carousel has selected. */
export function SelectedCaseStudy() {
  const { activeIndex } = useCaseStudySelection();
  const study = caseStudies[activeIndex];

  return (
    <section id="case-detail" aria-label="Selected case study" className="p-cases">
      <div key={study.id} className="animate-fade-in-up">
        <CaseStudy study={study} />
      </div>
    </section>
  );
}
