import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ZahlungHero } from "@/components/site/ZahlungHero";
import { ZahlungSicherheit } from "@/components/site/ZahlungSicherheit";
import { ZahlungFaq } from "@/components/site/ZahlungFaq";
import { ZahlungOptionen } from "@/components/site/ZahlungOptionen";
import { ZahlungCta } from "@/components/site/ZahlungCta";

export const Route = createFileRoute("/zahlung-erhalten")({
  head: () => ({
    meta: [
      { title: "Zahlung erhalten? – Meridius Collection" },
      {
        name: "description",
        content:
          "Sie haben ein Schreiben von Meridius Collection erhalten? Hier erfahren Sie, wie Sie Ihre offene Forderung schnell und unkompliziert begleichen.",
      },
      {
        property: "og:title",
        content: "Zahlung erhalten? – Meridius Collection",
      },
      {
        property: "og:description",
        content:
          "So begleichen Sie eine offene Forderung bei Meridius Collection – Schritt für Schritt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ZahlungPage,
});

function ZahlungPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="relative">
          <Header />
          <ZahlungHero />
        </div>

        <ZahlungSicherheit />
        <ZahlungOptionen />
        <ZahlungFaq />
        <ZahlungCta />
      </main>
      <Footer />
    </div>
  );
}
