"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, MeshReflectorMaterial, RoundedBox, useCursor, useTexture } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import type { CaseStudy } from "@/data/projects";

const INK = "#0a0908";
const BERRY = "#6b1a2e";
const TAUPE = "#a9927d";
const CREAM = "#f2f4f3";

/** Anodised finishes taken from the site palette, cycled across the laptops. */
const FINISHES = [
  { body: "#b9a48f", logo: BERRY }, // champagne (taupe)
  { body: "#5a1626", logo: TAUPE }, // berry
  { body: "#3b332b", logo: TAUPE }, // espresso (umber)
];

/** Distance between laptops on the shelf. */
const SPACING = 3.9;
/** Lid angles in radians: leaning back when open, resting on the keyboard when shut. */
const LID_OPEN = -0.3;
const LID_SHUT = Math.PI / 2 - 0.035;
/** 16:10 panel, matching the 1440x900 screenshots. */
const SCREEN_W = 2.78;
const SCREEN_H = SCREEN_W / 1.6;

interface ShowcaseProps {
  studies: CaseStudy[];
  active: number;
  /** Live drag offset in steps, so the shelf follows the finger before it snaps. */
  pull: number;
  onSelect: (index: number) => void;
  onOpen: () => void;
}

function cssFont(variable: string, fallback: string) {
  const family = getComputedStyle(document.body).getPropertyValue(variable).trim();
  return family ? `${family}, ${fallback}` : fallback;
}

function canvasTexture(width: number, height: number, draw: (g: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d")!);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** A title screen for projects without a screenshot, drawn in the site's type and colours. */
function coverTexture(study: CaseStudy) {
  return canvasTexture(1440, 900, (g) => {
    const bg = g.createLinearGradient(0, 0, 1440, 900);
    bg.addColorStop(0, "#14100e");
    bg.addColorStop(1, BERRY);
    g.fillStyle = bg;
    g.fillRect(0, 0, 1440, 900);
    const glow = g.createRadialGradient(1180, 140, 0, 1180, 140, 760);
    glow.addColorStop(0, "rgb(169 146 125 / 0.38)");
    glow.addColorStop(1, "rgb(169 146 125 / 0)");
    g.fillStyle = glow;
    g.fillRect(0, 0, 1440, 900);

    const mono = cssFont("--font-jetbrains-mono", "monospace");
    const serif = cssFont("--font-instrument-serif", "Georgia, serif");
    const sans = cssFont("--font-dm-sans", "sans-serif");

    g.fillStyle = TAUPE;
    g.font = `500 30px ${mono}`;
    g.fillText(`~/projects/${study.index}`, 110, 160);

    let size = 150;
    g.font = `400 ${size}px ${serif}`;
    while (g.measureText(study.title).width > 1220 && size > 70) {
      size -= 6;
      g.font = `400 ${size}px ${serif}`;
    }
    g.fillStyle = CREAM;
    g.fillText(study.title, 104, 470);

    g.fillStyle = "rgb(242 244 243 / 0.75)";
    g.font = `400 40px ${sans}`;
    g.fillText(study.tagline, 110, 560);

    g.font = `400 26px ${mono}`;
    let x = 110;
    for (const tool of study.stack.slice(0, 4)) {
      const w = g.measureText(tool).width + 44;
      g.strokeStyle = "rgb(242 244 243 / 0.3)";
      g.lineWidth = 2;
      g.beginPath();
      g.roundRect(x, 680, w, 56, 28);
      g.stroke();
      g.fillStyle = "rgb(242 244 243 / 0.85)";
      g.fillText(tool, x + 22, 717);
      x += w + 14;
    }
  });
}

/** Keycaps for the deck, drawn once and shared by every laptop. */
function keyboardTexture() {
  return canvasTexture(1024, 380, (g) => {
    g.fillStyle = "#0b0909";
    g.fillRect(0, 0, 1024, 380);
    const pad = 14;
    const gap = 8;
    const rows = 6;
    const keyH = (380 - pad * 2 - gap * (rows - 1)) / rows;
    g.fillStyle = "#1d1917";
    for (let r = 0; r < rows; r++) {
      const y = pad + r * (keyH + gap);
      if (r === rows - 1) {
        // Modifiers either side of a long space bar.
        const unit = (1024 - pad * 2 - gap * 8) / 14;
        const widths = [1, 1, 1.4, 5.8, 1.4, 1, 1, 1, 1.4];
        let x = pad;
        for (const w of widths) {
          g.beginPath();
          g.roundRect(x, y, unit * w, keyH, 6);
          g.fill();
          x += unit * w + gap;
        }
        continue;
      }
      const count = r === 0 ? 14 : 13 - (r > 2 ? 1 : 0);
      const keyW = (1024 - pad * 2 - gap * (count - 1)) / count;
      for (let k = 0; k < count; k++) {
        g.beginPath();
        g.roundRect(pad + k * (keyW + gap), y, keyW, r === 0 ? keyH * 0.7 : keyH, 6);
        g.fill();
      }
    }
  });
}

/** Soft berry light behind the shelf, so the room isn't a flat black box. */
function glowTexture() {
  return canvasTexture(512, 512, (g) => {
    const r = g.createRadialGradient(256, 256, 0, 256, 256, 256);
    r.addColorStop(0, "rgb(107 26 46 / 0.75)");
    r.addColorStop(0.45, "rgb(94 80 63 / 0.25)");
    r.addColorStop(1, "rgb(10 9 8 / 0)");
    g.fillStyle = r;
    g.fillRect(0, 0, 512, 512);
  });
}

interface LaptopProps {
  pos: number;
  screen: THREE.Texture;
  keyboard: THREE.Texture;
  finish: (typeof FINISHES)[number];
  onPick: (e: ThreeEvent<MouseEvent>) => void;
}

/** One laptop. Its place on the shelf, its turn and its lid all ease toward where `pos` says they should be. */
function Laptop({ pos, screen, keyboard, finish, onPick }: LaptopProps) {
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const panel = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, dt) => {
    const g = root.current;
    const l = lid.current;
    if (!g || !l) return;
    const dist = Math.abs(pos);
    g.visible = dist < 3.2;
    if (!g.visible) return;

    easing.damp3(g.position, [pos * SPACING, 0, -Math.min(dist, 3) * 1.5], 0.3, dt);
    easing.dampE(g.rotation, [0, -THREE.MathUtils.clamp(pos, -2, 2) * 0.38, 0], 0.3, dt);
    const s = dist < 0.5 ? 1 : 0.9;
    easing.damp3(g.scale, [s, s, s], 0.3, dt);

    // Open when in front, shut when off to the side; hovering a shut one lifts the lid a little.
    const shut = THREE.MathUtils.clamp((dist - 0.35) / 0.65, 0, 1);
    const peek = hovered && dist > 0.5 ? 0.38 : 0;
    easing.damp(l.rotation, "x", THREE.MathUtils.lerp(LID_OPEN, LID_SHUT, shut) - peek, 0.36, dt);

    // The panel powers up as the lid opens.
    const open = 1 - THREE.MathUtils.clamp((l.rotation.x - LID_OPEN) / (LID_SHUT - LID_OPEN), 0, 1);
    panel.current?.color.setScalar(0.06 + open * 0.94);
  });

  return (
    <group
      ref={root}
      onClick={onPick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base */}
      <RoundedBox args={[3, 0.1, 2.06]} radius={0.045} smoothness={4} position={[0, 0.05, 0]}>
        <meshStandardMaterial color={finish.body} metalness={0.85} roughness={0.32} />
      </RoundedBox>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.1005, -0.3]}>
        <planeGeometry args={[2.62, 0.97]} />
        <meshStandardMaterial map={keyboard} roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.1005, 0.55]}>
        <planeGeometry args={[1.15, 0.7]} />
        <meshStandardMaterial color={finish.body} metalness={0.7} roughness={0.16} />
      </mesh>

      {/* Lid, hinged at the back edge of the base */}
      <group ref={lid} position={[0, 0.1, -1]} rotation-x={LID_SHUT}>
        <RoundedBox args={[3, 2.02, 0.055]} radius={0.04} smoothness={4} position={[0, 1.01, -0.0275]}>
          <meshStandardMaterial color={finish.body} metalness={0.85} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 1.01, 0.001]}>
          <planeGeometry args={[2.94, 1.96]} />
          <meshStandardMaterial color="#050404" roughness={0.2} metalness={0.3} />
        </mesh>
        <mesh position={[0, 1.06, 0.002]}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          <meshBasicMaterial ref={panel} map={screen} toneMapped={false} />
        </mesh>
        {/* Glass: catches the studio lights over the screen */}
        <mesh position={[0, 1.01, 0.004]}>
          <planeGeometry args={[2.94, 1.96]} />
          <meshStandardMaterial color="#000000" roughness={0.04} metalness={1} transparent opacity={0.14} depthWrite={false} />
        </mesh>
        {/* Mark on the back of the lid */}
        <mesh position={[0, 1.05, -0.056]} rotation-y={Math.PI}>
          <circleGeometry args={[0.13, 48]} />
          <meshStandardMaterial color={finish.logo} metalness={1} roughness={0.12} />
        </mesh>
      </group>
    </group>
  );
}

/** Slow camera drift toward the pointer; pulls back on narrow screens so the open laptop fits. */
function CameraRig() {
  const { size } = useThree();
  const narrow = size.width / size.height < 1.3;
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, [state.pointer.x * 0.7, 2.1 + state.pointer.y * 0.3, narrow ? 11.5 : 8.6], 0.6, dt);
    state.camera.lookAt(0, 0.9, 0);
  });
  return null;
}

function Showroom({ studies, active, pull, onSelect, onOpen }: ShowcaseProps) {
  const shots = useMemo(() => studies.flatMap((s) => (s.screenshot ? [s.screenshot.src] : [])), [studies]);
  const loaded = useTexture(shots, (textures) => {
    for (const t of Array.isArray(textures) ? textures : [textures]) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    }
  });
  const keyboard = useMemo(() => keyboardTexture(), []);
  const glow = useMemo(() => glowTexture(), []);
  const screens = useMemo(() => {
    const list = Array.isArray(loaded) ? loaded : [loaded];
    return studies.map((s) => (s.screenshot ? list[shots.indexOf(s.screenshot.src)] : coverTexture(s)));
  }, [loaded, shots, studies]);

  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 6, 5]} intensity={1.3} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color={CREAM} position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={4} color={BERRY} position={[-7, 2, 1]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2} color={TAUPE} position={[7, 2, 1]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={2} color={CREAM} position={[0, 3, 9]} scale={3} />
      </Environment>

      <mesh position={[0, 3, -9]}>
        <planeGeometry args={[30, 16]} />
        <meshBasicMaterial map={glow} transparent depthWrite={false} fog={false} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {studies.map((study, i) => (
        <Laptop
          key={study.id}
          pos={i - active + pull}
          screen={screens[i]}
          keyboard={keyboard}
          finish={FINISHES[i % FINISHES.length]}
          onPick={(e) => {
            e.stopPropagation();
            if (e.delta > 6) return;
            if (i === active) onOpen();
            else onSelect(i);
          }}
        />
      ))}

      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[60, 30]} />
        <MeshReflectorMaterial
          blur={[400, 120]}
          resolution={1024}
          mixBlur={1}
          mixStrength={16}
          roughness={0.9}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.3}
          color="#100c0b"
          metalness={0.6}
          mirror={0}
        />
      </mesh>
      <ContactShadows position={[0, 0.002, 0]} scale={30} far={2.5} blur={2.2} opacity={0.7} resolution={512} />
    </>
  );
}

/** The case studies as laptops on a reflective shelf. The front one opens to show the project; the rest stay shut. */
export function ProjectShowcase3D(props: ShowcaseProps) {
  const box = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="pc-3d">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 2.1, 8.6], fov: 30 }}
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[INK]} />
        <fog attach="fog" args={[INK, 9, 20]} />
        <Suspense fallback={null}>
          <Showroom {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
