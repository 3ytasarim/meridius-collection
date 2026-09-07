import type { ComponentType } from "react";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { KontaktForm } from "@/components/form-1";

type Card = {
  id: string;
  Icon: ComponentType<{ className?: string }>;
  label: string;
  lines: string[];
  href?: string;
  ariaLabel?: string;
};

const cards: Card[] = [
  {
    id: "adresse",
    Icon: MapPin,
    label: "Adresse",
    lines: [
      "Meridius Management GmbH",
      "Churerstrasse 158",
      "8808 Pfäffikon SZ, Schweiz",
    ],
    href: "https://www.google.com/maps/dir/?api=1&destination=Churerstrasse+158,+8808+Pf%C3%A4ffikon+SZ",
    ariaLabel: "Adresse auf Google Maps öffnen",
  },
  {
    id: "erreichbarkeit",
    Icon: Clock,
    label: "Erreichbarkeit",
    lines: ["Mo–Fr, 08:00–17:30 Uhr"],
  },
  {
    id: "telefon",
    Icon: Phone,
    label: "Telefon",
    lines: ["+41 55 410 00 00"],
    href: "tel:+41554100000",
    ariaLabel: "Meridius Collection anrufen",
  },
  {
    id: "email",
    Icon: Mail,
    label: "E-Mail",
    lines: ["info@meridius-collection.ch"],
    href: "mailto:info@meridius-collection.ch",
    ariaLabel: "E-Mail an Meridius Collection schreiben",
  },
];

const cardBase =
  "group relative flex flex-col rounded-[22px] border border-[#ECE7F6] bg-white p-5 shadow-[0_22px_50px_-14px_rgba(99,48,199,0.42)] transition-[transform,box-shadow,border-color] duration-[280ms] ease-out sm:p-6 motion-reduce:transition-none hover:-translate-y-[3px] hover:border-brand/30 hover:shadow-[0_30px_62px_-14px_rgba(99,48,199,0.55)]";

function CardInner({ card }: { card: Card }) {
  return (
    <>
      <span className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(158deg,#F2ECFF,#E6DCFF)] text-brand ring-1 ring-inset ring-brand/10">
        <card.Icon className="size-[18px]" />
      </span>

      {card.href ? (
        <ArrowUpRight
          aria-hidden
          className="absolute right-5 top-5 size-4 text-brand/50 transition-colors group-hover:text-brand"
        />
      ) : null}

      <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A83A0]">
        {card.label}
      </span>
      <span className="mt-1.5 flex flex-col gap-0.5 text-[15px] leading-relaxed text-[#2B2433]">
        {card.lines.map((line) => (
          <span key={line} className="[overflow-wrap:anywhere]">
            {line}
          </span>
        ))}
      </span>
    </>
  );
}

export function KontaktContact() {
  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left — contact data */}
        <div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Kontaktdaten
            </span>

            <h2
              className="mt-4 font-extrabold leading-[1.1] tracking-[-0.02em] text-[#211C3D]"
              style={{ fontSize: "clamp(1.9rem, 1.3rem + 2vw, 2.9rem)" }}
            >
              So erreichen Sie <span className="text-brand">uns</span>
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#5B5568] sm:text-base">
              Wir sind persönlich für Sie da. Kontaktieren Sie uns telefonisch,
              per E-Mail oder besuchen Sie uns an unserem Standort in Pfäffikon
              SZ.
            </p>

            <div aria-hidden className="mt-7 flex items-center justify-center gap-2.5">
              <span className="h-[3px] w-12 rounded-full bg-[linear-gradient(90deg,#6330C7,#A77AF4)]" />
              <span className="size-1.5 rounded-full bg-brand-accent" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cards.map((card) => {
              const cls = cardBase;
              return card.href ? (
                <a
                  key={card.id}
                  href={card.href}
                  aria-label={card.ariaLabel}
                  {...(card.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    cls,
                    "outline-none focus-visible:ring-2 focus-visible:ring-brand/45 focus-visible:ring-offset-2",
                  )}
                >
                  <CardInner card={card} />
                </a>
              ) : (
                <div key={card.id} className={cls}>
                  <CardInner card={card} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — contact form */}
        <KontaktForm className="lg:mt-1" />
      </div>
    </section>
  );
}
