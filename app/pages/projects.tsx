"use client";
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
  const getTypeColor = (type: string) => {
    switch (type) {
      case "app": return "bg-blue-100 text-blue-800";
      case "webapp": return "bg-purple-100 text-purple-800";
      case "tool": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "in-progress" ? "bg-yellow-500" : "bg-green-500";
  };

  return (
    <section className="min-h-screen w-full py-16 px-4 bg-gray-900" id="projects">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-gray-300 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            A showcase of my work - some were collaborative efforts with other talented developers
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <FaUsers className="text-base" />
            <span className="text-sm">Indicates collaborative project</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.image-fallback') as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="image-fallback hidden absolute inset-0 bg-gray-200 items-center justify-center text-gray-400 text-2xl font-bold"
                >
                  {project.title.charAt(0)}
                </div>
                
                {/* Status Badge */}
                <div className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white ${project.status === "in-progress" ? "bg-yellow-500" : "bg-green-500"}`}>
                  {project.status === "in-progress" ? "In Progress" : "Completed"}
                </div>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(project.type)}`}>
                      {project.type}
                    </span>
                    {project.collaboration && (
                      <FaUsers className="text-blue-500 text-sm" />
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-500">
                        +{project.techStack.length - 4}
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
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-400 rounded-lg text-gray-700 hover:text-gray-900 transition-all duration-200 flex-1 justify-center hover:bg-gray-50"
                  >
                    <FaGithub className="text-base" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-all duration-200 flex-1 justify-center"
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

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="border border-gray-200 bg-gray-50 rounded-xl p-8 max-w-2xl mx-auto">
            <p className="text-gray-700 mb-4">
              It's impossible to list all my projects here - this page would be way too long! But these are some of my favorites.
            </p>
            <p className="text-gray-600 mb-6">
              I'm constantly experimenting with new technologies and building solutions to real-world problems.
            </p>
            <a 
              href="https://github.com/Brian-Kareithi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-lg font-medium transition-colors duration-200"
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