import { Github } from "lucide-react";
import type { CaseStudy } from "@/data/projects";

const repoName = (url: string) => url.replace(/^https:\/\/github\.com\//, "");

/** One glass card per codebase for projects split across repositories, each with its stack and source link. */
export function CaseStudyParts({ parts }: { parts: NonNullable<CaseStudy["parts"]> }) {
  return (
    <section className="q-parts" aria-label="Codebases">
      <p className="field-label mb-3">
        {parts.length} repositories, one API
      </p>
      <ol className="q-parts-list">
        {parts.map((part, i) => (
          <li key={part.repo} className="flat-card q-part">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
                <span className="index-num mr-2" style={{ color: "var(--color-accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                {part.name}
              </h4>
              {part.host && <span className="font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>{part.host}</span>}
            </div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {part.role}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${part.name} stack`}>
              {part.stack.map((tech) => (
                <li key={tech} className="q-chip">{tech}</li>
              ))}
            </ul>
            <a href={part.repo} target="_blank" rel="noopener noreferrer" className="q-link q-part-link">
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-mono text-xs">{repoName(part.repo)}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
