"use client";

import type React from "react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type GradientBackgroundProps = React.ComponentProps<"div"> & {
  // Animation customization
  /** Colour stops swept across the frame. */
  gradients?: string[];
  animationDuration?: number;
  animationDelay?: number;
  /** Sweep angle of the gradient. */
  angle?: number;

  // Layout customization
  enableCenterContent?: boolean;

  // Visual customization
  overlay?: boolean;
  overlayOpacity?: number;
};

// Light, brand-purple palette — pale lavender → light lilac and back.
const Default_Gradients = [
  "#F7F2FF",
  "#EFE6FC",
  "#E4D4F7",
  "#D3BDEF",
  "#E4D4F7",
  "#EFE6FC",
  "#F7F2FF",
];

export function GradientBackground({
  children,
  className = "",
  gradients = Default_Gradients,
  animationDuration = 12,
  animationDelay = 0,
  angle = 135,
  enableCenterContent = true,
  overlay = false,
  overlayOpacity = 0.3,
}: GradientBackgroundProps) {
  const stops = gradients.join(", ");

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        className,
      )}
    >
      {/* Animated gradient background — CSS background-position sweep */}
      <div
        aria-hidden
        className="gradient-bg-anim absolute inset-0 animate-[var(--animate-gradient-bg)]"
        style={
          {
            backgroundImage: `linear-gradient(${angle}deg, ${stops})`,
            backgroundSize: "300% 300%",
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
          } as CSSProperties
        }
      />

      {/* Optional overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content wrapper */}
      {children &&
        (enableCenterContent ? (
          <div className="relative z-10 flex min-h-screen items-center justify-center">
            {children}
          </div>
        ) : (
          <div className="relative z-10">{children}</div>
        ))}
    </div>
  );
}

export default GradientBackground;
