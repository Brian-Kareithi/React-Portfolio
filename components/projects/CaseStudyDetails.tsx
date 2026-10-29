import type { ReactNode } from "react";
import { Check, FileDown, Minus } from "lucide-react";
import { ArchitectureFlow } from "@/components/projects/ArchitectureFlow";
import { ErdDiagram } from "@/components/projects/ErdDiagram";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { CaseStudy } from "@/data/projects";
import type { ProjectDoc } from "@/data/project-docs";
import { siteConfig } from "@/lib/site";

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <Eyebrow as="h4" style={{ marginBottom: "1.25rem" }}>
        {title}
      </Eyebrow>
      {children}
    </section>
  );
}

function ScopeList({ heading, items, included = false }: { heading: string; items: string[]; included?: boolean }) {
  const Icon = included ? Check : Minus;
  return (
    <div>
      <p className="mb-3 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
        {heading}
      </p>
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

function Exhibit({ study, exhibit }: { study: CaseStudy; exhibit: NonNullable<CaseStudy["exhibit"]> }) {
  const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(`${siteConfig.url}${exhibit.fileUrl}`)}`;
  return (
    <DetailSection title={`Exhibit · ${exhibit.label}`}>
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
        <iframe
          src={viewerUrl}
          className="h-[260px] w-full sm:h-[360px] landscape:h-[180px]"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
          loading="lazy"
          title={`${study.title} exhibit: ${exhibit.label}`}
        />
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
        <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
        Preview not loading?
        <a href={exhibit.fileUrl} download={exhibit.fileName} className="link-underline font-medium" style={{ color: "var(--color-accent)" }}>
          Download the deck
        </a>
      </p>
    </DetailSection>
  );
}

/** Scope, audience, approach, architecture, data model and exhibits: the expanded half of a case study. */
export function CaseStudyDetails({ study, doc }: { study: CaseStudy; doc?: ProjectDoc }) {
  return (
    <div className="mt-8 space-y-10 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
      {doc && (
        <DetailSection title="Scope">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ScopeList heading="In scope" items={doc.scope.in} included />
            <ScopeList heading="Out of scope" items={doc.scope.out} />
          </div>
        </DetailSection>
      )}

      {doc && (
        <DetailSection title="Audience & needs">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {doc.audience.map((a) => (
              <div key={a.who}>
                <dt className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {a.who}
                </dt>
                <dd className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {a.needs}
                </dd>
              </div>
            ))}
          </dl>
        </DetailSection>
      )}

      <DetailSection title="Problem & approach">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {study.problem}
            </p>
            <p className="mt-4 border-l-2 pl-4 text-sm leading-relaxed" style={{ borderColor: "var(--palette-berry)", color: "var(--color-text-primary)" }}>
              <span className="font-semibold">My contribution: </span>
              {study.contribution}
            </p>
          </div>
          <ol className="space-y-3">
            {study.solution.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                <span className="mt-px w-5 flex-shrink-0 font-mono text-xs" style={{ color: "var(--color-accent)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </DetailSection>

      <DetailSection title="Architecture">
        <ArchitectureFlow stages={study.architecture.stages} branch={study.architecture.branch} />
      </DetailSection>

      {doc && (
        <DetailSection title="Data model (ERD)">
          {doc.erd ? (
            <ErdDiagram entities={doc.erd.entities} relations={doc.erd.relations} />
          ) : (
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {doc.dataNote}
            </p>
          )}
        </DetailSection>
      )}

      {doc && (
        <DetailSection title="Design priorities">
          <ul className="flex flex-wrap gap-2">
            {doc.qualities.map((quality) => (
              <li key={quality} className="rounded-md border px-2.5 py-1 text-xs" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                {quality}
              </li>
            ))}
          </ul>
        </DetailSection>
      )}

      {study.exhibit && <Exhibit study={study} exhibit={study.exhibit} />}

      {doc && (
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          Full write-up: <span className="font-mono">docs/projects/{study.id}.md</span> in the{" "}
          <a href={`${siteConfig.repo}/tree/main/docs`} target="_blank" rel="noopener noreferrer" className="link-underline" style={{ color: "var(--color-accent)" }}>
            portfolio repository
          </a>
          .
        </p>
      )}
    </div>
  );
}
