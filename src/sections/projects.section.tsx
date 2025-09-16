import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  type: "app" | "webapp" | "tool";
  image: string;
  github: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "UMMA Vision",
    description: "A university project portal for managing activities and resources.",
    type: "webapp",
    image: "/assets/umma-vision.jpeg",
    github: "https://github.com/yourusername/umma-vision",
    demo: "https://umma-vision.demo.com"
  },
  {
    title: "First Lady Scholarship App",
    description: "An application for managing scholarships and school support.",
    type: "app",
    image: "/assets/first-lady-scholarship.jpeg",
    github: "https://github.com/yourusername/scholarship-app",
  },
  {
    title: "Library Link",
    description: "A mobile system for accessing past papers and revision materials.",
    type: "app",
    image: "/assets/library-link.jpeg",
    github: "https://github.com/yourusername/library-link",
    demo: "https://library-link.demo.com"
  },
  {
    title: "Visitor Management System",
    description: "Logs visitors, guards on duty, and parking spots in organizations.",
    type: "webapp",
    image: "/assets/visitor-system.jpeg",
    github: "https://github.com/yourusername/visitor-system",
  },
  {
    title: "Cybershield",
    description: "A cybersecurity software project with detailed system architecture.",
    type: "tool",
    image: "/assets/cybershield.jpeg",
    github: "https://github.com/yourusername/cybershield",
    demo: "https://cybershield.demo.com"
  },
  {
    title: "Prayer Times & Qibla App",
    description: "Islamic app with Qibla compass, mosque locator, and donation system.",
    type: "app",
    image: "/assets/prayer-app.jpeg",
    github: "https://github.com/yourusername/prayer-app",
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
      case "app": return "rgba(34, 197, 94, 0.8)";
      case "webapp": return "rgba(59, 130, 246, 0.8)";
      case "tool": return "rgba(245, 158, 11, 0.8)";
      default: return "rgba(156, 163, 175, 0.8)";
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="section-header">
          <h2>My <span>Projects</span></h2>
          <p>A showcase of my recent work and contributions</p>
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
                />
                <div className="project-type" style={{ backgroundColor: getTypeColor(project.type) }}>
                  {project.type}
                </div>
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
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
                </div>
              </div>
              
              <div className="glow-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};