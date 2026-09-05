"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

const fieldBase =
  "mt-2 w-full rounded-xl border border-brand/15 bg-white px-3.5 py-2.5 text-sm text-[#2B2433] placeholder:text-[#9a93a6] outline-none transition focus:border-brand/40 focus:ring-4 focus:ring-brand/10";

const labelBase = "text-[13px] font-semibold text-[#2B2433]";

const ANLIEGEN = [
  "Neuen Fall einreichen",
  "Sammelinkasso / Massenforderungen",
  "Allgemeine Anfrage",
  "Partnerschaft",
] as const;

export function KontaktForm({ className }: { className?: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        className={cn(
          "flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-brand/12 bg-white p-10 text-center shadow-[0_30px_70px_-40px_rgba(99,48,199,0.25)]",
          className,
        )}
      >
        <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
          <Check className="size-6" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-[#2B2433]">
          Vielen Dank für Ihre Anfrage.
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#5b5566]">
          Wir haben Ihre Nachricht erhalten und melden uns zeitnah bei Ihnen
          zurück.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className={cn(
        "rounded-2xl border border-brand/12 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(99,48,199,0.25)] sm:p-8",
        className,
      )}
    >
      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <div>
          <label htmlFor="k-name" className={labelBase}>
            Name
          </label>
          <input
            id="k-name"
            name="name"
            type="text"
            required
            placeholder="Vor- und Nachname"
            className={fieldBase}
          />
        </div>
        <div>
          <label htmlFor="k-firma" className={labelBase}>
            Firma
          </label>
          <input
            id="k-firma"
            name="firma"
            type="text"
            placeholder="Firmenname (optional)"
            className={fieldBase}
          />
        </div>

        <div>
          <label htmlFor="k-email" className={labelBase}>
            E-Mail
          </label>
          <input
            id="k-email"
            name="email"
            type="email"
            required
            placeholder="name@firma.ch"
            className={fieldBase}
          />
        </div>
        <div>
          <label htmlFor="k-tel" className={labelBase}>
            Telefon
          </label>
          <input
            id="k-tel"
            name="telefon"
            type="tel"
            placeholder="+41 79 000 00 00"
            className={fieldBase}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="k-anliegen" className={labelBase}>
            Anliegen
          </label>
          <select
            id="k-anliegen"
            name="anliegen"
            className={cn(fieldBase, "appearance-none bg-[length:0] pr-9")}
            defaultValue={ANLIEGEN[0]}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236330C7' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.85rem center",
            }}
          >
            {ANLIEGEN.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="k-nachricht" className={labelBase}>
            Nachricht
          </label>
          <textarea
            id="k-nachricht"
            name="nachricht"
            rows={5}
            required
            placeholder="Kurze Beschreibung Ihres Anliegens"
            className={cn(fieldBase, "resize-none")}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
      >
        Anfrage senden
        <ArrowRight className="size-4" />
      </button>

      <p className="mt-4 text-xs leading-relaxed text-[#8b8496]">
        Mit dem Absenden stimmen Sie zu, dass wir Ihre Angaben zur Bearbeitung
        Ihrer Anfrage verwenden.
      </p>
    </form>
  );
}

export default KontaktForm;
