import { motion, useReducedMotion } from "framer-motion";

import { DropText } from "@/components/ui/drop-text";

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
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-16 px-6 sm:px-8 md:grid-cols-3 lg:gap-x-16">
        {features.map((f, i) => (
          <motion.article
            key={f.eyebrow}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-5 text-xs font-bold uppercase text-primary">{f.eyebrow}</p>
            <h2 className="max-w-[18ch] text-[clamp(1.75rem,2.2vw,2.45rem)] font-extrabold leading-[1.12] text-foreground">
              <DropText delay={i * 0.1 + 0.04}>{f.title}</DropText>
            </h2>
            <p className="mt-7 max-w-[37ch] text-base leading-7 text-muted-foreground sm:text-[1.0625rem]">
              {f.paragraph}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
