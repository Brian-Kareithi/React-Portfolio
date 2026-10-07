"use client";

import { useRef, useEffect, ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  /**
   * Layout, so pages open differently:
   * - "stack": title over description, with a giant outlined page number behind
   * - "split": title on the left, description on the right
   * - "center": centred, for short standalone pages
   */
  variant?: "stack" | "split" | "center";
  /** Shorter title and tighter spacing, for pages that should fit on one screen. */
  compact?: boolean;
}

export function SectionHeader({ index, label, title, description, variant = "stack", compact = false }: SectionHeaderProps) {
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

    const reveal = () => {
      line?.style.setProperty("transition", "transform 0.6s cubic-bezier(0.22,1,0.36,1)");
      line?.style.setProperty("transform", "scaleX(1)");
      bits.forEach((bit, i) => {
        bit.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${0.08 * i}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${0.08 * i}s`;
        bit.style.opacity = "1";
        bit.style.transform = "none";
      });
      observer.disconnect();
    };

    const isInViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        reveal();
      },
      { threshold: 0.2 }
    );
    observer.observe(root);

    if (isInViewport(root)) {
      reveal();
    }

    const fallback = setTimeout(() => {
      const visible = bits[0]?.style.opacity === "1";
      if (!visible) reveal();
    }, 2000);

    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);

  const labelRow = (
    <div className={`flex items-center gap-3 ${compact ? "mb-3" : "mb-5 xs:mb-6"} ${variant === "center" ? "justify-center" : ""}`}>
      <span data-fade className="pill font-mono !text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
        <span className="index-num">{index}</span>
        <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
      </span>
      <span
        data-line
        className={`h-px w-12 flex-shrink-0 origin-left ${variant === "center" ? "hidden" : ""}`}
        style={{ backgroundColor: "var(--color-accent-secondary)" }}
      />
    </div>
  );

  const heading = (
    <h1
      data-fade
      className={`display-xl ${compact ? "text-4xl sm:text-5xl mb-3" : "text-[2.6rem] xs:text-5xl sm:text-6xl md:text-7xl mb-5"}`}
      style={{ color: "var(--color-text-primary)" }}
    >
      {title}
    </h1>
  );

  const body = description && (
    <p
      data-fade
      className={`text-[15px] xs:text-base leading-relaxed ${variant === "center" ? "mx-auto max-w-xl" : "max-w-2xl"}`}
      style={{ color: "var(--color-text-secondary)" }}
    >
      {description}
    </p>
  );

  if (variant === "split") {
    return (
      <div ref={rootRef} className={`${compact ? "mb-6 sm:mb-8 gap-3" : "mb-14 xs:mb-16 sm:mb-20 gap-6"} grid md:grid-cols-12 md:items-end`}>
        <div className="md:col-span-7">
          {labelRow}
          {heading}
        </div>
        {body && (
          <div className={`md:col-span-5 md:border-l md:pl-8 ${compact ? "md:pb-2" : "md:pb-6"}`} style={{ borderColor: "var(--color-accent-secondary)" }}>
            {body}
          </div>
        )}
      </div>
    );
  }

  if (variant === "center") {
    return (
      <div ref={rootRef} className="mb-14 xs:mb-16 sm:mb-20 text-center">
        {labelRow}
        {heading}
        {body}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative mb-14 xs:mb-16 sm:mb-20">
      <span aria-hidden="true" className="ghost-num absolute -top-6 right-0 hidden text-[10rem] sm:block md:text-[13rem]">
        {index}
      </span>
      <div className="relative">
        {labelRow}
        {heading}
        {body}
      </div>
    </div>
  );
}
