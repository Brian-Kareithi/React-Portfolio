import { ReactNode, useEffect, useState } from 'react';
import { BiLogoTypescript } from 'react-icons/bi';
import { DiMongodb, DiMsqlServer, DiRuby } from 'react-icons/di';
import {
  FaApple,
  FaBootstrap,
  FaCss3,
  FaDocker,
  FaHtml5,
  FaJava,
  FaLinux,
  FaNodeJs,
  FaReact,
  FaWindows,
} from 'react-icons/fa';
import {
  SiAndroid,
  SiAwsamplify,
  SiCanva,
  SiCplusplus,
  SiExpress,
  SiFastify,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiJavascript,
  SiKotlin,
  SiMui,
  SiMysql,
  SiPostgresql,
  SiProxmox,
  SiPython,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

// Define experience level types
type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

const experienceLevels: Record<string, ExperienceLevel> = {
  // Core Stack
  'Next JS': 'Advanced',
  'React JS': 'Expert',
  'Node JS': 'Advanced',
  TypeScript: 'Advanced',
  Fastify: 'Intermediate',
  'Express JS': 'Advanced',

  // Languages
  Java: 'Advanced',
  Python: 'Intermediate',
  JavaScript: 'Expert',
  Ruby: 'Beginner',
  'C++': 'Intermediate',
  Kotlin: 'Intermediate',
  Flutter: 'Intermediate',

  // Frontend
  HTML5: 'Expert',
  CSS3: 'Expert',
  Bootstrap: 'Advanced',
  Tailwind: 'Advanced',
  'Material UI': 'Intermediate',
  'ShadCn UI': 'Intermediate',

  // Databases
  MsSQL: 'Intermediate',
  MySQL: 'Advanced',
  PostgreSQL: 'Intermediate',
  MongoDB: 'Advanced',
  Firebase: 'Advanced',
  Supabase: 'Intermediate',

  // Platforms
  Windows: 'Expert',
  MacOS: 'Advanced',
  iOS: 'Intermediate',
  Android: 'Intermediate',
  Linux: 'Expert',

  // DevOps
  AWS: 'Intermediate',
  Docker: 'Intermediate',
  Proxmox: 'Beginner',

  // Design
  Figma: 'Intermediate',
  Canva: 'Advanced',
};

// Define tech item type
interface TechItem {
  title: string;
  icon: ReactNode;
  color: string;
}

interface TechCategory {
  heading: string;
  items: TechItem[];
}

const techs: TechCategory[] = [
  {
    heading: 'Core Stack',
    items: [
      { title: 'Next JS', icon: <TbBrandNextjs />, color: '#ffffff' },
      { title: 'React JS', icon: <FaReact />, color: '#61DAFB' },
      { title: 'Node JS', icon: <FaNodeJs />, color: '#339933' },
      { title: 'TypeScript', icon: <BiLogoTypescript />, color: '#3178C6' },
      { title: 'Fastify', icon: <SiFastify />, color: '#ffffff' },
      { title: 'Express JS', icon: <SiExpress />, color: '#ffffff' },
    ],
  },
  {
    heading: 'Languages',
    items: [
      { title: 'Java', icon: <FaJava />, color: '#ED8B00' },
      { title: 'Python', icon: <SiPython />, color: '#3776AB' },
      { title: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { title: 'Ruby', icon: <DiRuby />, color: '#CC342D' },
      { title: 'C++', icon: <SiCplusplus />, color: '#00599C' },
      { title: 'Kotlin', icon: <SiKotlin />, color: '#7F52FF' },
      { title: 'Flutter', icon: <SiFlutter />, color: '#02569B' },
    ],
  },
  {
    heading: 'Frontend',
    items: [
      { title: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
      { title: 'CSS3', icon: <FaCss3 />, color: '#1572B6' },
      { title: 'Bootstrap', icon: <FaBootstrap />, color: '#7952B3' },
      { title: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
      { title: 'Material UI', icon: <SiMui />, color: '#007FFF' },
      { title: 'ShadCn UI', icon: <SiShadcnui />, color: '#ffffff' },
    ],
  },
  {
    heading: 'Databases',
    items: [
      { title: 'MsSQL', icon: <DiMsqlServer />, color: '#CC2927' },
      { title: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
      { title: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
      { title: 'MongoDB', icon: <DiMongodb />, color: '#47A248' },
      { title: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
      { title: 'Supabase', icon: <SiSupabase />, color: '#3ECF8E' },
    ],
  },
  {
    heading: 'Platforms',
    items: [
      { title: 'Windows', icon: <FaWindows />, color: '#0078D4' },
      { title: 'MacOS', icon: <FaApple />, color: '#ffffff' },
      { title: 'iOS', icon: <FaApple />, color: '#ffffff' },
      { title: 'Android', icon: <SiAndroid />, color: '#3DDC84' },
      { title: 'Linux', icon: <FaLinux />, color: '#FCC624' },
    ],
  },
  {
    heading: 'DevOps',
    items: [
      { title: 'AWS', icon: <SiAwsamplify />, color: '#FF9900' },
      { title: 'Docker', icon: <FaDocker />, color: '#2496ED' },
      { title: 'Proxmox', icon: <SiProxmox />, color: '#E57000' },
    ],
  },
  {
    heading: 'Design',
    items: [
      { title: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
      { title: 'Canva', icon: <SiCanva />, color: '#00C4CC' },
    ],
  },
];

// TechBox props
interface TechBoxProps {
  icon: ReactNode;
  title: string;
  color: string;
}

const TechBox: React.FC<TechBoxProps> = ({ icon, title, color }) => {
  const experience: ExperienceLevel = experienceLevels[title] || 'Intermediate';

  return (
    <div
      className="tech-box group"
      style={
        {
          '--brand-color': color,
        } as React.CSSProperties
      }
    >
      <div className="tech-box-content">
        <div className="tech-name">{title}</div>
        <div className="tech-icon-container">
          <div className="tech-icon-wrapper">
            <div className="tech-icon">{icon}</div>
          </div>
        </div>
        <div className="tech-experience" data-level={experience}>
          {experience}
        </div>
      </div>
      <div className="tech-glow"></div>
    </div>
  );
};

// SectionTitle props
interface SectionTitleProps {
  title: string;
  subTitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subTitle }) => {
  return (
    <div className="section-title">
      <h2>
        {title} <span>{subTitle}</span>
      </h2>
      <div className="title-decoration"></div>
    </div>
  );
};

export const TechStack: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="tech-stack" id="tech-stack">
      <div className="liquid-background">
        <div className="liquid-shape liquid-shape-1"></div>
        <div className="liquid-shape liquid-shape-2"></div>
        <div className="liquid-shape liquid-shape-3"></div>
        <div className="liquid-shape liquid-shape-4"></div>
      </div>

      <div className="tech-stack-container">
        <div className="tech-stack-title">
          <SectionTitle title="Technical" subTitle="Expertise" />
          <p className="section-subtitle">Technologies I work with to create exceptional digital experiences</p>
        </div>

        <div className={`tech-grid ${isVisible ? 'visible' : ''}`}>
          {techs.map((tech, index) => (
            <div className="tech-category" key={index}>
              <div className="category-header">
                <h3 className="tech-category-heading">{tech.heading}</h3>
                <div className="category-line"></div>
              </div>
              <div className="tech-row">
                {tech.items.map((item, idx) => (
                  <TechBox
                    key={idx}
                    icon={item.icon}
                    title={item.title}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};