"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

import ArrowFillButton from "@/components/ui/arrow-fill-button";

/**
 * Closing CTA band above the footer — indebted.co style: a full-bleed deep
 * purple field with light-purple vertical lines drifting on the left, a centred
 * heading and the homepage hero button. Colours mapped to the Meridius purple.
 */
export function ZahlungCta() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#2E1774_0%,#452AAE_50%,#5837C8_100%)] py-20 sm:py-28">
      {/* left decorative vertical lines — very light purple, travelling up / down */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-40 overflow-hidden sm:w-56"
      >
        {[
          { left: 24, dur: 3.8, delay: 0, up: false },
          { left: 66, dur: 4.6, delay: 1.2, up: true },
          { left: 112, dur: 4.1, delay: 0.5, up: false },
        ].map((l, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px bg-white/[0.08]"
            style={{ left: l.left }}
          >
            {!reduce && (
              <motion.div
                className="absolute inset-x-[-1.5px] h-[36%] rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, #D9CBFA 45%, #EDE6FF 50%, #D9CBFA 55%, transparent 100%)",
                }}
                initial={{ y: l.up ? "180%" : "-60%" }}
                animate={{ y: l.up ? "-180%" : "280%" }}
                transition={{
                  duration: l.dur,
                  delay: l.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center">
        <h2
          className="font-bold leading-[1.1] tracking-tight text-white"
          style={{ fontSize: "clamp(1.7rem, 1.2rem + 2vw, 2.9rem)" }}
        >
          Fragen bleiben offen?
        </h2>

        <ArrowFillButton
          btnText="Team kontaktieren"
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
      </div>
    </section>
  );
}
