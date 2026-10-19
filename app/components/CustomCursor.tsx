"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Kind = "default" | "link" | "text";

export default function CustomCursor() {
  const caret = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState<Kind>("default");

  useEffect(() => {
    const el = caret.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const html = document.documentElement;
    html.classList.add("cursor-hidden");

    const x = gsap.quickTo(el, "x", { duration: 0.12, ease: "power2.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.12, ease: "power2.out" });
    let shown = false;

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.dataset.on = "true";
      }
      x(e.clientX);
      y(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(tagged?.dataset.cursor ?? "");
      if (t?.closest("input, textarea, select, [contenteditable='true']")) setKind("text");
      else if (t?.closest("a, button, summary, [role='button']")) setKind("link");
      else setKind("default");
    };
    const onDown = () => (el.dataset.down = "true");
    const onUp = () => delete el.dataset.down;
    const onLeave = () => {
      shown = false;
      delete el.dataset.on;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    html.addEventListener("pointerleave", onLeave);
    return () => {
      html.classList.remove("cursor-hidden");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      html.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={caret} className="cursor-caret" data-kind={kind} data-label={label ? "true" : undefined} aria-hidden="true">
      <i />
      <span>&gt; {label}</span>
    </div>
  );
}
