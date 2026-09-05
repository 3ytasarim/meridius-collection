"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  // `wrap` also ships from framer-motion, so no @motionone/utils dependency.
  wrap,
} from "framer-motion";

import { cn } from "@/lib/utils";

type MarqueeAnimationProps = {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  baseVelocity: number;
};

function MarqueeAnimation({
  children,
  className,
  direction = "left",
  baseVelocity = 10,
}: MarqueeAnimationProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 0], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (direction == "left") {
      directionFactor.current = 1;
    } else if (direction == "right") {
      directionFactor.current = -1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative flex max-w-[100vw] flex-nowrap overflow-hidden text-nowrap">
      <motion.div
        className={cn(
          "flex flex-nowrap text-nowrap text-5xl font-bold uppercase *:block *:me-10",
          className,
        )}
        style={{ x }}
      >
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

export { MarqueeAnimation };
