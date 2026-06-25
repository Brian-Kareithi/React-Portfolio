"use client";
import { ReactNode } from "react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { 
  BiLogoTypescript, 
  BiLogoJava, 
  BiLogoPython, 
  BiLogoJavascript,
  BiLogoReact,
  BiLogoNodejs,
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoFlutter,
  BiLogoVuejs,
  BiLogoFigma
} from "react-icons/bi";
import { 
  SiKotlin,
  SiCplusplus, 
  SiDotnet, 
  SiNextdotjs, 
  SiMongodb, 
  SiFirebase, 
  SiDocker, 
  SiAmazonwebservices, 
  SiProxmox
} from "react-icons/si";
import { FaApple, FaWindows, FaLinux, FaAndroid } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";

interface TechItem {
  title: string;
  icon: ReactNode;
  level: "expert" | "advanced" | "intermediate" | "familiar";
}

interface TechCategory {
  heading: string;
  description: string;
  items: TechItem[];
}

const techs: TechCategory[] = [
  {
    heading: "Languages",
    description: "Programming languages I work with",
    items: [
      { title: "JavaScript", icon: <BiLogoJavascript />, level: "advanced" },
      { title: "TypeScript", icon: <BiLogoTypescript />, level: "advanced" },
      { title: "Python", icon: <BiLogoPython />, level: "intermediate" },
      { title: "Java", icon: <BiLogoJava />, level: "intermediate" },
      { title: "C#", icon: <SiDotnet />, level: "advanced" },
      { title: "C++", icon: <SiCplusplus />, level: "advanced" },
      { title: "Kotlin", icon: <SiKotlin />, level: "advanced" },
      { title: "HTML5", icon: <BiLogoHtml5 />, level: "advanced" },
      { title: "CSS3", icon: <BiLogoCss3 />, level: "advanced" },
    ],
  },
  {
    heading: "Frameworks & Libraries",
    description: "Frontend and backend frameworks",
    items: [
      { title: "React", icon: <BiLogoReact />, level: "advanced" },
      { title: "Next.js", icon: <SiNextdotjs />, level: "advanced" },
      { title: "Node.js", icon: <BiLogoNodejs />, level: "advanced" },
      { title: "Flutter", icon: <BiLogoFlutter />, level: "advanced" },
      { title: "Vue.js", icon: <BiLogoVuejs />, level: "intermediate" },
    ],
  },
  {
    heading: "Operating Systems",
    description: "Platforms and OS environments",
    items: [
      { title: "Windows 10", icon: <FaWindows />, level: "expert" },
      { title: "Windows 11", icon: <FaWindows />, level: "expert" },
      { title: "macOS", icon: <FaApple />, level: "intermediate" },
      { title: "iOS", icon: <FaApple />, level: "expert" },
      { title: "Android", icon: <FaAndroid />, level: "advanced" },
      { title: "Linux", icon: <FaLinux />, level: "advanced" },
    ],
  },
  {
    heading: "Databases & Cloud",
    description: "Data storage and cloud platforms",
    items: [
      { title: "MongoDB", icon: <DiMongodb />, level: "intermediate" },
      { title: "Firebase", icon: <SiFirebase />, level: "advanced" },
      { title: "AWS", icon: <SiAmazonwebservices />, level: "intermediate" },
    ],
  },
  {
    heading: "DevOps & Tools",
    description: "Development, deployment, and virtualization tools",
    items: [
      { title: "Docker", icon: <SiDocker />, level: "advanced" },
      { title: "Proxmox", icon: <SiProxmox />, level: "advanced" },
      { title: "Figma", icon: <BiLogoFigma />, level: "advanced" },
    ],
  },
];

const levelConfig = {
  expert: { label: "Expert" },
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

  // Sort levels for display
  const levelOrder = ["expert", "advanced", "intermediate", "familiar"];
  const sortedLevels = levelOrder.filter(level => levelCounts[level]);

  return (
    <section id="techstack" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3 xs:px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="absolute top-0 left-0 w-1/3 h-px"
        style={{ background: `linear-gradient(to right, transparent, var(--color-accent-secondary))` }} />
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 xs:mb-16 sm:mb-20 animate-fade-in-up">
          <p className="text-[9px] xs:text-[10px] font-medium tracking-[0.3em] uppercase mb-2 xs:mb-3"
            style={{ color: "var(--color-text-muted)" }}>
            Toolbox
          </p>
          <div className="flex items-center justify-center gap-2 xs:gap-3 mb-4 xs:mb-6">
            <div className="w-6 xs:w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--color-text-primary)" }}>
              Technical Stack
            </h2>
            <div className="w-6 xs:w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
          </div>
          <p className="max-w-2xl mx-auto text-xs xs:text-sm leading-relaxed px-2 xs:px-0"
            style={{ color: "var(--color-text-secondary)" }}>
            Technologies I work with, categorized by proficiency
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 mb-12 xs:mb-16">
          {techs.map((category) => (
            <div key={category.heading}
              className="stagger-item p-4 xs:p-5 sm:p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 liquid-card hover:liquid-card-hover rounded-xl"
              style={{ borderColor: "var(--color-glass-border-strong)" }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base xs:text-lg font-bold tracking-tight"
                  style={{ color: "var(--color-text-primary)" }}>
                  {category.heading}
                </h3>
                <span className="text-[10px] xs:text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                  {String(category.items.length).padStart(2, "0")}
                </span>
              </div>
              <p className="text-xs xs:text-sm mb-4 xs:mb-5 sm:mb-6" style={{ color: "var(--color-text-muted)" }}>
                {category.description}
              </p>
              <div className="flex flex-wrap gap-1 xs:gap-1.5">
                {category.items.map((item, idx) => {
                  return (
                    <div key={idx}
                      className="stagger-item flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1.5 xs:py-2 text-[11px] xs:text-sm transition-all duration-200 hover:-translate-y-0.5 liquid-card"
                      style={{
                        borderColor: "var(--color-glass-border)",
                      }}>
                      <span className="text-sm xs:text-base" style={{ color: "var(--color-text-secondary)" }}>
                        {item.icon}
                      </span>
                      <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                        {item.title}
                      </span>
                      <span className="text-[8px] xs:text-[9px] tracking-wider uppercase ml-0.5 xs:ml-1"
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

        <div className="text-center py-6 xs:py-8 sm:py-10 px-3 xs:px-4 liquid-card rounded-xl"
          style={{ borderColor: "var(--color-glass-border-strong)" }}>
          <div className="flex justify-center gap-4 xs:gap-6 sm:gap-10 mb-4 xs:mb-6 flex-wrap">
            {sortedLevels.map((level) => {
              const count = levelCounts[level];
              const percentage = Math.round((count / total) * 100);
              const config = levelConfig[level as keyof typeof levelConfig];
              return (
                <div key={level} className="stagger-item text-center">
                  <div className="text-xl xs:text-2xl font-bold mb-1"
                    style={{ color: "var(--color-accent)" }}>
                    {count}
                  </div>
                  <div className="text-[8px] xs:text-[9px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--color-text-muted)" }}>
                    {config.label}
                  </div>
                  <div className="text-[10px] xs:text-xs font-mono mt-1 opacity-50"
                    style={{ color: "var(--color-text-muted)" }}>
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-[10px] xs:text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
            {total} technologies across {techs.length} categories
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}