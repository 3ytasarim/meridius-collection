"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/** Shared product-UI palette for the four Leistungen visuals. */
export const VIZ = {
  white: "#FFFFFF",
  offWhite: "#FBFAFF",
  lavender: "#F3EFFC",
  lavender2: "#EBE4FA",
  purple: "#6330C7",
  purpleSoft: "#7C45E8",
  ink: "#2B2433",
  muted: "#8B8496",
  line: "#ECE6F6",
} as const;

/**
 * In-view + reduced-motion aware step clock.
 * Loops 0..stepCount-1 only while the visual is on screen; parks on the final
 * step when the user prefers reduced motion (static state still tells the story).
 */
export function useSequence(stepCount: number, stepMs = 1800) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (reduce) {
      setStep(stepCount - 1);
      return;
    }
    if (!inView) return;
    setStep(0);
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % stepCount),
      stepMs,
    );
    return () => window.clearInterval(id);
  }, [inView, reduce, stepCount, stepMs]);

  return { ref, step, reduce: !!reduce, inView };
}

/**
 * Renders `children` at a fixed design size and scales the whole thing to fit
 * the column width — keeps every mockup pixel-crisp and perfectly responsive.
 */
export function ScaleBox({
  w,
  h,
  boxRef,
  className,
  children,
}: {
  w: number;
  h: number;
  boxRef?: React.Ref<HTMLDivElement>;
  className?: string;
  children: React.ReactNode;
}) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / w);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div
      ref={(node) => {
        hostRef.current = node;
        if (typeof boxRef === "function") boxRef(node);
        else if (boxRef)
          (boxRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
      }}
      style={{ aspectRatio: `${w} / ${h}` }}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        "bg-[radial-gradient(130%_120%_at_72%_16%,#F4EFFD_0%,transparent_58%)]",
        className,
      )}
    >
      <div
        style={{
          width: w,
          height: h,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="absolute left-0 top-0"
      >
        {children}
      </div>
    </div>
  );
}

/** Tiny status pill. */
export function Pill({
  children,
  tone = "grey",
  className,
}: {
  children: React.ReactNode;
  tone?: "grey" | "light" | "purple";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-1.5 py-[1.5px] text-[8px] font-bold uppercase leading-none tracking-wide transition-colors duration-500",
        tone === "grey" && "border-[#E2DAF0] text-[#9A93A6]",
        tone === "light" && "border-[#6330C7]/20 bg-[#F1ECFC] text-[#6330C7]",
        tone === "purple" && "border-[#6330C7] bg-[#6330C7] text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Label / value stack used inside panels and cards. */
export function Field({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-[7.5px] font-bold uppercase tracking-[0.14em] text-[#9A93A6]">
        {label}
      </div>
      <div className="mt-0.5 text-[11px] font-semibold text-[#2B2433]">
        {value}
      </div>
    </div>
  );
}

/** Floating mini interface card — sits at its own depth around a main panel. */
export function FloatCard({
  label,
  value,
  tone,
  className,
  style,
}: {
  label: string;
  value: React.ReactNode;
  tone?: "grey" | "light" | "purple" | undefined;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "absolute rounded-xl border border-[#ECE6F6] bg-white/95 px-2.5 py-2 shadow-[0_16px_36px_-16px_rgba(99,48,199,0.28)] backdrop-blur-[2px]",
        className,
      )}
    >
      <div className="text-[7px] font-bold uppercase tracking-[0.16em] text-[#9A93A6]">
        {label}
      </div>
      <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#2B2433]">
        {value}
        {tone && <Pill tone={tone}>{tone === "purple" ? "aktiv" : "gesetzt"}</Pill>}
      </div>
    </div>
  );
}

/** A clean software surface (rounded, 1px border, soft purple-tinted shadow). */
export function Surface({
  className,
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "rounded-2xl border border-[#ECE6F6] bg-white shadow-[0_28px_70px_-30px_rgba(99,48,199,0.28)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** 2.5D premium phone mockup — thin bezel, screen inset, notch, layered shadow. */
export function PhoneShell({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ width: 170, height: 348, ...style }}
      className={cn(
        "relative rounded-[2.1rem] bg-gradient-to-b from-[#241a34] to-[#191122] p-[5px] shadow-[0_40px_70px_-24px_rgba(43,20,80,0.45),0_10px_24px_-10px_rgba(43,20,80,0.35)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-white">
        <div className="absolute left-1/2 top-[6px] z-20 h-[10px] w-[52px] -translate-x-1/2 rounded-full bg-[#191122]" />
        {children}
      </div>
      {/* side button */}
      <span className="absolute -right-[2px] top-[92px] h-9 w-[2px] rounded-full bg-[#2c2140]" />
    </div>
  );
}

/** Browser window chrome. */
export function BrowserShell({
  url = "app.meridius-collection.ch",
  className,
  style,
  children,
}: {
  url?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      style={style}
      className={cn(
        "overflow-hidden rounded-xl border border-[#ECE6F6] bg-white shadow-[0_32px_74px_-30px_rgba(99,48,199,0.3)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#F1ECF9] bg-[#FBFAFF] px-3 py-2">
        <span className="flex gap-1">
          <i className="size-[6px] rounded-full bg-[#E2DAF0]" />
          <i className="size-[6px] rounded-full bg-[#E2DAF0]" />
          <i className="size-[6px] rounded-full bg-[#E2DAF0]" />
        </span>
        <span className="ml-1 rounded-md border border-[#F1ECF9] bg-white px-2 py-[3px] text-[8px] tracking-tight text-[#9A93A6]">
          {url}
        </span>
      </div>
      <div className="relative bg-[#FCFBFF]">{children}</div>
    </div>
  );
}
