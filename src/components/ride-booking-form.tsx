"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import ArrowFillButton from "@/components/ui/arrow-fill-button";

/**
 * Two-column location card (layout after 21st.dev
 * `ravikatiyar162/ride-booking-form`): a soft white card holding copy + address
 * on the left and an embedded map on the right.
 */
interface LocationMapPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
        className={cn("w-full", className)}
        {...props}
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy + address */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center"
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
              className="font-extrabold leading-[1.32] tracking-[-0.03em] text-[#2B2433]"
              style={{ fontSize: "clamp(1.8rem, 1.2rem + 2vw, 2.9rem)" }}
            >
              {title}
            </motion.h2>

            {intro ? (
              <motion.p
                variants={item}
                className="mt-5 max-w-md text-base font-bold leading-relaxed text-[#2B2433]"
              >
                {intro}
              </motion.p>
            ) : null}

            <motion.div
              variants={item}
              className="mt-7 rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm"
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
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <ArrowFillButton
                btnText="Route planen"
                size="sm"
                href={directionsUrl ?? mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                bgColor="#A77AF4"
                textColor="#ffffff"
                fillBgColor="#6330C7"
                fillTextColor="#ffffff"
                hoverFillBgColor="#6330C7"
                hoverFillTextColor="#ffffff"
              />
              <ArrowFillButton
                btnText="In Google Maps öffnen"
                size="sm"
                href={directionsUrl ?? mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                bgColor="#ffffff"
                textColor="#6330C7"
                fillBgColor="#6330C7"
                fillTextColor="#ffffff"
                hoverFillBgColor="#6330C7"
                hoverFillTextColor="#ffffff"
              />
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
