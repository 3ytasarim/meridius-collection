"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/gradient-text-fill";

/**
 * Two-column location card (layout after 21st.dev
 * `ravikatiyar162/ride-booking-form`): a soft white card holding copy + address
 * on the left and an embedded map on the right.
 */
interface LocationMapPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Google Maps embed URL used as the iframe `src`. */
  mapEmbedUrl: string;
  /** Google Maps link opened by the "Route planen" button. */
  directionsUrl?: string;
  company: string;
  addressLines: string[];
  place?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}

export const LocationMapPanel = React.forwardRef<
  HTMLDivElement,
  LocationMapPanelProps
>(
  (
    {
      className,
      mapEmbedUrl,
      directionsUrl,
      company,
      addressLines,
      place = "Pfäffikon SZ, Schweiz",
      eyebrow,
      title,
      intro,
      ...props
    },
    ref,
  ) => {
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.09, delayChildren: 0.15 },
      },
    };
    const item = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring" as const, stiffness: 100 },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full max-w-7xl p-1 sm:p-4 lg:p-6", className)}
        {...props}
      >
        <div className="grid grid-cols-1 items-stretch gap-0 overflow-hidden rounded-[1.75rem] bg-[#F4EFFC] shadow-[0_40px_100px_-45px_rgba(99,48,199,0.3)] ring-1 ring-brand/12 lg:grid-cols-2">
          {/* Left: copy + address */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center p-7 sm:p-9 lg:px-12 lg:py-9"
          >
            <motion.div
              variants={item}
              className="mb-4 flex items-center gap-2 text-sm text-[#5b5566]"
            >
              <MapPin className="size-4 shrink-0 text-brand" />
              {place}
              {eyebrow ? (
                <span className="ml-1 rounded-full bg-brand-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  {eyebrow}
                </span>
              ) : null}
            </motion.div>

            <motion.h2
              variants={item}
              className="whitespace-nowrap font-semibold leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(1.4rem, 1rem + 1.7vw, 2.25rem)" }}
            >
              <GradientText
                as="span"
                colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
              >
                {title}
              </GradientText>
            </motion.h2>

            {intro ? (
              <motion.p
                variants={item}
                className="mt-5 max-w-md text-base leading-relaxed text-[#5b5566]"
              >
                {intro}
              </motion.p>
            ) : null}

            <motion.div
              variants={item}
              className="mt-6 rounded-2xl bg-white/65 p-4"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 shrink-0 text-brand" />
                <span className="font-semibold text-[#2B2433]">{company}</span>
              </div>
              <div className="mt-3 space-y-1 pl-[26px] text-sm text-[#5b5566]">
                {addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap items-center gap-4"
            >
              <a
                href={directionsUrl ?? mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
              >
                Route planen
              </a>
              <a
                href={directionsUrl ?? mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-sm text-[#5b5566] transition-colors hover:text-brand"
              >
                In Google Maps öffnen
                <ArrowRight className="ml-1 inline-block size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: embedded map — small framed inset, square corners */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center p-7 pt-0 sm:p-9 sm:pt-0 lg:px-12 lg:py-9 lg:pl-4"
          >
            <div className="w-full max-w-[500px] rounded-2xl border border-brand/25 bg-white p-2.5 shadow-[0_22px_55px_-32px_rgba(99,48,199,0.45)] lg:ml-auto">
              <iframe
                src={mapEmbedUrl}
                title={`Karte – ${company}`}
                className="block aspect-[4/3] w-full rounded-xl border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  },
);

LocationMapPanel.displayName = "LocationMapPanel";

export default LocationMapPanel;
