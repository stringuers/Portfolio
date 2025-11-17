import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  connected: boolean;
}

interface PerlinConfig {
  scale: number;
  speed: number;
}

// Simple Perlin-like noise using sine waves (deterministic and smooth)
function smoothNoise(x: number, y: number, time: number, scale: number): number {
  const f1 = Math.sin(x * 0.005 + time * 0.0005) * Math.cos(y * 0.004 + time * 0.0003);
  const f2 = Math.sin((x + 100) * 0.003 + time * 0.0007) * Math.cos((y + 200) * 0.002 + time * 0.0004);
  return (f1 + f2) * 0.5;
}

export interface NetworkGraphProps {
  intensity?: 'calm' | 'normal' | 'intense';
  nodeColor?: string;
  connectionColor?: string;
  glowColor?: string;
  maxNodes?: number;
  connectionDistance?: number;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({
  intensity = 'normal',
  nodeColor = '#1a3a52',
  connectionColor = '#00d9ff',
  glowColor = '#00d9ff',
  maxNodes = 50,
  connectionDistance = 150,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const dprRef = useRef<number>(1);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Intensity config
  const intensityConfig = {
    calm: { nodeCount: 25, speed: 0.3, connectionAlpha: 0.3, glowAlpha: 0.4 },
    normal: { nodeCount: 40, speed: 0.6, connectionAlpha: 0.5, glowAlpha: 0.6 },
    intense: { nodeCount: 60, speed: 1.0, connectionAlpha: 0.7, glowAlpha: 0.8 },
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

  // Initialize nodes
  const initializeNodes = useCallback((canvas: HTMLCanvasElement) => {
    const width = canvas.width;
    const height = canvas.height;
    const nodes: Node[] = [];

    for (let i = 0; i < config.nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        originalX: x,
        originalY: y,
        connected: false,
      });
    }

    nodesRef.current = nodes;
  }, [config.nodeCount]);

  // Handle resize with debounce
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);

    resizeTimeoutRef.current = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width * dpr;
      const h = rect.height * dpr;

      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      dprRef.current = dpr;
      initializeNodes(canvas);
    }, 120);
  }, [initializeNodes]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    dprRef.current = dpr;
    initializeNodes(canvas);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [initializeNodes, handleResize]);

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

      // Skip frame if too early (throttle to ~60fps)
      if (deltaTime < targetFrameTime * 0.8) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime = currentTime;
      timeRef.current += config.speed;

      const dpr = dprRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Clear canvas
      ctx.fillStyle = 'rgba(5, 8, 16, 0.95)';
      ctx.fillRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const time = timeRef.current;

      // Update node positions
      nodes.forEach((node) => {
        const noiseX = smoothNoise(node.x, node.y, time, 0.1) * config.speed;
        const noiseY = smoothNoise(node.y, node.x, time, 0.1) * config.speed;

        node.x += noiseX * 0.5;
        node.y += noiseY * 0.5;

        // Wrap around edges
        if (node.x < 0) node.x = w;
        if (node.x > w) node.x = 0;
        if (node.y < 0) node.y = h;
        if (node.y > h) node.y = 0;
      });

      // Draw connections
      const dist = connectionDistance;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < dist) {
            const alpha = (1 - distance / dist) * config.connectionAlpha;
            ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      nodes.forEach((node) => {
        // Glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 6);
        glowGradient.addColorStop(0, `rgba(0, 217, 255, ${config.glowAlpha * 0.6})`);
        glowGradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(node.x - 6, node.y - 6, 12, 12);

        // Node
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(0, 217, 255, ${config.glowAlpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [config, connectionDistance, nodeColor, prefersReducedMotion]);

  // Listen for intensity changes from Navigation
  useEffect(() => {
    const handleIntensityChange = (event: Event) => {
      // The intensity is updated via props, so this is mainly for side effects if needed
      console.debug('bg-intensity-changed event received');
    };

    window.addEventListener('bg-intensity-changed', handleIntensityChange);
    return () => window.removeEventListener('bg-intensity-changed', handleIntensityChange);
  }, []);

  if (prefersReducedMotion) {
    // Fallback: static gradient
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #050810 0%, #1a3a52 50%, #050810 100%)',
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
      aria-label="Network graph background animation"
    />
  );
};

export default NetworkGraph;
