import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";
import { agb } from "@/content/legal";

export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [
      { title: "AGB – Meridius Collection" },
      {
        name: "description",
        content:
          "Allgemeine Geschäftsbedingungen (AGB) der Meridius Management GmbH für Inkasso und Forderungsmanagement unter der Marke Meridius Collection.",
      },
      { property: "og:title", content: "AGB – Meridius Collection" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AgbPage,
});

function AgbPage() {
  return <LegalPage doc={agb} />;
}
