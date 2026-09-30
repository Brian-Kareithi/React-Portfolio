import { ExternalLink, Github, Lock, FileDown } from "lucide-react";
import { ArchitectureFlow } from "@/app/components/ui/ArchitectureFlow";
import { caseStudies, type CaseStudy as CaseStudyType } from "@/app/lib/projects-data";
import { siteConfig } from "@/app/lib/site";

/** One case study told as a magazine spread. `ink` renders it on a dark slab for rhythm. */
export function CaseStudy({ study, ink = false }: { study: CaseStudyType; ink?: boolean }) {
  return (
    <article className={ink ? "ink-slab p-6 xs:p-8 md:p-12" : "plate p-6 xs:p-8 md:p-12"}>
      <header className="mb-8 grid gap-4 md:grid-cols-12 md:items-end">
        <span className="display-xl text-7xl md:col-span-2 md:text-8xl" style={{ color: "var(--color-accent-secondary)" }}>
          {study.index}
        </span>
        <div className="md:col-span-7">
          <h3 className="display-xl text-4xl sm:text-5xl" style={{ color: "var(--color-text-primary)" }}>
            {study.title}
          </h3>
          <p className="mt-2 font-serif-accent text-xl" style={{ color: "var(--color-accent)" }}>
            {study.tagline}
          </p>
        </div>
        <div className="flex gap-2 md:col-span-3 md:justify-end">
          <span className="pill !text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            {study.status}
          </span>
          <span className="pill font-mono !text-[11px]">
            {study.index}/{String(caseStudies.length).padStart(2, "0")}
          </span>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="field-label mb-3">The problem</p>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {study.problem}
          </p>
          <p className="field-label mb-3 mt-8">My contribution</p>
          <p className="rounded-2xl px-4 py-3 text-sm leading-relaxed" style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-text-primary)" }}>
            {study.contribution}
          </p>
        </div>
        <div>
          <p className="field-label mb-3">How I solved it</p>
          <ol className="space-y-3">
            {study.solution.map((s, i) => (
              <li key={s} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <span className="font-serif-accent w-5 flex-shrink-0 text-lg leading-5" style={{ color: "var(--color-accent)" }}>{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-8 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
        <p className="field-label mb-4">Architecture</p>
        <ArchitectureFlow stages={study.architecture.stages} branch={study.architecture.branch} />
      </div>

      <div className="mt-8">
        <div>
          <p className="field-label mb-3">Technology</p>
          <div className="flex flex-wrap gap-1.5">
            {study.stack.map((tech) => (
              <span key={tech} className="rounded-full border px-3 py-1 font-mono text-[11px]" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {study.exhibit && (
        <div className="mt-8 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="field-label">
              Exhibit <span style={{ color: "var(--color-text-muted)", textTransform: "none", letterSpacing: "normal" }}>· {study.exhibit.label}</span>
            </p>
            <a
              href={study.exhibit.fileUrl}
              download={study.exhibit.fileName}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
              style={{ color: "var(--color-accent)" }}
            >
              <FileDown className="h-3.5 w-3.5" />
              Download
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--color-border-hover)" }}>
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(`${siteConfig.url}${study.exhibit.fileUrl}`)}`}
              className="h-[260px] w-full landscape:h-[180px]"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
              loading="lazy"
              title={`${study.title} exhibit: ${study.exhibit.label}`}
            />
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
            Cannot load the preview?{" "}
            <a href={study.exhibit.fileUrl} download={study.exhibit.fileName} className="link-underline" style={{ color: "var(--color-accent)" }}>
              Download the exhibit
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
        {study.access.demo && (
          <a href={study.access.demo} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-primary">
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}
        {study.access.repo && (
          <a href={study.access.repo} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-ghost">
            <Github className="h-4 w-4" />
            View Source
          </a>
        )}
        <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
          {study.access.kind !== "public" && <Lock className="h-3 w-3" />}
          {study.access.note}
        </span>
      </div>
    </article>
  );
}
