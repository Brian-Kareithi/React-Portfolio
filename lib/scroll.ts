import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/media";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Scrolls an element just below the fixed header, through Lenis when it is running. */
export function scrollToElement(el: HTMLElement, gap = 16) {
  const nav = document.querySelector(".q-nav")?.getBoundingClientRect().bottom ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - Math.max(nav, 0) - gap;
  if (lenis) lenis.scrollTo(top, { duration: 1.1 });
  else window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
