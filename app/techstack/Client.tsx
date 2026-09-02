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
  expert: { label: "Expert", dots: 4 },
  advanced: { label: "Advanced", dots: 3 },
  intermediate: { label: "Intermediate", dots: 2 },
  familiar: { label: "Familiar", dots: 1 },
};

function LevelDots({ level }: { level: TechItem["level"] }) {
  const filled = levelConfig[level].dots;
  return (
    <span className="flex items-center gap-[3px] ml-0.5" aria-label={levelConfig[level].label}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="w-1 h-1 rounded-full"
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
    <section id="techstack" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3 xs:px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-6xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="02"
          label="Toolbox"
          title={<>Technical <em className="font-serif-accent">stack</em></>}
          description="Technologies I work with, categorized by proficiency."
        />

        <div className="border-b" style={{ borderColor: "var(--color-border)" }}>
          {techs.map((category, catIndex) => (
            <div key={category.heading}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 xs:gap-6 py-8 xs:py-10 border-t"
              style={{ borderColor: "var(--color-border)" }}>
              <div className="md:col-span-4">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[10px] font-mono font-medium"
                    style={{ color: "var(--color-accent)" }}>
                    {String(catIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base xs:text-lg font-bold tracking-tight"
                    style={{ color: "var(--color-text-primary)" }}>
                    {category.heading}
                  </h3>
                </div>
                <p className="text-xs xs:text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {category.description}
                </p>
              </div>

              <div className="md:col-span-8">
                <StaggerReveal staggerDelay={40}>
                <div className="flex flex-wrap gap-1.5 xs:gap-2">
                  {category.items.map((item, idx) => (
                    <div key={idx}
                      className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm liquid-card"
                      style={{
                        borderColor: "var(--color-glass-border)",
                      }}>
                      <span className="text-base" style={{ color: "var(--color-text-secondary)" }}>
                        {item.icon}
                      </span>
                      <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                        {item.title}
                      </span>
                      <LevelDots level={item.level} />
                    </div>
                  ))}
                </div>
                </StaggerReveal>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6 xs:py-8">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {sortedLevels.map((level) => (
              <div key={level} className="flex items-center gap-2">
                <LevelDots level={level} />
                <span className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: "var(--color-text-muted)" }}>
                  {levelConfig[level].label}
                </span>
                <span className="text-[10px] font-mono" style={{ color: "var(--color-accent)" }}>
                  {levelCounts[level]}
                </span>
              </div>
            ))}
          </div>
          <span className="text-[10px] xs:text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
            {total} technologies across {techs.length} categories
          </span>
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
