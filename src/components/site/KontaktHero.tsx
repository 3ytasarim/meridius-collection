import { NeuralVortexBackground } from "@/components/interactive-neural-vortex-background";
import { GradientText } from "@/components/ui/gradient-text-fill";

export function KontaktHero() {
  return (
    <section className="relative isolate flex min-h-[78vh] w-full items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#5b21b6_0%,#6d28d9_45%,#8b5cf6_100%)] px-6 pb-28 pt-40 sm:pt-48">
      <NeuralVortexBackground color={[0.82, 0.68, 1.0]} opacity={0.85} />

      {/* subtle centre darkening for text legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(62%_52%_at_50%_45%,rgba(30,10,66,0.3),transparent_75%)]"
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:text-xs">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Kontakt
        </span>

        <h1
          className="mt-7 font-semibold leading-[1.06] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 1.8rem + 3.6vw, 4.25rem)" }}
        >
          <GradientText
            as="span"
            colors="#ffffff, #f1e7ff, #d9c6f7, #ffffff, #d9c6f7, #f1e7ff, #ffffff"
          >
            Sprechen wir über Ihren Fall.
          </GradientText>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
          Ob einzelne Forderung oder Sammelinkasso mit hohem Fallvolumen — wir
          melden uns zeitnah zurück.
        </p>
      </div>
    </section>
  );
}
