import * as React from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useNavigate, ClientOnly } from "@tanstack/react-router";

import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { TextGradient } from "@/components/ui/text-gradient";

// three.js is browser-only — keep it out of the SSR graph.
const OrbGlobe = React.lazy(() =>
  import("@/components/ui/orb-globe").then((m) => ({ default: m.OrbGlobe })),
);

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AboutHero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(155deg,#EDE4FF_0%,#F6F1FF_38%,#FFFFFF_70%,#F7F3FF_100%)]">
      {/* faint vertical grid — same as the homepage hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(99,48,199,0.07)_1px,transparent_1px)] [background-size:112px_100%]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-[180px] sm:px-8 lg:grid-cols-2 lg:gap-10 lg:pb-28 lg:pt-[210px]">
        {/* Copy — left */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="max-w-xl"
        >
          <motion.h1
            variants={item}
            className="font-extrabold leading-[1.03] tracking-[-0.035em] text-[#2B2433]"
            style={{ fontSize: "clamp(2.75rem, 1.9rem + 3.9vw, 4.5rem)" }}
          >
            Ein neues Inkassobüro
            <br className="hidden sm:block" />{" "}
            <TextGradient
              as="span"
              children="mit klarer Haltung."
              colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
              duration={6}
              angle={90}
              className="font-extrabold pb-[0.12em] leading-[1.15]"
            />
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-pretty text-base font-bold leading-relaxed text-[#2B2433] sm:text-lg"
          >
            Meridius Collection ist die Inkassomarke der Meridius Management GmbH
            mit Sitz in Pfäffikon SZ.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <ArrowFillButton
              btnText="Kontakt aufnehmen"
              href="/kontakt"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                navigate({ to: "/kontakt" });
              }}
              bgColor="#ffffff"
              textColor="#6330C7"
              fillBgColor="#6330C7"
              fillTextColor="#ffffff"
              hoverFillBgColor="#6330C7"
              hoverFillTextColor="#ffffff"
            />
          </motion.div>
        </motion.div>

        {/* 3D orb — right */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto h-[320px] w-full max-w-[440px] sm:h-[440px] lg:mx-0 lg:h-[520px] lg:max-w-none"
        >
          {/* soft light-well behind the orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background:radial-gradient(46%_46%_at_55%_50%,rgba(124,69,232,0.18),transparent_72%)]"
          />
          <ClientOnly fallback={null}>
            <React.Suspense fallback={null}>
              <OrbGlobe className="absolute inset-0 h-full w-full" />
            </React.Suspense>
          </ClientOnly>
        </motion.div>
      </div>
    </section>
  );
}
