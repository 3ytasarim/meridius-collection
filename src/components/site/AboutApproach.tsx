"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Zap, Sparkles, ShieldCheck, type LucideIcon } from "lucide-react";

import { TextGradient } from "@/components/ui/text-gradient";
import { BlurredStaggerText } from "@/components/ui/blurred-stagger-text";
import { GlowCard } from "@/components/ui/spotlight-card";

type Feature = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

const features: Feature[] = [
  {
    id: "agil",
    title: "Agil statt behäbig",
    description:
      "Flache Hierarchien und digitale Prozesse von Beginn weg — keine gewachsenen Altlasten, keine Papierberge.",
    Icon: Zap,
  },
  {
    id: "tech",
    title: "Technologie als Werkzeug",
    description:
      "KI unterstützt unsere Fallbearbeitung, ersetzt aber nicht die fachliche und rechtliche Beurteilung durch Menschen.",
    Icon: Sparkles,
  },
  {
    id: "fair",
    title: "Fair gegenüber beiden Seiten",
    description:
      "Wir kommunizieren transparent mit Schuldnerinnen und Schuldnern und suchen tragfähige Lösungen statt reinem Druck.",
    Icon: ShieldCheck,
  },
];

const GRADIENT = ["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"] as const;

export function AboutApproach() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-bold leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 1.4rem + 2vw, 3rem)" }}
          >
            <TextGradient
              as="span"
              children="Was uns von klassischen Inkassobüros unterscheidet"
              colors={[...GRADIENT]}
              duration={6}
              angle={90}
              className="font-bold pb-[0.12em] leading-[1.15]"
            />
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : i * 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full"
            >
              <GlowCard
                glowColor="purple"
                customSize
                className="flex h-full w-full flex-col gap-0 p-6 shadow-[0_1px_2px_rgba(20,18,38,0.04),0_18px_40px_-24px_rgba(99,48,199,0.14)] md:p-8"
              >
                <div className="flex size-10 items-center justify-center rounded-lg border border-brand/15 bg-[var(--brand-soft)] text-brand">
                  <f.Icon className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold md:text-base">
                  <TextGradient
                    as="span"
                    children={f.title}
                    colors={[...GRADIENT]}
                    duration={6}
                    angle={90}
                    className="font-semibold"
                  />
                </h3>
                <BlurredStaggerText
                  text={f.description}
                  delay={0.25 + i * 0.55}
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                />
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
