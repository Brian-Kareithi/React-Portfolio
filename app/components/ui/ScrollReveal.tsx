"use client";

import { useRef, useEffect, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
  duration?: number;
  distance?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  distance = 32,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const from: Record<string, string> = {};
    if (direction === "up") from.transform = `translateY(${distance}px)`;
    else if (direction === "down") from.transform = `translateY(${-distance}px)`;
    else if (direction === "left") from.transform = `translateX(${distance}px)`;
    else if (direction === "right") from.transform = `translateX(${-distance}px)`;
    else if (direction === "scale") from.transform = "scale(0.94)";

    Object.assign(el.style, from, { opacity: "0", willChange: "opacity, transform" });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        el.style.transition = `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
        el.style.opacity = "1";
        el.style.transform = "none";
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction, duration, distance]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}