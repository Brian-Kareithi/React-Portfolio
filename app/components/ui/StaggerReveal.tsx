"use client";

import { useRef, useEffect, useState, Children, ReactNode, isValidElement } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

const directions = [
  { x: -30, y: 0, rotate: 0, scale: 0.92 },
  { x: 30, y: 0, rotate: 0, scale: 0.92 },
  { x: 0, y: 24, rotate: 0, scale: 0.95 },
  { x: 0, y: -24, rotate: 0, scale: 0.95 },
  { x: -20, y: 15, rotate: -4, scale: 0.9 },
  { x: 20, y: -15, rotate: 4, scale: 0.9 },
  { x: 0, y: 0, rotate: 0, scale: 0.85 },
  { x: -25, y: -10, rotate: -3, scale: 0.92 },
  { x: 25, y: 10, rotate: 3, scale: 0.92 },
];

export function StaggerReveal({ children, className = "", staggerDelay = 80, threshold = 0.05 }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const childArray = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, index) => {
        if (!isValidElement(child)) return child;
        const dir = directions[index % directions.length];

        return (
          <div
            key={index}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translate3d(0, 0, 0) scale(1) rotate(0deg)"
                : `translate3d(${dir.x}px, ${dir.y}px, 0) scale(${dir.scale}) rotate(${dir.rotate}deg)`,
              transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: visible ? `${index * staggerDelay}ms` : "0ms",
              willChange: "transform, opacity",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
