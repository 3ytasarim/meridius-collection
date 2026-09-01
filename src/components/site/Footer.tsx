import { Mail, Phone, MapPin } from "lucide-react";

const marqueeItems = Array.from({ length: 10 });

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Zahlung erhalten?", href: "#zahlung" },
];

const leistungen = [
  "B2B & B2C Inkasso",
  "Mahnwesen",
  "KI-Forderungsmanagement",
  "Massenforderungen",
];

export function Footer() {
  return (
    <footer className="w-full overflow-hidden rounded-t-[2.5rem] bg-brand text-white">
      {/* Kayan yazı */}
      <div className="overflow-hidden border-b border-white/10 py-5">
        <div className="flex w-max animate-[footer-marquee_30s_linear_infinite] items-center gap-8 whitespace-nowrap">
          {marqueeItems.map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="text-[22px] font-extrabold tracking-[0.06em] text-white sm:text-[28px]">
                MERIDIUS-COLLECTION.CH
              </span>
              <span className="text-white/30">—</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marka */}
          <div>
            <div className="flex items-center gap-3">
              <span className="block h-6 w-6 rounded-full bg-[#2b2738]" aria-hidden="true" />
              <span className="text-[17px] font-bold text-white">Meridius Collection</span>
            </div>
            <p className="mt-5 max-w-[280px] text-[14px] leading-relaxed text-white/60">
              Modernes, KI-gestütztes Forderungsmanagement der Meridius Management GmbH
              mit Sitz in Pfäffikon SZ, Schweiz.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
              Leistungen
            </h3>
            <ul className="mt-5 space-y-3">
              {leistungen.map((l) => (
                <li key={l} className="text-[14px] text-white/75">
                  {l}
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
              Kontakt
            </h3>
            <ul className="mt-5 space-y-3 text-[14px] text-white/75">
              <li className="flex items-start gap-2">
                <Mail className="mt-[3px] h-4 w-4 shrink-0 text-brand-light" />
                <a href="mailto:info@meridius-collection.ch" className="hover:text-white">
                  info@meridius-collection.ch
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-[3px] h-4 w-4 shrink-0 text-brand-light" />
                <a href="tel:+41554100000" className="hover:text-white">
                  +41 55 410 00 00
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-[3px] h-4 w-4 shrink-0 text-brand-light" />
                <span>Churerstrasse 158, 8808 Pfäffikon SZ</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Meridius Management GmbH. Alle Rechte vorbehalten.</span>
          <span>Bearbeitung von Personendaten gemäss revDSG</span>
        </div>
      </div>
    </footer>
  );
}
