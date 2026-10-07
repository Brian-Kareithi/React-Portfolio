"use client";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import portrait from "@/public/kareithi.jpg";
import { Github, Linkedin, Mail, ArrowRight, ArrowUpRight, Command, FileDown } from "lucide-react";
import useLocalTime from "@/app/components/ui/useLocalTime";
import { useCommandPalette } from "@/app/components/CommandPalette";
import Testimonials from "@/app/components/Testimonials";
import { Assemble } from "@/app/components/ui/Assemble";
import { CountUp } from "@/app/components/ui/CountUp";
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

const socials = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

/** The two strongest shipped builds, shown with real captures. */
const featured = ["sapio-homes", "roadsafe360"]
  .map((id) => caseStudies.find((c) => c.id === id))
  .filter((c): c is (typeof caseStudies)[number] => Boolean(c?.screenshot));

/** Where each letter of the name starts: [x px, y px, rotation deg]. */
const LETTER_START: [number, number, number][] = [
  [-90, -60, -30], [70, -80, 24], [-50, 90, -20], [100, 50, 28], [-120, 20, -26], [60, 100, 18], [-80, -90, 32], [110, -40, -22],
];

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split("").map((ch, i) => {
        const [x, y, r] = LETTER_START[(i + offset) % LETTER_START.length];
        const style = { "--i": i + offset, "--lx": `${x}px`, "--ly": `${y}px`, "--lr": `${r}deg` } as CSSProperties;
        return (
          <span key={i} aria-hidden="true" className="hero-letter" style={style}>
            {ch}
          </span>
        );
      })}
    </>
  );
}

export default function HomeContent() {
  const time = useLocalTime("Africa/Nairobi");
  const { open: openPalette } = useCommandPalette();

  const indexRoutes = routes.filter((r) => r.path !== "/");

  return (
    <section id="home" className="relative min-h-screen overflow-x-clip px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Hero atmosphere: aurora wash */}
      <div aria-hidden="true" className="hero-aurora" />

      <div className="relative mx-auto max-w-5xl pt-28 pb-20 sm:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Identity */}
          <div className="min-w-0 lg:col-span-7">
            <p className="stagger-item mb-6 inline-flex max-w-full items-center gap-2 rounded-lg border px-3.5 py-1.5 text-xs font-medium sm:text-[13px]" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-primary)" }}>
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-live)" }} />
              </span>
              <span>Available for work · Remote or Nairobi</span>
            </p>

            <h1 aria-label="Brian Kareithi" className="display-xl mb-6 text-[3.75rem] leading-[0.92] xs:text-7xl sm:text-8xl lg:text-[8rem]" style={{ color: "var(--color-text-primary)" }}>
              <Letters text="Brian" />
              <br />
              <span className="font-serif-accent" style={{ color: "var(--color-accent)" }}>
                <Letters text="Kareithi" offset={5} />
              </span>
            </h1>

            <p className="stagger-item mb-3 max-w-xl text-xl font-medium leading-snug sm:text-2xl" style={{ color: "var(--color-text-primary)" }}>
              <strong className="font-semibold" style={{ color: "var(--color-accent)" }}>Full-stack developer</strong> with an IT and security background.
            </p>
            <p className="stagger-item mb-9 max-w-lg text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-text-secondary)" }}>
              I build web and mobile products that hold up in the real world, from the screen to the server.
            </p>

            <div className="stagger-item mb-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
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
            </div>
          </div>

          {/* Portrait in an arch, with stickers */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-[17rem] xs:max-w-[21rem] lg:mr-0">
              <div
                className="hero-frame relative"
              >
                <div
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border"
                  style={{ borderColor: "var(--color-border-hover)", boxShadow: "0 30px 60px -24px rgb(20 36 138 / 0.45)" }}
                >
                <Image
                  src={portrait}
                  placeholder="blur"
                  alt="Portrait of Brian Kareithi, full-stack developer based in Nairobi, Kenya"
                  fill
                  sizes="(max-width: 375px) 272px, 336px"
                  priority
                  className="object-cover object-center transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
                </div>
              </div>

              <div
                className="absolute -left-3 top-10 rounded-xl border px-4 py-2.5 backdrop-blur-md sm:-left-10"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-card) 78%, transparent)", borderColor: "var(--color-border-hover)", boxShadow: "0 14px 28px -16px rgb(20 36 138 / 0.4)" }}
              >
                <p className="field-label">Nairobi</p>
                <p className="font-mono text-sm tabular-nums" style={{ color: "var(--color-text-primary)" }}>{time ?? "--:--"} EAT</p>
              </div>
            </div>
          </div>
        </div>

        <dl className="hero-stats mt-20 grid grid-cols-2 sm:grid-cols-4">
          {heroStats.map((st) => (
            <div key={st.label} className="flex flex-col px-4 py-6 sm:px-8 sm:py-2">
              <dt className="field-label order-2">{st.label}</dt>
              <dd className="display-xl mb-1 text-5xl sm:text-6xl" style={{ color: "var(--color-accent)" }}>
                <CountUp value={st.value} suffix={st.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        {/* Featured work: real captures of shipped products */}
        {featured.length > 0 && (
          <div className="mt-24">
            <Assemble from="up" className="mb-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display-xl text-4xl sm:text-5xl" style={{ color: "var(--color-text-primary)" }}>
                Proof, <span className="font-serif-accent">in production</span>
              </h2>
              <Link href="/projects" className="link-underline text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                All projects →
              </Link>
            </div>
            </Assemble>
            <div className="grid gap-4 lg:grid-cols-5">
              {featured.map((study, i) => (
                <Assemble key={study.id} from={i === 0 ? "left" : "right"} className={i === 0 ? "lg:col-span-3" : "lg:col-span-2"}>
                <article className="flat-card flex h-full flex-col overflow-hidden">
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
                    <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{study.tagline}</p>
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
                </Assemble>
              ))}
            </div>
          </div>
        )}

        {/* Why I'm good at it: five reasons, each with its evidence */}
        <div className="mt-24">
          <Assemble from="up" className="mb-10 max-w-2xl">
            <p className="field-label mb-3">Why it holds up</p>
            <h2 className="display-xl text-4xl sm:text-6xl" style={{ color: "var(--color-text-primary)" }}>
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
                    <h3 className="display-xl text-3xl leading-tight transition-colors duration-200 group-hover:text-[var(--color-accent)] sm:text-4xl lg:col-span-4" style={{ color: "var(--color-text-primary)" }}>
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

        <Testimonials />

        {/* Focus areas: web & mobile lead, infrastructure backs them */}
        <div className="ink-slab mt-16 px-5 py-10 xs:px-6 sm:px-10 sm:py-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-xl text-4xl sm:text-5xl">
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
        </div>

        {/* Section index */}
        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="display-xl text-4xl sm:text-5xl" style={{ color: "var(--color-text-primary)" }}>
              Where to <span className="font-serif-accent">next</span>
            </h2>
            <button
              onClick={openPalette}
              className="pill hidden font-mono !text-[11px] transition-colors duration-200 hover:text-[var(--color-accent)] sm:inline-flex"
            >
              <Command className="w-3 h-3" /> Ctrl&nbsp;K to jump
            </button>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {indexRoutes.map((r, i) => (
              <li key={r.path}>
                <Assemble index={i} className="h-full">
                <Link href={r.path} className="flat-card group flex h-full flex-col justify-between gap-8 p-5">
                  <div className="flex items-center justify-between">
                    <span className="index-num">{r.index}</span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-on-accent)]"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
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
                </Assemble>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
