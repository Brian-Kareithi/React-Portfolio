"use client";
import { useMemo, useState } from "react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { CountUp } from "@/app/components/ui/CountUp";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";

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

const timeline: TimelineItem[] = [
  { title: "KCPE Certificate", institution: "Lily Academy", period: "2013 - 2016", year: 2013, category: "education", description: "Primary education completion with distinction in mathematics and sciences.", significance: "Foundation for analytical thinking", metrics: ["Distinction in STEM subjects", "Early exposure to technology"] },
  { title: "KCSE - Science & Technology", institution: "Thika High School", period: "2017 - 2020", year: 2017, category: "education", description: "Secondary education with focus on sciences and technology.", significance: "Technical foundation development", metrics: ["STEM specialization", "Science competitions participation"] },
  { title: "BSc Information Technology", institution: "Umma University", period: "2021 - Present", year: 2021, category: "education", description: "Undergraduate degree in Information Technology with cybersecurity focus.", significance: "Formal academic foundation in IT", metrics: ["Cybersecurity Club Leadership", "AI/ML research focus"] },
  { title: "Microsoft Azure Fundamentals", institution: "Microsoft", period: "2022", year: 2022, category: "certification", description: "Foundational cloud services certification validating understanding of cloud concepts and Azure services.", significance: "Entry into cloud computing", metrics: ["Cloud concepts mastery", "Azure service fundamentals"] },
  { title: "CompTIA Security+", institution: "CompTIA", period: "2022", year: 2022, category: "certification", description: "Industry-recognized certification validating baseline cybersecurity skills.", significance: "Cybersecurity foundation", metrics: ["Security principles application", "Risk management fundamentals"] },
  { title: "AWS Cloud Practitioner", institution: "Amazon Web Services", period: "2023", year: 2023, category: "certification", description: "Cloud services certification demonstrating AWS cloud concepts.", significance: "Multi-cloud expertise", metrics: ["AWS architecture understanding", "Cost optimization strategies"] },
  { title: "Google Cybersecurity Professional", institution: "Google", period: "2023", year: 2023, category: "certification", description: "Comprehensive cybersecurity certification covering threat detection and security operations.", significance: "Enterprise security methodology", metrics: ["SIEM strategy development", "Incident response automation"] },
  { title: "CCNA", institution: "Cisco", period: "2023", year: 2023, category: "certification", description: "Networking certification validating skills in network fundamentals and security.", significance: "Network infrastructure expertise", metrics: ["Enterprise network design", "Network security implementation"] },
  { title: "IBM Cybersecurity Analyst", institution: "IBM", period: "2024", year: 2024, category: "certification", description: "Advanced certification in threat intelligence and enterprise security management.", significance: "Enterprise security operations", metrics: ["Threat intelligence mastery", "SOC procedure implementation"] },
  { title: "Information Security Specialist", institution: "ICT Authority of Kenya", period: "2022 - 2024", year: 2022, category: "professional", description: "Secured government digital infrastructure and implemented security frameworks.", significance: "Public sector security impact", metrics: ["50,000+ user accounts protected", "75% security incident reduction", "Zero critical vulnerabilities"] },
  { title: "Freelance Full-Stack Developer", institution: "Fiverr & Upwork", period: "2022 - 2024", year: 2022, category: "professional", description: "Delivered secure, high-performance web applications for diverse clients.", significance: "Client-driven development", metrics: ["50+ projects delivered", "100% client satisfaction", "Full-stack architecture expertise"] },
  { title: "Frontend Developer & ICT Support", institution: "Steadfast Academy", period: "2025 - Present", year: 2025, category: "professional", description: "Architected and deployed scalable frontend systems with focus on performance.", significance: "Enterprise-scale frontend", metrics: ["10,000+ users served", "40% UI performance improvement", "React architecture migration"] },
  { title: "Co-Founder & Backend Developer", institution: "Thee Entity Limited", period: "2025 - Present", year: 2025, category: "entrepreneurial", description: "Established technology startup, designed cloud-native solutions.", significance: "Entrepreneurial venture", metrics: ["60% infrastructure cost reduction", "15-minute deployment", "Cloud-native architecture"] },
  { title: "Cybersecurity Leadership", institution: "Future Focus", period: "2026 & Beyond", year: 2026, category: "professional", description: "Aspire to lead enterprise security initiatives and mentor emerging professionals.", significance: "Strategic career progression", metrics: ["Enterprise security leadership", "Open-source contribution", "Professional mentorship"] },
];

const categoryConfig: Record<TimelineItem["category"], { label: string; glyph: string }> = {
  education: { label: "Education", glyph: "▣" },
  certification: { label: "Certifications", glyph: "◈" },
  professional: { label: "Professional", glyph: "◇" },
  entrepreneurial: { label: "Entrepreneurial", glyph: "○" },
};

const filters = ["all", ...Object.keys(categoryConfig)] as const;

const stats = [
  { value: 5, suffix: "+", label: "Years in Tech" },
  { value: 6, suffix: "", label: "Certifications" },
  { value: 3, suffix: "", label: "Sectors" },
  { value: 50, suffix: "+", label: "Projects" },
];

const closing = [
  { title: "Progressive Development", desc: "Each phase builds upon previous knowledge, demonstrating cumulative growth" },
  { title: "Diverse Experience", desc: "Exposure across public sector, private enterprise, and entrepreneurial ventures" },
  { title: "Strategic Focus", desc: "Current emphasis on scalable solutions and professional mentorship" },
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
      className="relative min-h-screen w-full px-3 py-24 xs:px-4 xs:py-28 sm:py-32 md:py-36"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <ScrollReveal>
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumbs />
          <SectionHeader
            index="01"
            label="Journey"
            title={<>Professional <em className="font-serif-accent">journey</em></>}
            description="Academic foundation, technical certifications, and professional experience demonstrating deliberate growth and specialization."
          />

          {/* Stats */}
          <div className="mb-14 grid grid-cols-2 border-y md:grid-cols-4" style={{ borderColor: "var(--color-border)" }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="px-3 py-6 text-center xs:py-8"
                style={{
                  borderLeft: i % 2 === 0 ? "none" : "1px solid var(--color-border)",
                  borderTop: i >= 2 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <span className="mb-1 block text-3xl font-bold xs:text-4xl" style={{ color: "var(--color-accent)" }}>
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                <span className="field-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = f === filter;
              const label = f === "all" ? "All" : categoryConfig[f as TimelineItem["category"]].label;
              return (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setOpenId(null);
                  }}
                  className="rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200"
                  style={
                    active
                      ? { backgroundColor: "var(--color-accent)", color: "var(--color-text-light)" }
                      : { border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }
                  }
                >
                  {label}
                  <span className="ml-1.5 font-mono opacity-60">{counts[f] ?? 0}</span>
                </button>
              );
            })}
          </div>

          {/* Timeline */}
          <div>
            <ol className="relative">
              {items.map((item) => {
                const id = timeline.indexOf(item);
                const open = openId === id;
                return (
                  <li
                    key={id}
                    className="grid grid-cols-[3.25rem_1fr] gap-3 xs:grid-cols-[4.5rem_1fr] xs:gap-5"
                  >
                    <div className="pt-4 text-right">
                      <span className="index-num text-xs xs:text-sm">{item.year}</span>
                    </div>
                    <div className="relative border-l pb-2 pl-4 xs:pl-6" style={{ borderColor: "var(--color-border)" }}>
                      <span
                        className="absolute -left-[4.5px] top-[1.35rem] h-2 w-2 rounded-full"
                        style={{ backgroundColor: "var(--color-accent)" }}
                      />
                      <button
                        onClick={() => setOpenId(open ? null : id)}
                        className="group w-full py-3.5 text-left"
                        aria-expanded={open}
                      >
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="field-label" style={{ color: "var(--color-accent)" }}>
                            {categoryConfig[item.category].glyph} {categoryConfig[item.category].label}
                          </span>
                          <span className="font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                            {item.period}
                          </span>
                        </div>
                        <h3
                          className="text-base font-bold transition-colors duration-200 group-hover:text-[var(--color-accent)] xs:text-lg"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                          {item.institution}
                        </p>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                          {item.description}
                        </p>
                      </button>

                      {(item.significance || item.metrics) && (
                        <div className={open ? "animate-fade-in-up pb-4" : "hidden"}>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {item.significance && (
                              <div className="border p-4" style={{ borderColor: "var(--color-glass-border-strong)" }}>
                                <p className="field-label mb-2" style={{ color: "var(--color-accent)" }}>
                                  Significance
                                </p>
                                <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                                  {item.significance}
                                </p>
                              </div>
                            )}
                            {item.metrics && (
                              <div className="border p-4" style={{ borderColor: "var(--color-glass-border-strong)" }}>
                                <p className="field-label mb-2">Key Metrics</p>
                                <ul className="space-y-1.5">
                                  {item.metrics.map((m) => (
                                    <li
                                      key={m}
                                      className="flex items-start gap-2 text-xs xs:text-sm"
                                      style={{ color: "var(--color-text-secondary)" }}
                                    >
                                      <span
                                        className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                                        style={{ backgroundColor: "var(--color-accent)" }}
                                      />
                                      {m}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Closing */}
          <StaggerReveal staggerDelay={90}>
            <div className="mt-14 grid gap-3 xs:grid-cols-2 md:grid-cols-3">
              {closing.map((c) => (
                <div key={c.title} className="border p-5 xs:p-6" style={{ borderColor: "var(--color-glass-border-strong)" }}>
                  <div className="mb-3 h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} />
                  <h4 className="mb-1.5 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
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
            title="Explore the toolbox"
            description="The capabilities behind the journey, and the work it produces."
            links={[
              { href: "/techstack", label: "Tech Stack", description: "Languages, frameworks, platforms and proficiency levels." },
              { href: "/expertise", label: "Expertise", description: "Six hands-on domains, from silicon to cloud-native." },
              { href: "/projects", label: "Selected Work", description: "Delivered products, apps and experiments I'm proud of." },
            ]}
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
