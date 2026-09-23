import { ExternalLink, Github, Lock, FileDown } from "lucide-react";
import { ArchitectureFlow } from "@/app/components/ui/ArchitectureFlow";
import type { CaseStudy as CaseStudyType } from "@/app/lib/projects-data";
import { siteConfig } from "@/app/lib/site";

export function CaseStudy({ study }: { study: CaseStudyType }) {
  return (
    <article className="flat-card p-5 xs:p-6 md:p-8" style={{ borderColor: "var(--color-border)" }}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="index-num mb-2">{study.index} / 05</p>
          <h3 className="text-xl font-bold xs:text-2xl" style={{ color: "var(--color-text-primary)" }}>
            {study.title}
          </h3>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            {study.tagline}
          </p>
        </div>
        <span
          className="whitespace-nowrap px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider"
          style={{ border: "1px solid var(--color-accent)", color: "var(--color-accent)" }}
        >
          {study.status}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <p className="field-label mb-2.5" style={{ color: "var(--color-accent)" }}>
            What problem was I solving?
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {study.problem}
          </p>
        </div>
        <div>
          <p className="field-label mb-2.5" style={{ color: "var(--color-accent)" }}>
            How did I solve it?
          </p>
          <ul className="space-y-2">
            {study.solution.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
        <p className="field-label mb-3">Architecture</p>
        <ArchitectureFlow stages={study.architecture.stages} branch={study.architecture.branch} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="field-label mb-2.5">Technology</p>
          <div className="flex flex-wrap gap-1.5">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="rounded px-2 py-1 text-[10px] font-mono"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="field-label mb-2.5">My contribution</p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {study.contribution}
          </p>
        </div>
      </div>

      {study.exhibit && (
        <div className="mt-6 border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="field-label">
              Exhibit <span style={{ color: "var(--color-text-muted)", textTransform: "none", letterSpacing: "normal" }}>· {study.exhibit.label}</span>
            </p>
            <a
              href={study.exhibit.fileUrl}
              download={study.exhibit.fileName}
              className="flex items-center gap-1.5 font-mono text-[10px] transition-colors duration-200"
              style={{ color: "var(--color-accent)" }}
            >
              <FileDown className="h-3 w-3" />
              Download
            </a>
          </div>
          <div className="overflow-hidden border" style={{ borderColor: "var(--color-border-hover)" }}>
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(`${siteConfig.url}${study.exhibit.fileUrl}`)}`}
              className="h-[260px] w-full landscape:h-[180px]"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
              loading="lazy"
              title={`${study.title} exhibit: ${study.exhibit.label}`}
            />
          </div>
          <p className="mt-2 font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
            Cannot load the preview?{" "}
            <a href={study.exhibit.fileUrl} download={study.exhibit.fileName} className="link-underline" style={{ color: "var(--color-accent)" }}>
              Download the exhibit
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
        {study.access.demo && (
          <a
            href={study.access.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium transition-colors duration-200"
            style={{ border: "1px solid var(--color-accent)", color: "var(--color-accent)" }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
          </a>
        )}
        {study.access.repo && (
          <a
            href={study.access.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium transition-colors duration-200"
            style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
          >
            <Github className="h-3.5 w-3.5" />
            View Source
          </a>
        )}
        <span className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
          {study.access.kind !== "public" && <Lock className="h-3 w-3" />}
          {study.access.note}
        </span>
      </div>
    </article>
  );
}
