import { ProjectCard } from "@/components/project-card";
import { GradientText } from "@/components/ui/gradient-text-fill";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";

const cards = [
  {
    imgSrc: "/images_1.png",
    title: "Fallnummer & Auftraggeber",
    description:
      "Eine echte Nachricht von uns nennt stets eine Fallnummer sowie das Unternehmen, das uns mit dem Inkasso beauftragt hat.",
  },
  {
    imgSrc: "/images_2.png",
    title: "Offizieller Absender",
    description:
      "Meridius Management GmbH, Churerstrasse 158, 8808 Pfäffikon SZ — diese Angaben finden Sie auf jedem offiziellen Schreiben von uns.",
  },
  {
    imgSrc: "/images_3.png",
    title: "Nachvollziehbare Kontaktaufnahme",
    description:
      "Kontaktieren Sie uns im Zweifel über die auf dieser Website angegebene Telefonnummer oder E-Mail-Adresse — nicht über Links aus einer fragwürdigen Nachricht.",
  },
];

export function ZahlungSicherheit() {
  return (
    <section className="relative bg-transparent py-20 sm:py-28">
      {/* Heading — centred, house style */}
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <SectionEyebrow>Sicherheit</SectionEyebrow>
        <h2
          className="mt-4 font-semibold leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(2rem, 1.5rem + 2.4vw, 3.1rem)" }}
        >
          <GradientText
            as="span"
            colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
          >
            So erkennen Sie eine echte Nachricht von uns
          </GradientText>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5b5566] sm:text-lg">
          Bei Unsicherheit gilt: Lieber einmal zu viel bei uns nachfragen — über
          die Kontaktdaten auf dieser Website, nicht über Angaben aus einer
          verdächtigen Nachricht.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-7 px-6 sm:mt-16 md:grid-cols-3">
        {cards.map((c) => (
          <ProjectCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}
