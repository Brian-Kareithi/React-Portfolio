"use client";

import { useEffect } from "react";
import { BOOT_KEY } from "@/lib/boot";

/** When the boot card starts fading (matches boot-out's delay in globals.css). */
const BOOT_OUT_AT = 1900;
const FLIGHT_MS = 620;
/** Strong ease-in-out for the horizontal leg; the vertical leg eases out so the path bows into an arc. */
const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * The signature hand-off: the berry period after the name on the boot card lifts off and lands
 * as the period of the header wordmark, so the mark visitors meet first is the one that stays.
 * A copy flies between the two measured positions; the real header dot is hidden until it lands.
 */
function flyPeriod() {
  const from = document.querySelector<HTMLElement>(".boot-dot");
  const to = document.querySelector<HTMLElement>(".q-wordmark i");
  if (!from || !to || typeof to.animate !== "function") return;
  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  if (!a.width || !b.width || b.bottom < 0 || b.top > window.innerHeight) return;

  const fromStyle = getComputedStyle(from);
  const toStyle = getComputedStyle(to);
  const scale = parseFloat(toStyle.fontSize) / parseFloat(fromStyle.fontSize);

  // Three nested layers, one job each: x eases in-out and y eases out, so the path bows into an
  // arc; scale follows x, so the dot stays big for the first half of the trip instead of shrinking at once.
  const outer = document.createElement("span");
  const mid = document.createElement("span");
  const inner = document.createElement("span");
  outer.setAttribute("aria-hidden", "true");
  outer.style.cssText = `position:fixed;left:${a.left}px;top:${a.top}px;z-index:250;pointer-events:none;`;
  mid.style.display = "block";
  // Copy the font longhands: the computed `font` shorthand is often empty and gets dropped.
  Object.assign(inner.style, {
    display: "block",
    fontFamily: fromStyle.fontFamily,
    fontSize: fromStyle.fontSize,
    fontWeight: fromStyle.fontWeight,
    fontStyle: fromStyle.fontStyle,
    lineHeight: `${a.height}px`,
    color: fromStyle.color,
    transformOrigin: "0 0",
  });
  inner.textContent = ".";
  mid.appendChild(inner);
  outer.appendChild(mid);
  document.body.appendChild(outer);

  // The boot dot pulses via a CSS animation, which would override an inline opacity.
  from.style.animation = "none";
  from.style.opacity = "0";
  to.style.opacity = "0";

  const opts = { duration: FLIGHT_MS, fill: "forwards" as const };
  outer.animate([{ transform: "translateX(0)" }, { transform: `translateX(${b.left - a.left}px)` }], { ...opts, easing: EASE_IN_OUT });
  mid.animate([{ transform: "translateY(0)" }, { transform: `translateY(${b.top - a.top + (b.height - a.height * scale) / 2}px)` }], {
    ...opts,
    easing: EASE_OUT,
  });
  const flight = inner.animate(
    [
      { transform: "scale(1)", color: fromStyle.color },
      { transform: `scale(${scale})`, color: toStyle.color },
    ],
    { ...opts, easing: EASE_IN_OUT },
  );

  flight.onfinish = () => {
    outer.remove();
    to.style.opacity = "";
    // Lands with a small squish from the baseline, like a drop settling.
    to.animate(
      [
        { transform: "scale(1.35, 0.7)", transformOrigin: "50% 85%" },
        { transform: "scale(0.92, 1.1)", transformOrigin: "50% 85%", offset: 0.45 },
        { transform: "none", transformOrigin: "50% 85%" },
      ],
      { duration: 360, easing: EASE_OUT },
    );
  };
}

/** First-visit intro card. Shown by the inline boot script, dismissed after a moment or on any input. */
export function BootScreen() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute("data-boot")) return;
    try {
      localStorage.setItem(BOOT_KEY, "1");
    } catch {}

    let flown = false;
    const fly = () => {
      if (flown) return;
      flown = true;
      flyPeriod();
    };

    let completed = false;
    const done = () => {
      if (completed) return;
      completed = true;
      fly();
      html.removeAttribute("data-boot");
    };

    const flightTimer = window.setTimeout(fly, BOOT_OUT_AT);
    const timer = window.setTimeout(done, 2100);
    window.addEventListener("keydown", done, { once: true });
    window.addEventListener("pointerdown", done, { once: true });

    return () => {
      window.clearTimeout(flightTimer);
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
