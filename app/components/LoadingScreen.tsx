"use client";
import { useEffect, useState } from "react";

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
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <div
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            border: "2px solid transparent",
            borderTopColor: "var(--color-accent)",
            borderRightColor: "var(--color-accent-secondary)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            BK
          </span>
        </div>
      </div>
    </div>
  );
}
