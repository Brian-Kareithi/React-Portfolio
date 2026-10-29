"use client";

import { useMemo, useReducer, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Environment, Lightformer, Text } from "@react-three/drei";
import { BallCollider, Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { easing } from "maath";
import * as THREE from "three";
import { HUB_NAME, HUB_NOTE, homelabServices, labMachines } from "@/data/homelab";
import type { Device, DeviceStatus } from "@/lib/homelab";

const BERRY = "#6b1a2e";
const CREAM = "#f2f4f3";
const INK = "#0a0908";
const TAUPE = "#a9927d";
const UMBER = "#5e503f";
const DOWN = "#2a2522";
const ACCENTS = [BERRY, TAUPE, UMBER];

/** Index used for the hub sphere in hover state, since devices are indexed from 0. */
const HUB_INDEX = -1;

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
  const dark = color === BERRY || color === DOWN || color === UMBER;

  useFrame((_, delta) => {
    delta = Math.min(0.1, delta);
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

function Scene({ devices, accent, onActive }: { devices: Device[]; accent: string; onActive: (i: number | null) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const set = (i: number | null) => {
    setHover(i);
    onActive(i);
  };
  const colorFor = (d: Device, i: number) => (d.status === "down" ? DOWN : i % 3 === 0 ? accent : i % 3 === 1 ? CREAM : TAUPE);

  return (
    <>
      <ambientLight intensity={1.5} />
      <Physics timeStep="vary" gravity={[0, 0, 0]}>
        <Pointer />
        <Sphere label={HUB_NAME} color={BERRY} radius={1.5} active={hover === HUB_INDEX} onHover={(on) => set(on ? HUB_INDEX : null)} />
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

/** Physics cluster of the hub, lab machines and services. Push it with the pointer, click to cycle the accent. */
export function NetworkMap3D({ devices = homelabServices }: { devices?: Device[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [accentIndex, nextAccent] = useReducer((n: number) => (n + 1) % ACCENTS.length, 0);

  const all = useMemo(() => [...labMachines, ...devices], [devices]);
  const current: Device | null =
    active === HUB_INDEX ? { name: HUB_NAME, note: HUB_NOTE, status: "running" } : active === null ? null : all[active];

  return (
    <div className="net">
      <div
        className="net-3d"
        role="img"
        aria-label={`Interactive map of the homelab: ${HUB_NAME}, ${labMachines.length} machines and ${devices.length} services. Move the cursor to push them, hover one to see what it runs.`}
      >
        <Canvas onClick={nextAccent} camera={{ position: [0, 0, 30], fov: 17.5 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "low-power" }}>
          <Scene devices={all} accent={ACCENTS[accentIndex]} onActive={setActive} />
        </Canvas>
      </div>
      <p className="net-readout" aria-live="polite">
        {current ? (
          <>
            <strong>{current.name}</strong> {current.note} {STATUS_TEXT[current.status] && <span>· {STATUS_TEXT[current.status]}</span>}
          </>
        ) : (
          <>
            Push the cluster around. Hover or tap a sphere to see what it runs. <span>Click to change the accent.</span>
          </>
        )}
      </p>
    </div>
  );
}
