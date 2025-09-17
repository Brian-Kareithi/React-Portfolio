import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaUsers } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  detailedDescription: string;
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
    description: "A comprehensive university portal for managing projects, activities, and resources with real-time collaboration features.",
    detailedDescription: "Solving the problem of inefficient university portals by creating a modern, user-friendly platform that centralizes all academic resources, project management, and collaboration tools in one place. Currently under development with The Entity Limited.",
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
    description: "Mobile application for scholarship management and school support systems with automated eligibility checking.",
    detailedDescription: "Addressing the challenges in scholarship application processes by creating an intuitive mobile app that automates eligibility verification, document submission, and status tracking. Developed in collaboration with The Entity Limited.",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/first-lady-scholarship.jpeg",
    github: "https://github.com/Brian-Kareithi/scholarship-app",
    collaboration: true,
    status: "completed",
    techStack: ["React Native", "Firebase", "Node.js"]
  },
  {
    title: "Library Link",
    description: "Mobile system providing access to past papers, revision materials, and digital library resources for students.",
    detailedDescription: "Solving the problem of limited access to educational resources by creating a centralized platform where students can easily find past papers, revision materials, and library resources. Developed using Java in collaboration with Collins Lagat.",
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
    description: "Digital system for logging visitors, tracking guards on duty, and managing parking spots in organizations.",
    detailedDescription: "A solo project addressing the inefficiencies in traditional visitor management. Replaced paper logbooks with a digital system that tracks visitors, security personnel, and parking availability in real-time, enhancing security and efficiency.",
    type: "webapp",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/visitor-system.jpeg",
    github: "https://github.com/Brian-Kareithi/visitor-system",
    collaboration: false,
    status: "completed",
    techStack: ["React", "Express.js", "MySQL"]
  },
  {
    title: "Cybershield Security Suite",
    description: "Comprehensive cybersecurity software with threat detection, system architecture analysis, and vulnerability scanning.",
    detailedDescription: "A solo project focused on protecting users from phishing attacks and online threats. Developed a comprehensive security tool that scans for vulnerabilities, detects threats in real-time, and provides detailed system architecture analysis.",
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
    description: "Islamic application featuring Qibla compass, mosque locator, prayer times, and donation system integration.",
    detailedDescription: "A solo project creating a comprehensive Islamic app that helps users find prayer times, locate the Qibla direction, find nearby mosques, and make donations. Designed with a focus on accuracy and user experience.",
    type: "app",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/prayer-app.jpeg",
    github: "https://github.com/Brian-Kareithi/prayer-app",
    collaboration: false,
    status: "completed",
    techStack: ["React Native", "Geolocation API", "Firebase"]
  },
  {
    title: "Digital ID",
    description: "Secure digital identity platform that allows users to store and manage all their identification documents in one place.",
    detailedDescription: "Solving the problem of physical ID vulnerability by creating a secure digital platform where users can store, manage, and authenticate all their identification documents. Features advanced encryption and multi-factor authentication for maximum security.",
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
    description: "System that allows students' final year project titles to be verified by lecturers to ensure originality.",
    detailedDescription: "Addressing the problem of duplicate or unoriginal project titles in academic institutions. Created a system where students can submit their project titles for verification, and lecturers can ensure the project has never been done before, promoting academic integrity.",
    type: "webapp",
    image: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/titleverifier.jpeg",
    github: "https://github.com/Brian-Kareithi/project-verifier",
    collaboration: true,
    status: "completed",
    techStack: ["Vue.js", "Node.js", "MongoDB"]
  },
  {
    title: "Car Services System",
    description: "Comprehensive app for car management, including service booking, car washes, and spare rental options.",
    detailedDescription: "A collaborative project solving the fragmentation in car maintenance services. Created a unified platform where car owners can book services, schedule washes, and even get spare rentals when their car is in the shop, all through one convenient application.",
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
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

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

  const handleProjectHover = (index: number | null) => {
    setExpandedProject(index);
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
              className={`project-card ${expandedProject === index ? 'expanded' : ''}`}
              style={{ '--glow-color': getTypeColor(project.type) } as React.CSSProperties}
              onMouseEnter={() => handleProjectHover(index)}
              onMouseLeave={() => handleProjectHover(null)}
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
                <div className="project-status">
                  {project.status === "in-progress" ? "In Development" : "Completed"}
                </div>
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
                <p className="project-description">{project.description}</p>
                
                <div className="project-details">
                  <div className="problem-solving">
                    <p>{project.detailedDescription}</p>
                  </div>
                  
                  {project.techStack && (
                    <div className="tech-stack">
                      <h4>Tech Stack:</h4>
                      <div className="tech-tags">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
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