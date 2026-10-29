"use client";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/media";

interface Frame {
  src: string;
  title: string;
  caption: string;
}

/** Horizontally scrolling row of screenshots, draggable with a mouse and snapping to frames. */
export function FilmStrip({ frames, label }: { frames: Frame[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    const item = el?.querySelector("li");
    if (!el || !item) return;
    const smooth = !prefersReducedMotion();
    el.scrollBy({ left: dir * (item.getBoundingClientRect().width + 16), behavior: smooth ? "smooth" : "auto" });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLUListElement>) => {
    const el = ref.current;
    const d = drag.current;
    if (!el || !d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      el.dataset.dragging = "true";
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const el = ref.current;
    if (!el || !drag.current) return;
    drag.current = null;
    if (el.dataset.dragging) {
      delete el.dataset.dragging;
      const item = el.querySelector("li");
      if (item) {
        const w = item.getBoundingClientRect().width + 16;
        el.scrollTo({ left: Math.round(el.scrollLeft / w) * w, behavior: "smooth" });
      }
    }
  };

  return (
    <div role="region" aria-label={label}>
      <ul
        ref={ref}
        className="filmstrip"
        tabIndex={0}
        aria-label="Screens. Use the arrow keys to scroll."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        {frames.map((f, i) => (
          <li key={f.src}>
            <figure>
              <div className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--color-border)" }}>
                <Image
                  src={f.src}
                  alt={`${f.title} screen: ${f.caption}`}
                  width={1440}
                  height={900}
                  sizes="(max-width: 640px) 84vw, 608px"
                  draggable={false}
                  className="aspect-[16/10] h-auto w-full object-cover object-left-top"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3">
                <span className="index-num" style={{ color: "var(--color-accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm leading-snug" style={{ color: "var(--color-text-secondary)" }}>
                  <strong className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{f.title}.</strong> {f.caption}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="wrap mt-4 flex justify-end gap-2">
        <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous screen" className="strip-btn">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="Next screen" className="strip-btn">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
