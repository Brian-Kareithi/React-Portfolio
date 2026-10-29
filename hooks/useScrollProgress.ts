"use client";

import { useEffect, useRef } from "react";
import { REDUCED_MOTION } from "@/lib/media";

const STIFFNESS = 150;
const DAMPING = 20;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Calls `onFrame` with page scroll progress (0 to 1), smoothed by a spring.
 * The loop only runs while the value is moving, and snaps straight to target under reduced motion.
 */
export function useScrollProgress(onFrame: (progress: number) => void) {
  const onFrameRef = useRef(onFrame);

  useEffect(() => {
    onFrameRef.current = onFrame;
  });

  useEffect(() => {
    const spring = { value: 0, velocity: 0, lastTime: 0 };
    let scrollRange = 0;
    let reducedMotion = false;
    let running = false;
    let raf = 0;

    const measure = () => {
      scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    };

    const frame = () => {
      const now = performance.now();
      const target = scrollRange > 0 ? clamp(window.scrollY / scrollRange, 0, 1) : 1;

      if (reducedMotion) {
        spring.value = target;
        spring.velocity = 0;
      } else {
        const dt = clamp((now - spring.lastTime) / 1000, 0, 1 / 30);
        spring.lastTime = now;
        spring.velocity += (target - spring.value) * STIFFNESS * dt;
        spring.velocity *= Math.exp(-DAMPING * dt);
        spring.value = clamp(spring.value + spring.velocity * dt, 0, 1);
      }

      onFrameRef.current(spring.value);

      const settled = reducedMotion
        ? spring.value === target
        : Math.abs(spring.value - target) < 0.0004 && Math.abs(spring.velocity) < 0.0002;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      spring.lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const media = window.matchMedia(REDUCED_MOTION);
    const onMotionChange = () => {
      reducedMotion = media.matches;
      start();
    };
    const onResize = () => {
      measure();
      start();
    };

    measure();
    onMotionChange();
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    media.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      media.removeEventListener("change", onMotionChange);
      cancelAnimationFrame(raf);
    };
  }, []);
}
