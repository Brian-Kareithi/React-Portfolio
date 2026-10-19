"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

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

export default function LensHeading({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const heading = root.querySelector<HTMLElement>("h1");
    if (!heading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!root.dataset.ready) {
      root.dataset.ready = "true";
      const label = heading.textContent ?? "";
      splitChars(heading);
      heading.setAttribute("aria-label", label);
      heading.querySelectorAll(".lh-word").forEach((w) => w.setAttribute("aria-hidden", "true"));
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const clone = heading.cloneNode(true) as HTMLElement;
        clone.removeAttribute("id");
        clone.removeAttribute("aria-label");
        clone.setAttribute("aria-hidden", "true");
        clone.classList.add("lens-clone");
        root.appendChild(clone);
      }
    }

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const zone = root.closest<HTMLElement>("header") ?? root;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const b = root.getBoundingClientRect();
        root.style.setProperty("--lx", `${e.clientX - b.left}px`);
        root.style.setProperty("--ly", `${e.clientY - b.top}px`);
        const inside = e.clientX >= b.left - 40 && e.clientX <= b.right + 40 && e.clientY >= b.top - 40 && e.clientY <= b.bottom + 40;
        root.dataset.on = inside ? "true" : "false";
      });
    };
    const onLeave = () => {
      root.dataset.on = "false";
    };
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrap} className="lens-wrap" data-on="false">
      <h1 className="q-title" style={style}>
        {children}
      </h1>
    </div>
  );
}
