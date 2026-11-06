"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useCaseStudySelection } from "@/components/projects/CaseStudySelection";
import { caseStudies as studies } from "@/data/projects";
import { scrollToElement } from "@/lib/scroll";

/** Shown in place of a screenshot for work that can't be pictured publicly. */
function placeholderNote(note: string) {
  return note.startsWith("Public") ? "Source on GitHub" : note;
}

/** Every case study as a card. Choosing one opens its write-up below the grid. */
export function ProjectGrid() {
  const { activeIndex: active, select } = useCaseStudySelection();

  const open = (i: number) => {
    select(i);
    history.replaceState(null, "", `#${studies[i].id}`);
    const el = document.getElementById("case-detail");
    if (el) requestAnimationFrame(() => scrollToElement(el));
  };

  return (
    <ul className="pg" aria-label="Case studies">
      {studies.map((study, i) => (
        <li key={study.id} className="pg-item">
          <button type="button" className="pg-card" aria-pressed={i === active} onClick={() => open(i)}>
            <span className="pg-media">
              {study.screenshot ? (
                <Image src={study.screenshot.src} alt="" width={1440} height={900} sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw" className="pg-shot" />
              ) : (
                <span className="pg-blank" aria-hidden="true">
                  <span className="pg-blank-num">{study.index}</span>
                  <span className="pg-blank-note">{placeholderNote(study.access.note)}</span>
                </span>
              )}
            </span>
            <span className="pg-body">
              <span className="pg-meta">
                <span>{study.index}</span>
                <span className="pg-status" data-status={study.status}>{study.status}</span>
              </span>
              <strong className="pg-title">{study.title}</strong>
              <span className="pg-tagline">{study.tagline}</span>
              <span className="pg-foot">
                <span className="pg-stack">{study.stack.slice(0, 3).join(" · ")}</span>
                <span className="pg-open">
                  {i === active ? "Showing below" : "Read the case study"}
                  <ArrowDown aria-hidden="true" />
                </span>
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
