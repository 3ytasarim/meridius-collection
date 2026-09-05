import { MarqueeAnimation } from "@/components/ui/marquee-effect";

const Sep = () => (
  <span
    aria-hidden="true"
    className="mx-10 inline-block translate-y-[0.14em] opacity-60"
  >
    *
  </span>
);

const Labels = () => (
  <>
    Kernleistung
    <Sep />
    Vorgerichtlich &amp; gerichtlich
    <Sep />
    Technologie
    <Sep />
    Spezialisierung
    <Sep />
  </>
);

/** Two counter-scrolling ribbons of the service categories, below the hero. */
export function LeistungenMarquee() {
  return (
    <div className="relative z-10 overflow-hidden">
      {/* dark row */}
      <div className="bg-[#2b1361] py-3 text-white sm:py-4">
        <MarqueeAnimation
          direction="left"
          baseVelocity={-3}
          className="!text-[1.3rem] tracking-[0.08em] text-white [&>span]:!me-0 sm:!text-[1.7rem]"
        >
          <Labels />
        </MarqueeAnimation>
      </div>

      {/* light row */}
      <div className="border-b border-brand/10 bg-[#EDE6FB] py-3 text-[#3b1178] sm:py-4">
        <MarqueeAnimation
          direction="right"
          baseVelocity={-3}
          className="!text-[1.3rem] tracking-[0.08em] text-[#3b1178] [&>span]:!me-0 sm:!text-[1.7rem]"
        >
          <Labels />
        </MarqueeAnimation>
      </div>
    </div>
  );
}
