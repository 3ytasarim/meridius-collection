import * as React from "react";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

import { cn } from "@/lib/utils";

type LiquidVariant = "primary" | "outline";

type LiquidButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Render the single child element (e.g. an <a> or <Link>) as the button. */
  asChild?: boolean;
  variant?: LiquidVariant;
};

const base =
  "group/liquid relative isolate inline-flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full px-7 text-sm font-semibold whitespace-nowrap transition-[transform,box-shadow,border-color] duration-300 outline-none select-none active:translate-y-px active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45";

const variants: Record<LiquidVariant, string> = {
  primary:
    "border border-brand-light/40 bg-accent text-accent-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklab,var(--brand-accent)_85%,transparent)] hover:border-brand-light/80 focus-visible:ring-3 focus-visible:ring-brand-light/40",
  outline:
    "border border-primary-foreground/25 bg-transparent text-primary-foreground backdrop-blur-sm hover:border-primary-foreground/50 focus-visible:ring-3 focus-visible:ring-brand-light/35",
};

function LiquidInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-1/4 top-full z-0 h-[190%] overflow-hidden bg-linear-to-b from-brand-light via-brand-accent to-brand transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/liquid:-translate-y-[58%] group-focus-visible/liquid:-translate-y-[58%] motion-reduce:transition-none"
      >
        <span className="absolute top-0 left-1/2 size-[145%] -translate-x-1/2 -translate-y-1/2 [animation:liquid-button-wave_7s_linear_infinite] rounded-[43%] bg-brand-dark/90 motion-reduce:animate-none" />
        <span className="absolute top-0 left-1/2 size-[135%] -translate-x-1/2 -translate-y-1/2 [animation:liquid-button-wave_5s_linear_infinite_reverse] rounded-[47%] bg-brand-dark/40 motion-reduce:animate-none" />
      </span>

      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 z-20 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"
      />
    </>
  );
}

function LiquidButton({
  children,
  className,
  type = "button",
  asChild = false,
  variant = "primary",
  ...props
}: LiquidButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (asChild) {
    const child = React.Children.only(children) as ReactElement<{
      className?: string;
      children?: ReactNode;
    }>;

    return React.cloneElement(
      child,
      { className: cn(classes, child.props.className) },
      <LiquidInner>{child.props.children}</LiquidInner>,
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      <LiquidInner>{children}</LiquidInner>
    </button>
  );
}

export { LiquidButton };
export type { LiquidButtonProps };
