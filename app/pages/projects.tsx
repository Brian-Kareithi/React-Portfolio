"use client";
import { useEffect, useState, useRef } from "react";
import { FaExternalLinkAlt, FaGithub, FaUsers } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  type: "app" | "webapp" | "tool";
  image: string;
  github: string;
  demo?: string;
  collaboration?: boolean;
  status?: "completed" | "in-progress";
  techStack?: string[];
}

const projects: Project[] = [
  {
    title: "UMMA Vision",
    description: "Comprehensive university portal with real-time collaboration features",
    type: "webapp",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/umma-vision.jpeg",
    github: "https://github.com/Brian-Kareithi/umma-vision",
    demo: "https://umma-vision.vercel.app",
    collaboration: true,
    status: "in-progress",
    techStack: ["React", "Node.js", "MongoDB", "Socket.io"]
  },
  {
    title: "First Lady Scholarship App",
    description: "Mobile scholarship management with automated eligibility checking",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/first-lady-scholarship.jpeg",
    github: "https://github.com/Brian-Kareithi/scholarship-app",
    collaboration: true,
    status: "completed",
    techStack: ["React Native", "Firebase", "Node.js"]
  },
  {
    title: "Library Link",
    description: "Mobile system for educational resources and past papers",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/library-link.jpeg",
    github: "https://github.com/Brian-Kareithi/library-link",
    demo: "https://library-link.vercel.app",
    collaboration: true,
    status: "completed",
    techStack: ["Java", "Android SDK", "Firebase"]
  },
  {
    title: "Visitor Management System",
    description: "Digital system for visitor logging and security tracking",
    type: "webapp",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/visitor-system.jpeg",
    github: "https://github.com/Brian-Kareithi/visitor-system",
    collaboration: false,
    status: "completed",
    techStack: ["React", "Express.js", "MySQL"]
  },
  {
    title: "Cybershield Security Suite",
    description: "Cybersecurity tool with threat detection and vulnerability scanning",
    type: "tool",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/cybershield.jpeg",
    github: "https://github.com/Brian-Kareithi/cybershield",
    demo: "https://cybershield-demo.vercel.app",
    collaboration: false,
    status: "completed",
    techStack: ["Python", "JavaScript", "Security APIs"]
  },
  {
    title: "Prayer Times & Qibla Finder",
    description: "Islamic app with prayer times and mosque locator",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/prayer-app.jpeg",
    github: "https://github.com/Brian-Kareithi/prayer-app",
    collaboration: false,
    status: "completed",
    techStack: ["React Native", "Geolocation API", "Firebase"]
  },
  {
    title: "Digital ID",
    description: "Secure digital identity platform with advanced encryption",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/id.jpeg",
    github: "https://github.com/Brian-Kareithi/digital-id",
    demo: "https://digital-id-demo.vercel.app",
    collaboration: false,
    status: "in-progress",
    techStack: ["React Native", "Blockchain", "Biometric Auth"]
  },
  {
    title: "Project Title Verifier",
    description: "System for verifying academic project originality",
    type: "webapp",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/titleverifier.jpeg",
    github: "https://github.com/Brian-Kareithi/project-verifier",
    collaboration: true,
    status: "completed",
    techStack: ["Vue.js", "Node.js", "MongoDB"]
  },
  {
    title: "Car Services System",
    description: "Comprehensive car maintenance and service booking app",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/carservices.jpeg",
    github: "https://github.com/Brian-Kareithi/car-services",
    demo: "https://car-services-demo.vercel.app",
    collaboration: true,
    status: "completed",
    techStack: ["Flutter", "Firebase", "Payment Integration"]
  }
];

export default function Projects() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "app": return "#3B82F6";
      case "webapp": return "#8B5CF6";
      case "tool": return "#10B981";
      default: return "#6B7280";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "in-progress" ? "bg-yellow-500" : "bg-green-500";
  };

  // Get style for initial 3 projects (static)
  const getInitialProjectStyle = (index: number) => {
    if (!isVisible) {
      return {
        opacity: 0,
        transform: 'translateY(20px)'
      };
    }
    
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: `all 0.6s ease-out ${index * 0.2}s`
    };
  };

  // Get style for scroll-triggered projects (slide in from right)
  const getScrollProjectStyle = (index: number) => {
    if (!sectionRef.current) return {};
    
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress through the section
    const scrollProgress = (scrollY - sectionTop + windowHeight * 0.7) / (sectionHeight * 0.5);
    
    // Projects start appearing after the initial 3
    const projectOffset = (index - 3) * 0.15;
    const projectProgress = Math.max(0, Math.min(1, scrollProgress - projectOffset));
    
    // Move from right (100%) to center (0%)
    const translateX = (1 - projectProgress) * 100;
    
    // Fade in as it moves
    const opacity = projectProgress;
    
    return {
      transform: `translateX(${translateX}%)`,
      opacity: Math.max(0, Math.min(1, opacity)),
      transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease'
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full py-20 px-4 relative overflow-hidden" 
      id="projects"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header - Fixed at top */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-4">
            A showcase of my work - some were collaborative efforts with other talented developers
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-300">
            <FaUsers className="text-lg" />
            <span className="text-sm font-medium">Indicates collaborative project</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Initial 3 projects - static layout */}
          {projects.slice(0, 3).map((project, index) => (
            <div 
              key={index}
              className="border border-white/20 bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:border-purple-400/60 group"
              style={getInitialProjectStyle(index)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.image-fallback') as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="image-fallback hidden absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center text-white text-2xl font-bold"
                >
                  {project.title.charAt(0)}
                </div>
                
                {/* Project Type Badge */}
                <div 
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm border border-white/20"
                  style={{ backgroundColor: `${getTypeColor(project.type)}80` }}
                >
                  {project.type.toUpperCase()}
                </div>
                
                {/* Collaboration Badge */}
                {project.collaboration && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-500/80 backdrop-blur-sm text-xs font-bold text-white flex items-center gap-1 border border-blue-400/30">
                    <FaUsers className="text-xs" />
                    Team
                  </div>
                )}
                
                {/* Status Badge */}
                <div className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm border border-white/20 ${getStatusColor(project.status || 'completed')}`}>
                  {project.status === "in-progress" ? "In Progress" : "Completed"}
                </div>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-200 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 border border-white/20 rounded-full text-xs text-gray-200 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 border border-white/20 rounded-full text-xs text-gray-300 backdrop-blur-sm">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Project Links */}
                <div className="flex gap-3">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-purple-400 rounded-lg text-white transition-all duration-300 hover:scale-105 flex-1 justify-center backdrop-blur-sm hover:bg-purple-500/10"
                  >
                    <FaGithub className="text-lg" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600/80 hover:bg-purple-700/80 border border-purple-500/50 rounded-lg text-white transition-all duration-300 hover:scale-105 flex-1 justify-center backdrop-blur-sm"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Scroll-triggered projects - slide in from right */}
          {projects.slice(3).map((project, index) => (
            <div 
              key={index + 3}
              className="border border-white/20 bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:border-purple-400/60 group"
              style={getScrollProjectStyle(index + 3)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.image-fallback') as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="image-fallback hidden absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center text-white text-2xl font-bold"
                >
                  {project.title.charAt(0)}
                </div>
                
                {/* Project Type Badge */}
                <div 
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm border border-white/20"
                  style={{ backgroundColor: `${getTypeColor(project.type)}80` }}
                >
                  {project.type.toUpperCase()}
                </div>
                
                {/* Collaboration Badge */}
                {project.collaboration && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-500/80 backdrop-blur-sm text-xs font-bold text-white flex items-center gap-1 border border-blue-400/30">
                    <FaUsers className="text-xs" />
                    Team
                  </div>
                )}
                
                {/* Status Badge */}
                <div className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm border border-white/20 ${getStatusColor(project.status || 'completed')}`}>
                  {project.status === "in-progress" ? "In Progress" : "Completed"}
                </div>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-200 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 border border-white/20 rounded-full text-xs text-gray-200 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 border border-white/20 rounded-full text-xs text-gray-300 backdrop-blur-sm">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Project Links */}
                <div className="flex gap-3">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-purple-400 rounded-lg text-white transition-all duration-300 hover:scale-105 flex-1 justify-center backdrop-blur-sm hover:bg-purple-500/10"
                  >
                    <FaGithub className="text-lg" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600/80 hover:bg-purple-700/80 border border-purple-500/50 rounded-lg text-white transition-all duration-300 hover:scale-105 flex-1 justify-center backdrop-blur-sm"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="text-center mt-32">
          <div className="border border-white/20 bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl shadow-purple-500/10">
            <p className="text-gray-200 mb-4 text-lg">
              It's impossible to list all my projects here - this page would be way too long! But these are some of my favorites.
            </p>
            <p className="text-gray-200 mb-6 text-lg">
              I'm constantly experimenting with new technologies and building solutions to real-world problems.
            </p>
            <a 
              href="https://github.com/Brian-Kareithi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-purple-400/30"
            >
              <FaGithub className="text-xl" />
              Explore More on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}