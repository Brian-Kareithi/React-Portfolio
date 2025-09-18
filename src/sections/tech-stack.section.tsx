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
  iconColor?: string;
}

interface TechCategory {
  heading: string;
  items: TechItem[];
}

const techs: TechCategory[] = [
  {
    heading: 'Core Stack',
    items: [
      { title: 'Next JS', icon: <TbBrandNextjs />, color: '#000000', textColor: '#ffffff', iconColor: '#ffffff' },
      { title: 'React JS', icon: <FaReact />, color: '#61DAFB', textColor: '#000000', iconColor: '#61DAFB' },
      { title: 'Node JS', icon: <FaNodeJs />, color: '#339933', textColor: '#ffffff', iconColor: '#339933' },
      { title: 'TypeScript', icon: <BiLogoTypescript />, color: '#3178C6', textColor: '#ffffff', iconColor: '#3178C6' },
      { title: 'Fastify', icon: <SiFastify />, color: '#000000', textColor: '#ffffff', iconColor: '#ffffff' },
      { title: 'Express JS', icon: <SiExpress />, color: '#000000', textColor: '#ffffff', iconColor: '#ffffff' },
    ],
  },
  {
    heading: 'Languages',
    items: [
      { title: 'Java', icon: <FaJava />, color: '#007396', textColor: '#ffffff', iconColor: '#007396' },
      { title: 'Python', icon: <SiCplusplus />, color: '#3776AB', textColor: '#FFD43B', iconColor: '#3776AB' },
      { title: 'JavaScript', icon: <FaReact />, color: '#F7DF1E', textColor: '#000000', iconColor: '#F7DF1E' },
      { title: 'Ruby', icon: <DiRuby />, color: '#CC342D', textColor: '#ffffff', iconColor: '#CC342D' },
      { title: 'C++', icon: <SiCplusplus />, color: '#00599C', textColor: '#ffffff', iconColor: '#00599C' },
      { title: 'Kotlin', icon: <SiKotlin />, color: '#7F52FF', textColor: '#ffffff', iconColor: '#7F52FF' },
      { title: 'Flutter', icon: <SiFlutter />, color: '#02569B', textColor: '#ffffff', iconColor: '#02569B' },
    ],
  },
  {
    heading: 'Frontend',
    items: [
      { title: 'HTML5', icon: <FaHtml5 />, color: '#E34F26', textColor: '#ffffff', iconColor: '#E34F26' },
      { title: 'CSS3', icon: <FaCss3 />, color: '#1572B6', textColor: '#ffffff', iconColor: '#1572B6' },
      { title: 'Bootstrap', icon: <FaBootstrap />, color: '#7952B3', textColor: '#ffffff', iconColor: '#7952B3' },
      { title: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4', textColor: '#ffffff', iconColor: '#06B6D4' },
      { title: 'Material UI', icon: <SiMui />, color: '#007FFF', textColor: '#ffffff', iconColor: '#007FFF' },
      { title: 'ShadCn UI', icon: <SiShadcnui />, color: '#000000', textColor: '#ffffff', iconColor: '#ffffff' },
    ],
  },
  {
    heading: 'Databases',
    items: [
      { title: 'MsSQL', icon: <DiMsqlServer />, color: '#CC2927', textColor: '#ffffff', iconColor: '#CC2927' },
      { title: 'MySQL', icon: <SiMysql />, color: '#4479A1', textColor: '#ffffff', iconColor: '#4479A1' },
      { title: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1', textColor: '#ffffff', iconColor: '#4169E1' },
      { title: 'MongoDB', icon: <DiMongodb />, color: '#47A248', textColor: '#ffffff', iconColor: '#47A248' },
      { title: 'Firebase', icon: <SiFirebase />, color: '#FFCA28', textColor: '#000000', iconColor: '#FFCA28' },
      { title: 'Supabase', icon: <SiSupabase />, color: '#3ECF8E', textColor: '#000000', iconColor: '#3ECF8E' },
    ],
  },
  {
    heading: 'Platforms',
    items: [
      { title: 'Windows', icon: <FaWindows />, color: '#0078D4', textColor: '#ffffff', iconColor: '#0078D4' },
      { title: 'MacOS', icon: <FaApple />, color: '#000000', textColor: '#ffffff', iconColor: '#ffffff' },
      { title: 'iOS', icon: <FaApple />, color: '#000000', textColor: '#ffffff', iconColor: '#ffffff' },
      { title: 'Android', icon: <SiFlutter />, color: '#3DDC84', textColor: '#000000', iconColor: '#3DDC84' },
      { title: 'Linux', icon: <FaLinux />, color: '#FCC624', textColor: '#000000', iconColor: '#FCC624' },
    ],
  },
  {
    heading: 'DevOps',
    items: [
      { title: 'AWS', icon: <SiAwsamplify />, color: '#FF9900', textColor: '#000000', iconColor: '#FF9900' },
      { title: 'Docker', icon: <FaDocker />, color: '#2496ED', textColor: '#ffffff', iconColor: '#2496ED' },
      { title: 'Proxmox', icon: <SiProxmox />, color: '#E57000', textColor: '#ffffff', iconColor: '#E57000' },
    ],
  },
  {
    heading: 'Design',
    items: [
      { title: 'Figma', icon: <SiFigma />, color: '#F24E1E', textColor: '#ffffff', iconColor: '#F24E1E' },
      { title: 'Canva', icon: <SiCanva />, color: '#00C4CC', textColor: '#ffffff', iconColor: '#00C4CC' },
    ],
  },
];

// GlowBox props
interface GlowBoxProps {
  icon: ReactNode;
  color: string;
  title: string;
  textColor?: string;
  iconColor?: string;
}

const GlowBox: React.FC<GlowBoxProps> = ({ icon, color, title, textColor = '#ffffff', iconColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const experience: ExperienceLevel = experienceLevels[title] || 'Intermediate';

  return (
    <div
      className={`glow-box ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        '--glow-color': color, 
        '--text-color': textColor,
        '--icon-color': iconColor || textColor
      } as React.CSSProperties}
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
                    iconColor={item.iconColor}
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