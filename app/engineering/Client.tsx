"use client";
import {
  Layers, Boxes, Workflow, GitPullRequest,
  Braces, Database, Cloud, ServerCog, Terminal,
  ArrowUpRight,
} from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";

const principles = [
  {
    title: "The right tool for the job",
    icon: <Layers className="w-4 h-4" />,
    desc: "I've learned enough languages and frameworks to choose by fit, not habit. Typed TypeScript for web, Kotlin for Android, C/C++ where the silicon matters.",
  },
  {
    title: "Clean layered architecture",
    icon: <Boxes className="w-4 h-4" />,
    desc: "Separating data, domain, and presentation keeps systems testable and swappable. A change in one layer should never ripple through everything.",
  },
  {
    title: "Security by default",
    icon: <Braces className="w-4 h-4" />,
    desc: "Every layer of the stack is engineered with security in mind: validate input, encrypt transit, enforce least privilege, and assume hostile networks.",
  },
  {
    title: "Optimize the right things",
    icon: <Workflow className="w-4 h-4" />,
    desc: "Measure before you tune. I focus on real bottlenecks and measurable wins, not premature micro-optimization.",
  },
];

const architecture = [
  {
    title: "Frontend",
    icon: <Boxes className="w-4 h-4" />,
    stack: "Next.js · React · TypeScript · Tailwind",
    desc: "Server components, incremental rendering, and design systems. I've driven a 40% UI performance improvement through architecture, not hacks.",
  },
  {
    title: "Mobile",
    icon: <Braces className="w-4 h-4" />,
    stack: "React Native · Expo · Kotlin",
    desc: "Cross-platform apps that ship to both stores, plus native Kotlin builds for Android with local databases and offline-first design.",
  },
  {
    title: "Backend & APIs",
    icon: <ServerCog className="w-4 h-4" />,
    stack: "Node.js · Express · Next.js API",
    desc: "RESTful and typed APIs with auth, validation, and clean separation. Designed to scale and easy to reason about.",
  },
  {
    title: "Data",
    icon: <Database className="w-4 h-4" />,
    stack: "PostgreSQL · MongoDB · SQLite · Firebase",
    desc: "Schema design, queries, and data modeling that fit the access patterns, not the other way around. Both relational and document stores.",
  },
  {
    title: "Cloud & Infra",
    icon: <Cloud className="w-4 h-4" />,
    stack: "AWS · Azure · GCP · Docker · Proxmox",
    desc: "Multi-cloud architecture with containers, virtualization, and automation. Cut infrastructure costs 60% without losing reliability.",
  },
  {
    title: "Delivery",
    icon: <GitPullRequest className="w-4 h-4" />,
    stack: "Git · CI/CD · Automated deploy",
    desc: "Repeatable pipelines that take a commit to production in about 15 minutes, with monitoring and backups built in.",
  },
];

const workflow = [
  { step: "01", title: "Understand", desc: "Clarify the goal, constraints, and the real users before writing a line of code." },
  { step: "02", title: "Design", desc: "Map the architecture, data flow, and security boundaries on paper first." },
  { step: "03", title: "Build", desc: "Implement in small, reviewable increments with tests alongside the code." },
  { step: "04", title: "Verify", desc: "Test, lint, and profile. Prove it works and is fast under realistic load." },
  { step: "05", title: "Ship", desc: "Deploy through automation, then monitor for regressions and harden." },
  { step: "06", title: "Iterate", desc: "Refactor, learn, measure. Software is a living system, never a finished one." },
];

const stack = [
  { item: "TypeScript", use: "Full-stack & mobile" },
  { item: "React / Next.js", use: "Web & SSR platforms" },
  { item: "React Native / Expo", use: "iOS + Android" },
  { item: "Node.js", use: "Backend & APIs" },
  { item: "Kotlin", use: "Native Android" },
  { item: "C / C++", use: "Embedded firmware" },
  { item: "Python", use: "Security tooling & scripting" },
  { item: "Docker", use: "Containers everywhere" },
  { item: "Proxmox", use: "VM & lab virtualization" },
  { item: "AWS / Azure / GCP", use: "Cloud platforms" },
  { item: "PostgreSQL / MongoDB", use: "Data storage" },
  { item: "C#", use: "Backend services" },
];

export default function EngineeringClient() {
  return (
    <section id="engineering" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3 xs:px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-7xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="07"
          label="Engineering"
          title={<>How I <em className="font-serif-accent">build</em></>}
          description="Beyond listing languages, this is the way I think about software: architecture that holds up, systems that stay secure, and code that remains a joy to maintain."
        />

        {/* Principles */}
        <div className="mb-14 xs:mb-16 sm:mb-20">
          <StaggerReveal>
          <div className="mb-8 xs:mb-10">
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-1.5 flex items-center gap-2"
              style={{ color: "var(--color-text-muted)" }}>
              <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
              Engineering Principles
            </p>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              What I optimize for
            </h2>
          </div>
          </StaggerReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((p) => (
              <div key={p.title} className="flat-card p-5 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                    {p.icon}
                  </span>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    {p.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture layers */}
        <div className="mb-14 xs:mb-16 sm:mb-20">
          <StaggerReveal>
          <div className="mb-8 xs:mb-10">
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-1.5 flex items-center gap-2"
              style={{ color: "var(--color-text-muted)" }}>
              <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
              Full-Stack Architecture
            </p>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              From the screen to the server
            </h2>
          </div>
          </StaggerReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {architecture.map((a) => (
              <div key={a.title} className="liquid-card p-5 md:p-6"
                style={{ borderColor: "var(--color-glass-border)" }}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex-shrink-0" style={{ color: "var(--color-accent)" }}>
                    {a.icon}
                  </span>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    {a.title}
                  </h3>
                </div>
                <p className="font-mono text-[10px] mb-2.5" style={{ color: "var(--color-accent)" }}>
                  {a.stack}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery workflow */}
        <div className="mb-14 xs:mb-16 sm:mb-20">
          <StaggerReveal>
          <div className="mb-8 xs:mb-10">
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-1.5 flex items-center gap-2"
              style={{ color: "var(--color-text-muted)" }}>
              <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
              Delivery Workflow
            </p>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              From idea to production
            </h2>
          </div>
          </StaggerReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4">
            {workflow.map((w) => (
              <div key={w.step} className="flat-card p-5 flex gap-4">
                <span className="font-mono text-lg font-bold" style={{ color: "var(--color-accent)" }}>
                  {w.step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold mb-1.5" style={{ color: "var(--color-text-primary)" }}>
                    {w.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack + delivery CTA */}
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-1.5 flex items-center gap-2"
                style={{ color: "var(--color-text-muted)" }}>
                <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
                Where each tool is used
              </p>
              <h2 className="text-lg md:text-2xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                A language for every layer
              </h2>
            </div>
            <div className="border" style={{ borderColor: "var(--color-border)" }}>
              {stack.map((s, i) => (
                <div key={s.item}
                  className={`flex items-center justify-between gap-4 px-4 py-3 ${i < stack.length - 1 ? "border-b" : ""}`}
                  style={{ borderColor: "var(--color-border)" }}>
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                    {s.item}
                  </span>
                  <span className="text-[11px] font-mono" style={{ color: "var(--color-text-muted)" }}>
                    {s.use}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-between gap-6">
            <div className="flat-card p-6 h-full">
              <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
                style={{ color: "var(--color-text-muted)" }}>
                <Terminal className="w-3.5 h-3.5 flex-shrink-0" />
                The result
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>
                This portfolio is itself a product of this process: Next.js, TypeScript, a design system, cloud deployment, and analytics, all built with the same discipline I bring to client work.
              </p>
              <a href="https://github.com/Brian-Kareithi" target="_blank" rel="noopener noreferrer"
                className="btn-neon btn-neon-primary w-full justify-center">
                See the code on GitHub
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      <NextSection
          title="From principles to practice"
          description="The mindset next-door, and the tools that put it into production."
          links={[
            { href: "/expertise", label: "Expertise", description: "The six domains that back this engineering approach." },
            { href: "/troubleshooting", label: "Diagnostics", description: "Root-cause work against real-world failures." },
            { href: "/techstack", label: "Tech Stack", description: "Every language and platform, mapped to its layer." },
          ]}
        />
      </div>
      </ScrollReveal>
    </section>
  );
}
