"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { SmoothBgShader } from "@/components/ui/smooth-bg-shader";

const THEMES = {
  primary: "from-[var(--brand-dark)] via-[var(--brand)] to-[var(--brand-dark)]",
  brand: "from-[var(--brand)] via-[var(--brand-accent)] to-[var(--brand)]",
  accent:
    "from-[var(--brand-accent)] via-[var(--brand-light)] to-[var(--brand-accent)]",
  light:
    "from-[var(--brand-light)] via-[var(--brand-accent)] to-[var(--brand)]",
} as const;

export type ThemeType = keyof typeof THEMES;

const SIZES = {
  sm: "min-h-64",
  md: "min-h-80",
  lg: "min-h-96",
} as const;

const VARIANTS = {
  default: "shadow-lg hover:shadow-2xl",
  minimal: "shadow-md hover:shadow-lg border border-white/10",
  premium: "shadow-xl hover:shadow-2xl ring-1 ring-white/20",
} as const;

const GRIDS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
} as const;

const GAPS = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
} as const;

export interface CardData {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  theme?: ThemeType;
  gradient?: string;
  cta?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface Card3DProps extends CardData {
  className?: string;
  size?: keyof typeof SIZES;
  variant?: keyof typeof VARIANTS;
}

export const Card3D: React.FC<Card3DProps> = ({
  title,
  description,
  icon,
  theme = "brand",
  gradient,
  cta,
  onClick,
  disabled = false,
  className,
  size = "md",
  variant = "premium",
}) => {
  const finalGradient = useMemo(
    () => gradient || THEMES[theme],
    [gradient, theme],
  );

  return (
    <div style={{ perspective: 1200 }} className={cn("h-full", className)}>
      <motion.article
        onClick={disabled ? undefined : onClick}
        style={{ transformStyle: "preserve-3d" }}
        className={cn(
          "relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-7 text-white transition-shadow duration-300",
          finalGradient,
          SIZES[size],
          VARIANTS[variant],
          onClick && !disabled && "cursor-pointer",
          disabled && "opacity-60",
        )}
      >
        {/* soft light sweep */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 1,
            background:
              "radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.22), transparent 60%)",
          }}
        />
        {/* animated mesh gradient inside the card */}
        <SmoothBgShader
          className="opacity-60 mix-blend-soft-light"
          veilClassName="bg-transparent"
          speed={0.3}
          distortion={0.9}
          swirl={0.7}
        />


        <div
          className="relative"
          style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        >
          {icon && (
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
              {icon}
            </div>
          )}
          <h3 className="text-xl font-bold leading-snug text-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            {description}
          </p>
        </div>

        {cta && (
          <div
            className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/90"
            style={{ transform: "translateZ(30px)" }}
          >
            <span>{cta}</span>
            <span className="transition-transform duration-300">→</span>
          </div>
        )}
      </motion.article>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 14 },
  },
};

export interface Card3DListProps {
  cards: CardData[];
  className?: string;
  columns?: keyof typeof GRIDS;
  gap?: keyof typeof GAPS;
  size?: keyof typeof SIZES;
  variant?: keyof typeof VARIANTS;
}

export const Card3DList: React.FC<Card3DListProps> = ({
  cards,
  className,
  columns = 4,
  gap = "md",
  size = "md",
  variant = "premium",
}) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className={cn("grid", GRIDS[columns], GAPS[gap], className)}
  >
    {cards.map((card) => (
      <motion.div key={card.id} variants={itemVariants} className="h-full">
        <Card3D {...card} size={size} variant={variant} />
      </motion.div>
    ))}
  </motion.div>
);

export default Card3DList;
