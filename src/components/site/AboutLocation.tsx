import { LocationMapPanel } from "@/components/ride-booking-form";
import { TextGradient } from "@/components/ui/text-gradient";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d731.9483818298147!2d8.797697303635795!3d47.20151408737337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ab6bb04153e69%3A0x1208572a0d05a00!2zQ2h1cmVyc3RyYXNzZSAxNTgsIDg4MDggUGbDpGZmaWtvbiwgU2Nod2Vpeg!5e0!3m2!1sde!2sch!4v1788307129671!5m2!1sde!2sch";

export function AboutLocation() {
  return (
    <section className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[94rem] px-4 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#E9DEFF_0%,#F1E9FF_44%,#F7F2FF_100%)] px-6 py-10 ring-1 ring-inset ring-brand/10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <LocationMapPanel
            eyebrow="Standort"
            title={
              <>
                Zu Hause in{" "}
                <TextGradient
                  as="span"
                  children="Pfäffikon SZ"
                  colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
                  duration={6}
                  angle={90}
                  className="font-extrabold pb-[0.12em] leading-[1.15]"
                />
              </>
            }
            intro="Die Meridius Management GmbH betreibt Meridius Collection von ihrem Sitz an der Churerstrasse 158 in Pfäffikon SZ aus — zentral im March-Gebiet und gut erreichbar aus dem gesamten Kanton Schwyz sowie der Region Zürichsee."
            company="Meridius Management GmbH"
            addressLines={["Churerstrasse 158", "8808 Pfäffikon SZ", "Schweiz"]}
            mapEmbedUrl={MAP_EMBED_URL}
          />
        </div>
      </div>
    </section>
  );
}
