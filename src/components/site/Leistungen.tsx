import { cn } from "@/lib/utils";
import { TextGradient } from "@/components/ui/text-gradient";
import { BlurredStaggerText } from "@/components/ui/blurred-stagger-text";
import {
  MassenVisual,
  MeridiusFallanalyseVisual,
  SceneFrame,
} from "@/components/site/leistungen-visuals";

// The B2B embed lays its two stat cards beside the main card on wide screens
// and stacks them below it under 640px — give SceneFrame both stage ratios so
// the frame follows suit.
const B2B_RATIOS = { landscape: "1424 / 900", portrait: "736 / 1436" };
const InkassoVisual = () => (
  <SceneFrame
    src="/b2b-anim/index.html"
    title="B2B & B2C Inkasso – Forderungseinzug"
    ratios={B2B_RATIOS}
  />
);
// The Mahnwesen embed places STATUS, the MAHNWESEN card and the next-step /
// progress cards side by side on wide screens and stacks them into one column
// under 640px (STATUS → MAHNWESEN → Nächster Schritt → Fortschritt).
const MAHNWESEN_RATIOS = { landscape: "1600 / 900", portrait: "548 / 1648" };
const MahnwesenVisual = () => (
  <SceneFrame
    src="/mahnwesen-anim/index.html"
    title="Mahnwesen – Ablauf"
    ratios={MAHNWESEN_RATIOS}
  />
);

const SERVICES = [
  {
    n: "01",
    title: "B2B & B2C Inkasso",
    description:
      "Forderungseinzug für Unternehmen gegenüber Geschäfts- und Privatkunden, von der ersten Mahnung bis zum Inkasso.",
    Visual: InkassoVisual,
    flip: false,
  },
  {
    n: "02",
    title: "Mahnwesen",
    description:
      "Vorgerichtliches und gerichtliches Mahnwesen inklusive Betreibung und Begleitung durch das Verfahren.",
    Visual: MahnwesenVisual,
    flip: true,
  },
  {
    n: "03",
    title: "KI-Forderungsmanagement",
    description:
      "Automatisierte Fallanalyse und Priorisierung für kürzere Bearbeitungszeiten und höhere Erfolgsquoten.",
    Visual: MeridiusFallanalyseVisual,
    flip: false,
  },
  {
    n: "04",
    title: "Massenforderungen",
    description:
      "Spezialisiert auf Sammelinkasso mit hohem Fallvolumen — skalierbare Prozesse statt Einzelfallbearbeitung.",
    Visual: MassenVisual,
    flip: true,
  },
] as const;

export function Leistungen() {
  return (
    <section id="leistungen" className="relative bg-white py-16 sm:py-20">
      {/* Header */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          className="font-extrabold leading-[1.05] tracking-[-0.03em] text-[#2B2433]"
          style={{ fontSize: "clamp(1.54rem, 1.1rem + 1.98vw, 2.75rem)" }}
        >
          <TextGradient
            as="span"
            children="Forderungsmanagement"
            colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
            duration={6}
            angle={90}
            className="font-extrabold pb-[0.12em] leading-[1.15]"
          />
          <br />
          aus einer Hand
        </h2>
        <p className="mt-4 text-xl leading-relaxed text-muted-foreground sm:text-2xl">
          Von der einzelnen offenen Rechnung bis zum Sammelinkasso über tausende
          Fälle.
        </p>
      </div>

      {/* Alternating editorial service blocks */}
      <div className="mx-auto mt-10 max-w-7xl px-6 sm:mt-12 sm:px-8">
        {SERVICES.map((s, i) => {
          const { Visual } = s;
          return (
            <div
              key={s.n}
              className={cn(
                "flex flex-col gap-10 py-10 sm:gap-12 lg:min-h-[420px] lg:flex-row lg:items-center lg:gap-16 lg:py-14",
                i > 0 && "border-t border-[#F1ECFA]",
              )}
            >
              {/* Text */}
              <div className={cn("lg:w-[42%]", s.flip && "lg:order-2")}>
                <div className="max-w-md">
                  <span className="font-mono text-xs font-semibold tracking-[0.22em] text-brand">
                    {s.n}
                  </span>
                  <h3 className="mt-5 text-[1.8rem] font-semibold tracking-tight text-foreground sm:text-[2.35rem]">
                    {s.title}
                  </h3>
                  <BlurredStaggerText
                    text={s.description}
                    className="mt-4 text-[18px] leading-relaxed text-muted-foreground sm:text-xl"
                  />
                </div>
              </div>

              {/* Visual */}
              <div className={cn("w-full lg:w-[58%]", s.flip && "lg:order-1")}>
                <Visual />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
