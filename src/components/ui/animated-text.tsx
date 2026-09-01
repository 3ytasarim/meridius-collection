import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  fontSize?: number | string;
  minWeight?: number;
  maxWeight?: number;
  animationDuration?: number;
  delayMultiplier?: number;
  className?: string;
  style?: CSSProperties;
}

export function AnimatedText({
  text,
  fontSize = 150,
  minWeight = 100,
  maxWeight = 900,
  animationDuration = 1.5,
  delayMultiplier = 0.25,
  className,
  style,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll("span");
    const numLetters = spans.length;

    spans.forEach((span, i) => {
      const mappedIndex = i - numLetters / 2;
      span.style.animationDelay = `${mappedIndex * delayMultiplier}s`;
    });
  }, [text, delayMultiplier]);

  const characters = text.split("").map((char, index) => (
    <span
      key={index}
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        animation: `breath ${animationDuration}s ease-in-out infinite alternate`,
        fontVariationSettings: `"wght" ${minWeight}`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className={cn(className)}
      style={
        {
          fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
          lineHeight: 1.1,
          fontFamily: "'Inter', sans-serif",
          whiteSpace: "nowrap",
          "--breath-min": minWeight,
          "--breath-max": maxWeight,
          ...style,
        } as CSSProperties
      }
    >
      {characters}
    </div>
  );
}
