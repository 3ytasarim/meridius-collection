import * as React from "react";
import { motion } from "framer-motion";
import { Link, ClientOnly } from "@tanstack/react-router";

import { Button3D } from "@/components/ui/button-3d";
import { TextGradient } from "@/components/ui/text-gradient";

// WebGL sphere is browser-only — keep `three` out of the SSR graph.
const OrbitalSphere = React.lazy(() =>
  import("@/components/orbital-sphere").then((m) => ({
    default: m.OrbitalSphereBackground,
  })),
);

const btnGradient = ["#FFFFFF", "#F4EFFF", "#A77AF4", "#FFFFFF"];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(160deg,#2a0e5e_0%,#42198a_45%,#5b21b6_100%)]"
    >
      {/* faint descending grid — indebted-style */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:112px_100%,100%_150px]"
      />
      {/* dark well behind the sphere so the particles glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-3/4 bg-[radial-gradient(52%_60%_at_50%_2%,rgba(15,4,40,0.7),transparent_72%)]"
      />

      {/* Orbital sphere — centred, bleeding off the top */}
      <ClientOnly fallback={null}>
        <React.Suspense fallback={null}>
          <OrbitalSphere className="left-1/2 top-0 aspect-square w-[112vw] max-w-[980px] -translate-x-1/2 -translate-y-[16%]" />
        </React.Suspense>
      </ClientOnly>

      {/* Content — left aligned */}
      <div className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl flex-col justify-center px-6 pb-24 pt-40 sm:px-8 lg:min-h-[760px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-light" />
            Meridius Management GmbH · Pfäffikon SZ
          </p>

          <h1
            className="mt-6 font-bold leading-[1.02] tracking-tight text-white"
            style={{ fontSize: "clamp(2.75rem, 2rem + 3.6vw, 4rem)" }}
          >
            Klare Linie.
            <br />
            <span className="text-brand-light">Faire Lösung.</span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
            Meridius Collection verbindet modernes, KI-gestütztes
            Forderungsmanagement mit einem fairen Umgang zwischen Gläubiger und
            Schuldner — schnell, digital und rechtlich sauber.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button3D asChild size="lg">
              <Link to="/leistungen">
                <TextGradient
                  children="Leistungen entdecken"
                  as="span"
                  colors={btnGradient}
                  duration={5}
                  angle={135}
                  className="font-semibold"
                />
              </Link>
            </Button3D>
            <Button3D asChild variant="outline" size="lg">
              <Link to="/kontakt">
                <TextGradient
                  children="Kontakt aufnehmen"
                  as="span"
                  colors={btnGradient}
                  duration={5}
                  angle={135}
                  className="font-semibold"
                />
              </Link>
            </Button3D>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
