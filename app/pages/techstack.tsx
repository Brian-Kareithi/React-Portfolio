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

interface TechItem {
  title: string;
  icon: ReactNode;
}

interface TechCategory {
  heading: string;
  description: string;
  items: TechItem[];
}

const techs: TechCategory[] = [
  {
    heading: 'Frontend',
    description: 'Building responsive and dynamic user interfaces.',
    items: [
      { title: 'HTML5', icon: <FaHtml5 /> },
      { title: 'CSS3', icon: <FaCss3 /> },
      { title: 'JavaScript', icon: <SiJavascript /> },
      { title: 'TypeScript', icon: <BiLogoTypescript /> },
      { title: 'React.js', icon: <FaReact /> },
      { title: 'Next.js', icon: <TbBrandNextjs /> },
      { title: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { title: 'Bootstrap', icon: <FaBootstrap /> },
      { title: 'Material UI', icon: <SiMui /> },
      { title: 'ShadCn UI', icon: <SiShadcnui /> },
    ],
  },
  {
    heading: 'Database',
    description: 'Managing and designing efficient data storage solutions.',
    items: [
      { title: 'MongoDB', icon: <DiMongodb /> },
      { title: 'MySQL', icon: <SiMysql /> },
      { title: 'PostgreSQL', icon: <SiPostgresql /> },
      { title: 'MsSQL', icon: <DiMsqlServer /> },
      { title: 'Firebase', icon: <SiFirebase /> },
      { title: 'Supabase', icon: <SiSupabase /> },
      { title: 'Redis', icon: <span className="text-lg">🔴</span> },
      { title: 'SQLite', icon: <span className="text-lg">🗃️</span> },
    ],
  },
  {
    heading: 'Tools',
    description: 'Design, coding, and productivity tools.',
    items: [
      { title: 'Figma', icon: <SiFigma /> },
      { title: 'Canva', icon: <SiCanva /> },
      { title: 'VS Code', icon: <span className="text-lg">💻</span> },
      { title: 'Git', icon: <span className="text-lg">📐</span> },
      { title: 'NPM', icon: <span className="text-lg">📦</span> },
      { title: 'ESLint', icon: <span className="text-lg">✅</span> },
      { title: 'Prettier', icon: <span className="text-lg">✨</span> },
      { title: 'Postman', icon: <span className="text-lg">📮</span> },
      { title: 'Terminal', icon: <span className="text-lg">⌨️</span> },
      { title: 'Jira', icon: <span className="text-lg">📊</span> },
    ],
  },
  {
    heading: 'Backend',
    description: 'Creating robust APIs and server-side applications.',
    items: [
      { title: 'Node.js', icon: <FaNodeJs /> },
      { title: 'Express.js', icon: <SiExpress /> },
      { title: 'Fastify', icon: <SiFastify /> },
      { title: 'Java', icon: <FaJava /> },
      { title: 'Python', icon: <SiPython /> },
      { title: 'Ruby', icon: <DiRuby /> },
      { title: 'C++', icon: <SiCplusplus /> },
      { title: 'Flutter', icon: <SiFlutter /> },
      { title: 'Kotlin', icon: <SiKotlin /> },
      { title: 'GraphQL', icon: <span className="text-lg">📈</span> },
    ],
  },
  {
    heading: 'DevOps',
    description: 'Deployments, CI/CD, and server management.',
    items: [
      { title: 'Docker', icon: <FaDocker /> },
      { title: 'GitHub', icon: <span className="text-lg">🚀</span> },
      { title: 'AWS', icon: <SiAwsamplify /> },
      { title: 'Vercel', icon: <span className="text-lg">▲</span> },
      { title: 'Netlify', icon: <span className="text-lg">🌐</span> },
      { title: 'Proxmox', icon: <SiProxmox /> },
      { title: 'Linux', icon: <FaLinux /> },
      { title: 'Windows', icon: <FaWindows /> },
      { title: 'MacOS', icon: <FaApple /> },
      { title: 'Android', icon: <SiAndroid /> },
    ],
  },
  {
    heading: 'Fundamentals',
    description: 'Core web development concepts and best practices.',
    items: [
      { title: 'Responsive Design', icon: <span className="text-lg">📱</span> },
      { title: 'Cross Browser', icon: <span className="text-lg">🌐</span> },
      { title: 'Performance Optimization', icon: <span className="text-lg">⚡</span> },
      { title: 'Component Driven', icon: <span className="text-lg">🧩</span> },
      { title: 'REST APIs', icon: <span className="text-lg">🔌</span> },
      { title: 'Web Security', icon: <span className="text-lg">🔒</span> },
      { title: 'Testing', icon: <span className="text-lg">🧪</span> },
      { title: 'SEO', icon: <span className="text-lg">🔍</span> },
      { title: 'Accessibility', icon: <span className="text-lg">♿</span> },
      { title: 'Clean Code', icon: <span className="text-lg">📝</span> },
    ],
  },
];

const TechStack = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleCategory = (heading: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [heading]: !prev[heading]
    }));
  };

  const getVisibleItems = (items: TechItem[], heading: string) => {
    return expandedCategories[heading] ? items : items.slice(0, 6);
  };

  return (
    <section className="min-h-screen w-full py-12 px-4 relative bg-gray-900" id="techstack">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Tech Stack
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From frontend frameworks to backend systems, databases, DevOps, and key development principles
          </p>
        </div>

        {/* Grid Layout - 3 columns on desktop, 1 on mobile */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
          {/* Column 1 */}
          <div className="space-y-6">
            {/* Frontend Card */}
            <div className="border border-gray-700 bg-gray-800/50 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Frontend</h3>
                <p className="text-gray-400 text-sm">Building responsive and dynamic user interfaces.</p>
                <div className="w-full h-px bg-gray-700 mt-4"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {getVisibleItems(techs[0].items, techs[0].heading).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-gray-700 bg-gray-800/30 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                    <div className="text-xl text-blue-400">{item.icon}</div>
                    <div className="text-white font-medium text-sm">{item.title}</div>
                  </div>
                ))}
              </div>
              
              {techs[0].items.length > 6 && (
                <button 
                  onClick={() => toggleCategory(techs[0].heading)}
                  className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 border border-gray-700 rounded-lg hover:border-blue-500 transition-all duration-300"
                >
                  {expandedCategories[techs[0].heading] ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>

            {/* Database Card */}
            <div className="border border-gray-700 bg-gray-800/50 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Database</h3>
                <p className="text-gray-400 text-sm">Managing and designing efficient data storage solutions.</p>
                <div className="w-full h-px bg-gray-700 mt-4"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {getVisibleItems(techs[1].items, techs[1].heading).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-gray-700 bg-gray-800/30 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                    <div className="text-xl text-green-400">{item.icon}</div>
                    <div className="text-white font-medium text-sm">{item.title}</div>
                  </div>
                ))}
              </div>
              
              {techs[1].items.length > 6 && (
                <button 
                  onClick={() => toggleCategory(techs[1].heading)}
                  className="w-full mt-4 py-2 text-sm text-green-400 hover:text-green-300 border border-gray-700 rounded-lg hover:border-green-500 transition-all duration-300"
                >
                  {expandedCategories[techs[1].heading] ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {/* Tools Card */}
            <div className="border border-gray-700 bg-gray-800/50 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Tools</h3>
                <p className="text-gray-400 text-sm">Design, coding, and productivity tools.</p>
                <div className="w-full h-px bg-gray-700 mt-4"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {getVisibleItems(techs[2].items, techs[2].heading).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-gray-700 bg-gray-800/30 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                    <div className="text-xl text-purple-400">{item.icon}</div>
                    <div className="text-white font-medium text-sm">{item.title}</div>
                  </div>
                ))}
              </div>
              
              {techs[2].items.length > 6 && (
                <button 
                  onClick={() => toggleCategory(techs[2].heading)}
                  className="w-full mt-4 py-2 text-sm text-purple-400 hover:text-purple-300 border border-gray-700 rounded-lg hover:border-purple-500 transition-all duration-300"
                >
                  {expandedCategories[techs[2].heading] ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>

            {/* Backend Card */}
            <div className="border border-gray-700 bg-gray-800/50 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Backend</h3>
                <p className="text-gray-400 text-sm">Creating robust APIs and server-side applications.</p>
                <div className="w-full h-px bg-gray-700 mt-4"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {getVisibleItems(techs[3].items, techs[3].heading).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-gray-700 bg-gray-800/30 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                    <div className="text-xl text-orange-400">{item.icon}</div>
                    <div className="text-white font-medium text-sm">{item.title}</div>
                  </div>
                ))}
              </div>
              
              {techs[3].items.length > 6 && (
                <button 
                  onClick={() => toggleCategory(techs[3].heading)}
                  className="w-full mt-4 py-2 text-sm text-orange-400 hover:text-orange-300 border border-gray-700 rounded-lg hover:border-orange-500 transition-all duration-300"
                >
                  {expandedCategories[techs[3].heading] ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            {/* DevOps Card */}
            <div className="border border-gray-700 bg-gray-800/50 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">DevOps</h3>
                <p className="text-gray-400 text-sm">Deployments, CI/CD, and server management.</p>
                <div className="w-full h-px bg-gray-700 mt-4"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {getVisibleItems(techs[4].items, techs[4].heading).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-gray-700 bg-gray-800/30 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                    <div className="text-xl text-red-400">{item.icon}</div>
                    <div className="text-white font-medium text-sm">{item.title}</div>
                  </div>
                ))}
              </div>
              
              {techs[4].items.length > 6 && (
                <button 
                  onClick={() => toggleCategory(techs[4].heading)}
                  className="w-full mt-4 py-2 text-sm text-red-400 hover:text-red-300 border border-gray-700 rounded-lg hover:border-red-500 transition-all duration-300"
                >
                  {expandedCategories[techs[4].heading] ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>

            {/* Fundamentals Card */}
            <div className="border border-gray-700 bg-gray-800/50 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Fundamentals</h3>
                <p className="text-gray-400 text-sm">Core web development concepts and best practices.</p>
                <div className="w-full h-px bg-gray-700 mt-4"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {getVisibleItems(techs[5].items, techs[5].heading).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-gray-700 bg-gray-800/30 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                    <div className="text-xl text-cyan-400">{item.icon}</div>
                    <div className="text-white font-medium text-sm">{item.title}</div>
                  </div>
                ))}
              </div>
              
              {techs[5].items.length > 6 && (
                <button 
                  onClick={() => toggleCategory(techs[5].heading)}
                  className="w-full mt-4 py-2 text-sm text-cyan-400 hover:text-cyan-300 border border-gray-700 rounded-lg hover:border-cyan-500 transition-all duration-300"
                >
                  {expandedCategories[techs[5].heading] ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default TechStack;