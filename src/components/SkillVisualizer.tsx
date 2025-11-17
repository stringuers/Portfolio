import { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
}

export default function SkillVisualizer({ skills = [] as Skill[] }: { skills?: Skill[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // cap DPR to prevent huge canvas sizes on very high-density displays
    const dpr = Math.min(1.5, devicePixelRatio || 1);
    let resizeTimer: number | undefined;

    const resize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        draw();
      }, 120); // debounce resize events
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const padding = 12 * dpr;
      const barH = 14 * dpr;
      skills.forEach((s, i) => {
        const y = padding + i * (barH + 12 * dpr);
        // background
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.fillRect(padding, y, rect.width * dpr - padding * 2, barH);
        // fill
        const w = (rect.width * dpr - padding * 2) * (s.level / 100);
        ctx.fillStyle = 'rgba(0,217,255,0.9)';
        ctx.fillRect(padding, y, w, barH);
        // text
        ctx.fillStyle = 'rgba(240,249,255,0.95)';
        ctx.font = `${12 * dpr}px JetBrains Mono, monospace`;
        ctx.fillText(`${s.name} — ${s.level}%`, padding + 6 * dpr, y + barH - 4 * dpr);
      });
    };

    window.addEventListener('resize', resize);
    // initial draw
    resize();
    return () => {
      window.removeEventListener('resize', resize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [skills]);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <canvas ref={canvasRef} className="w-full h-48" />
    </div>
  );
}
