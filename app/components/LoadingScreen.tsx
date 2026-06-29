"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"loading" | "fading">("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("fading");
      setTimeout(onFinish, 600);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#020601" }}
    >
      <div className="relative flex items-center justify-center">
        <svg
          className="w-20 h-20 xs:w-28 xs:h-28 sm:w-36 sm:h-36 animate-spin-slow"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7AAA3A" />
              <stop offset="50%" stopColor="#B08D3A" />
              <stop offset="100%" stopColor="#7AAA3A" />
            </linearGradient>
          </defs>
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="264"
            strokeDashoffset="200"
            className="animate-dash"
          />
        </svg>
      </div>
    </div>
  );
}
