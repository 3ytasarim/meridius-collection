import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type DropTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function DropText({ children, className, delay = 0 }: DropTextProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className={cn("block", className)}
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.span>
  );
}