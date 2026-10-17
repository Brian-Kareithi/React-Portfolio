"use client";
import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

/** Load the player once the visitor engages, or after a quiet pause: it is decoration, never on the critical path. */
const LOAD_EVENTS = ["pointermove", "pointerdown", "touchstart", "scroll", "keydown"] as const;
const FALLBACK_MS = 6000;

/**
 * The fish swimming behind the surname in the cobalt bar.
 * Uses the light (SVG-only) Lottie player, loads after first interaction, pauses off screen,
 * and shows a single still frame under reduced motion.
 */
export default function FishSwim({ className = "", fit = "xMidYMid slice" }: { className?: string; fit?: string }) {
  const boxRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let anim: AnimationItem | null = null;
    let io: IntersectionObserver | null = null;
    let started = false;
    let alive = true;
    let timer = 0;

    const cleanupTriggers = () => {
      window.clearTimeout(timer);
      LOAD_EVENTS.forEach((ev) => window.removeEventListener(ev, start));
    };

    async function start() {
      if (started) return;
      started = true;
      cleanupTriggers();
      const [{ default: lottie }, { default: data }] = await Promise.all([
        import("lottie-web/build/player/lottie_light"),
        import("@/app/lib/fish.json"),
      ]);
      if (!alive || !box) return;
      anim = lottie.loadAnimation({
        container: box,
        renderer: "svg",
        loop: !reduce,
        autoplay: false,
        animationData: data,
        rendererSettings: { preserveAspectRatio: fit },
      });
      if (reduce) {
        anim.goToAndStop(0, true);
        return;
      }
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? anim?.play() : anim?.pause()));
      io.observe(box);
    }

    timer = window.setTimeout(start, FALLBACK_MS);
    LOAD_EVENTS.forEach((ev) => window.addEventListener(ev, start, { once: true, passive: true }));

    return () => {
      alive = false;
      cleanupTriggers();
      io?.disconnect();
      anim?.destroy();
    };
  }, [fit]);

  return <span ref={boxRef} aria-hidden="true" className={`fish-swim block ${className}`} />;
}
