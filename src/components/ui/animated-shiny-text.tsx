import * as React from "react";
import { motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  className?: string;
  textClassName?: string;
}

const AnimatedText = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = "linear-gradient(90deg, var(--brand-dark), var(--brand), var(--brand-accent), var(--brand-light), var(--brand-accent), var(--brand), var(--brand-dark))",
      gradientAnimationDuration = 4,
      hoverEffect = false,
      className,
      textClassName,
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const textVariants: Variants = {
      initial: {
        backgroundPosition: "0% 0%",
      },
      animate: {
        backgroundPosition: "200% 0%",
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "linear",
        },
      },
    };

    return (
      <motion.span
        ref={ref}
        className={cn("inline-block bg-clip-text text-transparent", textClassName)}
        style={{
          backgroundImage: gradientColors,
          backgroundSize: "200% 100%",
        }}
        variants={textVariants}
        initial="initial"
        animate={hoverEffect && !isHovered ? "initial" : "animate"}
        onHoverStart={() => hoverEffect && setIsHovered(true)}
        onHoverEnd={() => hoverEffect && setIsHovered(false)}
      >
        {text}
      </motion.span>
    );
  },
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
