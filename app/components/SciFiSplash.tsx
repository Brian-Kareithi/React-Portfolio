"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Orbitron } from "next/font/google";


const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"] });

function GlitchLines() {
  const lines = useMemo(() => {
    if (typeof window === "undefined") return [];
    return Array.from({ length: 12 }, (_, i) => ({
      top: i < 5 ? 30 + Math.random() * 40 : Math.random() * 100,
      width: Math.random() * 40 + 15,
      delay: Math.random() * 5,
      height: Math.random() * 2.5 + 0.5,
    }));
  }, []);

  const [activeLines, setActiveLines] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timers: number[] = [];
    lines.forEach((line, i) => {
      const schedule = () => {
        const t = window.setTimeout(() => {
          setActiveLines((prev) => {
            const next = new Set(prev);
            next.add(i);
            return next;
          });
          const activeDuration = Math.random() * 150 + 30;
          window.setTimeout(() => {
            setActiveLines((prev) => {
              const next = new Set(prev);
              next.delete(i);
              return next;
            });
          }, activeDuration);
          const nextDelay = Math.random() * 2000 + 200;
          timers.push(window.setTimeout(schedule, nextDelay));
        }, line.delay * 1000 + Math.random() * 2000);
        timers.push(t);
      };
      schedule();
    });
    return () => timers.forEach(clearTimeout);
  }, [lines]);

  return (
    <>
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute left-0 pointer-events-none"
          style={{
            top: `${line.top}%`,
            width: `${line.width}%`,
            height: `${line.height}px`,
            backgroundColor: "var(--color-accent)",
            opacity: activeLines.has(i) ? 0.8 : 0,
            transition: "opacity 0.02s ease",
            boxShadow: activeLines.has(i)
              ? "0 0 8px var(--color-accent), 0 0 24px var(--color-accent-glow)"
              : "none",
          }}
        />
      ))}
    </>
  );
}

export default function SciFiSplash({ onBegin }: { onBegin: () => void }) {
  const [phase, setPhase] = useState<"init" | "idle" | "exit">("init");
  const [glitch, setGlitch] = useState({
    active: false,
    x: 0, y: 0, skew: 0,
    redX: 0, cyanX: 0, redY: 0, cyanY: 0,
    clipTop: 0, clipBottom: 100,
    scale: 1,
  });

  useEffect(() => {
    const t = setTimeout(() => setPhase("idle"), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "idle") return;

    let mounted = true;

    const trigger = () => {
      if (!mounted) return;

      const isStrong = Math.random() > 0.5;
      const duration = Math.random() * 100 + 30;

      setGlitch({
        active: true,
        x: (Math.random() - 0.5) * (isStrong ? 14 : 6),
        y: (Math.random() - 0.5) * (isStrong ? 4 : 2),
        skew: (Math.random() - 0.5) * (isStrong ? 4 : 1.5),
        redX: (Math.random() - 0.5) * (isStrong ? 8 : 3),
        cyanX: (Math.random() - 0.5) * (isStrong ? 8 : 3),
        redY: (Math.random() - 0.5) * (isStrong ? 3 : 1),
        cyanY: (Math.random() - 0.5) * (isStrong ? 3 : 1),
        clipTop: Math.random() * 50,
        clipBottom: Math.random() * 50 + 50,
        scale: isStrong ? 1 + (Math.random() - 0.5) * 0.03 : 1,
      });

      setTimeout(() => {
        if (!mounted) return;
        setGlitch({
          active: false, x: 0, y: 0, skew: 0,
          redX: 0, cyanX: 0, redY: 0, cyanY: 0,
          clipTop: 0, clipBottom: 100,
          scale: 1,
        });
      }, duration);

      const next = Math.random() * (isStrong ? 5000 : 2000) + 300;
      timers.push(window.setTimeout(trigger, next));
    };

    const timers: number[] = [];
    const t = window.setTimeout(trigger, Math.random() * 1500 + 300);
    timers.push(t);

    return () => {
      mounted = false;
      timers.forEach(clearTimeout);
    };
  }, [phase]);

  const handleClick = useCallback(() => {
    if (phase === "exit") return;
    setPhase("exit");
    setTimeout(onBegin, 1000);
  }, [phase, onBegin]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center select-none overflow-hidden ${
        phase === "init"
          ? "opacity-0"
          : phase === "exit"
            ? "opacity-0"
            : "opacity-100"
      }`}
      style={{
        backgroundColor: "var(--color-bg-primary)",
        transition: phase === "exit" ? "opacity 0.6s ease 0.4s" : "opacity 0.6s ease",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          transform: phase === "exit" ? "translateY(-100%) scale(0.95)" : "translateY(0) scale(1)",
          transition: "transform 0.7s cubic-bezier(0.55, 0, 0.35, 1)",
          opacity: phase === "exit" ? 0 : 1,
          transitionProperty: "transform, opacity",
          transitionDuration: "0.7s, 0.5s",
          transitionTimingFunction: "cubic-bezier(0.55, 0, 0.35, 1), ease",
          transitionDelay: "0s, 0.35s",
        }}
      >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/splash_background.jpg)" }} />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />
      <GlitchLines />

      <div className="relative z-10 text-center px-4" style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "relative",
            fontFamily: orbitron.style.fontFamily,
            fontWeight: 900,
            fontSize: "clamp(2rem, 8vw, 5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {glitch.active && (
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                color: "#ff0040",
                clipPath: `inset(${glitch.clipTop}% 0 ${100 - glitch.clipBottom}% 0)`,
                transform: `translate(${glitch.redX}px, ${glitch.redY}px)`,
                opacity: 0.6,
              }}
            >
              IN THE BEGINNING...
            </span>
          )}
          {glitch.active && (
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                color: "#00e8ff",
                clipPath: `inset(${100 - glitch.clipBottom}% 0 ${glitch.clipTop}% 0)`,
                transform: `translate(${glitch.cyanX}px, ${glitch.cyanY}px)`,
                opacity: 0.6,
              }}
            >
              IN THE BEGINNING...
            </span>
          )}
          <span
            style={{
              color: "var(--color-text-primary)",
              transform: glitch.active
                ? `translate(${glitch.x}px, ${glitch.y}px) skewX(${glitch.skew}deg) scale(${glitch.scale})`
                : "none",
              transition: glitch.active ? "none" : "transform 0.2s ease",
              display: "inline-block",
              position: "relative",
            }}
          >
            IN THE BEGINNING...
          </span>
          {glitch.active && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${glitch.clipTop}%`,
                height: `${glitch.clipBottom - glitch.clipTop}%`,
                backgroundColor: "var(--color-accent)",
                opacity: 0.06,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>

      <div
        className="absolute bottom-8 xs:bottom-12 left-0 right-0 text-center"
        style={{ pointerEvents: "none" }}
      >
        <p
          className="text-xs xs:text-sm tracking-[0.35em] uppercase font-mono"
          style={{
            color: "#fff",
            animation: "clickPulse 2s ease-in-out infinite",
            textShadow: "0 0 12px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.4)",
          }}
        >
          ✦ CLICK ANYWHERE TO BEGIN ✦
        </p>
      </div>
      </div>
    </div>
  );
}
