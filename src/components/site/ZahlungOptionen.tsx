import { FeatureSteps, type Feature } from "@/components/ui/feature-section";

/** German copy verbatim — the three ways to settle the claim. */
const steps: Feature[] = [
  {
    step: "Schritt 1",
    title: "Überweisung",
    content:
      "Begleichen Sie die Forderung per Banküberweisung unter Angabe Ihrer Fallnummer als Zahlungsreferenz.",
    image: "/major-tom-agency-44m0VUlDmXA-unsplash.jpg",
  },
  {
    step: "Schritt 2",
    title: "Ratenzahlung",
    content:
      "Beantragen Sie eine Ratenzahlungsvereinbarung, die zu Ihrer aktuellen Situation passt.",
    image: "/sumup-YDe0nOZyLHI-unsplash.jpg",
  },
  {
    step: "Schritt 3",
    title: "Zahlungsaufschub",
    content:
      "Benötigen Sie kurzfristig mehr Zeit? Kontaktieren Sie uns möglichst, bevor die Frist abläuft.",
    image: "/alexander-grey-tn57JI3CewI-unsplash.jpg",
  },
];

export function ZahlungOptionen() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent py-20 sm:py-28">
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <h2
          className="font-bold leading-[1.1] tracking-tight text-[#241E33]"
          style={{ fontSize: "clamp(1.9rem, 1.4rem + 2vw, 3rem)" }}
        >
          So gleichen Sie die Forderung aus
        </h2>
      </div>

      <FeatureSteps
        features={steps}
        autoPlayInterval={4000}
        className="mt-14 px-6 sm:mt-16"
      />
    </section>
  );
}
