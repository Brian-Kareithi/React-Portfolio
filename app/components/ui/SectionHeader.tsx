"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
}

export function SectionHeader({ index, label, title, description }: SectionHeaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const line = root.querySelector("[data-line]");
    const bits = root.querySelectorAll("[data-fade]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
      tl.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power3.inOut" }
      ).fromTo(
        bits,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.09 },
        "-=0.35"
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="mb-12 xs:mb-16 sm:mb-20">
      <div className="flex items-center gap-3 xs:gap-4 mb-4 xs:mb-5">
        <span data-fade className="text-[10px] xs:text-xs font-mono font-medium"
          style={{ color: "var(--color-accent)" }}>
          {index}
        </span>
        <span data-line className="w-8 h-px flex-shrink-0 origin-left"
          style={{ backgroundColor: "var(--color-accent)" }} />
        <span data-fade className="text-[9px] xs:text-[10px] font-medium tracking-[0.3em] uppercase"
          style={{ color: "var(--color-text-muted)" }}>
          {label}
        </span>
      </div>
      <h2 data-fade className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 xs:mb-5"
        style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h2>
      {description && (
        <p data-fade className="max-w-2xl text-xs xs:text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}>
          {description}
        </p>
      )}
    </div>
  );
}
