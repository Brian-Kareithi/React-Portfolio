"use client";

import { useEffect, useRef } from "react";

export interface UseScrollProgressOptions {
  from?: string | null;
  to?: string | null;
  stiffness?: number;
  damping?: number;
  onFrame: (progress: number, scrollY: number) => void;
}

interface SpringState {
  value: number;
  velocity: number;
  lastTime: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function useScrollProgress({
  from,
  to,
  stiffness = 150,
  damping = 20,
  onFrame,
}: UseScrollProgressOptions) {
  const onFrameRef = useRef(onFrame);
  const rangeRef = useRef({ startY: 0, endY: 0 });
  const springRef = useRef<SpringState>({ value: 0, velocity: 0, lastTime: 0 });
  const reducedMotionRef = useRef(false);
  const runningRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    onFrameRef.current = onFrame;
  });

  useEffect(() => {
    const measure = () => {
      const docEl = document.documentElement;
      const scrollY = window.scrollY;
      const fromEl = from ? document.querySelector(from) : null;
      const toEl = to ? document.querySelector(to) : null;
      const startY = fromEl ? fromEl.getBoundingClientRect().top + scrollY : 0;
      const docHeight = docEl.scrollHeight;
      const endY = toEl ? toEl.getBoundingClientRect().bottom + scrollY : docHeight;
      rangeRef.current = { startY, endY: Math.max(endY, startY + 1) };
    };

    const frame = () => {
      const now = performance.now();
      const { startY, endY } = rangeRef.current;
      const denominator = endY - window.innerHeight - startY;
      const target =
        denominator > 0
          ? clamp((window.scrollY - startY) / denominator, 0, 1)
          : 1;
      const spring = springRef.current;

      if (reducedMotionRef.current) {
        spring.value = target;
        spring.velocity = 0;
      } else {
        const dt = clamp((now - spring.lastTime) / 1000, 0, 1 / 30);
        spring.lastTime = now;
        spring.velocity += (target - spring.value) * stiffness * dt;
        spring.velocity *= Math.exp(-damping * dt);
        spring.value = clamp(spring.value + spring.velocity * dt, 0, 1);
      }

      onFrameRef.current(spring.value, window.scrollY);

      const settled =
        reducedMotionRef.current
          ? spring.value === target
          : Math.abs(spring.value - target) < 0.0004 &&
            Math.abs(spring.velocity) < 0.0002;
      if (settled) {
        runningRef.current = false;
        return;
      }
      rafRef.current = requestAnimationFrame(frame);
    };

    const startLoop = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      springRef.current.lastTime = performance.now();
      rafRef.current = requestAnimationFrame(frame);
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = media.matches;
      startLoop();
    };

    const handleScroll = () => startLoop();
    const handleResize = () => {
      measure();
      startLoop();
    };
    const handleLoad = () => {
      measure();
      startLoop();
    };

    measure();
    updateMotionPreference();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);
    media.addEventListener("change", updateMotionPreference);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      media.removeEventListener("change", updateMotionPreference);
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
    };
  }, [from, to, stiffness, damping]);
}
