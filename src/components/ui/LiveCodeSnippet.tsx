import { useEffect, useState } from 'react';

const sampleCode = [
  `const http = require('http');`,
  `const server = http.createServer(async (req, res) => {`,
  `  // validate input`,
  `  const safe = sanitize(req.url);`,
  `  // call service`,
  `  const result = await fetchService(safe);`,
  `  res.end(JSON.stringify(result));`,
  `});`,
  `server.listen(8080);`,
];

export default function LiveCodeSnippet({ className = '' }: { className?: string }) {
  const [visibleLines, setVisibleLines] = useState<number>(1);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(0);

  useEffect(() => {
    let i = 1;
    const grow = setInterval(() => {
      setVisibleLines((v) => Math.min(sampleCode.length, v + 1));
      i++;
      if (i > sampleCode.length) clearInterval(grow);
    }, 220);
    return () => clearInterval(grow);
  }, []);

  useEffect(() => {
    let idx = 0;
    const hi = setInterval(() => {
      setHighlightIndex(idx % sampleCode.length);
      idx++;
    }, 900);
    return () => clearInterval(hi);
  }, []);

  return (
    <div className={`rounded-lg border border-border bg-card p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-auto text-sm text-muted-foreground">Node.js · Runtime demo</div>
      </div>

      <pre className="text-sm font-mono leading-relaxed text-foreground overflow-x-auto">
        {sampleCode.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              highlightIndex === i ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
            }`}
          >
            {line}
          </div>
        ))}
      </pre>

      <div className="mt-3 text-sm font-mono text-muted-foreground bg-background/10 p-3 rounded">
        <span className="text-foreground">$</span> node server.js
        <div className="mt-1 text-xs text-primary">[INFO] Server listening on http://localhost:8080</div>
      </div>
    </div>
  );
}
