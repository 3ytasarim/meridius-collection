import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";
import { datenschutz } from "@/content/legal";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung – Meridius Collection" },
      {
        name: "description",
        content:
          "Datenschutzerklärung von Meridius Collection: wie die Meridius Management GmbH Personendaten nach dem Schweizer Datenschutzgesetz (DSG) bearbeitet.",
      },
      { property: "og:title", content: "Datenschutzerklärung – Meridius Collection" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return <LegalPage doc={datenschutz} />;
}
