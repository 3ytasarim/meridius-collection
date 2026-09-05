import * as React from "react";

import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/gradient-text-fill";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  title: string;
  description: string;
}

/**
 * 21st.dev `ravikatiyar162/project-card`, adapted to the Meridius palette:
 * image on top, then the title (house gradient animation) above the body copy,
 * everything centred.
 */
const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, imgSrc, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-[0_30px_70px_-40px_rgba(99,48,199,0.28)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_44px_90px_-42px_rgba(99,48,199,0.42)]",
          className,
        )}
        {...props}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imgSrc}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col items-center p-6 text-center">
          <h3 className="whitespace-nowrap text-[15px] font-semibold tracking-tight sm:text-[17px]">
            <GradientText
              as="span"
              colors="#2b1361, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9, #2b1361"
            >
              {title}
            </GradientText>
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5b5566]">
            {description}
          </p>
        </div>
      </div>
    );
  },
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
