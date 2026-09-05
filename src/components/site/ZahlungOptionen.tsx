import { CreditCard, CalendarClock, Clock } from "lucide-react";

import { Card3DList, type CardData } from "@/components/ui/animated-3d-card";
import { GradientText } from "@/components/ui/gradient-text-fill";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";

const cards: CardData[] = [
  {
    id: "ueberweisung",
    title: "Überweisung",
    description:
      "Begleichen Sie die Forderung per Banküberweisung unter Angabe Ihrer Fallnummer als Zahlungsreferenz.",
    theme: "primary",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "raten",
    title: "Ratenzahlung",
    description:
      "Beantragen Sie eine Ratenzahlungsvereinbarung, die zu Ihrer aktuellen Situation passt.",
    theme: "brand",
    icon: <CalendarClock className="h-5 w-5" />,
  },
  {
    id: "aufschub",
    title: "Zahlungsaufschub",
    description:
      "Benötigen Sie kurzfristig mehr Zeit? Kontaktieren Sie uns möglichst, bevor die Frist abläuft.",
    theme: "accent",
    icon: <Clock className="h-5 w-5" />,
  },
];

export function ZahlungOptionen() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent py-20 sm:py-28">
      {/* Soft purple glow on white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, color-mix(in oklab, var(--brand-soft) 60%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <SectionEyebrow>Zahlungsoptionen</SectionEyebrow>
        <h2
          className="mt-4 font-semibold leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(2rem, 1.5rem + 2.4vw, 3.1rem)" }}
        >
          <GradientText
            as="span"
            colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
          >
            So gleichen Sie die Forderung aus
          </GradientText>
        </h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl px-6 sm:mt-16">
        <Card3DList cards={cards} columns={3} gap="md" size="md" />
      </div>
    </section>
  );
}
