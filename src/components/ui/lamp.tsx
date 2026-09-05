"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type LampBeamProps = {
  className?: string;
  /** Beam + hot-line colour. */
  light?: string;
  /** Soft bloom colour around the source. */
  glow?: string;
  /** Distance of the light line from the top of the parent (px). */
  lineOffset?: number;
};

const CONE_MASK =
  "radial-gradient(115% 78% at 50% 0%, #000 26%, transparent 74%)";

/**
 * Lamp beam overlay (after 21st.dev `manuarora700/lamp` / Aceternity UI).
 * Pure light: a hot line, twin conic beams and a bloom, screen-blended so it
 * lays over any backdrop (e.g. the animated hills) without an opaque stage.
 * Position the parent `relative`; the beam anchors to its top.
 */
export function LampBeam({
  className,
  light = "#6d28d9",
  glow = "#7c3aed",
  lineOffset = 150,
}: LampBeamProps) {
  return (
    <div
      aria-hidden
      style={
        {
          "--lamp-light": light,
          "--lamp-glow": glow,
          "--lamp-line": `${lineOffset}px`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden",
        className,
      )}
    >
      {/* left cone */}
      <motion.div
        initial={{ opacity: 0, width: "14rem" }}
        whileInView={{ opacity: 0.5, width: "32rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "conic-gradient(from 82deg at center top, var(--lamp-light), transparent 42%)",
          maskImage: CONE_MASK,
          WebkitMaskImage: CONE_MASK,
        }}
        className="absolute right-1/2 top-[var(--lamp-line)] h-64 w-[32rem]"
      />

      {/* right cone */}
      <motion.div
        initial={{ opacity: 0, width: "14rem" }}
        whileInView={{ opacity: 0.5, width: "32rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "conic-gradient(from 278deg at center top, transparent 58%, var(--lamp-light))",
          maskImage: CONE_MASK,
          WebkitMaskImage: CONE_MASK,
        }}
        className="absolute left-1/2 top-[var(--lamp-line)] h-64 w-[32rem]"
      />

      {/* wide soft bloom */}
      <div className="absolute left-1/2 top-[var(--lamp-line)] h-40 w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--lamp-glow)] opacity-45 blur-3xl" />

      {/* tight bloom */}
      <motion.div
        initial={{ width: "8rem" }}
        whileInView={{ width: "18rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }}
        className="absolute left-1/2 top-[calc(var(--lamp-line)-0.75rem)] h-28 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--lamp-glow)] opacity-60 blur-2xl"
      />

      {/* hot line */}
      <motion.div
        initial={{ width: "14rem", opacity: 0.4 }}
        whileInView={{ width: "32rem", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }}
        className="absolute left-1/2 top-[var(--lamp-line)] h-[3px] w-[32rem] -translate-x-1/2 rounded-full bg-[var(--lamp-light)] shadow-[0_0_24px_4px_var(--lamp-glow)]"
      />
    </div>
  );
}

export default LampBeam;
