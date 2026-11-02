"use client";

import { useEffect, useState } from "react";

const LOADING_LINES = [
  "Waking up the physics engine…",
  "Inflating the spheres…",
  "Almost there. This part is worth the few seconds of wait.",
];

/** Rotating note shown while the physics engine and fonts load, so the wait reads as intentional. */
export function LoadingNote() {
  const [line, setLine] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLine((n) => Math.min(n + 1, LOADING_LINES.length - 1)), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="net-loading-note" role="status">
      {LOADING_LINES[line]}
    </p>
  );
}
