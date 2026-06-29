'use client';
import { useEffect, useRef } from 'react';
import { useTheme } from '@/app/components/ThemeProvider';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  depth: number;
}

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  wind: number;
}

interface Cloud {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

const DynamicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rainRef = useRef<RainDrop[]>([]);
  const cloudsRef = useRef<Cloud[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const scrollYRef = useRef<number>(0);
  const targetScrollYRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const scrollLerpRef = useRef<number>(0);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleScroll = () => {
      targetScrollYRef.current = window.scrollY;
    };

    const smoothScrollUpdate = () => {
      const currentScroll = scrollYRef.current;
      const targetScroll = targetScrollYRef.current;
      scrollYRef.current = currentScroll + (targetScroll - currentScroll) * 0.03;
      scrollLerpRef.current = scrollYRef.current - lastScrollYRef.current;
      lastScrollYRef.current = scrollYRef.current;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initStars = () => {
      starsRef.current = [];
      const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < count; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 2 + 1,
          color: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
          depth: Math.random() * 0.8 + 0.2,
        });
      }
    };

    const initRain = () => {
      rainRef.current = [];
      const count = Math.min(200, Math.floor((canvas.width * canvas.height) / 8000));
      for (let i = 0; i < count; i++) {
        rainRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: 10 + Math.random() * 25,
          speed: 4 + Math.random() * 6,
          opacity: 0.06 + Math.random() * 0.12,
          wind: 0.5 + Math.random() * 1.5,
        });
      }
    };

    const initClouds = () => {
      cloudsRef.current = [];
      const count = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 1.4 - canvas.width * 0.2,
          y: Math.random() * canvas.height * 0.5,
          radius: 80 + Math.random() * 200,
          speed: 0.1 + Math.random() * 0.25,
          opacity: 0.04 + Math.random() * 0.08,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.002 + Math.random() * 0.005,
        });
      }
    };

    const initParticles = () => {
      if (isLight) {
        initRain();
        initClouds();
      } else {
        initStars();
      }
    };

    const drawStars = () => {
      const particles = starsRef.current;
      const scrollDelta = scrollLerpRef.current * 0.05;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const parallaxFactor = p.depth * 0.8;
        p.y -= scrollDelta * parallaxFactor;
        p.x += p.vx * 0.6;
        p.y += p.vy * 0.6;

        if (p.y > canvas.height + 50) {
          p.y = -50;
          p.x = Math.random() * canvas.width;
        } else if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
        }

        if (p.x <= 0 || p.x >= canvas.width) {
          p.vx *= -0.95;
          p.x = p.x <= 0 ? 0 : canvas.width;
        }

        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;

        const maxSpeed = 1.2;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        const depthAlpha = 0.3 + (p.depth * 0.3);
        const depthColor = `rgba(255, 255, 255, ${depthAlpha})`;
        const depthRadius = p.radius * (0.8 + p.depth * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, depthRadius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, depthRadius * 2
        );
        gradient.addColorStop(0, depthColor);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, depthRadius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + p.depth * 0.2})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j];
          const dx = p.x - o.x;
          const dy = p.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const avgDepth = (p.depth + o.depth) / 2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 150) * (0.5 + avgDepth * 0.5)})`;
            ctx.lineWidth = 0.3 + avgDepth * 0.4;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawRain = () => {
      const drops = rainRef.current;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.y += d.speed;
        d.x += d.wind;

        if (d.y > canvas.height + 20) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
        if (d.x > canvas.width + 20) {
          d.x = -10;
        }

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.wind * 0.5, d.y - d.length);
        ctx.strokeStyle = `rgba(160, 180, 200, ${d.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    };

    const drawClouds = () => {
      const clouds = cloudsRef.current;
      for (let i = 0; i < clouds.length; i++) {
        const c = clouds[i];
        c.x += c.speed;
        c.pulse += c.pulseSpeed;

        if (c.x > canvas.width + c.radius) {
          c.x = -c.radius;
          c.y = Math.random() * canvas.height * 0.5;
        }

        const pulseFactor = 1 + Math.sin(c.pulse) * 0.05;
        const r = c.radius * pulseFactor;
        const opacity = c.opacity * (0.8 + Math.sin(c.pulse) * 0.2);

        const gradient = ctx.createRadialGradient(
          c.x, c.y, 0,
          c.x, c.y, r
        );
        gradient.addColorStop(0, `rgba(180, 195, 210, ${opacity * 1.5})`);
        gradient.addColorStop(0.4, `rgba(185, 200, 215, ${opacity})`);
        gradient.addColorStop(1, `rgba(190, 205, 220, 0)`);

        ctx.beginPath();
        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        const subX = c.x + r * 0.4;
        const subY = c.y - r * 0.15;
        const subR = r * 0.7;
        const subGrad = ctx.createRadialGradient(
          subX, subY, 0,
          subX, subY, subR
        );
        subGrad.addColorStop(0, `rgba(175, 195, 215, ${opacity * 1.2})`);
        subGrad.addColorStop(1, `rgba(190, 205, 220, 0)`);
        ctx.beginPath();
        ctx.arc(subX, subY, subR, 0, Math.PI * 2);
        ctx.fillStyle = subGrad;
        ctx.fill();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      smoothScrollUpdate();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isLight) {
        drawClouds();
        drawRain();
      } else {
        drawStars();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLight]);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: "var(--color-bg-primary)" }} />

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {!isLight && (
        <>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom right, var(--color-accent-glow), transparent, transparent)",
          }} />
          <ParallaxOrb
            className="absolute top-1/4 -left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full blur-3xl"
            depth={0.3}
            scrollYRef={scrollYRef}
            color="var(--color-accent-secondary)"
          />
          <ParallaxOrb
            className="absolute bottom-1/4 -right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl"
            depth={0.2}
            scrollYRef={scrollYRef}
            color="var(--color-accent)"
          />
        </>
      )}
    </div>
  );
};

const ParallaxOrb = ({
  className,
  depth,
  scrollYRef,
  color
}: {
  className: string;
  depth: number;
  scrollYRef: React.RefObject<number>;
  color: string;
}) => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    let animationFrameId: number;

    const updateOrbPosition = () => {
      const translateY = -scrollYRef.current * depth * 0.1;
      orb.style.transform = `translateY(${translateY}px)`;
      animationFrameId = requestAnimationFrame(updateOrbPosition);
    };

    updateOrbPosition();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [depth, scrollYRef]);

  return (
    <div
      ref={orbRef}
      className={className}
      style={{ backgroundColor: color, opacity: 0.08 }}
    />
  );
};

export default DynamicBackground;
