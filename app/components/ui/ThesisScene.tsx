"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const WORDS = ["I’m", "good", "at", "what", "I", "do."];

/** Where each word starts, in viewport units: [x vw, y vh, rotation deg]. */
const WORD_START: [number, number, number][] = [
  [-46, -22, -18],
  [38, -30, 14],
  [-30, 36, 22],
  [44, 26, -12],
  [-40, 8, 16],
  [34, 38, -20],
];

const PROOF: { text: string; from: [number, number, number] }[] = [
  { text: "6 industry certifications", from: [-55, 30, -10] },
  { text: "50+ projects delivered", from: [50, 36, 9] },
  { text: "3 years in tech", from: [-48, -10, 7] },
  { text: "19-device homelab, 24/7", from: [52, -6, -8] },
  { text: "Zero data lost", from: [-30, 44, 6] },
  { text: "Government security work", from: [34, 46, -7] },
];

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The page's one-line thesis. The section is tall and its content is sticky, so scrolling
 * scrubs the scene: the words scatter in from the edges and lock into the sentence, then the
 * proof flies in and docks underneath it. The progress is smoothed and handed to CSS as --t.
 */
export default function ThesisScene() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current = 0;
    let target = 0;
    let raf = 0;

    const measure = () => {
      const r = root.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      target = range > 0 ? clamp(-r.top / range) : 1;
    };
    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      root.style.setProperty("--t", current.toFixed(4));
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={rootRef} className="thesis" aria-labelledby="thesis-line">
      <div className="thesis-stick">
        <p className="field-label thesis-kicker">The short version</p>

        <h2 id="thesis-line" className="display-xl thesis-line" aria-label="I'm good at what I do.">
          {WORDS.map((word, i) => {
            const [x, y, r] = WORD_START[i];
            const style = {
              "--s": (i * 0.045).toFixed(3),
              "--l": "0.3",
              "--ax": `${x}vw`,
              "--ay": `${y}vh`,
              "--ar": `${r}deg`,
            } as CSSProperties;
            return (
              <span key={word} aria-hidden="true" className={`thesis-word ${word === "good" ? "font-serif-accent thesis-good" : ""}`} style={style}>
                {word}
              </span>
            );
          })}
        </h2>

        <p className="thesis-sub">Not a slogan. Here is what stands behind it.</p>

        <ul className="thesis-chips">
          {PROOF.map((item, i) => {
            const [x, y, r] = item.from;
            const style = {
              "--s": (0.5 + i * 0.05).toFixed(3),
              "--l": "0.2",
              "--ax": `${x}vw`,
              "--ay": `${y}vh`,
              "--ar": `${r}deg`,
            } as CSSProperties;
            return (
              <li key={item.text} className="thesis-chip" style={style}>
                {item.text}
              </li>
            );
          })}
        </ul>

        <span aria-hidden="true" className="thesis-progress" />
      </div>
    </section>
  );
}
