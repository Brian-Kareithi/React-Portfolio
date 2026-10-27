"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import NetworkMap from "@/app/components/NetworkMap";
import type { Device } from "@/app/lib/homelab";

const Network3D = dynamic(() => import("@/app/components/Network3D"), { ssr: false, loading: () => <NetworkMap /> });

function canRender3D() {
  if (!window.matchMedia("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)").matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 4 || (nav.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function NetworkSwitch({ devices }: { devices?: Device[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || !canRender3D()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setUse3D(true);
        io.disconnect();
      },
      { rootMargin: "800px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={box}>{use3D ? <Network3D devices={devices} /> : <NetworkMap />}</div>;
}
