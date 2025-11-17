import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  depth: 'far' | 'mid' | 'near'; // depth layer determines speed, opacity, size
}

export interface DepthParticleFieldProps {
  intensity?: 'calm' | 'normal' | 'intense';
}

const DepthParticleField: React.FC<DepthParticleFieldProps> = ({ intensity = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const dprRef = useRef<number>(1);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const smoothMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Intensity config
  const intensityConfig = {
    calm: { particleCount: 60, speed: 0.2, connectionDistance: 80, glowAlpha: 0.3 },
    normal: { particleCount: 100, speed: 0.5, connectionDistance: 120, glowAlpha: 0.5 },
    intense: { particleCount: 150, speed: 0.8, connectionDistance: 160, glowAlpha: 0.7 },
  };

  const config = intensityConfig[intensity];

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Track mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize particles
  const initializeParticles = useCallback((canvas: HTMLCanvasElement) => {
    const width = canvas.width;
    const height = canvas.height;
    const particles: Particle[] = [];

    for (let i = 0; i < config.particleCount; i++) {
      const depth = i % 3 === 0 ? 'far' : i % 3 === 1 ? 'mid' : 'near';
      const speedMult = depth === 'far' ? 0.3 : depth === 'mid' ? 0.6 : 1.0;
      const sizeMult = depth === 'far' ? 0.5 : depth === 'mid' ? 1.5 : 2.5;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * config.speed * speedMult,
        vy: (Math.random() - 0.5) * config.speed * speedMult,
        life: 1,
        maxLife: 1,
        size: 1 + Math.random() * 2 * sizeMult,
        depth,
      });
    }

    particlesRef.current = particles;
  }, [config.particleCount, config.speed]);

  // Handle resize with debounce
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);

    resizeTimeoutRef.current = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth * dpr;
      const h = window.innerHeight * dpr;

      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      dprRef.current = dpr;
      initializeParticles(canvas);
    }, 120);
  }, [initializeParticles]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    // Use window dimensions instead of getBoundingClientRect to ensure full viewport coverage
    const w = window.innerWidth * dpr;
    const h = window.innerHeight * dpr;

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    dprRef.current = dpr;
    initializeParticles(canvas);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [initializeParticles, handleResize]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastFrameTime = performance.now();
    const targetFrameTime = 1000 / 60; // 60fps

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime < targetFrameTime * 0.8) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime = currentTime;

      const dpr = dprRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Smooth mouse position for parallax
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.1;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.1;

      // Clear canvas with subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#050810');
      gradient.addColorStop(0.5, '#0a0e1a');
      gradient.addColorStop(1, '#050810');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const centerX = w / 2;
      const centerY = h / 2;

      // Update and draw particles by depth layer
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = w;
        if (particle.x > w) particle.x = 0;
        if (particle.y < 0) particle.y = h;
        if (particle.y > h) particle.y = 0;

        // Parallax offset based on depth and mouse position
        let parallaxX = 0;
        let parallaxY = 0;

        if (particle.depth === 'far') {
          parallaxX = (smoothMouseRef.current.x - centerX) * 0.1;
          parallaxY = (smoothMouseRef.current.y - centerY) * 0.1;
        } else if (particle.depth === 'mid') {
          parallaxX = (smoothMouseRef.current.x - centerX) * 0.25;
          parallaxY = (smoothMouseRef.current.y - centerY) * 0.25;
        } else {
          parallaxX = (smoothMouseRef.current.x - centerX) * 0.45;
          parallaxY = (smoothMouseRef.current.y - centerY) * 0.45;
        }

        const drawX = particle.x + parallaxX;
        const drawY = particle.y + parallaxY;

        // Opacity based on depth
        const opacity =
          particle.depth === 'far'
            ? 0.2 * config.glowAlpha
            : particle.depth === 'mid'
              ? 0.4 * config.glowAlpha
              : 0.6 * config.glowAlpha;

        // Draw glow
        const glowGradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, particle.size * 3);
        glowGradient.addColorStop(0, `rgba(0, 217, 255, ${opacity * 0.8})`);
        glowGradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(drawX, drawY, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle
        ctx.fillStyle = `rgba(26, 58, 82, ${opacity * 1.5})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw bright core
        ctx.fillStyle = `rgba(0, 217, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw subtle connections between nearby particles (far layer only for performance)
      const farParticles = particles.filter((p) => p.depth === 'far');
      for (let i = 0; i < farParticles.length; i++) {
        for (let j = i + 1; j < farParticles.length; j++) {
          const p1 = farParticles[i];
          const p2 = farParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            const alpha = (1 - distance / config.connectionDistance) * 0.15 * config.glowAlpha;
            ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [config, prefersReducedMotion]);

  // Listen for intensity changes
  useEffect(() => {
    const handleIntensityChange = () => {
      console.debug('bg-intensity-changed event received');
    };

    window.addEventListener('bg-intensity-changed', handleIntensityChange);
    return () => window.removeEventListener('bg-intensity-changed', handleIntensityChange);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #050810 0%, #0a0e1a 50%, #050810 100%)',
          zIndex: 0,
        }}
        aria-label="Background decoration"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background: '#050810',
      }}
      aria-label="Depth particle field background animation"
    />
  );
};

export default DepthParticleField;
