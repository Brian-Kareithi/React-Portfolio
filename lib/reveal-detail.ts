import { prefersReducedMotion } from "@/lib/media";

/**
 * On narrow screens a master-detail pane sits below its list, so after a selection the
 * detail can be off-screen. Bring it just into view; on wide screens it is already beside the list.
 */
export function revealDetail(el: HTMLElement | null) {
  if (!el || !window.matchMedia("(max-width: 959px)").matches) return;
  const r = el.getBoundingClientRect();
  if (r.top >= 64 && r.bottom <= window.innerHeight) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
}
