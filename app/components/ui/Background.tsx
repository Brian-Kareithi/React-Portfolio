"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { Points as ThreePoints } from "three";
import { useTheme } from "@/app/components/ThemeProvider";

function Stars({ count = 5000, radius = 1.5, ...props }: { count?: number; radius?: number }) {
  const ref = useRef<ThreePoints>(null);
  const { mouse } = useThree();

  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count * 3), { radius }) as Float32Array;
    return [positions];
  }, [count, radius]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      ref.current.rotation.x += mouse.x * 0.001;
      ref.current.rotation.y += mouse.y * 0.001;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function Background() {
  const { theme } = useTheme();

  if (theme === "light") return null;

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
        <ambientLight intensity={0.5} />
        <Stars />
        <Stars />
      </Canvas>
    </div>
  );
}
