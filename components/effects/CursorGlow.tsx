"use client";

import { useEffect, useRef } from "react";
import { FINE_POINTER_WITH_MOTION, matches } from "@/lib/media";

/** Soft berry glow that trails the pointer behind the page content. */
export function CursorGlow() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    if (!matches(FINE_POINTER_WITH_MOTION)) return;
    let tx = window.innerWidth * 0.6;
    let ty = window.innerHeight * 0.3;
    let x = tx;
    let y = ty;
    let raf = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      node.dataset.on = "true";
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={el} className="cursor-glow" aria-hidden="true" />;
}
