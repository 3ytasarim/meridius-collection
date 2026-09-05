import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type LiquidMetalButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/**
 * Pill button with a dark-purple highlight that travels around the border
 * (conic gradient spun via the `--lm-angle` @property, masked to a 2px ring).
 * See `.lm-btn__ring` / `@keyframes lm-ring-spin` in styles.css.
 */
export function LiquidMetalButton({
  children,
  className,
  ...props
}: LiquidMetalButtonProps) {
  return (
    <a
      className={cn(
        "lm-btn relative isolate inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-brand-light px-5 text-[14px] font-semibold text-white shadow-[0_10px_28px_-10px_var(--brand-accent)] outline-none transition-colors duration-300 hover:bg-brand-accent focus-visible:ring-3 focus-visible:ring-brand-light/40",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="lm-btn__ring pointer-events-none absolute inset-0 rounded-[inherit]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}
