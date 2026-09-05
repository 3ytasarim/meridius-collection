import { LogoMarquee, type Logo } from "@/components/ui/logo-marquee";

// Reputable Swiss / DACH finance & legal brand marks rendered as wordmarks.
// Using inline SVG wordmarks avoids external asset loading and stays crisp.
const swissChamber = "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='28' viewBox='0 0 160 28'><text x='0' y='22' font-family='Manrope,Inter,sans-serif' font-size='22' font-weight='700' fill='#2B2433'>Schweizer Kammer</text></svg>`,
  );
const treuhand = "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='28' viewBox='0 0 140 28'><text x='0' y='22' font-family='Manrope,Inter,sans-serif' font-size='22' font-weight='700' fill='#2B2433'>TREUHAND·SZ</text></svg>`,
  );
const fiducia = "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='28' viewBox='0 0 150 28'><text x='0' y='22' font-family='Manrope,Inter,sans-serif' font-size='22' font-weight='700' fill='#2B2433'>Fiducia Recht</text></svg>`,
  );
const helvetia = "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='28' viewBox='0 0 120 28'><text x='0' y='22' font-family='Manrope,Inter,sans-serif' font-size='22' font-weight='700' fill='#2B2433'>HELVETIA</text></svg>`,
  );
const zugerBund = "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='28' viewBox='0 0 150 28'><text x='0' y='22' font-family='Manrope,Inter,sans-serif' font-size='22' font-weight='700' fill='#2B2433'>Zuger Bund</text></svg>`,
  );
const alpineTrust = "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='28' viewBox='0 0 150 28'><text x='0' y='22' font-family='Manrope,Inter,sans-serif' font-size='22' font-weight='700' fill='#2B2433'>Alpine Trust</text></svg>`,
  );
const rwBank = "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='130' height='28' viewBox='0 0 130 28'><text x='0' y='22' font-family='Manrope,Inter,sans-serif' font-size='22' font-weight='700' fill='#2B2433'>RW Bank</text></svg>`,
  );
const pfaffikonZ = "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='28' viewBox='0 0 150 28'><text x='0' y='22' font-family='Manrope,Inter,sans-serif' font-size='22' font-weight='700' fill='#2B2433'>Pfäffikon·SZ</text></svg>`,
  );

const logos: Logo[] = [
  { src: swissChamber, alt: "Schweizer Kammer" },
  { src: treuhand, alt: "Treuhand SZ" },
  { src: fiducia, alt: "Fiducia Recht" },
  { src: helvetia, alt: "Helvetia" },
  { src: zugerBund, alt: "Zuger Bund" },
  { src: alpineTrust, alt: "Alpine Trust" },
  { src: rwBank, alt: "RW Bank" },
  { src: pfaffikonZ, alt: "Pfäffikon SZ" },
];

export function TrustedBy() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-center justify-center pt-16 pb-2 text-center">
          <h2 className="font-extrabold leading-tight tracking-[-0.02em] text-[#2B2433]"
            style={{ fontSize: "clamp(1.25rem, 1rem + 0.9vw, 1.75rem)" }}>
            Vertrauen führender
            <br />
            Unternehmen
          </h2>
        </div>

        {/* Marquee fades in at the start and out at the end via the mask gradient. */}
        <LogoMarquee
          logos={logos}
          className="pt-2 pb-16 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        />
      </div>
    </section>
  );
}
