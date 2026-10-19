"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface AssembleProps {
  children: ReactNode;
  className?: string;
  index?: number;
  from?: "scatter" | "up" | "left" | "right";
}

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
