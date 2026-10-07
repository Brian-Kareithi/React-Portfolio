"use client";
import { useMemo, useState } from "react";
import { CheckCircle, GraduationCap, BadgeCheck, Briefcase, Rocket } from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";

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
  education: { label: "Education", Icon: GraduationCap },
  certification: { label: "Certifications", Icon: BadgeCheck },
  professional: { label: "Professional", Icon: Briefcase },
  entrepreneurial: { label: "Entrepreneurial", Icon: Rocket },
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
    <section
      id="about"
      className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-24 xs:py-28 sm:py-32 md:py-36"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <ScrollReveal>
        <div className="mx-auto w-full max-w-5xl">
          <Breadcrumbs />
          <SectionHeader
            index="01"
            label="Journey"
            variant="split"
            title={<>How I got <em className="font-serif-accent">good</em> at this</>}
            description="From a science classroom to government security, 50+ client projects, a startup and live systems at a school."
          />

          {/* Now */}
          <div className="ink-slab mb-16 grid gap-8 p-7 xs:p-8 md:grid-cols-5 md:p-12">
            <div className="md:col-span-2">
              <p className="pill mb-5 font-mono !text-[11px]">
                <Briefcase className="h-3 w-3" style={{ color: "var(--color-accent)" }} /> Now · {experience.period}
              </p>
              <h2 className="display-xl mb-2 text-3xl sm:text-4xl">{experience.role}</h2>
              <p className="font-serif-accent text-xl" style={{ color: "var(--color-accent)" }}>{experience.company}</p>
              <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {experience.summary}
              </p>
            </div>
            <ul className="grid content-start gap-2.5 sm:grid-cols-2 md:col-span-3">
              {experience.duties.map((duty) => (
                <li key={duty} className="flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                  {duty}
                </li>
              ))}
            </ul>
          </div>

          {/* Filter */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            {filters.map((f) => {
              const active = f === filter;
              const label = f === "all" ? "All" : categoryConfig[f as TimelineItem["category"]].label;
              return (
                <button
                  key={f}
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(f);
                    setOpenId(null);
                  }}
                  className="min-h-[44px] rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-[var(--color-accent)]"
                  style={
                    active
                      ? { backgroundColor: "var(--color-accent)", borderColor: "var(--color-accent)", color: "var(--color-on-accent)" }
                      : { borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)" }
                  }
                >
                  {label}
                  <span className="ml-1.5 font-mono text-xs opacity-70">{counts[f] ?? 0}</span>
                </button>
              );
            })}
          </div>

          {/* Timeline: a central spine with cards alternating either side on wide screens */}
          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px md:left-1/2" style={{ backgroundColor: "var(--color-accent-secondary)" }} />
            {items.map((item, i) => {
              const id = timeline.indexOf(item);
              const open = openId === id;
              const right = i % 2 === 1;
              const { Icon, label } = categoryConfig[item.category];
              return (
                <li key={id} className="relative mb-6 pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-7 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-2 md:left-1/2"
                    style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className={right ? "md:col-start-2" : "md:text-right"}>
                    <div className="flat-card p-5 xs:p-6 text-left">
                      <button
                        onClick={() => setOpenId(open ? null : id)}
                        className="group min-h-[44px] w-full text-left"
                        aria-expanded={open}
                        aria-controls={`timeline-details-${id}`}
                      >
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <span className="font-serif-accent text-3xl leading-none" style={{ color: "var(--color-accent)" }}>{item.year}</span>
                          <span className="pill !py-1 !text-[11px]">{label} · {item.period}</span>
                        </div>
                        <h3
                          className="text-lg font-semibold transition-colors duration-200 group-hover:text-[var(--color-accent)]"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                          {item.institution}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                          {item.description}
                        </p>
                        {item.metrics && (
                          <span className="mt-3 inline-block text-xs font-medium" style={{ color: "var(--color-accent)" }}>
                            {open ? "Less" : "Highlights"}
                          </span>
                        )}
                      </button>

                      {(item.significance || item.metrics) && (
                        <div id={`timeline-details-${id}`} className={open ? "animate-fade-in-up mt-4 space-y-3" : "hidden"}>
                          {item.significance && (
                            <p className="rounded-xl px-4 py-3 text-sm font-medium" style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-text-primary)" }}>
                              {item.significance}
                            </p>
                          )}
                          {item.metrics && (
                            <ul className="space-y-1.5">
                              {item.metrics.map((m) => (
                                <li key={m} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                                  {m}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Closing */}
          <StaggerReveal staggerDelay={90}>
            <div className="mt-16 grid gap-4 xs:grid-cols-2 md:grid-cols-3">
              {closing.map((c, i) => (
                <div key={c.title} className="flat-card p-6">
                  <p className="font-serif-accent mb-3 text-4xl" style={{ color: "var(--color-accent-secondary)" }}>0{i + 1}</p>
                  <h4 className="mb-1.5 text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    {c.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </StaggerReveal>

          <NextSection
            title="Where to next"
            description="How I work, what I built, my resume."
            links={[
              { href: "/resume", label: "Resume", description: "A PDF tailored to the role you are hiring for." },
              { href: "/how-i-work", label: "How I Work", description: "How I take an idea to production." },
              { href: "/projects", label: "Selected Work", description: "What I shipped and who uses it." },
            ]}
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
