"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Sparkle } from "lucide-react";

import { TextGradient } from "@/components/ui/text-gradient";
import { WhirlpoolLoader } from "@/components/ui/loading-animation";

const navLinks = [
  { label: "Start", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Über uns", href: "/uber-uns" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Zahlung erhalten?", href: "/zahlung-erhalten" },
] as const;

const rechtliches = [
  { label: "Datenschutz", href: "#" },
  { label: "Impressum", href: "#" },
] as const;

/**
 * Footer — the shadcnblocks "footer-7" layout (white), with the blur-in stagger
 * reveal from the "efferd/footer-section" block.
 */

type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: AnimatedContainerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-[#ECE7F6] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
          {/* Brand — logo + whirlpool mark (centred under the logo on desktop) */}
          <AnimatedContainer className="flex flex-col items-start gap-6 lg:max-w-xs lg:items-center">
            <Link
              to="/"
              aria-label="Meridius Collection"
              className="inline-flex items-center"
            >
              <img
                src="/meridius-logo-lockup.png"
                alt="Meridius Collection"
                width={2019}
                height={189}
                className="h-7 w-auto"
              />
            </Link>
            <WhirlpoolLoader className="size-20 opacity-90 sm:size-24 lg:size-28" />
          </AnimatedContainer>

          {/* Link sections */}
          <div className="grid w-full gap-10 sm:grid-cols-3 lg:max-w-2xl lg:gap-16">
            <AnimatedContainer delay={0.1}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Navigation
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-muted-foreground transition-colors hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Rechtliches
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {rechtliches.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-muted-foreground transition-colors hover:text-brand"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>

            <AnimatedContainer delay={0.3}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Kontakt
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Mail className="mt-[3px] size-4 shrink-0 text-brand" />
                  <a
                    href="mailto:info@meridius-collection.ch"
                    className="transition-colors hover:text-brand"
                  >
                    info@meridius-collection.ch
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="mt-[3px] size-4 shrink-0 text-brand" />
                  <a
                    href="tel:+41554100000"
                    className="transition-colors hover:text-brand"
                  >
                    +41 55 410 00 00
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-[3px] size-4 shrink-0 text-brand" />
                  <span>Churerstrasse 158, 8808 Pfäffikon SZ</span>
                </li>
              </ul>
            </AnimatedContainer>
          </div>
        </div>

        <AnimatedContainer
          delay={0.4}
          className="mt-14 flex flex-col justify-between gap-3 border-t border-[#ECE7F6] pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center"
        >
          <p>© 2026 Meridius Collection</p>
          <a
            href="https://bleibsichtbar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-80"
          >
            <Sparkle className="size-3 text-brand-accent" aria-hidden />
            <TextGradient
              as="span"
              children="Design by Bleibsichtbar.com"
              colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
              duration={5}
              angle={90}
              className="font-semibold"
            />
            <Sparkle className="size-3 text-brand-accent" aria-hidden />
          </a>
        </AnimatedContainer>
      </div>
    </footer>
  );
}
