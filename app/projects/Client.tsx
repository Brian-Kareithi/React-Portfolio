"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github, Lock, Plus } from "lucide-react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { CaseStudy } from "@/app/components/ui/CaseStudy";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import FilmStrip from "@/app/components/FilmStrip";
import { Assemble } from "@/app/components/ui/Assemble";
import { caseStudies, otherProjects } from "@/app/lib/projects-data";
import { currentProject as now } from "@/app/lib/current-project";

const githubStats = [
  { value: "28", label: "Public repositories" },
  { value: "2022", label: "Building since" },
  { value: "9", label: "Languages used" },
];

export default function ProjectsClient() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const trackPointer = (e: React.PointerEvent) => {
    const el = listRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${e.clientX - r.left}px`);
    el.style.setProperty("--py", `${e.clientY - r.top}px`);
  };

  const preview = caseStudies.find((c) => c.id === hover)?.screenshot;

  return (
    <div className="q-page" id="projects">
      <div className="q-wrap">
        <Breadcrumbs />
        <SectionHeader
          index="03"
          label="Selected work"
          title={<>Not websites. <em>Systems.</em></>}
          description="Seven projects, each told as the problem, what I built, my part in it, and the design behind it. Smaller builds sit in the archive."
          aside={
            <dl className="p-stats">
              <div><dt>Case studies</dt><dd>{caseStudies.length}</dd></div>
              <div><dt>Live right now</dt><dd>{caseStudies.filter((c) => c.access.demo).length + 1}</dd></div>
            </dl>
          }
        />

        <section aria-label="Project index" className="p-index">
          <ol ref={listRef} onPointerMove={trackPointer} onPointerLeave={() => setHover(null)}>
            {caseStudies.map((study) => (
              <li key={study.id}>
                <a
                  href={`#${study.id}`}
                  className="p-index-row"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHover(study.id)}
                  onFocus={() => setHover(study.id)}
                  onBlur={() => setHover(null)}
                >
                  <span className="p-index-num">{study.index}</span>
                  <span className="p-index-title">{study.title}</span>
                  <span className="p-index-stack">{study.stack.slice(0, 3).join(" · ")}</span>
                  <span className="p-index-status">{study.status}</span>
                  <ArrowUpRight className="p-index-arrow" aria-hidden="true" />
                </a>
              </li>
            ))}
            {preview && (
              <div className="p-peek" aria-hidden="true">
                <Image src={preview.src} alt="" width={720} height={450} sizes="360px" />
              </div>
            )}
          </ol>
        </section>

        <section id="now-building" aria-labelledby="now-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>●</b> Inside the POS system</p>
            <div>
              <h2 id="now-title" data-split className="q-h2">
                {now.title} <em>{now.titleAccent}</em>
              </h2>
              <p className="q-body" style={{ maxWidth: "40rem", marginTop: "1.25rem" }}>{now.summary}</p>
            </div>
          </div>
          <dl className="p-facts">
            <div><dt>Status</dt><dd>{now.status}</dd></div>
            {now.facts.map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
            <div>
              <dt>Demo</dt>
              <dd>
                <a href={now.demo} target="_blank" rel="noopener noreferrer" className="q-link">
                  Open the live demo <ArrowUpRight aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="p-strip">
        <FilmStrip frames={now.screens} label="Point of sale screens" />
      </div>

      <div className="q-wrap">
        <section aria-label="Case studies" className="p-cases">
          {caseStudies.map((study) => (
            <Assemble key={study.id}>
              <CaseStudy study={study} />
            </Assemble>
          ))}
        </section>

        <section className="q-section p-self">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>★</b> This portfolio</p>
            <h2 data-split className="q-h2">You&apos;re <em>looking at it</em></h2>
          </div>
          <div className="p-self-grid">
            <p className="q-body" style={{ maxWidth: "34rem" }}>
              Next.js 16, TypeScript and Tailwind CSS v4, with per-route metadata and structured data. Scroll physics from Lenis and GSAP, a 3D homelab in Three.js, and no cookies.
            </p>
            <div className="p-self-links">
              <a href="https://kareithi.vercel.app/" target="_blank" rel="noopener noreferrer" className="q-btn">
                <ExternalLink aria-hidden="true" /> Live site
              </a>
              <a href="https://github.com/Brian-Kareithi/React-Portfolio" target="_blank" rel="noopener noreferrer" className="q-link">
                <Github aria-hidden="true" /> Source
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="archive-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>04</b> Archive</p>
            <h2 id="archive-title" data-split className="q-h2">Smaller <em>builds</em></h2>
          </div>
          <ul className="p-archive">
            {otherProjects.map((project, index) => {
              const isExpanded = expanded === index;
              return (
                <li key={project.title}>
                  <button
                    className="p-archive-row"
                    onClick={() => setExpanded(isExpanded ? null : index)}
                    aria-expanded={isExpanded}
                    aria-controls={`project-details-${index}`}
                  >
                    <span className="p-archive-title">{project.title}</span>
                    <span className="p-archive-desc">{project.description}</span>
                    <span className="q-chip" style={{ textTransform: "capitalize" }}>{project.status}</span>
                    <Plus className="p-archive-plus" data-open={isExpanded || undefined} aria-hidden="true" />
                  </button>
                  {isExpanded && (
                    <div id={`project-details-${index}`} className="p-archive-detail animate-fade-in-up">
                      <p className="q-small p-archive-mobile">{project.type}</p>
                      <ul>
                        {project.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                      <div className="p-archive-meta">
                        <span className="q-mono q-small">{project.stack.join(" · ")}</span>
                        {project.repo ? (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="q-link">
                            <Github aria-hidden="true" /> Source
                          </a>
                        ) : (
                          <span className="q-small" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                            <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Private repository
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-label="GitHub" className="q-section p-github">
          <dl className="p-github-stats">
            {githubStats.map((s) => (
              <div key={s.label}>
                <dd>{s.value}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
          <div className="p-github-cta">
            <p className="q-body" style={{ maxWidth: "26rem" }}>Browse the code, question the decisions, borrow what is useful.</p>
            <a href="https://github.com/Brian-Kareithi" target="_blank" rel="noopener noreferrer" className="q-link">
              github.com/Brian-Kareithi <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <NextSection
          title="Next"
          links={[
            { href: "/how-i-work", label: "How I work", description: "The process behind these builds." },
            { href: "/homelab", label: "Homelab", description: "The infrastructure under them." },
            { href: "/about", label: "About", description: "The path that led here." },
          ]}
        />
      </div>
    </div>
  );
}
