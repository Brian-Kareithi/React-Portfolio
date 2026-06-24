"use client";
import { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";

interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  objectives: string[];
  impact: string[];
  type: string;
  status: "completed" | "active" | "in-progress";
  github: string;
  demo?: string;
  collaboration?: boolean;
  stack: string[];
  keyFeatures?: string[];
}

const projects: Project[] = [
  {
    title: "VeggieMart", description: "Online marketplace for fresh local produce connecting consumers directly with farmers",
    problem: "Fragmented agricultural supply chain leading to food waste and unfair pricing for farmers.",
    solution: "A full-stack e-commerce platform eliminating intermediaries, ensuring fair prices.",
    objectives: ["Improve supply chain transparency", "Increase farmer income by 30%", "Reduce food waste by 25%"],
    impact: ["500+ farmers reached urban markets", "Delivery time reduced from 3 days to 6 hours", "35% farmer income increase"],
    type: "Marketplace", status: "active", github: "https://github.com/Brian-Kareithi/veggiemart", demo: "https://veggiemart.vercel.app", collaboration: true,
    stack: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "MPesa API", "Google Maps API"],
    keyFeatures: ["Real-time delivery tracking", "MPesa payment processing", "Automated inventory management", "Farmer analytics dashboard"],
  },
  {
    title: "Shamba-Kikwetu", description: "Blockchain-based land management platform for Kenya",
    problem: "Land fraud and ownership disputes costing billions annually.",
    solution: "Decentralized land registry using ICP Blockchain with tamper-proof records.",
    objectives: ["Create immutable land records", "Reduce dispute resolution by 70%", "Enable secure digital transfers"],
    impact: ["1,200+ land records digitized", "Dispute resolution reduced from 3 years to 8 months", "$2.3M potential fraud prevented"],
    type: "Blockchain", status: "active", github: "https://github.com/Brian-Kareithi/shamba-kikwetu", demo: "https://shamba-kikwetu.vercel.app", collaboration: true,
    stack: ["ICP Blockchain", "React", "Node.js", "IPFS", "Smart Contracts", "Digital Signatures"],
    keyFeatures: ["Immutable land records on blockchain", "Smart contract transfers", "Multi-signature verification", "Public transparency ledger"],
  },
  {
    title: "Steadfast Academy", description: "Academic system modernization and student learning platform",
    problem: "Legacy systems causing inefficiencies and limited digital learning resources.",
    solution: "Modernized academic ecosystem with real-time collaboration and automation.",
    objectives: ["Reduce admin workload by 40%", "Increase student engagement", "Improve parent-teacher communication"],
    impact: ["75% admin tasks automated", "60% student engagement increase", "99.8% system uptime"],
    type: "Web Application", status: "active", github: "https://github.com/Brian-Kareithi/steadfast-academy", collaboration: true,
    stack: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
    keyFeatures: ["Real-time grade tracking", "Facial recognition attendance", "Parent-teacher portal", "Interactive learning modules"],
  },
  {
    title: "UMMA Vision", description: "University management portal with real-time collaboration",
    problem: "Disconnected university systems causing administrative bottlenecks.",
    solution: "Integrated portal unifying academic, administrative, and communication functions.",
    objectives: ["Unify 8+ separate systems", "Reduce admin processing by 65%", "Enable real-time collaboration"],
    impact: ["70% admin workload reduced", "85% communication efficiency", "4.8/5 student satisfaction"],
    type: "Web Application", status: "active", github: "https://github.com/Brian-Kareithi/umma-vision", demo: "https://umma-vision.vercel.app", collaboration: true,
    stack: ["React", "Node.js", "MongoDB", "Socket.io", "Redis", "Docker", "AWS"],
    keyFeatures: ["Real-time collaboration", "Automated workflow management", "Analytics dashboard", "Mobile-first design"],
  },
  {
    title: "Scholarship App", description: "Scholarship management with automated verification",
    problem: "Manual processes causing delays, bias, and limited accessibility.",
    solution: "Automated platform with transparent eligibility verification and fair algorithms.",
    objectives: ["Reduce processing from 3 months to 2 weeks", "Increase accessibility by 300%", "Eliminate selection bias"],
    impact: ["2,500+ applications processed", "85% time reduction", "40% recipient diversity increase"],
    type: "Mobile Application", status: "completed", github: "https://github.com/Brian-Kareithi/scholarship-app", collaboration: true,
    stack: ["React Native", "Firebase", "Node.js", "OCR", "Machine Learning"],
    keyFeatures: ["OCR document verification", "Fair selection algorithm", "Real-time tracking", "Secure fund distribution"],
  },
  {
    title: "Digital ID Platform", description: "Secure digital identity with biometric authentication",
    problem: "Identity fraud and data breaches in digital transactions.",
    solution: "Blockchain-based identity platform with zero-knowledge proofs.",
    objectives: ["Reduce verification from 5 days to 5 minutes", "Eliminate 99.9% of fraud", "Ensure privacy compliance"],
    impact: ["10,000+ identities verified", "$1.5M potential fraud prevented", "99.99% verification accuracy"],
    type: "Security", status: "active", github: "https://github.com/Brian-Kareithi/digital-id", demo: "https://digital-id-demo.vercel.app",
    stack: ["React Native", "Blockchain", "Biometric Auth", "Zero-Knowledge Proofs", "IPFS"],
    keyFeatures: ["Biometric authentication", "Zero-knowledge verification", "Decentralized storage", "Real-time fraud detection"],
  },
];

export default function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    techs: new Set(projects.flatMap((p) => p.stack)).size,
  };

  return (
    <section id="projects" className="min-h-screen w-full py-28 md:py-36 px-4 relative">
      <ScrollReveal>
      <div className="absolute top-0 left-0 w-1/3 h-px"
        style={{ background: `linear-gradient(to right, transparent, var(--color-accent))` }} />
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--color-text-muted)" }}>
            Portfolio
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--color-text-primary)" }}>
              Project Solutions
            </h2>
            <div className="w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
          </div>
          <p className="max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}>
            Impactful implementations demonstrating measurable outcomes across diverse domains
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-16">
          {[
            { label: "Total", value: stats.total },
            { label: "Active", value: stats.active },
            { label: "Technologies", value: `${stats.techs}+` },
          ].map((stat) => (
            <div key={stat.label} className="stagger-item text-center px-8 py-6 transition-all duration-300 hover:-translate-y-1 liquid-card hover:liquid-card-hover rounded-xl"
              style={{ borderColor: "var(--color-glass-border-strong)" }}>
              <div className="text-2xl font-bold" style={{ color: "var(--color-accent)" }}>
                {stat.value}
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase mt-1"
                style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project, index) => {
            const isExpanded = expanded === index;
            return (
              <div key={index}
                className="stagger-item transition-all duration-300 hover:-translate-y-0.5 liquid-card hover:liquid-card-hover rounded-xl"
                style={{
                  borderColor: "var(--color-glass-border-strong)",
                }}>
                <div className="p-6 md:p-8 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : index)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold"
                          style={{ color: "var(--color-text-primary)" }}>
                          {project.title}
                        </h3>
                        <span className="text-[9px] px-2 py-0.5 tracking-wider uppercase font-mono"
                          style={{
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text-muted)",
                          }}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm mt-2 leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}>
                        {project.description}
                      </p>
                    </div>
                    <button className="ml-4 mt-1 transition-transform duration-200 hover:rotate-180"
                      style={{ color: "var(--color-text-muted)" }}>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] tracking-wider uppercase font-mono"
                      style={{ color: "var(--color-accent)" }}>
                      {project.type}
                    </span>
                    {project.collaboration && (
                      <span className="text-[9px] tracking-wider uppercase font-mono"
                        style={{ color: "var(--color-text-muted)" }}>
                        Collaborative
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[9px] font-mono px-2 py-1"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text-muted)",
                        }}>
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-[9px] font-mono px-2 py-1"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text-muted)",
                        }}>
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 md:px-8 pb-8 border-t animate-fade-in-up"
                    style={{ borderColor: "var(--color-border)" }}>
                    <div className="pt-6 space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-5 liquid-card" style={{ borderColor: "var(--color-glass-border)" }}>
                          <p className="text-[9px] font-medium tracking-[0.15em] uppercase mb-3"
                            style={{ color: "var(--color-accent)" }}>
                            Problem
                          </p>
                          <p className="text-sm leading-relaxed"
                            style={{ color: "var(--color-text-secondary)" }}>
                            {project.problem}
                          </p>
                        </div>
                        <div className="p-5 liquid-card" style={{ borderColor: "var(--color-glass-border)" }}>
                          <p className="text-[9px] font-medium tracking-[0.15em] uppercase mb-3"
                            style={{ color: "var(--color-text-muted)" }}>
                            Solution
                          </p>
                          <p className="text-sm leading-relaxed"
                            style={{ color: "var(--color-text-secondary)" }}>
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-5 liquid-card" style={{ borderColor: "var(--color-glass-border)" }}>
                          <p className="text-[9px] font-medium tracking-[0.15em] uppercase mb-3"
                            style={{ color: "var(--color-accent)" }}>
                            Objectives
                          </p>
                          <ul className="space-y-2">
                            {project.objectives.map((obj, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm"
                                style={{ color: "var(--color-text-secondary)" }}>
                                <span style={{ color: "var(--color-accent)" }}>—</span>
                                {obj}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-5 liquid-card" style={{ borderColor: "var(--color-glass-border)" }}>
                          <p className="text-[9px] font-medium tracking-[0.15em] uppercase mb-3"
                            style={{ color: "var(--color-text-muted)" }}>
                            Impact
                          </p>
                          <ul className="space-y-2">
                            {project.impact.map((imp, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm"
                                style={{ color: "var(--color-text-secondary)" }}>
                                <span style={{ color: "var(--color-accent)" }}>—</span>
                                {imp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {project.keyFeatures && (
                        <div>
                          <p className="text-[9px] font-medium tracking-[0.15em] uppercase mb-3"
                            style={{ color: "var(--color-text-muted)" }}>
                            Key Features
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.keyFeatures.map((feature, i) => (
                              <span key={i} className="px-3 py-2 text-sm"
                                style={{
                                  border: "1px solid var(--color-border)",
                                  color: "var(--color-text-secondary)",
                                }}>
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 pt-6"
                        style={{ borderTop: "1px solid var(--color-border)" }}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                          style={{
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text-secondary)",
                          }}>
                          <Github className="w-4 h-4" />
                          View Source
                        </a>
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                              border: "1px solid var(--color-accent)",
                              color: "var(--color-accent)",
                            }}>
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center py-10 liquid-card rounded-xl"
          style={{ borderColor: "var(--color-glass-border-strong)" }}>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
            Additional projects, prototypes, and experimental work are available upon request.
          </p>
          <a href="https://github.com/Brian-Kareithi" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}>
            <Github className="w-4 h-4" />
            Explore Full GitHub Portfolio
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
