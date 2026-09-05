"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export type DropTextProps = {
  /** Plain text to animate character by character. */
  children: string;
  className?: string;
  /** Delay before the drop starts, in seconds. */
  delay?: number;
  /** Per-character stagger, in seconds. */
  stagger?: number;
  /** Distance the characters fall from, in pixels. */
  distance?: number;
};

/**
 * Drop Text — headline whose characters fall and bounce into place with a
 * staggered gravity drop. Inherits font-family, size, weight and color from
 * its parent. Respects the reduced-motion preference.
 */
export function DropText({
  children,
  className,
  delay = 0,
  stagger = 0.03,
  distance = 28,
}: DropTextProps) {
  const reduceMotion = useReducedMotion();
  const chars = React.useMemo(() => Array.from(children), [children]);

  return (
    <span className={cn("inline-block", className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block whitespace-pre will-change-transform"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 420,
                    damping: 18,
                    mass: 0.7,
                    delay: delay + i * stagger,
                  }
            }
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export default DropText;
