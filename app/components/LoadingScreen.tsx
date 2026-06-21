"use client";
import { useEffect, useState } from "react";

const DOT_COUNT = 8;

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"loading" | "fading">("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("fading");
      setTimeout(onFinish, 600);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#1A120D" }}
    >
      <div className="relative w-12 h-12 xs:w-16 xs:h-16 animate-rotate-loading">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-white/80"
            style={{
              top: `${50 - 50 * Math.cos((2 * Math.PI * i) / DOT_COUNT)}%`,
              left: `${50 + 50 * Math.sin((2 * Math.PI * i) / DOT_COUNT)}%`,
              transform: "translate(-50%, -50%)",
              animation: `spin-dot 1.2s ease-in-out infinite`,
              animationDelay: `${(i * 1.2) / DOT_COUNT}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
