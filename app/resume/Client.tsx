"use client";
import { useEffect, useState } from "react";
import { Printer, CheckCircle, Info } from "lucide-react";
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
  const roleIndex = resumeRoles.findIndex((r) => r.id === activeRole);
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Give the saved PDF a meaningful filename, e.g. Brian-Kareithi-Resume-Software-Engineering.pdf
  useEffect(() => {
    const original = document.title;
    const fileTitle = `Brian-Kareithi-Resume-${role.label.replace(/\s+/g, "-")}`;
    const apply = () => {
      document.title = fileTitle;
    };
    const restore = () => {
      document.title = original;
    };
    window.addEventListener("beforeprint", apply);
    window.addEventListener("afterprint", restore);
    return () => {
      window.removeEventListener("beforeprint", apply);
      window.removeEventListener("afterprint", restore);
      document.title = original;
    };
  }, [role.label]);

  const handlePrint = () => {
    document.title = `Brian-Kareithi-Resume-${role.label.replace(/\s+/g, "-")}`;
    window.print();
  };

  return (
    <section id="resume" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <div className="no-print"><Breadcrumbs /></div>

        {/* ── Screen version ─────────────────────────────────── */}
        <div className="resume-screen">
          <SectionHeader
            index="07"
            label="Resume"
            variant="center"
            title={<>One background, <em className="font-serif-accent">tailored</em></>}
            description="The same experience and projects, reordered and re-weighted for the role you're hiring for. Switch the tab, or print this page for a role-specific PDF."
          />

          {/* Role switcher: segmented pill */}
          <div className="no-print mb-4 flex flex-col items-center gap-4">
            <div className="inline-flex flex-wrap justify-center gap-1 rounded-xl border p-1" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }} role="tablist" aria-label="Resume role">
              {resumeRoles.map((r) => {
                const active = r.id === activeRole;
                return (
                  <button
                    key={r.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveRole(r.id)}
                    className="min-h-[44px] rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                    style={
                      active
                        ? { backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }
                        : { color: "var(--color-text-secondary)" }
                    }
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
            <button onClick={handlePrint} className="btn-neon btn-neon-ghost">
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print / Save as PDF: {role.label}
            </button>
          </div>
          <p className="no-print mx-auto mb-12 flex max-w-xl items-start justify-center gap-2 text-center text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            <span>In the print dialog choose “Save as PDF”, A4, margins Default, and tick <strong>Background graphics</strong> for full colour.</span>
          </p>

          {/* The sheet */}
          <article
            key={role.id}
            className="animate-fade-in-up mx-auto overflow-hidden rounded-2xl border"
            style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--surface-shadow)" }}
          >
            {/* Letterhead */}
            <header className="border-b px-6 py-8 sm:px-10" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="display-xl text-4xl sm:text-5xl" style={{ color: "var(--color-text-primary)" }}>
                    {siteConfig.fullName}
                  </h2>
                  <p className="mt-2 font-serif-accent text-xl" style={{ color: "var(--color-accent)" }}>{role.headline}</p>
                </div>
                <span className="pill font-mono !text-[11px]">{String(roleIndex + 1).padStart(2, "0")} / {String(resumeRoles.length).padStart(2, "0")}</span>
              </div>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {role.summary}
              </p>
            </header>

            <div className="grid lg:grid-cols-3">
              {/* Sidebar */}
              <aside className="flex flex-col gap-7 px-6 py-8 sm:px-10 lg:col-span-1 lg:px-8" style={{ backgroundColor: "var(--color-highlight)" }}>
                <SpecSheet
                  title="Contact"
                  rows={[
                    { k: "Email", v: siteConfig.email },
                    { k: "Phone", v: siteConfig.phoneDisplay },
                    { k: "Location", v: siteConfig.location },
                    { k: "GitHub", v: "github.com/Brian-Kareithi" },
                    { k: "LinkedIn", v: "linkedin.com/in/brian-kareithi-04007637b" },
                  ]}
                />

                <div>
                  <p className="field-label mb-3">Top skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.topSkills.map((skill) => (
                      <span key={skill} className="rounded-md px-2.5 py-1 font-mono text-[11px]"
                        style={{ backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="field-label mb-3">Education</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{resumeEducation.degree}</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{resumeEducation.institution} · {resumeEducation.period}</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--color-text-secondary)" }}>{resumeEducation.note}</p>
                </div>

                <div>
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
              </aside>

              {/* Main column */}
              <div className="flex flex-col gap-10 px-6 py-8 sm:px-10 lg:col-span-2">
                <section>
                  <h3 className="display-xl mb-4 text-2xl" style={{ color: "var(--color-text-primary)" }}>Experience</h3>
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold sm:text-base" style={{ color: "var(--color-text-primary)" }}>
                      IT Support / Frontend Development, Steadfast Academy
                    </p>
                    <span className="pill !py-0.5 !text-[11px]">2025 - Present</span>
                  </div>
                  <ul className="space-y-2">
                    {role.experience.map((line) => (
                      <li key={line} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                        {line}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="display-xl mb-4 text-2xl" style={{ color: "var(--color-text-primary)" }}>Selected projects</h3>
                  <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {role.projects.map((p) => (
                      <div key={p.title} className="rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
                        <p className="font-serif-accent text-lg" style={{ color: "var(--color-text-primary)" }}>{p.title}</p>
                        <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{p.note}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </article>

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

        {/* ── Print-only PDF document ──────────────────────────
            Hidden on screen, shown only in @media print.
            Uses fixed light-theme hex values so dark mode never
            bleeds into the PDF. */}
        <div className="resume-print" aria-hidden="true">
          {/* Banner */}
          <div className="rp-banner">
            <div className="rp-banner-top">
              <span className="rp-kicker">Brian Kareithi · Resume · {role.label}</span>
              <span className="rp-kicker rp-kicker-right">{today} · {String(roleIndex + 1).padStart(2, "0")} / {String(resumeRoles.length).padStart(2, "0")}</span>
            </div>
            <h1 className="rp-name">{siteConfig.fullName}</h1>
            <p className="rp-headline">{role.headline}</p>
            <p className="rp-contact">
              {siteConfig.email} &nbsp;•&nbsp; {siteConfig.phoneDisplay} &nbsp;•&nbsp; {siteConfig.location}
              <br />
              github.com/Brian-Kareithi &nbsp;•&nbsp; linkedin.com/in/brian-kareithi-04007637b &nbsp;•&nbsp; kareithi.vercel.app
            </p>
          </div>

          {/* Summary strip */}
          <div className="rp-summary">
            <p className="rp-section-label">Profile</p>
            <p className="rp-summary-text">{role.summary}</p>
          </div>

          {/* Body grid */}
          <div className="rp-grid">
            {/* Main column */}
            <div className="rp-main">
              <div className="rp-block">
                <div className="rp-section-head">
                  <span className="rp-dot" />
                  <h2 className="rp-section-title">Experience</h2>
                </div>
                <div className="rp-job-head">
                  <p className="rp-job-title">IT Support / Frontend Development, Steadfast Academy</p>
                  <span className="rp-job-period">2025 – Present</span>
                </div>
                <ul className="rp-list">
                  {role.experience.map((line) => (
                    <li key={line} className="rp-list-item">
                      <span className="rp-bullet" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rp-block">
                <div className="rp-section-head">
                  <span className="rp-dot" />
                  <h2 className="rp-section-title">Selected Projects</h2>
                </div>
                <div className="rp-projects">
                  {role.projects.map((p) => (
                    <div key={p.title} className="rp-project">
                      <p className="rp-project-title">{p.title}</p>
                      <p className="rp-project-note">{p.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="rp-side">
              <div className="rp-block rp-side-block">
                <h2 className="rp-section-title rp-section-title-sm">Top Skills</h2>
                <div className="rp-skills">
                  {role.topSkills.map((skill) => (
                    <span key={skill} className="rp-skill">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="rp-block rp-side-block">
                <h2 className="rp-section-title rp-section-title-sm">Education</h2>
                <p className="rp-edu-degree">{resumeEducation.degree}</p>
                <p className="rp-edu-meta">{resumeEducation.institution} · {resumeEducation.period}</p>
                <p className="rp-edu-note">{resumeEducation.note}</p>
              </div>

              <div className="rp-block rp-side-block">
                <h2 className="rp-section-title rp-section-title-sm">Certifications</h2>
                <ul className="rp-certs">
                  {resumeCertifications.map((cert) => (
                    <li key={cert} className="rp-cert">
                      <span className="rp-check">✓</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rp-block rp-side-block">
                <h2 className="rp-section-title rp-section-title-sm">Contact</h2>
                <dl className="rp-contact-list">
                  <div className="rp-contact-row"><dt>Email</dt><dd>{siteConfig.email}</dd></div>
                  <div className="rp-contact-row"><dt>Phone</dt><dd>{siteConfig.phoneDisplay}</dd></div>
                  <div className="rp-contact-row"><dt>Location</dt><dd>{siteConfig.location}</dd></div>
                  <div className="rp-contact-row"><dt>GitHub</dt><dd>github.com/Brian-Kareithi</dd></div>
                  <div className="rp-contact-row"><dt>LinkedIn</dt><dd>linkedin.com/in/brian-kareithi-04007637b</dd></div>
                  <div className="rp-contact-row"><dt>Portfolio</dt><dd>kareithi.vercel.app</dd></div>
                </dl>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="rp-footer">
            <span>Tailored for: {role.label} · Generated {today} from kareithi.vercel.app/resume</span>
            <span className="rp-footer-accent">■ ■ ■</span>
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
