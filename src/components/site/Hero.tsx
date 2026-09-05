import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate, ClientOnly } from "@tanstack/react-router";

import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { TextGradient } from "@/components/ui/text-gradient";

// WebGL sphere is browser-only — keep `three` out of the SSR graph.
const OrbitalSphere = React.lazy(() =>
  import("@/components/orbital-sphere").then((m) => ({
    default: m.OrbitalSphereBackground,
  })),
);



export function Hero() {
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(155deg,#EDE4FF_0%,#F6F1FF_38%,#FFFFFF_70%,#F7F3FF_100%)]"
    >
      {/* faint vertical grid — indebted-style */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(99,48,199,0.07)_1px,transparent_1px)] [background-size:112px_100%]"
      />

      <div className="relative z-10 mx-auto grid min-h-[860px] max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-40 sm:px-8 lg:min-h-[940px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6">
        {/* Copy — left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <h1
            className="mt-6 font-extrabold leading-[1.03] tracking-[-0.035em] text-[#2B2433]"
            style={{ fontSize: "clamp(2.75rem, 1.9rem + 3.9vw, 4.5rem)" }}
          >
            Klare Linie.
            <br />
            <TextGradient
              as="span"
              children="Faire Lösung."
              colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
              duration={6}
              angle={90}
              className="font-extrabold pb-[0.12em] leading-[1.15]"
            />
          </h1>

          <p className="mt-18 max-w-md text-pretty text-base font-bold leading-relaxed text-[#2B2433] sm:text-lg">
            Meridius Collection verbindet modernes, KI-gestütztes
            Forderungsmanagement mit einem fairen Umgang zwischen Gläubiger und
            Schuldner — schnell, digital und rechtlich sauber.
          </p>

          <div className="mt-11 flex flex-col gap-4 sm:flex-row">
            <ArrowFillButton
              btnText="Leistungen entdecken"
              href="/leistungen"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                navigate({ to: "/leistungen" });
              }}
              bgColor="#6330C7"
              textColor="#ffffff"
              fillBgColor="#7C45E8"
              fillTextColor="#ffffff"
              hoverFillBgColor="#7C45E8"
              hoverFillTextColor="#ffffff"
            />
            <ArrowFillButton
              btnText="Kontakt aufnehmen"
              href="/kontakt"
              onClick={(e) => {
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
          </div>
        </motion.div>

        {/* Orbital sphere — right column, fully inside the hero */}
        <div className="relative h-[360px] w-full sm:h-[460px] lg:h-[760px]">
          {/* soft light-well so the particles read on the bright surface */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_50%_at_55%_50%,rgba(43,15,92,0.16),transparent_70%)]"
          />
          <ClientOnly fallback={null}>
            <React.Suspense fallback={null}>
              <OrbitalSphere
                haloOpacity={0.32}
                orbitOpacity={0.3}
                className="left-1/2 top-1/2 aspect-square h-full max-h-full w-auto -translate-x-1/2 -translate-y-1/2"
              />
            </React.Suspense>
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
