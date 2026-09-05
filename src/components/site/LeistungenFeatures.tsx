import { ConfettiBackground } from "@/components/ui/confetti-background";
import { GradientText } from "@/components/ui/gradient-text-fill";
import {
  ParallaxFeatureSection,
  type ParallaxFeature,
} from "@/components/ui/parallax-scroll-feature-section";

function FeatureVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="aspect-[3/2] w-full rounded-3xl border border-brand/10 bg-white object-cover shadow-[0_30px_62px_-28px_var(--brand)]"
    />
  );
}

const features: ParallaxFeature[] = [
  {
    id: "b2b-b2c",
    number: "01",
    eyebrow: "Kernleistung",
    title: "B2B & B2C Inkasso",
    description:
      "Forderungseinzug für Unternehmen gegenüber Geschäfts- und Privatkunden. Wir übernehmen die Kommunikation mit der Schuldnerin oder dem Schuldner und halten Sie laufend über den Stand des Verfahrens auf dem Laufenden.",
    points: [
      {
        title: "Forderungseinzug für Firmen- und Privatkundschaft",
        detail:
          "Ob offene Rechnung gegenüber einem Unternehmen oder einer Privatperson – der Ablauf bleibt für Sie derselbe.",
      },
      {
        title: "Digitale Fallübergabe inklusive Belegen und Historie",
        detail:
          "Rechnung, Mahnungen und bisheriger Schriftverkehr werden hochgeladen, der Fall startet ohne Medienbruch.",
      },
      {
        title: "Laufende Statusübersicht für Auftraggebende",
        detail:
          "Jeder Bearbeitungsschritt ist im Portal einsehbar – ohne Nachfragen per Telefon oder E-Mail.",
      },
    ],
    visual: <FeatureVisual src="/01.png" alt="B2B & B2C Inkasso" />,
  },
  {
    id: "mahnwesen",
    number: "02",
    eyebrow: "Vorgerichtlich & gerichtlich",
    title: "Mahnwesen",
    description:
      "Wir begleiten den gesamten Weg von der ersten Zahlungserinnerung bis zum gerichtlichen Verfahren — inklusive Betreibung nach Schweizer Recht, wo nötig.",
    points: [
      {
        title: "Vorgerichtliches Mahnwesen mit gestaffelten Erinnerungen",
        detail:
          "Mehrstufige Zahlungserinnerungen mit klaren Fristen, bevor rechtliche Schritte nötig werden.",
      },
      {
        title: "Betreibung und Begleitung durchs Rechtsöffnungsverfahren",
        detail:
          "Wir leiten die Betreibung ein und begleiten den Fall durch die weiteren Verfahrensschritte.",
      },
      {
        title: "Abstimmung mit Ihrer Rechtsvertretung, falls vorhanden",
        detail:
          "Arbeitet bereits eine Kanzlei am Fall, koordinieren wir uns direkt mit ihr.",
      },
    ],
    reverse: true,
    visual: <FeatureVisual src="/02.png" alt="Mahnwesen" />,
  },
  {
    id: "ki",
    number: "03",
    eyebrow: "Technologie",
    title: "KI-gestütztes Forderungsmanagement",
    description:
      "Unsere Systeme unterstützen bei Priorisierung, optimalem Kontaktzeitpunkt und Eskalationsstufe. Die fachliche Beurteilung und jede Entscheidung mit rechtlicher Tragweite bleibt beim Team.",
    points: [
      {
        title: "Automatisierte Fallpriorisierung nach Erfolgswahrscheinlichkeit",
        detail:
          "Fälle mit hoher Aussicht auf Zahlung werden zuerst bearbeitet, der Rest folgt strukturiert.",
      },
      {
        title: "Digitale Kommunikationskanäle für schnellere Reaktionszeiten",
        detail:
          "Kontaktaufnahme per E-Mail, SMS und Portal ergänzt den klassischen Briefweg.",
      },
      {
        title: "Laufendes Reporting für Auftraggebende",
        detail:
          "Kennzahlen zu Bestand, Rücklauf und offenen Beträgen werden fortlaufend aktualisiert.",
      },
    ],
    visual: <FeatureVisual src="/03.png" alt="KI-gestütztes Forderungsmanagement" />,
  },
  {
    id: "massen",
    number: "04",
    eyebrow: "Spezialisierung",
    title: "Massenforderungen",
    description:
      "Für Unternehmen mit hohem Fallvolumen — etwa Telekom, Versicherungen, Energieversorger oder E-Commerce — bieten wir skalierbare Prozesse statt manueller Einzelfallbearbeitung.",
    points: [
      {
        title: "Batch-Übergabe grosser Fallmengen per Schnittstelle oder Datei",
        detail:
          "Tausende Fälle werden per API oder strukturierter Datei in einem Schritt übernommen.",
      },
      {
        title: "Standardisierte, skalierbare Bearbeitungsprozesse",
        detail:
          "Gleichartige Fälle laufen über definierte Prozessvorlagen statt manueller Einzelbearbeitung.",
      },
      {
        title: "Konsolidiertes Reporting über alle Fälle hinweg",
        detail:
          "Ein Gesamtüberblick über alle übergebenen Forderungen statt vieler Einzelauswertungen.",
      },
    ],
    reverse: true,
    visual: <FeatureVisual src="/04.png" alt="Massenforderungen" />,
  },
];

export function LeistungenFeatures() {
  return (
    <section
      id="leistungen"
      className="relative isolate overflow-clip bg-[#F5F0FF] py-16 sm:py-24"
    >
      {/* Confetti fills this whole section — from below the hero to the footer. */}
      <ConfettiBackground />

      <div className="relative mx-auto mb-12 max-w-3xl px-6 text-center sm:mb-16">
        <h2
          className="font-semibold leading-[1.06] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 1.9rem + 3vw, 3.9rem)" }}
        >
          <GradientText
            as="span"
            colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
          >
            Forderungsmanagement aus einer Hand
          </GradientText>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#5b5566] sm:text-lg">
          Von der einzelnen offenen Rechnung bis zum Sammelinkasso über tausende
          Fälle.
        </p>
      </div>

      <ParallaxFeatureSection features={features} className="relative" />
    </section>
  );
}
