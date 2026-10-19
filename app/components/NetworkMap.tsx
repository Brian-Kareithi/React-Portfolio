"use client";

import { useRef, useState } from "react";

export interface NodeDef {
  id: string;
  label: string;
  runs: string;
}

export const nodes: NodeDef[] = [
  { id: "dev", label: "HP 745 G7", runs: "Daily driver. VMs, Docker and dev servers side by side." },
  { id: "bench", label: "HP 820 G3", runs: "Test bench. Risky experiments run here, never on the main machine." },
  { id: "kali", label: "Kali tower", runs: "Kali Linux, dedicated to penetration testing practice." },
  { id: "displays", label: "Displays", runs: "Code and dashboards on one screen, logs and metrics on the other." },
  { id: "auto", label: "Home automation", runs: "Sensors and switches wired into the same network." },
  { id: "robot", label: "Robotics", runs: "Embedded boards and robotics builds, flashed and tested at the bench." },
  { id: "mobile", label: "Mobile & audio", runs: "Phones and test devices for React Native builds." },
];

const hub = { x: 280, y: 180 };
const initial = nodes.map((n, i) => {
  const a = (-90 + (360 / nodes.length) * i) * (Math.PI / 180);
  return { x: Math.round(hub.x + Math.cos(a) * 205), y: Math.round(hub.y + Math.sin(a) * 125) };
});

export default function NetworkMap() {
  const svg = useRef<SVGSVGElement>(null);
  const [pos, setPos] = useState(initial);
  const [active, setActive] = useState<number | null>(null);
  const drag = useRef<number | null>(null);

  const toSvg = (e: React.PointerEvent) => {
    const el = svg.current;
    const m = el?.getScreenCTM();
    if (!el || !m) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return { x: Math.max(40, Math.min(520, p.x)), y: Math.max(30, Math.min(330, p.y)) };
  };

  return (
    <div className="net">
      <svg
        ref={svg}
        viewBox="0 0 560 360"
        role="group"
        aria-label="Interactive map of the homelab. Each device is a focusable node."
        className="net-svg"
        data-cursor="drag"
        onPointerMove={(e) => {
          if (drag.current === null) return;
          const p = toSvg(e);
          if (p) setPos((prev) => prev.map((q, i) => (i === drag.current ? p : q)));
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        {pos.map((p, i) => (
          <g key={`l${i}`}>
            <line x1={hub.x} y1={hub.y} x2={p.x} y2={p.y} className="net-link" data-on={active === i || undefined} />
            <circle r="3.2" className="net-packet">
              <animateMotion
                dur={`${2.2 + (i % 3) * 0.6}s`}
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
                path={`M${hub.x},${hub.y} L${p.x},${p.y}`}
              />
            </circle>
          </g>
        ))}

        <g className="net-hub">
          <circle cx={hub.x} cy={hub.y} r="34" className="net-hub-ring" />
          <circle cx={hub.x} cy={hub.y} r="24" className="net-hub-core" />
          <text x={hub.x} y={hub.y + 4} textAnchor="middle" className="net-hub-text">PVE</text>
        </g>

        {nodes.map((n, i) => (
          <g
            key={n.id}
            role="button"
            tabIndex={0}
            aria-label={`${n.label}: ${n.runs}`}
            transform={`translate(${pos[i].x} ${pos[i].y})`}
            className="net-node"
            data-on={active === i || undefined}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onPointerDown={(e) => {
              (e.currentTarget as Element).setPointerCapture(e.pointerId);
              drag.current = i;
              setActive(i);
            }}
            onKeyDown={(e) => {
              const step = 14;
              const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
              if (!d) return;
              e.preventDefault();
              setPos((prev) =>
                prev.map((q, j) => (j === i ? { x: Math.max(40, Math.min(520, q.x + d[0])), y: Math.max(30, Math.min(330, q.y + d[1])) } : q)),
              );
            }}
          >
            <circle r="16" className="net-node-ring" />
            <circle r="7" className="net-node-core" />
            <text y="32" textAnchor="middle" className="net-node-label">{n.label}</text>
          </g>
        ))}
      </svg>

      <p className="net-readout" aria-live="polite">
        {active === null ? (
          <>Drag a node. Hover one to see what it runs. <span>19 devices in the full inventory.</span></>
        ) : (
          <><strong>{nodes[active].label}</strong> {nodes[active].runs}</>
        )}
      </p>
    </div>
  );
}
