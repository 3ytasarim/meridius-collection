import { Hero } from "@/components/ui/hero-1";

/**
 * About hero — the site's light hero ground with the wide "planet horizon" arc
 * and KontaktHero's per-letter headline reveal. German copy verbatim.
 */
export function AboutHero() {
  return (
    <Hero
      eyebrow=""
      titleLead="Ein neues Inkassobüro "
      titleAccent="mit klarer Haltung."
      subtitle="Meridius Collection ist die Inkassomarke der Meridius Management GmbH mit Sitz in Pfäffikon SZ."
      ctaLabel="Kontakt aufnehmen"
      ctaHref="/kontakt"
    />
  );
}
