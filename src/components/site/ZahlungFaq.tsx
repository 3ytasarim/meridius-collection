import {
  FaqCard,
  HorizontalScroller,
  type FaqItem,
} from "@/components/habit-faq-scroller";
import { GradientText } from "@/components/ui/gradient-text-fill";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";

const items: FaqItem[] = [
  {
    question: "Ist dieser Brief bzw. diese E-Mail wirklich von Meridius Collection?",
    answer:
      "Ja, wenn Absender, Firmenname (Meridius Management GmbH), eine Fallnummer sowie der Name des ursprünglichen Vertragspartners klar erkennbar sind. Bei Unsicherheit kontaktieren Sie uns direkt über die auf dieser Website hinterlegten Kontaktdaten.",
  },
  {
    question: "Warum wurde meine Forderung an Meridius übergeben?",
    answer:
      "Ihr ursprünglicher Vertragspartner hat uns mit dem Forderungseinzug beauftragt oder die Forderung an uns abgetreten. Ab diesem Zeitpunkt übernehmen wir die Kommunikation zur offenen Forderung.",
  },
  {
    question: "Was passiert, wenn ich nicht reagiere?",
    answer:
      "Bleibt eine Forderung unbeglichen und es kommt zu keiner Rückmeldung, können weitere Schritte folgen, etwa die Betreibung. Wir empfehlen, sich frühzeitig bei uns zu melden — auch wenn eine sofortige vollständige Zahlung nicht möglich ist.",
  },
  {
    question: "Kann ich in Raten zahlen?",
    answer:
      "In vielen Fällen ja. Melden Sie sich bei uns — wir prüfen gemeinsam mit Ihnen eine tragbare Ratenzahlungsvereinbarung.",
  },
  {
    question: "Ich bin mit der Forderung nicht einverstanden — was kann ich tun?",
    answer:
      "Melden Sie sich möglichst rasch bei uns und legen Sie dar, weshalb Sie die Forderung ganz oder teilweise bestreiten. Wir prüfen Ihren Einwand und klären dies wenn nötig mit dem Auftraggeber.",
  },
  {
    question: "Wie kann ich bezahlen?",
    answer:
      "Per Banküberweisung unter Angabe Ihrer Fallnummer als Referenz. Die genauen Zahlungsangaben finden Sie in Ihrem Schreiben oder erhalten Sie von uns auf Anfrage.",
  },
  {
    question: "Wie erreiche ich eine Sachbearbeiterin oder einen Sachbearbeiter?",
    answer:
      "Am schnellsten über unseren Chat-Assistenten unten rechts, per E-Mail an info@meridius-collection.ch oder telefonisch zu unseren Geschäftszeiten (Mo–Fr, 08:00–17:30 Uhr).",
  },
];

const cards = items.map((it, i) => (
  <FaqCard key={i} question={it.question} answer={it.answer} />
));

export function ZahlungFaq() {
  return (
    <section className="relative bg-transparent py-20 sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <SectionEyebrow>Häufige Fragen</SectionEyebrow>
        <h2
          className="mt-4 font-semibold leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(2rem, 1.5rem + 2.4vw, 3.1rem)" }}
        >
          <GradientText
            as="span"
            colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
          >
            Was Sie jetzt wissen sollten
          </GradientText>
        </h2>
      </div>

      <div className="mt-12 flex flex-col gap-6 sm:mt-16">
        <HorizontalScroller direction="left" speed="58s">
          {cards}
        </HorizontalScroller>
        <HorizontalScroller direction="right" speed="50s">
          {cards}
        </HorizontalScroller>
      </div>
    </section>
  );
}
