"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Zap } from "lucide-react";

import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { AnimatedText } from "@/components/ui/animated-text";

export function CTA() {
  const navigate = useNavigate();

  return (
    <section id="cta" className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#E9DEFF_0%,#F1E9FF_44%,#F7F2FF_100%)] px-6 py-10 ring-1 ring-inset ring-brand/10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            {/* Visual — left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-last lg:order-first"
            >
              <div className="overflow-hidden rounded-3xl shadow-[0_30px_60px_-24px_rgba(46,24,92,0.35)]">
                <img
                  src="/pexels-mikhail-nilov-6963017.jpg"
                  alt="Handschlag nach einer fairen Einigung zu einer offenen Forderung"
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/3] w-full object-cover"
                  style={{ objectPosition: "50% 40%" }}
                />
              </div>

              {/* top badge — icon + label */}
              <div className="absolute -left-3 -top-3 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_16px_32px_-14px_rgba(46,24,92,0.4)] sm:-left-5 sm:-top-5">
                <span className="flex size-8 items-center justify-center rounded-full bg-[var(--brand-soft)] text-brand">
                  <Zap className="size-[18px]" strokeWidth={1.9} aria-hidden />
                </span>
                <span className="text-[13px] font-semibold leading-tight text-brand-dark">
                  Schnell &amp; digital
                </span>
              </div>

              {/* bottom badge — icon + label */}
              <div className="absolute -bottom-4 -right-3 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_20px_40px_-18px_rgba(46,24,92,0.4)] sm:-right-5">
                <span className="flex size-8 items-center justify-center rounded-full bg-[var(--brand-soft)] text-brand">
                  <ShieldCheck className="size-[18px]" strokeWidth={1.9} aria-hidden />
                </span>
                <span className="text-[13px] font-semibold leading-tight text-brand-dark">
                  Fair &amp; rechtssicher
                </span>
              </div>
            </motion.div>

            {/* Content — right */}
            <div className="relative">
              <span className="inline-flex items-center rounded-full bg-brand-dark px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Kontakt
              </span>

              <AnimatedText
                text="Offene Forderung?"
                fontSize="clamp(1.5rem, 1rem + 2vw, 2.5rem)"
                minWeight={300}
                maxWeight={800}
                animationDuration={2}
                delayMultiplier={0.18}
                className="mt-5 tracking-tight text-brand-dark"
              />
              <AnimatedText
                text="Lassen Sie uns das klären."
                fontSize="clamp(1.5rem, 1rem + 2vw, 2.5rem)"
                minWeight={300}
                maxWeight={800}
                animationDuration={2}
                delayMultiplier={0.18}
                className="mt-1 tracking-tight text-brand-dark"
              />

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                Übergeben Sie Ihren Fall digital — wir prüfen, nehmen Kontakt auf
                und halten Sie über jeden Schritt auf dem Laufenden.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ArrowFillButton
                  btnText="Fall einreichen"
                  size="sm"
                  href="/kontakt"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    navigate({ to: "/kontakt" });
                  }}
                  bgColor="#A77AF4"
                  textColor="#ffffff"
                  fillBgColor="#6330C7"
                  fillTextColor="#ffffff"
                  hoverFillBgColor="#6330C7"
                  hoverFillTextColor="#ffffff"
                />
                <ArrowFillButton
                  btnText="Mehr zu den Leistungen"
                  size="sm"
                  href="/leistungen"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    navigate({ to: "/leistungen" });
                  }}
                  bgColor="#ffffff"
                  textColor="#6330C7"
                  fillBgColor="#6330C7"
                  fillTextColor="#ffffff"
                  hoverFillBgColor="#6330C7"
                  hoverFillTextColor="#ffffff"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
