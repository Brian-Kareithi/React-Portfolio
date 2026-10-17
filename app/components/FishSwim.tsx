"use client";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import type { ComponentType } from "react";

type LottieProps = {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  lottieRef?: React.MutableRefObject<LottieRefCurrentProps | null>;
  rendererSettings?: { preserveAspectRatio?: string };
  className?: string;
};

/**
 * The fish swimming in the cobalt name bar. The player and the animation load after first paint,
 * so they never hold up the hero. It plays only while on screen, and holds a still frame under
 * reduced motion. Purely decorative.
 */
export default function FishSwim({ className = "", fit = "xMidYMid slice" }: { className?: string; fit?: string }) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [mod, setMod] = useState<{ Lottie: ComponentType<LottieProps>; data: unknown } | null>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    let alive = true;
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    Promise.all([import("lottie-react"), import("@/app/lib/fish.json")]).then(([l, d]) => {
      if (alive) setMod({ Lottie: l.default as unknown as ComponentType<LottieProps>, data: d.default });
    });
    return () => {
      alive = false;
    };
  }, []);

  // Pause when the hero scrolls away.
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !mod || reduce) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? lottieRef.current?.play() : lottieRef.current?.pause()));
    io.observe(el);
    return () => io.disconnect();
  }, [mod, reduce]);

  return (
    <span ref={boxRef} aria-hidden="true" className={`fish-swim block ${className}`}>
      {mod && (
        <mod.Lottie
          animationData={mod.data}
          loop={!reduce}
          autoplay={!reduce}
          lottieRef={lottieRef}
          rendererSettings={{ preserveAspectRatio: fit }}
          className="h-full w-full"
        />
      )}
    </span>
  );
}
