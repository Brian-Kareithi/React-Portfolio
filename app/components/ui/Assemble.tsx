"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface AssembleProps {
  children: ReactNode;
  className?: string;
  /** Position in a group; staggers siblings by 50ms each (capped). */
  index?: number;
  /** Kept for existing call sites; every reveal now rises a short distance. */
  from?: "scatter" | "up" | "left" | "right";
}

/**
 * One-shot reveal on scroll. Content is visible in the server HTML; only pieces that start below
 * the fold are hidden on mount and fade up (350ms) once they enter. Reduced motion: never hidden.
 */
export function Assemble({ children, className = "", index = 0 }: AssembleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.reveal = "out";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "in";
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--d": `${Math.min(index, 6) * 50}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
