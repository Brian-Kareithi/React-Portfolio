"use client";

import { useRef, useEffect, ReactNode } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export function StaggerReveal({ children, className = "", staggerDelay = 70, threshold = 0.1 }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !el.children.length) return;

    const targets = Array.from(el.children) as HTMLElement[];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => {
        t.style.transition = "none";
        t.style.opacity = "1";
        t.style.transform = "none";
      });
      return;
    }

    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = "translateY(24px)";
      t.style.willChange = "opacity, transform";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        targets.forEach((t, index) => {
          const delay = (index * staggerDelay) / 1000;
          t.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
          t.style.opacity = "1";
          t.style.transform = "none";
        });
        observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerDelay, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}