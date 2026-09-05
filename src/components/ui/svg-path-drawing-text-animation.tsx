import { useId } from "react";

import { cn } from "@/lib/utils";

type PathDrawingTextProps = {
  /** Each entry is one line of the headline. */
  lines: string[];
  className?: string;
  /** Stroke gradient — start colour. */
  from?: string;
  /** Stroke gradient — end colour. */
  to?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number | string;
  strokeWidth?: number;
  /** Seconds for one full draw pass. */
  duration?: number;
  /** Loop forever, or draw once and hold. */
  loop?: boolean;
  /** After the outline draws, fade a solid fill in (keeps small counters legible). Defaults to `!loop`. */
  fillReveal?: boolean;
  /** Dash length — must exceed the longest glyph outline. */
  dash?: number;
};

/**
 * SVG path-drawing text (21st.dev — svg-path-drawing-text-animation).
 * Renders the headline as stroked outlines that "draw" in via an
 * animated `stroke-dashoffset`. Multi-line aware.
 */
export function PathDrawingText({
  lines,
  className,
  from = "#4c1d95",
  to = "#6d28d9",
  fontSize = 88,
  fontFamily = 'Inter, "Helvetica Neue", Arial, sans-serif',
  fontWeight = 700,
  strokeWidth = 1.6,
  duration = 3.4,
  loop = false,
  fillReveal,
  dash = 1400,
}: PathDrawingTextProps) {
  const gradientId = useId();
  const revealFill = fillReveal ?? !loop;

  const longest = lines.reduce((n, l) => Math.max(n, l.length), 1);
  const lineHeight = fontSize * 1.16;
  const padX = fontSize * 0.28;
  const padY = fontSize * 0.42;
  const width = Math.ceil(longest * fontSize * 0.52 + padX * 2);
  const height = Math.ceil(lines.length * lineHeight + padY * 2);
  const firstY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  return (
    <svg
      role="img"
      aria-label={lines.join(" ")}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn("block h-auto w-full overflow-visible", className)}
    >
      <title>{lines.join(" ")}</title>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>

      <text
        x={width / 2}
        y={firstY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={revealFill ? `url(#${gradientId})` : "none"}
        fillOpacity={revealFill ? 0 : undefined}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        paintOrder="stroke"
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        style={{ letterSpacing: "-0.02em" }}
        strokeDasharray={dash}
        strokeDashoffset={dash}
      >
        {lines.map((line, i) => (
          <tspan key={i} x={width / 2} dy={i === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
        <animate
          attributeName="stroke-dashoffset"
          values={`${dash};0`}
          keyTimes="0;1"
          dur={`${duration}s`}
          calcMode="spline"
          keySplines="0.25 0.1 0.25 1"
          repeatCount={loop ? "indefinite" : 1}
          fill={loop ? "remove" : "freeze"}
        />
        {revealFill && (
          <animate
            attributeName="fill-opacity"
            values="0;1"
            keyTimes="0;1"
            dur="0.7s"
            begin={`${(duration * 0.78).toFixed(2)}s`}
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1"
            fill="freeze"
          />
        )}
      </text>
    </svg>
  );
}

/** Faithful default demo from the source component. */
export default function PathAnimation() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <PathDrawingText
        lines={["PATH DRAWING"]}
        from="#f093fb"
        to="#f5576c"
        loop
        duration={8}
        dash={1000}
        strokeWidth={2}
        className="max-w-full"
      />
    </div>
  );
}
