"use client";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import portrait from "@/public/kareithi.jpg";
import { MascotNote } from "@/app/components/Mascot";
import { Github, Gamepad2, Linkedin, Mail, ArrowRight, ArrowUpRight, Command, FileDown } from "lucide-react";
import useLocalTime from "@/app/components/ui/useLocalTime";
import { useCommandPalette } from "@/app/components/CommandPalette";
import Testimonials from "@/app/components/Testimonials";
import RecruiterBrief from "@/app/components/RecruiterBrief";
import { Assemble } from "@/app/components/ui/Assemble";
import { CountUp } from "@/app/components/ui/CountUp";
import Marquee from "@/app/components/Marquee";
import FeaturedRelease from "@/app/components/FeaturedRelease";
import FishSwim from "@/app/components/FishSwim";
import { routes } from "@/app/lib/nav";
import { focusAreas } from "@/app/lib/focus";
import { caseStudies } from "@/app/lib/projects-data";
import { siteConfig } from "@/app/lib/site";
import { valuePoints } from "@/app/lib/value";

const heroStats: { value: number; suffix?: string; label: string }[] = [
  { value: 3, label: "Years in tech" },
  { value: 6, label: "Certifications" },
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 19, label: "Homelab devices" },
];

/** The ticker under the hero: the stack first, then the infrastructure side. */
const marqueeItems = ["React", "Next.js", "TypeScript", "Node", "Linux", "Proxmox", "Networking", "Security"];

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

  const indexRoutes = routes.filter((r) => r.path !== "/");

  return (
    <>
      {/* ── Hero: light band, surname on a solid cobalt block ── */}
      <section id="home" aria-labelledby="hero-name" className="band-light relative overflow-x-clip pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="wrap">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8">
              <p className="stagger-item mb-7 inline-flex max-w-full items-center gap-2 rounded-lg border px-3.5 py-1.5 text-xs font-medium sm:text-[13px]" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-primary)" }}>
                <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--color-live)" }} />
                <span>Available for work · Remote or Nairobi</span>
              </p>

              <div className="flex items-start gap-4">
                <h1 id="hero-name" className="display-xl title-hero min-w-0" style={{ color: "var(--color-text-primary)" }}>
                  <span className="hero-letter" style={{ "--i": 0 } as CSSProperties}>Brian</span>
                  <br />
                  <span className="name-block hero-letter" style={{ "--i": 4 } as CSSProperties}>
                    Kareithi
                    <FishSwim />
                  </span>
                </h1>
                {/* Phones only: small portrait beside the name so it shows on the first screen */}
                <div className="relative ml-auto mt-2 h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border xs:h-24 xs:w-24 sm:hidden" style={{ borderColor: "var(--color-border)" }}>
                  <Image src={portrait} alt="Portrait of Brian Kareithi" fill sizes="96px" priority className="object-cover object-center" />
                </div>
              </div>

              <p className="stagger-item measure mt-9 mb-3 font-medium leading-snug" style={{ color: "var(--color-text-primary)", fontSize: "var(--fs-lead)" }}>
                <strong className="font-semibold" style={{ color: "var(--color-accent)" }}>Full-stack developer</strong> with an IT and security background.
              </p>
              <p className="stagger-item mb-9 max-w-lg text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-text-secondary)" }}>
                I build web and mobile products that hold up in the real world, from the screen to the server.
              </p>

              <div className="stagger-item mb-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <Link href="/projects" className="btn-neon btn-neon-primary justify-center">
                  See my work
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/resume" className="btn-neon btn-neon-ghost justify-center">
                  <FileDown className="w-4 h-4" />
                  Get my resume
                </Link>
                <Link href="/contact" className="btn-neon btn-neon-ghost justify-center">
                  Let&apos;s talk
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
                <Link
                  href="/games"
                  aria-label="Minigames: play a mini capture the flag"
                  title="Minigames"
                  className="icon-chip flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)", backgroundColor: "var(--color-bg-card)" }}
                >
                  <Gamepad2 className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Portrait, with the live Nairobi clock */}
            <div className="hidden sm:block lg:col-span-4">
              <div className="relative mx-auto w-full max-w-[22rem] lg:mr-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={portrait}
                    placeholder="blur"
                    alt="Portrait of Brian Kareithi, full-stack developer based in Nairobi, Kenya"
                    fill
                    sizes="(min-width: 1024px) 352px, 336px"
                    priority
                    className="object-cover object-center"
                  />
                </div>
                <div className="absolute -left-3 bottom-6 px-4 py-2.5 sm:-left-8" style={{ backgroundColor: "var(--palette-espresso)", color: "var(--palette-cream)" }}>
                  <p className="field-label" style={{ color: "var(--palette-sand)" }}>Nairobi</p>
                  {/* Server and first client render both show --:--, so there is no mismatch; the fixed 5ch width means no shift when the time fills in. */}
                  <p className="font-mono text-sm">
                    <time className="inline-block w-[5ch] tabular-nums" suppressHydrationWarning>{time ?? "--:--"}</time> EAT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <dl className="hero-stats mt-16 grid grid-cols-2 border-t pt-8 sm:mt-20 sm:grid-cols-4" style={{ borderColor: "var(--hairline-strong)" }}>
            {heroStats.map((st) => (
              <div key={st.label} className="flex flex-col px-4 py-6 first:pl-0 sm:px-8 sm:py-2">
                <dt className="field-label order-2">{st.label}</dt>
                <dd className="display-xl mb-1 tabular-nums" style={{ color: "var(--color-accent)", fontSize: "clamp(3rem, 2rem + 4vw, 6.5rem)" }}>
                  <CountUp value={st.value} suffix={st.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Marquee: the stack, on ink ── */}
      <Marquee items={marqueeItems} label="Stack and focus areas" />

      {/* ── The 20-second version for recruiters ── */}
      <section className="band band-tight band-light">
        <div className="wrap">
          <RecruiterBrief />
        </div>
      </section>

      {/* ── Now building: the current client project, on cobalt ── */}
      <FeaturedRelease />

      {/* ── Proof: shipped products, light band ── */}
      {featured.length > 0 && (
        <section id="proof" aria-labelledby="proof-title" className="band band-light scroll-mt-16 overflow-x-clip">
          <div className="wrap">
            <Assemble from="up" className="mb-10">
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                <div>
                  <p className="field-label eyebrow mb-5">Shipped</p>
                  <h2 id="proof-title" className="display-xl title-xl" style={{ color: "var(--color-text-primary)" }}>
                    Proof, <span className="font-serif-accent">in production</span>
                  </h2>
                </div>
                <Link href="/projects" className="btn-neon btn-neon-ghost">
                  All projects <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Assemble>
            <div className="grid gap-4 lg:grid-cols-5">
              {featured.map((study, i) => (
                <Assemble key={study.id} from="up" className={i === 0 ? "lg:col-span-3" : "lg:col-span-2"}>
                  <article className="flat-card flex h-full flex-col overflow-hidden">
                    <Link href={`/projects#${study.id}`} className="group block overflow-hidden border-b" style={{ borderColor: "var(--color-border)" }} tabIndex={-1} aria-hidden="true">
                      <Image
                        src={study.screenshot!.src}
                        alt=""
                        width={1440}
                        height={900}
                        sizes="(max-width: 1024px) 100vw, 720px"
                        className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-[1.02]"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="field-label mb-2">{study.status} · {study.stack.slice(0, 3).join(" · ")}</p>
                      <h3 className="font-serif-accent mb-2 text-3xl leading-tight" style={{ color: "var(--color-text-primary)" }}>{study.title}</h3>
                      <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{study.tagline}</p>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {study.access.demo && (
                          <a href={study.access.demo} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-primary">
                            Live demo <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <Link href={`/projects#${study.id}`} className="btn-neon btn-neon-ghost">
                          Case study<span className="sr-only">: {study.title}</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </Assemble>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Pull quote: one line about how I work, set huge on ink ── */}
      <section aria-label="How I work, in one line" className="band band-dark overflow-x-clip">
        <div className="wrap">
          <figure>
            <blockquote>
              <p className="display-xl pull-quote" style={{ color: "var(--palette-cream)" }}>
                Real users, real deadlines, <span className="font-serif-accent" style={{ color: "var(--palette-sand)" }}>no room for downtime.</span>
              </p>
            </blockquote>
            <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <span className="field-label">On the school systems I run at Steadfast Academy</span>
              <Link href="/how-i-work" className="btn-neon btn-neon-ghost">
                How I work <ArrowRight className="h-4 w-4" />
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Why it holds up: five reasons, light band ── */}
      <section aria-labelledby="reasons-title" className="band band-light">
        <div className="wrap">
          <Assemble from="up" className="mb-10 max-w-3xl">
            <p className="field-label eyebrow mb-5">Why it holds up</p>
            <h2 id="reasons-title" className="display-xl title-xl" style={{ color: "var(--color-text-primary)" }}>
              Five reasons I&apos;m <span className="font-serif-accent">good at it</span>
            </h2>
          </Assemble>
          <ol>
            {valuePoints.map((v, i) => (
              <li key={v.id}>
                <Assemble index={i}>
                  <Link
                    href={v.href}
                    className="edit-row group grid gap-x-8 gap-y-3 border-t py-7 sm:py-9 lg:grid-cols-12"
                    style={{ borderColor: "var(--hairline-strong)", borderBottomWidth: i === valuePoints.length - 1 ? 1 : 0 }}
                  >
                    <span className="font-serif-accent text-5xl leading-none lg:col-span-1 lg:text-6xl" style={{ color: "var(--color-accent)" }}>0{i + 1}</span>
                    <h3 className="display-xl link-underline text-3xl leading-tight transition-colors duration-200 group-hover:text-[var(--color-accent)] sm:text-4xl lg:col-span-4" style={{ color: "var(--color-text-primary)" }}>
                      {v.edge}
                    </h3>
                    <div className="lg:col-span-6 lg:col-start-7">
                      <p className="mb-3 text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{v.benefit}</p>
                      <p className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        <ArrowUpRight className="mt-px h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: "var(--color-accent)" }} />
                        <span>{v.proof}</span>
                      </p>
                    </div>
                  </Link>
                </Assemble>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── References and tools, on ink ── */}
      <section aria-label="References and tools" className="band band-dark overflow-x-clip">
        <div className="wrap flex flex-col gap-20 sm:gap-24">
          <Testimonials />

          <div>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display-xl title-xl">
                The tools I <span className="font-serif-accent">trust</span>
              </h2>
              <p className="field-label">Build it · Run it · Secure it</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {focusAreas.map((area, i) => (
                <Assemble key={area.id} index={i + 2}>
                  <div className="flat-card h-full p-6">
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
                </Assemble>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-neon btn-neon-primary">
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/homelab" className="btn-neon btn-neon-ghost">
                See the homelab
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section index 01 to 08, light band ── */}
      <section aria-labelledby="index-title" className="band band-light">
        <div className="wrap">
          <MascotNote mood="wave" className="mb-8">
            Thanks for reading this far. Pick a section below, or just message me.
          </MascotNote>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="index-title" className="display-xl title-xl" style={{ color: "var(--color-text-primary)" }}>
              Where to <span className="font-serif-accent">next</span>
            </h2>
            <button
              type="button"
              onClick={openPalette}
              className="pill hidden min-h-[44px] font-mono !text-[11px] transition-colors duration-200 hover:text-[var(--color-accent)] sm:inline-flex"
            >
              <Command className="w-3 h-3" /> Ctrl&nbsp;K to jump
            </button>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {indexRoutes.map((r, i) => (
              <li key={r.path}>
                <Assemble index={i} className="h-full">
                  <Link href={r.path} className="flat-card index-card group flex h-full flex-col justify-between gap-8 p-5">
                    <div className="flex items-center justify-between">
                      <span className="index-num">{r.index}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "var(--color-accent)" }} />
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
                </Assemble>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
