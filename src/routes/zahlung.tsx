import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ConfettiBackground } from "@/components/ui/confetti-background";
import { ZahlungHero } from "@/components/site/ZahlungHero";
import { ZahlungSicherheit } from "@/components/site/ZahlungSicherheit";
import { ZahlungFaq } from "@/components/site/ZahlungFaq";
import { ZahlungOptionen } from "@/components/site/ZahlungOptionen";
import { ZahlungCta } from "@/components/site/ZahlungCta";
import { FloatingSideCta } from "@/components/site/FloatingSideCta";

export const Route = createFileRoute("/zahlung")({
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

        {/* Confetti spans everything from below the hero to the footer */}
        <div className="relative isolate overflow-clip bg-[#F5F0FF]">
          <ConfettiBackground className="z-0" />
          <div className="relative z-10">
            <ZahlungSicherheit />
            <ZahlungFaq />
            <ZahlungOptionen />
            <ZahlungCta />
          </div>
        </div>
      </main>
      <Footer />
      <FloatingSideCta />
    </div>
  );
}
