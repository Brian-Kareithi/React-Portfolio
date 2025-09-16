import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaUsers } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  type: "app" | "webapp" | "tool";
  image: string;
  github: string;
  demo?: string;
  collaboration?: boolean;
}

const projects: Project[] = [
  {
    title: "UMMA Vision",
    description: "A comprehensive university portal for managing projects, activities, and resources with real-time collaboration features.",
    type: "webapp",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/umma-vision.jpeg",
    github: "https://github.com/Brian-Kareithi/umma-vision",
    demo: "https://umma-vision.vercel.app",
    collaboration: true
  },
  {
    title: "First Lady Scholarship App",
    description: "Mobile application for scholarship management and school support systems with automated eligibility checking.",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/first-lady-scholarship.jpeg",
    github: "https://github.com/Brian-Kareithi/scholarship-app",
    collaboration: true
  },
  {
    title: "Library Link",
    description: "Mobile system providing access to past papers, revision materials, and digital library resources for students.",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/library-link.jpeg",
    github: "https://github.com/Brian-Kareithi/library-link",
    demo: "https://library-link.vercel.app"
  },
  {
    title: "Visitor Management System",
    description: "Digital system for logging visitors, tracking guards on duty, and managing parking spots in organizations.",
    type: "webapp",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/visitor-system.jpeg",
    github: "https://github.com/Brian-Kareithi/visitor-system",
    collaboration: true
  },
  {
    title: "Cybershield Security Suite",
    description: "Comprehensive cybersecurity software with threat detection, system architecture analysis, and vulnerability scanning.",
    type: "tool",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/cybershield.jpeg",
    github: "https://github.com/Brian-Kareithi/cybershield",
    demo: "https://cybershield-demo.vercel.app"
  },
  {
    title: "Prayer Times & Qibla Finder",
    description: "Islamic application featuring Qibla compass, mosque locator, prayer times, and donation system integration.",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/prayer-app.jpeg",
    github: "https://github.com/Brian-Kareithi/prayer-app",
    collaboration: true
  },
];

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "app": return "rgba(100, 255, 218, 0.8)";
      case "webapp": return "rgba(59, 130, 246, 0.8)";
      case "tool": return "rgba(245, 158, 11, 0.8)";
      default: return "rgba(156, 163, 175, 0.8)";
    }
  };

  return (
    <section id="projects" className="projects-section">
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
      
      {/* Floating decorative elements */}
      <div className="floating-element el-1"></div>
      <div className="floating-element el-2"></div>
      <div className="floating-element el-3"></div>
      
      <div className="projects-container">
        <div className="section-header">
          <h2>My <span>Projects</span></h2>
          <p>A showcase of my work - some were collaborative efforts with other talented developers</p>
          <div className="collaboration-note">
            <FaUsers /> <span>Indicates collaborative project</span>
          </div>
        </div>

        <div className={`projects-grid ${isVisible ? 'visible' : ''}`}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              style={{ '--glow-color': getTypeColor(project.type) } as React.CSSProperties}
            >
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'image-fallback';
                    fallback.innerHTML = `<span>${project.title.charAt(0)}</span>`;
                    target.parentNode?.appendChild(fallback);
                  }}
                />
                <div className="project-type" style={{ backgroundColor: getTypeColor(project.type) }}>
                  {project.type}
                </div>
                {project.collaboration && (
                  <div className="collaboration-badge">
                    <FaUsers /> Team Project
                  </div>
                )}
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                      <FaGithub />
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-footer">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    <FaGithub className="icon" />
                    View Code
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="demo-link"
                    >
                      <FaExternalLinkAlt className="icon" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              
              <div className="glow-effect"></div>
            </div>
          ))}
        </div>

        <div className="more-projects">
          <p>And many more web projects and experiments available on my GitHub!</p>
          <a href="https://github.com/Brian-Kareithi" target="_blank" rel="noopener noreferrer" className="github-button">
            <FaGithub /> Explore More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};