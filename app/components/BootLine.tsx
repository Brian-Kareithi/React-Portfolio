"use client";

import { useEffect } from "react";
import { BOOT_KEY as KEY } from "@/app/lib/boot";

export default function BootLine() {
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

    const timer = window.setTimeout(done, 2100);
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
      <div className="boot-mark">
        <p className="boot-name">
          Brian Kareithi<span className="boot-dot">.</span>
        </p>
        <span className="boot-bar" />
        <p className="boot-caption">Nairobi · Full-stack developer</p>
      </div>
    </div>
  );
}
