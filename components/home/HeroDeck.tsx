"use client";

import type { CSSProperties } from "react";
import { AmbientVideo } from "@/components/ui/AmbientVideo";

const depth = (z: number) => ({ "--z": z }) as CSSProperties;

/** A looping reel beside the hero copy, in a glass frame that drifts with the pointer. */
export function HeroDeck() {
  return (
    <div className="hh-deck hh-deck-reel">
      <div className="hh-layer hh-reel" style={depth(0.8)}>
        <AmbientVideo src="/hero/brag-loop.mp4" className="hh-reel-video" />
      </div>
    </div>
  );
}
