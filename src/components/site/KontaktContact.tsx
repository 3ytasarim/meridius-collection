import type { ReactNode } from "react";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

import { KontaktForm } from "@/components/form-1";
import { GradientText } from "@/components/ui/gradient-text-fill";

type InfoItem = {
  icon: ReactNode;
  label: string;
  lines: ReactNode[];
  href?: string;
};

const items: InfoItem[] = [
  {
    icon: <MapPin className="size-[18px]" />,
    label: "Adresse",
    lines: [
      "Meridius Management GmbH",
      "Churerstrasse 158",
      "8808 Pfäffikon SZ, Schweiz",
    ],
    href: "https://www.google.com/maps/dir/?api=1&destination=Churerstrasse+158,+8808+Pfäffikon+SZ",
  },
  {
    icon: <Phone className="size-[18px]" />,
    label: "Telefon",
    lines: ["+41 55 410 00 00"],
    href: "tel:+41554100000",
  },
  {
    icon: <Mail className="size-[18px]" />,
    label: "E-Mail",
    lines: ["info@meridius-collection.ch"],
    href: "mailto:info@meridius-collection.ch",
  },
  {
    icon: <Clock className="size-[18px]" />,
    label: "Erreichbarkeit",
    lines: ["Mo–Fr, 08:00–17:30 Uhr"],
  },
];

export function KontaktContact() {
  return (
    <section className="relative bg-[#F5F0FF] py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        {/* Left: contact details — framed card to match the form */}
        <div className="relative overflow-hidden rounded-3xl border border-brand/12 bg-white p-7 shadow-[0_30px_70px_-40px_rgba(99,48,199,0.25)] sm:p-9">
          {/* corner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand-accent/15 blur-3xl"
          />

          <div className="relative">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Kontaktdaten
            </span>
            <h2 className="mt-3 text-[1.6rem] font-semibold leading-tight tracking-tight sm:text-3xl">
              <GradientText
                as="span"
                colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
              >
                So erreichen Sie uns
              </GradientText>
            </h2>

            <ul className="mt-8 space-y-2">
              {items.map((it) => {
                const external =
                  it.href?.startsWith("http") || it.href?.startsWith("mailto");
                const Row = it.href ? "a" : "div";
                return (
                  <li key={it.label}>
                    <Row
                      {...(it.href
                        ? {
                            href: it.href,
                            ...(external
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {}),
                          }
                        : {})}
                      className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-brand-soft/60"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-accent text-white shadow-[0_12px_28px_-14px_rgba(99,48,199,0.7)] transition-transform duration-300 group-hover:-translate-y-0.5">
                        {it.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#2B2433]">
                          {it.label}
                          {it.href ? (
                            <ArrowUpRight className="size-3.5 text-brand opacity-0 transition-opacity group-hover:opacity-100" />
                          ) : null}
                        </span>
                        <span className="mt-1.5 block space-y-0.5 text-sm leading-relaxed text-[#5b5566]">
                          {it.lines.map((line, i) => (
                            <span key={i} className="block">
                              {line}
                            </span>
                          ))}
                        </span>
                      </span>
                    </Row>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right: form */}
        <KontaktForm />
      </div>
    </section>
  );
}
