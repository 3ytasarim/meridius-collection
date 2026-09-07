"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * 01 — B2B & B2C Inkasso.
 * Editorial photo composition: one dominant main photo on the left, two smaller
 * photos stacked on the right whose right edge dissolves into the section
 * background via a real CSS mask (not an overlay). No cards, badges or effects —
 * the photos are the design.
 */
export function InkassoVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-4 lg:grid-cols-[minmax(0,3.35fr)_minmax(115px,1.3fr)] lg:items-stretch"
    >
      {/* Dominant main photo — purple coloured shadow behind it */}
      <div className="overflow-hidden rounded-2xl shadow-[0_28px_60px_-12px_rgba(99,48,199,0.45)]">
        <img
          src="/radission-us-_XeQ8XEWb4Q-unsplash.jpg"
          alt="Beraterin unterstützt eine Kundin bei einer offenen Forderung"
          loading="lazy"
          decoding="async"
          className="block aspect-[4/5] w-full object-cover"
          style={{ objectPosition: "52% 26%" }}
        />
      </div>

      {/* Two smaller photos — same system, right edge fades into the background */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:grid-rows-2">
        <div className="aspect-[5/4] overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:[-webkit-mask-image:linear-gradient(to_right,#000_0%,#000_74%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,#000_0%,#000_74%,transparent_100%)]">
          <img
            src="/sumup-YDe0nOZyLHI-unsplash.jpg"
            alt="Person klärt Unterlagen zu einer Rechnung"
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover"
            style={{ objectPosition: "38% 42%" }}
          />
        </div>
        <div className="aspect-[5/4] overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:[-webkit-mask-image:linear-gradient(to_right,#000_0%,#000_74%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,#000_0%,#000_74%,transparent_100%)]">
          <img
            src="/pexels-karola-g-5900074.jpg"
            alt="Familie bespricht eine offene Zahlung"
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover"
            style={{ objectPosition: "42% 45%" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default InkassoVisual;
