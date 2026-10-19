"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import portrait from "@/public/kareithi.jpg";
import { Github, Linkedin, Mail, ArrowRight, ArrowUpRight } from "lucide-react";
import HeroTerminal from "@/app/components/HeroTerminal";
import { siteConfig } from "@/app/lib/site";

const socials = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

const nodes = [
  [30, 36], [150, 22], [262, 58], [236, 150], [118, 168], [28, 120],
];

function Chars({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="hh-char" style={{ "--c": start + i } as CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  );
}

function Name({ lens = false }: { lens?: boolean }) {
  const Tag = lens ? "div" : "h1";
  return (
    <Tag id={lens ? undefined : "hero-name"} className="hh-name" aria-hidden={lens || undefined}>
      <span className="hh-line">
        <Chars text="Brian" />
      </span>
      <span className="hh-line hh-line-2">
        <em>
          <Chars text="Kareithi" start={5} />
        </em>
      </span>
    </Tag>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let raf = 0;
    const lensBox = el.querySelector<HTMLElement>(".hh-name-wrap");

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
        el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
        el.style.setProperty("--ox", `${e.clientX - r.left}px`);
        el.style.setProperty("--oy", `${e.clientY - r.top}px`);
        if (lensBox) {
          const b = lensBox.getBoundingClientRect();
          lensBox.style.setProperty("--lx", `${e.clientX - b.left}px`);
          lensBox.style.setProperty("--ly", `${e.clientY - b.top}px`);
          const inside = e.clientX >= b.left - 40 && e.clientX <= b.right + 40 && e.clientY >= b.top - 40 && e.clientY <= b.bottom + 40;
          lensBox.dataset.on = inside ? "true" : "false";
        }
      });
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
      if (lensBox) lensBox.dataset.on = "false";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={root} id="home" aria-labelledby="hero-name" className="hh">
      <span className="hh-orb" aria-hidden="true" />

      <div className="q-wrap hh-grid">
        <div className="hh-copy">
          <div className="hh-top">
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

          <div className="hh-name-wrap" data-on="false">
            <Name />
            <Name lens />
          </div>

          <p className="q-lede hh-rise" style={{ "--d": "0.95s", marginTop: "2rem" } as CSSProperties}>
            I build web and mobile products from the interface down to the infrastructure, with a security background underneath.
          </p>

          <div className="hh-actions hh-rise" style={{ "--d": "1.1s" } as CSSProperties}>
            <Link href="/projects" className="q-btn" data-solid>
              Selected work
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/about" className="q-link">
              About me
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <span className="hh-socials">
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

        <div className="hh-deck" aria-hidden="true">
          <div className="hh-layer hh-layer-net" style={{ "--z": 0.5 } as CSSProperties}>
            <p className="hh-layer-label">network</p>
            <svg viewBox="0 0 300 190" className="hh-net">
              {nodes.map(([x, y], i) => (
                <g key={i}>
                  <line x1="150" y1="95" x2={x} y2={y} />
                  <circle r="3" className="hh-packet">
                    <animateMotion dur={`${2.4 + (i % 3) * 0.7}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" path={`M150,95 L${x},${y}`} />
                  </circle>
                  <circle cx={x} cy={y} r="6" className="hh-node" />
                </g>
              ))}
              <circle cx="150" cy="95" r="11" className="hh-hub" />
            </svg>
          </div>

          <div className="hh-layer hh-layer-app" style={{ "--z": 1 } as CSSProperties}>
            <p className="hh-layer-label">application</p>
            <Image src="/projects/pos/overview.png" alt="" width={720} height={450} sizes="320px" className="hh-shot" />
          </div>

          <div className="hh-layer hh-layer-term" style={{ "--z": 1.7 } as CSSProperties}>
            <HeroTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
