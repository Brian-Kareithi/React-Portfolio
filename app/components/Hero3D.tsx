"use client";
import { useEffect, useRef } from "react";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const shapes: {
      x: number;
      y: number;
      size: number;
      rotation: number;
      speed: number;
      type: "hexagon" | "triangle" | "diamond";
      opacity: number;
    }[] = [];

    for (let i = 0; i < 12; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 40,
        rotation: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.005,
        type: (["hexagon", "triangle", "diamond"] as const)[
          Math.floor(Math.random() * 3)
        ],
        opacity: 0.03 + Math.random() * 0.06,
      });
    }

    const drawHexagon = (cx: number, cy: number, size: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rot + (Math.PI / 3) * i;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const drawTriangle = (cx: number, cy: number, size: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = rot + (Math.PI * 2 / 3) * i;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const drawDiamond = (cx: number, cy: number, size: number, rot: number) => {
      ctx.beginPath();
      ctx.moveTo(cx + size * Math.cos(rot), cy + size * Math.sin(rot));
      ctx.lineTo(cx + size * Math.cos(rot + Math.PI / 2), cy + size * Math.sin(rot + Math.PI / 2));
      ctx.lineTo(cx + size * Math.cos(rot + Math.PI), cy + size * Math.sin(rot + Math.PI));
      ctx.lineTo(cx + size * Math.cos(rot + 3 * Math.PI / 2), cy + size * Math.sin(rot + 3 * Math.PI / 2));
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        shape.rotation += shape.speed;
        shape.y += Math.sin(Date.now() * 0.0003 + shape.x) * 0.15;

        if (shape.y > canvas.height + 60) shape.y = -60;
        if (shape.y < -60) shape.y = canvas.height + 60;
        shape.x += Math.sin(Date.now() * 0.0002 + shape.y * 0.01) * 0.1;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.strokeStyle = `rgba(122, 139, 168, ${shape.opacity})`;
        ctx.lineWidth = 1;

        if (shape.type === "hexagon") drawHexagon(0, 0, shape.size, shape.rotation);
        else if (shape.type === "triangle") drawTriangle(0, 0, shape.size, shape.rotation);
        else drawDiamond(0, 0, shape.size, shape.rotation);

        ctx.stroke();
        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
