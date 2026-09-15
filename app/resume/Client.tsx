"use client";
import { useState } from "react";
import { Printer, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { SpecSheet } from "@/app/components/ui/SpecSheet";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { resumeRoles, resumeCertifications, resumeEducation } from "@/app/lib/resume-data";
import { siteConfig } from "@/app/lib/site";

export default function ResumeClient() {
  const [activeRole, setActiveRole] = useState(resumeRoles[0].id);
  const role = resumeRoles.find((r) => r.id === activeRole)!;

  return (
    <section id="resume" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3 xs:px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <div className="no-print"><Breadcrumbs /></div>
        <SectionHeader
          index="09"
          label="Resume"
          title={<>One background, <em className="font-serif-accent">tailored</em></>}
          description="The same experience and projects, reordered and re-weighted for the role you're hiring for. Switch the tab, or print this page for a role-specific PDF."
        />

        {/* Role switcher */}
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {resumeRoles.map((r) => {
              const active = r.id === activeRole;
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveRole(r.id)}
                  className="rounded-md px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200"
                  style={
                    active
                      ? { backgroundColor: "var(--color-accent)", color: "var(--color-text-light)" }
                      : { border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }
                  }
                >
                  {r.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors duration-200"
            style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
          >
            <Printer className="h-3.5 w-3.5" />
            Print / Save as PDF
          </button>
        </div>

        {/* Header block */}
        <div className="mb-8 border p-5 xs:p-6 md:p-8" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold xs:text-2xl" style={{ color: "var(--color-text-primary)" }}>
                {siteConfig.fullName}
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-accent)" }}>{role.headline}</p>
            </div>
            <span className="index-num">{role.id === "software" ? "01" : role.id === "mobile" ? "02" : "03"} / 03</span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {role.summary}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: contact + skills + education */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <SpecSheet
              title="Contact"
              rows={[
                { k: "Email", v: siteConfig.email },
                { k: "Phone", v: siteConfig.phoneDisplay },
                { k: "Location", v: siteConfig.location },
                { k: "GitHub", v: "github.com/Brian-Kareithi" },
                { k: "LinkedIn", v: "linkedin.com/in/brian-kareithi" },
              ]}
            />

            <div className="border p-5" style={{ borderColor: "var(--color-border)" }}>
              <p className="field-label mb-3">Top Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {role.topSkills.map((skill) => (
                  <span key={skill} className="rounded px-2 py-1 font-mono text-[10px]"
                    style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="border p-5" style={{ borderColor: "var(--color-border)" }}>
              <p className="field-label mb-3">Education</p>
              <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{resumeEducation.degree}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{resumeEducation.institution} · {resumeEducation.period}</p>
              <p className="mt-1 text-xs" style={{ color: "var(--color-text-secondary)" }}>{resumeEducation.note}</p>
            </div>

            <div className="border p-5" style={{ borderColor: "var(--color-border)" }}>
              <p className="field-label mb-3">Certifications</p>
              <ul className="space-y-1.5">
                {resumeCertifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: experience + projects */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="border p-5 xs:p-6" style={{ borderColor: "var(--color-border)" }}>
              <p className="field-label mb-4">Experience</p>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold xs:text-base" style={{ color: "var(--color-text-primary)" }}>
                  IT Support / Frontend Development — Steadfast Academy
                </h3>
                <span className="font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>2025 — Present</span>
              </div>
              <ul className="space-y-2">
                {role.experience.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border p-5 xs:p-6" style={{ borderColor: "var(--color-border)" }}>
              <p className="field-label mb-4">Selected Projects</p>
              <div className="flex flex-col gap-4">
                {role.projects.map((p, i) => (
                  <div key={p.title} className={i > 0 ? "border-t pt-4" : ""} style={{ borderColor: "var(--color-border)" }}>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{p.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{p.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="no-print">
          <NextSection
            title="See the full picture"
            description="This is the condensed version. The full case studies and journey are one click away."
            links={[
              { href: "/projects", label: "Systems I've Built", description: "Full case studies, not just a list of tech." },
              { href: "/about", label: "About", description: "The full journey, education and certifications." },
              { href: "/contact", label: "Contact", description: "Hiring for one of these roles? Start a conversation." },
            ]}
          />
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
