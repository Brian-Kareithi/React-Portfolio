"use client";

import { useState } from "react";
import { Github, Lock, Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { otherProjects, type OtherProject } from "@/data/projects";

function ArchiveDetail({ project, id }: { project: OtherProject; id: string }) {
  return (
    <div id={id} className="p-archive-detail animate-fade-in-up">
      <p className="q-small p-archive-mobile">{project.type}</p>
      <ul>
        {project.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <div className="p-archive-meta">
        <span className="q-mono q-small">{project.stack.join(" · ")}</span>
        {project.repo ? (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="q-link" data-lead>
            <Github aria-hidden="true" /> Source
          </a>
        ) : (
          <span className="q-small" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Private repository
          </span>
        )}
      </div>
    </div>
  );
}

/** Smaller builds as an accordion, one open at a time. */
export function ProjectArchive() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="archive" index="04" label="Archive" title={<>Smaller <em>builds</em></>}>
      <ul className="p-archive">
        {otherProjects.map((project, i) => {
          const isOpen = openIndex === i;
          const detailId = `project-details-${i}`;
          return (
            <li key={project.title}>
              <button className="p-archive-row" onClick={() => setOpenIndex(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={detailId}>
                <span className="p-archive-title">{project.title}</span>
                <span className="p-archive-desc">{project.description}</span>
                <span className="q-chip" style={{ textTransform: "capitalize" }}>
                  {project.status}
                </span>
                <Plus className="p-archive-plus" data-open={isOpen || undefined} aria-hidden="true" />
              </button>
              {isOpen && <ArchiveDetail project={project} id={detailId} />}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
