import { useEffect, useState } from 'react';
import { BiLogoTypescript } from 'react-icons/bi';
import { DiMongodb, DiMsqlServer, DiRuby } from 'react-icons/di';
import { FaApple, FaBootstrap, FaCss3, FaDocker, FaHtml5, FaJava, FaLinux, FaNodeJs, FaReact, FaWindows } from 'react-icons/fa';
import { SiAwsamplify, SiCanva, SiCplusplus, SiExpress, SiFastify, SiFigma, SiFirebase, SiFlutter, SiKotlin, SiMui, SiMysql, SiPostgresql, SiProxmox, SiShadcnui, SiSupabase, SiTailwindcss } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

// Experience levels for each technology
const experienceLevels = {
  // Core Stack
  'Next JS': 'Advanced',
  'React JS': 'Expert',
  'Node JS': 'Advanced',
  'TypeScript': 'Advanced',
  'Fastify': 'Intermediate',
  'Express JS': 'Advanced',
  
  // Languages
  'Java': 'Advanced',
  'Python': 'Intermediate',
  'JavaScript': 'Expert',
  'Ruby': 'Beginner',
  'C++': 'Intermediate',
  'Kotlin': 'Intermediate',
  'Flutter': 'Intermediate',
  
  // Frontend
  'HTML5': 'Expert',
  'CSS3': 'Expert',
  'Bootstrap': 'Advanced',
  'Tailwind': 'Advanced',
  'Material UI': 'Intermediate',
  'ShadCn UI': 'Intermediate',
  
  // Databases
  'MsSQL': 'Intermediate',
  'MySQL': 'Advanced',
  'PostgreSQL': 'Intermediate',
  'MongoDB': 'Advanced',
  'Firebase': 'Advanced',
  'Supabase': 'Intermediate',
  
  // Platforms
  'Windows': 'Expert',
  'MacOS': 'Advanced',
  'iOS': 'Intermediate',
  'Android': 'Intermediate',
  'Linux': 'Advanced',
  
  // DevOps
  'AWS': 'Intermediate',
  'Docker': 'Intermediate',
  'Proxmox': 'Beginner',
  
  // Design
  'Figma': 'Intermediate',
  'Canva': 'Advanced'
};

const techs = [
  {
    heading: 'Core Stack',
    items: [
      { title: 'Next JS', icon: <TbBrandNextjs color='rgb(255, 255, 255)' />, color: 'rgba(255, 255, 255, 0.4)' },
      { title: 'React JS', icon: <FaReact color='rgb(97, 219, 251)' />, color: 'rgb(97, 219, 251, 0.6)' },
      { title: 'Node JS', icon: <FaNodeJs color='rgb(104, 160, 99)' />, color: 'rgb(104, 160, 99)' },
      { title: 'TypeScript', icon: <BiLogoTypescript color='rgb(0, 122, 204)' />, color: 'rgba(0, 122, 204, 0.6)' },
      { title: 'Fastify', icon: <SiFastify color='rgba(255, 255, 255)' />, color: 'rgba(255, 255, 255, 0.4)' },
      { title: 'Express JS', icon: <SiExpress color='rgba(255, 255, 255)' />, color: 'rgba(255, 255, 255, 0.4)' },
    ],
  },
  {
    heading: 'Languages',
    items: [
      { title: 'Java', icon: <FaJava color='rgb(231, 111, 0)' />, color: 'rgba(231, 111, 0, 0.6)' },
      { title: 'Python', icon: <SiCplusplus color='rgb(55, 118, 171)' />, color: 'rgba(55, 118, 171, 0.6)' },
      { title: 'JavaScript', icon: <FaReact color='rgb(240, 219, 79)' />, color: 'rgba(240, 219, 79, 0.75)' },
      { title: 'Ruby', icon: <DiRuby color='rgb(224, 17, 95)' />, color: 'rgba(224, 17, 95, 0.7)' },
      { title: 'C++', icon: <SiCplusplus color='rgb(0, 123, 181)' />, color: 'rgba(0, 123, 181, 0.6)' },
      { title: 'Kotlin', icon: <SiKotlin color='rgb(255, 87, 34)' />, color: 'rgba(255, 87, 34, 0.7)' },
      { title: 'Flutter', icon: <SiFlutter color='rgb(0, 180, 255)' />, color: 'rgba(0, 180, 255, 0.6)' },
    ],
  },
  {
    heading: 'Frontend',
    items: [
      { title: 'HTML5', icon: <FaHtml5 color='rgb(227, 76, 38)' />, color: 'rgba(227, 76, 38, 0.75)' },
      { title: 'CSS3', icon: <FaCss3 color='rgb(38, 77, 228)' />, color: 'rgba(38, 77, 228, 0.75)' },
      { title: 'Bootstrap', icon: <FaBootstrap color='rgb(125, 17, 248)' />, color: 'rgb(125, 17, 248, 0.75)' },
      { title: 'Tailwind', icon: <SiTailwindcss color='rgb(6, 182, 212)' />, color: 'rgb(6, 182, 212, 0.7)' },
      { title: 'Material UI', icon: <SiMui color='rgb(0, 127, 255)' />, color: 'rgb(0, 127, 255, 0.6)' },
      { title: 'ShadCn UI', icon: <SiShadcnui color='rgb(255, 255, 255)' />, color: 'rgba(255, 255, 255, 0.4)' },
    ],
  },
  {
    heading: 'Databases',
    items: [
      { title: 'MsSQL', icon: <DiMsqlServer color='rgb(230, 50, 42)' />, color: 'rgb(241, 83, 75, 0.5)' },
      { title: 'MySQL', icon: <SiMysql color='rgb(0, 122, 158)' />, color: 'rgb(0, 122, 158, 0.75)' },
      { title: 'PostgreSQL', icon: <SiPostgresql color='rgb(51,103,145)' />, color: 'rgba(51,103,145,0.7)' },
      { title: 'MongoDB', icon: <DiMongodb color='rgb(0, 237, 100)' />, color: 'rgb(0, 237, 100, 0.7)' },
      { title: 'Firebase', icon: <SiFirebase color='rgb(255, 202, 40)' />, color: 'rgba(255, 202, 40, 0.7)' },
      { title: 'Supabase', icon: <SiSupabase color='rgb(16,185,129)' />, color: 'rgba(16,185,129,0.7)' },
    ],
  },
  {
    heading: 'Platforms',
    items: [
      { title: 'Windows', icon: <FaWindows color='rgb(0,120,215)' />, color: 'rgba(0,120,215,0.6)' },
      { title: 'MacOS', icon: <FaApple color='rgb(100,100,100)' />, color: 'rgba(100,100,100,0.6)' },
      { title: 'iOS', icon: <FaApple color='rgb(255,255,255)' />, color: 'rgba(255,255,255,0.6)' },
      { title: 'Android', icon: <SiFlutter color='rgb(164,198,57)' />, color: 'rgba(164,198,57,0.7)' },
      { title: 'Linux', icon: <FaLinux color='rgb(240,200,40)' />, color: 'rgba(240,200,40,0.7)' },
    ],
  },
  {
    heading: 'DevOps',
    items: [
      { title: 'AWS', icon: <SiAwsamplify color='rgb(255,153,0)' />, color: 'rgba(255,153,0,0.7)' },
      { title: 'Docker', icon: <FaDocker color='rgb(0,123,181)' />, color: 'rgba(0,123,181,0.7)' },
      { title: 'Proxmox', icon: <SiProxmox color='rgb(239,83,80)' />, color: 'rgba(239,83,80,0.7)' },
    ],
  },
  {
    heading: 'Design',
    items: [
      { title: 'Figma', icon: <SiFigma color='rgb(255,0,141)' />, color: 'rgba(255,0,141,0.7)' },
      { title: 'Canva', icon: <SiCanva color='rgb(0,159,227)' />, color: 'rgba(0,159,227,0.7)' },
    ],
  },
];

const GlowBox = ({ icon, color, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const experience = experienceLevels[title] || 'Intermediate';

  return (
    <div
      className="glow-box"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--glow-color': color,
      }}
    >
      <div className="glow-box-content">
        <div className="glow-box-icon">{icon}</div>
        <div className="glow-box-info">
          <div className="glow-box-title">{title}</div>
          <div className="glow-box-experience">{experience}</div>
        </div>
      </div>
      <div className="glow-effect"></div>
    </div>
  );
};

const SectionTitle = ({ title, subTitle }) => {
  return (
    <div className="section-title">
      <h2>
        {title} <span>{subTitle}</span>
      </h2>
      <div className="section-title-line"></div>
    </div>
  );
};

export const TechStack = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="tech-stack" id="tech-stack">
      <div className="tech-stack-container">
        <div className="tech-stack-title">
          <SectionTitle title="Tech" subTitle="STACK" />
        </div>
        
        <div className={`tech-grid ${isVisible ? 'visible' : ''}`}>
          {techs.map((tech, index) => (
            <div className="tech-category" key={index}>
              <h3 className="tech-category-heading">{tech.heading}</h3>
              <div className="tech-row">
                {tech.items.map((item, index) => (
                  <GlowBox
                    key={index}
                    icon={item.icon}
                    color={item.color}
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