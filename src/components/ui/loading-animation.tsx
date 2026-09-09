"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WhirlpoolLoaderProps {
  /** Number of spiral segments */
  segments?: number;
  /** Number of rotations of the spiral */
  rotations?: number;
  /** Colour of the spiral dots */
  color?: string;
  /** Classes for the <svg> — set the size here (e.g. `size-20 sm:size-24`) */
  className?: string;
}

/**
 * Whirlpool loader (21st.dev "loading-animation"): a rotating spiral of dots
 * that scale in/out on an infinite loop. Recoloured to the Meridius purple.
 * Sizing is driven entirely by `className`, so it stays responsive.
 */
export function WhirlpoolLoader({
  segments = 46,
  rotations = 5,
  color = "#7C45E8",
  className,
}: WhirlpoolLoaderProps) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      preserveAspectRatio="xMidYMid meet"
      className={cn("block", className)}
      role="presentation"
      aria-hidden
    >
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const angle = (i / segments) * Math.PI * 2 * rotations;
          const radius = 5 + (90 * i) / segments;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={2 + (i / segments) * 3}
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: (i / segments) * 2,
                repeat: Infinity,
                repeatType: "reverse" as const,
                repeatDelay: 1,
              }}
            />
          );
        })}
      </motion.g>
    </svg>
  );
}

export default WhirlpoolLoader;
