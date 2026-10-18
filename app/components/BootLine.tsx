"use client";

import { useEffect, useRef, useState } from "react";
import { BOOT_KEY as KEY } from "@/app/lib/boot";

/** First-visit animation. Any key or click skips it. */
export default function BootLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute("data-boot")) return;

    try {
      localStorage.setItem(KEY, "1");
    } catch {}

    let disposed = false;
    let completed = false;
    let animation: import("lottie-web").AnimationItem | undefined;

    const done = () => {
      if (completed) return;
      completed = true;
      html.removeAttribute("data-boot");
      animation?.destroy();
    };

    const timer = window.setTimeout(done, 2800);
    window.addEventListener("keydown", done, { once: true });
    window.addEventListener("pointerdown", done, { once: true });

    const loadAnimation = async () => {
      try {
        const [response, lottie] = await Promise.all([
          fetch("/boot-animation"),
          import("lottie-web"),
        ]);
        if (!response.ok) throw new Error("Could not load boot animation");
        const animationData = await response.json();
        if (disposed || completed || !containerRef.current) return;

        animation = lottie.default.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData,
        });
        setAnimationReady(true);
      } catch {
        // Keep the short name fallback visible if the animation cannot load.
      }
    };

    void loadAnimation();

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", done);
      window.removeEventListener("pointerdown", done);
      animation?.destroy();
    };
  }, []);

  return (
    <div className="boot" aria-hidden="true">
      <div className="boot-content">
        <div ref={containerRef} className="boot-animation" />
        {!animationReady && <span className="boot-fallback">Brian Kareithi</span>}
      </div>
    </div>
  );
}
