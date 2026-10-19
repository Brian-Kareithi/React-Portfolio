"use client";
import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { resumeRoles, resumeCertifications, resumeEducation, resumeHistory, type ResumeRoleId } from "@/app/lib/resume-data";
import { siteConfig } from "@/app/lib/site";

export default function ResumeClient() {
  const [activeRole, setActiveRole] = useState<ResumeRoleId>(resumeRoles[0].id);
  const [status, setStatus] = useState<"idle" | "building" | "error">("idle");
  const role = resumeRoles.find((r) => r.id === activeRole)!;
  const roleIndex = resumeRoles.findIndex((r) => r.id === activeRole);

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
    <div id="resume" className="q-page">
      <div className="q-wrap">
        <Breadcrumbs />
        <SectionHeader
          index="07"
          label="Resume"
          title={<>One background, <em>told</em> for the role</>}
          description="Full-stack first. Pick the angle that fits, preview it here, and download it as a PDF."
        />

        <div className="r-layout">
          <aside className="r-controls">
            <p className="q-eyebrow" style={{ marginBottom: "1rem" }}>Choose an angle</p>
            <div role="tablist" aria-label="Resume role" className="r-roles">
              {resumeRoles.map((r) => {
                const active = r.id === activeRole;
                return (
                  <button
                    key={r.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setActiveRole(r.id);
                      setStatus("idle");
                    }}
                    className="r-role"
                  >
                    <span className="r-role-mark" aria-hidden="true" />
                    {r.label}
                    {r.primary && <span className="q-chip">Primary</span>}
                  </button>
                );
              })}
            </div>
            <button onClick={handleDownload} disabled={status === "building"} className="q-btn" data-solid aria-live="polite">
              {status === "building" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Download aria-hidden="true" />}
              {status === "building" ? "Building PDF…" : "Download PDF"}
            </button>
            {status === "error" && (
              <p role="alert" className="q-small">
                Couldn’t build the PDF. Please try again.
              </p>
            )}
          </aside>

          <article key={role.id} className="r-sheet animate-fade-in-up" aria-label={`${role.label} resume`}>
            <header className="r-letterhead">
              <div>
                <h2 className="q-title" style={{ fontSize: "clamp(2.5rem, 1.5rem + 3.5vw, 4.25rem)" }}>{siteConfig.fullName}</h2>
                <p className="r-headline">{role.headline}</p>
              </div>
              <span className="q-mono r-count">{String(roleIndex + 1).padStart(2, "0")} / {String(resumeRoles.length).padStart(2, "0")}</span>
            </header>
            <p className="q-body" style={{ maxWidth: "40rem", fontSize: "1rem" }}>{role.summary}</p>
            <dl className="r-highlights">
              {role.highlights.map((h) => (
                <div key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>

            <div className="r-body">
              <aside className="r-side">
                <section>
                  <h3 className="q-eyebrow">Contact</h3>
                  <dl className="r-contact">
                    <div><dt>Email</dt><dd>{siteConfig.email}</dd></div>
                    <div><dt>Phone</dt><dd>{siteConfig.phoneDisplay}</dd></div>
                    <div><dt>Location</dt><dd>{siteConfig.location}</dd></div>
                    <div><dt>GitHub</dt><dd>github.com/Brian-Kareithi</dd></div>
                    <div><dt>LinkedIn</dt><dd>linkedin.com/in/brian-kareithi-04007637b</dd></div>
                  </dl>
                </section>
                <section>
                  <h3 className="q-eyebrow">Skills</h3>
                  {role.skillGroups.map((g) => (
                    <div key={g.group} className="r-skillgroup">
                      <p className="q-small">{g.group}</p>
                      <div>
                        {g.items.map((skill) => (
                          <span key={skill} className="q-chip">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
                <section>
                  <h3 className="q-eyebrow">Education</h3>
                  <p className="r-strong">{resumeEducation.degree}</p>
                  <p className="q-small">{resumeEducation.institution} · {resumeEducation.period}</p>
                  <p className="q-small">{resumeEducation.note}</p>
                </section>
                <section>
                  <h3 className="q-eyebrow">Certifications</h3>
                  <ul className="r-list">
                    {resumeCertifications.map((cert) => (
                      <li key={cert}>{cert}</li>
                    ))}
                  </ul>
                </section>
              </aside>

              <div className="r-main">
                <section>
                  <h3 className="q-h3">Experience</h3>
                  <div className="r-job">
                    <p className="r-strong">IT Support / Frontend Development, Steadfast Academy</p>
                    <span className="q-mono q-small">2025 - Present</span>
                  </div>
                  <ul className="r-list">
                    {role.experience.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="q-h3">Earlier experience</h3>
                  <ul className="r-history">
                    {resumeHistory.map((j) => (
                      <li key={j.role}>
                        <p className="q-mono q-small">{j.period}</p>
                        <div>
                          <p className="r-strong">{j.role} <span>· {j.org}</span></p>
                          <p className="q-body">{j.line}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="q-h3">Selected projects</h3>
                  <ul className="r-projects">
                    {role.projects.map((p) => (
                      <li key={p.title}>
                        <p className="q-h3" style={{ fontSize: "1.3rem" }}>{p.title}</p>
                        <p className="q-small">{p.note}</p>
                        <p className="q-mono r-stack">{p.stack}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </article>
        </div>

        <NextSection
          title="The full picture"
          links={[
            { href: "/projects", label: "Selected work", description: "Full case studies." },
            { href: "/about", label: "About", description: "Journey, education and certifications." },
            { href: "/contact", label: "Contact", description: "Questions about any of this." },
          ]}
        />
      </div>
    </div>
  );
}
