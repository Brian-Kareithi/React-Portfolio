"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { FINE_POINTER, matches, prefersReducedMotion } from "@/lib/media";

type RGB = [number, number, number];

function splitChars(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  let index = 0;
  for (const node of nodes) {
    const text = node.textContent ?? "";
    if (!text.trim()) continue;
    const frag = document.createDocumentFragment();
    for (const part of text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(" "));
        continue;
      }
      const word = document.createElement("span");
      word.className = "lh-word";
      for (const ch of part) {
        const c = document.createElement("span");
        c.className = "hh-char";
        c.style.setProperty("--c", String(index++));
        c.textContent = ch;
        word.appendChild(c);
      }
      frag.appendChild(word);
    }
    node.replaceWith(frag);
  }
}

function parse(color: string): RGB {
  const m = color.match(/[\d.]+/g);
  return m ? [Number(m[0]), Number(m[1]), Number(m[2])] : [0, 0, 0];
}

const mix = (a: RGB, b: RGB, t: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;

/** Page h1 that assembles letter by letter, then tints the characters nearest the pointer. */
export function LensHeading({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const heading = root.querySelector<HTMLElement>("h1");
    if (!heading) return;
    if (prefersReducedMotion()) return;

    if (!root.dataset.ready) {
      root.dataset.ready = "true";
      const label = heading.textContent ?? "";
      splitChars(heading);
      heading.setAttribute("aria-label", label);
      heading.querySelectorAll(".lh-word").forEach((w) => w.setAttribute("aria-hidden", "true"));
      window.setTimeout(() => (root.dataset.done = "true"), 1800);
    }

    if (!matches(FINE_POINTER)) return;

    const dark = Boolean(root.closest(".q-dark"));
    const pink: RGB = [217, 138, 163];
    const berry: RGB = [135, 51, 79];
    const ink: RGB = [23, 20, 26];
    const cream: RGB = [242, 238, 242];
    const chars = [...heading.querySelectorAll<HTMLElement>(".hh-char")].map((el) => {
      const emphasised = Boolean(el.closest("em"));
      const base = parse(getComputedStyle(el).color);
      const target = emphasised ? (dark ? cream : ink) : dark ? pink : berry;
      return { el, base, target };
    });

    const zone = root.closest<HTMLElement>("header") ?? root;
    let raf = 0;
    const reach = 150;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        for (const c of chars) {
          const r = c.el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const k = Math.max(0, 1 - Math.hypot(dx, dy) / reach);
          const eased = k * k * (3 - 2 * k);
          c.el.style.color = mix(c.base, c.target, eased);
          c.el.style.transform = eased > 0.01 ? `translateY(${(-eased * 0.09).toFixed(3)}em) scale(${(1 + eased * 0.05).toFixed(3)})` : "";
        }
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      for (const c of chars) {
        c.el.style.color = "";
        c.el.style.transform = "";
      }
    };
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(raf);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div ref={wrap} className="lens-wrap">
      <h1 className="q-title" style={style}>
        {children}
      </h1>
    </div>
  );
}
