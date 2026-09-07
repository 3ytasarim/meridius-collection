"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * 02 — Mahnwesen.
 * Staggered editorial photo gallery — layout taken from the 21st.dev
 * "cta-section-with-gallery" block (two-column offset grid, four cells), adapted
 * to the Meridius system: site radius, a soft brand-tinted shadow, and the
 * site's standard fade/de-blur reveal instead of the original spring. The
 * photos are the design — no cards, dashboards or badges.
 */

const PHOTOS = [
  {
    src: "/olena-kholina-MhqUBTxQ3Hw-unsplash.jpg",
    alt: "Juristin prüft Unterlagen zu einer offenen Forderung",
    area: "col-[2/3] row-[1/3]",
    position: "50% 28%",
  },
  {
    src: "/camilo-rueda-lopez-3CLPBgNuX40-unsplash.jpg",
    alt: "Gerichtsgebäude mit Säulenfassade",
    area: "col-[1/2] row-[2/4]",
    position: "50% 45%",
  },
  {
    src: "/kelly-sikkema-0oZpRxG5Hkk-unsplash.jpg",
    alt: "Mahnschreiben und Vertragsunterlagen auf einem Schreibtisch",
    area: "col-[1/2] row-[4/6]",
    position: "50% 42%",
  },
  {
    src: "/pexels-cottonbro-6814523.jpg",
    alt: "Beratungsgespräch zu einem Betreibungsverfahren",
    area: "col-[2/3] row-[3/5]",
    position: "50% 32%",
  },
] as const;

export function MahnwesenVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-2 grid-rows-[38px_128px_38px_128px_38px] gap-3.5 sm:grid-rows-[50px_150px_50px_150px_50px] sm:gap-4">
      {PHOTOS.map((p, i) => (
        <motion.div
          key={p.src}
          initial={reduce ? false : { opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: reduce ? 0 : i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`relative overflow-hidden rounded-xl shadow-[0_25px_55px_-14px_rgba(99,48,199,0.42)] ${p.area}`}
        >
          <img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="block size-full object-cover"
            style={{ objectPosition: p.position }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default MahnwesenVisual;
