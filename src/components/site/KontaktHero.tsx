import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ClientOnly } from "@tanstack/react-router";

import { TextGradient } from "@/components/ui/text-gradient";

// three.js is browser-only — keep it out of the SSR graph.
const GravitationalMesh = React.lazy(() =>
  import("@/components/ui/gravitational-mesh").then((m) => ({
    default: m.GravitationalMesh,
  })),
);

const LEAD = "Sprechen wir über ";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};
const word: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const letter: Variants = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

export function KontaktHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[620px] w-full items-center justify-center overflow-hidden bg-[linear-gradient(155deg,#EDE4FF_0%,#F6F1FF_38%,#FFFFFF_70%,#F7F3FF_100%)] lg:min-h-[700px]">
      {/* faint vertical grid — same as the homepage hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(99,48,199,0.07)_1px,transparent_1px)] [background-size:112px_100%]"
      />

      {/* gravitational wireframe mesh */}
      <ClientOnly fallback={null}>
        <React.Suspense fallback={null}>
          <GravitationalMesh className="absolute inset-0 z-0 h-full w-full" />
        </React.Suspense>
      </ClientOnly>

      {/* readability light-well behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[80%] w-[min(760px,92%)] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(closest-side,rgba(247,243,253,0.82),transparent_75%)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-[168px] text-center sm:px-8">
        <motion.h1
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="font-extrabold leading-[1.03] tracking-[-0.035em] text-[#2B2433]"
          style={{ fontSize: "clamp(2.75rem, 1.9rem + 3.9vw, 4.5rem)" }}
        >
          {LEAD.trim()
            .split(" ")
            .map((w, wi) => (
              <React.Fragment key={wi}>
                <motion.span
                  variants={word}
                  className="inline-block whitespace-nowrap"
                >
                  {[...w].map((char, ci) => (
                    <motion.span
                      key={ci}
                      variants={letter}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>{" "}
              </React.Fragment>
            ))}
          <motion.span variants={letter} className="inline-block">
            <TextGradient
              as="span"
              children="Ihren Fall."
              colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
              duration={6}
              angle={90}
              className="font-extrabold pb-[0.12em] leading-[1.15]"
            />
          </motion.span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-md text-pretty text-base font-bold leading-relaxed text-[#2B2433] sm:text-lg"
        >
          Ob einzelne Forderung oder Sammelinkasso mit hohem Fallvolumen — wir
          melden uns zeitnah zurück.
        </motion.p>
      </div>
    </section>
  );
}
