"use client";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FiArrowDown } from "react-icons/fi";
import { Background } from "@/app/components/ui/Background";
import AboutSection from "@/app/about/page";
import TechStackSection from "@/app/techstack/page";
import ProjectsSection from "@/app/projects/page";
import ContactSection from "@/app/contact/page";
import NicheSection from "@/app/niche/page";

const roles = ["Fullstack Developer", "Grey Hat", "Cybersecurity and Robotics Enthusiast", "Gamer"];

function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRole % roles.length];
    const handleTyping = () => {
      setDisplayText((prev) => {
        if (isDeleting) return prev.substring(0, prev.length - 1);
        return fullText.substring(0, prev.length + 1);
      });
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    };
    const timer = setTimeout(handleTyping, isDeleting ? 75 : 150);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Background />
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: `linear-gradient(to right, transparent, var(--color-accent), transparent)` }} />
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 mt-8 lg:mt-0">
            <p className="text-sm sm:text-base font-medium tracking-[0.15em] uppercase mb-3"
              style={{ color: "var(--color-text-muted)" }}>
              Hi, I am
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-4"
              style={{ color: "var(--color-text-primary)" }}>
              Brian<br />Kareithi
            </h1>
            <div className="h-10 sm:h-12 mt-3 mb-10">
              <p className="text-xl sm:text-2xl lg:text-3xl font-light tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}>
                <span>{displayText}</span>
                <span className="ml-1 font-semibold animate-pulse" style={{ color: "var(--color-accent)" }}>|</span>
              </p>
            </div>

            <div className="flex justify-center lg:justify-start gap-3">
              {[
                { href: "https://github.com/Brian-Kareithi", icon: FaGithub, label: "GitHub" },
                { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: FaLinkedinIn, label: "LinkedIn" },
                { href: "mailto:kareithibrian2@gmail.com", icon: IoMailOutline, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href}
                  className="p-3.5 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                  target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-8 rounded-sm transition-all duration-700 opacity-0 group-hover:opacity-100"
                style={{ background: "var(--color-accent-glow)" }} />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                <div className="absolute -inset-4 rounded-sm animate-spin-slow"
                  style={{
                    border: "1px solid transparent",
                    borderTopColor: "var(--color-accent)",
                    borderRightColor: "var(--color-accent-secondary)",
                  }} />
                <div className="absolute -inset-2 rounded-sm"
                  style={{ border: "1px solid var(--color-border)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"
                  alt="Brian Kareithi"
                  className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                  style={{ border: "1px solid var(--color-border)" }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const next = target.nextElementSibling as HTMLElement;
                    if (next) next.style.display = "flex";
                  }}
                />
                <div className="hidden absolute inset-0 rounded-sm items-center justify-center text-3xl sm:text-5xl font-bold"
                  style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}>
                  <span style={{ color: "var(--color-text-primary)" }}>BK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium"
            style={{ color: "var(--color-text-muted)" }}>
            Scroll
          </span>
          <FiArrowDown className="w-4 h-4" style={{ color: "var(--color-text-muted)" }} />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
      <NicheSection />
    </>
  );
}
