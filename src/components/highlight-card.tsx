"use client";

import { FC, ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HighlightCardProps {
  title: string;
  description: string[];
  icon?: ReactNode;
  className?: string;
  /** Stagger the idle drift so cards move out of sync. */
  idleDelay?: number;
}

export const HighlightCard: FC<HighlightCardProps> = ({
  title,
  description,
  icon,
  className,
  idleDelay = 0,
}) => {
  return (
    <div
      className={cn("card-idle-anim group h-full cursor-default", className)}
      style={{ animationDelay: `${idleDelay}s` }}
    >
      <Card className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#5024a3] via-[#3d1780] to-[#5024a3] text-white shadow-2xl backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-500 group-hover:-rotate-1 group-hover:scale-[1.03] group-hover:border-brand-light/45 group-hover:shadow-brand/25">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-light/20 to-brand-light/30 opacity-60 transition-opacity duration-500 group-hover:opacity-95" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-gradient-to-tr from-brand-light/45 to-transparent opacity-50 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-75" />
          <div className="absolute inset-0 -skew-x-12 translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-[-200%]" />
        </div>

        <div className="relative z-10 flex flex-col items-center p-8 text-center">
          <div className="relative mb-6">
            <div className="rounded-full border border-brand-light/35 bg-gradient-to-br from-[#3a1580]/80 to-[#2a0e5c]/65 p-6 shadow-2xl backdrop-blur-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              <div className="text-brand-light transition-transform duration-700 group-hover:rotate-180">
                {icon}
              </div>
            </div>
          </div>

          <h3 className="mb-4 whitespace-nowrap bg-gradient-to-r from-[#f7d7ff] via-[#fbe8ff] to-[#f7d7ff] bg-clip-text text-lg font-bold text-transparent transition-transform duration-300 group-hover:scale-105 sm:text-xl">
            {title}
          </h3>

          <div className="max-w-sm space-y-1">
            {description.map((line, idx) => (
              <p
                key={idx}
                className="text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/90"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-6 h-0.5 w-1/3 rounded-full bg-gradient-to-r from-transparent via-brand-light to-transparent transition-all duration-500 group-hover:h-1 group-hover:w-1/2" />

          <div className="mt-4 flex space-x-2 opacity-50 transition-opacity duration-300 group-hover:opacity-90">
            <div className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            <div className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            <div className="h-1.5 w-1.5 rounded-full bg-brand-light" />
          </div>
        </div>

        <div className="absolute left-0 top-0 h-20 w-20 rounded-br-3xl bg-gradient-to-br from-brand-light/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-3xl bg-gradient-to-tl from-brand-light/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Card>
    </div>
  );
};

export default HighlightCard;
