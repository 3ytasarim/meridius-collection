import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";
import { impressum } from "@/content/legal";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – Meridius Collection" },
      {
        name: "description",
        content:
          "Impressum von Meridius Collection – Meridius Management GmbH, Churerstrasse 158, 8808 Pfäffikon SZ, Schweiz.",
      },
      { property: "og:title", content: "Impressum – Meridius Collection" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return <LegalPage doc={impressum} />;
}
