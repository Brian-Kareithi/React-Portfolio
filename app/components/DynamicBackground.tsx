'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  depth: number;
}

const DynamicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const scrollYRef = useRef<number>(0);
  const targetScrollYRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const scrollLerpRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Smooth scroll handling with requestAnimationFrame
    const handleScroll = () => {
      targetScrollYRef.current = window.scrollY;
    };

    // Smooth scroll animation
    const smoothScrollUpdate = () => {
      const currentScroll = scrollYRef.current;
      const targetScroll = targetScrollYRef.current;
      
      // Very subtle easing for smooth movement (0.03 is very slow, almost imperceptible)
      scrollYRef.current = currentScroll + (targetScroll - currentScroll) * 0.03;
      
      // Track the actual movement for parallax
      scrollLerpRef.current = scrollYRef.current - lastScrollYRef.current;
      lastScrollYRef.current = scrollYRef.current;
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize particles with depth for parallax
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 2 + 1,
          color: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
          depth: Math.random() * 0.8 + 0.2 // Depth between 0.2 and 1.0
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Update smooth scroll position
      smoothScrollUpdate();

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const scrollDelta = scrollLerpRef.current * 0.05; // Very subtle parallax effect

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Apply very subtle parallax scrolling effect based on depth
        // Using a much smaller multiplier for barely noticeable movement
        const parallaxFactor = particle.depth * 0.8; // Reduced from 2.0 to 0.8
        particle.y -= scrollDelta * parallaxFactor;

        // Update position with regular movement (slightly reduced)
        particle.x += particle.vx * 0.6;
        particle.y += particle.vy * 0.6;

        // Handle particles going out of bounds due to scrolling
        // Wrap around vertically for continuous effect
        if (particle.y > canvas.height + 50) {
          particle.y = -50;
          particle.x = Math.random() * canvas.width;
        } else if (particle.y < -50) {
          particle.y = canvas.height + 50;
          particle.x = Math.random() * canvas.width;
        }

        // Bounce off horizontal walls
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -0.95;
          particle.x = particle.x <= 0 ? 0 : canvas.width;
        }

        // Add very subtle randomness to movement
        particle.vx += (Math.random() - 0.5) * 0.05;
        particle.vy += (Math.random() - 0.5) * 0.05;

        // Limit velocity (reduced for smoother movement)
        const maxSpeed = 1.2;
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }

        // Adjust particle appearance based on depth
        const depthAlpha = 0.3 + (particle.depth * 0.3);
        const depthColor = `rgba(255, 255, 255, ${depthAlpha})`;
        const depthRadius = particle.radius * (0.8 + particle.depth * 0.4);

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, depthRadius, 0, Math.PI * 2);
        
        // Create glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, depthRadius * 2
        );
        gradient.addColorStop(0, depthColor);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add a bright core to the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, depthRadius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + particle.depth * 0.2})`;
        ctx.fill();
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            // Adjust connection appearance based on average depth
            const avgDepth = (particle.depth + otherParticle.depth) / 2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150) * (0.5 + avgDepth * 0.5)})`;
            ctx.lineWidth = 0.3 + avgDepth * 0.4;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      {/* Solid background color */}
      <div className="absolute inset-0 bg-[#0f172a]" />
      
      {/* Particle canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10" />
      
      {/* Gradient Orbs with very subtle parallax effect */}
      <ParallaxOrb 
        className="absolute top-1/4 -left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full blur-3xl"
        depth={0.3}
        scrollYRef={scrollYRef}
      />
      <ParallaxOrb 
        className="absolute bottom-1/4 -right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl"
        depth={0.2}
        scrollYRef={scrollYRef}
      />
    </div>
  );
};

// Separate component for parallax orbs with smooth movement
const ParallaxOrb = ({ 
  className, 
  depth, 
  scrollYRef 
}: { 
  className: string; 
  depth: number;
  scrollYRef: React.RefObject<number>;
}) => {
  const orbRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    let animationFrameId: number;
    
    const updateOrbPosition = () => {
      // Use the same smooth scroll value with very subtle parallax
      const translateY = -scrollYRef.current * depth * 0.1; // Reduced multiplier
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

  return <div ref={orbRef} className={className} />;
};

export default DynamicBackground;