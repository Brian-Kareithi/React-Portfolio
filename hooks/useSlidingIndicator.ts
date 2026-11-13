"use client";

import { useEffect, useRef } from "react";

const ACTIVE = '[aria-pressed="true"], [aria-selected="true"], [data-active="true"]';

/**
 * Slides a CSS-drawn indicator (the container's ::before, see `[data-indicator]` in sections.css)
 * onto whichever child is active, so switching tabs glides instead of jumping. It watches the
 * active attributes itself, so the component only needs to attach the ref.
 */
export function useSlidingIndicator<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const place = () => {
      const active = el.querySelector<HTMLElement>(ACTIVE);
      if (!active || active.offsetWidth === 0) {
        el.style.setProperty("--ti-o", "0");
        return;
      }
      const ready = el.hasAttribute("data-indicator-ready");
      el.style.setProperty("--ti-x", `${active.offsetLeft}px`);
      el.style.setProperty("--ti-y", `${active.offsetTop}px`);
      el.style.setProperty("--ti-w", `${active.offsetWidth}px`);
      el.style.setProperty("--ti-h", `${active.offsetHeight}px`);
      el.style.setProperty("--ti-o", "1");
      // Turn transitions on only after the first placement, so the indicator never flies in on load.
      if (!ready) requestAnimationFrame(() => el.setAttribute("data-indicator-ready", ""));

      // In rows that scroll sideways on small screens, bring the active tab into view.
      if (el.scrollWidth > el.clientWidth + 1) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollTo({ left: active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2, behavior: ready && !reduce ? "smooth" : "auto" });
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };

    place();
    const mutations = new MutationObserver(schedule);
    mutations.observe(el, { subtree: true, attributes: true, attributeFilter: ["aria-pressed", "aria-selected", "data-active"] });
    const resizes = new ResizeObserver(schedule);
    resizes.observe(el);
    for (const child of Array.from(el.children)) resizes.observe(child);
    document.fonts?.ready.then(schedule).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      resizes.disconnect();
    };
  }, []);

  return ref;
}
