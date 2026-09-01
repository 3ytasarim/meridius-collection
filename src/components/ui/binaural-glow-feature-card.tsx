import React from "react";

import { AnimatedText } from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: React.ReactNode;
  eyebrow?: string;
  title: string;
  paragraph: string;
  className?: string;
  /** delay (s) for the periodic "I'm here" shake so cards fire in sequence */
  attentionDelay?: number;
}

export const FeatureCard = ({
  icon,
  eyebrow,
  title,
  paragraph,
  className,
  attentionDelay = 0,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-[1.5px] shadow-[0_18px_45px_-30px_color-mix(in_oklab,var(--brand)_70%,transparent)] transition-transform duration-500 hover:-translate-y-1",
        "feature-card-attention",
        className,
      )}
      style={{
        animation: `card-attention 9s ease-in-out ${attentionDelay}s infinite`,
      }}
    >
      {/* Animated binaural glow background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, var(--brand), var(--brand-accent), var(--brand-light), var(--brand-accent), var(--brand))",
          backgroundSize: "300% 300%",
          animation: "binauralFlow 9s ease infinite",
        }}
      />

      {/* Rotating conic border light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, var(--brand-light) 12%, var(--brand-accent) 22%, transparent 38%, transparent 62%, var(--brand) 74%, var(--brand-light) 84%, transparent 100%)",
            animation: `border-spin 6s linear infinite`,
            animationDelay: `${attentionDelay}s`,
          }}
        />
      </div>

      {/* Inner mask */}
      <div className="relative h-full rounded-[calc(1rem-1px)] bg-card p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[calc(1rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(80% 70% at 50% 0%, color-mix(in oklab, var(--brand-light) 18%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="relative">
          {icon ? (
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand)_10%,transparent)] text-primary">
              {icon}
            </div>
          ) : null}

          {eyebrow ? (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
          ) : null}

          <h3 className="whitespace-nowrap text-xl font-semibold tracking-tight sm:text-[1.35rem]">
            <AnimatedText text={title} textClassName="font-semibold tracking-tight" />
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
