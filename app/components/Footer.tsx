"use client";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaHeart } from "react-icons/fa";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import InstagramStories from "@/app/components/InstagramStories";

const stories = [
  {
    emoji: "🔧",
    label: "Home Lab",
    title: "Home Lab & Robotics",
    content: "From self-hosted servers and media streaming to home automation and robotics — I build systems that serve real life, not just demos.",
  },
  {
    emoji: "🖥️",
    label: "My Gear",
    title: "The Setup",
    content: "HP 745 G7 & 820 G3 laptops, custom HP tower server (2TB + 16GB), ThinkVision monitors, Newmen peripherals, ORAIMO audio, Galaxy A05s, and a full ESP32 kit for tinkering.",
  },
  {
    emoji: "🤖",
    label: "Robotics",
    title: "Robotics & Embedded",
    content: "Line-following robots with computer vision, home surveillance drone prototypes, automated plant watering systems — powered by ESP32 and C++.",
  },
  {
    emoji: "📡",
    label: "Services",
    title: "Self-Hosted Services",
    content: "Nextcloud for cloud storage, Plex & Jellyfin for media, Pi-hole for network-wide ad blocking, Home Assistant for automation, and a personal Git server.",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 border-t pt-12 pb-6 px-4"
      style={{
        borderColor: "var(--color-glass-border-strong)",
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      <ScrollReveal>
      <div className="max-w-6xl mx-auto">
        {/* Stories */}
        <div className="mb-10 text-center">
          <p className="text-[9px] xs:text-[10px] font-medium tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--color-text-muted)" }}>
            Explore the Lab
          </p>
          <InstagramStories stories={stories} className="mb-6" />
          <a
            href="/niche"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all duration-300 hover:scale-105 rounded-lg"
            style={{
              border: "1px solid var(--color-glass-border-strong)",
              color: "var(--color-text-secondary)",
            }}
          >
            Visit Niche Section →
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-6"
          style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <span>© {year} Brian Kareithi</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Built with</span>
            <FaHeart className="w-3 h-3" style={{ color: "var(--color-accent)" }} />
            <span className="hidden sm:inline">using Next.js</span>
          </div>

          <div className="flex items-center gap-4">
            {[
              { href: "https://github.com/Brian-Kareithi", icon: FaGithub, label: "GitHub" },
              { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: FaLinkedinIn, label: "LinkedIn" },
              { href: "mailto:kareithibrian2@gmail.com", icon: FaEnvelope, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110 liquid-glass"
                style={{
                  color: "var(--color-text-secondary)",
                  borderColor: "var(--color-glass-border)",
                }}
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs"
          style={{ color: "var(--color-text-muted)" }}>
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Tech Stack", href: "/techstack" },
            { label: "Projects", href: "/projects" },
            { label: "Contact", href: "/contact" },
            { label: "Niche", href: "/niche" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:underline transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="mt-6 pt-4 text-center text-xs border-t"
          style={{
            color: "var(--color-text-muted)",
            borderColor: "var(--color-border)",
          }}
        >
          Cybersecurity & Full-Stack Developer — Building secure, scalable digital solutions
        </div>
      </div>
      </ScrollReveal>
    </footer>
  );
}
