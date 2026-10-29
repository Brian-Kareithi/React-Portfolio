"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { tick } from "@/lib/sound";
import { FINE_POINTER_WITH_MOTION, matches } from "@/lib/media";

/** Primary buttons lean toward the pointer, and every `.btn-neon` click plays the optional tick sound. */
export function MagneticButtons() {
  useEffect(() => {
    if (!matches(FINE_POINTER_WITH_MOTION)) return;
    let target: HTMLElement | null = null;
    let moveX: ((v: number) => void) | null = null;
    let moveY: ((v: number) => void) | null = null;

    const release = () => {
      moveX?.(0);
      moveY?.(0);
      target = null;
    };
    const onMove = (e: PointerEvent) => {
      const button = (e.target as Element | null)?.closest<HTMLElement>(".btn-neon-primary") ?? null;
      if (button !== target) {
        release();
        if (button) {
          target = button;
          moveX = gsap.quickTo(button, "x", { duration: 0.4, ease: "power3.out" });
          moveY = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3.out" });
        }
      }
      if (!target || !moveX || !moveY) return;
      const r = target.getBoundingClientRect();
      moveX((e.clientX - (r.left + r.width / 2)) * 0.18);
      moveY((e.clientY - (r.top + r.height / 2)) * 0.28);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest(".btn-neon")) tick();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
