"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import NetworkMap from "@/app/components/NetworkMap";
import type { Device } from "@/app/lib/homelab";

// Same footprint as the 3D map, so nothing jumps or flashes the flat diagram while it loads.
function MapPlaceholder() {
  return (
    <div className="net" aria-hidden="true">
      <div className="net-3d net-loading" />
      <p className="net-readout"><span>Loading the map…</span></p>
    </div>
  );
}

const Network3D = dynamic(() => import("@/app/components/Network3D"), { ssr: false, loading: MapPlaceholder });

// Phones get the 3D map too; only reduced motion, data saver, low-end hardware
// and missing WebGL fall back to the flat diagram.
function canRender3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 3 || (nav.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function NetworkSwitch({ devices }: { devices?: Device[] }) {
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
      ([e]) => {
        if (!e.isIntersecting) return;
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
      {mode === "3d" ? <Network3D devices={devices} /> : mode === "flat" ? <NetworkMap /> : <MapPlaceholder />}
    </div>
  );
}
