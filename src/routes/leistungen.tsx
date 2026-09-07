import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LeistungenHero } from "@/components/site/LeistungenHero";
import { LeistungenFeatures } from "@/components/site/LeistungenFeatures";

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
          <LeistungenHero />
        </div>
        <LeistungenFeatures />
      </main>
      <Footer />
    </div>
  );
}
