"use client";

import Link from "next/link";
import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck } from "lucide-react";
import NetworkSwitch from "@/app/components/NetworkSwitch";
import { tick } from "@/app/lib/sound";
import { currentProject } from "@/app/lib/current-project";
import { siteConfig } from "@/app/lib/site";

interface Layer {
  id: string;
  name: string;
  title: ReactNode;
  copy: string;
  cta?: { href: string; label: string };
  visual: ReactNode;
}

const posScreens = [
  { src: "/projects/pos/overview.png", title: "Dashboard" },
  { src: "/projects/pos/sell.png", title: "Sell" },
  { src: "/projects/pos/inventory.png", title: "Inventory" },
  { src: "/projects/pos/audit.png", title: "Audit log" },
];

const domTree = [
  ["<main>", 0],
  ["<section id=\"home\">", 1],
  ["<h1>Brian Kareithi</h1>", 2],
  ["<nav aria-label=\"Primary\">", 1],
  ["<section id=\"journey\">", 1],
  ["<article class=\"layer\">", 2],
  ["<footer>", 1],
] as const;

const layers: Layer[] = [
  {
    id: "screen",
    name: "The screen",
    title: "Where people meet the product",
    copy: "Interfaces that load fast, read clearly and work for everyone, on a cheap phone as much as a new laptop.",
    cta: { href: "/about", label: "How I design" },
    visual: (
      <div className="jv-window" aria-hidden="true">
        <div className="jv-window-bar"><i /><i /><i /></div>
        <div className="jv-skeleton">
          <span style={{ width: "46%" }} />
          <span style={{ width: "78%" }} />
          <span style={{ width: "62%" }} />
          <div className="jv-skeleton-row"><b /><b /><b /></div>
        </div>
      </div>
    ),
  },
  {
    id: "app",
    name: "The application",
    title: "Structure you can read",
    copy: "Typed Next.js, semantic HTML and clean data flow. This page is built the way it is described: here is its own outline.",
    cta: { href: "/how-i-work", label: "How I work" },
    visual: (
      <pre className="jv-code" aria-hidden="true">
        {domTree.map(([line, depth], i) => (
          <span key={line} style={{ paddingLeft: `${depth * 1.25}rem`, "--i": i } as React.CSSProperties}>{line}</span>
        ))}
      </pre>
    ),
  },
  {
    id: "product",
    name: "The product",
    title: "Real apps, real users",
    copy: `${currentProject.title} ${currentProject.titleAccent}: dashboard, selling, stock across branches and an audit trail. Built for a client, running live.`,
    cta: { href: "/projects", label: "See the case studies" },
    visual: (
      <PosLaptop />
    ),
  },
  {
    id: "security",
    name: "The protection layer",
    title: "Secure by habit, not afterthought",
    copy: "CompTIA Security+, information security work for the ICT Authority of Kenya, and capture-the-flag practice. Try the mini CTF.",
    cta: { href: "/games", label: "Play the CTF" },
    visual: (
      <div className="jv-sec" data-cursor="scan" aria-hidden="true">
        <div className="jv-sec-status">
          <span className="jv-sec-breach">BREACH DETECTED</span>
          <span className="jv-sec-ok"><ShieldCheck className="h-4 w-4" /> PATCHED</span>
        </div>
        <div className="jv-sec-log">
          <span>scan  auth ........ <em>hardened</em></span>
          <span>scan  tls ......... <em>ok</em></span>
          <span>scan  inputs ...... <em>validated</em></span>
          <span>scan  deps ........ <em>patched</em></span>
        </div>
        <div className="jv-sec-chips"><b>Security+</b><b>ICT Authority</b><b>CTF</b></div>
      </div>
    ),
  },
  {
    id: "network",
    name: "The network",
    title: "A homelab I run myself",
    copy: "A 19-device Proxmox homelab with RAID-1 and 24/7 uptime. It is where I learn how things fail, so I can stop them failing for clients.",
    cta: { href: "/homelab", label: "Full inventory" },
    visual: <NetworkSwitch />,
  },
  {
    id: "metal",
    name: "The metal",
    title: "Down at the rack",
    copy: "The stack ends at real hardware, and real people. Say hello.",
    cta: { href: "/contact", label: "Start a conversation" },
    visual: (
      <div className="jv-rack">
        <p className="jv-rack-head" aria-hidden="true">ssh brian@kareithi.sys</p>
        <ul>
          <li><span>mail</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
          <li><span>phone</span><a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a></li>
          <li><span>github</span><a href={siteConfig.github} target="_blank" rel="noopener noreferrer">Brian-Kareithi</a></li>
          <li><span>resume</span><Link href="/resume">A concise record of my experience</Link></li>
        </ul>
        <div className="jv-rack-leds" aria-hidden="true"><i /><i /><i /><i /></div>
      </div>
    ),
  },
];

export const ShotContext = createContext<number | null>(null);

function PosLaptop() {
  const scrub = useContext(ShotContext);
  return (
    <Link href="/projects" className="jv-laptop" data-cursor="view" data-scrub={scrub !== null || undefined} aria-label="See the case studies">
      <div className="jv-laptop-screen">
        {posScreens.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={i === 0 ? "Screens from the point of sale: dashboard, sell, inventory and audit log" : ""}
            fill
            sizes="(min-width: 1024px) 560px, 90vw"
            className="jv-shot"
            data-show={scrub === i || undefined}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="jv-laptop-base" />
      <span className="jv-laptop-tag">
        {scrub !== null ? posScreens[scrub].title : "Dashboard · Sell · Inventory · Audit log"}
      </span>
    </Link>
  );
}

export default function StackJourney() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [shot, setShot] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)", () => {
      if (root.current) root.current.dataset.pinned = "true";
      setPinned(true);
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 0.8 * layers.length}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const f = self.progress * layers.length;
          const i = Math.min(layers.length - 1, Math.floor(f));
          setActive(i);
          setShot(Math.min(posScreens.length - 1, Math.floor((f - i) * posScreens.length)));
        },
      });
      trigger.current = st;
      return () => {
        st.kill();
        trigger.current = null;
        setPinned(false);
        setActive(0);
      };
    });
    return () => mm.revert();
  }, []);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (pinned) tick();
  }, [active, pinned]);

  const jumpTo = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    const y = st.start + ((i + 0.5) / layers.length) * (st.end - st.start);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="journey-wrap">
    <section ref={root} id="journey" aria-labelledby="journey-title" className="journey band-dark" data-pinned={pinned || undefined}>
      <div className="wrap journey-inner">
        <header className="journey-head">
          <p className="field-label eyebrow mb-4">Whole-system thinking</p>
          <h2 id="journey-title" className="display-xl title-xl">
            From the screen <span className="font-serif-accent">down to the network</span>
          </h2>
        </header>

        <div className="journey-body">
          <ol className="journey-rail" aria-label="Layers of the stack">
            {layers.map((l, i) => (
              <li key={l.id}>
                <button type="button" onClick={() => jumpTo(i)} data-active={active === i || undefined} aria-current={active === i ? "step" : undefined}>
                  <span>0{i + 1}</span>
                  {l.name}
                </button>
              </li>
            ))}
          </ol>

          <div className="journey-stage">
            <ShotContext.Provider value={pinned ? shot : null}>
            {layers.map((l, i) => (
              <article
                key={l.id}
                className="journey-panel"
                data-active={active === i || undefined}
                inert={pinned && active !== i}
                aria-labelledby={`jp-${l.id}`}
              >
                <div className="journey-copy">
                  <p className="field-label">Layer 0{i + 1} · {l.name}</p>
                  <h3 id={`jp-${l.id}`} className="font-serif-accent">{l.title}</h3>
                  <p>{l.copy}</p>
                  {l.cta && (
                    <Link href={l.cta.href} className="btn-neon btn-neon-ghost">
                      {l.cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
                <div className="journey-visual">{l.visual}</div>
              </article>
            ))}
            </ShotContext.Provider>
          </div>
        </div>

        <div className="journey-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(active + 1) / layers.length})` }} />
        </div>
      </div>
    </section>
    </div>
  );
}
