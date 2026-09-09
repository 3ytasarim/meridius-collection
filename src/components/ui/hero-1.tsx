"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ClientOnly } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { TextGradient } from "@/components/ui/text-gradient";

// three.js is browser-only — keep it out of the SSR graph.
const AnomalousMatter = React.lazy(() =>
  import("@/components/ui/anomalous-matter-hero").then((m) => ({
    default: m.AnomalousMatter,
  })),
);

interface HeroProps {
  eyebrow?: string;
  /** Plain part of the headline — revealed word by word from below. */
  titleLead: string;
  /** Emphasised tail of the headline — purple TextGradient. */
  titleAccent: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * About hero — copy on the left (quick word-by-word bottom-up reveal, then the
 * subtitle and CTA), the 21st.dev "anomalous-matter-hero" wireframe on the
 * right in vivid purple.
 */
const GRADIENT = ["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 38 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero({
  eyebrow,
  titleLead,
  titleAccent,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}: HeroProps) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(155deg,#EDE4FF_0%,#F6F1FF_38%,#FFFFFF_70%,#F7F3FF_100%)]">
      {/* faint vertical grid — same as the other page heroes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(99,48,199,0.07)_1px,transparent_1px)] [background-size:112px_100%]"
      />

      <div className="relative z-10 mx-auto grid min-h-[640px] max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-[190px] sm:px-8 lg:min-h-[720px] lg:grid-cols-2 lg:gap-8">
        {/* Copy — left */}
        <motion.div
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="max-w-xl"
        >
          {eyebrow && (
            <motion.p
              variants={item}
              className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-brand"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            variants={container}
            className="font-extrabold leading-[1.03] tracking-[-0.035em] text-[#2B2433]"
            style={{ fontSize: "clamp(2.75rem, 1.9rem + 3.9vw, 4.5rem)" }}
          >
            {titleLead
              .trim()
              .split(" ")
              .map((w, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  variants={item}
                  className="mr-[0.25em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
            <motion.span variants={item} className="inline-block">
              <TextGradient
                as="span"
                children={titleAccent}
                colors={[...GRADIENT]}
                duration={6}
                angle={90}
                className="font-extrabold pb-[0.12em] leading-[1.15]"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-pretty text-base font-bold leading-relaxed text-[#2B2433] sm:text-lg"
          >
            {subtitle}
          </motion.p>

          {ctaLabel && (
            <motion.div variants={item} className="mt-10 flex">
              <ArrowFillButton
                btnText={ctaLabel}
                href={ctaHref}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  navigate({ to: ctaHref });
                }}
                bgColor="#A77AF4"
                textColor="#ffffff"
                fillBgColor="#6330C7"
                fillTextColor="#ffffff"
                hoverFillBgColor="#6330C7"
                hoverFillTextColor="#ffffff"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Anomalous matter wireframe — right */}
        <div className="relative h-[360px] w-full sm:h-[460px] lg:h-[540px]">
          {/* vivid purple light-well behind the mesh */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background:radial-gradient(46%_46%_at_55%_50%,rgba(124,58,237,0.28),transparent_72%)]"
          />
          <ClientOnly fallback={null}>
            <React.Suspense fallback={null}>
              <AnomalousMatter className="absolute inset-0 h-full w-full" />
            </React.Suspense>
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}

export default Hero;
