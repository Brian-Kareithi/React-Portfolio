"use client";

import { useEffect, useRef } from "react";

/**
 * Options for `useScrollProgress`.
 */
export interface UseScrollProgressOptions {
  /**
   * Selector of the element that marks the start of the measured range.
   * When the element is absent (or the selector is null) the top of the page is used.
   */
  from?: string | null;
  /**
   * Selector of the element that marks the end of the measured range.
   * Progress reaches 100% once the bottom of this element reaches the bottom
   * of the viewport. When the element is absent the end of the document is used.
   */
  to?: string | null;
  /** Spring stiffness - higher values track the scroll position more eagerly. */
  stiffness?: number;
  /** Spring damping - higher values reduce overshoot and oscillation. */
  damping?: number;
  /**
   * Called once per animation frame with the smoothed progress (0..1)
   * and the raw window scroll offset. Kept stable via a ref, so this
   * callback never re-registers and the hook never triggers re-renders.
   */
  onFrame: (progress: number, scrollY: number) => void;
}

interface SpringState {
  value: number;
  velocity: number;
  lastTime: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Smooth scroll progress through a measured section of the page.
 *
 * - Progress is 0 when the `from` element enters the viewport and 1 when the
 *   bottom of the `to` element reaches the bottom of the viewport.
 * - A critically damped spring interpolates the raw scroll position, giving
 *   fluid, jump-free motion that eases into place when scrolling stops.
 * - The spring is replaced with direct tracking when the user prefers reduced
 *   motion (the indicator stays functional, only the animation is removed).
 * - Measurements are taken on mount, on resize, on window load, and whenever
 *   the `from`/`to` selectors change (e.g. route navigation), so they never go stale.
 * - The whole loop runs on `requestAnimationFrame` and writes to refs only -
 *   no state, no React re-renders, no layout reads inside the frame loop.
 */
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
