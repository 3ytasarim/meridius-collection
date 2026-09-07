"use client";

import { useEffect } from "react";

type ParticlesJsFn = (tagId: string, config: unknown) => void;
type PJSInstance = {
  pJS: { fn: { vendors: { destroypJS: () => void } } };
};
type ParticlesWindow = Window & {
  particlesJS?: ParticlesJsFn;
  pJSDom?: PJSInstance[];
};

// particles.js 2.0.0 is written in sloppy mode (uses `arguments.callee`), which
// throws when bundled as an ES module. Load the original script from the CDN
// instead — same source the 21st.dev component uses — once per document.
const CDN_SRC = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
let loaderPromise: Promise<void> | null = null;

function loadParticlesJs(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  const w = window as ParticlesWindow;
  if (typeof w.particlesJS === "function") return Promise.resolve();
  if (loaderPromise) return loaderPromise;
  loaderPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = CDN_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loaderPromise = null;
      reject(new Error("particles.js failed to load"));
    };
    document.head.appendChild(s);
  });
  return loaderPromise;
}

type ParticlesBgProps = {
  /** DOM id for the particles container (unique per instance). */
  id?: string;
  className?: string;
  /** Dot colour — a light purple by default. */
  color?: string;
  /** Connecting-line colour. */
  lineColor?: string;
  /** Particle count (density is area-scaled). */
  count?: number;
};

/**
 * particles.js backdrop (21st.dev "particles-bg"), adapted for Meridius:
 * scoped to its parent (no full-page canvas), light-purple palette, a single
 * shared CDN loader, SSR-safe. The parent supplies the background — this layer
 * is transparent.
 */
export function ParticlesBg({
  id = "meridius-particles",
  className = "",
  color = "#8B5CF6",
  lineColor = "#A78BFA",
  count = 90,
}: ParticlesBgProps) {
  useEffect(() => {
    let cancelled = false;
    const w = window as ParticlesWindow;

    const destroy = () => {
      if (w.pJSDom && w.pJSDom.length) {
        for (let i = w.pJSDom.length - 1; i >= 0; i--) {
          try {
            w.pJSDom[i]?.pJS.fn.vendors.destroypJS();
          } catch {
            /* already gone */
          }
        }
        w.pJSDom = [];
      }
      document.querySelector(`#${id} canvas`)?.remove();
    };

    loadParticlesJs()
      .then(() => {
        if (cancelled || typeof w.particlesJS !== "function") return;
        destroy();
        w.particlesJS(id, {
          particles: {
            number: { value: count, density: { enable: true, value_area: 900 } },
            color: { value: color },
            shape: { type: "circle" },
            opacity: {
              value: 0.6,
              random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.3 },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: true, speed: 2, size_min: 1 },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: lineColor,
              opacity: 0.42,
              width: 1,
            },
            move: { enable: true, speed: 1.6, random: true, out_mode: "bounce" },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "grab" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 180, line_linked: { opacity: 0.55 } },
              push: { particles_nb: 3 },
            },
          },
          retina_detect: true,
        });
      })
      .catch(() => {
        /* offline / blocked — the hero still renders without particles */
      });

    return () => {
      cancelled = true;
      destroy();
    };
  }, [id, color, lineColor, count]);

  return <div id={id} aria-hidden className={`absolute inset-0 ${className}`} />;
}

export default ParticlesBg;
