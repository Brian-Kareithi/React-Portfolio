"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { Points as ThreePoints } from "three";

function Stars({ count = 5000, radius = 1.5, ...props }: { count?: number; radius?: number }) {
  const ref = useRef<ThreePoints>(null);
  const motion = useRef({ baseX: 0, baseY: 0 });

  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count * 3), { radius }) as Float32Array;
    return [positions];
  }, [count, radius]);

  // The starfield drifts steadily on its own, streaming without any input.
  useFrame((_, delta) => {
    const points = ref.current;
    if (!points) return;
    const dt = Math.min(delta, 1 / 30);
    const m = motion.current;

    m.baseX -= dt / 10;
    m.baseY -= dt / 15;

    points.rotation.x = m.baseX;
    points.rotation.y = m.baseY;
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
