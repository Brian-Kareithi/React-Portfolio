"use client";
import { ReactNode, useState } from 'react';
import { BiLogoTypescript } from 'react-icons/bi';
import { DiMongodb, DiMsqlServer, DiRuby } from 'react-icons/di';
import {
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
  SiExpress,
  SiFastify,
  SiFirebase,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiPython,
  SiSupabase,
  SiTailwindcss,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

interface TechItem {
  title: string;
  icon: ReactNode;
  level: 'proficient' | 'advanced' | 'intermediate' | 'familiar';
}

interface TechCategory {
  heading: string;
  description: string;
  items: TechItem[];
}

const techs: TechCategory[] = [
  {
    heading: 'Frontend',
    description: 'Modern frontend technologies and frameworks',
    items: [
      { title: 'HTML5', icon: <FaHtml5 />, level: 'proficient' },
      { title: 'CSS3', icon: <FaCss3 />, level: 'proficient' },
      { title: 'JavaScript', icon: <SiJavascript />, level: 'proficient' },
      { title: 'TypeScript', icon: <BiLogoTypescript />, level: 'advanced' },
      { title: 'React', icon: <FaReact />, level: 'proficient' },
      { title: 'Next.js', icon: <TbBrandNextjs />, level: 'advanced' },
      { title: 'Tailwind CSS', icon: <SiTailwindcss />, level: 'proficient' },
    ],
  },
  {
    heading: 'Backend',
    description: 'Server-side and API development',
    items: [
      { title: 'Node.js', icon: <FaNodeJs />, level: 'proficient' },
      { title: 'Express', icon: <SiExpress />, level: 'proficient' },
      { title: 'Fastify', icon: <SiFastify />, level: 'intermediate' },
      { title: 'Python', icon: <SiPython />, level: 'advanced' },
      { title: 'Java', icon: <FaJava />, level: 'intermediate' },
      { title: 'Ruby', icon: <DiRuby />, level: 'familiar' },
    ],
  },
  {
    heading: 'Database',
    description: 'Data storage and management systems',
    items: [
      { title: 'MongoDB', icon: <DiMongodb />, level: 'proficient' },
      { title: 'PostgreSQL', icon: <SiPostgresql />, level: 'advanced' },
      { title: 'MySQL', icon: <SiMysql />, level: 'proficient' },
      { title: 'MsSQL', icon: <DiMsqlServer />, level: 'intermediate' },
      { title: 'Firebase', icon: <SiFirebase />, level: 'intermediate' },
      { title: 'Supabase', icon: <SiSupabase />, level: 'familiar' },
    ],
  },
  {
    heading: 'DevOps & Tools',
    description: 'Deployment, infrastructure, and development tools',
    items: [
      { title: 'Docker', icon: <FaDocker />, level: 'intermediate' },
      { title: 'Linux', icon: <FaLinux />, level: 'proficient' },
      { title: 'Git', icon: <span className="text-sm">Git</span>, level: 'proficient' },
      { title: 'Windows Server', icon: <FaWindows />, level: 'intermediate' },
      { title: 'AWS', icon: <span className="text-sm">AWS</span>, level: 'intermediate' },
      { title: 'CI/CD', icon: <span className="text-sm">CI/CD</span>, level: 'intermediate' },
    ],
  },
];

const levelConfig = {
  proficient: { label: 'Proficient', color: 'border-blue-500 bg-blue-500/10 text-blue-400' },
  advanced: { label: 'Advanced', color: 'border-green-500 bg-green-500/10 text-green-400' },
  intermediate: { label: 'Intermediate', color: 'border-yellow-500 bg-yellow-500/10 text-yellow-400' },
  familiar: { label: 'Familiar', color: 'border-gray-500 bg-gray-500/10 text-gray-400' },
};

const TechStack = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (heading: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [heading]: !prev[heading]
    }));
  };

  const getVisibleItems = (items: TechItem[], heading: string) => {
    return expandedCategories[heading] ? items : items.slice(0, 4);
  };

  return (
    <section className="w-full py-12 px-4 relative bg-gradient-to-b from-black to-blue-1000" id="techstack">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3 text-white">
            Technical Stack
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            A curated selection of technologies I work with, categorized by proficiency
          </p>
        </div>

        {/* Legend */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-3 text-center">Proficiency Levels</div>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(levelConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${config.color.split(' ')[0]}`}></div>
                <span className="text-xs text-gray-400">{config.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techs.map((category) => (
            <div key={category.heading} className="border border-white/10 bg-white/5 rounded-lg p-4 hover:border-white/20 transition-all duration-200">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{category.heading}</h3>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                    {category.items.length} items
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{category.description}</p>
                <div className="w-full h-px bg-white/10 mb-4"></div>
              </div>
              
              <div className="space-y-2">
                {getVisibleItems(category.items, category.heading).map((item, idx) => {
                  const level = levelConfig[item.level];
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 border border-white/5 bg-white/2 rounded hover:bg-white/5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="text-lg text-white/80">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className={`text-xs px-2 py-0.5 rounded-full border ${level.color} mt-1`}>
                            {level.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {category.items.length > 4 && (
                <button 
                  onClick={() => toggleCategory(category.heading)}
                  className="w-full mt-4 py-2 text-xs text-white/70 hover:text-white border border-white/10 rounded hover:border-white/20 transition-all duration-200"
                >
                  {expandedCategories[category.heading] ? 'Show Less' : `Show ${category.items.length - 4} More`}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12">
          <div className="border border-white/10 bg-white/5 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Stack Summary</h3>
              <p className="text-sm text-gray-400">
                Distribution of technologies by proficiency level
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(
                techs.flatMap(cat => cat.items).reduce((acc, item) => {
                  acc[item.level] = (acc[item.level] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([level, count]) => {
                const total = techs.flatMap(cat => cat.items).length;
                const percentage = Math.round((count / total) * 100);
                const config = levelConfig[level as keyof typeof levelConfig];
                
                return (
                  <div key={level} className="text-center p-4 border border-white/10 rounded">
                    <div className={`text-2xl font-bold mb-2 ${config.color.split(' ')[2]}`}>
                      {count}
                    </div>
                    <div className="text-sm font-medium text-white mb-1">
                      {config.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {percentage}% of stack
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-sm text-gray-400 text-center">
                Total technologies: {techs.flatMap(cat => cat.items).length} across {techs.length} categories
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Technologies are regularly evaluated and updated based on project requirements and industry trends
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechStack;