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
}

interface TechCategory {
  heading: string;
  items: TechItem[];
}

const techs: TechCategory[] = [
  {
    heading: 'Core Stack',
    items: [
      { title: 'Next JS', icon: <TbBrandNextjs /> },
      { title: 'React JS', icon: <FaReact /> },
      { title: 'Node JS', icon: <FaNodeJs /> },
      { title: 'TypeScript', icon: <BiLogoTypescript /> },
      { title: 'Fastify', icon: <SiFastify /> },
      { title: 'Express JS', icon: <SiExpress /> },
    ],
  },
  {
    heading: 'Languages',
    items: [
      { title: 'Java', icon: <FaJava /> },
      { title: 'Python', icon: <SiCplusplus /> },
      { title: 'JavaScript', icon: <FaReact /> },
      { title: 'Ruby', icon: <DiRuby /> },
      { title: 'C++', icon: <SiCplusplus /> },
      { title: 'Kotlin', icon: <SiKotlin /> },
      { title: 'Flutter', icon: <SiFlutter /> },
    ],
  },
  {
    heading: 'Frontend',
    items: [
      { title: 'HTML5', icon: <FaHtml5 /> },
      { title: 'CSS3', icon: <FaCss3 /> },
      { title: 'Bootstrap', icon: <FaBootstrap /> },
      { title: 'Tailwind', icon: <SiTailwindcss /> },
      { title: 'Material UI', icon: <SiMui /> },
      { title: 'ShadCn UI', icon: <SiShadcnui /> },
    ],
  },
  {
    heading: 'Databases',
    items: [
      { title: 'MsSQL', icon: <DiMsqlServer /> },
      { title: 'MySQL', icon: <SiMysql /> },
      { title: 'PostgreSQL', icon: <SiPostgresql /> },
      { title: 'MongoDB', icon: <DiMongodb /> },
      { title: 'Firebase', icon: <SiFirebase /> },
      { title: 'Supabase', icon: <SiSupabase /> },
    ],
  },
  {
    heading: 'Platforms',
    items: [
      { title: 'Windows', icon: <FaWindows /> },
      { title: 'MacOS', icon: <FaApple /> },
      { title: 'iOS', icon: <FaApple /> },
      { title: 'Android', icon: <SiFlutter /> },
      { title: 'Linux', icon: <FaLinux /> },
    ],
  },
  {
    heading: 'DevOps',
    items: [
      { title: 'AWS', icon: <SiAwsamplify /> },
      { title: 'Docker', icon: <FaDocker /> },
      { title: 'Proxmox', icon: <SiProxmox /> },
    ],
  },
  {
    heading: 'Design',
    items: [
      { title: 'Figma', icon: <SiFigma /> },
      { title: 'Canva', icon: <SiCanva /> },
    ],
  },
];

// TechBox props
interface TechBoxProps {
  icon: ReactNode;
  title: string;
}

const TechBox: React.FC<TechBoxProps> = ({ icon, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const experience: ExperienceLevel = experienceLevels[title] || 'Intermediate';

  return (
    <div
      className="tech-box"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="tech-box-content">
        <div className="tech-icon-wrapper">
          <div className="tech-icon">{icon}</div>
        </div>
        <div className="tech-info">
          <div className="tech-name">{title}</div>
          <div className="tech-experience" data-level={experience}>
            {experience}
          </div>
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
                  <TechBox 
                    key={idx} 
                    icon={item.icon} 
                    title={item.title}
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