"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import portrait from "@/public/kareithi.jpg";
import { Github, Linkedin, Mail, ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/app/lib/site";

const proof = [
  { value: "50+", label: "client projects shipped" },
  { value: "2", label: "systems live at a school" },
  { value: "19", label: "devices in my homelab" },
];

const socials = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
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
            Full-stack developer. I ship web and mobile products, then run the infrastructure underneath them, with a security background.
          </p>

          <dl className="hh-proof hh-rise" style={{ "--d": "1s" } as CSSProperties}>
            {proof.map((p) => (
              <div key={p.label}>
                <dd>{p.value}</dd>
                <dt>{p.label}</dt>
              </div>
            ))}
          </dl>

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

        <div className="hh-deck">
          <section className="hh-layer hh-layer-lab" style={{ "--z": 0.5 } as CSSProperties} aria-label="Homelab status" tabIndex={0}>
            <p className="hh-layer-label">homelab</p>
            <p className="hh-lab-status">All systems normal</p>
            <dl className="hh-lab-list">
              <div><dt>Proxmox host</dt><dd>24/7</dd></div>
              <div><dt>RAID-1 storage</dt><dd>3 TB</dd></div>
              <div><dt>Devices managed</dt><dd>19</dd></div>
              <div><dt>Data lost</dt><dd>0 B</dd></div>
            </dl>
          </section>

          <Link href="/projects#pos-system" className="hh-layer hh-layer-app" style={{ "--z": 1 } as CSSProperties} aria-label="Open the POS system case study">
            <p className="hh-layer-label">pos system</p>
            <Image src="/projects/pos/overview.png" alt="" width={720} height={450} sizes="320px" className="hh-shot" />
          </Link>

          <section className="hh-layer hh-layer-id" style={{ "--z": 1.7 } as CSSProperties} aria-label="Profile" tabIndex={0}>
            <p className="hh-layer-label">profile</p>
            <dl className="hh-id-rows">
              <div><dt>stack</dt><dd>Next.js, React Native, TypeScript</dd></div>
              <div><dt>exploring</dt><dd>AI, GIS, cloud, DevOps</dd></div>
              <div><dt>certified</dt><dd>Security+, CCNA, AWS, Azure, Google, IBM</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </section>
  );
}
