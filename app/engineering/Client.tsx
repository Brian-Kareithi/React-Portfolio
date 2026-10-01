"use client";
import {
  Layers, Boxes, Workflow, GitPullRequest,
  Braces, Database, Cloud, ServerCog, Terminal,
  ArrowUpRight,
} from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";

export const principles = [
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

export const architecture = [
  {
    title: "Frontend",
    icon: <Boxes className="w-4 h-4" />,
    stack: "Next.js · React · TypeScript · Tailwind",
    desc: "Server components, incremental rendering, and design systems. I improve UI performance through architecture, not hacks.",
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
    desc: "Multi-cloud architecture with containers, virtualization, and automation. Built to keep infrastructure costs low without losing reliability.",
  },
  {
    title: "Delivery",
    icon: <GitPullRequest className="w-4 h-4" />,
    stack: "Git · CI/CD · Automated deploy",
    desc: "Repeatable pipelines that take a commit to production automatically, with monitoring and backups built in.",
  },
];

export const workflow = [
  { step: "01", title: "Understand", desc: "Clarify the goal, constraints, and the real users before writing a line of code." },
  { step: "02", title: "Design", desc: "Map the architecture, data flow, and security boundaries on paper first." },
  { step: "03", title: "Build", desc: "Implement in small, reviewable increments with tests alongside the code." },
  { step: "04", title: "Verify", desc: "Test, lint, and profile. Prove it works and is fast under realistic load." },
  { step: "05", title: "Ship", desc: "Deploy through automation, then monitor for regressions and harden." },
  { step: "06", title: "Iterate", desc: "Refactor, learn, measure. Software is a living system, never a finished one." },
];

export const stack = [
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
    <section id="engineering" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3.75 sm:px-7.5 lg:px-12 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="07"
          label="Engineering"
          title={<>How I <em className="font-serif-accent">build</em></>}
          description="Beyond listing languages, this is the way I think about software: architecture that holds up, systems that stay secure, and code that remains a joy to maintain."
        />

        {/* Principles: editorial numbered list */}
        <div className="mb-20">
          <SubTitle kicker="Engineering principles" title="What I optimize for" />
          <ol className="grid gap-x-12 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="flex gap-5 border-t py-7" style={{ borderColor: "var(--color-accent-secondary)" }}>
                <span className="display-xl w-12 flex-shrink-0 text-5xl" style={{ color: "var(--color-accent)" }}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    <span style={{ color: "var(--color-accent-secondary)" }}>{p.icon}</span>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {p.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Architecture: stacked layers, screen at the top, delivery at the bottom */}
        <div className="mb-20">
          <SubTitle kicker="Full-stack architecture" title="From the screen to the server" />
          <div className="space-y-2">
            {architecture.map((a, i) => (
              <div
                key={a.title}
                className="grid items-center gap-3 rounded-2xl border px-5 py-5 md:grid-cols-12 md:gap-6 md:px-8"
                style={{
                  borderColor: "var(--color-border)",
                  // Layers deepen from lavender mist to periwinkle as they go down the stack.
                  backgroundColor: `color-mix(in srgb, var(--palette-periwinkle) ${Math.round((i / (architecture.length - 1)) * 70)}%, var(--palette-lavender-mist))`,
                  marginLeft: `${i * 0.5}rem`,
                  marginRight: `${i * 0.5}rem`,
                }}
              >
                <div className="flex items-center gap-3 md:col-span-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "var(--palette-true-cobalt)", color: "var(--palette-lavender-mist)" }}>
                    {a.icon}
                  </span>
                  <h3 className="font-serif-accent text-2xl" style={{ color: "var(--color-text-primary)" }}>{a.title}</h3>
                </div>
                <p className="font-mono text-xs md:col-span-4" style={{ color: "var(--color-accent)" }}>{a.stack}</p>
                <p className="text-sm leading-relaxed md:col-span-5" style={{ color: "var(--color-text-secondary)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery workflow: a stepper on an ink slab */}
        <div className="ink-slab mb-20 px-6 py-10 sm:px-10 sm:py-12">
          <SubTitle kicker="Delivery workflow" title="From idea to production" />
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px lg:block" style={{ backgroundColor: "var(--color-border)" }} />
            {workflow.map((w) => (
              <li key={w.step} className="relative">
                <span
                  className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-xs"
                  style={{ backgroundColor: "var(--palette-shadow-grey)", borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
                >
                  {w.step}
                </span>
                <h3 className="font-serif-accent mb-1.5 text-2xl" style={{ color: "var(--color-text-primary)" }}>
                  {w.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {w.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Stack + result */}
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SubTitle kicker="Where each tool is used" title="A language for every layer" />
            <div className="grid gap-2 sm:grid-cols-2">
              {stack.map((s) => (
                <div key={s.item} className="flex items-center justify-between gap-3 rounded-full border px-4 py-2.5" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
                  <span className="min-w-0 text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                    {s.item}
                  </span>
                  <span className="text-right text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                    {s.use}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end lg:col-span-2">
            <div className="plate p-7">
              <p className="field-label mb-3 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                The result
              </p>
              <p className="font-serif-accent mb-5 text-2xl leading-snug" style={{ color: "var(--color-text-primary)" }}>
                This portfolio is itself a product of this process.
              </p>
              <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Next.js, TypeScript, a design system, cloud deployment, and analytics, all built with the same discipline I bring to client work.
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
