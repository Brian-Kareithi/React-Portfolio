"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { LoadingNote } from "@/components/homelab/LoadingNote";
import { NetworkMap2D } from "@/components/homelab/NetworkMap2D";
import type { Device } from "@/lib/homelab";
import { prefersReducedMotion } from "@/lib/media";

function MapPlaceholder() {
  return (
    <div className="net" aria-hidden="true">
      <div className="net-3d net-loading">
        <LoadingNote />
      </div>
      <p className="net-readout" />

    </div>
  );
}

const NetworkMap3D = dynamic(() => import("@/components/homelab/NetworkMap3D").then((m) => m.NetworkMap3D), {
  ssr: false,
  loading: MapPlaceholder,
});

/** WebGL on capable devices only: not on reduced motion, data saver, low memory or few cores. */
function canRender3D() {
  if (prefersReducedMotion()) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 3 || (nav.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** If the WebGL scene throws (context lost, WASM or font failure), fall back to the flat map instead of a blank panel. */
class MapBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <NetworkMap2D /> : this.props.children;
  }
}

/** The interactive homelab map: a 3D physics scene loaded near the viewport, or a flat SVG fallback. */
export function NetworkMap({ devices }: { devices?: Device[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "3d" | "flat">("pending");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (!canRender3D()) {
      const id = requestAnimationFrame(() => setMode("flat"));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMode("3d");
        io.disconnect();
      },
      { rootMargin: "800px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box}>
      {mode === "3d" ? (
        <MapBoundary>
          <NetworkMap3D devices={devices} />
        </MapBoundary>
      ) : mode === "flat" ? <NetworkMap2D /> : <MapPlaceholder />}
    </div>
  );
}
