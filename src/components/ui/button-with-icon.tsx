import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ButtonWithIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "solid" | "outline";
}

/**
 * Pill button with an arrow badge that slides from right to left on hover.
 */
export const ButtonWithIcon = React.forwardRef<
  HTMLButtonElement,
  ButtonWithIconProps
>(({ label, variant = "solid", className, ...props }, ref) => {
  const solid = variant === "solid";
  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex h-11 w-fit cursor-pointer items-center overflow-hidden rounded-full p-1 ps-5 pe-12 text-sm font-semibold transition-all duration-500 hover:ps-12 hover:pe-5",
        solid
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border bg-background text-primary hover:bg-accent/40",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 whitespace-nowrap transition-all duration-500">
        {label}
      </span>
      <span
        className={cn(
          "absolute right-1 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 group-hover:right-[calc(100%-40px)] group-hover:rotate-45",
          solid
            ? "bg-background text-primary"
            : "bg-primary text-primary-foreground",
        )}
      >
        <ArrowUpRight size={16} />
      </span>
    </button>
  );
});
ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
