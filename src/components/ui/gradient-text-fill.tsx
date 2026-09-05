"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import React, { memo, useMemo } from "react";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  className?: string;
  children: ReactNode;
  as?: ElementType;
  /** Comma list of gradient stops. Palindromic lists loop seamlessly. */
  colors?: string;
  /** Sweep angle in degrees. */
  angle?: number;
  /** Seconds for one full sweep. */
  duration?: number;
  style?: CSSProperties;
}

/**
 * Text whose fill is a moving multi-stop gradient, clipped to the glyphs
 * (`background-clip: text`). The colours slide through the letters via the
 * shared `@keyframes gradient` (see styles.css).
 */
const GradientText = memo(function GradientText({
  className,
  children,
  as: Component = "span",
  colors = "#3b1178, #7c3aed, #a855f7, #c084fc, #a855f7, #7c3aed, #3b1178",
  angle = 115,
  duration = 5,
  style,
}: GradientTextProps) {
  const stops = useMemo(
    () => colors.split(",").map((c) => c.trim()).join(", "),
    [colors],
  );

  return (
    <Component
      className={cn(
        "animate-gradient bg-clip-text text-transparent [--bg-size:320%] bg-[length:var(--bg-size)_100%]",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${stops})`,
        animationDuration: `${duration}s`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
});

GradientText.displayName = "GradientText";

export { GradientText };
export default GradientText;
