"use client";
import { useEffect } from "react";

import { BOOT_KEY as KEY } from "@/app/lib/boot";

/** First-visit entry line. CSS types it and fades it out in about 1.4s; any key or click skips it. */
export default function BootLine() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute("data-boot")) return;
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    const done = () => html.removeAttribute("data-boot");
    const timer = window.setTimeout(done, 1450);
    window.addEventListener("keydown", done, { once: true });
    window.addEventListener("pointerdown", done, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", done);
      window.removeEventListener("pointerdown", done);
    };
  }, []);

  return (
    <div className="boot" aria-hidden="true">
      <p className="flex w-[34ch] max-w-[calc(100vw-2rem)] items-center gap-4 font-mono text-sm sm:text-base">
        <span className="boot-line" style={{ color: "var(--palette-cream)" }}>booting kareithi.dev…</span>
        <span className="boot-enter" style={{ color: "var(--palette-sand)" }}>
          [ enter <span className="boot-caret">_</span> ]
        </span>
      </p>
    </div>
  );
}
