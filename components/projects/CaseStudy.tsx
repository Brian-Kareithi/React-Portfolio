"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink, Github, Lock, TrendingUp } from "lucide-react";
import { CaseStudyDetails } from "@/components/projects/CaseStudyDetails";
import { CaseStudyPdfButton } from "@/components/projects/CaseStudyPdfButton";
import { caseStudies, type CaseStudy as CaseStudyData } from "@/data/projects";
import { projectDocs } from "@/data/project-docs";

const total = String(caseStudies.length).padStart(2, "0");

/** One case study: summary up front, with scope, architecture and data model behind a toggle. */
export function CaseStudy({ study }: { study: CaseStudyData }) {
  const [open, setOpen] = useState(false);
  const doc = projectDocs[study.id];
  const panelId = `${study.id}-details`;

  return (
    <article id={study.id} className="q-case scroll-mt-24">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <p className="field-label mb-2">
            Case study {study.index} / {total}
          </p>
          <h3 className="q-h2">{study.title}</h3>
          <p className="q-lede" style={{ marginTop: "0.75rem" }}>
            {study.tagline}
          </p>
        </div>
        <span className="q-chip">{study.status}</span>
      </header>

      {study.screenshot && (
        <a href={study.access.demo ?? study.screenshot.src} target="_blank" rel="noopener noreferrer" className="q-case-shot" style={{ borderColor: "var(--color-border)" }}>
          <Image src={study.screenshot.src} alt={study.screenshot.alt} width={1440} height={900} sizes="(max-width: 1100px) 100vw, 1100px" className="h-auto w-full" />
        </a>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <p className="field-label mb-2">Purpose</p>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
            {doc?.purpose ?? study.problem}
          </p>
          {study.outcome && (
            <p className="mt-5 flex items-start gap-2.5 border-l-2 pl-4 text-sm font-medium" style={{ borderColor: "var(--palette-berry)", color: "var(--color-text-primary)" }}>
              <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
              {study.outcome}
            </p>
          )}
        </div>
        <dl className="grid gap-4 text-sm">
          {doc && (
            <div>
              <dt className="field-label mb-1.5">Target audience</dt>
              <dd className="flex flex-wrap gap-1.5">
                {doc.audience.map((a) => (
                  <span key={a.who} className="q-chip" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {a.who}
                  </span>
                ))}
              </dd>
            </div>
          )}
          <div>
            <dt className="field-label mb-1.5">Stack</dt>
            <dd className="flex flex-wrap gap-1.5">
              {study.stack.map((tech) => (
                <span key={tech} className="q-chip">
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={panelId} className="q-btn">
          {open ? "Hide details" : "View scope, architecture & data model"}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <CaseStudyPdfButton study={study} />
        {study.access.demo && (
          <a href={study.access.demo} target="_blank" rel="noopener noreferrer" className="q-btn" data-solid>
            <ExternalLink className="h-4 w-4" />
            Live demo
          </a>
        )}
        {study.access.repo ? (
          <a href={study.access.repo} target="_blank" rel="noopener noreferrer" className="q-btn">
            <Github className="h-4 w-4" />
            Source
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
            <Lock className="h-3 w-3" aria-hidden="true" />
            {study.access.note}
          </span>
        )}
      </div>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <CaseStudyDetails study={study} doc={doc} />
        </div>
      </div>
    </article>
  );
}
