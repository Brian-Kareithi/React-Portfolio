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
  SiAwsamplify,
  SiCanva,
  SiCplusplus,
  SiExpress,
  SiFastify,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiKotlin,
  SiMui,
  SiMysql,
  SiPostgresql,
  SiProxmox,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import { Background } from '../components/background';

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
  textColor?: string;
}

interface TechCategory {
  heading: string;
  items: TechItem[];
}

const techs: TechCategory[] = [
  {
    heading: 'Core Stack',
    items: [
      { title: 'Next JS', icon: <TbBrandNextjs />, color: '#0A1931', textColor: '#F6FAFD' },
      { title: 'React JS', icon: <FaReact />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'Node JS', icon: <FaNodeJs />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'TypeScript', icon: <BiLogoTypescript />, color: '#0A1931', textColor: '#F6FAFD' },
      { title: 'Fastify', icon: <SiFastify />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'Express JS', icon: <SiExpress />, color: '#4A7FA7', textColor: '#F6FAFD' },
    ],
  },
  {
    heading: 'Languages',
    items: [
      { title: 'Java', icon: <FaJava />, color: '#0A1931', textColor: '#F6FAFD' },
      { title: 'Python', icon: <SiCplusplus />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'JavaScript', icon: <FaReact />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'Ruby', icon: <DiRuby />, color: '#0A1931', textColor: '#F6FAFD' },
      { title: 'C++', icon: <SiCplusplus />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'Kotlin', icon: <SiKotlin />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'Flutter', icon: <SiFlutter />, color: '#0A1931', textColor: '#F6FAFD' },
    ],
  },
  {
    heading: 'Frontend',
    items: [
      { title: 'HTML5', icon: <FaHtml5 />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'CSS3', icon: <FaCss3 />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'Bootstrap', icon: <FaBootstrap />, color: '#0A1931', textColor: '#F6FAFD' },
      { title: 'Tailwind', icon: <SiTailwindcss />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'Material UI', icon: <SiMui />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'ShadCn UI', icon: <SiShadcnui />, color: '#0A1931', textColor: '#F6FAFD' },
    ],
  },
  {
    heading: 'Databases',
    items: [
      { title: 'MsSQL', icon: <DiMsqlServer />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'MySQL', icon: <SiMysql />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'PostgreSQL', icon: <SiPostgresql />, color: '#0A1931', textColor: '#F6FAFD' },
      { title: 'MongoDB', icon: <DiMongodb />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'Firebase', icon: <SiFirebase />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'Supabase', icon: <SiSupabase />, color: '#0A1931', textColor: '#F6FAFD' },
    ],
  },
  {
    heading: 'Platforms',
    items: [
      { title: 'Windows', icon: <FaWindows />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'MacOS', icon: <FaApple />, color: '#0A1931', textColor: '#F6FAFD' },
      { title: 'iOS', icon: <FaApple />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'Android', icon: <SiFlutter />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'Linux', icon: <FaLinux />, color: '#0A1931', textColor: '#F6FAFD' },
    ],
  },
  {
    heading: 'DevOps',
    items: [
      { title: 'AWS', icon: <SiAwsamplify />, color: '#1A3D63', textColor: '#F6FAFD' },
      { title: 'Docker', icon: <FaDocker />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'Proxmox', icon: <SiProxmox />, color: '#0A1931', textColor: '#F6FAFD' },
    ],
  },
  {
    heading: 'Design',
    items: [
      { title: 'Figma', icon: <SiFigma />, color: '#4A7FA7', textColor: '#F6FAFD' },
      { title: 'Canva', icon: <SiCanva />, color: '#0A1931', textColor: '#F6FAFD' },
    ],
  },
];

// GlowBox props
interface GlowBoxProps {
  icon: ReactNode;
  color: string;
  title: string;
  textColor?: string;
}

const GlowBox: React.FC<GlowBoxProps> = ({ icon, color, title, textColor = '#F6FAFD' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const experience: ExperienceLevel = experienceLevels[title] || 'Intermediate';

  return (
    <div
      className={`glow-box ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--glow-color': color, '--text-color': textColor } as React.CSSProperties}
    >
      <div className="glow-box-content">
        <div className="tech-name">{title}</div>
        <div className="glow-box-icon">{icon}</div>
        <div className="glow-box-info">
          <div className="glow-box-experience" data-level={experience}>{experience}</div>
        </div>
      </div>
      <div className="glow-effect"></div>
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
      <div className="section-title-line"></div>
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
      <Background />
      
      <div className="tech-stack-container">
        <div className="tech-stack-title">
          <SectionTitle title="Tech" subTitle="STACK" />
        </div>

        <div className={`tech-grid ${isVisible ? 'visible' : ''}`}>
          {techs.map((tech, index) => (
            <div className="tech-category" key={index}>
              <h3 className="tech-category-heading">{tech.heading}</h3>
              <div className="tech-row">
                {tech.items.map((item, idx) => (
                  <GlowBox 
                    key={idx} 
                    icon={item.icon} 
                    color={item.color} 
                    title={item.title} 
                    textColor={item.textColor} 
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