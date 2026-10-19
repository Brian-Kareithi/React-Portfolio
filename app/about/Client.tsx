"use client";
import { useMemo, useState } from "react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import Testimonials from "@/app/components/Testimonials";
import { Assemble } from "@/app/components/ui/Assemble";

export const experience = {
  role: "IT Support / Frontend Development",
  company: "Steadfast Academy",
  period: "2025 - Present",
  summary: "I build and support the systems a school runs on every day. Real users, real deadlines, no room for downtime.",
  duties: [
    "Teacher and Parent portals (Next.js, React)",
    "Parent mobile app (Expo / React Native)",
    "Frontend integration with backend APIs",
    "School information systems",
    "User support and troubleshooting",
    "IT infrastructure support",
  ],
};

interface TimelineItem {
  title: string;
  institution: string;
  period: string;
  year: number;
  description: string;
  category: "education" | "certification" | "professional" | "entrepreneurial";
  significance?: string;
  metrics?: string[];
}

export const timeline: TimelineItem[] = [
  { title: "KCPE Certificate", institution: "Lily Academy", period: "2013 - 2016", year: 2013, category: "education", description: "Primary school, with distinction in maths and sciences.", metrics: ["Distinction in STEM subjects"] },
  { title: "KCSE, Science & Technology", institution: "Thika High School", period: "2017 - 2020", year: 2017, category: "education", description: "Secondary school with a science and technology focus.", metrics: ["STEM specialization", "Science competitions"] },
  { title: "BSc Information Technology", institution: "Umma University", period: "Graduated", year: 2021, category: "education", description: "Degree in IT with a cybersecurity focus.", metrics: ["Cybersecurity Club leadership", "AI/ML research focus"] },
  { title: "Microsoft Azure Fundamentals", institution: "Microsoft", period: "2022", year: 2022, category: "certification", description: "Cloud concepts and core Azure services." },
  { title: "CompTIA Security+", institution: "CompTIA", period: "2022", year: 2022, category: "certification", description: "Baseline cybersecurity skills and risk management." },
  { title: "AWS Cloud Practitioner", institution: "Amazon Web Services", period: "2023", year: 2023, category: "certification", description: "AWS cloud concepts, architecture and cost." },
  { title: "Google Cybersecurity Professional", institution: "Google", period: "2023", year: 2023, category: "certification", description: "Threat detection and security operations." },
  { title: "CCNA", institution: "Cisco", period: "2023", year: 2023, category: "certification", description: "Network fundamentals and network security." },
  { title: "IBM Cybersecurity Analyst", institution: "IBM", period: "2024", year: 2024, category: "certification", description: "Threat intelligence and enterprise security management." },
  { title: "Information Security Specialist", institution: "ICT Authority of Kenya", period: "2022 - 2024", year: 2022, category: "professional", description: "Security operations for internal government systems.", metrics: ["Security hardening", "Incident monitoring and response", "Vulnerability assessment and fixes"] },
  { title: "Freelance Full-Stack Developer", institution: "Fiverr & Upwork", period: "2022 - 2024", year: 2022, category: "professional", description: "Web applications for freelance clients.", metrics: ["50+ small to mid-sized projects", "Consistently positive client feedback"] },
  { title: "IT Support / Frontend Development", institution: "Steadfast Academy", period: "2025 - Present", year: 2025, category: "professional", description: "Teacher and Parent portals, a mobile app and day-to-day IT support.", metrics: ["Teacher & Parent portals (Next.js, React)", "Parent mobile app (Expo / React Native)", "School information systems"] },
  { title: "Co-Founder & Backend Developer", institution: "Thee Entity Limited", period: "2025 - Present", year: 2025, category: "entrepreneurial", description: "Co-founded a small tech studio building cloud-native products.", metrics: ["Cloud-native architecture", "Automated deployment pipeline", "Infrastructure on a lean budget"] },
  { title: "Cybersecurity Leadership", institution: "Future Focus", period: "2026 & Beyond", year: 2026, category: "professional", description: "Next: lead security initiatives and mentor newcomers.", metrics: ["Enterprise security leadership", "Open-source contribution", "Mentorship"] },
];

const categoryConfig = {
  education: { label: "Education" },
  certification: { label: "Certifications" },
  professional: { label: "Professional" },
  entrepreneurial: { label: "Entrepreneurial" },
} as const;

const filters = ["all", ...Object.keys(categoryConfig)] as const;

const closing = [
  { title: "I adapt fast", desc: "Government, freelance clients, a school and a startup. Each asked for something different." },
  { title: "One picture", desc: "Development, support, networking and security are one skill set, and each makes me better at the others." },
  { title: "Still learning", desc: "Six certifications since 2022 and a lab I maintain by hand." },
];

export default function AboutClient() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [openId, setOpenId] = useState<number | null>(null);

  const items = useMemo(() => {
    const list = [...timeline].sort((a, b) => a.year - b.year || 0);
    return filter === "all" ? list : list.filter((i) => i.category === filter);
  }, [filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: timeline.length };
    for (const item of timeline) c[item.category] = (c[item.category] || 0) + 1;
    return c;
  }, []);

  return (
    <div id="about" className="q-page">
      <div className="q-wrap">
        <Breadcrumbs />
        <SectionHeader
          index="01"
          label="Journey"
          title={<>How I got <em>good</em> at this</>}
          description="From a science classroom to government security, fifty-plus client projects, a startup and live systems at a school."
        />

        <section aria-labelledby="now-title" className="a-now">
          <p className="q-eyebrow"><b>●</b> Now · {experience.period}</p>
          <div className="a-now-body">
            <div>
              <h2 id="now-title" data-split className="q-h2">{experience.role}</h2>
              <p className="a-now-company">{experience.company}</p>
              <p className="q-body" style={{ maxWidth: "30rem", marginTop: "1.25rem" }}>{experience.summary}</p>
            </div>
            <ul className="a-duties">
              {experience.duties.map((duty) => (
                <li key={duty}>{duty}</li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="chapters-title" className="a-chapters">
          <aside className="a-rail">
            <h2 id="chapters-title" className="q-eyebrow"><b>02</b> Chapters</h2>
            <div className="a-filters" role="group" aria-label="Filter the timeline">
              {filters.map((f) => {
                const active = f === filter;
                const label = f === "all" ? "Everything" : categoryConfig[f as TimelineItem["category"]].label;
                return (
                  <button
                    key={f}
                    className="q-tab"
                    aria-pressed={active}
                    onClick={() => {
                      setFilter(f);
                      setOpenId(null);
                    }}
                  >
                    {label}
                    <sup>{counts[f] ?? 0}</sup>
                  </button>
                );
              })}
            </div>
          </aside>

          <ol className="a-line">
            {items.map((item) => {
              const id = timeline.indexOf(item);
              const open = openId === id;
              const { label } = categoryConfig[item.category];
              return (
                <li key={id} className="a-item">
                  <span className="a-dot" aria-hidden="true" />
                  <p className="a-when">{item.period}</p>
                  <div>
                    <h3 className="q-h3">{item.title}</h3>
                    <p className="a-where">
                      {item.institution}
                      <span className="sr-only"> ({label})</span>
                    </p>
                    <p className="q-body" style={{ marginTop: "0.6rem", maxWidth: "36rem" }}>{item.description}</p>
                    {(item.significance || item.metrics) && (
                      <>
                        <button
                          type="button"
                          onClick={() => setOpenId(open ? null : id)}
                          className="q-link"
                          aria-expanded={open}
                          aria-controls={`timeline-details-${id}`}
                        >
                          {open ? "Less" : "Highlights"}
                          <span className="sr-only">: {item.title}</span>
                        </button>
                        <div id={`timeline-details-${id}`} className={open ? "animate-fade-in-up" : "hidden"}>
                          {item.significance && <p className="q-body" style={{ marginBottom: "0.5rem" }}>{item.significance}</p>}
                          {item.metrics && (
                            <ul className="a-metrics">
                              {item.metrics.map((m) => (
                                <li key={m}>{m}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="q-section">
          <div className="a-closing">
            {closing.map((c, i) => (
              <Assemble key={c.title} index={i}>
                <div className="a-closing-item">
                  <p className="q-eyebrow"><b>0{i + 1}</b></p>
                  <h3 className="q-h3">{c.title}</h3>
                  <p className="q-body">{c.desc}</p>
                </div>
              </Assemble>
            ))}
          </div>
        </section>

        <div className="q-section">
          <Testimonials />
        </div>

        <NextSection
          title="Next"
          links={[
            { href: "/how-i-work", label: "How I work", description: "How I take an idea to production." },
            { href: "/projects", label: "Selected work", description: "What I shipped and who uses it." },
            { href: "/resume", label: "Resume", description: "This path, as a PDF." },
          ]}
        />
      </div>
    </div>
  );
}
