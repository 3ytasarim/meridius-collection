"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface ConfettiPiece {
  x: number;
  y: number;
  z: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
  rotation: number;
  rotationSpeed: number;
  baseSize: number;
  opacity: number;
  shape: "rectangle" | "circle" | "star" | "diamond";
  color: string;
  floatPhase: number;
  swayAmplitude: number;
  bobAmplitude: number;
  fadeStart: number;
  isFading: boolean;
}

type ConfettiBackgroundProps = {
  className?: string;
  /** Fill colours (any CSS colour). Defaults to shades of the brand purple. */
  colors?: string[];
  /** Fixed piece count. When omitted it scales with the container area. */
  count?: number;
  /** Pieces per this many px² of container (lower = denser). */
  density?: number;
};

// Mixed shades of the brand purple.
const PURPLE_SHADES = [
  "rgba(99, 48, 199, 0.85)", //  #6330C7 brand
  "rgba(124, 69, 232, 0.8)", //  #7C45E8 accent
  "rgba(139, 92, 246, 0.8)", //  #8B5CF6
  "rgba(167, 122, 244, 0.75)", // #A77AF4 light
  "rgba(196, 181, 253, 0.75)", // #C4B5FD
  "rgba(91, 33, 182, 0.8)", //   #5B21B6 deep
  "rgba(221, 214, 254, 0.7)", // #DDD6FE pale
];

export function ConfettiBackground({
  className,
  colors = PURPLE_SHADES,
  count,
  density = 14000,
}: ConfettiBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const confettiRef = useRef<ConfettiPiece[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    const resizeCanvas = () => {
      const nw = container.clientWidth || 1;
      const nh = container.clientHeight || 1;
      // re-seed when the box first gets a real size or changes a lot
      const bigChange =
        Math.abs(nw - w) > w * 0.25 + 8 || Math.abs(nh - h) > h * 0.25 + 8;
      w = nw;
      h = nh;
      canvas.width = w;
      canvas.height = h;
      if (bigChange) initConfetti();
    };

    const pieceCount = () =>
      count ?? Math.min(500, Math.max(60, Math.round((w * h) / density)));

    const initConfetti = () => {
      confettiRef.current = [];
      const n = pieceCount();
      for (let i = 0; i < n; i++) {
        confettiRef.current.push({
          x: -w * 0.2 + Math.random() * w * 1.4,
          // spread across the whole height (plus a little above) so the field
          // fills the entire section, not just the top
          y: Math.random() * (h * 1.1) - h * 0.05,
          z: Math.random() * 1500 + 800,
          velocityX: (Math.random() - 0.5) * 0.6,
          velocityY: Math.random() * 0.3 + 0.1,
          velocityZ: -(Math.random() * 0.6 + 0.3),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
          baseSize: Math.random() * 12 + 6,
          opacity: 1,
          shape: (["rectangle", "circle", "star", "diamond"] as const)[
            Math.floor(Math.random() * 4)
          ],
          color: colors[Math.floor(Math.random() * colors.length)],
          floatPhase: Math.random() * Math.PI * 2,
          swayAmplitude: Math.random() * 0.5 + 0.2,
          bobAmplitude: Math.random() * 0.3 + 0.1,
          fadeStart: 0,
          isFading: false,
        });
      }
    };

    const drawConfetti = (piece: ConfettiPiece) => {
      const perspective = 800;
      const scale = perspective / (perspective + piece.z);
      const projectedX = piece.x + (piece.x - w / 2) * (1 - scale);
      const projectedY = piece.y + (piece.y - h / 2) * (1 - scale);

      if (scale <= 0.01 || scale > 2) return;

      const size = piece.baseSize * scale;
      const opacity = Math.min(piece.opacity * scale * 1.5, 1);

      ctx.save();
      ctx.translate(projectedX, projectedY);
      ctx.rotate(piece.rotation);
      ctx.globalAlpha = opacity;

      const shadowIntensity = Math.min(scale * 0.3, 0.2);
      ctx.shadowColor = `rgba(45, 20, 90, ${shadowIntensity})`;
      ctx.shadowBlur = scale * 4;
      ctx.shadowOffsetX = scale * 3;
      ctx.shadowOffsetY = scale * 3;

      ctx.fillStyle = piece.color;

      switch (piece.shape) {
        case "rectangle": {
          const rw = size * 1.5;
          const rh = size * 0.8;
          ctx.fillRect(-rw / 2, -rh / 2, rw, rh);
          break;
        }
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "star": {
          ctx.beginPath();
          const starSize = size * 0.7;
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * starSize;
            const y = Math.sin(angle) * starSize;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            const innerAngle = ((i + 0.5) * Math.PI) / 3;
            ctx.lineTo(
              Math.cos(innerAngle) * starSize * 0.5,
              Math.sin(innerAngle) * starSize * 0.5,
            );
          }
          ctx.closePath();
          ctx.fill();
          break;
        }
        case "diamond": {
          ctx.beginPath();
          const d = size * 0.8;
          ctx.moveTo(0, -d);
          ctx.lineTo(d * 0.6, 0);
          ctx.lineTo(0, d);
          ctx.lineTo(-d * 0.6, 0);
          ctx.closePath();
          ctx.fill();
          break;
        }
      }

      ctx.restore();
    };

    const updateConfetti = () => {
      confettiRef.current.forEach((piece) => {
        piece.floatPhase += 0.02;
        const swayX = Math.sin(piece.floatPhase) * piece.swayAmplitude * 0.3;
        const bobY = Math.cos(piece.floatPhase * 0.7) * piece.bobAmplitude * 0.2;

        piece.x += piece.velocityX + swayX;
        piece.y += piece.velocityY + bobY;
        piece.z += piece.velocityZ;
        piece.rotation += piece.rotationSpeed;

        const turbulence = Math.max(0, 1 - piece.z / 1500) * 0.08;
        piece.velocityX += (Math.random() - 0.5) * turbulence * 0.5;
        piece.velocityY += (Math.random() - 0.5) * turbulence * 0.5;
        piece.velocityX += (Math.random() - 0.5) * 0.005;
        piece.velocityY += (Math.random() - 0.5) * 0.005;
        piece.velocityX *= 0.999;
        piece.velocityY *= 0.999;
        piece.velocityY += 0.0005;
        piece.velocityZ *= 1.0005;

        if (
          !piece.isFading &&
          (piece.z <= 200 ||
            piece.x < -150 ||
            piece.x > w + 150 ||
            piece.y > h + 150)
        ) {
          piece.isFading = true;
          piece.fadeStart = piece.opacity;
        }
        if (piece.isFading) piece.opacity -= 0.02;

        if (piece.opacity <= 0) {
          piece.x = -w * 0.2 + Math.random() * w * 1.4;
          // respawn anywhere in the section so density stays even top-to-bottom
          piece.y = Math.random() * (h * 1.1) - h * 0.05;
          piece.z = Math.random() * 800 + 1200;
          piece.velocityX = (Math.random() - 0.5) * 0.6;
          piece.velocityY = Math.random() * 0.3 + 0.1;
          piece.velocityZ = -(Math.random() * 0.6 + 0.3);
          piece.floatPhase = Math.random() * Math.PI * 2;
          piece.opacity = 1;
          piece.isFading = false;
          piece.fadeStart = 0;
        }
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      confettiRef.current.forEach(drawConfetti);
    };

    const animate = () => {
      updateConfetti();
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    if (!confettiRef.current.length) initConfetti();

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(container);

    if (reduceMotion) {
      render();
    } else {
      animate();
    }

    return () => {
      ro.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [colors, count, density]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default ConfettiBackground;
