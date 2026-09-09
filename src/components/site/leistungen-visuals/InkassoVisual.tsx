"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * 01 — B2B & B2C Inkasso.
 * Staggered floating photo collage (layout after 21st.dev "hero-section-9"
 * image column), recoloured to the Meridius purple. Three photos scale in with
 * a stagger and drift gently; decorative purple shapes float behind them.
 */

const IMAGES = [
  {
    src: "/radission-us-_XeQ8XEWb4Q-unsplash.jpg",
    alt: "Beraterin unterstützt eine Kundin bei einer offenen Forderung",
    pos: "left-1/2 top-0 h-44 w-44 -translate-x-1/2 sm:h-64 sm:w-64",
    origin: "bottom center",
    objectPosition: "52% 26%",
  },
  {
    src: "/sumup-YDe0nOZyLHI-unsplash.jpg",
    alt: "Person klärt Unterlagen zu einer Rechnung am Laptop",
    pos: "right-0 top-1/3 h-36 w-36 sm:h-56 sm:w-56",
    origin: "left center",
    objectPosition: "38% 42%",
  },
  {
    src: "/pexels-karola-g-5900074.jpg",
    alt: "Familie bespricht eine offene Zahlung",
    pos: "bottom-0 left-0 h-32 w-32 sm:h-48 sm:w-48",
    origin: "top right",
    objectPosition: "42% 45%",
  },
] as const;

const SHAPES = [
  { pos: "-top-4 left-1/4 size-14 sm:size-20", shape: "rounded-full bg-[#B7A0EE]/50", dur: 3.4 },
  { pos: "bottom-0 right-1/4 size-12 sm:size-16", shape: "rounded-[1.25rem] bg-[#C9B7F4]/55", dur: 4.2 },
  { pos: "bottom-1/4 left-2 size-6 sm:size-7", shape: "rounded-full bg-brand/30", dur: 3.8 },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};
const tile: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function InkassoVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative mx-auto h-[360px] w-full max-w-[460px] sm:h-[480px] lg:mx-0 lg:max-w-none"
    >
      {SHAPES.map((s, i) => (
        <div key={i} aria-hidden className={`pointer-events-none absolute ${s.pos}`}>
          <motion.div
            className={`size-full blur-[1px] ${s.shape}`}
            animate={reduce ? { y: 0 } : { y: [0, -9, 0] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: s.dur, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </div>
      ))}

      {IMAGES.map((img) => (
        <motion.div
          key={img.src}
          variants={tile}
          style={{ transformOrigin: img.origin }}
          className={`absolute overflow-hidden rounded-2xl bg-white p-2 shadow-[0_28px_60px_-12px_rgba(99,48,199,0.45)] ${img.pos}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-xl object-cover"
            style={{ objectPosition: img.objectPosition }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default InkassoVisual;
