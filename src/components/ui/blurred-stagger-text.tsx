"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Word-grouped, letter-by-letter blur-in reveal (from 21st.dev
 * ruixen.ui/text-reveal-faqs). Fires once when the text scrolls into view.
 * Each word is an inline-block/nowrap group so lines only break at spaces —
 * never mid-word and never orphaning a trailing period.
 */
export function BlurredStaggerText({
  text,
  className = "",
  as = "p",
  delay = 0,
  trigger = "inView",
}: {
  text: string;
  className?: string;
  as?: "p" | "span" | "div";
  /** extra seconds before the reveal starts — use to cascade several blocks */
  delay?: number;
  /** `"inView"` fires on scroll; `"mount"` fires immediately (e.g. on accordion open) */
  trigger?: "inView" | "mount";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.014, delayChildren: 0.08 + delay },
    },
  };

  const wordAnimation = {
    hidden: {},
    show: { transition: { staggerChildren: 0.014 } },
  };

  const letterAnimation = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  };

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const triggerProps =
    trigger === "mount"
      ? { animate: "show" }
      : {
          whileInView: "show",
          viewport: { once: true, amount: 0.5, margin: "0px 0px -30% 0px" },
        };

  const words = text.split(" ");

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      {...triggerProps}
      className={className}
    >
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <motion.span
            variants={wordAnimation}
            className="inline-block whitespace-nowrap"
          >
            {[...word].map((char, ci) => (
              <motion.span
                key={ci}
                variants={letterAnimation}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}

export default BlurredStaggerText;
