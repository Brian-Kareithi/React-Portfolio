"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import portrait from "@/public/kareithi.jpg";
import { HeroDeck } from "@/components/home/HeroDeck";
import { HeroName } from "@/components/home/HeroName";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { email, github, linkedin } from "@/data/socials";
import { externalLinkProps } from "@/lib/links";
import { FINE_POINTER_WITH_MOTION, matches } from "@/lib/media";

const proof = [
  { value: "50+", label: "client projects shipped" },
  { value: "2", label: "systems live at a school" },
  { value: "19", label: "devices in my homelab" },
];

const socials = [github, linkedin, email];

const LENS_MARGIN = 40;

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

/** Feeds pointer position to CSS: --px/--py for the card parallax, --lx/--ly for the name lens. */
function usePointerParallax(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || !matches(FINE_POINTER_WITH_MOTION)) return;
    const lens = el.querySelector<HTMLElement>(".hh-name-wrap");
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
        el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
        el.style.setProperty("--ox", `${e.clientX - r.left}px`);
        el.style.setProperty("--oy", `${e.clientY - r.top}px`);
        if (!lens) return;
        const b = lens.getBoundingClientRect();
        lens.style.setProperty("--lx", `${e.clientX - b.left}px`);
        lens.style.setProperty("--ly", `${e.clientY - b.top}px`);
        const inside =
          e.clientX >= b.left - LENS_MARGIN && e.clientX <= b.right + LENS_MARGIN && e.clientY >= b.top - LENS_MARGIN && e.clientY <= b.bottom + LENS_MARGIN;
        lens.dataset.on = inside ? "true" : "false";
      });
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
      if (lens) lens.dataset.on = "false";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [root]);
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  usePointerParallax(root);

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
            <Eyebrow style={{ flex: 1 }}>
              <span>
                <span className="hero-welcome">Welcome back. </span>
                Nairobi, Kenya <b>·</b> Full-stack developer
              </span>
            </Eyebrow>
          </div>

          <div className="hh-name-wrap" data-on="false">
            <HeroName />
            <HeroName lens />
          </div>

          <p className="q-lede hh-rise" style={{ ...delay("0.95s"), marginTop: "2rem" }}>
            Full-stack developer. I ship web and mobile products, then run the infrastructure underneath them, with a security background.
          </p>

          <dl className="hh-proof hh-rise" style={delay("1s")}>
            {proof.map((p) => (
              <div key={p.label}>
                <dd>{p.value}</dd>
                <dt>{p.label}</dt>
              </div>
            ))}
          </dl>

          <div className="hh-actions hh-rise" style={delay("1.1s")}>
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
                <a key={label} href={href} {...externalLinkProps(href)} aria-label={label} className="hero-social">
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </span>
          </div>
        </div>

        <HeroDeck />
      </div>
    </section>
  );
}
