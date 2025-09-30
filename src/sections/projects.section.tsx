import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaUsers } from "react-icons/fa";
import { Background } from '../components/background';

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
      case "app": return "#4A7FA7";
      case "webapp": return "#1A3D63";
      case "tool": return "#0A1931";
      default: return "#B3CFE5";
    }
  };

  return (
    <section id="projects" className="projects-section">
      <Background />
      
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
                    <FaUsers /> Team
                  </div>
                )}
                <div className="project-status">
                  {project.status === "in-progress" ? "In Progress" : "Completed"}
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {project.techStack && (
                  <div className="tech-tags">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="tech-tag">+{project.techStack.length - 3}</span>
                    )}
                  </div>
                )}
                
                <div className="project-footer">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    <FaGithub className="icon" />
                    Code
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="demo-link"
                    >
                      <FaExternalLinkAlt className="icon" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
              
              <div className="glow-effect"></div>
            </div>
          ))}
        </div>

        <div className="more-projects">
          <p>It's impossible to list all my projects here - this page would be way too long! But these are some of my favorites.</p>
          <p>I'm constantly experimenting with new technologies and building solutions to real-world problems.</p>
          <a href="https://github.com/Brian-Kareithi" target="_blank" rel="noopener noreferrer" className="github-button">
            <FaGithub /> Explore More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};