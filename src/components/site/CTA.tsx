"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { AnimatedText } from "@/components/ui/animated-text";

function GlowBadge({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "absolute z-10 flex items-center gap-2 overflow-hidden rounded-xl bg-[linear-gradient(120deg,#7C45E8_0%,#9B6BF0_100%)] px-2.5 py-1.5 shadow-[0_14px_28px_-14px_rgba(46,24,92,0.4),0_0_10px_-1px_rgba(124,69,232,0.3)] ring-1 ring-inset ring-white/15",
        className,
      )}
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
        {icon}
      </span>
      {reduce ? (
        <span className="whitespace-nowrap text-[12px] font-semibold leading-tight text-white">
          {label}
        </span>
      ) : (
        <motion.span
          className="inline-block whitespace-nowrap bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_42%,#E4D6FF_49%,#ffffff_51%,#E4D6FF_53%,#ffffff_60%,#ffffff_100%)] bg-[length:220%_100%] bg-clip-text text-[12px] font-semibold leading-tight text-transparent"
          animate={{ backgroundPositionX: ["120%", "-20%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}

export function CTA() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  return (
    <section id="cta" className="relative bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Wide, thin horizontal band — desktop ≈ 4.4:1; stacks on tablet / mobile */}
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#E4D6FF_0%,#EEE6FF_44%,#F6F1FF_100%)] px-6 py-8 ring-1 ring-inset ring-brand/12 sm:px-8 lg:px-10 lg:py-5">
          {/* animated purple glow — directly behind the left visual */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[8%] top-1/2 h-56 w-[46%] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,69,232,0.32),transparent_75%)] blur-2xl"
            {...(reduce
              ? {}
              : {
                  animate: { opacity: [0.45, 0.85, 0.45], scale: [0.95, 1.08, 0.95] },
                  transition: {
                    duration: 6.5,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  },
                })}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 left-1/4 size-56 rounded-full bg-[radial-gradient(circle,rgba(167,122,244,0.28),transparent_70%)] blur-2xl"
            {...(reduce
              ? {}
              : {
                  animate: { opacity: [0.35, 0.65, 0.35], scale: [1.05, 1, 1.05] },
                  transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  },
                })}
          />

          <div className="relative grid gap-6 lg:grid-cols-[46fr_54fr] lg:items-center lg:gap-10">
            {/* Visual — left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-last min-w-0 lg:order-first"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_26px_50px_-24px_rgba(46,24,92,0.35)] lg:aspect-auto lg:h-[204px] xl:h-[224px]">
                <img
                  src="/pexels-mikhail-nilov-6963017.jpg"
                  alt="Handschlag nach einer fairen Einigung zu einer offenen Forderung"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "50% 45%" }}
                />
              </div>

              <GlowBadge
                icon={<Zap className="size-4" strokeWidth={2} aria-hidden />}
                label="Schnell & digital"
                className="-left-1 -top-1 sm:-left-2 sm:-top-2"
              />
              <GlowBadge
                icon={<ShieldCheck className="size-4" strokeWidth={2} aria-hidden />}
                label="Fair & rechtssicher"
                className="-bottom-1 -right-1 sm:-bottom-2 sm:-right-2"
              />
            </motion.div>

            {/* Content — right, vertically centred */}
            <div className="relative flex min-w-0 flex-col justify-center">
              <span className="inline-flex w-fit items-center rounded-full bg-brand-dark px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Kontakt
              </span>

              <AnimatedText
                text="Offene Forderung?"
                fontSize="clamp(1.2rem, 0.8rem + 1.05vw, 1.75rem)"
                minWeight={300}
                maxWeight={800}
                animationDuration={2}
                delayMultiplier={0.18}
                className="mt-2 tracking-tight text-brand-dark"
              />
              <AnimatedText
                text="Lassen Sie uns das klären."
                fontSize="clamp(1.2rem, 0.8rem + 1.05vw, 1.75rem)"
                minWeight={300}
                maxWeight={800}
                animationDuration={2}
                delayMultiplier={0.18}
                className="mt-0.5 tracking-tight text-brand-dark"
              />

              <p className="mt-2 max-w-md text-[13px] leading-tight text-muted-foreground sm:text-[13.5px]">
                Übergeben Sie Ihren Fall digital — wir prüfen, nehmen Kontakt auf
                und halten Sie über jeden Schritt auf dem Laufenden.
              </p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ArrowFillButton
                  btnText="Fall einreichen"
                  size="sm"
                  href="/kontakt"
                  className="!w-full !min-w-0"
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
                  className="!w-full !min-w-0"
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
