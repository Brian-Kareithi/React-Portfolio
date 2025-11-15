"use client";
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
      className="group relative flex flex-col items-center justify-center w-24 h-24 border border-white/20 bg-white/5 backdrop-blur-lg rounded-xl transition-all duration-300 hover:scale-105 hover:border-blue-400/60 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
      style={{ '--brand-color': color } as React.CSSProperties}
    >
      <div className="flex flex-col items-center justify-center w-full h-full z-10 text-center gap-1">
        <div className="flex items-center justify-center">
          <div className="text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--brand-color)]">
            {icon}
          </div>
        </div>
        <div className="text-xs font-semibold text-white leading-tight px-1">
          {title}
        </div>
        <div 
          className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all duration-300 group-hover:scale-105 backdrop-blur-sm border ${
            experience === 'Expert' ? 'bg-green-500/20 text-green-300 border-green-400/30' :
            experience === 'Advanced' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' :
            experience === 'Intermediate' ? 'bg-orange-500/20 text-orange-300 border-orange-400/30' :
            'bg-gray-500/20 text-gray-300 border-gray-400/30'
          }`}
        >
          {experience}
        </div>
      </div>
    </div>
  );
};

export default function TechStack() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen w-full py-20 px-4 relative" id="tech-stack">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Technologies I work with to create exceptional digital experiences
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {techs.map((category, index) => (
            <div 
              key={index}
              className="border border-white/20 bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:border-white/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-blue-300 mb-4 text-center pb-3 border-b border-white/20 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {category.heading}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {category.items.map((item, idx) => (
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
}