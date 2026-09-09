"use client";

import * as React from "react";
import { useNavigate } from "@tanstack/react-router";

import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { Velaris } from "@/components/ui/velaris";

/**
 * Closing CTA band above the footer — a full-bleed animated Velaris gradient
 * (WebGL simplex noise) in the Meridius purple, a centred heading and the
 * homepage hero button.
 */
export function ZahlungCta() {
  const navigate = useNavigate();

  return (
    <section className="relative isolate overflow-hidden bg-[#5A34C8] py-20 sm:py-28">
      <Velaris
        className="absolute inset-0 -z-10"
        height="100%"
        bg="#5A34C8"
        colors={["#D7C6FA", "#B99CF6", "#8B5CF6", "#6A3FD1"]}
        speed={1.4}
        grain={0.16}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center">
        <h2
          className="font-bold leading-[1.1] tracking-tight text-white [text-shadow:0_2px_24px_rgba(20,6,60,0.45)]"
          style={{ fontSize: "clamp(1.7rem, 1.2rem + 2vw, 2.9rem)" }}
        >
          Fragen bleiben offen?
        </h2>

        <ArrowFillButton
          btnText="Team kontaktieren"
          href="/kontakt"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            navigate({ to: "/kontakt" });
          }}
          bgColor="#A77AF4"
          textColor="#ffffff"
          fillBgColor="#6330C7"
          fillTextColor="#ffffff"
          hoverFillBgColor="#6330C7"
          hoverFillTextColor="#ffffff"
        />
      </div>
    </section>
  );
}
