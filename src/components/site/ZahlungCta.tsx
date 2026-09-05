import { Link } from "@tanstack/react-router";

import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";

export function ZahlungCta() {
  return (
    <section className="relative bg-transparent py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-dark px-8 py-12 sm:px-12 sm:py-14">
          {/* subtle brand glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--brand-accent), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -bottom-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--brand-light), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <AnimatedText
                text="Fragen bleiben offen?"
                fontSize="clamp(1.5rem, 1rem + 2vw, 2.6rem)"
                minWeight={300}
                maxWeight={800}
                animationDuration={2}
                delayMultiplier={0.18}
                className="tracking-tight text-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button3D variant="primary" size="md" asChild>
                <Link to="/kontakt">Chat-Assistent öffnen</Link>
              </Button3D>
              <Button3D variant="outline" size="md" asChild>
                <Link to="/kontakt">Team kontaktieren</Link>
              </Button3D>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
