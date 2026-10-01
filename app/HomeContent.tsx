"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail, ArrowRight, Command } from "lucide-react";
import Magnetic from "@/app/components/ui/Magnetic";
import useLocalTime from "@/app/components/ui/useLocalTime";
import { useCommandPalette } from "@/app/components/CommandPalette";
import { routes } from "@/app/lib/nav";
import { focusAreas, alsoExploring } from "@/app/lib/focus";
import { siteConfig } from "@/app/lib/site";

const roles = [
  "Software Engineer",
  "React Native Developer",
  "IT & Infrastructure Support",
  "Cloud & DevOps Enthusiast",
];

const spec: { k: string; v: string }[] = [
  { k: "Role", v: siteConfig.role },
  { k: "Based in", v: "Nairobi, Kenya" },
  { k: "Focus", v: "Secure, scalable software · mobile to cloud-native" },
  { k: "Certifications", v: "6 · security, cloud & networking" },
  { k: "Projects", v: "50+ delivered" },
  { k: "Experience", v: "3 years in tech" },
  { k: "Homelab", v: "19 devices · 24/7 Proxmox" },
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
  const time = useLocalTime("Africa/Nairobi");
  const { open: openPalette } = useCommandPalette();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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
    <section id="home" className="relative min-h-screen overflow-hidden px-3.75 sm:px-7.5 lg:px-12" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Soft periwinkle glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--palette-periwinkle), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-5xl pt-32 pb-20 sm:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Identity */}
          <div className="lg:col-span-7">
            <h1 className="display-xl mb-6 text-[3.4rem] leading-[0.95] xs:text-7xl sm:text-8xl lg:text-[7.5rem]" style={{ color: "var(--color-text-primary)" }}>
              Brian
              <br />
              <span className={`reveal-mask ${mounted ? "is-in" : ""}`}>
                <span className="font-serif-accent" style={{ color: "var(--color-accent)" }}>Kareithi</span>
              </span>
            </h1>

            <div className="mb-6 min-h-10">
              <p aria-live="polite" className="inline-flex items-center rounded-full px-4 py-2 font-mono text-sm sm:text-base" style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-text-primary)" }}>
                <span>{displayText}</span>
                <span className="type-caret" aria-hidden="true" />
              </p>
            </div>

            <p className="mb-9 max-w-lg text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-text-secondary)" }}>
              I build <span className="mark">secure</span>, cloud-native products, from React Native apps to hardened infrastructure.
            </p>

            <div className="mb-9 flex flex-wrap gap-3">
              <Magnetic>
                <Link href="/projects" className="btn-neon btn-neon-primary" data-cursor="grow">
                  View Systems Built
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn-neon btn-neon-ghost" data-cursor="grow">
                  Get in Touch
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/resume" className="btn-neon btn-neon-ghost" data-cursor="grow">
                  View Resume
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
                  className="icon-chip flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)", backgroundColor: "var(--color-bg-card)" }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Portrait in an arch, with stickers */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-[21rem] lg:mr-0">
              <div
                className="group relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] border"
                style={{ borderColor: "var(--color-border)", boxShadow: "10px 10px 0 var(--palette-periwinkle)" }}
              >
                <Image
                  src="https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"
                  alt="Portrait of Brian Kareithi, full-stack developer and cybersecurity specialist based in Nairobi, Kenya"
                  fill
                  sizes="(max-width: 1024px) 336px, 336px"
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div
                className="absolute -left-3 top-10 -rotate-6 rounded-2xl border px-4 py-2.5 sm:-left-10"
                style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)", boxShadow: "3px 3px 0 var(--color-accent-secondary)" }}
              >
                <p className="field-label">Nairobi</p>
                <p className="font-mono text-sm tabular-nums" style={{ color: "var(--color-text-primary)" }}>{time ?? "--:--"} EAT</p>
              </div>
              <div
                className="absolute -bottom-5 -right-2 rotate-3 rounded-2xl px-4 py-3 sm:-right-8"
                style={{ backgroundColor: "var(--palette-true-cobalt)", color: "var(--palette-lavender-mist)" }}
              >
                <p className="font-serif-accent text-3xl leading-none">50+</p>
                <p className="text-[11px] opacity-80">projects delivered</p>
              </div>
            </div>
          </div>
        </div>

        {/* At a glance */}
        <dl className="mt-20 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {spec.filter((row) => row.k !== "Role").map((row) => (
            <div key={row.k} className="flat-card px-5 py-4">
              <dt className="field-label mb-1.5">{row.k}</dt>
              <dd className="text-sm leading-snug" style={{ color: "var(--color-text-primary)" }}>{row.v}</dd>
            </div>
          ))}
        </dl>

        {/* Focus areas */}
        <div className="ink-slab mt-16 px-6 py-10 sm:px-10 sm:py-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-xl text-4xl sm:text-5xl">
              What I <span className="font-serif-accent">focus</span> on
            </h2>
            <p className="field-label">Three areas, one stack</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {focusAreas.map((area) => (
              <div key={area.id} className="flat-card p-6">
                <p className="font-serif-accent mb-3 text-4xl" style={{ color: "var(--color-accent)" }}>{area.index}</p>
                <h3 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {area.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {area.tools.map((tool) => (
                    <span key={tool} className="rounded-full border px-2.5 py-1 font-mono text-[10px]" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="field-label mr-1">Also exploring</span>
            {alsoExploring.map((tag) => (
              <span key={tag} className="rounded-full border border-dashed px-2.5 py-1 font-mono text-[10px]" style={{ borderColor: "var(--color-border-hover)", color: "var(--color-text-muted)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Section index */}
        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="display-xl text-4xl sm:text-5xl" style={{ color: "var(--color-text-primary)" }}>
              Take a <span className="font-serif-accent">look around</span>
            </h2>
            <button
              onClick={openPalette}
              className="pill hidden font-mono !text-[11px] transition-colors duration-200 hover:text-[var(--color-accent)] sm:inline-flex"
            >
              <Command className="w-3 h-3" /> Ctrl&nbsp;K to jump anywhere
            </button>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {indexRoutes.map((r) => (
              <li key={r.path}>
                <Link href={r.path} data-cursor="grow" className="flat-card group flex h-full flex-col justify-between gap-8 p-5">
                  <div className="flex items-center justify-between">
                    <span className="index-num">{r.index}</span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-on-accent)]"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-rotate-45" />
                    </span>
                  </div>
                  <div>
                    <p className="font-serif-accent text-2xl leading-tight" style={{ color: "var(--color-text-primary)" }}>
                      {r.label}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
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
