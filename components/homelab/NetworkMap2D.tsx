"use client";

import { useRef, useState, type PointerEvent } from "react";
import { HUB_NAME, networkNodes as nodes } from "@/data/homelab";

const VIEW = { width: 560, height: 360 };
const BOUNDS = { minX: 40, maxX: 520, minY: 30, maxY: 330 };
const KEY_STEP = 14;

const clampPoint = (x: number, y: number) => ({
  x: Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, x)),
  y: Math.max(BOUNDS.minY, Math.min(BOUNDS.maxY, y)),
});

const hub = { x: 280, y: 180 };
const initialPositions = nodes.map((n, i) => {
  const a = (-90 + (360 / nodes.length) * i) * (Math.PI / 180);
  return { x: Math.round(hub.x + Math.cos(a) * 205), y: Math.round(hub.y + Math.sin(a) * 125) };
});

/** Flat SVG version of the homelab map: draggable, keyboard-movable nodes around the dreezy0 hub. */
export function NetworkMap2D() {
  const svg = useRef<SVGSVGElement>(null);
  const [pos, setPos] = useState(initialPositions);
  const [active, setActive] = useState<number | null>(null);
  const drag = useRef<number | null>(null);

  const toSvg = (e: PointerEvent) => {
    const el = svg.current;
    const m = el?.getScreenCTM();
    if (!el || !m) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return clampPoint(p.x, p.y);
  };

  return (
    <div className="net">
      <svg
        ref={svg}
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        role="group"
        aria-label="Interactive map of the homelab. Each device is a focusable node."
        className="net-svg"
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
          <text x={hub.x} y={hub.y + 4} textAnchor="middle" className="net-hub-text">{HUB_NAME}</text>
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
              const d = { ArrowLeft: [-KEY_STEP, 0], ArrowRight: [KEY_STEP, 0], ArrowUp: [0, -KEY_STEP], ArrowDown: [0, KEY_STEP] }[e.key];
              if (!d) return;
              e.preventDefault();
              setPos((prev) =>
                prev.map((q, j) => (j === i ? clampPoint(q.x + d[0], q.y + d[1]) : q)),
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
