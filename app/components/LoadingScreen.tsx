"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/app/lib/loader.json";

const MIN_VISIBLE_MS = 800;
const FADE_MS = 500;

// Covers the first paint, then hands over once the page has loaded and the
// animation has had time to play through at least once.
export default function LoadingScreen() {
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("show");
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const start = performance.now();
    let fadeTimer: number;
    let goneTimer: number;

    const finish = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      fadeTimer = window.setTimeout(() => {
        setPhase("fade");
        goneTimer = window.setTimeout(() => setPhase("gone"), FADE_MS);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(goneTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "gone") document.documentElement.style.overflow = "";
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="loading-screen fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
      style={{
        background: "var(--color-bg-primary)",
        opacity: phase === "fade" ? 0 : 1,
        transition: `opacity ${FADE_MS}ms var(--ease-out)`,
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      <div className="w-56 sm:w-64" aria-hidden="true">
        <Lottie animationData={animationData} loop={!reduce} autoplay={!reduce} rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }} />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span
          className="text-3xl leading-none"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-text-primary)" }}
        >
          Brian Kareithi
        </span>
      </div>
    </div>
  );
}
