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

    // fragment shader draws animated soft blobs based on time and resolution
    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_res;

      // hashed pseudo-random
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }

      // soft circle
      float circle(vec2 p, vec2 c, float r) {
        float d = length((p - c) / u_res);
        return smoothstep(r, r - 0.02, d);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy;
        float t = u_time * 0.001;

        // define few moving centers procedurally
        vec2 c1 = vec2(0.5 * u_res.x + 0.4 * u_res.x * sin(t * 0.12), 0.5 * u_res.y + 0.2 * u_res.y * cos(t * 0.08));
        vec2 c2 = vec2(0.5 * u_res.x + 0.5 * u_res.x * cos(t * 0.09 + 1.0), 0.5 * u_res.y + 0.3 * u_res.y * sin(t * 0.07 + 2.0));
        vec2 c3 = vec2(0.5 * u_res.x + 0.35 * u_res.x * sin(t * 0.14 + 3.0), 0.5 * u_res.y + 0.25 * u_res.y * cos(t * 0.11 + 1.0));

        float b1 = circle(uv, c1, 0.18);
        float b2 = circle(uv, c2, 0.16);
        float b3 = circle(uv, c3, 0.13);

        // color in electric cyan tones
        vec3 col = vec3(0.02, 0.09, 0.12) * 0.8; // dark base
        col += vec3(0.0, 0.85, 1.0) * (b1 * 0.6);
        col += vec3(0.0, 0.65, 0.85) * (b2 * 0.45);
        col += vec3(0.0, 0.45, 0.65) * (b3 * 0.35);

        // subtle vignette
        float d = length((uv - 0.5 * u_res) / u_res);
        col *= smoothstep(1.0, 0.4, d);

        gl_FragColor = vec4(col, clamp(b1 + b2 + b3, 0.0, 0.9));
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

    let running = true;

    const render = (t: number) => {
      if (!running) return;
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, t);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
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
