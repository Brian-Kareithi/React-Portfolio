"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion } from "@/lib/media";

/** Masks every `[data-split]` heading below the fold and slides its lines up as it scrolls into view. */
export function HeadingReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let cancelled = false;
    const splits: SplitText[] = [];

    document.fonts.ready.then(() => {
      if (cancelled) return;
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        splits.push(
          SplitText.create(el, {
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
          }),
        );
      });
    });

    return () => {
      cancelled = true;
      splits.forEach((split) => split.revert());
    };
  }, [pathname]);

  return null;
}
