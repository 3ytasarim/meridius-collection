"use client";

import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

/**
 * Sticky CTA pinned to the right edge of the viewport (bewe4r-style) — a
 * horizontal tab that sits just below the header. Desktop only: hidden below
 * `xl`, where the mobile drawer carries the "Fall einreichen" action instead.
 * Slides out slightly on hover.
 */
export function SideCta() {
  return (
    <Link
      to="/kontakt"
      aria-label="Fall einreichen"
      className="group fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-l-2xl bg-brand px-3.5 py-2.5 text-white shadow-[0_12px_36px_-10px_rgba(99,48,199,0.6)] ring-1 ring-inset ring-white/10 transition-[transform,background-color] duration-300 hover:-translate-x-1 hover:bg-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 xl:flex"
    >
      <FileText className="size-4 shrink-0" aria-hidden />
      <span className="whitespace-nowrap text-[13px] font-bold tracking-tight">
        Fall einreichen
      </span>
    </Link>
  );
}

export default SideCta;
