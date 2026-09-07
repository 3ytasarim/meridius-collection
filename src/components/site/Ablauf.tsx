"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileUp, ScanSearch, Scale, Wallet, type LucideIcon } from "lucide-react";

import { TextGradient } from "@/components/ui/text-gradient";

type Step = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const steps: Step[] = [
  {
    title: "Übergabe",
    description:
      "Sie melden die offene Forderung digital — inklusive Belegen und bisherigem Schriftverkehr.",
    Icon: FileUp,
  },
  {
    title: "Analyse & Kontakt",
    description:
      "Unser System priorisiert den Fall, die erste Kontaktaufnahme mit der Schuldnerin oder dem Schuldner erfolgt zeitnah.",
    Icon: ScanSearch,
  },
  {
    title: "Beitreibung",
    description:
      "Zahlungsvereinbarung, Betreibung oder gerichtliches Verfahren — je nach Situation und in Absprache mit Ihnen.",
    Icon: Scale,
  },
  {
    title: "Auszahlung",
    description:
      "Eingehende Zahlungen werden transparent ausgewiesen und laufend an Sie weitergeleitet.",
    Icon: Wallet,
  },
];

export function Ablauf() {
  const reduce = useReducedMotion();

  return (
    <section id="ablauf" className="relative bg-white py-20 sm:py-24">
      <div className="relative mx-auto mb-12 max-w-3xl px-6 text-center sm:mb-16">
        <h2
          className="font-extrabold leading-[1.05] tracking-[-0.03em] text-[#2B2433]"
          style={{ fontSize: "clamp(1.54rem, 1.1rem + 1.98vw, 2.75rem)" }}
        >
          <TextGradient
            as="span"
            children="So läuft ein Fall"
            colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
            duration={6}
            angle={90}
            className="font-extrabold pb-[0.12em] leading-[1.15]"
          />{" "}
          bei uns
        </h2>
        <p className="mt-4 text-xl leading-relaxed text-muted-foreground sm:text-2xl">
          Vier klare Schritte — von der Übergabe bis zur Auszahlung.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.article
              key={step.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-[#ECE7F6] bg-white p-6 shadow-[0_1px_2px_rgba(20,18,38,0.04),0_16px_36px_-20px_rgba(99,48,199,0.16)] sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-[var(--brand-soft)] text-brand">
                <step.Icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-brand-dark sm:text-[1.35rem]">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
