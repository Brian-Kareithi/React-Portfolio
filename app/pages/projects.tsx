"use client";

interface Project {
  title: string;
  description: string;
  type: "app" | "webapp" | "tool" | "security";
  status: "completed" | "active";
  github: string;
  demo?: string;
  collaboration?: boolean;
  impact?: string;
  stack: string[];
}

const projects: Project[] = [
  {
    title: "UMMA Vision",
    description: "University portal with real-time collaboration and admin tools",
    type: "webapp",
    status: "active",
    github: "https://github.com/Brian-Kareithi/umma-vision",
    demo: "https://umma-vision.vercel.app",
    collaboration: true,
    impact: "Student management system",
    stack: ["React", "Node.js", "MongoDB", "Socket.io"]
  },
  {
    title: "First Lady Scholarship App",
    description: "Scholarship management with automated eligibility verification",
    type: "app",
    status: "completed",
    github: "https://github.com/Brian-Kareithi/scholarship-app",
    collaboration: true,
    impact: "Educational access platform",
    stack: ["React Native", "Firebase", "Node.js"]
  },
  {
    title: "Library Link",
    description: "Educational resource management for academic materials",
    type: "app",
    status: "completed",
    github: "https://github.com/Brian-Kareithi/library-link",
    demo: "https://library-link.vercel.app",
    collaboration: true,
    impact: "Academic resource distribution",
    stack: ["Java", "Android", "Firebase"]
  },
  {
    title: "Visitor Management System",
    description: "Digital visitor tracking with security integration",
    type: "webapp",
    status: "completed",
    github: "https://github.com/Brian-Kareithi/visitor-system",
    impact: "Security workflow automation",
    stack: ["React", "Express.js", "MySQL"]
  },
  {
    title: "Cybershield Security Suite",
    description: "Threat detection and vulnerability assessment tool",
    type: "security",
    status: "completed",
    github: "https://github.com/Brian-Kareithi/cybershield",
    demo: "https://cybershield-demo.vercel.app",
    impact: "Security automation",
    stack: ["Python", "JavaScript", "Security APIs"]
  },
  {
    title: "Digital ID Platform",
    description: "Secure digital identity with encryption and biometrics",
    type: "security",
    status: "active",
    github: "https://github.com/Brian-Kareithi/digital-id",
    demo: "https://digital-id-demo.vercel.app",
    impact: "Identity verification system",
    stack: ["React Native", "Blockchain", "Biometric Auth"]
  }
];

const typeConfig = {
  app: { label: "Mobile App", color: "border-blue-400 bg-blue-500/10" },
  webapp: { label: "Web App", color: "border-purple-400 bg-purple-500/10" },
  tool: { label: "Tool", color: "border-green-400 bg-green-500/10" },
  security: { label: "Security", color: "border-red-400 bg-red-500/10" }
};

export default function Projects() {
  return (
    <section className="w-full py-12 px-4 relative" id="projects">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3 text-white">
            Selected Projects
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            A curated selection of implementations showcasing technical solutions across domains
          </p>
        </div>

        {/* Compact Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="border border-white/10 bg-white/5 rounded-lg p-4 hover:border-white/20 hover:bg-white/10 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded border ${typeConfig[project.type].color}`}>
                      {typeConfig[project.type].label}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.status === 'active' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : 'bg-green-500/10 text-green-400 border border-green-500/20'
                    }`}>
                      {project.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                    {project.collaboration && (
                      <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">
                        Collaborative
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-4">
                {project.description}
              </p>

              {/* Impact */}
              {project.impact && (
                <div className="mb-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Impact
                  </div>
                  <p className="text-sm text-white/80">
                    {project.impact}
                  </p>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((tech, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/70">
                      +{project.stack.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-2 pt-4 border-t border-white/10">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 text-sm bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-white"
                >
                  View Code
                </a>
                {project.demo && (
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 text-sm bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-all duration-200 text-white"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Statistics */}
        <div className="mt-12">
          <div className="border border-white/10 bg-white/5 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Project Portfolio Summary
              </h3>
              <p className="text-sm text-gray-400">
                Overview of project categories and completion status
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-white/10 rounded">
                <div className="text-2xl font-bold text-white mb-1">
                  {projects.length}
                </div>
                <div className="text-sm text-gray-400">
                  Total Projects
                </div>
              </div>
              <div className="text-center p-4 border border-white/10 rounded">
                <div className="text-2xl font-bold text-white mb-1">
                  {projects.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-400">
                  Completed
                </div>
              </div>
              <div className="text-center p-4 border border-white/10 rounded">
                <div className="text-2xl font-bold text-white mb-1">
                  {projects.filter(p => p.collaboration).length}
                </div>
                <div className="text-sm text-gray-400">
                  Collaborative
                </div>
              </div>
              <div className="text-center p-4 border border-white/10 rounded">
                <div className="text-2xl font-bold text-white mb-1">
                  {new Set(projects.flatMap(p => p.stack)).size}
                </div>
                <div className="text-sm text-gray-400">
                  Technologies Used
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            This represents a curated selection. Additional projects, prototypes, and experiments 
            are available in my GitHub repositories.
          </p>
          <a 
            href="https://github.com/Brian-Kareithi" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/20 rounded px-6 py-2 transition-all duration-200"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}