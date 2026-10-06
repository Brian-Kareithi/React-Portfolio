"use client";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowRight, ArrowUpRight, Command, FileDown } from "lucide-react";
import useLocalTime from "@/app/components/ui/useLocalTime";
import { useCommandPalette } from "@/app/components/CommandPalette";
import Testimonials from "@/app/components/Testimonials";
import { routes } from "@/app/lib/nav";
import { focusAreas, alsoExploring } from "@/app/lib/focus";
import { caseStudies } from "@/app/lib/projects-data";
import { siteConfig } from "@/app/lib/site";

const spec: { k: string; v: string }[] = [
  { k: "Currently", v: "Frontend development & IT support, Steadfast Academy" },
  { k: "Based in", v: "Nairobi, Kenya · open to remote" },
  { k: "Certifications", v: "6 · Security+, CCNA, AWS, Azure & more" },
  { k: "Education", v: "BSc Information Technology, Umma University · Graduated" },
  { k: "Experience", v: "3 years in tech" },
  { k: "Homelab", v: "19 devices · 24/7 Proxmox" },
];

const socials = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

/** The two strongest shipped builds, shown with real captures. */
const featured = ["sapio-homes", "roadsafe360"]
  .map((id) => caseStudies.find((c) => c.id === id))
  .filter((c): c is (typeof caseStudies)[number] => Boolean(c?.screenshot));

export default function HomeContent() {
  const time = useLocalTime("Africa/Nairobi");
  const { open: openPalette } = useCommandPalette();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const indexRoutes = routes.filter((r) => r.path !== "/");

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Hero atmosphere: aurora wash */}
      <div aria-hidden="true" className="hero-aurora" />

      <div className="relative mx-auto max-w-5xl pt-28 pb-20 sm:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Identity */}
          <div className="min-w-0 lg:col-span-7">
            <p className="stagger-item mb-6 inline-flex max-w-full items-center gap-2 rounded-lg border px-3.5 py-1.5 text-xs font-medium sm:text-[13px]" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-primary)" }}>
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: "var(--color-live)" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-live)" }} />
              </span>
              <span>Open to full-time &amp; contract roles · Remote or Nairobi</span>
            </p>

            <h1 className="display-xl mb-6 text-[3.1rem] leading-[0.95] xs:text-7xl sm:text-8xl lg:text-[7.5rem]" style={{ color: "var(--color-text-primary)" }}>
              Brian
              <br />
              <span className={`reveal-mask ${mounted ? "is-in" : ""}`}>
                <span className="font-serif-accent" style={{ color: "var(--color-accent)" }}>Kareithi</span>
              </span>
            </h1>

            <p className="stagger-item mb-3 max-w-xl text-xl font-medium leading-snug sm:text-2xl" style={{ color: "var(--color-text-primary)" }}>
              Software engineer shipping <strong className="font-semibold" style={{ color: "var(--color-accent)" }}>Next.js</strong> and <strong className="font-semibold" style={{ color: "var(--color-accent)" }}>React Native</strong> apps.
            </p>
            <p className="stagger-item mb-9 max-w-lg text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Currently building the parent platform at Steadfast Academy, on the web and on Android and iOS, backed by hands-on infrastructure and security experience.
            </p>

            <div className="stagger-item mb-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Link href="/projects" className="btn-neon btn-neon-primary justify-center">
                View Selected Work
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={siteConfig.resumePdf} download className="btn-neon btn-neon-ghost justify-center">
                <FileDown className="w-4 h-4" />
                Download Resume
              </a>
              <Link href="/contact" className="btn-neon btn-neon-ghost justify-center">
                Get in Touch
              </Link>
            </div>

            <div className="stagger-item flex items-center gap-2.5">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
            <div className="relative mx-auto max-w-[17rem] xs:max-w-[21rem] lg:mr-0">
              <div
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border"
                style={{ borderColor: "var(--color-border-hover)", boxShadow: "0 0 0 6px rgb(212 194 252 / 0.35), 0 30px 60px -24px rgb(20 36 138 / 0.45)" }}
              >
                <Image
                  src="https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"
                  alt="Portrait of Brian Kareithi, software engineer based in Nairobi, Kenya"
                  fill
                  sizes="(max-width: 375px) 272px, 336px"
                  priority
                  className="object-cover object-center transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
              </div>

              <div
                className="absolute -left-3 top-10 rounded-xl border px-4 py-2.5 backdrop-blur-md sm:-left-10"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-card) 78%, transparent)", borderColor: "var(--color-border-hover)", boxShadow: "0 14px 28px -16px rgb(20 36 138 / 0.4)" }}
              >
                <p className="field-label">Nairobi</p>
                <p className="font-mono text-sm tabular-nums" style={{ color: "var(--color-text-primary)" }}>{time ?? "--:--"} EAT</p>
              </div>
              <div
                className="absolute -bottom-5 -right-2 rounded-xl px-4 py-3 sm:-right-8"
                style={{ backgroundColor: "var(--palette-true-cobalt)", color: "var(--palette-lavender-mist)" }}
              >
                <p className="font-serif-accent text-3xl leading-none">6</p>
                <p className="text-[11px] opacity-80">industry certifications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured work: real captures of shipped products */}
        {featured.length > 0 && (
          <div className="mt-24">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display-xl text-4xl sm:text-5xl" style={{ color: "var(--color-text-primary)" }}>
                Featured <span className="font-serif-accent">work</span>
              </h2>
              <Link href="/projects" className="link-underline text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                All case studies →
              </Link>
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
              {featured.map((study, i) => (
                <article key={study.id} className={`flat-card flex flex-col overflow-hidden ${i === 0 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                  <Link href={`/projects#${study.id}`} className="group block overflow-hidden border-b" style={{ borderColor: "var(--color-border)" }}>
                    <Image
                      src={study.screenshot!.src}
                      alt={study.screenshot!.alt}
                      width={1440}
                      height={900}
                      sizes="(max-width: 1024px) 100vw, 640px"
                      className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-[350ms] ease-[var(--ease-out)] group-hover:scale-[1.02]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="field-label mb-2">{study.status} · {study.stack.slice(0, 3).join(" · ")}</p>
                    <h3 className="font-serif-accent mb-2 text-3xl leading-tight" style={{ color: "var(--color-text-primary)" }}>{study.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{study.tagline}. {study.contribution}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {study.access.demo && (
                        <a href={study.access.demo} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-primary">
                          Live demo <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <Link href={`/projects#${study.id}`} className="btn-neon btn-neon-ghost">
                        Case study
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <Testimonials />

        {/* At a glance */}
        <dl className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {spec.map((row) => (
            <div key={row.k} className="flat-card px-5 py-4">
              <dt className="field-label mb-1.5">{row.k}</dt>
              <dd className="text-sm leading-snug" style={{ color: "var(--color-text-primary)" }}>{row.v}</dd>
            </div>
          ))}
        </dl>

        {/* Focus areas: web & mobile lead, infrastructure backs them */}
        <div className="ink-slab mt-16 px-5 py-10 xs:px-6 sm:px-10 sm:py-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-xl text-4xl sm:text-5xl">
              What I <span className="font-serif-accent">build</span>
            </h2>
            <p className="field-label">Web &amp; mobile first, backed by infrastructure</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {focusAreas.map((area) => (
              <div key={area.id} className="flat-card p-6">
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <p className="font-serif-accent text-4xl" style={{ color: "var(--color-accent)" }}>{area.index}</p>
                  <p className="field-label">{area.id === "it" ? "Backbone" : "Core"}</p>
                </div>
                <h3 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {area.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {area.tools.map((tool) => (
                    <span key={tool} className="rounded-md border px-2.5 py-1 font-mono text-[11px]" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
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
              <span key={tag} className="rounded-md border border-dashed px-2.5 py-1 font-mono text-[11px]" style={{ borderColor: "var(--color-border-hover)", color: "var(--color-text-muted)" }}>
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
                <Link href={r.path} className="flat-card group flex h-full flex-col justify-between gap-8 p-5">
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
