"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const roles = ["Fullstack Developer", "Cybersecurity Engineer", "React Native Developer", "Cloud & DevOps Enthusiast"];

const quickLinks = [
  { href: "/about", label: "My Journey", index: "01" },
  { href: "/techstack", label: "Tech Stack", index: "02" },
  { href: "/projects", label: "Selected Work", index: "03" },
  { href: "/contact", label: "Get in Touch", index: "04" },
];

export default function HomeContent() {
  const router = useRouter();
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
        setTimeout(() => setIsDeleting(true), 1400);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    };
    const timer = setTimeout(handleTyping, isDeleting ? 70 : 140);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  const socials = [
    { href: "https://github.com/Brian-Kareithi", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.instagram.com/kareithiv", icon: Instagram, label: "Instagram" },
    { href: "mailto:kareithibrian2@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: "var(--color-accent)" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-10 lg:gap-24">
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 mt-8 lg:mt-0 stagger-item">
            <p
              className="text-[11px] sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              &gt; Hi, I am
            </p>
            <h1 className="relative inline-block mb-4 sm:mb-5">
              <span className="hero-name-brian mb-2">BRIAN</span>
              <span className="hero-name-kareithi">KAREITHI</span>
            </h1>

            <div className="h-9 sm:h-14 mt-2 mb-4 sm:mb-5">
              <p
                aria-live="polite"
                className="text-base sm:text-lg md:text-2xl font-light tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <span>{displayText}</span>
                <span className="type-caret" aria-hidden="true" />
              </p>
            </div>

            <p className="max-w-md mx-auto lg:mx-0 text-sm leading-relaxed mb-7 sm:mb-9"
              style={{ color: "var(--color-text-secondary)" }}>
              I design and build <em className="font-serif-accent">secure</em>, scalable software,
              from mobile apps to cloud-native platforms.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10">
              <button onClick={() => router.push("/projects")} className="btn-neon btn-neon-primary">
                View My Work
              </button>
              <button onClick={() => router.push("/contact")} className="btn-neon btn-neon-ghost">
                Get in Touch
              </button>
            </div>

            <div className="flex justify-center lg:justify-start gap-3 sm:gap-4">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  className="icon-chip p-3.5 liquid-glass"
                  style={{ color: "var(--color-text-secondary)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center order-1 lg:order-2 w-full">
            <div className="relative group">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[26rem] lg:h-[26rem]">
                <div
                  className="absolute -inset-3 rounded-sm transition-all duration-500 group-hover:-inset-2"
                  style={{ border: "1px solid var(--color-border)" }}
                />
                <div
                  className="absolute -top-1 -left-1 w-4 h-4 transition-all duration-500 group-hover:w-5 group-hover:h-5"
                  style={{ borderTop: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" }}
                />
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 transition-all duration-500 group-hover:w-5 group-hover:h-5"
                  style={{ borderTop: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" }}
                />
                <div
                  className="absolute -bottom-1 -left-1 w-4 h-4 transition-all duration-500 group-hover:w-5 group-hover:h-5"
                  style={{ borderBottom: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" }}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 transition-all duration-500 group-hover:w-5 group-hover:h-5"
                  style={{ borderBottom: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" }}
                />
                <Image
                  src="https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"
                  alt="Portrait of Brian Kareithi, full-stack developer and cybersecurity specialist based in Nairobi, Kenya"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 384px, 416px"
                  priority
                  className="object-cover object-center rounded-sm transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  style={{ border: "1px solid var(--color-border)" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl mt-14 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 border-t divide-x divide-y md:divide-y-0"
            style={{ borderColor: "var(--color-border)" }}>
            {quickLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className="group p-4 sm:p-5 text-left transition-colors duration-200 hover:bg-[var(--color-surface)] min-h-[44px]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <span className="block font-mono text-[10px] mb-1.5" style={{ color: "var(--color-accent)" }}>
                  {link.index}
                </span>
                <span className="block text-sm font-semibold group-hover:text-[var(--color-accent)] transition-colors duration-200"
                  style={{ color: "var(--color-text-primary)" }}>
                  {link.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-center lg:justify-start gap-3 sm:gap-4">
            <Link href="/hobbies" className="btn-neon btn-neon-ghost">
              Hobbies &amp; Homelab
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
