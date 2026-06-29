"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [role='button'], label"))
        setHovering(true);
    };
    const onOut = () => setHovering(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-100 ease-linear"
        style={{
          width: hovering ? 40 : 28,
          height: hovering ? 40 : 28,
          borderRadius: "50%",
          border: "1.5px solid var(--color-accent)",
          transform: `translate(${pos.x - (hovering ? 20 : 14)}px, ${pos.y - (hovering ? 20 : 14)}px)`,
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
      {/* Inner dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: hovering ? 8 : 5,
          height: hovering ? 8 : 5,
          borderRadius: "50%",
          backgroundColor: "var(--color-accent)",
          transform: `translate(${pos.x - (hovering ? 4 : 2.5)}px, ${pos.y - (hovering ? 4 : 2.5)}px)`,
          transition: "width 0.2s, height 0.2s, background-color 0.2s",
        }}
      />
    </>
  );
}
