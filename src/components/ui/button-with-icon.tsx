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
        "group relative inline-flex h-12 min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full p-1 ps-6 pe-14 text-[0.95rem] font-semibold transition-all duration-500 hover:ps-14 hover:pe-6",
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
          "absolute right-1 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          solid
            ? "bg-background text-primary"
            : "bg-primary text-primary-foreground",
        )}
      >
        <ArrowUpRight size={17} />
      </span>
    </button>
  );
});
ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
