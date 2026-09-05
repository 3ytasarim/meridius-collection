"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/gradient-text-fill";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type ParallaxFeaturePoint = { title: string; detail: ReactNode };

export type ParallaxFeature = {
  id: string | number;
  /** Big faded index, e.g. "01". */
  number?: string;
  /** Short category label shown as a pill. */
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  points?: ParallaxFeaturePoint[];
  /** Right-hand visual — an <img>, a gradient panel, anything. */
  visual: ReactNode;
  reverse?: boolean;
};

/**
 * One scroll-linked row. Hooks live here (not in a `.map`) so the Rules of
 * Hooks hold for any number / order of features.
 */
function FeatureRow({ feature }: { feature: ParallaxFeature }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-10 py-10 md:min-h-[52vh] md:flex-row md:gap-20 md:py-14",
        feature.reverse && "md:flex-row-reverse",
      )}
    >
      <motion.div style={{ y }} className="w-full max-w-xl">
        {feature.number || feature.eyebrow ? (
          <div className="flex items-center gap-4">
            {feature.number ? (
              <span className="text-[2.75rem] font-bold leading-none tracking-tight text-brand/15 tabular-nums">
                {feature.number}
              </span>
            ) : null}
            {feature.eyebrow ? (
              <span className="rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                {feature.eyebrow}
              </span>
            ) : null}
          </div>
        ) : null}

        <h3
          className="mt-4 font-semibold leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(1.9rem, 1.4rem + 1.9vw, 2.7rem)" }}
        >
          <GradientText
            as="span"
            colors="#2b1361, #6d28d9, #a855f7, #b98cf5, #6d28d9, #2b1361"
          >
            {feature.title}
          </GradientText>
        </h3>

        <div className="mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-brand via-brand-accent to-brand-light" />

        <p className="mt-5 leading-relaxed text-[#5b5566]">
          {feature.description}
        </p>
        {feature.points && feature.points.length > 0 ? (
          <Accordion type="single" collapsible className="mt-6 w-full">
            {feature.points.map((p, i) => (
              <AccordionItem
                key={p.title}
                value={`${feature.id}-${i}`}
                className="border-brand/10"
              >
                <AccordionTrigger className="gap-3 py-3 text-[11px] font-bold uppercase tracking-[0.02em] text-[#2B2433] hover:no-underline md:text-[12px]">
                  <span className="flex items-center gap-2 text-left leading-tight md:whitespace-nowrap">
                    <img
                      src="/favicon.ico"
                      alt=""
                      className="size-3.5 shrink-0 rounded-full"
                    />
                    {p.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-3 ps-[26px] text-[13px] leading-snug text-[#5b5566]">
                  {p.detail}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : null}
      </motion.div>

      <motion.div
        style={{ opacity, clipPath }}
        className="w-full max-w-md overflow-hidden rounded-3xl"
      >
        {feature.visual}
      </motion.div>
    </div>
  );
}

export function ParallaxFeatureSection({
  features,
  className,
}: {
  features: ParallaxFeature[];
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}>
      {features.map((f) => (
        <FeatureRow key={f.id} feature={f} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Faithful demo from the source component.                           */
/* ------------------------------------------------------------------ */
const demoSections: ParallaxFeature[] = [
  {
    id: 1,
    title: "Feature 1",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
    visual: (
      <img
        src="https://cdn.cosmos.so/6c4a7829-d16a-4a58-9ab9-93fbb3bacb9e.?format=jpeg"
        alt="Feature 1"
        className="size-80 object-cover"
      />
    ),
  },
  {
    id: 2,
    title: "Feature 2",
    reverse: true,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
    visual: (
      <img
        src="https://cdn.cosmos.so/f827788c-038d-4257-8167-759e819f846d?format=jpeg"
        alt="Feature 2"
        className="size-80 object-cover"
      />
    ),
  },
  {
    id: 3,
    title: "Feature 3",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
    visual: (
      <img
        src="https://cdn.cosmos.so/20351bef-4a9c-4dcc-81d8-e59c84058944?format=jpeg"
        alt="Feature 3"
        className="size-80 object-cover"
      />
    ),
  },
];

export const Component = () => {
  return (
    <div>
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <h1 className="max-w-2xl text-center text-6xl">
          PARALLAX SCROLL FEATURE SECTION
        </h1>
        <p className="mt-20 flex items-center gap-1.5 text-sm">
          SCROLL <ArrowDown size={15} />
        </p>
      </div>
      <ParallaxFeatureSection features={demoSections} />
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <h1 className="text-8xl">The End</h1>
      </div>
    </div>
  );
};

export default Component;
