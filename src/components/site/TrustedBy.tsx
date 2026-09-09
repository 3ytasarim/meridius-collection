import { LogoMarquee, type Logo } from "@/components/ui/logo-marquee";

const logos: Logo[] = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/Meridius_horizontal_invoice_${n}.png`,
    alt: `Meridius Rechnungsbeispiel ${n}`,
  };
});

export function TrustedBy() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-stretch gap-3 py-16 sm:flex-row sm:items-center sm:gap-8">
          {/* Heading — left aligned, marquee starts right after it */}
          <h2
            className="shrink-0 font-extrabold leading-[1.05] tracking-[-0.02em] text-[#2B2433] sm:w-max"
            style={{ fontSize: "clamp(1.35rem, 1.05rem + 1.1vw, 2rem)" }}
          >
            Vom offenen Betrag
            <br />
            zum Zahlungseingang
          </h2>

          {/* Marquee fills the rest of the row; fades in/out at the edges */}
          <LogoMarquee
            logos={logos}
            className="w-full min-w-0 flex-1 py-2 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          />
        </div>
      </div>
    </section>
  );
}
