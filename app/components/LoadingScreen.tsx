"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.body.style.overflow = "hidden";

    const logoRef = root.querySelector<HTMLElement>(".minimal-loader-logo");
    const barRef = root.querySelector<HTMLElement>(".minimal-loader-bar");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      document.body.style.overflow = "";
      onFinish();
    };

    const timeline = gsap.timeline();

    if (logoRef) {
      timeline.fromTo(
        logoRef,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: reduce ? 0 : 0.5, ease: "power2.out" },
        0
      );
    }
    if (barRef) {
      timeline.fromTo(
        barRef,
        { scaleX: 0 },
        { scaleX: 1, duration: reduce ? 0 : 1.4, ease: "power2.inOut" },
        reduce ? 0 : 0.25
      );
    }
    timeline.to(
      root,
      { opacity: 0, duration: reduce ? 0.1 : 0.6, ease: "power2.inOut", onComplete: finish },
      reduce ? 0.2 : 1.85
    );

    return () => {
      timeline.kill();
      gsap.killTweensOf(root);
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <span className="minimal-loader-logo opacity-0">
        <Image src="/logo.png" alt="Brian Kareithi" width={120} height={40} className="h-8 sm:h-10 w-auto" />
      </span>
      <div
        className="h-[2px] w-40 sm:w-56 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--color-border)" }}
      >
        <div
          className="minimal-loader-bar h-full w-full origin-left rounded-full"
          style={{ backgroundColor: "var(--color-accent)", transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
