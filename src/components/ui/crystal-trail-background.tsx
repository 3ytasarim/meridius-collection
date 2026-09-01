"use client";

import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface CrystalTrailBackgroundProps {
  /** RGB triplet used for the crystal strokes/fills. */
  color?: string;
  maxCrystals?: number;
  className?: string;
}

/**
 * Canvas layer where crystalline polygons sprout along the cursor path
 * and fade out. Transparent background — fills its positioned parent.
 */
export function CrystalTrailBackground({
  color = "124, 69, 232",
  maxCrystals = 400,
  className,
}: CrystalTrailBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    let destroyed = false;
    let frame = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = (parent ?? canvas).getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    class Crystal {
      x: number;
      y: number;
      life = 1;
      size = Math.random() * 9 + 4;
      angle = Math.random() * Math.PI * 2;
      spin = (Math.random() - 0.5) * 0.1;
      vertices: { x: number; y: number }[] = [];

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const numVertices = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < numVertices; i++) {
          const a = (i / numVertices) * Math.PI * 2;
          const radius = Math.random() * this.size + this.size / 2;
          this.vertices.push({ x: Math.cos(a) * radius, y: Math.sin(a) * radius });
        }
      }

      update() {
        this.life -= 0.012;
        this.angle += this.spin;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle);
        c.beginPath();
        this.vertices.forEach((v, i) => {
          if (i === 0) c.moveTo(v.x, v.y);
          else c.lineTo(v.x, v.y);
        });

        c.closePath();
        c.strokeStyle = `rgba(${color}, ${this.life * 0.75})`;
        c.lineWidth = 1;
        c.stroke();
        c.fillStyle = `rgba(${color}, ${this.life * 0.12})`;
        c.fill();
        c.restore();
      }
    }

    let crystals: Crystal[] = [];
    let last = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = (parent ?? canvas).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      const speed = Math.hypot(x - last.x, y - last.y);
      const spawn = Math.min(Math.floor(speed / 5), 5);
      for (let i = 0; i < spawn; i++) {
        if (crystals.length < maxCrystals) crystals.push(new Crystal(x, y));
      }
      last = { x, y };
    };

    const animate = () => {
      if (destroyed) return;
      ctx.clearRect(0, 0, width, height);
      crystals = crystals.filter((c) => c.life > 0);
      for (const crystal of crystals) {
        crystal.update();
        crystal.draw(ctx);
      }
      frame = requestAnimationFrame(animate);
    };

    resize();
    animate();

    const ro = new ResizeObserver(resize);
    if (parent) ro.observe(parent);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
    };
  }, [color, maxCrystals]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-0 block", className)}
    />
  );
}

export default CrystalTrailBackground;
