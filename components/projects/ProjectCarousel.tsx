"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type WheelEvent,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCaseStudySelection } from "@/components/projects/CaseStudySelection";
import { caseStudies as studies } from "@/data/projects";
import { canRender3D, prefersReducedMotion } from "@/lib/media";
import { scrollToElement } from "@/lib/scroll";

/** How many cards stay visible behind the active one. */
const SPREAD = 4;
/** Fraction of a card width that a drag must travel to move one step. */
const STEP = 0.78;
/** In the 3D showroom, fraction of the stage width that a drag must travel to move one step. */
const STEP_3D = 0.28;

function ShowroomPlaceholder() {
  return (
    <div className="pc-3d pc-3d-loading" aria-hidden="true">
      <p>Setting up the showroom…</p>
    </div>
  );
}

const ProjectShowcase3D = dynamic(() => import("@/components/projects/ProjectShowcase3D").then((m) => m.ProjectShowcase3D), {
  ssr: false,
  loading: ShowroomPlaceholder,
});

/** If the WebGL scene fails (context lost, texture error), fall back to the card stack instead of a blank stage. */
class ShowroomBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Case studies as laptops in a 3D showroom, or as a CSS card stack where WebGL isn't a good idea
 * (reduced motion, data saver, low-end devices). Drag, swipe, scroll sideways, use the arrow keys or the dots.
 */
export function ProjectCarousel() {
  const { activeIndex: active, select: go } = useCaseStudySelection();
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; step: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const wheelLock = useRef(0);
  const [pull, setPull] = useState(0);
  const [mode, setMode] = useState<"pending" | "3d" | "flat">("pending");

  useEffect(() => {
    const id = requestAnimationFrame(() => setMode(canRender3D() ? "3d" : "flat"));
    return () => cancelAnimationFrame(id);
  }, []);

  const openDetails = () => {
    const el = document.getElementById("case-detail");
    if (!el) return;
    history.replaceState(null, "", `#${studies[active].id}`);
    scrollToElement(el);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(active + 1);
    if (e.key === "ArrowLeft") go(active - 1);
  };

  const tilt = (x: number, y: number) => {
    if (mode !== "flat" || prefersReducedMotion()) return;
    stage.current?.style.setProperty("--mx", x.toFixed(3));
    stage.current?.style.setProperty("--my", y.toFixed(3));
  };

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const card = stage.current?.querySelector<HTMLElement>(".pc-card");
    const step = card ? card.offsetWidth * STEP : (stage.current?.offsetWidth ?? 800) * STEP_3D;
    drag.current = { x: e.clientX, step, moved: false };
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) {
      if (e.pointerType !== "mouse" || !stage.current) return;
      const r = stage.current.getBoundingClientRect();
      tilt(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
      return;
    }
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (d.moved) {
      let p = dx / d.step;
      if ((active === 0 && p > 0) || (active === studies.length - 1 && p < 0)) p *= 0.3;
      setPull(p);
    }
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    suppressClick.current = true;
    const jump = Math.round(-pull) || (Math.abs(pull) > 0.18 ? (pull < 0 ? 1 : -1) : 0);
    setPull(0);
    go(active + jump);
  };
  const onCancel = () => {
    drag.current = null;
    setPull(0);
  };
  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) < 24 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    const now = Date.now();
    if (now < wheelLock.current) return;
    wheelLock.current = now + 450;
    go(active + (e.deltaX > 0 ? 1 : -1));
  };

  const current = studies[active];

  const cards = studies.map((study, i) => {
    const offset = i - active;
    const isActive = offset === 0;
    const pos = offset + pull;
    const hidden = offset < 0 || offset > SPREAD;
    const style = {
      "--o": pos,
      "--a": Math.min(Math.abs(pos), SPREAD),
      "--i": i,
      opacity: pos < 0 ? Math.max(0, 1 + pos * 1.6) : pos > SPREAD ? Math.max(0, 1 - (pos - SPREAD) * 2) * 0.52 : 1 - pos * 0.12,
      pointerEvents: hidden ? "none" : "auto",
      zIndex: 20 - Math.round(pos),
    } as CSSProperties;
    return (
      <button
        key={study.id}
        type="button"
        className="pc-card"
        data-active={isActive || undefined}
        data-tone={i % 2 ? "solid" : "glass"}
        style={style}
        onClick={() => (isActive ? openDetails() : go(i))}
        tabIndex={hidden ? -1 : 0}
        aria-label={isActive ? `${study.title}: jump to the details` : `Show ${study.title}`}
      >
        <span className="pc-panel">
          <strong className="pc-title">{study.title}</strong>
          <span className="pc-sub">{study.tagline}</span>
        </span>
        <span className="pc-bars" aria-hidden="true" />
        <span className="pc-meta">
          {study.status} · {study.stack[0]}
        </span>
        <span className="pc-num" aria-hidden="true">
          {study.index}
        </span>
        <span className="pc-sheen" aria-hidden="true" />
      </button>
    );
  });

  const showroom = mode === "3d";

  return (
    <div className="pc" data-mode={mode} role="region" aria-roledescription="carousel" aria-label="Case studies" onKeyDown={onKey}>
      <div className="pc-glow" aria-hidden="true" />
      <div
        ref={stage}
        className="pc-stage"
        data-dragging={pull !== 0 || undefined}
        tabIndex={showroom ? 0 : undefined}
        aria-label={showroom ? "Project showroom. Use the left and right arrow keys to browse." : undefined}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onCancel}
        onPointerLeave={() => tilt(0, 0)}
        onWheel={onWheel}
        onClickCapture={(e) => {
          if (!suppressClick.current) return;
          suppressClick.current = false;
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {mode === "pending" ? (
          <ShowroomPlaceholder />
        ) : showroom ? (
          <ShowroomBoundary fallback={cards}>
            <ProjectShowcase3D studies={studies} active={active} pull={pull} onSelect={go} onOpen={openDetails} />
          </ShowroomBoundary>
        ) : (
          cards
        )}
      </div>

      <div className="pc-caption" aria-live="polite">
        <p className="pc-now">
          <span className="pc-now-num">{current.index}</span>
          <span className="pc-now-title">{current.title}</span>
          <span className="pc-now-meta">
            {current.status} · {current.stack.slice(0, 2).join(", ")}
          </span>
        </p>
        <p className="pc-tagline">{current.tagline}</p>
        <a
          href={`#${current.id}`}
          className="q-link"
          onClick={(e) => {
            e.preventDefault();
            openDetails();
          }}
        >
          See the details <ArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <div className="pc-controls">
        <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project" className="pc-btn">
          <ArrowLeft aria-hidden="true" />
        </button>
        <ol className="pc-dots" aria-label="Choose a project">
          {studies.map((s, i) => (
            <li key={s.id}>
              <button type="button" onClick={() => go(i)} aria-label={s.title} aria-current={i === active ? "true" : undefined} />
            </li>
          ))}
        </ol>
        <button type="button" onClick={() => go(active + 1)} disabled={active === studies.length - 1} aria-label="Next project" className="pc-btn">
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
