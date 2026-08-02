"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { Background } from "@/app/components/ui/Background";
import AboutSection from "@/app/about/page";
import TechStackSection from "@/app/techstack/page";
import ProjectsSection from "@/app/projects/page";
import ContactSection from "@/app/contact/page";

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
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <Background />
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: `linear-gradient(to right, transparent, var(--color-accent), transparent)` }} />
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen pt-16 xs:pt-20 pb-12 xs:pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-10 xs:gap-12 sm:gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 mt-8 xs:mt-10 lg:mt-0 stagger-item">
            <p className="text-[11px] xs:text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 xs:mb-4"
              style={{ color: "var(--color-accent)" }}>
              &gt; Hi, I am
            </p>
            <div className="relative inline-block mb-4 xs:mb-5">
              <span className="hero-hud-corner hero-hud-corner-tl" aria-hidden="true" />
              <span className="hero-hud-corner hero-hud-corner-tr" aria-hidden="true" />
              <span className="hero-hud-corner hero-hud-corner-bl" aria-hidden="true" />
              <span className="hero-hud-corner hero-hud-corner-br" aria-hidden="true" />
              <h1 style={{ color: "var(--color-text-primary)" }}>
                <span className="hero-name-brian mb-2">BRIAN</span>
                <span className="hero-name-kareithi" data-text="KAREITHI">KAREITHI</span>
              </h1>
            </div>
            <div className="h-9 xs:h-11 sm:h-14 mt-2 xs:mt-3 mb-7 xs:mb-9">
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}>
                <span>{displayText}</span>
                <span className="ml-1.5 font-bold animate-pulse" style={{ color: "var(--color-accent)" }}>|</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 xs:gap-4 mb-8 xs:mb-10">
              <Link href="/niche" className="btn-neon btn-neon-primary">
                Enter My Niche Section
                <span aria-hidden="true">&#8961;</span>
              </Link>
            </div>

            <div className="flex justify-center lg:justify-start gap-3 xs:gap-4">
              {[
                { href: "https://github.com/Brian-Kareithi", icon: FaGithub, label: "GitHub" },
                { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: FaLinkedinIn, label: "LinkedIn" },
                { href: "https://www.instagram.com/kareithiv", icon: FaInstagram, label: "Instagram" },
                { href: "mailto:kareithibrian2@gmail.com", icon: IoMailOutline, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href}
                  className="p-3 xs:p-3.5 transition-all duration-300 hover:scale-105 liquid-glass"
                  style={{ color: "var(--color-text-secondary)" }}
                  target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon className="w-4 h-4 xs:w-5 xs:h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center order-1 lg:order-2 lg:ml-[20%]">
            <div className="relative group">
              <div className="absolute -inset-8 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"
                style={{ background: "var(--color-accent-glow)" }} />
              <div className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[26rem] lg:h-[26rem] xl:w-[28rem] xl:h-[28rem]">
                <div className="absolute -inset-3 rounded-sm transition-all duration-500 group-hover:-inset-2"
                  style={{ border: "1px solid var(--color-border)" }} />
                <div className="absolute -top-1 -left-1 w-3 h-3 xs:w-4 xs:h-4 transition-all duration-500 group-hover:w-5 group-hover:h-5"
                  style={{ borderTop: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 xs:w-4 xs:h-4 transition-all duration-500 group-hover:w-5 group-hover:h-5"
                  style={{ borderTop: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" }} />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 xs:w-4 xs:h-4 transition-all duration-500 group-hover:w-5 group-hover:h-5"
                  style={{ borderBottom: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" }} />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 xs:w-4 xs:h-4 transition-all duration-500 group-hover:w-5 group-hover:h-5"
                  style={{ borderBottom: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"
                  alt="Brian Kareithi"
                  className="w-full h-full object-cover object-center rounded-sm sm:grayscale sm:group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.02]"
                  style={{
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const next = target.nextElementSibling as HTMLElement;
                    if (next) next.style.display = "flex";
                  }}
                />
                <div className="hidden absolute inset-0 rounded-sm items-center justify-center text-2xl xs:text-3xl sm:text-5xl font-bold"
                  style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}>
                  <span style={{ color: "var(--color-text-primary)" }}>BK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 xs:bottom-10 flex flex-col items-center gap-2 animate-float">
          <span className="text-[9px] xs:text-[10px] tracking-[0.25em] uppercase font-semibold"
            style={{ color: "var(--color-text-muted)" }}>
            Scroll
          </span>
          <div className="w-5 h-2 xs:w-6 xs:h-2.5 rounded-full" style={{ backgroundColor: "var(--color-text-muted)" }} />
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
    </>
  );
}
