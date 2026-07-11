"use client";
import { useEffect, useState } from "react";

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md skeleton-pulse ${className || ""}`}
      style={{ backgroundColor: "var(--color-bg-tertiary)" }}
    />
  );
}

function SkeletonCircle({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-full skeleton-pulse ${className || ""}`}
      style={{ backgroundColor: "var(--color-bg-tertiary)" }}
    />
  );
}

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
      className={`fixed inset-0 z-[100] transition-opacity duration-700 overflow-y-auto ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Navbar skeleton */}
      <div
        className="flex items-center justify-between px-4 xs:px-6 py-4 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <SkeletonBlock className="w-20 xs:w-24 h-5 xs:h-6" />
        <div className="hidden sm:flex gap-4 xs:gap-6">
          <SkeletonBlock className="w-14 h-4" />
          <SkeletonBlock className="w-14 h-4" />
          <SkeletonBlock className="w-14 h-4" />
          <SkeletonBlock className="w-14 h-4" />
        </div>
        <div className="sm:hidden">
          <SkeletonBlock className="w-6 h-6 rounded" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-4rem)] px-4 xs:px-6 max-w-6xl mx-auto gap-8 xs:gap-12 lg:gap-16">
        {/* Left: Text blocks */}
        <div className="flex-1 w-full space-y-3 xs:space-y-4 pt-8 xs:pt-12 lg:pt-0">
          <SkeletonBlock className="w-16 xs:w-20 h-3 xs:h-3.5" />
          <div className="space-y-1.5 xs:space-y-2">
            <SkeletonBlock className="w-56 xs:w-64 sm:w-72 h-10 xs:h-12 sm:h-14" />
            <SkeletonBlock className="w-40 xs:w-48 sm:w-52 h-10 xs:h-12 sm:h-14" />
          </div>
          <div className="pt-2 xs:pt-3 space-y-2">
            <SkeletonBlock className="w-48 xs:w-60 sm:w-64 h-3.5 xs:h-4" />
            <SkeletonBlock className="w-36 xs:w-44 sm:w-48 h-3.5 xs:h-4" />
          </div>
          <div className="flex gap-3 xs:gap-4 pt-3 xs:pt-4">
            <SkeletonCircle className="w-9 xs:w-10 h-9 xs:h-10" />
            <SkeletonCircle className="w-9 xs:w-10 h-9 xs:h-10" />
            <SkeletonCircle className="w-9 xs:w-10 h-9 xs:h-10" />
            <SkeletonCircle className="w-9 xs:w-10 h-9 xs:h-10" />
          </div>
        </div>

        {/* Right: Image placeholder */}
        <div className="flex-1 flex justify-center pb-8 xs:pb-12 lg:pb-0">
          <SkeletonBlock className="w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80" />
        </div>
      </div>
    </div>
  );
}
