"use client";
import { useEffect, useState } from "react";

export default function ScrollBar() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(Math.min(percent, 98));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-2 top-0 h-screen overflow-hidden pointer-events-none z-50">
      <div
        className="absolute right-0 w-[2px] transition-all duration-150 rounded-full"
        style={{
          height: `${Math.max(scrollPercent, 1)}%`,
          top: 0,
          backgroundColor: "var(--color-accent)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}
