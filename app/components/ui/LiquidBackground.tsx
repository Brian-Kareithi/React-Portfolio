"use client";

import { useEffect, useRef } from "react";

const GRID_COLS = 80;
const GRID_ROWS = 50;
const SPACING = 20;
const DAMPING = 0.985;
const MOUSE_RADIUS = 80;
const MOUSE_STRENGTH = 6;
const WAVE_SPEED = 0.4;

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, px: -9999, py: -9999 });
  const gridRef = useRef<Float32Array[]>([]);
  const velRef = useRef<Float32Array[]>([]);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);
  const heroVisibleRef = useRef(true);

  useEffect(() => {
    const grid: Float32Array[] = [];
    const vel: Float32Array[] = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      grid.push(new Float32Array(GRID_COLS));
      vel.push(new Float32Array(GRID_COLS));
    }
    gridRef.current = grid;
    velRef.current = vel;

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      const hero = document.getElementById("home");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        heroVisibleRef.current = rect.bottom > 0;
      }
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;

    const render = () => {
      if (heroVisibleRef.current) {
        ctx.clearRect(0, 0, w, h);
        animId = requestAnimationFrame(render);
        timeRef.current += 1;
        return;
      }

      const grid = gridRef.current;
      const vel = velRef.current;
      const mouse = mouseRef.current;
      timeRef.current += 1;

      // inject mouse disturbance
      const col = Math.round(mouse.x / SPACING);
      const row = Math.round(mouse.y / SPACING);
      if (
        col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS &&
        (mouse.px !== mouse.x || mouse.py !== mouse.y)
      ) {
        for (let dr = -4; dr <= 4; dr++) {
          for (let dc = -4; dc <= 4; dc++) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS) {
              const dist = Math.sqrt(dr * dr + dc * dc);
              if (dist < 4) {
                vel[nr][nc] -= MOUSE_STRENGTH * Math.max(0, 1 - dist / 4);
              }
            }
          }
        }
      }

      // wave propagation
      for (let r = 1; r < GRID_ROWS - 1; r++) {
        for (let c = 1; c < GRID_COLS - 1; c++) {
          const laplacian =
            grid[r - 1][c] + grid[r + 1][c] + grid[r][c - 1] + grid[r][c + 1] -
            4 * grid[r][c];
          vel[r][c] += laplacian * WAVE_SPEED;
          vel[r][c] *= DAMPING;
        }
      }

      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          grid[r][c] += vel[r][c];
        }
      }

      // render
      ctx.clearRect(0, 0, w, h);

      const offsetX = (w - (GRID_COLS - 1) * SPACING) / 2;
      const offsetY = (h - (GRID_ROWS - 1) * SPACING) / 2;

      for (let r = 0; r < GRID_ROWS - 1; r++) {
        for (let c = 0; c < GRID_COLS - 1; c++) {
          const x0 = offsetX + c * SPACING;
          const y0 = offsetY + r * SPACING;
          const x1 = x0 + SPACING;
          const y1 = y0 + SPACING;

          const v00 = grid[r][c];
          const v10 = grid[r][c + 1];
          const v01 = grid[r + 1][c];
          const v11 = grid[r + 1][c + 1];

          const avg = (v00 + v10 + v01 + v11) / 4;
          const absAvg = Math.abs(avg);
          const intensity = Math.min(1, absAvg / 3);

          const alpha = 0.04 + intensity * 0.15;

          // top-left triangle
          ctx.beginPath();
          ctx.moveTo(x0, y0 + v00);
          ctx.lineTo(x1, y0 + v10);
          ctx.lineTo(x0, y1 + v01);
          ctx.closePath();
          ctx.fillStyle = `rgba(206, 166, 107, ${alpha})`;
          ctx.fill();

          // bottom-right triangle
          ctx.beginPath();
          ctx.moveTo(x1, y0 + v10);
          ctx.lineTo(x1, y1 + v11);
          ctx.lineTo(x0, y1 + v01);
          ctx.closePath();
          ctx.fillStyle = `rgba(206, 166, 107, ${alpha * 0.8})`;
          ctx.fill();
        }
      }

      // subtle grid lines
      ctx.strokeStyle = `rgba(206, 166, 107, 0.04)`;
      ctx.lineWidth = 0.5;

      for (let r = 0; r < GRID_ROWS; r++) {
        ctx.beginPath();
        for (let c = 0; c < GRID_COLS; c++) {
          const x = offsetX + c * SPACING;
          const y = offsetY + r * SPACING + grid[r][c];
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (let c = 0; c < GRID_COLS; c++) {
        ctx.beginPath();
        for (let r = 0; r < GRID_ROWS; r++) {
          const x = offsetX + c * SPACING;
          const y = offsetY + r * SPACING + grid[r][c];
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
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
