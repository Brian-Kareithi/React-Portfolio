import type Lenis from "lenis";

// SmoothScroll registers its Lenis instance here so components can scroll through it.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

// Smooth-scroll so `el` sits just below the fixed navbar.
export function scrollToElement(el: HTMLElement, gap = 16) {
  const nav = document.querySelector(".q-nav")?.getBoundingClientRect().bottom ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - Math.max(nav, 0) - gap;
  if (lenis) lenis.scrollTo(top, { duration: 1.1 });
  else window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
