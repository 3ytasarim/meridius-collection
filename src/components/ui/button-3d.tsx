import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline";
type Size = "sm" | "md" | "lg";

export interface Button3DProps
  extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-accent text-white border-brand-accent [box-shadow:0_6px_0_0_color-mix(in_oklab,var(--brand)_85%,black),0_12px_22px_-6px_color-mix(in_oklab,var(--brand)_65%,transparent)]",
  outline:
    "bg-brand-light text-white border-brand-light [box-shadow:0_6px_0_0_color-mix(in_oklab,var(--brand-accent)_85%,black),0_12px_22px_-6px_color-mix(in_oklab,var(--brand-accent)_65%,transparent)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-base",
  lg: "h-14 px-9 text-[17px]",
};


/**
 * 3D button with a tactile press-down effect.
 * Pressing translates the button toward its shadow for a physical feel.
 */
export function Button3D({
  children,
  variant = "primary",
  size = "md",
  asChild = false,
  className,
  disabled,
  ...props
}: Button3DProps) {
  const [pressed, setPressed] = React.useState(false);

  const base = cn(
    "relative inline-flex select-none items-center justify-center gap-2 rounded-xl border font-medium leading-none tracking-tight transition-[filter] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-brand-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark",
    "hover:brightness-110 active:brightness-95",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "pointer-events-none opacity-60",
    className,
  );

  const motionProps = {
    animate: { y: pressed ? 6 : 0, filter: pressed ? "brightness(0.95)" : "brightness(1)" },
    transition: { type: "spring" as const, stiffness: 600, damping: 22 },
    onPointerDown: () => !disabled && setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
  };

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement;
    const styled = React.cloneElement(child, {
      className: base,
    } as Record<string, unknown>);
    return (
      <motion.div
        className="inline-flex"
        animate={{ y: pressed ? 6 : 0, filter: pressed ? "brightness(0.95)" : "brightness(1)" }}
        transition={{ type: "spring", stiffness: 600, damping: 22 }}
        onPointerDown={() => !disabled && setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
      >
        {styled}
      </motion.div>
    );
  }

  return (
    <motion.button className={base} disabled={disabled} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}

export default Button3D;
