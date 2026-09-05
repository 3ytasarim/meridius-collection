"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type NeuralVortexBackgroundProps = {
  className?: string;
  /** RGB (0–1) of the vortex threads. Default is a light violet. */
  color?: [number, number, number];
  /** Overall canvas opacity. */
  opacity?: number;
};

/**
 * Interactive neural-vortex WebGL backdrop
 * (21st.dev `minhxthanh/interactive-neural-vortex-background`), reduced to a
 * self-contained, container-sized background: no page chrome, purple threads,
 * thinned so it reads as a fine mesh.
 */
export function NeuralVortexBackground({
  className,
  color = [0.66, 0.48, 0.96],
  opacity = 0.9,
}: NeuralVortexBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvasEl = canvasRef.current;
    if (!container || !canvasEl) return;

    const gl = (canvasEl.getContext("webgl") ||
      canvasEl.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const vsSource = `
      precision mediump float;
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform vec3 u_color;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.2);
        }
        return res.x + res.y;
      }

      void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = .5 * pow(1. - p, 2.);
        float t = .001 * u_time;

        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.5);
        noise += pow(noise, 12.);
        noise = max(.0, noise - .62);        // higher cut => thinner threads
        noise *= (1. - length(vUv - .5));

        vec3 color = u_color * noise;
        gl_FragColor = vec4(color, noise);
      }
    `;

    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vertexShader = compile(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compile(fsSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRatio = gl.getUniformLocation(program, "u_ratio");
    const uPointer = gl.getUniformLocation(program, "u_pointer_position");
    const uColor = gl.getUniformLocation(program, "u_color");
    gl.uniform3f(uColor, color[0], color[1], color[2]);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      canvasEl.width = w * dpr;
      canvasEl.height = h * dpr;
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      gl.uniform1f(uRatio, canvasEl.width / canvasEl.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const render = () => {
      pointer.current.x += (pointer.current.tX - pointer.current.x) * 0.2;
      pointer.current.y += (pointer.current.tY - pointer.current.y) * 0.2;

      gl.uniform1f(uTime, performance.now());
      const rect = container.getBoundingClientRect();
      gl.uniform2f(
        uPointer,
        (pointer.current.x - rect.left) / (rect.width || 1),
        1 - (pointer.current.y - rect.top) / (rect.height || 1),
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      gl.uniform1f(uTime, 0);
      gl.uniform2f(uPointer, 0.5, 0.5);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else {
      render();
    }

    const onMove = (e: PointerEvent) => {
      pointer.current.tX = e.clientX;
      pointer.current.tY = e.clientY;
    };
    window.addEventListener("pointermove", onMove);

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [color, opacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ opacity }}
      />
    </div>
  );
}

export default NeuralVortexBackground;
