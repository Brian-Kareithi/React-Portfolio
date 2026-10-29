"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundOn, setSound, tick } from "@/lib/sound";

/** Footer switch for the optional interface click sound. */
export function SoundToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(isSoundOn()));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <button
      type="button"
      className="sf-icon"
      aria-pressed={on}
      aria-label={on ? "Turn interface sounds off" : "Turn interface sounds on"}
      title={on ? "Sounds on" : "Sounds off"}
      onClick={() => {
        const next = !on;
        setSound(next);
        setOn(next);
        if (next) tick();
      }}
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
