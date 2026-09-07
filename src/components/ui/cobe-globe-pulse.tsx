"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import createGlobe from "cobe";

interface PulseMarker {
  id: string;
  location: [number, number];
  delay: number;
}

interface GlobePulseProps {
  markers?: PulseMarker[];
  className?: string;
  speed?: number;
}

/** Spread across the map so markers stay visible as the globe turns. */
const defaultMarkers: PulseMarker[] = [
  { id: "pulse-1", location: [47.2, 8.79], delay: 0 }, // Pfäffikon SZ
  { id: "pulse-2", location: [51.51, -0.13], delay: 0.3 }, // London
  { id: "pulse-3", location: [40.71, -74.01], delay: 0.6 }, // New York
  { id: "pulse-4", location: [-23.55, -46.63], delay: 0.9 }, // São Paulo
  { id: "pulse-5", location: [6.52, 3.38], delay: 1.2 }, // Lagos
  { id: "pulse-6", location: [-33.92, 18.42], delay: 1.5 }, // Kapstadt
  { id: "pulse-7", location: [25.2, 55.27], delay: 1.8 }, // Dubai
  { id: "pulse-8", location: [19.08, 72.88], delay: 2.1 }, // Mumbai
  { id: "pulse-9", location: [1.35, 103.82], delay: 2.4 }, // Singapur
  { id: "pulse-10", location: [35.68, 139.69], delay: 2.7 }, // Tokio
  { id: "pulse-11", location: [-33.87, 151.21], delay: 3.0 }, // Sydney
];

const PULSE = "#7C45E8";

// Start with the Pfäffikon SZ marker facing the viewer (on load / refresh).
// cobe's location→angle mapping: phi = π − (long·π/180 − π/2).
const INITIAL_PHI = Math.PI - ((8.79 * Math.PI) / 180 - Math.PI / 2);
const INITIAL_THETA = 0.38;

/**
 * COBE globe with pulsing markers (21st.dev "shuding/cobe-globe-pulse"),
 * recoloured to the Meridius purple. Draggable, auto-rotating.
 */
export function GlobePulse({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
}: GlobePulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e: ReactPointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let phi = INITIAL_PHI;

    const init = () => {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: INITIAL_PHI,
        theta: INITIAL_THETA,
        dark: 1,
        diffuse: 1.4,
        mapSamples: 32000,
        mapBrightness: 8,
        baseColor: [0.42, 0.28, 0.72],
        markerColor: [0.72, 0.56, 0.98],
        glowColor: [0.55, 0.42, 0.9],
        markerElevation: 0,
        markers: markers.map((m) => ({
          location: m.location,
          size: 0.03,
          id: m.id,
        })),
        arcs: [],
        arcColor: [0.72, 0.56, 0.98],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.75,
      });

      const animate = () => {
        if (!isPausedRef.current) phi += speed;
        globe?.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: INITIAL_THETA + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      };
      animate();
      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = "1";
      });
    };

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if ((entries[0]?.contentRect.width ?? 0) > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      globe?.destroy();
    };
  }, [markers, speed]);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <style>{`
        @keyframes cobe-pulse-expand {
          0% { transform: scale(0.3); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(center)",
            left: "anchor(center)",
            translate: "-50% 50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: "opacity 0.4s, filter 0.4s",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              border: `2px solid ${PULSE}`,
              borderRadius: "50%",
              opacity: 0,
              animation: `cobe-pulse-expand 2s ease-out infinite ${m.delay}s`,
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              border: `2px solid ${PULSE}`,
              borderRadius: "50%",
              opacity: 0,
              animation: `cobe-pulse-expand 2s ease-out infinite ${m.delay + 0.5}s`,
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              background: PULSE,
              borderRadius: "50%",
              boxShadow: `0 0 0 3px #fff, 0 0 0 5px ${PULSE}`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default GlobePulse;
