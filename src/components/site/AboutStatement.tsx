import { DotPattern } from "@/components/ui/dot-pattern-1";
import { GradientText } from "@/components/ui/gradient-text-fill";

const G = ({ children }: { children: string }) => (
  <GradientText
    as="strong"
    className="font-extrabold"
    colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
  >
    {children}
  </GradientText>
);

const Corner = ({ className }: { className: string }) => (
  <span
    aria-hidden="true"
    className={`absolute z-20 size-2.5 bg-brand ${className}`}
  />
);

export function AboutStatement() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <figure className="relative isolate border border-brand/35 px-8 py-12 sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <DotPattern
              width={16}
              height={16}
              cx={1}
              cy={1}
              cr={1}
              className="!fill-brand/15"
            />
          </div>

          {/* solid corner markers straddling the border */}
          <Corner className="-left-[5px] -top-[5px]" />
          <Corner className="-right-[5px] -top-[5px]" />
          <Corner className="-bottom-[5px] -left-[5px]" />
          <Corner className="-bottom-[5px] -right-[5px]" />

          <figcaption className="relative z-10 mb-4 flex items-center gap-2 text-[13px] font-medium tracking-wide text-brand">
            <img
              src="/favicon.ico"
              alt=""
              className="size-4 shrink-0 rounded-full"
            />
            Wir glauben
          </figcaption>

          <blockquote
            className="relative z-10 max-w-[26ch] text-pretty font-normal leading-[1.12] tracking-tight text-[#2B2433] sm:max-w-none"
            style={{ fontSize: "clamp(1.75rem, 1.1rem + 2.6vw, 3rem)" }}
          >
            „Inkasso <G>muss nicht bedeuten</G>, dass eine Seite verliert. Wir
            suchen den <G>kürzesten fairen Weg</G> zu einer Lösung, die für
            Gläubiger und Schuldner <G>tragbar ist</G>.“
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
