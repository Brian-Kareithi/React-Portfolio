"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { nodes } from "@/app/components/NetworkMap";

const BERRY = "#49111c";
const PINK = "#a9927d";
const CREAM = "#f2f4f3";

function layout() {
  return nodes.map((_, i) => {
    const a = (i / nodes.length) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * 3.1, ((i % 3) - 1) * 1.3, Math.sin(a) * 3.1);
  });
}

function Packet({ to, offset, speed }: { to: THREE.Vector3; offset: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * speed + offset) % 1;
    ref.current?.position.set(to.x * t, to.y * t, to.z * t);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color={PINK} />
    </mesh>
  );
}

function Scene({ onActive }: { onActive: (i: number | null) => void }) {
  const points = useMemo(() => layout(), []);
  const [hover, setHover] = useState<number | null>(null);
  const set = (i: number | null) => {
    setHover(i);
    onActive(i);
  };
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 4, 4]} intensity={30} />
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={BERRY} emissive={BERRY} emissiveIntensity={0.6} />
      </mesh>
      <Text position={[0, -0.85, 0]} fontSize={0.22} color={CREAM} anchorX="center">
        Proxmox
      </Text>
      {points.map((p, i) => (
        <group key={nodes[i].id}>
          <Line points={[[0, 0, 0], p.toArray()]} color={hover === i ? BERRY : "#6b5a60"} lineWidth={hover === i ? 2.5 : 1} />
          <Packet to={p} offset={i * 0.17} speed={0.25 + (i % 3) * 0.08} />
          <mesh
            position={p}
            onPointerOver={(e) => {
              e.stopPropagation();
              set(i);
            }}
            onPointerOut={() => set(null)}
            scale={hover === i ? 1.35 : 1}
          >
            <sphereGeometry args={[0.28, 24, 24]} />
            <meshStandardMaterial color={hover === i ? PINK : CREAM} emissive={hover === i ? BERRY : "#000000"} emissiveIntensity={0.7} />
          </mesh>
          <Text position={[p.x, p.y - 0.5, p.z]} fontSize={0.2} color={CREAM} anchorX="center">
            {nodes[i].label}
          </Text>
        </group>
      ))}
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} minPolarAngle={0.6} maxPolarAngle={2.4} />
    </>
  );
}

export default function Network3D() {
  const [active, setActive] = useState<number | null>(null);
  const [live, setLive] = useState(true);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = box.current?.closest<HTMLElement>(".journey-panel");
    if (!panel) return;
    const sync = () => setLive(panel.dataset.active !== undefined || !panel.closest("[data-pinned]"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(panel, { attributes: true, attributeFilter: ["data-active"] });
    return () => mo.disconnect();
  }, []);

  return (
    <div className="net">
      <div ref={box} className="net-3d" data-cursor="orbit" role="img" aria-label="3D map of the homelab. Drag to orbit, hover a node to see what it runs.">
        <Canvas frameloop={live ? "always" : "never"} camera={{ position: [0, 2.4, 6.2], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "low-power" }}>
          <Scene onActive={setActive} />
        </Canvas>
      </div>
      <p className="net-readout" aria-live="polite">
        {active === null ? (
          <>Drag to orbit. Hover a node to see what it runs. <span>19 devices in the full inventory.</span></>
        ) : (
          <><strong>{nodes[active].label}</strong> {nodes[active].runs}</>
        )}
      </p>
    </div>
  );
}
