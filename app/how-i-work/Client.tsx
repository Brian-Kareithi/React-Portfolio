"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { MascotNote } from "@/app/components/Mascot";
import BuiltToStandard from "@/app/components/BuiltToStandard";
import { principles, architecture, workflow, domains, techs } from "@/app/lib/skills-data";

export default function HowIWorkClient() {
  const [activeDomain, setActiveDomain] = useState(domains[0].id);
  const current = domains.find((d) => d.id === activeDomain)!;

  return (
    <section id="how-i-work" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="02"
          label="How I work"
          title={<>How I <em className="font-serif-accent">deliver</em></>}
          description="My principles, my stack by layer, and the path from idea to production."
        />

        <MascotNote className="mb-12">
          Short version: I care more about a system that stays up than one that looks clever.
        </MascotNote>

        {/* Principles: editorial numbered list */}
        <div className="mb-20">
          <SubTitle kicker="Principles" title="What I optimise for" />
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
          <SubTitle kicker="Stack by layer" title="From the screen to the server" />
          <div className="space-y-2">
            {architecture.map((a, i) => (
              <div
                key={a.title}
                className="grid items-center gap-3 rounded-xl border px-5 py-5 md:grid-cols-12 md:gap-6 md:px-8"
                style={{
                  borderColor: "var(--color-border)",
                  // Layers deepen from lavender mist to periwinkle as they go down the stack.
                  backgroundColor: `color-mix(in srgb, var(--palette-sand) ${Math.round((i / (architecture.length - 1)) * 70)}%, var(--palette-cream))`,
                  marginLeft: `${i * 0.5}rem`,
                  marginRight: `${i * 0.5}rem`,
                }}
              >
                <div className="flex items-center gap-3 md:col-span-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "var(--palette-ink)", color: "var(--palette-cream)" }}>
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
          <SubTitle kicker="Delivery" title="From idea to production" />
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px lg:block" style={{ backgroundColor: "var(--color-border)" }} />
            {workflow.map((w) => (
              <li key={w.step} className="relative">
                <span
                  className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-xs"
                  style={{ backgroundColor: "var(--palette-espresso)", borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
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

        <BuiltToStandard />

        {/* Capabilities: domain menu + detail */}
        <div className="mb-20">
          <SubTitle kicker="Capabilities" title="What I'm good at" />
          <div className="grid gap-6 lg:grid-cols-12">
            <div
              className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
              role="tablist"
              aria-label="Skill domains"
            >
              {domains.map((d) => {
                const active = d.id === activeDomain;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDomain(d.id)}
                    role="tab"
                    aria-selected={active}
                    className="group flex min-h-[44px] flex-shrink-0 items-center gap-3 rounded-lg border px-4 py-2.5 text-left transition-all duration-200 lg:rounded-xl lg:px-5 lg:py-4"
                    style={{
                      backgroundColor: active ? "var(--color-accent)" : "var(--color-bg-card)",
                      borderColor: active ? "var(--color-accent)" : "var(--color-border)",
                      color: active ? "var(--color-on-accent)" : "var(--color-text-secondary)",
                    }}
                  >
                    <span className="font-mono text-[11px] opacity-70">{d.index}</span>
                    <span className="inline-flex" aria-hidden="true">{d.icon}</span>
                    <span className="whitespace-nowrap text-sm font-medium lg:font-serif-accent lg:text-2xl lg:font-normal">{d.label}</span>
                  </button>
                );
              })}
            </div>

            <div key={current.id} className="plate animate-fade-in-up p-6 xs:p-8 md:p-10 lg:col-span-8">
              <p className="font-mono text-xs mb-4" style={{ color: "var(--color-accent)" }}>
                {current.index} / {String(domains.length).padStart(2, "0")} · {current.label}
              </p>
              <h3 className="display-xl mb-4 text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
                {current.tagline}
              </h3>
              <p className="mb-6 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {current.summary}
              </p>

              <div className="mb-8 flex flex-wrap gap-1.5">
                {current.tools.map((t) => (
                  <span key={t} className="rounded-md border px-3 py-1 font-mono text-[11px]" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="grid gap-3">
                {current.capabilities.map((cap) => (
                  <div key={cap.title} className="flat-card p-5">
                    <h4 className="mb-1.5 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {cap.title}
                    </h4>
                    <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {cap.description}
                    </p>
                    <ul className="space-y-1.5">
                      {cap.points.map((p) => (
                        <li key={p} className="flex items-start gap-1.5 text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                          <CheckCircle className="mt-0.5 w-3 h-3 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Toolbox: everything I use, grouped, without self-rated levels */}
        <div>
          <SubTitle kicker="Toolbox" title="Languages, platforms & tools" />
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {techs.map((category) => (
              <div key={category.heading}>
                <p className="mb-3 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {category.heading}
                </p>
                <StaggerReveal staggerDelay={30}>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li key={item.title} className="flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)" }}>
                      <span className="text-base" style={{ color: "var(--color-accent)" }} aria-hidden="true">{item.icon}</span>
                      {item.title}
                    </li>
                  ))}
                </ul>
                </StaggerReveal>
              </div>
            ))}
          </div>
        </div>

        <NextSection
          title="See it in practice"
          description="The method, applied to real systems."
          links={[
            { href: "/projects", label: "Selected Work", description: "Case studies and live demos." },
            { href: "/troubleshooting", label: "Diagnostics", description: "How I find root causes." },
            { href: "/homelab", label: "Homelab", description: "The infrastructure I run 24/7." },
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
