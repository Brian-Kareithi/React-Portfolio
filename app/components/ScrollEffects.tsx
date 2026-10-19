"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { tick } from "@/app/lib/sound";

export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let cancelled = false;
    const splits: SplitText[] = [];
    const triggers: ScrollTrigger[] = [];

    document.fonts.ready.then(() => {
      if (cancelled) return;
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
        splits.push(split);
      });
    });

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let el: HTMLElement | null = null;
    let qx: ((v: number) => void) | null = null;
    let qy: ((v: number) => void) | null = null;

    const release = () => {
      qx?.(0);
      qy?.(0);
      el = null;
    };
    const onMove = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest<HTMLElement>(".btn-neon-primary");
      if (t !== el) {
        release();
        if (t) {
          el = t;
          qx = gsap.quickTo(t, "x", { duration: 0.4, ease: "power3.out" });
          qy = gsap.quickTo(t, "y", { duration: 0.4, ease: "power3.out" });
        }
      }
      if (!el || !qx || !qy) return;
      const r = el.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.18);
      qy((e.clientY - (r.top + r.height / 2)) * 0.28);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest(".btn-neon")) tick();
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
