"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const PHRASE = "WELCOME TO MY PORTFOLIO";

function formatTimestamp(date: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(date.getMonth() + 1)}/${p(date.getDate())}/${date.getFullYear()} ${p(
    date.getHours()
  )}:${p(date.getMinutes())}:${p(date.getSeconds())}`;
}

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [timestamp, setTimestamp] = useState(() => formatTimestamp(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTimestamp(formatTimestamp(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.body.style.overflow = "hidden";

    const letters = Array.from(root.querySelectorAll<HTMLSpanElement>(".loading-word span"));
    const nameEl = root.querySelector<HTMLElement>(".loading-text");
    const progressEl = root.querySelector<HTMLElement>(".loading-progress-fill");

    const finish = () => {
      document.body.style.overflow = "";
      onFinish();
    };

    const timeline = gsap.timeline();
    const stagger = 0.05;

    letters.forEach((el, i) => {
      const start = i * stagger;
      timeline
        .to(el, { opacity: 1, duration: 0.12, ease: "power1.out" }, start)
        .to(el, { color: "#ffffff", duration: 0.14, ease: "none" }, start + 0.04)
        .to(
          el,
          { color: "rgba(255,255,255,0.14)", duration: 0.14, ease: "none" },
          start + 0.18
        )
        .call(() => el.classList.add("glowing"), [], start + 0.22);
    });

    if (progressEl) {
      timeline.fromTo(
        progressEl,
        { width: "0%" },
        { width: "100%", duration: 1.6, ease: "power2.inOut" },
        0
      );
    }

    const lastStart = (letters.length - 1) * stagger + 0.22;
    timeline
      .call(() => nameEl?.classList.add("glitching"), [], lastStart + 0.05)
      .call(
        () => {
          nameEl?.classList.remove("glitching");
          gsap.to(root, {
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: finish,
          });
        },
        [],
        lastStart + 1.05
      );

    return () => {
      timeline.kill();
      gsap.killTweensOf(root);
      nameEl?.classList.remove("glitching");
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  return (
    <div id="loading" ref={rootRef}>
      <div className="loading-jitter">
        <div className="loading-hud-top" aria-hidden="true">
          <span className="loading-timestamp" suppressHydrationWarning>{timestamp}</span>
          <span className="loading-rec">
            <span className="loading-rec-dot" />
            REC
          </span>
        </div>

        <div className="loading-text" id="name-loader" data-text={PHRASE}>
          {PHRASE.split(" ").map((word, wi) => (
            <span key={wi} className="loading-word">
              {word.split("").map((ch, ci) => (
                <span key={ci} data-text={ch}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </div>

        <div className="loading-status" aria-hidden="true">
          <span>ESTABLISHING SECURE LINK</span>
          <span className="loading-cursor">▮</span>
        </div>

        <div className="loading-progress" aria-hidden="true">
          <div className="loading-progress-fill" />
        </div>

        <div className="loading-hud-bottom" aria-hidden="true">
          <span>UNIT: K-01 &mdash; CAM 04</span>
          <span>LOC: -1.2867, 36.8172</span>
        </div>
      </div>

      <div className="loading-scanlines" aria-hidden="true" />
      <div className="loading-grain" aria-hidden="true" />
      <div className="loading-vignette" aria-hidden="true" />
    </div>
  );
}
