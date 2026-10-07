"use client";
import { useState } from "react";
import { Download, Loader2, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { SpecSheet } from "@/app/components/ui/SpecSheet";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { resumeRoles, resumeCertifications, resumeEducation, resumeHistory, type ResumeRoleId } from "@/app/lib/resume-data";
import { siteConfig } from "@/app/lib/site";

export default function ResumeClient() {
  const [activeRole, setActiveRole] = useState<ResumeRoleId>(resumeRoles[0].id);
  const [status, setStatus] = useState<"idle" | "building" | "error">("idle");
  const role = resumeRoles.find((r) => r.id === activeRole)!;
  const roleIndex = resumeRoles.findIndex((r) => r.id === activeRole);

  // The PDF engine is large, so it is only loaded when someone actually downloads.
  const handleDownload = async () => {
    setStatus("building");
    try {
      const [{ pdf }, { ResumePdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ResumePdf"),
      ]);
      const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const blob = await pdf(<ResumePdf role={role} date={date} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Brian-Kareithi-Resume-${role.fileLabel}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="resume" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <Breadcrumbs />

        <div className="resume-screen">
          <SectionHeader
            index="07"
            label="Resume"
            variant="center"
            title={<>One background, <em className="font-serif-accent">told</em> for your role</>}
            description="Full-stack first. Pick the role that fits your opening, preview it, download the PDF."
          />

          {/* Role switcher: segmented pill */}
          <div className="mb-12 flex flex-col items-center gap-4">
            <div className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-xl border p-1" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }} role="tablist" aria-label="Resume role">
              {resumeRoles.map((r) => {
                const active = r.id === activeRole;
                return (
                  <button
                    key={r.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => { setActiveRole(r.id); setStatus("idle"); }}
                    className="min-h-[44px] rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                    style={
                      active
                        ? { backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }
                        : { color: "var(--color-text-secondary)" }
                    }
                  >
                    {r.label}
                    {r.primary && (
                      <span className="ml-2 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ backgroundColor: active ? "rgb(255 255 255 / 0.2)" : "var(--color-highlight)" }}>
                        Primary
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="max-w-xl text-center text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Full-Stack Developer is the role I am looking for. The others come with the territory, so pick whichever matches your opening and I will lead with it.
            </p>
            <button onClick={handleDownload} disabled={status === "building"} className="btn-neon btn-neon-primary w-full justify-center !px-8 !py-4 !text-base shadow-lg disabled:cursor-wait disabled:opacity-70 sm:w-auto" aria-live="polite">
              {status === "building" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
              {status === "building" ? "Building PDF…" : `Download PDF: ${role.label}`}
            </button>
            {status === "error" && (
              <p role="alert" className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Couldn’t build the PDF. Try again, or use the{" "}
                <a href={siteConfig.resumePdf} download className="underline">general resume</a>.
              </p>
            )}
          </div>

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
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t pt-5" style={{ borderColor: "var(--color-border)" }}>
                {role.highlights.map((h) => (
                  <div key={h.label}>
                    <dt className="display-xl text-2xl sm:text-3xl" style={{ color: "var(--color-accent)" }}>{h.value}</dt>
                    <dd className="field-label mt-1">{h.label}</dd>
                  </div>
                ))}
              </dl>
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
                  <p className="field-label mb-3">Skills</p>
                  <div className="flex flex-col gap-4">
                    {role.skillGroups.map((g) => (
                      <div key={g.group}>
                        <p className="mb-1.5 text-[11px] font-medium" style={{ color: "var(--color-text-muted)" }}>{g.group}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {g.items.map((skill) => (
                            <span key={skill} className="rounded-md px-2.5 py-1 font-mono text-[11px]"
                              style={{ backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)" }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
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
                  <h3 className="display-xl mb-4 text-2xl" style={{ color: "var(--color-text-primary)" }}>Earlier experience</h3>
                  <ul className="space-y-4">
                    {resumeHistory.map((j) => (
                      <li key={j.role}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{j.role}, {j.org}</p>
                          <span className="pill !py-0.5 !text-[11px]">{j.period}</span>
                        </div>
                        <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>{j.line}</p>
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
                        <p className="mt-2 font-mono text-[10px]" style={{ color: "var(--color-accent)" }}>{p.stack}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </article>

          <div>
            <NextSection
              title="See the full picture"
              description="This is the short version."
              links={[
                { href: "/projects", label: "Selected Work", description: "Full case studies." },
                { href: "/about", label: "About", description: "Journey, education and certifications." },
                { href: "/contact", label: "Contact", description: "Hiring for one of these roles?" },
              ]}
            />
          </div>
        </div>

      </div>
      </ScrollReveal>
    </section>
  );
}
