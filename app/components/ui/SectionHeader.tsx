"use client";

import { useRef, useEffect, ReactNode } from "react";

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

    const line = root.querySelector<HTMLElement>("[data-line]");
    const bits = root.querySelectorAll<HTMLElement>("[data-fade]");

    line?.style.setProperty("transform", "scaleX(0)");
    bits.forEach((bit) => {
      bit.style.opacity = "0";
      bit.style.transform = "translateY(18px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        line?.style.setProperty("transition", "transform 0.6s cubic-bezier(0.22,1,0.36,1)");
        line?.style.setProperty("transform", "scaleX(1)");
        bits.forEach((bit, i) => {
          bit.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${0.08 * i}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${0.08 * i}s`;
          bit.style.opacity = "1";
          bit.style.transform = "none";
        });
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="mb-12 xs:mb-16 sm:mb-20">
      <div className="flex items-center gap-3 xs:gap-4 mb-5 xs:mb-6">
        <span data-fade className="index-num">
          {index}
        </span>
        <span
          data-line
          className="h-px w-10 flex-shrink-0 origin-left"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
        <span data-fade className="field-label">
          {label}
        </span>
      </div>
      <h1
        data-fade
        className="display-xl text-[2rem] xs:text-4xl sm:text-5xl md:text-[3.5rem] mb-5"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h1>
      {description && (
        <p
          data-fade
          className="max-w-2xl text-sm xs:text-[15px] leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
