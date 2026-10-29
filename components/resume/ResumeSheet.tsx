import { Eyebrow } from "@/components/ui/Eyebrow";
import { currentRole } from "@/data/about";
import { resumeCertifications, resumeEducation, resumeHistory, type ResumeRole } from "@/data/resume";
import { siteConfig } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

/** On-screen preview of the resume for one role, mirroring the PDF layout. */
export function ResumeSheet({ role, position, total }: { role: ResumeRole; position: number; total: number }) {
  return (
    <article className="r-sheet animate-fade-in-up" aria-label={`${role.label} resume`}>
      <header className="r-letterhead">
        <div>
          <h2 className="q-title" style={{ fontSize: "clamp(2.5rem, 1.5rem + 3.5vw, 4.25rem)" }}>
            {siteConfig.name}
          </h2>
          <p className="r-headline">{role.headline}</p>
        </div>
        <span className="q-mono r-count">
          {pad(position)} / {pad(total)}
        </span>
      </header>
      <p className="q-body" style={{ maxWidth: "40rem", fontSize: "1rem" }}>
        {role.summary}
      </p>
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
            <Eyebrow as="h3">Contact</Eyebrow>
            <dl className="r-contact">
              <div><dt>Email</dt><dd>{siteConfig.email}</dd></div>
              <div><dt>Phone</dt><dd>{siteConfig.phoneDisplay}</dd></div>
              <div><dt>Location</dt><dd>{siteConfig.location}</dd></div>
              <div><dt>GitHub</dt><dd>github.com/Brian-Kareithi</dd></div>
              <div><dt>LinkedIn</dt><dd>linkedin.com/in/brian-kareithi-04007637b</dd></div>
            </dl>
          </section>
          <section>
            <Eyebrow as="h3">Skills</Eyebrow>
            {role.skillGroups.map((group) => (
              <div key={group.group} className="r-skillgroup">
                <p className="q-small">{group.group}</p>
                <div>
                  {group.items.map((skill) => (
                    <span key={skill} className="q-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section>
            <Eyebrow as="h3">Education</Eyebrow>
            <p className="r-strong">{resumeEducation.degree}</p>
            <p className="q-small">
              {resumeEducation.institution} · {resumeEducation.period}
            </p>
            <p className="q-small">{resumeEducation.note}</p>
          </section>
          <section>
            <Eyebrow as="h3">Certifications</Eyebrow>
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
              <p className="r-strong">
                {currentRole.role}, {currentRole.company}
              </p>
              <span className="q-mono q-small">{currentRole.period}</span>
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
              {resumeHistory.map((job) => (
                <li key={job.role}>
                  <p className="q-mono q-small">{job.period}</p>
                  <div>
                    <p className="r-strong">
                      {job.role} <span>· {job.org}</span>
                    </p>
                    <p className="q-body">{job.line}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="q-h3">Selected projects</h3>
            <ul className="r-projects">
              {role.projects.map((project) => (
                <li key={project.title}>
                  <p className="q-h3" style={{ fontSize: "1.3rem" }}>
                    {project.title}
                  </p>
                  <p className="q-small">{project.note}</p>
                  <p className="q-mono r-stack">{project.stack}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
