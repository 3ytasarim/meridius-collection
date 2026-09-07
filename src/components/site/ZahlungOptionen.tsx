import { CreditCard, CalendarClock, Clock, type LucideIcon } from "lucide-react";

import { BlurredStaggerText } from "@/components/ui/blurred-stagger-text";

type Feature = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  /** vivid purple tints for the round icon badge */
  tint: string;
  fg: string;
};

const features: Feature[] = [
  {
    id: "ueberweisung",
    title: "Überweisung",
    description:
      "Begleichen Sie die Forderung per Banküberweisung unter Angabe Ihrer Fallnummer als Zahlungsreferenz.",
    Icon: CreditCard,
    tint: "#DEC9FF",
    fg: "#4A2299",
  },
  {
    id: "raten",
    title: "Ratenzahlung",
    description:
      "Beantragen Sie eine Ratenzahlungsvereinbarung, die zu Ihrer aktuellen Situation passt.",
    Icon: CalendarClock,
    tint: "#C6A2F5",
    fg: "#3B1B80",
  },
  {
    id: "aufschub",
    title: "Zahlungsaufschub",
    description:
      "Benötigen Sie kurzfristig mehr Zeit? Kontaktieren Sie uns möglichst, bevor die Frist abläuft.",
    Icon: Clock,
    tint: "#AE83EF",
    fg: "#FFFFFF",
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

      {/* 21st.dev prebuiltui/feature-sections — demo layout: feature list left, staggered image collage right */}
      <div className="relative mx-auto mt-14 max-w-6xl px-6 sm:mt-16">
        <div className="flex flex-col items-center gap-14 md:flex-row md:gap-24">
          {/* Feature list — left */}
          <div className="space-y-14">
            {features.map((f) => (
              <div key={f.id} className="flex max-w-md items-center gap-5 sm:gap-6">
                <div
                  className="flex aspect-square shrink-0 items-center justify-center rounded-full p-5 shadow-[0_10px_26px_-12px_rgba(99,48,199,0.5)] sm:p-6"
                  style={{ backgroundColor: f.tint, color: f.fg }}
                >
                  <f.Icon className="size-7" strokeWidth={2} aria-hidden />
                </div>
                <div className="space-y-2">
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

          {/* Staggered two-image collage — right */}
          <div className="relative w-full max-w-md shrink-0 pb-[22%] md:ml-auto md:mr-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(167,122,244,0.28),transparent_70%)] blur-2xl"
            />
            <img
              src="/major-tom-agency-44m0VUlDmXA-unsplash.jpg"
              alt=""
              loading="lazy"
              decoding="async"
              className="w-[60%] rounded-2xl object-cover shadow-[0_20px_50px_-20px_rgba(46,24,92,0.35)] ring-1 ring-brand/30"
            />
            <img
              src="/alexander-grey-tn57JI3CewI-unsplash.jpg"
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute bottom-0 right-0 w-[54%] rounded-2xl object-cover shadow-[0_28px_60px_-22px_rgba(99,48,199,0.45)] ring-1 ring-brand/30 ring-offset-4 ring-offset-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
