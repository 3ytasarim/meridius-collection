import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";

import { Button3D } from "@/components/ui/button-3d";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { TextGradient } from "@/components/ui/text-gradient";

// WebGL studio is browser-only — never statically imported into the SSR graph.
const VolumetricStudio = React.lazy(() =>
  import("@/components/ui/volumetric-studio").then((m) => ({
    default: m.VolumetricStudio,
  })),
);

function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto flex h-full w-full items-end justify-center px-6 pb-16 sm:pb-24"
    >
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <AnimatedGradientText className="text-white/90">
          <span className="relative mr-2 inline-flex h-1.5 w-1.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-light)] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 animate-gradient rounded-full bg-[linear-gradient(to_right,var(--brand-light),#ffffff,var(--brand-accent),var(--brand-light))] bg-[length:var(--bg-size)_100%]" />
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_6px_color-mix(in_oklab,var(--brand-accent)_60%,transparent)] sm:text-xs">
            Meridius Management GmbH · Pfäffikon SZ
          </span>
        </AnimatedGradientText>


        <h1
          className="mt-8 max-w-4xl font-semibold leading-[0.98] tracking-tight text-primary-foreground"
          style={{ fontSize: "clamp(3rem, 2rem + 5vw, 6rem)" }}
        >
          Klare Linie.
          <br />
          Faire Lösung.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
          Meridius Collection verbindet modernes, KI-gestütztes Forderungsmanagement mit
          einem fairen Umgang zwischen Gläubiger und Schuldner — schnell, digital und
          rechtlich sauber.
        </p>

        <div className="mt-10 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
          <Button3D asChild size="lg" className="w-full sm:w-auto">
            <Link to="/" hash="leistungen">
              <TextGradient
                children="Leistungen entdecken"
                as="span"
                colors={["#FFFFFF", "#F4EFFF", "#A77AF4", "#FFFFFF"]}
                duration={5}
                angle={135}
                className="font-semibold"
              />
            </Link>
          </Button3D>
          <Button3D asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link to="/" hash="kontakt">
              <TextGradient
                children="Kontakt aufnehmen"
                as="span"
                colors={["#2B2433", "#6330C7", "#7C45E8", "#2B2433"]}
                duration={5}
                angle={135}
                className="font-semibold"
              />
            </Link>
          </Button3D>
        </div>
      </div>
    </motion.div>
  );
}



export function Hero() {
  return (
    <section id="hero" className="relative isolate min-h-[760px] bg-brand-dark">
      <ClientOnly
        fallback={
          <div className="absolute inset-0 bg-brand-dark">
            <HeroContent />
          </div>
        }
      >
        <React.Suspense
          fallback={
            <div className="absolute inset-0 bg-brand-dark">
              <HeroContent />
            </div>
          }
        >
          <VolumetricStudio
            className="absolute inset-0 h-full min-h-[760px]"
            lightColor="199,170,255"
          >
            {/* brand purple tint over the black studio */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  "radial-gradient(80% 60% at 50% 40%, color-mix(in oklab, var(--brand-accent) 90%, transparent) 0%, transparent 75%), linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--brand) 60%, transparent) 100%)",
              }}
            />
            <HeroContent />
          </VolumetricStudio>
        </React.Suspense>
      </ClientOnly>
    </section>
  );
}
