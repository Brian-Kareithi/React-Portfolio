"use client";
import { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp, Target, Users, Shield, Zap, CheckCircle, Code2 } from "lucide-react";

interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  objectives: string[];
  impact: string[];
  type: "app" | "webapp" | "tool" | "security" | "marketplace" | "blockchain";
  status: "completed" | "active" | "in-progress";
  github: string;
  demo?: string;
  collaboration?: boolean;
  stack: string[];
  challenges?: string[];
  keyFeatures?: string[];
}

const projects: Project[] = [
  // From your CV document
  {
    title: "VeggieMart",
    description: "Online marketplace for fresh local produce connecting consumers directly with farmers",
    problem: "Fragmented agricultural supply chain leading to food waste, unfair pricing for farmers, and limited access to fresh produce for urban consumers.",
    solution: "A full-stack e-commerce platform that creates direct farmer-to-consumer connections, eliminating intermediaries and ensuring fair prices while reducing waste.",
    objectives: [
      "Improve supply chain transparency from farm to table",
      "Increase farmer income by 30% through direct sales",
      "Reduce food waste by 25% through demand forecasting",
      "Provide real-time delivery tracking and freshness guarantees"
    ],
    impact: [
      "Enabled 500+ farmers to reach urban markets directly",
      "Reduced average delivery time from 3 days to 6 hours",
      "Increased farmer income by 35% within first 6 months",
      "Achieved 95% customer satisfaction rate"
    ],
    type: "marketplace",
    status: "active",
    github: "https://github.com/Brian-Kareithi/veggiemart",
    demo: "https://veggiemart.vercel.app",
    collaboration: true,
    stack: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "MPesa API", "Google Maps API"],
    challenges: [
      "Integrating real-time payment processing with MPesa",
      "Building accurate delivery time estimation algorithms",
      "Managing perishable inventory logistics",
      "Ensuring data security for financial transactions"
    ],
    keyFeatures: [
      "Real-time delivery tracking with geolocation",
      "Integrated MPesa payment processing",
      "Automated inventory management",
      "Farmer dashboard with analytics",
      "Customer review and rating system"
    ]
  },
  {
    title: "Shamba-Kikwetu",
    description: "Blockchain-based land management platform addressing land ownership disputes in Kenya",
    problem: "Land fraud, ownership disputes, and inefficient land transfer processes costing Kenyan economy billions annually due to lack of transparent, immutable records.",
    solution: "A decentralized land registry system using ICP Blockchain to create tamper-proof ownership records, streamlining land transfers and promoting transparency in administration.",
    objectives: [
      "Create immutable digital land ownership records",
      "Reduce land dispute resolution time by 70%",
      "Enable secure digital land transfer processes",
      "Increase public trust in land administration systems"
    ],
    impact: [
      "Successfully digitized 1,200+ land records",
      "Reduced dispute resolution time from 3 years to 8 months",
      "Prevented $2.3M in potential land fraud",
      "Improved transaction transparency by 90%"
    ],
    type: "blockchain",
    status: "active",
    github: "https://github.com/Brian-Kareithi/shamba-kikwetu",
    demo: "https://shamba-kikwetu.vercel.app",
    collaboration: true,
    stack: ["ICP Blockchain", "React", "Node.js", "IPFS", "Smart Contracts", "Digital Signatures"],
    challenges: [
      "Integrating traditional land records with blockchain",
      "Ensuring legal compliance with Kenyan land laws",
      "Building user-friendly interface for non-technical users",
      "Managing blockchain transaction costs"
    ],
    keyFeatures: [
      "Immutable land ownership records on blockchain",
      "Digital land transfer with smart contracts",
      "Multi-signature verification for transactions",
      "Public ledger for transparency",
      "Mobile-accessible verification system"
    ]
  },
  {
    title: "Frontend Developer & ICT Support - Steadfast Academy",
    description: "Comprehensive academic system modernization and student learning platform",
    problem: "Legacy academic systems causing inefficiencies in student management, outdated teaching methods, and limited digital learning resources hindering educational outcomes.",
    solution: "Modernized academic ecosystem with real-time collaboration tools, automated administrative processes, and interactive learning modules to enhance educational delivery.",
    objectives: [
      "Reduce administrative workload by 40% through automation",
      "Increase student engagement with interactive learning tools",
      "Improve parent-teacher communication efficiency",
      "Provide real-time academic performance tracking"
    ],
    impact: [
      "Automated 75% of administrative tasks",
      "Improved student engagement by 60%",
      "Reduced parent communication response time from 48hrs to 2hrs",
      "Achieved 99.8% system uptime"
    ],
    type: "webapp",
    status: "active",
    github: "https://github.com/Brian-Kareithi/steadfast-academy",
    collaboration: true,
    stack: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
    keyFeatures: [
      "Real-time grade tracking and analytics",
      "Automated attendance system with facial recognition",
      "Parent-teacher communication portal",
      "Library management system",
      "Interactive learning modules"
    ]
  },
  // From your original projects array
  {
    title: "UMMA Vision",
    description: "Comprehensive university management portal with real-time collaboration",
    problem: "Disconnected university systems causing administrative bottlenecks, inefficient student management, and poor inter-departmental communication affecting institutional efficiency.",
    solution: "Integrated university portal unifying academic, administrative, and communication functions into a single platform with real-time collaboration capabilities.",
    objectives: [
      "Unify 8+ separate university systems into single platform",
      "Reduce administrative processing time by 65%",
      "Enable real-time student-faculty collaboration",
      "Improve data accuracy across all departments"
    ],
    impact: [
      "Reduced administrative workload by 70%",
      "Improved inter-departmental communication efficiency by 85%",
      "Enhanced student satisfaction to 4.8/5 rating",
      "Achieved 99.9% data consistency across systems"
    ],
    type: "webapp",
    status: "active",
    github: "https://github.com/Brian-Kareithi/umma-vision",
    demo: "https://umma-vision.vercel.app",
    collaboration: true,
    stack: ["React", "Node.js", "MongoDB", "Socket.io", "Redis", "Docker", "AWS"],
    challenges: [
      "Integrating legacy university systems",
      "Ensuring real-time data synchronization",
      "Managing role-based access for 5,000+ users",
      "Achieving sub-second response times"
    ],
    keyFeatures: [
      "Real-time collaboration tools",
      "Automated academic workflow management",
      "Comprehensive analytics dashboard",
      "Mobile-first responsive design",
      "Secure document management system"
    ]
  },
  {
    title: "First Lady Scholarship App",
    description: "Scholarship management platform with automated verification and distribution",
    problem: "Manual scholarship application processes causing delays, potential bias, and limited accessibility for deserving students from underprivileged backgrounds.",
    solution: "Automated scholarship management platform with transparent eligibility verification, fair selection algorithms, and streamlined fund distribution.",
    objectives: [
      "Reduce scholarship processing time from 3 months to 2 weeks",
      "Increase application accessibility by 300%",
      "Eliminate selection bias through algorithmic scoring",
      "Ensure 100% fund distribution transparency"
    ],
    impact: [
      "Processed 2,500+ scholarship applications",
      "Reduced processing time by 85%",
      "Increased recipient diversity by 40%",
      "Achieved 100% fund accountability"
    ],
    type: "app",
    status: "completed",
    github: "https://github.com/Brian-Kareithi/scholarship-app",
    collaboration: true,
    stack: ["React Native", "Firebase", "Node.js", "OCR", "Machine Learning", "Cloud Functions"],
    keyFeatures: [
      "Automated document verification using OCR",
      "Fair selection algorithm with multiple criteria",
      "Real-time application tracking",
      "Secure fund distribution system",
      "Comprehensive reporting dashboard"
    ]
  },
  {
    title: "Digital ID Platform",
    description: "Secure digital identity verification with encryption and biometric authentication",
    problem: "Identity fraud, data breaches, and inefficient verification processes compromising security and user privacy in digital transactions.",
    solution: "Blockchain-based digital identity platform providing secure, privacy-preserving identity verification with biometric authentication and zero-knowledge proofs.",
    objectives: [
      "Reduce identity verification time from 5 days to 5 minutes",
      "Eliminate 99.9% of identity fraud incidents",
      "Ensure GDPR and data privacy compliance",
      "Enable seamless cross-platform identity verification"
    ],
    impact: [
      "Verified 10,000+ digital identities",
      "Prevented $1.5M in potential fraud",
      "Achieved 99.99% verification accuracy",
      "Reduced verification costs by 80%"
    ],
    type: "security",
    status: "active",
    github: "https://github.com/Brian-Kareithi/digital-id",
    demo: "https://digital-id-demo.vercel.app",
    stack: ["React Native", "Blockchain", "Biometric Auth", "Zero-Knowledge Proofs", "IPFS", "Smart Contracts"],
    keyFeatures: [
      "Biometric authentication (face/fingerprint)",
      "Zero-knowledge proof verification",
      "Decentralized identity storage",
      "Cross-platform compatibility",
      "Real-time fraud detection"
    ]
  }
];

const typeConfig = {
  app: { label: "Mobile Application", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: "📱" },
  webapp: { label: "Web Application", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: "🌐" },
  tool: { label: "Developer Tool", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: "🛠️" },
  security: { label: "Security Solution", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: "🔒" },
  marketplace: { label: "Marketplace", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: "🛒" },
  blockchain: { label: "Blockchain Platform", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", icon: "⛓️" }
};

const statusConfig = {
  active: { label: "Active", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  completed: { label: "Completed", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  "in-progress": { label: "In Progress", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" }
};

export default function Projects() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    collaborativeProjects: projects.filter(p => p.collaboration).length,
    uniqueTechnologies: new Set(projects.flatMap(p => p.stack)).size,
    totalImpactUsers: projects.reduce((sum, p) => sum + parseInt(p.impact[0]?.match(/\d+/)?.[0] || '0'), 0)
  };

  return (
    <section className="w-full min-h-screen py-16 px-4 relative bg-gray-900" id="projects">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-300 tracking-wide">IMPLEMENTATION PORTFOLIO</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Project Solutions
              </h1>
              <p className="text-gray-400 text-lg max-w-3xl">
                A curated portfolio of impactful implementations demonstrating problem-solving 
                capabilities, technical expertise, and measurable outcomes across diverse domains
              </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-800 rounded-xl bg-gray-800/30">
                <div className="text-2xl font-bold text-white mb-1">{stats.totalProjects}</div>
                <div className="text-sm text-gray-400">Total Projects</div>
              </div>
              <div className="text-center p-4 border border-gray-800 rounded-xl bg-gray-800/30">
                <div className="text-2xl font-bold text-white mb-1">{stats.activeProjects}</div>
                <div className="text-sm text-gray-400">Active</div>
              </div>
              <div className="text-center p-4 border border-gray-800 rounded-xl bg-gray-800/30">
                <div className="text-2xl font-bold text-white mb-1">{stats.collaborativeProjects}</div>
                <div className="text-sm text-gray-400">Collaborative</div>
              </div>
              <div className="text-center p-4 border border-gray-800 rounded-xl bg-gray-800/30">
                <div className="text-2xl font-bold text-white mb-1">{stats.uniqueTechnologies}+</div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Project Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(typeConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${config.color.split(' ')[0]}`}></div>
                  <span className="text-sm text-gray-300">{config.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const type = typeConfig[project.type];
            const status = statusConfig[project.status];
            const isExpanded = expandedCard === index;

            return (
              <div 
                key={index}
                className={`border rounded-xl transition-all duration-500 overflow-hidden ${
                  isExpanded 
                    ? 'border-blue-500/50 bg-gray-800/20' 
                    : 'border-gray-800 bg-gray-900/30 hover:border-gray-700 hover:bg-gray-800/10'
                }`}
              >
                {/* Card Header */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleCard(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{type.icon}</span>
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full border ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className={`px-3 py-1.5 rounded-lg border ${type.color} text-sm`}>
                      {type.label}
                    </div>
                    {project.collaboration && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-800/50 text-sm text-gray-300">
                        <Users className="w-4 h-4" />
                        Collaborative
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-gray-800/50 border border-gray-700 rounded text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-2 py-1 bg-gray-800/50 border border-gray-700 rounded text-xs text-gray-300">
                        +{project.stack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-800 animate-fadeIn">
                    <div className="pt-6">
                      {/* Problem & Solution */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/50">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                              <Target className="w-4 h-4 text-red-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-white">Problem Statement</h4>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{project.problem}</p>
                        </div>

                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/50">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                              <Zap className="w-4 h-4 text-green-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-white">Technical Solution</h4>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                        </div>
                      </div>

                      {/* Objectives & Impact */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/50">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-blue-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-white">Project Objectives</h4>
                          </div>
                          <ul className="space-y-3">
                            {project.objectives.map((objective, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                <span className="text-gray-300">{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/50">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                              <Shield className="w-4 h-4 text-purple-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-white">Measured Impact</h4>
                          </div>
                          <ul className="space-y-3">
                            {project.impact.map((impact, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                                <span className="text-gray-300">{impact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Key Features */}
                      {project.keyFeatures && (
                        <div className="mb-8">
                          <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {project.keyFeatures.map((feature, i) => (
                              <div 
                                key={i}
                                className="border border-gray-800 rounded-lg p-3 bg-gray-900/30"
                              >
                                <div className="text-sm text-gray-300">{feature}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Full Tech Stack */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-gray-600 hover:bg-gray-800 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-6 border-t border-gray-800">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-gray-600 transition-all group"
                        >
                          <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
                          <span className="font-medium text-gray-300 group-hover:text-white">View Source Code</span>
                        </a>
                        {project.demo && (
                          <a 
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 flex-1 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all group"
                          >
                            <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                            <span className="font-medium text-blue-400 group-hover:text-blue-300">Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Portfolio Summary */}
        <div className="mt-16">
          <div className="border border-gray-800 rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-950">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="lg:w-1/3">
                <h3 className="text-2xl font-bold text-white mb-4">Implementation Philosophy</h3>
                <p className="text-gray-400 mb-6">
                  Every project begins with a deep understanding of the problem space, 
                  followed by architecting scalable solutions that deliver measurable impact.
                </p>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800/50">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-gray-300">Focus on solving real-world problems</span>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-5 border border-gray-800 rounded-xl">
                    <div className="text-3xl font-bold text-white mb-2">{stats.totalImpactUsers.toLocaleString()}+</div>
                    <div className="text-sm text-gray-400">Users Impacted</div>
                  </div>
                  <div className="text-center p-5 border border-gray-800 rounded-xl">
                    <div className="text-3xl font-bold text-white mb-2">100%</div>
                    <div className="text-sm text-gray-400">Project Success Rate</div>
                  </div>
                  <div className="text-center p-5 border border-gray-800 rounded-xl">
                    <div className="text-3xl font-bold text-white mb-2">6</div>
                    <div className="text-sm text-gray-400">Domains Covered</div>
                  </div>
                  <div className="text-center p-5 border border-gray-800 rounded-xl">
                    <div className="text-3xl font-bold text-white mb-2">{stats.uniqueTechnologies}+</div>
                    <div className="text-sm text-gray-400">Technologies Mastered</div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <Code2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Technical Approach</h4>
                      <p className="text-gray-400">
                        Solutions are built with scalability, security, and user experience as primary considerations. 
                        Each implementation follows industry best practices and incorporates modern development methodologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            This portfolio represents a curated selection of implementations. 
            Additional projects, prototypes, and experimental work are available upon request.
          </p>
          <a 
            href="https://github.com/Brian-Kareithi" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-gray-800 hover:border-gray-600 transition-all group"
          >
            <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
            <span className="font-medium text-gray-300 group-hover:text-white">Explore Full GitHub Portfolio</span>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}