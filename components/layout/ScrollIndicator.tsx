"use client";
import { useEffect, useState } from "react";

/** Thin custom scrollbar thumb on the right edge; the native one is hidden. */
export function ScrollIndicator() {
  const [scrollState, setScrollState] = useState({ position: 0, size: 100 });

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const scrollRange = Math.max(documentHeight - window.innerHeight, 0);
      const size = documentHeight > 0 ? Math.min(window.innerHeight / documentHeight, 1) : 1;
      const progress = scrollRange > 0 ? Math.min(Math.max(window.scrollY / scrollRange, 0), 1) : 0;
      setScrollState({ size: size * 100, position: progress * (1 - size) * 100 });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className="scroll-indicator"
      role="progressbar"
      aria-label="Page scroll position"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(scrollState.position / Math.max(100 - scrollState.size, 1) * 100)}
      aria-hidden={scrollState.size >= 100}
    >
      <div
        className="scroll-indicator-thumb"
        style={{ height: `${scrollState.size}%`, transform: `translateY(${scrollState.position / Math.max(scrollState.size, 1) * 100}%)` }}
      />
    </div>
  );
}
