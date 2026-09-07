import { cn } from "@/lib/utils";

/**
 * Flowing wireframe globe (21st.dev "globe" — the animated SVG only), recoloured
 * to the Meridius purple. Pure SVG + one dashoffset keyframe, no dependencies.
 */
export function Globe({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes meridius-globe-flow{from{stroke-dashoffset:0}to{stroke-dashoffset:-100}}" +
            "@media (prefers-reduced-motion:reduce){.meridius-globe *{animation:none!important}}",
        }}
      />
      <svg
        viewBox="0 0 300 300"
        className="meridius-globe h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mgBright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C45E8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A77AF4" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="mgDim" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6330C7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#A77AF4" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <g>
          {/* Latitude lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={`lat-${i}`}
              cx="150"
              cy="150"
              rx={120}
              ry={40 + i * 12}
              stroke="url(#mgDim)"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="5 5"
              style={{ animation: "meridius-globe-flow 10s linear infinite" }}
              opacity={0.8}
              transform="rotate(-25,150,150)"
            />
          ))}

          {/* Longitude lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={`lon-${i}`}
              d="M150,30 A120,120 0 0,1 150,270"
              stroke="url(#mgDim)"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="4 4"
              style={{
                animation: "meridius-globe-flow 12s linear infinite reverse",
              }}
              opacity={0.8}
              transform={`rotate(${i * 22.5},150,150)`}
            />
          ))}

          {/* Orbital trails */}
          <ellipse
            cx="150"
            cy="150"
            rx="140"
            ry="60"
            stroke="url(#mgBright)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10 10"
            style={{ animation: "meridius-globe-flow 14s linear infinite" }}
            opacity="1"
            transform="rotate(20,150,150)"
          />
          <ellipse
            cx="150"
            cy="150"
            rx="130"
            ry="50"
            stroke="url(#mgDim)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="12 12"
            style={{
              animation: "meridius-globe-flow 9s linear infinite reverse",
            }}
            opacity="0.9"
            transform="rotate(-40,150,150)"
          />
        </g>
      </svg>
    </div>
  );
}

export default Globe;
