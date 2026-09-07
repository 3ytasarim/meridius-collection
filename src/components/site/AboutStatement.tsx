import { MapPin } from "lucide-react";

import { TextGradient } from "@/components/ui/text-gradient";

const G = ({ children }: { children: string }) => (
  <TextGradient
    as="strong"
    children={children}
    colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
    duration={6}
    angle={90}
    className="font-extrabold"
  />
);

export function AboutStatement() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-12 px-6 sm:px-8 md:flex-row md:gap-16">
        {/* Image — coloured (purple) shadow behind it, floating info card */}
        <div className="relative shrink-0 overflow-hidden rounded-2xl shadow-[0_28px_60px_-12px_rgba(99,48,199,0.45)]">
          <img
            src="/jakub-zerdzicki-LNnmSumlwO4-unsplash.jpg"
            alt="Arbeitsplatz mit Auswertungen zum Forderungsmanagement"
            loading="lazy"
            decoding="async"
            width={1600}
            height={1280}
            className="block w-full max-w-md rounded-2xl object-cover"
            style={{ objectPosition: "50% 55%" }}
          />

          <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl bg-white p-3 shadow-[0_16px_32px_-14px_rgba(46,24,92,0.35)]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-brand">
              <MapPin className="size-[18px]" strokeWidth={2} aria-hidden />
            </span>
            <span className="text-[13px] leading-tight text-[#2B2433]">
              <span className="block font-bold">Pfäffikon SZ</span>
              <span className="block text-[#7B7688]">Meridius Management GmbH</span>
            </span>
          </div>
        </div>

        {/* Statement */}
        <figure className="max-w-lg">
          <figcaption>
            <span className="text-xl font-semibold uppercase tracking-[0.14em] text-[#2B2433]">
              Wir glauben
            </span>
            <span className="mt-1 block h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#6330C7,#DDD9FF)]" />
          </figcaption>

          <blockquote
            className="mt-8 text-pretty font-bold leading-[1.4] tracking-tight text-[#2B2433]"
            style={{ fontSize: "clamp(1.15rem, 1rem + 0.7vw, 1.5rem)" }}
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
