"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail, ArrowRight, Command } from "lucide-react";
import Magnetic from "@/app/components/ui/Magnetic";
import useLocalTime from "@/app/components/ui/useLocalTime";
import { useCommandPalette } from "@/app/components/CommandPalette";
import { routes } from "@/app/lib/nav";

const roles = [
  "Fullstack Developer",
  "Cybersecurity Engineer",
  "React Native Developer",
  "Cloud & DevOps Enthusiast",
];

const spec: { k: string; v: string }[] = [
  { k: "Role", v: "Fullstack Developer, React Native & Cybersecurity Specialist" },
  { k: "Based in", v: "Nairobi, Kenya" },
  { k: "Focus", v: "Secure, scalable software — mobile to cloud-native" },
  { k: "Certifications", v: "6 · security, cloud & networking" },
  { k: "Projects", v: "50+ delivered" },
  { k: "Experience", v: "5+ years in tech" },
  { k: "Homelab", v: "18 devices · 24/7 Proxmox" },
];

const socials = [
  { href: "https://github.com/Brian-Kareithi", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/kareithiv", icon: Instagram, label: "Instagram" },
  { href: "mailto:kareithibrian2@gmail.com", icon: Mail, label: "Email" },
];

export default function HomeContent() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const time = useLocalTime("Africa/Nairobi");
  const { open: openPalette } = useCommandPalette();

  useEffect(() => setMounted(true), []);

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

  const indexRoutes = routes.filter((r) => r.path !== "/");

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-field px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--color-accent)" }} />

      <div className="mx-auto max-w-7xl pt-28 pb-20 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Identity */}
          <div className="lg:col-span-7">
            <p className="field-label mb-6 flex items-center gap-3">
              <span className="index-num">00</span>
              <span className="h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} />
              Identity
            </p>

            <h1 className="mb-5">
              <span className="hero-name-brian mb-3">BRIAN</span>
              <span className={`reveal-mask ${mounted ? "is-in" : ""}`}>
                <span className="hero-name-kareithi">KAREITHI</span>
              </span>
            </h1>

            <div className="mb-6 h-8 sm:h-10">
              <p
                aria-live="polite"
                className="font-mono text-base sm:text-lg tracking-tight"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <span>{displayText}</span>
                <span className="type-caret" aria-hidden="true" />
              </p>
            </div>

            <p
              className="mb-9 max-w-md text-sm leading-relaxed sm:text-[15px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              I design and build <em className="font-serif-accent">secure</em>, scalable software,
              from mobile apps to cloud-native platforms.
            </p>

            <div className="mb-9 flex flex-wrap gap-3">
              <Magnetic>
                <Link href="/projects" className="btn-neon btn-neon-primary" data-cursor="grow">
                  View My Work
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn-neon btn-neon-ghost" data-cursor="grow">
                  Get in Touch
                </Link>
              </Magnetic>
            </div>

            <div className="flex items-center gap-2.5">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="icon-chip flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Portrait + spec */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-[22rem] lg:mx-0 lg:ml-auto">
              <div className="group relative aspect-square">
                <span className="absolute -left-1 -top-1 h-4 w-4 border-l-2 border-t-2 transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: "var(--color-accent)" }} />
                <span className="absolute -right-1 -top-1 h-4 w-4 border-r-2 border-t-2 transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: "var(--color-accent)" }} />
                <span className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: "var(--color-accent)" }} />
                <span className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 transition-all duration-500 group-hover:h-5 group-hover:w-5" style={{ borderColor: "var(--color-accent)" }} />
                <Image
                  src="https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"
                  alt="Portrait of Brian Kareithi, full-stack developer and cybersecurity specialist based in Nairobi, Kenya"
                  fill
                  sizes="(max-width: 1024px) 352px, 352px"
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  style={{ border: "1px solid var(--color-border)" }}
                />
              </div>

              <dl
                className="mt-4 border"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}
              >
                <div
                  className="flex items-center gap-2 border-b px-3.5 py-2.5"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <span
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                  <span className="font-mono text-[11px]" style={{ color: "var(--color-text-secondary)" }}>
                    Nairobi
                  </span>
                  <span className="font-mono text-[11px] tabular-nums" style={{ color: "var(--color-text-muted)" }}>
                    {time ?? "--:--"} EAT
                  </span>
                </div>
                {spec.map((row, i) => (
                  <div
                    key={row.k}
                    className="grid grid-cols-[5.5rem_1fr] gap-3 px-3.5 py-2"
                    style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}
                  >
                    <dt className="field-label pt-0.5">{row.k}</dt>
                    <dd className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Section index */}
        <div className="mt-20 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
          <div className="mb-4 flex items-center justify-between">
            <p className="field-label">Index</p>
            <button
              onClick={openPalette}
              className="hidden items-center gap-1.5 font-mono text-[10px] transition-colors duration-200 hover:text-[var(--color-accent)] sm:flex"
              style={{ color: "var(--color-text-muted)" }}
            >
              <Command className="w-3 h-3" /> K to jump anywhere
            </button>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {indexRoutes.map((r) => (
              <li key={r.path}>
                <Link
                  href={r.path}
                  data-cursor="grow"
                  className="group flex h-full flex-col justify-between gap-6 border-t px-1 py-5 transition-colors duration-200 hover:bg-[var(--color-surface)]"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="index-num">{r.index}</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      style={{ color: "var(--color-accent)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold transition-colors duration-200 group-hover:text-[var(--color-accent)]"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {r.label}
                    </p>
                    <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                      {r.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
