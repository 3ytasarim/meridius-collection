import { createFileRoute, Link } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/blocks/hero";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Button3D } from "@/components/ui/button-3d";
import { TextGradient } from "@/components/ui/text-gradient";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: [
      { title: "Leistungen – Inkasso & Forderungsmanagement | Meridius" },
      {
        name: "description",
        content:
          "Vier Wege, eine Forderung zum Abschluss zu bringen: B2B & B2C Inkasso, Mahnwesen, KI-Forderungsmanagement und Massenforderungen.",
      },
      { property: "og:title", content: "Leistungen – Meridius Collection" },
      {
        property: "og:description",
        content:
          "Von der einzelnen Rechnung bis zum Sammelinkasso über tausende Fälle — abgestimmt auf Ihre Branche und Fallgrösse.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeistungenPage,
});

function LeistungenPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="relative">
          <Header />
          <Hero
            className="pt-28"
            eyebrow={
              <AnimatedGradientText className="text-white/90">
                <span className="relative mr-2 inline-flex h-1.5 w-1.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-light)] opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand-light)]" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-xs">
                  Leistungen
                </span>
              </AnimatedGradientText>
            }
            title={
              <>
                Vier Wege, eine Forderung
                <br className="hidden sm:block" /> zum Abschluss zu bringen.
              </>
            }
            subtitle="Von der einzelnen Rechnung bis zum Sammelinkasso über tausende Fälle — abgestimmt auf Ihre Branche und Fallgrösse."
            actions={
              <>
                <Button3D asChild size="lg">
                  <Link to="/" hash="kontakt">
                    <TextGradient
                      children="Kontakt aufnehmen"
                      as="span"
                      colors={["#FFFFFF", "#F4EFFF", "#A77AF4", "#FFFFFF"]}
                      duration={5}
                      angle={135}
                      className="font-semibold"
                    />
                  </Link>
                </Button3D>
                <Button3D asChild variant="outline" size="lg">
                  <Link to="/" hash="leistungen">
                    <TextGradient
                      children="Zur Übersicht"
                      as="span"
                      colors={["#2B2433", "#6330C7", "#7C45E8", "#2B2433"]}
                      duration={5}
                      angle={135}
                      className="font-semibold"
                    />
                  </Link>
                </Button3D>
              </>
            }
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
