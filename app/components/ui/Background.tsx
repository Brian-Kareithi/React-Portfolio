"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { Points as ThreePoints } from "three";

function Stars({ count = 5000, radius = 1.5, ...props }: { count?: number; radius?: number }) {
  const ref = useRef<ThreePoints>(null);
  const motion = useRef({ baseX: 0, baseY: 0, tiltX: 0, tiltY: 0 });
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count * 3), { radius }) as Float32Array;
    return [positions];
  }, [count, radius]);

  // The starfield is always drifting toward the viewer; the cursor only
  // slightly tilts that constant motion, so the stars stream steadily and
  // lean gently toward where the pointer is.
  useFrame((_, delta) => {
    const points = ref.current;
    if (!points) return;
    const dt = Math.min(delta, 1 / 30);
    const m = motion.current;

    m.baseX -= dt / 10;
    m.baseY -= dt / 15;

    const ease = 1 - Math.exp(-dt * 4);
    m.tiltX += (-pointer.current.y * 0.16 - m.tiltX) * ease;
    m.tiltY += (pointer.current.x * 0.2 - m.tiltY) * ease;

    points.rotation.x = m.baseX + m.tiltX;
    points.rotation.y = m.baseY + m.tiltY;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function Background() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Stars />
        <Stars />
      </Canvas>
    </div>
  );
}
