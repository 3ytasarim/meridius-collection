"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { TextGradient } from "@/components/ui/text-gradient";
import { BlurredStaggerText } from "@/components/ui/blurred-stagger-text";

type Feature = {
  eyebrow: string;
  title: [string, string];
  paragraph: string;
};

const features: Feature[] = [
  {
    eyebrow: "Agil",
    title: ["Kurze Wege,", "schnelle Entscheide"],
    paragraph:
      "Flache Strukturen statt Aktenstau: Fälle werden digital erfasst, priorisiert und ohne Umwege bearbeitet.",
  },
  {
    eyebrow: "KI-gestützt",
    title: ["Intelligente", "Fallsteuerung"],
    paragraph:
      "Algorithmen unterstützen bei Priorisierung, Kontaktzeitpunkt und Eskalationsstufe — die Entscheidung bleibt beim Team.",
  },
  {
    eyebrow: "Fair",
    title: ["Beide Seiten", "im Blick"],
    paragraph:
      "Transparente Kommunikation und realistische Lösungen statt Druck ohne Perspektive — im Interesse einer nachhaltigen Einigung.",
  },
];

const GRADIENT = ["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"] as const;

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background py-14 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-primary/10" />

      <div className="mx-auto grid max-w-7xl gap-y-12 px-6 sm:px-8 lg:grid-cols-3 lg:gap-y-0">
        {features.map((f, i) => (
          <motion.article
            key={f.eyebrow}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : i * 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              i > 0 &&
                "lg:border-l lg:border-dashed lg:border-primary/25 lg:pl-12 xl:pl-16",
              i < features.length - 1 && "lg:pr-12 xl:pr-16",
            )}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-bold tabular-nums text-primary">
                0{i + 1}
              </span>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {f.eyebrow}
              </p>
            </div>

            <h2 className="mt-5 whitespace-nowrap text-[clamp(1.7rem,2vw,2.35rem)] font-extrabold leading-[1.14]">
              <TextGradient
                as="span"
                children={f.title[0]}
                colors={[...GRADIENT]}
                duration={6}
                angle={90}
                className="font-extrabold"
              />
              <br />
              <TextGradient
                as="span"
                children={f.title[1]}
                colors={[...GRADIENT]}
                duration={6}
                angle={90}
                className="font-extrabold"
              />
            </h2>

            <BlurredStaggerText
              text={f.paragraph}
              delay={i * 0.55}
              className="mt-7 max-w-[38ch] whitespace-normal text-base leading-7 text-muted-foreground sm:text-[1.0625rem]"
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
