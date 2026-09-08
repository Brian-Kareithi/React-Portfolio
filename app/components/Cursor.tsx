"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small trailing ring that eases toward the pointer and expands over
 * interactive elements. Mounts only on fine pointers with motion allowed;
 * everything else keeps the native cursor untouched.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setEnabled(fine.matches && !reduced.matches);
    decide();
    fine.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      fine.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    if (!ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { ...pos };
    let raf = 0;
    let idle = true;

    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.18;
      cur.y += (pos.y - cur.y) * 0.18;
      ring.style.transform = `translate(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (idle) {
        idle = false;
        ring.dataset.hidden = "false";
      }
      const interactive = (e.target as Element | null)?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="grow"]'
      );
      ring.dataset.active = interactive ? "true" : "false";
    };
    const onLeave = () => {
      ring.dataset.hidden = "true";
    };

    ring.dataset.hidden = "true";
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ringRef} className="cursor-ring" data-hidden="true" aria-hidden="true" />;
}
