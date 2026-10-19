import Link from "next/link";
import Image from "next/image";
import portrait from "@/public/kareithi.jpg";
import { Github, Linkedin, Mail, ArrowRight, ArrowUpRight, Command } from "lucide-react";
import HeroTerminal from "@/app/components/HeroTerminal";
import PaletteButton from "@/app/components/PaletteButton";
import { Assemble } from "@/app/components/ui/Assemble";
import { routes } from "@/app/lib/nav";
import { caseStudies } from "@/app/lib/projects-data";
import { siteConfig } from "@/app/lib/site";

const socials = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

const glance = [
  { value: "50+", label: "Client projects shipped", note: "Freelance, 2022 to 2024" },
  { value: "6", label: "Certifications", note: "Security, cloud and networking" },
  { value: "19", label: "Devices in my homelab", note: "Proxmox, RAID-1, always on" },
  { value: "2", label: "Systems live at a school", note: "Teacher and parent portals" },
];

const featured = ["pos-system", "roadsafe360"]
  .map((id) => caseStudies.find((c) => c.id === id))
  .filter((c): c is (typeof caseStudies)[number] => Boolean(c?.screenshot));

export default function HomeContent() {
  const indexRoutes = routes.filter((r) => r.path !== "/");

  return (
    <>
      <section id="home" aria-labelledby="hero-name" className="h-hero">
        <div className="q-wrap h-hero-grid">
          <div className="h-hero-copy">
            <div className="h-hero-top stagger-item">
              <div className="hero-avatar">
                <Image
                  src={portrait}
                  placeholder="blur"
                  alt="Portrait of Brian Kareithi, full-stack developer based in Nairobi, Kenya"
                  fill
                  sizes="52px"
                  priority
                  className="object-cover object-center"
                />
              </div>
              <p className="q-eyebrow" style={{ flex: 1 }}>
                <span>
                  <span className="hero-welcome">Welcome back. </span>
                  Nairobi, Kenya <b>·</b> Full-stack developer
                </span>
              </p>
            </div>

            <h1 id="hero-name" className="h-hero-name">
              <span className="h-hero-line stagger-item">Brian</span>
              <span className="h-hero-line h-hero-line-2 stagger-item"><em>Kareithi</em></span>
            </h1>

            <p className="q-lede stagger-item" style={{ marginTop: "2rem" }}>
              I build web and mobile products from the interface down to the infrastructure, with a security background underneath.
            </p>

            <div className="h-hero-actions stagger-item">
              <Link href="/projects" className="q-btn" data-solid>
                Selected work
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/about" className="q-link">
                About me
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <span className="h-hero-socials">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="hero-social"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </span>
            </div>
          </div>

          <HeroTerminal />
        </div>
      </section>

      <section aria-label="At a glance" className="h-glance">
        <div className="q-wrap">
          <dl className="h-glance-grid">
            {glance.map((g, i) => (
              <Assemble key={g.label} index={i}>
                <div className="h-glance-cell">
                  <dt className="q-eyebrow" style={{ marginBottom: "1.1rem" }}>{g.label}</dt>
                  <dd>
                    <span className="h-glance-value">{g.value}</span>
                    <span className="q-small" style={{ display: "block", marginTop: "0.5rem" }}>{g.note}</span>
                  </dd>
                </div>
              </Assemble>
            ))}
          </dl>
        </div>
      </section>

      <StackJourney />

      {featured.length > 0 && (
        <section id="proof" aria-labelledby="proof-title" className="h-proof">
          <div className="q-wrap">
            <Assemble className="q-section-head">
              <p className="q-eyebrow"><b>01</b> Shipped</p>
              <div className="h-proof-head">
                <h2 id="proof-title" data-split className="q-h2">
                  In production, <em>used by real people</em>
                </h2>
                <Link href="/projects" className="q-link">
                  All projects <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </Assemble>

            <ol className="h-proof-list">
              {featured.map((study, i) => (
                <li key={study.id}>
                  <Assemble>
                    <article className="h-proof-item" data-flip={i % 2 === 1 || undefined}>
                      <Link
                        href={`/projects#${study.id}`}
                        data-cursor="view"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="h-proof-shot"
                      >
                        <div className="jv-window-bar"><i /><i /><i /><span className="jv-window-url">{study.title.toLowerCase().replace(/\s+/g, "-")}.app</span></div>
                        <Image
                          src={study.screenshot!.src}
                          alt=""
                          width={1440}
                          height={900}
                          sizes="(max-width: 1024px) 100vw, 640px"
                          className="h-proof-img"
                        />
                      </Link>
                      <div className="h-proof-copy">
                        <p className="q-eyebrow"><b>0{i + 1}</b> {study.status}</p>
                        <h3 className="q-h2">{study.title}</h3>
                        <p className="q-body">{study.tagline}</p>
                        <p className="q-mono q-small">{study.stack.slice(0, 4).join(" · ")}</p>
                        <div className="h-proof-links">
                          <Link href={`/projects#${study.id}`} className="q-link">
                            Case study<span className="sr-only">: {study.title}</span> <ArrowRight aria-hidden="true" />
                          </Link>
                          {study.access.demo && (
                            <a href={study.access.demo} target="_blank" rel="noopener noreferrer" className="q-link">
                              Live demo <ArrowUpRight aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </Assemble>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section aria-label="How I work, in one line" className="h-quote">
        <div className="q-wrap">
          <figure>
            <blockquote>
              <p data-split className="h-quote-text">
                Real users, real deadlines, <em>no room for downtime.</em>
              </p>
            </blockquote>
            <figcaption className="h-quote-cap">
              <span className="q-eyebrow">On the school systems I run at Steadfast Academy</span>
              <Link href="/how-i-work" className="q-link">How I work <ArrowRight aria-hidden="true" /></Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="index-title" className="h-index">
        <div className="q-wrap">
          <div className="h-index-head">
            <h2 id="index-title" data-split className="q-h2">Where to <em>next</em></h2>
            <PaletteButton className="q-nav-search">
              <Command className="h-3 w-3" aria-hidden="true" /> Ctrl K to jump
            </PaletteButton>
          </div>

          <div className="term-window ink-slab">
            <div className="term-window-bar" aria-hidden="true"><i /><i /><i /><span>~/kareithi.sys</span></div>
            <p className="term-prompt" aria-hidden="true"><b>$</b> ls ./site</p>
            <ul>
              {indexRoutes.map((r, i) => (
                <li key={r.path}>
                  <Assemble index={i}>
                    <Link href={r.path} className="term-row group">
                      <span className="term-num">{r.index}</span>
                      <span className="term-name">{r.label}</span>
                      <span className="term-desc">{r.description}</span>
                      <ArrowRight className="term-arrow h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </Assemble>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
