import { useEffect, useRef } from 'react';

// Lightweight, dependency-free canvas mesh intended as a subtle, performant
// background accent that evokes networks and security topologies.
export default function SecurityMesh({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let lastDraw = 0;
    const TARGET_MS = 1000 / 30; // cap to ~30fps

    // cap DPR to avoid excessive raster sizes on very high-DPR screens
    const DPR = Math.min(2, devicePixelRatio || 1);

    const points: { x: number; y: number; vx: number; vy: number }[] = [];

    const init = () => {
      width = canvas.width = Math.max(1, Math.floor(canvas.clientWidth * DPR));
      height = canvas.height = Math.max(1, Math.floor(canvas.clientHeight * DPR));
      points.length = 0;
      // fewer points -> much cheaper O(n^2) loop
      const area = canvas.clientWidth * canvas.clientHeight;
      const count = Math.min(40, Math.max(8, Math.round(area / 160000)));
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12 * DPR,
          vy: (Math.random() - 0.5) * 0.12 * DPR,
        });
      }
      ctx.lineWidth = 1 * DPR;
    };

    const step = (t: number) => {
      if (!running) return;
      if (t - lastDraw < TARGET_MS) {
        raf = requestAnimationFrame(step);
        return;
      }
      lastDraw = t;

      ctx.clearRect(0, 0, width, height);

      // draw lines between nearby points (reduced threshold)
      const threshold = 100 * DPR;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < threshold) {
            const a = 1 - dist / threshold;
            ctx.strokeStyle = `rgba(12, 217, 255, ${0.06 * a})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // draw subtle node
        ctx.fillStyle = 'rgba(12,217,255,0.06)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.0 * DPR, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const onResize = () => {
      cancelAnimationFrame(raf);
      init();
      if (running) raf = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        lastDraw = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    init();
    raf = requestAnimationFrame(step);

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 w-full h-full opacity-60 ${className}`}
    />
  );
}
