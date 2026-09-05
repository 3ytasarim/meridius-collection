"use client";

import { Settings, Users, BarChart3, Lightbulb, Target } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const features = [
  {
    icon: Settings,
    title: "AI Campaign Optimization",
    desc: "Automatically analyzes ad performance and adjusts targeting for optimal results",
  },
  {
    icon: Users,
    title: "AI Audience Segmentation",
    desc: "Divides audiences into refined segments based on behavior, demographics, and interests",
    highlight: true,
  },
  {
    icon: BarChart3,
    title: "AI Ad Budget Allocation",
    desc: "Automatically manages and allocates ad budgets based on campaign performance",
  },
  {
    icon: Lightbulb,
    title: "AI Creative Insights",
    desc: "Analyzes creative elements like images, videos, and text to boost engagement",
  },
  {
    icon: Target,
    title: "AI Performance Prediction",
    desc: "Predicts campaign outcomes using historical data and market trends",
  },
];

/**
 * Light background wash used by this hero — a faint diagonal hairline grid
 * masked to the top, plus a soft brand-purple radial glow. Re-usable on its
 * own behind any light section.
 */
export function FeatureHeroBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--brand)_10%,transparent)_0px_1px,transparent_1px_9px)] [mask-image:radial-gradient(ellipse_80%_55%_at_50%_0%,#000_60%,transparent_110%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_6%,transparent_42%,color-mix(in_oklab,var(--brand-light)_30%,transparent)_100%)]" />
    </div>
  );
}

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  highlight,
}: {
  icon: typeof Settings;
  title: string;
  desc: string;
  highlight?: boolean;
}) => (
  <div
    className={cn(
      "group flex flex-col items-center transition-all duration-200",
      highlight && "md:scale-105",
    )}
  >
    <div
      className={cn(
        "mb-6 flex size-12 items-center justify-center rounded-full transition-colors duration-200",
        highlight
          ? "bg-brand-accent text-white shadow-xl shadow-brand/25"
          : "bg-brand-soft text-brand group-hover:bg-brand-light/25",
      )}
    >
      <Icon className="size-6" />
    </div>
    <h3 className="mb-3 text-xl font-bold tracking-tight text-[#2B2433]">
      {title}
    </h3>
    <p className="mx-auto max-w-xs text-pretty text-sm leading-relaxed text-[#5b5566]">
      {desc}
    </p>
  </div>
);

export const FeatureHero = () => {
  return (
    <section className="relative min-h-screen bg-white px-6 py-24">
      <FeatureHeroBackdrop />

      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-[#2B2433] md:text-5xl">
            Empower Your Business <br /> with AI-Driven Precision
          </h1>
          <p className="mx-auto mb-20 max-w-2xl text-pretty text-lg text-[#5b5566]">
            Leverage cutting-edge AI tools to optimize campaigns, allocate
            budgets, and unlock actionable insights—all in one platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-3">
          {features.slice(0, 3).map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}

          <div className="flex flex-col justify-center gap-x-12 gap-y-16 md:col-span-3 md:flex-row">
            {features.slice(3).map((f, i) => (
              <div key={i} className="md:w-1/3">
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHero;
