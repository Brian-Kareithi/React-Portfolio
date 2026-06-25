"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";

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

const groupedTimeline = timeline.reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, TimelineItem[]>);

Object.keys(groupedTimeline).forEach((c) => groupedTimeline[c].sort((a, b) => a.year - b.year));

const categoryConfig: Record<string, { label: string; icon: string }> = {
  education: { label: "Education", icon: "▣" },
  certification: { label: "Certifications", icon: "◈" },
  professional: { label: "Professional", icon: "◇" },
  entrepreneurial: { label: "Entrepreneurial", icon: "○" },
};

const tabs = Object.keys(categoryConfig);

export default function About() {
  const [activeTab, setActiveTab] = useState("education");
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeItems = groupedTimeline[activeTab] || [];

  const handleTabChange = (tab: string) => {
    if (tab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setActiveTab(tab);
    setActiveSubTab(0);
    if (contentRef.current) contentRef.current.scrollTop = 0;
    setTimeout(() => setIsTransitioning(false), 300);
  };

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setActiveSubTab(0);
    /* eslint-enable */
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        const idx = tabs.indexOf(activeTab);
        if (e.key === "ArrowRight") handleTabChange(tabs[(idx + 1) % tabs.length]);
        if (e.key === "ArrowLeft") handleTabChange(tabs[(idx - 1 + tabs.length) % tabs.length]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab]);

  return (
    <section id="about" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3 xs:px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="absolute top-0 left-0 w-1/3 h-px"
        style={{ background: `linear-gradient(to right, transparent, var(--color-accent))` }} />
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 xs:mb-16 sm:mb-20 animate-fade-in-up">
          <p className="text-[9px] xs:text-[10px] font-medium tracking-[0.3em] uppercase mb-2 xs:mb-3"
            style={{ color: "var(--color-text-muted)" }}>
            Career Chronicle
          </p>
          <div className="flex items-center justify-center gap-2 xs:gap-3 mb-4 xs:mb-6">
            <div className="w-6 xs:w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--color-text-primary)" }}>
              Professional Journey
            </h2>
            <div className="w-6 xs:w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
          </div>
          <p className="max-w-2xl mx-auto text-xs xs:text-sm leading-relaxed px-2 xs:px-0"
            style={{ color: "var(--color-text-secondary)" }}>
            Academic foundation, technical certifications, and professional experience
            demonstrating deliberate growth and specialization.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-12 xs:mb-16 sm:mb-20">
          {[
            { label: "Years in Tech", value: "5+" },
            { label: "Certifications", value: "6" },
            { label: "Sectors", value: "3" },
            { label: "Projects", value: "50+" },
          ].map((stat) => (
            <div key={stat.label}
              className="stagger-item text-center py-6 xs:py-8 px-2 xs:px-4 transition-all duration-300 hover:-translate-y-1 border-l-2 liquid-card hover:liquid-card-hover rounded-xl"
              style={{
                borderColor: "var(--color-accent)",
              }}>
              <div className="text-2xl xs:text-3xl font-bold mb-1"
                style={{ color: "var(--color-accent)" }}>
                {stat.value}
              </div>
              <div className="text-[9px] xs:text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="border" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex border-b overflow-x-auto" style={{ borderColor: "var(--color-border)" }}>
            {tabs.map((tab) => (
              <button key={tab} onClick={() => handleTabChange(tab)}
                className={`stagger-item flex-1 px-2 xs:px-3 sm:px-5 py-3 xs:py-4 text-[10px] xs:text-xs font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap relative ${activeTab === tab ? "liquid-card" : ""}`}
                style={{
                  color: activeTab === tab ? "var(--color-accent)" : "var(--color-text-muted)",
                  transition: "color 0.3s ease, background 0.3s ease",
                }}>
                {/* Tab indicator bar */}
                <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-in-out ${activeTab === tab ? "w-full" : "w-0"}`}
                  style={{ backgroundColor: "var(--color-accent)" }} />
                
                <span className="mr-1 xs:mr-2">{categoryConfig[tab].icon}</span>
                {categoryConfig[tab].label}
                <span className="ml-1 xs:ml-2 text-[9px] xs:text-[10px] font-mono" style={{ opacity: 0.5 }}>
                  {String(groupedTimeline[tab]?.length || 0).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:flex lg:flex-col w-64 flex-shrink-0 border-r"
              style={{ borderColor: "var(--color-border)" }}>
              {activeItems.map((item, index) => (
                <button key={index} onClick={() => setActiveSubTab(index)}
                  className="text-left px-5 py-4 transition-all duration-200"
                  style={{
                    backgroundColor: activeSubTab === index ? "var(--color-bg-card)" : "transparent",
                    borderLeft: activeSubTab === index ? `2px solid var(--color-accent)` : "2px solid transparent",
                  }}>
                  <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                    {item.year}
                  </span>
                  <div className="text-sm font-medium mt-0.5"
                    style={{ color: activeSubTab === index ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>
                    {item.title}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {item.institution}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex-1 min-h-[400px] xs:min-h-[450px] sm:min-h-[500px] p-4 xs:p-5 sm:p-8 md:p-10 relative overflow-hidden" ref={contentRef}>
              {/* Content transition wrapper */}
              <div className={`transition-all duration-300 ease-in-out ${
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}>
                {activeItems.length > 0 && activeSubTab < activeItems.length && (
                  <div className="animate-fade-in-up">
                    <div className="flex items-center gap-3 xs:gap-4 mb-2">
                      <span className="font-mono text-[10px] xs:text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {activeItems[activeSubTab].period}
                      </span>
                      <div className="h-px flex-1" style={{ backgroundColor: "var(--color-border)" }} />
                    </div>
                    <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 xs:mb-3"
                      style={{ color: "var(--color-text-primary)" }}>
                      {activeItems[activeSubTab].title}
                    </h3>
                    <p className="text-[10px] xs:text-xs sm:text-sm tracking-wider uppercase mb-4 xs:mb-6"
                      style={{ color: "var(--color-text-muted)" }}>
                      {activeItems[activeSubTab].institution}
                    </p>
                    <div className="w-10 xs:w-12 h-px mb-6 xs:mb-8"
                      style={{ backgroundColor: "var(--color-accent)" }} />
                    <p className="leading-relaxed text-sm xs:text-base mb-6 xs:mb-8 sm:mb-10"
                      style={{ color: "var(--color-text-secondary)" }}>
                      {activeItems[activeSubTab].description}
                    </p>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
                      {activeItems[activeSubTab].significance && (
                        <div className="p-4 xs:p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 liquid-card hover:liquid-card-hover rounded-xl"
                          style={{
                            borderColor: "var(--color-glass-border-strong)",
                          }}>
                          <p className="text-[9px] xs:text-[10px] font-medium tracking-[0.15em] uppercase mb-2 xs:mb-3"
                            style={{ color: "var(--color-accent)" }}>
                            Significance
                          </p>
                          <p className="font-medium text-sm xs:text-base"
                            style={{ color: "var(--color-text-primary)" }}>
                            {activeItems[activeSubTab].significance}
                          </p>
                        </div>
                      )}
                      {activeItems[activeSubTab].metrics && (
                        <div className="p-4 xs:p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 liquid-card hover:liquid-card-hover rounded-xl"
                          style={{
                            borderColor: "var(--color-glass-border-strong)",
                          }}>
                          <p className="text-[9px] xs:text-[10px] font-medium tracking-[0.15em] uppercase mb-2 xs:mb-3"
                            style={{ color: "var(--color-text-muted)" }}>
                            Key Metrics
                          </p>
                          <ul className="space-y-1.5 xs:space-y-2">
                            {activeItems[activeSubTab].metrics!.map((metric, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs xs:text-sm"
                                style={{ color: "var(--color-text-secondary)" }}>
                                <span className="mt-0.5 xs:mt-1 flex-shrink-0" style={{ color: "var(--color-accent)" }}>—</span>
                                {metric}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="md:hidden flex items-center justify-between mt-6 xs:mt-8 pt-4 xs:pt-6"
                      style={{ borderTop: "1px solid var(--color-border)" }}>
                      <button onClick={() => setActiveSubTab(Math.max(0, activeSubTab - 1))}
                        disabled={activeSubTab === 0}
                        className="flex items-center gap-1 text-xs xs:text-sm disabled:opacity-30 transition-all min-h-[44px] justify-center"
                        style={{ color: "var(--color-text-secondary)" }}>
                        <ChevronLeft className="w-3.5 h-3.5 xs:w-4 xs:h-4" /> <span className="hidden xs:inline">Previous</span>
                      </button>
                      <span className="text-[10px] xs:text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                        {String(activeSubTab + 1).padStart(2, "0")}/{String(activeItems.length).padStart(2, "0")}
                      </span>
                      <button onClick={() => setActiveSubTab(Math.min(activeItems.length - 1, activeSubTab + 1))}
                        disabled={activeSubTab === activeItems.length - 1}
                        className="flex items-center gap-1 text-xs xs:text-sm disabled:opacity-30 transition-all min-h-[44px] justify-center"
                        style={{ color: "var(--color-text-secondary)" }}>
                        <span className="hidden xs:inline">Next</span> <ChevronRight className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mt-8 xs:mt-10 sm:mt-12">
          {[
            { title: "Progressive Development", desc: "Each phase builds upon previous knowledge, demonstrating cumulative growth" },
            { title: "Diverse Experience", desc: "Exposure across public sector, private enterprise, and entrepreneurial ventures" },
            { title: "Strategic Focus", desc: "Current emphasis on scalable solutions and professional mentorship" },
          ].map((item) => (
            <div key={item.title} className="stagger-item p-4 xs:p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 liquid-card hover:liquid-card-hover rounded-xl"
              style={{ borderColor: "var(--color-glass-border-strong)" }}>
              <div className="w-6 xs:w-8 h-px mb-3 xs:mb-4" style={{ backgroundColor: "var(--color-accent)" }} />
              <h4 className="font-semibold mb-1.5 xs:mb-2 text-xs xs:text-sm"
                style={{ color: "var(--color-text-primary)" }}>
                {item.title}
              </h4>
              <p className="text-xs xs:text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}