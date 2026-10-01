"use client";
import { ReactNode } from "react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
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

export const techs: TechCategory[] = [
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
  expert: { label: "Expert", dots: 4 },
  advanced: { label: "Advanced", dots: 3 },
  intermediate: { label: "Intermediate", dots: 2 },
  familiar: { label: "Familiar", dots: 1 },
};

/** Four-segment proficiency bar. */
function LevelBar({ level, wide = false }: { level: TechItem["level"]; wide?: boolean }) {
  const filled = levelConfig[level].dots;
  return (
    <span className={`flex items-center gap-[3px] ${wide ? "w-full" : "w-10"}`} aria-label={levelConfig[level].label}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="h-1.5 flex-1 rounded-full"
          style={{ backgroundColor: i < filled ? "var(--color-accent)" : "var(--color-border)" }} />
      ))}
    </span>
  );
}

export default function TechStackClient() {
  const allItems = techs.flatMap((cat) => cat.items);
  const total = allItems.length;

  const levelCounts = allItems.reduce((acc, item) => {
    acc[item.level] = (acc[item.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const levelOrder = ["expert", "advanced", "intermediate", "familiar"] as const;
  const sortedLevels = levelOrder.filter((level) => levelCounts[level]);

  return (
    <section id="techstack" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3.75 sm:px-7.5 lg:px-12 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="02"
          label="Toolbox"
          title={<>Technical <em className="font-serif-accent">stack</em></>}
          description="Technologies I work with, categorized by proficiency."
        />

        {/* Level summary */}
        <div className="ink-slab mb-16 grid grid-cols-2 gap-6 px-6 py-7 sm:grid-cols-4 sm:px-10">
          <div className="col-span-2 sm:col-span-1">
            <span className="display-xl block text-5xl" style={{ color: "var(--color-accent)" }}>{total}</span>
            <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>technologies · {techs.length} categories</span>
          </div>
          {sortedLevels.map((level) => (
            <div key={level} className="flex flex-col justify-end">
              <span className="display-xl text-3xl" style={{ color: "var(--color-text-primary)" }}>{levelCounts[level]}</span>
              <span className="mt-1.5 flex items-center gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                <LevelBar level={level} />
                {levelConfig[level].label}
              </span>
            </div>
          ))}
        </div>

        {/* Periodic-table style tiles, grouped by category */}
        <div className="space-y-10">
          {techs.map((category, catIndex) => (
            <div key={category.heading}>
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-serif-accent text-2xl" style={{ color: "var(--color-accent-secondary)" }}>
                  {String(catIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="display-xl text-2xl" style={{ color: "var(--color-text-primary)" }}>
                  {category.heading}
                </h3>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {category.description}
                </p>
              </div>

              <StaggerReveal staggerDelay={40}>
              <div className="grid grid-cols-2 gap-2.5 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
                {category.items.map((item) => (
                  <div key={item.title} className="flat-card flex flex-col gap-3 p-3">
                    <div className="flex items-start justify-between">
                      <span className="text-xl" style={{ color: "var(--color-accent)" }} aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="font-mono text-[10px] uppercase" style={{ color: "var(--color-text-muted)" }}>
                        {item.title.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="mb-1.5 text-xs font-semibold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                        {item.title}
                      </p>
                      <LevelBar level={item.level} wide />
                      <p className="mt-1 text-[10px]" style={{ color: "var(--color-text-muted)" }}>{levelConfig[item.level].label}</p>
                    </div>
                  </div>
                ))}
              </div>
              </StaggerReveal>
            </div>
          ))}
        </div>
      <NextSection
          title="Toolbox in action"
          description="See the stack producing real work, the engineering behind it, and the journey it grew from."
          links={[
            { href: "/projects", label: "Selected Work", description: "These tools applied to shipped products and experiments." },
            { href: "/engineering", label: "Engineering", description: "Why each layer is chosen and how it's deployed." },
            { href: "/about", label: "About", description: "The journey that shaped this toolbox." },
          ]}
        />
      </div>
      </ScrollReveal>
    </section>
  );
}
