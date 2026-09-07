import { Hash, Building2, PhoneCall, type LucideIcon } from "lucide-react";

import { BlurredStaggerText } from "@/components/ui/blurred-stagger-text";

type Feature = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

const features: Feature[] = [
  {
    id: "fallnummer",
    title: "Fallnummer & Auftraggeber",
    description:
      "Eine echte Nachricht von uns nennt stets eine Fallnummer sowie das Unternehmen, das uns mit dem Inkasso beauftragt hat.",
    Icon: Hash,
  },
  {
    id: "absender",
    title: "Offizieller Absender",
    description:
      "Meridius Management GmbH, Churerstrasse 158, 8808 Pfäffikon SZ — diese Angaben finden Sie auf jedem offiziellen Schreiben von uns.",
    Icon: Building2,
  },
  {
    id: "kontakt",
    title: "Nachvollziehbare Kontaktaufnahme",
    description:
      "Kontaktieren Sie uns im Zweifel über die auf dieser Website angegebene Telefonnummer oder E-Mail-Adresse — nicht über Links aus einer fragwürdigen Nachricht.",
    Icon: PhoneCall,
  },
];

export function ZahlungSicherheit() {
  return (
    <section className="relative bg-transparent py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 sm:px-8 md:grid-cols-2 md:gap-16">
        {/* Image — purple coloured shadow behind it */}
        <div className="relative overflow-hidden rounded-2xl shadow-[0_28px_60px_-12px_rgba(99,48,199,0.45)]">
          <img
            src="/pexels-jakubzerdzicki-16823695.jpg"
            alt=""
            loading="lazy"
            decoding="async"
            className="block aspect-[4/5] w-full rounded-2xl object-cover"
          />
        </div>

        {/* Heading + feature list */}
        <div>
          <h2
            className="font-bold leading-[1.12] tracking-tight text-[#241E33]"
            style={{ fontSize: "clamp(1.8rem, 1.3rem + 2vw, 2.5rem)" }}
          >
            So erkennen Sie eine echte Nachricht von uns
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5b5566] sm:text-lg">
            Bei Unsicherheit gilt: Lieber einmal zu viel bei uns nachfragen — über
            die Kontaktdaten auf dieser Website, nicht über Angaben aus einer
            verdächtigen Nachricht.
          </p>

          <div className="mt-10 space-y-8">
            {features.map((f) => (
              <div key={f.id}>
                <div className="flex size-10 items-center justify-center rounded-lg border border-brand/15 bg-[var(--brand-soft)] text-brand">
                  <f.Icon className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <div className="mt-4 space-y-1.5">
                  <h3 className="text-base font-bold text-[#241E33]">
                    {f.title}
                  </h3>
                  <BlurredStaggerText
                    text={f.description}
                    className="text-sm font-medium leading-relaxed text-[#4C4658]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
