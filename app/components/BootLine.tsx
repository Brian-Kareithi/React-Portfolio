"use client";

import { useEffect, useState } from "react";
import { BOOT_KEY as KEY } from "@/app/lib/boot";

const LINES = ["> initializing kareithi.sys...", "[ ok ] interface  [ ok ] network  [ ok ] security", "> ready"];
const TOTAL = LINES.join("").length;

export default function BootLine() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute("data-boot")) return;
    try {
      localStorage.setItem(KEY, "1");
    } catch {}

    let completed = false;
    const done = () => {
      if (completed) return;
      completed = true;
      html.removeAttribute("data-boot");
    };

    const type = window.setInterval(() => setCount((c) => Math.min(TOTAL, c + 2)), 28);
    const timer = window.setTimeout(done, 2100);
    window.addEventListener("keydown", done, { once: true });
    window.addEventListener("pointerdown", done, { once: true });

    return () => {
      window.clearInterval(type);
      window.clearTimeout(timer);
      window.removeEventListener("keydown", done);
      window.removeEventListener("pointerdown", done);
    };
  }, []);

  const starts = LINES.map((_, i) => LINES.slice(0, i).join("").length);
  return (
    <div className="boot" aria-hidden="true">
      <div className="boot-term">
        {LINES.map((line, i) => {
          const shown = line.slice(0, Math.max(0, count - starts[i]));
          return (
            <p key={i}>
              {shown}
              {shown.length > 0 && shown.length < line.length && <span className="boot-caret" />}
            </p>
          );
        })}
        <span className="boot-skip">press any key to skip</span>
      </div>
    </div>
  );
}
