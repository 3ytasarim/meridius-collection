"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface AuroraBackgroundProps {
  /** Extra wrapper classes */
  className?: string;
  /** Content to render on top of the background */
  children?: React.ReactNode;
  /** Number of "star" points */
  starCount?: number;
  /** Two CSS-variable backed colors for the radial overlays */
  gradientColors?: [string, string];
  /** Pulse animation duration in seconds */
  pulseDuration?: number;
  /** ARIA label for the animated background */
  ariaLabel?: string;
  /** Dark (default, as-shipped) or a light-surface variant. */
  variant?: "dark" | "light";
}

const VARIANT = {
  dark: {
    surface: "bg-black text-slate-50",
    blend: "mix-blend-screen",
    blobs: ["bg-purple-600", "bg-fuchsia-600", "bg-indigo-700"],
    blobOpacity: ["opacity-40", "opacity-40", "opacity-30"],
    star: "h-[3px] w-[3px] bg-white shadow-[0_0_6px_1px_rgba(255,255,255,0.8)]",
  },
  light: {
    surface: "bg-[#F3EEFC] text-[#2B2433]",
    blend: "mix-blend-multiply",
    blobs: ["bg-brand-accent", "bg-[#b45cf5]", "bg-brand"],
    blobOpacity: ["opacity-50", "opacity-50", "opacity-40"],
    star: "h-[3px] w-[3px] bg-brand shadow-[0_0_7px_2px_rgba(99,48,199,0.5)]",
  },
} as const;

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className = "",
  children,
  starCount = 50,
  gradientColors = [
    "var(--aurora-color1, rgba(168,85,247,0.2))",
    "var(--aurora-color2, rgba(79,70,229,0.2))",
  ],
  pulseDuration = 10,
  ariaLabel = "Animated aurora background",
  variant = "dark",
}) => {
  const [colorA, colorB] = gradientColors;
  const v = VARIANT[variant];

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden",
        v.surface,
        className,
      )}
    >
      {/* Background layers (hidden from screen readers) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Pulsing radial gradients */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(circle, ${colorA} 0%, transparent 80%),
              radial-gradient(circle, ${colorB} 0%, transparent 80%)
            `,
            backgroundSize: "100% 100%",
            animation: `pulse ${pulseDuration}s infinite`,
          }}
        />

        {/* Blurred color blobs */}
        <motion.div
          className={cn("absolute inset-0", v.blend)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className={cn(
              "absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full blur-3xl filter",
              v.blobs[0],
              v.blobOpacity[0],
            )}
            animate={{ x: [-50, 50, -50], y: [-20, 20, -20], scale: [1, 1.2, 1] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={cn(
              "absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full blur-3xl filter",
              v.blobs[1],
              v.blobOpacity[1],
            )}
            animate={{ x: [50, -50, 50], y: [20, -20, 20], scale: [1, 1.3, 1] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={cn(
              "absolute left-1/3 top-1/3 h-1/3 w-1/3 rounded-full blur-3xl filter",
              v.blobs[2],
              v.blobOpacity[2],
            )}
            animate={{ x: [20, -20, 20], y: [-30, 30, -30], rotate: [0, 360, 0] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Twinkling stars */}
        {Array.from({ length: starCount }).map((_, i) => (
          <motion.div
            key={i}
            className={cn("absolute rounded-full", v.star)}
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              opacity: 0,
            }}
            animate={{ opacity: [0, Math.random() * 0.4 + 0.6, 0] }}
            transition={{
              duration: Math.random() * 2.5 + 2.5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuroraBackground;
export { AuroraBackground };
