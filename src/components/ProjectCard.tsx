import { useState } from 'react';

interface Props {
  title: string;
  description: string;
  stack: string[];
  threatModel?: string;
}

export default function ProjectCard({ title, description, stack, threatModel }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative rounded-lg overflow-hidden border border-border bg-card p-4 hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>

      <div className="flex flex-wrap gap-2">
        {stack.map((s) => (
          <span key={s} className="text-xs px-2 py-1 rounded bg-background/10 border border-border text-muted-foreground">{s}</span>
        ))}
      </div>

      {/* Overlay (cheap visual, avoid backdrop-blur for performance) */}
      <div
        className={`absolute inset-0 p-4 flex flex-col justify-center items-start space-y-2 transition-opacity duration-300 ${
          hover ? 'opacity-100 bg-background/75 border-t border-border' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-sm font-semibold text-primary">Architecture & Threat Model</div>
        <div className="text-sm text-muted-foreground">{threatModel ?? 'No public threat model provided.'}</div>
        <div className="mt-3">
          <a className="text-sm text-primary underline" href="#">View Details</a>
        </div>
      </div>
    </div>
  );
}
