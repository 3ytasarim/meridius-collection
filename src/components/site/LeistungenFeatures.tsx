"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { ServiceFaq, type FaqItem } from "@/components/ui/service-faq";

/* ------------------------------------------------------------------ */
/*  Shared overlay primitive — subtle reveal + gentle float           */
/* ------------------------------------------------------------------ */

function Overlay({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "mt-3 w-full sm:absolute sm:mt-0 sm:w-auto sm:max-w-[220px]",
        className,
      )}
    >
      {/* one-time reveal on scroll-in — no perpetual motion (keeps scrolling smooth) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[18px] border border-brand/12 bg-white/95 p-3.5 shadow-[0_18px_40px_-24px_rgba(46,24,92,0.28)] backdrop-blur-sm"
      >
        {children}
      </motion.div>
    </div>
  );
}

function OverlayEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A83A0]">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Photo frame                                                       */
/* ------------------------------------------------------------------ */

function Photo({
  src,
  alt,
  position,
}: {
  src: string;
  alt: string;
  position?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width={1600}
      height={1200}
      className="block aspect-[4/3] w-full rounded-[26px] border border-brand/10 object-cover shadow-[0_25px_55px_-12px_rgba(99,48,199,0.42)]"
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  01 — B2B & B2C Inkasso                                            */
/* ------------------------------------------------------------------ */

function InkassoVisual() {
  const steps = ["Fall eingereicht", "In Bearbeitung", "Kontaktaufnahme"];
  return (
    <div className="relative">
      <Photo
        src="/sumup-YDe0nOZyLHI-unsplash.jpg"
        alt="Digitale Bearbeitung einer offenen Rechnung am Laptop"
        position="50% 40%"
      />

      <Overlay className="sm:bottom-4 sm:left-4" delay={0.05}>
        <OverlayEyebrow>Fallstatus</OverlayEyebrow>
        <ul className="mt-2 flex flex-col gap-1.5">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-[12.5px] text-[#3B3550]">
              <span
                className={cn(
                  "flex size-3.5 shrink-0 items-center justify-center rounded-full",
                  i === 0 ? "bg-brand text-white" : "border border-[#DDD5EF]",
                )}
              >
                {i === 0 ? <Check className="size-2.5" strokeWidth={3.5} /> : null}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </Overlay>

      <Overlay className="sm:right-4 sm:top-4" delay={0.18}>
        <OverlayEyebrow>Digitale Übergabe</OverlayEyebrow>
        <div className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-[#171320]">
          Sicher übermittelt
          <Check className="size-3.5 text-brand" strokeWidth={3} />
        </div>
      </Overlay>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  02 — Mahnwesen                                                    */
/* ------------------------------------------------------------------ */

function MahnwesenVisual() {
  const flow = ["Mahnung", "Betreibung", "Verfahren"];
  return (
    <div className="relative">
      <Photo
        src="/kelly-sikkema-0oZpRxG5Hkk-unsplash.jpg"
        alt="Formelle Bearbeitung von Unterlagen und Rechnungen"
        position="50% 42%"
      />

      <Overlay className="sm:bottom-4 sm:right-4" delay={0.1}>
        <OverlayEyebrow>Schritt für Schritt</OverlayEyebrow>
        <div className="mt-2 flex flex-col gap-1">
          {flow.map((f, i) => (
            <div key={f}>
              <div className="text-[13px] font-semibold text-[#171320]">{f}</div>
              {i < flow.length - 1 ? (
                <div className="my-0.5 text-[11px] leading-none text-brand">↓</div>
              ) : null}
            </div>
          ))}
        </div>
      </Overlay>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  03 — KI-gestütztes Forderungsmanagement                           */
/* ------------------------------------------------------------------ */

function KiVisual() {
  return (
    <div className="relative">
      <Photo
        src="/Pictures023.jpeg"
        alt="KI-gestützte Fallanalyse und Priorisierung im Forderungsmanagement"
        position="50% 50%"
      />

      <Overlay className="sm:left-4 sm:top-4" delay={0.05}>
        <OverlayEyebrow>KI-gestützt</OverlayEyebrow>
        <div className="mt-1 text-[13px] font-semibold text-[#171320]">
          Priorisierung &amp; Timing
        </div>
      </Overlay>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  04 — Massenforderungen                                            */
/* ------------------------------------------------------------------ */

function MassenVisual() {
  return (
    <div className="relative">
      <Photo
        src="/camilo-rueda-lopez-3CLPBgNuX40-unsplash.jpg"
        alt="Grosse Menge an Belegen und Unterlagen"
        position="50% 50%"
      />

      <Overlay className="sm:left-4 sm:top-4">
        <OverlayEyebrow>Sammelforderungen</OverlayEyebrow>
        <div className="mt-1 text-[13px] font-semibold text-[#171320]">
          Strukturierte Bearbeitung
        </div>
      </Overlay>

      <Overlay className="sm:bottom-4 sm:right-4">
        <div className="flex flex-col gap-1.5">
          {["Standardisierte Abläufe", "Konsolidiertes Reporting"].map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 text-[12.5px] font-medium text-[#3B3550]"
            >
              <Check className="size-3.5 shrink-0 text-brand" strokeWidth={3} />
              {t}
            </div>
          ))}
        </div>
      </Overlay>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data — titles / descriptions / FAQ are the existing content       */
/* ------------------------------------------------------------------ */

type Service = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  faq: FaqItem[];
  visual: ReactNode;
  reverse?: boolean;
};

const services: Service[] = [
  {
    id: "b2b-b2c",
    number: "01",
    category: "Kernleistung",
    title: "B2B & B2C Inkasso",
    description:
      "Forderungseinzug für Unternehmen gegenüber Geschäfts- und Privatkunden. Wir übernehmen die Kommunikation mit der Schuldnerin oder dem Schuldner und halten Sie laufend über den Stand des Verfahrens auf dem Laufenden.",
    faq: [
      {
        question: "Forderungseinzug für Firmen- und Privatkundschaft",
        answer:
          "Ob offene Rechnung gegenüber einem Unternehmen oder einer Privatperson – der Ablauf bleibt für Sie derselbe.",
      },
      {
        question: "Digitale Fallübergabe inklusive Belegen und Historie",
        answer:
          "Rechnung, Mahnungen und bisheriger Schriftverkehr werden hochgeladen, der Fall startet ohne Medienbruch.",
      },
      {
        question: "Laufende Statusübersicht für Auftraggebende",
        answer:
          "Jeder Bearbeitungsschritt ist im Portal einsehbar – ohne Nachfragen per Telefon oder E-Mail.",
      },
    ],
    visual: <InkassoVisual />,
  },
  {
    id: "mahnwesen",
    number: "02",
    category: "Vorgerichtlich & gerichtlich",
    title: "Mahnwesen",
    description:
      "Wir begleiten den gesamten Weg von der ersten Zahlungserinnerung bis zum gerichtlichen Verfahren — inklusive Betreibung nach Schweizer Recht, wo nötig.",
    faq: [
      {
        question: "Vorgerichtliches Mahnwesen mit gestaffelten Erinnerungen",
        answer:
          "Mehrstufige Zahlungserinnerungen mit klaren Fristen, bevor rechtliche Schritte nötig werden.",
      },
      {
        question: "Betreibung und Begleitung durchs Rechtsöffnungsverfahren",
        answer:
          "Wir leiten die Betreibung ein und begleiten den Fall durch die weiteren Verfahrensschritte.",
      },
      {
        question: "Abstimmung mit Ihrer Rechtsvertretung, falls vorhanden",
        answer:
          "Arbeitet bereits eine Kanzlei am Fall, koordinieren wir uns direkt mit ihr.",
      },
    ],
    reverse: true,
    visual: <MahnwesenVisual />,
  },
  {
    id: "ki",
    number: "03",
    category: "Technologie",
    title: "KI-gestütztes Forderungsmanagement",
    description:
      "Unsere Systeme unterstützen bei Priorisierung, optimalem Kontaktzeitpunkt und Eskalationsstufe. Die fachliche Beurteilung und jede Entscheidung mit rechtlicher Tragweite bleibt beim Team.",
    faq: [
      {
        question:
          "Automatisierte Fallpriorisierung nach Erfolgswahrscheinlichkeit",
        answer:
          "Fälle mit hoher Aussicht auf Zahlung werden zuerst bearbeitet, der Rest folgt strukturiert.",
      },
      {
        question:
          "Digitale Kommunikationskanäle für schnellere Reaktionszeiten",
        answer:
          "Kontaktaufnahme per E-Mail, SMS und Portal ergänzt den klassischen Briefweg.",
      },
      {
        question: "Laufendes Reporting für Auftraggebende",
        answer:
          "Kennzahlen zu Bestand, Rücklauf und offenen Beträgen werden fortlaufend aktualisiert.",
      },
    ],
    visual: <KiVisual />,
  },
  {
    id: "massen",
    number: "04",
    category: "Spezialisierung",
    title: "Massenforderungen",
    description:
      "Für Unternehmen mit hohem Fallvolumen — etwa Telekom, Versicherungen, Energieversorger oder E-Commerce — bieten wir skalierbare Prozesse statt manueller Einzelfallbearbeitung.",
    faq: [
      {
        question: "Batch-Übergabe grosser Fallmengen per Schnittstelle oder Datei",
        answer:
          "Tausende Fälle werden per API oder strukturierter Datei in einem Schritt übernommen.",
      },
      {
        question: "Standardisierte, skalierbare Bearbeitungsprozesse",
        answer:
          "Gleichartige Fälle laufen über definierte Prozessvorlagen statt manueller Einzelbearbeitung.",
      },
      {
        question: "Konsolidiertes Reporting über alle Fälle hinweg",
        answer:
          "Ein Gesamtüberblick über alle übergebenen Forderungen statt vieler Einzelauswertungen.",
      },
    ],
    reverse: true,
    visual: <MassenVisual />,
  },
];

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export function LeistungenFeatures() {
  return (
    <section id="leistungen" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
          <h2
            className="font-bold leading-[1.08] tracking-tight text-[#171320]"
            style={{ fontSize: "clamp(2.25rem, 1.8rem + 2.2vw, 3.4rem)" }}
          >
            Forderungsmanagement aus einer Hand
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#5B5568] sm:text-lg">
            Von der einzelnen offenen Rechnung bis zum Sammelinkasso über tausende
            Fälle.
          </p>
        </div>

        <div>
          {services.map((s) => (
            <article
              key={s.id}
              className={cn(
                "grid gap-10 border-t border-[#EAE7EF] py-16 first:border-t-0 first:pt-0 sm:gap-12 lg:items-center lg:gap-20 lg:py-24",
                // keep the visual column at 1.1fr on both sides so every photo
                // renders at the same size, regardless of which side it's on
                s.reverse
                  ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
                  : "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
              )}
            >
              {/* Text + FAQ */}
              <div className={cn(s.reverse && "lg:order-2")}>
                <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-brand">
                  {s.number} · {s.category.toUpperCase()}
                </div>
                <h3
                  className="mt-4 hyphens-auto break-words font-bold leading-[1.12] tracking-tight text-[#171320]"
                  lang="de"
                  style={{ fontSize: "clamp(1.6rem, 1.25rem + 1.7vw, 2.75rem)" }}
                >
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-[#5B5568] sm:text-[17px]">
                  {s.description}
                </p>

                <div className="mt-8">
                  <ServiceFaq items={s.faq} idBase={s.id} />
                </div>
              </div>

              {/* Visual */}
              <div className={cn(s.reverse && "lg:order-1")}>{s.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
