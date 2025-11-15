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
      {/* Comet Head - Large and prominent */}
      <div
        className="absolute right-0 w-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50 transition-all duration-150"
        style={{ 
          height: '16px',
          top: `${scrollPercent}%`,
          transform: 'translateY(-50%)'
        }}
      ></div>
      
      {/* Comet Tail - Tapering effect */}
      <div
        className="absolute right-0 bg-gradient-to-b from-cyan-400/80 via-blue-500/40 to-transparent transition-all duration-150"
        style={{ 
          width: '2px',
          height: `${Math.min(scrollPercent * 2, 100)}%`,
          top: '0',
          clipPath: `polygon(0% 0%, 100% 0%, 100% ${scrollPercent}%, 0% ${Math.max(scrollPercent - 20, 0)}%)`
        }}
      ></div>
    </div>
  );
}