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
    <section id="projects" className="min-h-screen w-full py-28 md:py-36 px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-7xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="03"
          label="Systems I've Built"
          title={<>Not websites. <em className="font-serif-accent">Systems</em>.</>}
          description="Five case studies, told as problem, solution, architecture and contribution, plus a lighter-weight archive of smaller builds and experiments below."
        />

        {/* Case studies */}
        <div className="mb-16 xs:mb-20 flex flex-col gap-6">
          {caseStudies.map((study) => (
            <CaseStudy key={study.id} study={study} />
          ))}
        </div>

        {/* Now building */}
        <div className="mb-16 xs:mb-20">
          <p className="field-label mb-1.5 flex items-center gap-2">
            <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
            Now Building
          </p>
          <h2 className="mb-6 text-lg font-bold tracking-tight md:text-xl" style={{ color: "var(--color-text-primary)" }}>
            What&rsquo;s currently in progress
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {nowBuilding.map((n) => (
              <div key={n.title} className="flat-card p-5 md:p-6">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                    {n.icon}
                  </span>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{n.title}</h3>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--color-text-secondary)" }}>{n.desc}</p>
                <p className="font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>{n.stack}</p>
              </div>
            ))}
          </div>
        </div>

        {/* This portfolio */}
        <StaggerReveal>
        <div className="mb-16 xs:mb-20">
          <div className="flat-card p-4 xs:p-6 md:p-8"
            style={{ borderColor: "var(--color-border)" }}>
            <p className="text-[9px] font-medium tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--color-text-muted)" }}>
              This Portfolio
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 p-4 flat-card"
                style={{ borderColor: "var(--color-accent)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] px-2 py-0.5 rounded tracking-wider uppercase font-mono"
                    style={{
                      border: "1px solid var(--color-accent)",
                      color: "var(--color-accent)",
                    }}>
                    Current
                  </span>
                  <h4 className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                    You&apos;re looking at it
                  </h4>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  Built on Next.js 16 with TypeScript and Tailwind CSS v4. Server-rendered pages with per-route
                  metadata, schema.org structured data, breadcrumbs, and code-split bundles sized by performance
                  budget : the same discipline I apply to client work.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["Next.js", "TypeScript", "Tailwind CSS"].map((tech) => (
                    <span key={tech} className="text-[9px] font-mono px-2 py-0.5 rounded"
                      style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://kareithi.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium transition-colors duration-200 min-h-[44px]"
                style={{ border: "1px solid var(--color-accent)", color: "var(--color-accent)" }}>
                <ExternalLink className="w-3 h-3" />
                Live Demo
              </a>
              <a href="https://github.com/Brian-Kareithi/React-Portfolio" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium transition-colors duration-200 min-h-[44px]"
                style={{ border: "1px solid var(--color-glass-border)", color: "var(--color-text-secondary)" }}>
                <ExternalLink className="w-3 h-3" />
                View Source
              </a>
            </div>
          </div>
        </div>
        </StaggerReveal>

        {/* Archive */}
        <div className="mb-16 xs:mb-20">
          <p className="field-label mb-1.5 flex items-center gap-2">
            <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
            Archive
          </p>
          <h2 className="mb-6 text-lg font-bold tracking-tight md:text-xl" style={{ color: "var(--color-text-primary)" }}>
            Smaller builds &amp; experiments
          </h2>
          <StaggerReveal staggerDelay={80}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProjects.map((project, index) => {
              const isExpanded = expanded === index;
              return (
                <div key={index}
                  className="flat-card"
                  style={{ borderColor: "var(--color-border)" }}>
                  <div className="p-6 md:p-8 cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : index)}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold"
                            style={{ color: "var(--color-text-primary)" }}>
                            {project.title}
                          </h3>
                          <span className="text-[9px] px-2 py-0.5 rounded tracking-wider uppercase font-mono"
                            style={{
                              border: "1px solid var(--color-border)",
                              color: "var(--color-text-muted)",
                            }}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-sm mt-2 leading-relaxed"
                          style={{ color: "var(--color-text-secondary)" }}>
                          {project.description}
                        </p>
                      </div>
                      <button className="ml-4 mt-1 p-2 transition-transform duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        style={{ color: "var(--color-text-muted)" }}>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[9px] tracking-wider uppercase font-mono"
                        style={{ color: "var(--color-accent)" }}>
                        {project.type}
                      </span>
                      {project.repoType === "private" && (
                        <span className="flex items-center gap-1 text-[9px] tracking-wider uppercase font-mono"
                          style={{ color: "var(--color-text-muted)" }}>
                          <Lock className="w-3 h-3" />
                          Private
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-[9px] font-mono px-2 py-1 rounded"
                          style={{
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text-muted)",
                          }}>
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="text-[9px] font-mono px-2 py-1 rounded"
                          style={{
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text-muted)",
                          }}>
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 md:px-8 pb-8 border-t animate-fade-in-up"
                      style={{ borderColor: "var(--color-border)" }}>
                      <div className="pt-6 space-y-6">
                        <div>
                          <p className="text-[9px] font-medium tracking-[0.15em] uppercase mb-3"
                            style={{ color: "var(--color-accent)" }}>
                            Overview
                          </p>
                          <ul className="space-y-2">
                            {project.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm"
                                style={{ color: "var(--color-text-secondary)" }}>
                                <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: "var(--color-accent)" }} />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-3 pt-6"
                          style={{ borderTop: "1px solid var(--color-border)" }}>
                          {project.repo && (
                            <a href={project.repo} target="_blank" rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px]"
                              style={{
                                border: "1px solid var(--color-border)",
                                color: "var(--color-text-secondary)",
                              }}>
                              <Github className="w-4 h-4" />
                              View Source
                            </a>
                          )}
                          {project.repoType === "private" && (
                            <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium min-h-[44px]"
                              style={{
                                border: "1px solid var(--color-border)",
                                color: "var(--color-text-muted)",
                              }}>
                              <Lock className="w-4 h-4" />
                              Private Repository
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          </StaggerReveal>
        </div>

        {/* GitHub */}
        <StaggerReveal>
        <div className="mt-16 py-12 px-6 border-y text-center"
          style={{ borderColor: "var(--color-border)" }}>
          <p className="field-label mb-4">Open Source / Code</p>
          <div className="mb-8 grid grid-cols-3 max-w-md mx-auto gap-4">
            {githubStats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold" style={{ color: "var(--color-accent)" }}>{s.value}</p>
                <p className="text-[9px] tracking-wider uppercase mt-1" style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed max-w-3xl mx-auto mb-6"
            style={{ color: "var(--color-text-secondary)" }}>
            Great ideas are meant to inspire others, and software improves when knowledge is shared. Whether you are a developer, recruiter, founder, or fellow engineer, feel free to explore the repositories, examine the architecture decisions, suggest improvements, borrow ideas, or collaborate on future innovations.
          </p>
          <a href="https://github.com/Brian-Kareithi" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px]"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}>
            <Github className="w-4 h-4" />
            View GitHub
            <ExternalLink className="w-3 h-3" />
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
