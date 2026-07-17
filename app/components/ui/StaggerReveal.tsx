"use client";

import { useRef, useEffect, useState, Children, ReactNode, isValidElement } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export function StaggerReveal({ children, className = "", staggerDelay = 70, threshold = 0.05 }: StaggerRevealProps) {
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
      { threshold, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const childArray = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, index) => {
        if (!isValidElement(child)) return child;
        return (
          <div
            key={index}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0) scale(1)"
                : "translateY(16px) scale(0.98)",
              transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
              transitionDelay: visible ? `${index * staggerDelay}ms` : "0ms",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
