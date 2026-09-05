import { Link } from "@tanstack/react-router";

import { GlslHills } from "@/components/ui/glsl-hills";
import { GradientText } from "@/components/ui/gradient-text-fill";
import { Button3D } from "@/components/ui/button-3d";
import { TextGradient } from "@/components/ui/text-gradient";

export function ZahlungHero() {
  return (
    <section className="relative isolate min-h-[680px] w-full overflow-hidden bg-[#EFE9FB]">
      {/* Animated wire-terrain backdrop — medium violet lines */}
      <GlslHills color="#C4B5FD" className="-z-10" />

      {/* soft top fade so the lines melt into the sky under the header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-[#EFE9FB] to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-5xl flex-col items-center px-5 pb-24 pt-[210px] text-center">
        {/* readability scrim behind the copy */}
        <div className="pointer-events-none absolute left-1/2 top-[50%] -z-[1] h-[100%] w-[115%] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(closest-side,rgba(247,243,253,0.72),transparent_72%)]" />

        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur-sm sm:text-xs">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-accent" />
          </span>
          Für Schuldner:innen
        </span>

        <h1
          className="mt-7 max-w-4xl font-semibold leading-[1.06] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 1.8rem + 3.6vw, 4.25rem)" }}
        >
          <GradientText
            as="span"
            colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
          >
            Post von Meridius erhalten?
          </GradientText>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#4c4658] sm:text-lg">
          Hier finden Sie in wenigen Minuten Antworten auf die häufigsten Fragen —
          und erfahren, wie Sie am schnellsten eine Lösung finden.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button3D asChild size="lg">
            <Link to="/kontakt">
              <TextGradient
                children="Chat-Assistent öffnen"
                as="span"
                colors={["#FFFFFF", "#F4EFFF", "#A77AF4", "#FFFFFF"]}
                duration={5}
                angle={135}
                className="font-semibold"
              />
            </Link>
          </Button3D>
          <Button3D asChild variant="outline" size="lg">
            <Link to="/kontakt">
              <TextGradient
                children="Direkt kontaktieren"
                as="span"
                colors={["#FFFFFF", "#F4EFFF", "#A77AF4", "#FFFFFF"]}
                duration={5}
                angle={135}
                className="font-semibold"
              />
            </Link>
          </Button3D>
        </div>
      </div>
    </section>
  );
}
