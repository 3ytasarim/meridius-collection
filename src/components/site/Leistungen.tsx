import { Layers, ShieldCheck, Sparkles, LayoutGrid } from "lucide-react";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedText } from "@/components/ui/animated-text";
import { Card3DList, type CardData } from "@/components/ui/animated-3d-card";

const cards: CardData[] = [
  {
    id: "b2b-b2c",
    title: "B2B & B2C Inkasso",
    description:
      "Forderungseinzug für Unternehmen gegenüber Geschäfts- und Privatkunden, von der ersten Mahnung bis zum Inkasso.",
    theme: "primary",
    icon: <Layers className="h-5 w-5" />,
    cta: "Mehr erfahren",
  },
  {
    id: "mahnwesen",
    title: "Mahnwesen",
    description:
      "Vorgerichtliches und gerichtliches Mahnwesen inklusive Betreibung und Begleitung durch das Verfahren.",
    theme: "brand",
    icon: <ShieldCheck className="h-5 w-5" />,
    cta: "Mehr erfahren",
  },
  {
    id: "ki",
    title: "KI-Forderungsmanagement",
    description:
      "Automatisierte Fallanalyse und Priorisierung für kürzere Bearbeitungszeiten und höhere Erfolgsquoten.",
    theme: "accent",
    icon: <Sparkles className="h-5 w-5" />,
    cta: "Mehr erfahren",
  },
  {
    id: "massen",
    title: "Massenforderungen",
    description:
      "Spezialisiert auf Sammelinkasso mit hohem Fallvolumen — skalierbare Prozesse statt Einzelfallbearbeitung.",
    theme: "light",
    icon: <LayoutGrid className="h-5 w-5" />,
    cta: "Mehr erfahren",
  },
];

export function Leistungen() {
  return (
    <section
      id="leistungen"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-28"
    >
      {/* Soft purple glow on white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, color-mix(in oklab, var(--brand-soft) 60%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Centered header */}
      <div className="relative mx-auto mb-14 max-w-3xl px-6 text-center">
        <AnimatedGradientText className="text-brand">
          <span className="relative mr-2 inline-flex h-1.5 w-1.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-accent)] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 animate-gradient rounded-full bg-[linear-gradient(to_right,var(--brand),var(--brand-accent),var(--brand-light),var(--brand))] bg-[length:var(--bg-size)_100%]" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-xs">
            Leistungen
          </span>
        </AnimatedGradientText>

        <AnimatedText
          text="Forderungsmanagement aus einer Hand"
          fontSize="clamp(1.4rem, 1rem + 1.8vw, 2.5rem)"
          minWeight={300}
          maxWeight={800}
          animationDuration={2}
          delayMultiplier={0.18}
          className="mt-6 tracking-tight text-brand-dark"
        />
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Von der einzelnen offenen Rechnung bis zum Sammelinkasso über tausende
          Fälle.
        </p>
      </div>


      {/* Cards */}
      <div className="relative mx-auto max-w-7xl px-6">
        <Card3DList cards={cards} columns={4} gap="md" size="md" />
      </div>
    </section>
  );
}
