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
  Linux: 'Expert', // Updated to Expert

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
      { title: 'Next JS', icon: <TbBrandNextjs />, color: 'rgba(0, 0, 0, 0.9)', textColor: '#ffffff' },
      { title: 'React JS', icon: <FaReact />, color: 'rgba(97, 219, 251, 0.9)', textColor: '#000000' },
      { title: 'Node JS', icon: <FaNodeJs />, color: 'rgba(104, 160, 99, 0.9)', textColor: '#000000' },
      { title: 'TypeScript', icon: <BiLogoTypescript />, color: 'rgba(0, 122, 204, 0.9)', textColor: '#ffffff' },
      { title: 'Fastify', icon: <SiFastify />, color: 'rgba(255, 255, 255, 0.9)', textColor: '#000000' },
      { title: 'Express JS', icon: <SiExpress />, color: 'rgba(255, 255, 255, 0.9)', textColor: '#000000' },
    ],
  },
  {
    heading: 'Languages',
    items: [
      { title: 'Java', icon: <FaJava />, color: 'rgba(231, 111, 0, 0.9)', textColor: '#000000' },
      { title: 'Python', icon: <SiCplusplus />, color: 'rgba(55, 118, 171, 0.9)', textColor: '#ffffff' },
      { title: 'JavaScript', icon: <FaReact />, color: 'rgba(240, 219, 79, 0.9)', textColor: '#000000' },
      { title: 'Ruby', icon: <DiRuby />, color: 'rgba(224, 17, 95, 0.9)', textColor: '#ffffff' },
      { title: 'C++', icon: <SiCplusplus />, color: 'rgba(0, 123, 181, 0.9)', textColor: '#ffffff' },
      { title: 'Kotlin', icon: <SiKotlin />, color: 'rgba(255, 87, 34, 0.9)', textColor: '#ffffff' },
      { title: 'Flutter', icon: <SiFlutter />, color: 'rgba(0, 180, 255, 0.9)', textColor: '#000000' },
    ],
  },
  {
    heading: 'Frontend',
    items: [
      { title: 'HTML5', icon: <FaHtml5 />, color: 'rgba(227, 76, 38, 0.9)', textColor: '#ffffff' },
      { title: 'CSS3', icon: <FaCss3 />, color: 'rgba(38, 77, 228, 0.9)', textColor: '#ffffff' },
      { title: 'Bootstrap', icon: <FaBootstrap />, color: 'rgba(125, 17, 248, 0.9)', textColor: '#ffffff' },
      { title: 'Tailwind', icon: <SiTailwindcss />, color: 'rgba(6, 182, 212, 0.9)', textColor: '#000000' },
      { title: 'Material UI', icon: <SiMui />, color: 'rgba(0, 127, 255, 0.9)', textColor: '#ffffff' },
      { title: 'ShadCn UI', icon: <SiShadcnui />, color: 'rgba(255, 255, 255, 0.9)', textColor: '#000000' },
    ],
  },
  {
    heading: 'Databases',
    items: [
      { title: 'MsSQL', icon: <DiMsqlServer />, color: 'rgba(230, 50, 42, 0.9)', textColor: '#ffffff' },
      { title: 'MySQL', icon: <SiMysql />, color: 'rgba(0, 122, 158, 0.9)', textColor: '#ffffff' },
      { title: 'PostgreSQL', icon: <SiPostgresql />, color: 'rgba(51,103,145,0.9)', textColor: '#ffffff' },
      { title: 'MongoDB', icon: <DiMongodb />, color: 'rgba(0, 237, 100, 0.9)', textColor: '#000000' },
      { title: 'Firebase', icon: <SiFirebase />, color: 'rgba(255, 202, 40, 0.9)', textColor: '#000000' },
      { title: 'Supabase', icon: <SiSupabase />, color: 'rgba(16,185,129,0.9)', textColor: '#000000' },
    ],
  },
  {
    heading: 'Platforms',
    items: [
      { title: 'Windows', icon: <FaWindows />, color: 'rgba(0,120,215,0.9)', textColor: '#ffffff' },
      { title: 'MacOS', icon: <FaApple />, color: 'rgba(100,100,100,0.9)', textColor: '#ffffff' },
      { title: 'iOS', icon: <FaApple />, color: 'rgba(255,255,255,0.9)', textColor: '#000000' },
      { title: 'Android', icon: <SiFlutter />, color: 'rgba(164,198,57,0.9)', textColor: '#000000' },
      { title: 'Linux', icon: <FaLinux />, color: 'rgba(240,200,40,0.9)', textColor: '#000000' },
    ],
  },
  {
    heading: 'DevOps',
    items: [
      { title: 'AWS', icon: <SiAwsamplify />, color: 'rgba(255,153,0,0.9)', textColor: '#000000' },
      { title: 'Docker', icon: <FaDocker />, color: 'rgba(0,123,181,0.9)', textColor: '#ffffff' },
      { title: 'Proxmox', icon: <SiProxmox />, color: 'rgba(239,83,80,0.9)', textColor: '#ffffff' },
    ],
  },
  {
    heading: 'Design',
    items: [
      { title: 'Figma', icon: <SiFigma />, color: 'rgba(255,0,141,0.9)', textColor: '#ffffff' },
      { title: 'Canva', icon: <SiCanva />, color: 'rgba(0,159,227,0.9)', textColor: '#ffffff' },
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

const GlowBox: React.FC<GlowBoxProps> = ({ icon, color, title, textColor = '#ffffff' }) => {
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
      {/* Animated particles background */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': Math.random() * 5 + 's',
            '--size': Math.random() * 4 + 2 + 'px',
            '--distance': Math.random() * 20 + 10 + 'vmax',
            '--duration': Math.random() * 10 + 10 + 's',
            '--opacity': Math.random() * 0.5 + 0.1,
            '--left': Math.random() * 100 + '%',
          } as React.CSSProperties}></div>
        ))}
      </div>
      
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