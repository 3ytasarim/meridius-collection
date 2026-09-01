"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export type NavItem = { label: string; href: string };

export function BrandMark({ size = 20 }: { size?: number }) {
  return (
    <motion.span
      className="relative inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, transformStyle: "preserve-3d", perspective: 240 }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.35 }}
      aria-hidden="true"
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--brand), var(--brand-accent), var(--brand-light), var(--brand-dark), var(--brand))",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <span
        className="absolute rounded-full bg-[#221a2e]"
        style={{ inset: Math.max(3, size * 0.22) }}
      />
      <motion.span
        className="absolute rounded-full"
        style={{
          inset: Math.max(6, size * 0.36),
          background:
            "linear-gradient(135deg, var(--brand-accent), var(--brand-light))",
        }}
        animate={{ scale: [1, 0.75, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.span>
  );
}

export function Navbar1({
  items,
  ctaLabel,
  ctaHref,
}: {
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 py-3 sm:py-4">
      <div className="relative z-10 flex w-full max-w-5xl items-center justify-between gap-6 rounded-full border border-white/12 bg-[color-mix(in_oklab,var(--brand-dark)_55%,transparent)] px-4 py-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:px-5 sm:py-2.5">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <BrandMark size={22} />
          <span className="whitespace-nowrap text-[17px] font-bold leading-none tracking-[-0.01em] text-white sm:text-[19px]">
            MERIDIUS
            <span className="ml-1.5 font-light tracking-[0.06em] text-white/60">
              COLLECTION
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <a
                href={item.href}
                className="whitespace-nowrap text-[14px] font-medium text-white/65 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </motion.div>
          ))}
        </nav>


        {/* CTA */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          whileHover={{ scale: 1.05 }}
        >
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-brand-accent px-5 py-2 text-[14px] font-semibold text-white shadow-[0_8px_20px_-8px_var(--brand)] transition-colors hover:bg-brand"
          >
            {ctaLabel}
          </a>
        </motion.div>

        {/* Mobile toggle */}
        <motion.button
          type="button"
          aria-label="Menü öffnen"
          className="flex items-center lg:hidden"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white px-6 pt-24 lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              type="button"
              aria-label="Menü schliessen"
              className="absolute right-6 top-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6 text-foreground" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                >
                  <a
                    href={item.href}
                    className="text-base font-medium text-foreground"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.45 }}
                className="pt-6"
              >
                <a
                  href={ctaHref}
                  onClick={toggleMenu}
                  className="inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-5 py-3 text-base font-semibold text-white"
                >
                  {ctaLabel}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
