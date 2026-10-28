import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToElement(el: HTMLElement, gap = 16) {
  const nav = document.querySelector(".q-nav")?.getBoundingClientRect().bottom ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - Math.max(nav, 0) - gap;
  if (lenis) lenis.scrollTo(top, { duration: 1.1 });
  else window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
