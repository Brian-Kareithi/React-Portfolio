"use client";

import { useRef, useEffect } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Seconds. Kept short so the number settles quickly. */
  duration?: number;
  className?: string;
}

/**
 * The real number is in the server HTML, so crawlers, no-JS visitors and the first paint all see it.
 * If the number starts below the fold, it rewinds and counts up when scrolled into view.
 * If it is already on screen, or motion is reduced, it is left alone so nothing flickers.
 */
export function CountUp({ value, suffix = "", prefix = "", duration = 0.4, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const final = `${prefix}${value}${suffix}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    let raf = 0;
    let start: number | null = null;
    el.textContent = `${prefix}0${suffix}`;

    const frame = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${prefix}${Math.round(eased * value)}${suffix}`;
      if (progress < 1) raf = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        raf = requestAnimationFrame(frame);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [value, suffix, prefix, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
