"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Where each piece starts, relative to its resting place: [x px, y px, rotation deg]. */
const SCATTER: [number, number, number][] = [
  [-130, 70, -7],
  [110, -40, 6],
  [-70, -80, -4],
  [150, 60, 8],
  [-160, -20, 5],
  [80, 100, -8],
  [-100, 90, 4],
  [130, -70, -5],
];

const DIRECTIONS: Record<string, [number, number, number]> = {
  up: [0, 70, 0],
  left: [-140, 0, -3],
  right: [140, 0, 3],
};

interface AssembleProps {
  children: ReactNode;
  className?: string;
  /** Position in a group; picks a different starting point so siblings converge from different sides. */
  index?: number;
  from?: "scatter" | "up" | "left" | "right";
}

// One shared scroll loop drives every piece. Each piece's progress is tied to where it sits
// in the viewport, so the page assembles as you scroll down and loosens again as you scroll up.
const pieces = new Set<HTMLElement>();
let frame = 0;
let listening = false;

const update = () => {
  frame = 0;
  const vh = window.innerHeight;
  pieces.forEach((outer) => {
    const inner = outer.firstElementChild as HTMLElement | null;
    if (!inner) return;
    // Measure the untransformed wrapper so the motion never feeds back into its own progress.
    const top = outer.getBoundingClientRect().top;
    const raw = (vh * 0.96 - top) / (vh * 0.5);
    const p = Math.min(1, Math.max(0, raw));
    inner.style.setProperty("--p", (p * p * (3 - 2 * p)).toFixed(4));
  });
};

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(update);
};

const attach = (el: HTMLElement) => {
  pieces.add(el);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  schedule();
  return () => {
    pieces.delete(el);
    if (!pieces.size && listening) {
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }
  };
};

export function Assemble({ children, className = "", index = 0, from = "scatter" }: AssembleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return attach(el);
  }, []);

  const [ax, ay, ar] = from === "scatter" ? SCATTER[index % SCATTER.length] : DIRECTIONS[from];
  const vector = { "--ax": `${ax}px`, "--ay": `${ay}px`, "--ar": `${ar}deg` } as CSSProperties;

  return (
    <div ref={ref} className={className}>
      <div className="assemble h-full" style={vector}>
        {children}
      </div>
    </div>
  );
}
