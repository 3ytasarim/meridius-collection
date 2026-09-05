import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { KontaktHero } from "@/components/site/KontaktHero";
import { KontaktContact } from "@/components/site/KontaktContact";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Meridius Collection" },
      {
        name: "description",
        content:
          "Sprechen wir über Ihren Fall – ob einzelne Forderung oder Sammelinkasso mit hohem Fallvolumen. Die Meridius Management GmbH meldet sich zeitnah zurück.",
      },
      { property: "og:title", content: "Kontakt – Meridius Collection" },
      {
        property: "og:description",
        content:
          "Ob einzelne Forderung oder Sammelinkasso mit hohem Fallvolumen — wir melden uns zeitnah zurück.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="relative">
          <Header />
          <KontaktHero />
        </div>
        <KontaktContact />
      </main>
      <Footer />
    </div>
  );
}
