import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

const marqueeItems = Array.from({ length: 10 });

const navLinks = [
  { label: "Start", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Über uns", href: "/uber-uns" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Zahlung erhalten?", href: "/zahlung" },
] as const;

const rechtliches = [
  { label: "Datenschutz", href: "#" },
  { label: "Impressum", href: "#" },
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

      {/* same inset as the header so the footer logo lines up with the header logo */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marka */}
          <div>
            {/* Asset has ~42% transparent padding top & bottom — crop it so the
                mark reads large and the text below can hug it. */}
            <Link
              to="/"
              aria-label="Meridius Collection"
              className="block h-9 w-full max-w-[300px] overflow-hidden sm:h-10"
            >
              <img
                src="/meridius-footer-logo.png"
                alt="Meridius Collection"
                width={1761}
                height={893}
                className="h-full w-full object-cover object-center"
              />
            </Link>
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
                  <Link
                    to={l.href}
                    className="text-[14px] text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <ul className="space-y-3">
              {rechtliches.map((l) => (
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
