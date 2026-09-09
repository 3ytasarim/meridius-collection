"use client";

import { Link } from "@tanstack/react-router";

import { BlurredStaggerText } from "@/components/ui/blurred-stagger-text";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "item-1",
    question:
      "Ist dieser Brief bzw. diese E-Mail wirklich von Meridius Collection?",
    answer:
      "Ja, wenn Absender, Firmenname (Meridius Management GmbH), eine Fallnummer sowie der Name des ursprünglichen Vertragspartners klar erkennbar sind. Bei Unsicherheit kontaktieren Sie uns direkt über die auf dieser Website hinterlegten Kontaktdaten.",
  },
  {
    id: "item-2",
    question: "Warum wurde meine Forderung an Meridius übergeben?",
    answer:
      "Ihr ursprünglicher Vertragspartner hat uns mit dem Forderungseinzug beauftragt oder die Forderung an uns abgetreten. Ab diesem Zeitpunkt übernehmen wir die Kommunikation zur offenen Forderung.",
  },
  {
    id: "item-3",
    question: "Was passiert, wenn ich nicht reagiere?",
    answer:
      "Bleibt eine Forderung unbeglichen und es kommt zu keiner Rückmeldung, können weitere Schritte folgen, etwa die Betreibung. Wir empfehlen, sich frühzeitig bei uns zu melden — auch wenn eine sofortige vollständige Zahlung nicht möglich ist.",
  },
  {
    id: "item-4",
    question: "Kann ich in Raten zahlen?",
    answer:
      "In vielen Fällen ja. Melden Sie sich bei uns — wir prüfen gemeinsam mit Ihnen eine tragbare Ratenzahlungsvereinbarung.",
  },
  {
    id: "item-5",
    question:
      "Ich bin mit der Forderung nicht einverstanden — was kann ich tun?",
    answer:
      "Melden Sie sich möglichst rasch bei uns und legen Sie dar, weshalb Sie die Forderung ganz oder teilweise bestreiten. Wir prüfen Ihren Einwand und klären dies wenn nötig mit dem Auftraggeber.",
  },
  {
    id: "item-6",
    question: "Wie kann ich bezahlen?",
    answer:
      "Per Banküberweisung unter Angabe Ihrer Fallnummer als Referenz. Die genauen Zahlungsangaben finden Sie in Ihrem Schreiben oder erhalten Sie von uns auf Anfrage.",
  },
  {
    id: "item-7",
    question:
      "Wie erreiche ich eine Sachbearbeiterin oder einen Sachbearbeiter?",
    answer:
      "Am schnellsten über unseren Chat-Assistenten unten rechts, per E-Mail an info@meridius-collection.ch oder telefonisch zu unseren Geschäftszeiten (Mo–Fr, 08:00–17:30 Uhr).",
  },
];

export function ZahlungFaq() {
  return (
    <section className="relative bg-transparent py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2
              className="font-bold leading-[1.1] tracking-tight text-[#241E33]"
              style={{ fontSize: "clamp(1.9rem, 1.4rem + 2vw, 3rem)" }}
            >
              Was Sie jetzt wissen sollten
            </h2>
            <p className="mt-4 text-pretty text-xl leading-relaxed text-[#5b5566]">
              Antworten auf die häufigsten Fragen, wenn Sie ein Schreiben von uns
              erhalten haben.
            </p>
            <p className="mt-6 hidden text-[17px] leading-relaxed text-[#5b5566] md:block">
              Nicht das Passende dabei? Wenden Sie sich an{" "}
              <Link
                to="/kontakt"
                className="font-medium text-brand hover:underline"
              >
                unser Team
              </Link>
              .
            </p>
          </div>

          <div className="md:col-span-3">
            <Accordion type="single" collapsible>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-[#E6E0F2]"
                >
                  <AccordionTrigger className="cursor-pointer py-5 text-[17px] font-semibold text-brand hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <BlurredStaggerText
                      text={item.answer}
                      trigger="mount"
                      className="whitespace-normal text-[16px] leading-[1.75] text-[#5b5566] sm:text-[17px]"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="mt-6 text-[#5b5566] md:hidden">
            Nicht das Passende dabei? Kontaktieren Sie{" "}
            <Link
              to="/kontakt"
              className="font-medium text-brand hover:underline"
            >
              unser Team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
