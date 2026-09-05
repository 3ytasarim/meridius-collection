import { LocationMapPanel } from "@/components/ride-booking-form";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d731.9483818298147!2d8.797697303635795!3d47.20151408737337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ab6bb04153e69%3A0x1208572a0d05a00!2zQ2h1cmVyc3RyYXNzZSAxNTgsIDg4MDggUGbDpGZmaWtvbiwgU2Nod2Vpeg!5e0!3m2!1sde!2sch!4v1788307129671!5m2!1sde!2sch";

export function AboutLocation() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="px-6">
        <LocationMapPanel
          eyebrow="Standort"
          title="Zu Hause in Pfäffikon SZ"
          intro="Die Meridius Management GmbH betreibt Meridius Collection von ihrem Sitz an der Churerstrasse 158 in Pfäffikon SZ aus — zentral im March-Gebiet und gut erreichbar aus dem gesamten Kanton Schwyz sowie der Region Zürichsee."
          company="Meridius Management GmbH"
          addressLines={["Churerstrasse 158", "8808 Pfäffikon SZ", "Schweiz"]}
          mapEmbedUrl={MAP_EMBED_URL}
        />
      </div>
    </section>
  );
}
