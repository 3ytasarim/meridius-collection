import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ButtonWithIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "solid" | "outline";
}

/**
 * Compact pill button with a circular arrow badge that slides on hover.
 * Matches the Meridius reference: solid purple / white, horizontal arrow.
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
        "group relative inline-flex h-9 min-w-[170px] cursor-pointer items-center justify-center overflow-hidden rounded-full p-1 ps-4 pe-9 text-[0.8rem] font-bold tracking-tight transition-all duration-500 hover:ps-9 hover:pe-4",
        solid
          ? "bg-primary text-primary-foreground"
          : "bg-white text-primary ring-1 ring-primary/25 hover:bg-primary hover:text-primary-foreground hover:ring-primary",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 whitespace-nowrap transition-all duration-500">
        {label}
      </span>
      <span
        className={cn(
          "absolute right-1 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 group-hover:right-[calc(100%-30px)]",
          solid
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-primary text-primary-foreground group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground",
        )}
      >
        <ArrowRight size={15} strokeWidth={2.5} />
      </span>
    </button>
  );
});
ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
