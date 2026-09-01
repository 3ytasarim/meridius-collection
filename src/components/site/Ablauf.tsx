import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedText } from "@/components/ui/animated-text";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";
import { SideFloatingIcons } from "@/components/site/SideFloatingIcons";

const brandColors = {
  bg: "bg-[color-mix(in_oklab,var(--brand-soft)_70%,white)]",
  text: "text-brand",
  border: "border-[color-mix(in_oklab,var(--brand-light)_35%,white)]",
};

const accentColors = {
  bg: "bg-[color-mix(in_oklab,var(--brand-light)_18%,white)]",
  text: "text-[var(--brand-accent)]",
  border: "border-[color-mix(in_oklab,var(--brand-accent)_25%,white)]",
};

const steps: Step[] = [
  {
    title: "Übergabe",
    description:
      "Sie melden die offene Forderung digital — inklusive Belegen und bisherigem Schriftverkehr.",
    colors: brandColors,
  },
  {
    title: "Analyse & Kontakt",
    description:
      "Unser System priorisiert den Fall, die erste Kontaktaufnahme mit der Schuldnerin oder dem Schuldner erfolgt zeitnah.",
    colors: accentColors,
  },
  {
    title: "Beitreibung",
    description:
      "Zahlungsvereinbarung, Betreibung oder gerichtliches Verfahren — je nach Situation und in Absprache mit Ihnen.",
    colors: brandColors,
  },
  {
    title: "Auszahlung",
    description:
      "Eingehende Zahlungen werden transparent ausgewiesen und laufend an Sie weitergeleitet.",
    colors: accentColors,
  },
];

export function Ablauf() {
  return (
    <section
      id="ablauf"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-24"
    >
      <SideFloatingIcons />
      <div className="relative mx-auto mb-6 max-w-3xl px-6 text-center">
        <AnimatedGradientText className="text-brand">
          <span className="relative mr-2 inline-flex h-1.5 w-1.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-accent)] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 animate-gradient rounded-full bg-[linear-gradient(to_right,var(--brand),var(--brand-accent),var(--brand-light),var(--brand))] bg-[length:var(--bg-size)_100%]" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-xs">
            Ablauf
          </span>
        </AnimatedGradientText>

        <AnimatedText
          text="So läuft ein Fall bei uns"
          fontSize="clamp(1.4rem, 1rem + 1.8vw, 2.5rem)"
          minWeight={300}
          maxWeight={800}
          animationDuration={2}
          delayMultiplier={0.18}
          className="mt-6 tracking-tight text-brand-dark"
        />
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Vier klare Schritte — von der Übergabe bis zur Auszahlung.
        </p>
      </div>

      <HowItWorks features={steps} className="-mb-24 bg-transparent dark:bg-transparent md:!pt-6 md:!pb-0" />
    </section>
  );
}
