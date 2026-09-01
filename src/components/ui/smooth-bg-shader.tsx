import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

interface SmoothBgShaderProps {
  colors?: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  offsetX?: number;
  className?: string;
  veilClassName?: string;
}

/**
 * Animated mesh-gradient background layer.
 * Renders client-side only (WebGL) and fills its positioned parent.
 */
export function SmoothBgShader({
  colors = ["#6330C7", "#7C45E8", "#A77AF4", "#F4EFFF", "#FFFFFF"],
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.35,
  offsetX = 0.08,
  className = "",
  veilClassName = "bg-white/55",
}: SmoothBgShaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <MeshGradient
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        speed={speed}
        offsetX={offsetX}
        style={{ width: "100%", height: "100%" }}
      />
      <div className={`absolute inset-0 ${veilClassName}`} />
    </div>
  );
}

export default SmoothBgShader;
