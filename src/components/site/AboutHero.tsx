import AuroraBackground from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text-fill";

export function AboutHero() {
  return (
    <div className="relative">
      <AuroraBackground
        variant="light"
        starCount={80}
        pulseDuration={7}
        gradientColors={["rgba(124,69,232,0.34)", "rgba(99,48,199,0.3)"]}
        ariaLabel="Über uns"
        className="min-h-[78vh] px-6 pb-32 pt-40 sm:pt-48"
      >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur-sm sm:text-xs">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-accent" />
          </span>
          Über uns
        </span>

        <h1
          className="mt-7 font-semibold leading-[1.06] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 1.8rem + 3.6vw, 4.25rem)" }}
        >
          <GradientText
            as="span"
            colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
          >
            Ein neues Inkassobüro
            <br className="hidden sm:block" /> mit klarer Haltung.
          </GradientText>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[#4c4658] sm:text-lg">
          Meridius Collection ist die Inkassomarke der Meridius Management GmbH
          mit Sitz in Pfäffikon SZ.
        </p>
      </div>
      </AuroraBackground>

      {/* wavy divider into the section below — keeps the aurora colour above */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-px left-0 z-20 block h-[64px] w-full sm:h-[96px]"
      >
        <path
          d="M0,58 C180,4 340,102 540,60 C720,22 900,2 1080,42 C1230,74 1350,64 1440,46 L1440,110 L0,110 Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}
