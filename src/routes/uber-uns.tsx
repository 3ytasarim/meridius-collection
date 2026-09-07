import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AboutHero } from "@/components/site/AboutHero";
import { AboutStatement } from "@/components/site/AboutStatement";
import { AboutApproach } from "@/components/site/AboutApproach";
import { AboutLocation } from "@/components/site/AboutLocation";

export const Route = createFileRoute("/uber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns – Meridius Collection" },
      {
        name: "description",
        content:
          "Meridius Collection ist die Inkassomarke der Meridius Management GmbH mit Sitz in Pfäffikon SZ – ein neues Inkassobüro mit klarer Haltung.",
      },
      { property: "og:title", content: "Über uns – Meridius Collection" },
      {
        property: "og:description",
        content:
          "Ein neues Inkassobüro mit klarer Haltung – die Inkassomarke der Meridius Management GmbH aus Pfäffikon SZ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="relative">
          <Header />
          <AboutHero />
        </div>
        <AboutStatement />
        <AboutApproach />
        <AboutLocation />
      </main>
      <Footer />
    </div>
  );
}
