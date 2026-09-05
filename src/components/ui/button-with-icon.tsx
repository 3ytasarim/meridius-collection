import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ButtonWithIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "solid" | "outline";
}

/**
 * Compact pill button with an arrow badge that slides on hover.
 * Light, modern palette — hover deepens to the brand purple.
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
        "group relative inline-flex h-9 min-w-[170px] cursor-pointer items-center justify-center overflow-hidden rounded-full p-1 ps-4 pe-10 text-[0.8rem] font-semibold tracking-tight transition-all duration-500 hover:ps-10 hover:pe-4",
        solid
          ? "bg-primary/90 text-primary-foreground hover:bg-primary"
          : "border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 whitespace-nowrap transition-all duration-500">
        {label}
      </span>
      <span
        className={cn(
          "absolute right-1 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 group-hover:right-[calc(100%-30px)] group-hover:rotate-45",
          solid
            ? "bg-primary-foreground/15 text-primary-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        <ArrowUpRight size={14} />
      </span>
    </button>
  );
});
ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
