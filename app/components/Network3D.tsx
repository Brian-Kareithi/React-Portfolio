"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Environment, Lightformer, Text } from "@react-three/drei";
import { BallCollider, Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { easing } from "maath";
import * as THREE from "three";
import { homelabDevices, labMachines, type Device, type DeviceStatus } from "@/app/lib/homelab";

const BERRY = "#6b1a2e";
const CREAM = "#f2f4f3";
const INK = "#0a0908";
const DOWN = "#2a2522";
// Click the map to cycle the accent shared by every third device.
const ACCENTS = [BERRY, "#a9927d", "#5e503f"];

const STATUS_TEXT: Record<DeviceStatus, string> = {
  healthy: "Healthy",
  running: "Running",
  down: "Down",
  unknown: "",
};

function Pointer() {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0));
  });
  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

interface SphereProps {
  label: string;
  color: string;
  radius?: number;
  active?: boolean;
  onHover?: (on: boolean) => void;
}

function Sphere({ label, color, radius = 1, active, onHover }: SphereProps) {
  const api = useRef<RapierRigidBody>(null);
  const mesh = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);
  const start = useMemo<[number, number, number]>(() => {
    const r = THREE.MathUtils.randFloatSpread;
    return [r(10), r(10), r(10)];
  }, []);
  const dark = color === BERRY || color === DOWN || color === "#5e503f";

  useFrame((_, delta) => {
    delta = Math.min(0.1, delta);
    // Pull every sphere back toward the centre so the cluster reforms after a push.
    const body = api.current;
    if (body) body.applyImpulse(vec.copy(body.translation()).negate().multiplyScalar(0.25 * radius ** 2), true);
    if (mesh.current) easing.dampC(mesh.current.material.color, active ? CREAM : color, 0.2, delta);
  });

  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={start} ref={api} colliders={false}>
      <BallCollider args={[radius]} />
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover?.(true);
        }}
        onPointerOut={() => onHover?.(false)}
      >
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial metalness={0.5} roughness={0.2} />
      </mesh>
      <Billboard>
        <Text position={[0, 0, radius + 0.02]} fontSize={0.24 * radius} maxWidth={radius * 1.7} textAlign="center" anchorX="center" anchorY="middle" color={dark && !active ? CREAM : INK}>
          {label}
        </Text>
      </Billboard>
    </RigidBody>
  );
}

function Scene({ devices, accent, live, onActive }: { devices: Device[]; accent: string; live: boolean; onActive: (i: number | null) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const set = (i: number | null) => {
    setHover(i);
    onActive(i);
  };
  const colorFor = (d: Device, i: number) => (d.status === "down" ? DOWN : i % 3 === 0 ? accent : i % 3 === 1 ? CREAM : "#a9927d");

  return (
    <>
      <ambientLight intensity={1.5} />
      <Physics timeStep="vary" gravity={[0, 0, 0]} paused={!live}>
        <Pointer />
        <Sphere label="dreezy0" color={BERRY} radius={1.5} active={hover === -1} onHover={(on) => set(on ? -1 : null)} />
        {devices.map((d, i) => {
          const machine = i < labMachines.length;
          return (
            <Sphere key={d.name} label={d.name} color={machine ? CREAM : colorFor(d, i)} radius={machine ? 1.05 : 0.75} active={hover === i} onHover={(on) => set(on ? i : null)} />
          );
        })}
      </Physics>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          <Lightformer form="ring" color={BERRY} intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
        </group>
      </Environment>
    </>
  );
}

export default function Network3D({ devices = homelabDevices }: { devices?: Device[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [accentIndex, nextAccent] = useReducer((n: number) => (n + 1) % ACCENTS.length, 0);
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

  const all = useMemo(() => [...labMachines, ...devices], [devices]);
  const current = active === -1 ? { name: "dreezy0", note: "HP Tower Server. Runs every service here in Docker, 24/7.", status: "running" as DeviceStatus } : active === null ? null : all[active];

  return (
    <div className="net">
      <div ref={box} className="net-3d" data-cursor="orbit" role="img" aria-label={`Interactive map of the homelab: dreezy0, ${labMachines.length} machines and ${devices.length} services. Move the cursor to push them, hover one to see what it runs.`}>
        <Canvas frameloop={live ? "always" : "never"} onClick={nextAccent} camera={{ position: [0, 0, 30], fov: 17.5 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "low-power" }}>
          <Scene devices={all} accent={ACCENTS[accentIndex]} live={live} onActive={setActive} />
        </Canvas>
      </div>
      <p className="net-readout" aria-live="polite">
        {current ? (
          <><strong>{current.name}</strong> {current.note} {STATUS_TEXT[current.status] && <span>· {STATUS_TEXT[current.status]}</span>}</>
        ) : (
          <>Move through the cluster to push it around. Hover a sphere to see what it runs. <span>Click to change the accent.</span></>
        )}
      </p>
    </div>
  );
}
