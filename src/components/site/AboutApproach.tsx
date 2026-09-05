import { Zap, Sparkles, ShieldCheck, ChevronRight } from "lucide-react";

import { HighlightCard } from "@/components/highlight-card";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { GradientText } from "@/components/ui/gradient-text-fill";

const cards = [
  {
    id: "agil",
    title: "Agil statt behäbig",
    icon: <Zap className="size-7" />,
    description: [
      "Flache Hierarchien und digitale Prozesse von Beginn weg —",
      "keine gewachsenen Altlasten, keine Papierberge.",
    ],
  },
  {
    id: "tech",
    title: "Technologie als Werkzeug",
    icon: <Sparkles className="size-7" />,
    description: [
      "KI unterstützt unsere Fallbearbeitung, ersetzt aber nicht",
      "die fachliche und rechtliche Beurteilung durch Menschen.",
    ],
  },
  {
    id: "fair",
    title: "Fair gegenüber beiden Seiten",
    icon: <ShieldCheck className="size-7" />,
    description: [
      "Wir kommunizieren transparent mit Schuldnerinnen und",
      "Schuldnern und suchen tragfähige Lösungen statt reinem Druck.",
    ],
  },
];

export function AboutApproach() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <AnimatedGradientText className="gap-0 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="size-3 text-brand-accent" />
            <span className="mx-2 h-3.5 w-px bg-brand/25" />
            <span className="animate-gradient bg-gradient-to-r from-brand-dark via-brand-accent to-brand-light bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              Ansatz
            </span>
            <ChevronRight className="ml-1 size-3 text-brand transition-transform duration-300 group-hover:translate-x-0.5" />
          </AnimatedGradientText>
          <h2
            className="mt-4 font-semibold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 1.4rem + 2vw, 3rem)" }}
          >
            <GradientText
              as="span"
              colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
            >
              Was uns von klassischen Inkassobüros unterscheidet
            </GradientText>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cards.map((c, i) => (
            <HighlightCard
              key={c.id}
              title={c.title}
              icon={c.icon}
              description={c.description}
              idleDelay={i * -2.3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
