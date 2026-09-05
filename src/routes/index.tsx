import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Leistungen } from "@/components/site/Leistungen";
import { Ablauf } from "@/components/site/Ablauf";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridius Collection – Inkasso & Forderungsmanagement" },
      {
        name: "description",
        content:
          "Modernes, KI-gestütztes Forderungsmanagement der Meridius Management GmbH in Pfäffikon SZ – fair, digital und rechtlich sauber.",
      },
      { property: "og:title", content: "Meridius Collection – Inkasso & Forderungsmanagement" },
      {
        property: "og:description",
        content:
          "Klare Linie. Faire Lösung. KI-gestütztes Forderungsmanagement aus Pfäffikon SZ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <main id="start">
        <div className="relative">
          <Header />
          <Hero />
        </div>
        <Features />
        <Leistungen />
        <Ablauf />
        <CTA />
      </main>
      <Footer />
    </div>

  );
}
