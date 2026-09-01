import { FeatureCard } from "@/components/ui/binaural-glow-feature-card";
import { FloatingIcons } from "@/components/site/FloatingIcons";

const features = [
  {
    eyebrow: "Agil",
    title: "Kurze Wege, schnelle Entscheide",
    paragraph:
      "Flache Strukturen statt Aktenstau: Fälle werden digital erfasst, priorisiert und ohne Umwege bearbeitet.",
  },
  {
    eyebrow: "KI-gestützt",
    title: "Intelligente Fallsteuerung",
    paragraph:
      "Algorithmen unterstützen bei Priorisierung, Kontaktzeitpunkt und Eskalationsstufe — die Entscheidung bleibt beim Team.",
  },
  {
    eyebrow: "Fair",
    title: "Beide Seiten im Blick",
    paragraph:
      "Transparente Kommunikation und realistische Lösungen statt Druck ohne Perspektive — im Interesse einer nachhaltigen Einigung.",
  },
];

export function Features() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <FloatingIcons />
      <div className="relative mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard key={f.eyebrow} attentionDelay={i * 1.2} {...f} />
        ))}
      </div>
    </section>
  );
}
