"use client";

import { motion } from "framer-motion";
import { CreditCard, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";

/**
 * Fixed vertical CTA pinned to the right edge, vertically centred
 * (bleibsichtbar-style floating side buttons) with lightly animated icons.
 */
export function FloatingSideCta() {
  return (
    <div className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-end gap-2">
      <motion.div
        initial={{ x: 64 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 22 }}
        whileHover={{ x: -4 }}
      >
        <Link
          to="/zahlung"
          className="group flex items-center gap-2.5 rounded-l-2xl bg-brand-light py-3 pl-3.5 pr-4 text-sm font-bold text-white shadow-[0_4px_22px_-4px_rgba(124,69,232,0.5)] transition-colors hover:bg-brand-accent"
        >
          <motion.span
            className="shrink-0"
            animate={{ rotate: [0, -12, 12, -6, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 2.6,
              ease: "easeInOut",
            }}
          >
            <CreditCard className="size-5" />
          </motion.span>
          <span className="hidden whitespace-nowrap sm:inline">
            Zahlung erhalten?
          </span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ x: 64 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.62, type: "spring", stiffness: 260, damping: 22 }}
        whileHover={{ x: -4 }}
      >
        <Link
          to="/kontakt"
          className="group flex items-center gap-2.5 rounded-l-2xl bg-brand-accent py-3 pl-3.5 pr-4 text-sm font-bold text-white shadow-[0_4px_22px_-4px_rgba(99,48,199,0.55)] transition-colors hover:bg-brand"
        >
          <motion.span
            className="shrink-0"
            animate={{ y: [0, -3, 0, -1.5, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 2.4,
              ease: "easeInOut",
            }}
          >
            <FileText className="size-5" />
          </motion.span>
          <span className="hidden whitespace-nowrap sm:inline">
            Fall einreichen
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
