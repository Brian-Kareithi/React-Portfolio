"use client";
import { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp, Lock, Smartphone, Server } from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { CaseStudy } from "@/app/components/ui/CaseStudy";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { caseStudies, otherProjects } from "@/app/lib/projects-data";

const nowBuilding = [
  {
    title: "Mobile Applications",
    icon: <Smartphone className="w-3.5 h-3.5" />,
    stack: "React Native · Expo",
    desc: "Continuing to build and ship cross-platform apps, from the Steadfast Parent app to personal tools like the Fitness Tracker.",
  },
  {
    title: "Homelab & Self-Hosted Infrastructure",
    icon: <Server className="w-3.5 h-3.5" />,
    stack: "Proxmox · Docker · Automation",
    desc: "The lab is never finished: new services, automation and failover drills run continuously in the background.",
  },
];

const githubStats = [
  { value: "28", label: "Public Repositories" },
  { value: "2022", label: "Active Since" },
  { value: "9", label: "Languages Used" },
];

export default function ProjectsClient() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen w-full py-28 md:py-36 px-5 sm:px-10 lg:px-16 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="03"
          label="Systems I've Built"
          title={<>Not websites. <em className="font-serif-accent">Systems</em>.</>}
          description="Seven case studies, told as problem, solution, architecture and contribution, plus a lighter-weight archive of smaller builds and experiments below."
        />

        {/* Case studies as alternating spreads */}
        <div className="mb-20 flex flex-col gap-8">
          {caseStudies.map((study, i) => (
            <CaseStudy key={study.id} study={study} ink={i % 2 === 1} />
          ))}
        </div>

        {/* Now building */}
        <div className="mb-20">
          <SubTitle kicker="Now building" title="What's currently in progress" />
          <div className="grid gap-4 sm:grid-cols-2">
            {nowBuilding.map((n) => (
              <div key={n.title} className="rounded-[1.5rem] border-2 border-dashed p-6" style={{ borderColor: "var(--color-accent-secondary)" }}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}>
                    {n.icon}
                  </span>
                  <h3 className="font-serif-accent text-xl" style={{ color: "var(--color-text-primary)" }}>{n.title}</h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{n.desc}</p>
                <span className="pill font-mono !text-[11px]">
                  <span className="loader-dot h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                  {n.stack}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* This portfolio */}
        <StaggerReveal>
        <div className="mb-20 grid gap-6 rounded-[2rem] p-7 sm:p-10 md:grid-cols-5" style={{ backgroundColor: "var(--color-highlight)" }}>
          <div className="md:col-span-3">
            <p className="field-label mb-3">This portfolio</p>
            <h3 className="display-xl mb-4 text-4xl" style={{ color: "var(--color-text-primary)" }}>
              You&apos;re <span className="font-serif-accent">looking at it</span>
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Built on Next.js 16 with TypeScript and Tailwind CSS v4. Server-rendered pages with per-route
              metadata, schema.org structured data, breadcrumbs, and code-split bundles sized by performance
              budget, the same discipline I apply to client work.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-4 md:col-span-2">
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "TypeScript", "Tailwind CSS"].map((tech) => (
                <span key={tech} className="pill font-mono !text-[11px]">{tech}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://kareithi.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-primary">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
              <a href="https://github.com/Brian-Kareithi/React-Portfolio" target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-ghost">
                <Github className="w-4 h-4" />
                View Source
              </a>
            </div>
          </div>
        </div>
        </StaggerReveal>

        {/* Archive as a compact expandable list */}
        <div className="mb-20">
          <SubTitle kicker="Archive" title="Smaller builds & experiments" />
          <StaggerReveal staggerDelay={80}>
          <ul className="border-b" style={{ borderColor: "var(--color-border)" }}>
            {otherProjects.map((project, index) => {
              const isExpanded = expanded === index;
              return (
                <li key={project.title} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                  <button
                    className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-5 text-left md:grid-cols-12"
                    onClick={() => setExpanded(isExpanded ? null : index)}
                    aria-expanded={isExpanded}
                    aria-controls={`project-details-${index}`}
                  >
                    <span className="min-w-0 md:col-span-5">
                      <span className="block font-serif-accent text-2xl transition-colors duration-200 group-hover:text-[var(--color-accent)]" style={{ color: "var(--color-text-primary)" }}>
                        {project.title}
                      </span>
                      <span className="block text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {project.type}
                        {project.repoType === "private" && (
                          <span className="ml-2 inline-flex items-center gap-1">
                            <Lock className="h-3 w-3" aria-hidden="true" /> Private
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="hidden text-sm md:col-span-5 md:block" style={{ color: "var(--color-text-secondary)" }}>
                      {project.description}
                    </span>
                    <span className="flex items-center justify-end gap-3 md:col-span-2">
                      <span className="pill !py-1 !text-[11px] capitalize">{project.status}</span>
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 group-hover:border-[var(--color-accent)]"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-accent)" }}
                        aria-hidden="true"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </span>
                    </span>
                  </button>

                  {isExpanded && (
                    <div id={`project-details-${index}`} className="animate-fade-in-up grid gap-6 pb-6 md:grid-cols-12">
                      <div className="md:col-span-7 md:col-start-6">
                        <p className="mb-4 text-sm md:hidden" style={{ color: "var(--color-text-secondary)" }}>{project.description}</p>
                        <ul className="mb-4 space-y-2">
                          {project.details.map((detail) => (
                            <li key={detail} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                        <div className="mb-4 flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span key={tech} className="rounded-full border px-2.5 py-1 font-mono text-[10px]" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.repo ? (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-ghost">
                            <Github className="w-4 h-4" />
                            View Source
                          </a>
                        ) : (
                          <span className="pill">
                            <Lock className="w-3.5 h-3.5" />
                            Private repository
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          </StaggerReveal>
        </div>

        {/* GitHub */}
        <StaggerReveal>
        <div className="ink-slab px-6 py-12 text-center sm:px-12">
          <p className="field-label mb-6">Open source / code</p>
          <div className="mx-auto mb-8 grid max-w-md grid-cols-3 gap-4">
            {githubStats.map((s) => (
              <div key={s.label}>
                <p className="display-xl text-5xl" style={{ color: "var(--color-accent)" }}>{s.value}</p>
                <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Great ideas are meant to inspire others, and software improves when knowledge is shared. Whether you are a developer, recruiter, founder, or fellow engineer, feel free to explore the repositories, examine the architecture decisions, suggest improvements, borrow ideas, or collaborate on future innovations.
          </p>
          <a href="https://github.com/Brian-Kareithi" target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-primary">
            <Github className="w-4 h-4" />
            View GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        </StaggerReveal>

        <NextSection
          title="Start a project or dig deeper"
          description="From the portfolio to the process that produced it."
          links={[
            { href: "/contact", label: "Contact", description: "Have a build in mind? Start a conversation." },
            { href: "/engineering", label: "Engineering", description: "The architecture and delivery process behind each build." },
            { href: "/resume", label: "Resume", description: "The same work, tailored to the role you're hiring for." },
          ]}
        />
      </div>
      </ScrollReveal>
    </section>
  );
}

function SubTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="field-label mb-2 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
        {kicker}
      </p>
      <h2 className="display-xl text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h2>
    </div>
  );
}
