"use client";
import { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

interface Project {
  title: string;
  type: string;
  status: "completed" | "active" | "in-progress" | "archived";
  description: string;
  details: string[];
  highlights?: string[];
  stack: string[];
  repo: string;
  repoType: "public" | "private";
  demo?: string;
}

const projects: Project[] = [
  {
    title: "Steadfast Academy - Parent Module",
    type: "Full-Stack Platform",
    status: "active",
    description: "Comprehensive educational management platform with web and mobile interfaces for parent engagement.",
    details: [
      "Managed parent interactions, student progress tracking, communication workflows, and academic engagement.",
      "Designed with scalability, performance, and user experience as core principles.",
      "Mobile application built with Expo and React Native, available on Android and iOS for convenient on-the-go access.",
    ],
    highlights: [
      "Next.js web platform with responsive design",
      "React Native mobile app (Android & iOS)",
      "Real-time communication and progress tracking",
    ],
    stack: ["Next.js", "React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL"],
    repo: "",
    repoType: "private",
  },
  {
    title: "Steadfast Academy - Library Module",
    type: "Web Application",
    status: "active",
    description: "Dedicated web-based library management solution integrated into the academy ecosystem.",
    details: [
      "Digital resource management and library administration workflows.",
      "Student and staff access management with role-based permissions.",
      "Built for efficiency, maintainability, and seamless integration with existing systems.",
    ],
    highlights: [
      "Digital catalog and resource management",
      "Role-based access control",
      "Integrated with academy ecosystem",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    repo: "",
    repoType: "private",
  },
  {
    title: "Fitness Tracker",
    type: "Mobile Application",
    status: "active",
    description: "Personal Kotlin-based Android application for tracking sleep, diet, and health metrics.",
    details: [
      "Sleep tracking and habit monitoring with daily logging and progress visualization.",
      "Diet and nutrition management with meal tracking and health metric recording.",
      "One of the few applications I actively use myself on a daily basis, a continuously evolving project driven by real-world requirements rather than theoretical use cases.",
    ],
    stack: ["Kotlin", "Android SDK", "Room Database", "MPAndroidChart"],
    repo: "https://github.com/Brian-Kareithi/Physical-Fitness",
    repoType: "public",
  },
  {
    title: "Custom Jellyfin Client",
    type: "Mobile Application",
    status: "active",
    description: "Self-hosted media client built specifically for my home server environment.",
    details: [
      "Developed my own Jellyfin mobile application tailored to my workflow, preferences, and media consumption habits.",
      "Personalized media browsing experience with custom UI and interaction patterns.",
      "Direct integration with self-hosted Jellyfin server, optimized for my personal ecosystem.",
    ],
    stack: ["React Native", "Expo", "Jellyfin API", "TypeScript"],
    repo: "https://github.com/Brian-Kareithi/Jellyfin-Mobile",
    repoType: "public",
  },
  {
    title: "House Hunters",
    type: "Web Platform",
    status: "archived",
    description: "Student housing discovery platform conceived during university.",
    details: [
      "Helping campus students discover and compare rental properties based on personalized preferences.",
      "Planned features included location-based search, preference filtering, and budget-aware recommendations.",
      "An interesting exploration of marketplace and recommendation-system concepts, though never fully completed due to limited market demand at the time.",
    ],
    highlights: [
      "Location-based property discovery",
      "Preference filtering and recommendations",
      "Budget-aware search",
    ],
    stack: ["React", "Node.js", "MongoDB", "Google Maps API"],
    repo: "https://github.com/Brian-Kareithi/House-Hunters-Frontend",
    repoType: "public",
  },
  {
    title: "House Hunters Backend",
    type: "Backend API",
    status: "archived",
    description: "Backend API for the House Hunters student housing discovery platform.",
    details: [
      "RESTful API providing property data, user management, and search functionality.",
      "Built with Node.js and MongoDB for scalability and flexibility.",
      "Supports location-based queries and preference filtering.",
    ],
    highlights: [
      "RESTful API architecture",
      "MongoDB database integration",
      "Location-based search endpoints",
    ],
    stack: ["Node.js", "Express", "MongoDB", "JWT"],
    repo: "https://github.com/Brian-Kareithi/House-Hunters-Backend",
    repoType: "public",
  },
  {
    title: "Network API",
    type: "Library / API",
    status: "completed",
    description: "Python-based networking API supporting cybersecurity infrastructure.",
    details: [
      "Provides networking utilities and secure communication mechanisms for integration into larger cybersecurity systems.",
      "Developed as part of the infrastructure supporting my final-year cybersecurity project.",
    ],
    stack: ["Python", "Socket Programming", "SSL/TLS", "REST API"],
    repo: "https://github.com/Brian-Kareithi/network-api",
    repoType: "public",
  },
  {
    title: "CyberShield",
    type: "Security Research",
    status: "completed",
    description: "Final-year project focused on improving mobile device security on public networks.",
    details: [
      "Public Wi-Fi networks expose users to traffic interception, spoofing attacks, and malicious access points.",
      "Introduced protective mechanisms that monitor and secure mobile device communications across potentially hostile networks.",
      "Focused on mobile security, network protection, threat detection, and secure communications.",
    ],
    stack: ["Python", "Network Security", "SSL/TLS", "Threat Detection"],
    repo: "https://github.com/Brian-Kareithi/cybershield",
    repoType: "public",
  },
  {
    title: "QuickPrint",
    type: "Web Application",
    status: "completed",
    description: "Privacy-focused document printing system modernizing the cyber café workflow.",
    details: [
      "Users scan a QR code to open a temporary upload portal, documents are uploaded to a transient server, printed, then automatically removed.",
      "No need for flash drives - reduced risk of sensitive documents remaining on shared computers.",
      "A simple but impactful solution demonstrating how small software systems can solve real-world privacy and usability challenges.",
    ],
    highlights: [
      "QR code-based upload portal",
      "Ephemeral file storage with auto-deletion",
      "Privacy-first printing workflow",
    ],
    stack: ["React", "Node.js", "Express", "SQLite", "QR Code API"],
    repo: "https://github.com/Thee-Entity/QuickPrint-Client",
    repoType: "public",
  },
];

export default function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen w-full py-28 md:py-36 px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeader
          index="03"
          label="Work"
          title={<>Work &amp; <em className="font-serif-accent">experiments</em></>}
          description="Most of my public projects are available on GitHub, where the source code, architecture decisions, and detailed README documentation can be explored."
        />

        <StaggerReveal>
        <div className="mb-12">
          <div className="flat-card p-4 xs:p-6 md:p-8"
            style={{ borderColor: "var(--color-border)" }}>
            <p className="text-[9px] font-medium tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--color-text-muted)" }}>
              Personal Portfolio
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 p-4 flat-card"
                style={{ borderColor: "var(--color-accent)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] px-2 py-0.5 rounded tracking-wider uppercase font-mono"
                    style={{
                      border: "1px solid var(--color-accent)",
                      color: "var(--color-accent)",
                    }}>
                    Current
                  </span>
                  <h4 className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                    Portfolio V2
                  </h4>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  Built with Next.js. Improved architecture, enhanced performance optimizations, better SEO, and a more refined user experience. Demonstrates my evolution in modern React and full-stack development practices.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["Next.js", "TypeScript", "Tailwind CSS"].map((tech) => (
                    <span key={tech} className="text-[9px] font-mono px-2 py-0.5 rounded"
                      style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
              You are viewing V2. This represents the latest iteration with improved architecture and design decisions.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://portfoliov2-ruby.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium transition-colors duration-200 min-h-[44px]"
                style={{ border: "1px solid var(--color-accent)", color: "var(--color-accent)" }}>
                <ExternalLink className="w-3 h-3" />
                Live Demo
              </a>
              <a href="https://github.com/Brian-Kareithi/3d-website" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium transition-colors duration-200 min-h-[44px]"
                style={{ border: "1px solid var(--color-glass-border)", color: "var(--color-text-secondary)" }}>
                <ExternalLink className="w-3 h-3" />
                View Source
              </a>
            </div>
          </div>
        </div>
        </StaggerReveal>

        <StaggerReveal staggerDelay={80}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {projects.map((project, index) => {
            const isExpanded = expanded === index;
            return (
              <div key={index}
                className="flat-card"
                style={{ borderColor: "var(--color-border)" }}>
                <div className="p-6 md:p-8 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : index)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold"
                          style={{ color: "var(--color-text-primary)" }}>
                          {project.title}
                        </h3>
                        <span className="text-[9px] px-2 py-0.5 rounded tracking-wider uppercase font-mono"
                          style={{
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text-muted)",
                          }}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm mt-2 leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}>
                        {project.description}
                      </p>
                    </div>
                    <button className="ml-4 mt-1 p-2 transition-transform duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      style={{ color: "var(--color-text-muted)" }}>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] tracking-wider uppercase font-mono"
                      style={{ color: "var(--color-accent)" }}>
                      {project.type}
                    </span>
                    {project.repoType === "private" && (
                      <span className="flex items-center gap-1 text-[9px] tracking-wider uppercase font-mono"
                        style={{ color: "var(--color-text-muted)" }}>
                        <Lock className="w-3 h-3" />
                        Private
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[9px] font-mono px-2 py-1 rounded"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text-muted)",
                        }}>
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-[9px] font-mono px-2 py-1 rounded"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text-muted)",
                        }}>
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 md:px-8 pb-8 border-t animate-fade-in-up"
                    style={{ borderColor: "var(--color-border)" }}>
                    <div className="pt-6 space-y-6">
                      <div>
                        <p className="text-[9px] font-medium tracking-[0.15em] uppercase mb-3"
                          style={{ color: "var(--color-accent)" }}>
                          Overview
                        </p>
                        <ul className="space-y-2">
                          {project.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm"
                              style={{ color: "var(--color-text-secondary)" }}>
                              <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                                style={{ backgroundColor: "var(--color-accent)" }} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {project.highlights && (
                        <div>
                          <p className="text-[9px] font-medium tracking-[0.15em] uppercase mb-3"
                            style={{ color: "var(--color-text-muted)" }}>
                            Highlights
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.highlights.map((hl, i) => (
                              <span key={i} className="px-3 py-2 rounded text-sm"
                                style={{
                                  border: "1px solid var(--color-border)",
                                  color: "var(--color-text-secondary)",
                                }}>
                                {hl}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 pt-6"
                        style={{ borderTop: "1px solid var(--color-border)" }}>
                        {project.repo && (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px]"
                            style={{
                              border: "1px solid var(--color-border)",
                              color: "var(--color-text-secondary)",
                            }}>
                            <Github className="w-4 h-4" />
                            View Source
                          </a>
                        )}
                        {project.repoType === "private" && (
                          <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium min-h-[44px]"
                            style={{
                              border: "1px solid var(--color-border)",
                              color: "var(--color-text-muted)",
                            }}>
                            <Lock className="w-4 h-4" />
                            Private Repository
                          </div>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px]"
                            style={{
                              border: "1px solid var(--color-accent)",
                              color: "var(--color-accent)",
                            }}>
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
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
        </StaggerReveal>

        <StaggerReveal>
        <div className="mt-16 text-center py-12 px-6 border-y"
          style={{ borderColor: "var(--color-border)" }}>
          <p className="text-sm leading-relaxed max-w-3xl mx-auto mb-6"
            style={{ color: "var(--color-text-secondary)" }}>
            Great ideas are meant to inspire others, and software improves when knowledge is shared. Whether you are a developer, recruiter, founder, or fellow engineer, feel free to explore the repositories, examine the architecture decisions, suggest improvements, borrow ideas, or collaborate on future innovations.
          </p>
          <a href="https://github.com/Brian-Kareithi" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px]"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}>
            <Github className="w-4 h-4" />
            Explore All Repositories
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        </StaggerReveal>
      </div>
      </ScrollReveal>
    </section>
  );
}
