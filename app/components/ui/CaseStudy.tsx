"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink, Github, Lock, FileDown, Loader2, TrendingUp, Check, Minus } from "lucide-react";
import { ArchitectureFlow } from "@/app/components/ui/ArchitectureFlow";
import { ErdDiagram } from "@/app/components/ui/ErdDiagram";
import { caseStudies, type CaseStudy as CaseStudyType } from "@/app/lib/projects-data";
import { projectDocs } from "@/app/lib/project-docs";
import { siteConfig } from "@/app/lib/site";

/** One case study: a scannable summary that expands into scope, audience, architecture and data model. */
export function CaseStudy({ study }: { study: CaseStudyType }) {
  const [open, setOpen] = useState(false);
  const [building, setBuilding] = useState(false);
  const doc = projectDocs[study.id];
  const panelId = `${study.id}-details`;

  // The PDF engine is large, so it is only loaded when someone actually downloads.
  const downloadPdf = async () => {
    if (building) return;
    setBuilding(true);
    try {
      const [{ pdf }, { CaseStudyPdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/app/projects/CaseStudyPdf"),
      ]);
      const blob = await pdf(<CaseStudyPdf study={study} doc={doc} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${study.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}-case-study.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      // Silently ignore; the expandable write-up above is always available.
    } finally {
      setBuilding(false);
    }
  };


  return (
    <article id={study.id} className="plate scroll-mt-24 p-5 sm:p-8 lg:p-10">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <p className="field-label mb-2">
            Case study {study.index} / {String(caseStudies.length).padStart(2, "0")}
          </p>
          <h3 className="display-xl text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
            {study.title}
          </h3>
          <p className="mt-2 max-w-2xl text-base" style={{ color: "var(--color-text-secondary)" }}>
            {study.tagline}
          </p>
        </div>
        <span className="pill !text-xs">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
          {study.status}
        </span>
      </header>

      {study.screenshot && (
        <a
          href={study.access.demo ?? study.screenshot.src}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 block overflow-hidden rounded-xl border"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Image
            src={study.screenshot.src}
            alt={study.screenshot.alt}
            width={1440}
            height={900}
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="h-auto w-full"
          />
        </a>
      )}

      {/* Summary: always visible */}
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <p className="field-label mb-2">Purpose</p>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
            {doc?.purpose ?? study.problem}
          </p>
          {study.outcome && (
            <p className="mt-4 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--color-accent)", color: "var(--color-text-primary)" }}>
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
                  <span key={a.who} className="rounded-md border px-2 py-0.5 text-xs" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
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
                <span key={tech} className="rounded-md border px-2 py-0.5 font-mono text-[11px]" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="btn-neon btn-neon-ghost"
        >
          {open ? "Hide details" : "View scope, architecture & data model"}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={downloadPdf}
          disabled={building}
          aria-busy={building}
          className="btn-neon btn-neon-ghost disabled:cursor-wait disabled:opacity-70"
        >
          {building ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <FileDown className="h-4 w-4" aria-hidden="true" />}
          {building ? "Building PDF…" : "Case study PDF"}
        </button>
        {study.access.demo && (
          <a href={study.access.demo} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-primary">
            <ExternalLink className="h-4 w-4" />
            Live demo
          </a>
        )}
        {study.access.repo && (
          <a href={study.access.repo} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-ghost">
            <Github className="h-4 w-4" />
            Source
          </a>
        )}
        {!study.access.repo && (
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
            <Lock className="h-3 w-3" aria-hidden="true" />
            {study.access.note}
          </span>
        )}
      </div>

      {/* Details: animated expand, collapsed content is inert so it leaves the tab order */}
      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-8 space-y-10 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
            {doc && (
              <Section title="Scope">
                <div className="grid gap-6 md:grid-cols-2">
                  <ScopeList heading="In scope" items={doc.scope.in} included />
                  <ScopeList heading="Out of scope" items={doc.scope.out} />
                </div>
              </Section>
            )}

            {doc && (
              <Section title="Audience & needs">
                <dl className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                  {doc.audience.map((a) => (
                    <div key={a.who}>
                      <dt className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{a.who}</dt>
                      <dd className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{a.needs}</dd>
                    </div>
                  ))}
                </dl>
              </Section>
            )}

            <Section title="Problem & approach">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <div>
                  <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{study.problem}</p>
                  <p className="mt-4 rounded-xl px-4 py-3 text-sm leading-relaxed" style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-text-primary)" }}>
                    <span className="font-semibold">My contribution: </span>
                    {study.contribution}
                  </p>
                </div>
                <ol className="space-y-3">
                  {study.solution.map((s, i) => (
                    <li key={s} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      <span className="mt-px w-5 flex-shrink-0 font-mono text-xs" style={{ color: "var(--color-accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </Section>

            <Section title="Architecture">
              <ArchitectureFlow stages={study.architecture.stages} branch={study.architecture.branch} />
            </Section>

            {doc && (
              <Section title="Data model (ERD)">
                {doc.erd ? (
                  <ErdDiagram entities={doc.erd.entities} relations={doc.erd.relations} />
                ) : (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{doc.dataNote}</p>
                )}
              </Section>
            )}

            {doc && (
              <Section title="Design priorities">
                <ul className="flex flex-wrap gap-2">
                  {doc.qualities.map((q) => (
                    <li key={q} className="rounded-md border px-2.5 py-1 text-xs" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>{q}</li>
                  ))}
                </ul>
              </Section>
            )}

            {study.exhibit && (
              <Section title={`Exhibit · ${study.exhibit.label}`}>
                <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
                  <iframe
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(`${siteConfig.url}${study.exhibit.fileUrl}`)}`}
                    className="h-[260px] w-full sm:h-[360px] landscape:h-[180px]"
                    style={{ backgroundColor: "var(--color-bg-secondary)" }}
                    loading="lazy"
                    title={`${study.title} exhibit: ${study.exhibit.label}`}
                  />
                </div>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                  <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                  Preview not loading?
                  <a href={study.exhibit.fileUrl} download={study.exhibit.fileName} className="link-underline font-medium" style={{ color: "var(--color-accent)" }}>
                    Download the deck
                  </a>
                </p>
              </Section>
            )}

            {doc && (
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Full write-up: <span className="font-mono">docs/projects/{study.id}.md</span> in the{" "}
                <a href="https://github.com/Brian-Kareithi/React-Portfolio/tree/main/docs" target="_blank" rel="noopener noreferrer" className="link-underline" style={{ color: "var(--color-accent)" }}>
                  portfolio repository
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="field-label mb-4">{title}</h4>
      {children}
    </section>
  );
}

function ScopeList({ heading, items, included = false }: { heading: string; items: string[]; included?: boolean }) {
  const Icon = included ? Check : Minus;
  return (
    <div>
      <p className="mb-3 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{heading}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            <Icon className="mt-1 h-3.5 w-3.5 flex-shrink-0" style={{ color: included ? "var(--color-accent)" : "var(--color-text-muted)" }} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
