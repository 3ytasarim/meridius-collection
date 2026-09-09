"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

export interface Feature {
  step: string;
  title?: string;
  content: string;
  image: string;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

/**
 * FeatureSteps (21st.dev prebuiltui/feature-sections) — a self-advancing stepper:
 * the numbered list on the left highlights the active step while a progress
 * timer runs, and the matching image slides up on the right. Recoloured to the
 * Meridius purple; `next/image` swapped for a plain `<img>`.
 */
export function FeatureSteps({
  features,
  className,
  title,
  autoPlayInterval = 3000,
  imageHeight = "h-[220px] md:h-[320px] lg:h-[420px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval]);

  return (
    <div className={cn("mx-auto w-full max-w-6xl", className)}>
      {title ? (
        <h2 className="mb-10 text-center text-3xl font-bold text-[#241E33] md:text-4xl">
          {title}
        </h2>
      ) : null}

      <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:items-center md:gap-12">
        <div className="order-2 space-y-8 md:order-1">
          {features.map((feature, index) => (
            <motion.div
              key={feature.step}
              className="flex items-center gap-5 sm:gap-6"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-transform md:size-11",
                  index === currentFeature
                    ? "scale-110 border-brand bg-brand text-white"
                    : "border-[#D9D0EC] bg-[var(--brand-soft)] text-brand",
                )}
              >
                {index <= currentFeature ? (
                  <span className="text-base font-bold">✓</span>
                ) : (
                  <span className="text-base font-semibold">{index + 1}</span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#241E33] md:text-xl">
                  {feature.title ?? feature.step}
                </h3>
                <p className="text-sm leading-relaxed text-[#4C4658] md:text-[15px]">
                  {feature.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className={cn(
            "relative order-1 overflow-hidden rounded-2xl shadow-[0_28px_60px_-18px_rgba(99,48,199,0.4)] ring-1 ring-brand/10 md:order-2",
            imageHeight,
          )}
        >
          <AnimatePresence mode="wait">
            {features.map(
              (feature, index) =>
                index === currentFeature && (
                  <motion.div
                    key={feature.step}
                    className="absolute inset-0 overflow-hidden rounded-2xl"
                    initial={{ y: 100, opacity: 0, rotateX: -20 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -100, opacity: 0, rotateX: 20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={feature.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/60 to-transparent" />
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default FeatureSteps;
