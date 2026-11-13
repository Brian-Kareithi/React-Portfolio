"use client";

import { useEffect } from "react";
import { FINE_POINTER_WITH_MOTION, matches } from "@/lib/media";

const GLASS =
  ".flat-card, .l-stat, .l-node, .l-builds article, .hs-card, .a-card, .a-cert, .c-card, .c-form, .hh-layer, .g-card-word, " +
  ".s-item, .w-principles li, .t-item, .a-closing-item, .w-caplist > div, .p-facts > div, .w-tools > div, .h-glance-cell, " +
  ".q-head, .hh-copy, .q-case, .h-proof-item, .p-github, .a-now, .w-caps, .gb-tile, .gb-detail, .sb, .q-btn, .q-link";

export function GlassLight() {
  useEffect(() => {
    if (!matches(FINE_POINTER_WITH_MOTION)) return;
    let current: HTMLElement | null = null;
    let raf = 0;
    let last: PointerEvent | null = null;

    const release = () => {
      if (!current) return;
      current.style.setProperty("--so", "0");
      current = null;
    };

    const frame = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = (e.target instanceof Element ? e.target.closest<HTMLElement>(GLASS) : null) ?? null;
      if (target !== current) {
        release();
        current = target;
      }
      if (!current) return;
      const r = current.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      current.style.setProperty("--sx", x.toFixed(3));
      current.style.setProperty("--sy", y.toFixed(3));
      current.style.setProperty("--so", "1");
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => release();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      release();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
