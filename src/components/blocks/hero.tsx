import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  gradient?: boolean;
  blur?: boolean;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      gradient = true,
      blur = true,
      title,
      subtitle,
      eyebrow,
      actions,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative z-0 flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-brand-dark",
          className,
        )}
        {...props}
      >
        {gradient && (
          <div className="absolute top-0 isolate z-0 flex w-full flex-1 items-start justify-center">
            {blur && (
              <div className="absolute top-0 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
            )}

            {/* Main glow */}
            <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-[var(--brand)] opacity-70 blur-3xl" />

            {/* Lamp effect */}
            <motion.div
              initial={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "16rem" }}
              className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-[var(--brand)] opacity-70 blur-2xl"
            />

            {/* Top line */}
            <motion.div
              initial={{ width: "15rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "30rem" }}
              className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-[var(--brand)]/80"
            />

            {/* Left gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              style={{
                backgroundImage:
                  "conic-gradient(from 70deg at center top, color-mix(in oklab, var(--brand) 65%, transparent), transparent, transparent)",
              }}
              className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible"
            >
              <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-brand-dark [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-brand-dark [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>

            {/* Right gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              style={{
                backgroundImage:
                  "conic-gradient(from 290deg at center top, transparent, transparent, color-mix(in oklab, var(--brand) 65%, transparent))",
              }}
              className="absolute inset-auto left-1/2 h-56 w-[30rem]"
            >
              <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-brand-dark [mask-image:linear-gradient(to_left,white,transparent)]" />
              <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-brand-dark [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ y: 100, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="container relative z-50 mx-auto flex flex-1 flex-col justify-center gap-4 px-5 md:px-10"
        >
          <div className="flex flex-col items-center space-y-6 text-center">
            {eyebrow}
            <h1
              className={cn(
                "max-w-4xl text-4xl font-bold tracking-tight text-[var(--brand-light)] sm:text-5xl md:text-6xl",
                titleClassName,
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  "max-w-2xl text-pretty text-lg leading-relaxed text-[var(--brand-light)]/75",
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            )}
            {actions && (
              <div className={cn("flex flex-col gap-4 sm:flex-row", actionsClassName)}>
                {actions}
              </div>
            )}
          </div>
        </motion.div>
      </section>
    );
  },
);
Hero.displayName = "Hero";

export { Hero };
