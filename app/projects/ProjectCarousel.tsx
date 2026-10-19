"use client";
import { useRef, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/app/lib/projects-data";

const SPREAD = 3;

export default function ProjectCarousel({ studies, active, onChange }: { studies: CaseStudy[]; active: number; onChange: (i: number) => void }) {
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const go = (i: number) => onChange(Math.max(0, Math.min(studies.length - 1, i)));

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(active + 1);
    if (e.key === "ArrowLeft") go(active - 1);
  };
  const onDown = (e: ReactPointerEvent) => {
    drag.current = { x: e.clientX, moved: false };
  };
  const onUp = (e: ReactPointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 48) {
      d.moved = true;
      go(active + (dx < 0 ? 1 : -1));
    }
  };

  const current = studies[active];

  return (
    <div className="pc" role="region" aria-roledescription="carousel" aria-label="Case studies" onKeyDown={onKey}>
      <div className="pc-glow" aria-hidden="true" />
      <div className="pc-stage" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (drag.current = null)}>
        {studies.map((study, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const isActive = offset === 0;
          const style = {
            "--o": offset,
            "--a": Math.min(abs, SPREAD),
            opacity: abs > SPREAD ? 0 : 1 - abs * 0.22,
            pointerEvents: abs > SPREAD ? "none" : "auto",
            zIndex: 10 - abs,
          } as CSSProperties;
          const body = (
            <>
              {study.screenshot ? (
                <Image
                  src={study.screenshot.src}
                  alt={isActive ? study.screenshot.alt : ""}
                  fill
                  sizes="(max-width: 700px) 70vw, 320px"
                  className="pc-img"
                  draggable={false}
                />
              ) : (
                <span className="pc-fallback" aria-hidden="true">{study.title.charAt(0)}</span>
              )}
              <span className="pc-shade" aria-hidden="true" />
              <span className="pc-index" aria-hidden="true">{study.index}</span>
              <span className="pc-info">
                <strong>{study.title}</strong>
                <span className="pc-tags">
                  <span>{study.status}</span>
                  <span>{study.stack[0]}</span>
                </span>
              </span>
            </>
          );
          return isActive ? (
            <a key={study.id} href="#case-detail" className="pc-card" data-active style={style} data-cursor="open" aria-label={`${study.title}: jump to the details`}>
              {body}
            </a>
          ) : (
            <button
              key={study.id}
              type="button"
              className="pc-card"
              style={style}
              onClick={() => go(i)}
              tabIndex={abs > SPREAD ? -1 : 0}
              aria-label={`Show ${study.title}`}
            >
              {body}
            </button>
          );
        })}
      </div>

      <div className="pc-caption" aria-live="polite">
        <p className="pc-tagline">{current.tagline}</p>
        <a href="#case-detail" className="q-link">
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
