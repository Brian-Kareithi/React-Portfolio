"use client";
import { ReactNode } from "react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { BiLogoTypescript } from "react-icons/bi";
import { DiMongodb, DiMsqlServer, DiRuby } from "react-icons/di";
import { FaCss3, FaDocker, FaHtml5, FaJava, FaLinux, FaNodeJs, FaReact, FaWindows } from "react-icons/fa";
import { SiExpress, SiFastify, SiFirebase, SiJavascript, SiMysql, SiPostgresql, SiPython, SiSupabase, SiTailwindcss } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

interface TechItem {
  title: string;
  icon: ReactNode;
  level: "proficient" | "advanced" | "intermediate" | "familiar";
}

interface TechCategory {
  heading: string;
  description: string;
  items: TechItem[];
}

const techs: TechCategory[] = [
  {
    heading: "Frontend",
    description: "Modern frontend technologies and frameworks",
    items: [
      { title: "HTML5", icon: <FaHtml5 />, level: "proficient" },
      { title: "CSS3", icon: <FaCss3 />, level: "proficient" },
      { title: "JavaScript", icon: <SiJavascript />, level: "proficient" },
      { title: "TypeScript", icon: <BiLogoTypescript />, level: "advanced" },
      { title: "React", icon: <FaReact />, level: "proficient" },
      { title: "Next.js", icon: <TbBrandNextjs />, level: "advanced" },
      { title: "Tailwind CSS", icon: <SiTailwindcss />, level: "proficient" },
    ],
  },
  {
    heading: "Backend",
    description: "Server-side and API development",
    items: [
      { title: "Node.js", icon: <FaNodeJs />, level: "proficient" },
      { title: "Express", icon: <SiExpress />, level: "proficient" },
      { title: "Fastify", icon: <SiFastify />, level: "intermediate" },
      { title: "Python", icon: <SiPython />, level: "advanced" },
      { title: "Java", icon: <FaJava />, level: "intermediate" },
      { title: "Ruby", icon: <DiRuby />, level: "familiar" },
    ],
  },
  {
    heading: "Database",
    description: "Data storage and management systems",
    items: [
      { title: "MongoDB", icon: <DiMongodb />, level: "proficient" },
      { title: "PostgreSQL", icon: <SiPostgresql />, level: "advanced" },
      { title: "MySQL", icon: <SiMysql />, level: "proficient" },
      { title: "MsSQL", icon: <DiMsqlServer />, level: "intermediate" },
      { title: "Firebase", icon: <SiFirebase />, level: "intermediate" },
      { title: "Supabase", icon: <SiSupabase />, level: "familiar" },
    ],
  },
  {
    heading: "DevOps & Tools",
    description: "Deployment, infrastructure, and development tools",
    items: [
      { title: "Docker", icon: <FaDocker />, level: "intermediate" },
      { title: "Linux", icon: <FaLinux />, level: "proficient" },
      { title: "Git", icon: <span className="text-sm font-mono">&gt;_</span>, level: "proficient" },
      { title: "Windows Server", icon: <FaWindows />, level: "intermediate" },
      { title: "AWS", icon: <span className="text-sm font-mono">AWS</span>, level: "intermediate" },
      { title: "CI/CD", icon: <span className="text-sm font-mono">CI/CD</span>, level: "intermediate" },
    ],
  },
];

const levelConfig = {
  proficient: { label: "Proficient" },
  advanced: { label: "Advanced" },
  intermediate: { label: "Intermediate" },
  familiar: { label: "Familiar" },
};

export default function TechStack() {
  const allItems = techs.flatMap((cat) => cat.items);
  const total = allItems.length;

  const levelCounts = allItems.reduce((acc, item) => {
    acc[item.level] = (acc[item.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section id="techstack" className="min-h-screen w-full py-28 md:py-36 px-4 relative">
      <ScrollReveal>
      <div className="absolute top-0 left-0 w-1/3 h-px"
        style={{ background: `linear-gradient(to right, transparent, var(--color-accent-secondary))` }} />
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--color-text-muted)" }}>
            Toolbox
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--color-text-primary)" }}>
              Technical Stack
            </h2>
            <div className="w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
          </div>
          <p className="max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}>
            Technologies I work with, categorized by proficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {techs.map((category) => (
            <div key={category.heading}
              className="stagger-item p-8 transition-all duration-300 hover:-translate-y-1"
              style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold tracking-tight"
                  style={{ color: "var(--color-text-primary)" }}>
                  {category.heading}
                </h3>
                <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                  {String(category.items.length).padStart(2, "0")}
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
                {category.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item, idx) => {
                  return (
                    <div key={idx}
                      className="stagger-item flex items-center gap-2 px-3 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        border: "1px solid var(--color-border)",
                        backgroundColor: "var(--color-surface)",
                      }}>
                      <span className="text-base" style={{ color: "var(--color-text-secondary)" }}>
                        {item.icon}
                      </span>
                      <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                        {item.title}
                      </span>
                      <span className="text-[9px] tracking-wider uppercase ml-1"
                        style={{ color: "var(--color-text-muted)" }}>
                        {levelConfig[item.level].label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-10"
          style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
          <div className="flex justify-center gap-10 mb-6">
            {Object.entries(levelCounts).map(([level, count]) => {
              const percentage = Math.round((count / total) * 100);
              const config = levelConfig[level as keyof typeof levelConfig];
              return (
                <div key={level} className="stagger-item text-center">
                  <div className="text-2xl font-bold mb-1"
                    style={{ color: "var(--color-accent)" }}>
                    {count}
                  </div>
                  <div className="text-[9px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--color-text-muted)" }}>
                    {config.label}
                  </div>
                  <div className="text-xs font-mono mt-1 opacity-50"
                    style={{ color: "var(--color-text-muted)" }}>
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
            {total} technologies across {techs.length} categories
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
