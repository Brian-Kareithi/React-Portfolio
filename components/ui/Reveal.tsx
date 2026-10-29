"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/media";
import { cx } from "@/lib/cx";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Position in a group, used to stagger the entrance. */
  index?: number;
}

/** Fades its children in the first time they scroll into view. Content already on screen is left alone. */
export function Reveal({ children, className, index = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
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
    <div ref={ref} className={cx("reveal", className)} style={{ "--d": `${Math.min(index, 6) * 50}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
