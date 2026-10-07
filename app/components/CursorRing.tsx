"use client";
import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], summary, label, select";
const TEXT_FIELD = "input, textarea";

// A thin ring that trails the native pointer. It expands over interactive
// elements, contracts on press, and steps aside over text fields.
export default function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;

    const paint = () => {
      const k = reduce ? 1 : 0.22;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
      raf = settled ? 0 : requestAnimationFrame(paint);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const t = e.target as Element | null;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!el.dataset.visible) {
        pos.x = target.x;
        pos.y = target.y;
        el.dataset.visible = "true";
      }
      el.dataset.state = t?.closest(TEXT_FIELD) ? "text" : t?.closest(INTERACTIVE) ? "link" : "idle";
      kick();
    };
    const onLeave = () => delete el.dataset.visible;
    const onDown = () => (el.dataset.pressed = "true");
    const onUp = () => delete el.dataset.pressed;

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-ring" aria-hidden="true">
      <span />
    </div>
  );
}
