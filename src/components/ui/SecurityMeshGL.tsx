import { useEffect, useRef } from 'react';

// WebGL-based animated background to replace CPU canvas mesh.
// Draws a few soft moving blobs using a fragment shader for very efficient GPU rendering.
export default function SecurityMeshGL({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    let anim = 0;

    const resize = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    // simple vertex shader
    const vsSource = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // fragment shader draws a grid of moving 'bits' — lightweight matrix-like effect
    // Supports a uniform 'u_intensity' to control overall animation intensity/speed
    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_res;
      uniform float u_intensity;

      // pseudo-random generator
      float hash(float n) { return fract(sin(n) * 43758.5453); }

      void main() {
        vec2 uv = gl_FragCoord.xy;
        float t = u_time * 0.001;

        // grid configuration
        float cellSize = max(4.0, u_res.x / 140.0); // adapt to width (higher density)
        vec2 cell = floor(uv / cellSize);
        vec2 frac = mod(uv, cellSize) / cellSize;

        // compute a value per cell that animates vertically like falling bits
        float colIndex = cell.x;
        float seed = hash(colIndex);
        // vertical offset per column, speed scaled by intensity
        float speed = (0.6 + 0.8 * hash(colIndex + 1.0)) * u_intensity;
        float offset = fract(t * 0.2 * speed + seed * 10.0);

        // chance for a lit bit at this cell depending on a pseudo-random sequence
        float pattern = hash(colIndex * 12.9898 + cell.y * 78.233 + floor(t * speed));
        float lit = step(0.88 - 0.15 * u_intensity, pattern); // intensity affects density

        // create a vertical streak based on offset and frac.y
        float streak = smoothstep(0.0, 0.12, abs(frac.y - offset));

        // final intensity mixes lit and streak and soft edges
        float intensity = mix(0.0, 1.0, lit * streak) * u_intensity;
        intensity += 0.04 * smoothstep(0.0, 0.1, 1.0 - length(frac - 0.5));

        // color: electric cyan glow
        vec3 base = vec3(0.01, 0.03, 0.06);
        vec3 col = base + vec3(0.0, 0.85, 1.0) * intensity * 0.95;

        // subtle horizontal scanline effect
        float scan = smoothstep(0.0, 0.5, sin(uv.y * 0.5) * 0.5 + 0.5);
        col *= mix(1.0, 0.98, scan * 0.06);

        // vignette to focus center
        float d = length((uv - 0.5 * u_res) / u_res);
        col *= smoothstep(1.0, 0.25, d);

        gl_FragColor = vec4(col, clamp(intensity, 0.0, 1.0));
      }
    `;

    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn('Shader compile error:', gl.getShaderInfoLog(sh));
      }
      return sh;
    };

    const prog = gl.createProgram()!;
    const vs = compile(vsSource, gl.VERTEX_SHADER);
    const fs = compile(fsSource, gl.FRAGMENT_SHADER);
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(prog));
    }
    gl.useProgram(prog);

    // full-screen triangle
    const posLoc = gl.getAttribLocation(prog, 'a_pos');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // two triangles covering clipspace
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(prog, 'u_time');
    const resLoc = gl.getUniformLocation(prog, 'u_res');
    const intensityLoc = gl.getUniformLocation(prog, 'u_intensity');

    let running = true;
    // intensity controlled by UI: map string -> multiplier
    const mapIntensity = (v: string | null) => (v === 'calm' ? 0.6 : v === 'intense' ? 1.6 : 1.0);
    const intensityRef = { current: mapIntensity(typeof window !== 'undefined' ? window.localStorage.getItem('bgIntensity') : null) };

    const onIntensity = (e: any) => {
      const val = e?.detail ?? (typeof e === 'string' ? e : null);
      intensityRef.current = mapIntensity(val);
    };
    // listen for custom events
    window.addEventListener('bg-intensity-changed', onIntensity as EventListener);

    // also listen to storage events (cross-tab)
    const onStorage = (ev: StorageEvent) => {
      if (ev.key === 'bgIntensity') onIntensity(ev.newValue);
    };
    window.addEventListener('storage', onStorage);

    const render = (t: number) => {
      if (!running) return;
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, t);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(intensityLoc, intensityRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      anim = requestAnimationFrame(render);
    };

    // visibility handling
    const onVis = () => {
      if (document.hidden) {
        running = false;
        if (anim) cancelAnimationFrame(anim);
      } else {
        running = true;
        anim = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVis);

    // start
    anim = requestAnimationFrame(render);

    return () => {
      running = false;
      if (anim) cancelAnimationFrame(anim);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('bg-intensity-changed', onIntensity as EventListener);
      window.removeEventListener('storage', onStorage);
      try {
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      } catch (e) {}
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 w-full h-full ${className}`} />
  );
}
