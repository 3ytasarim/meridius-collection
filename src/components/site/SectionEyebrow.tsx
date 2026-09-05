import { Sparkles, ChevronRight } from "lucide-react";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

/**
 * The house section eyebrow — an animated-gradient-text pill
 * (sparkle · divider · label · chevron), matching the "Ansatz" pill on /uber-uns.
 */
export function SectionEyebrow({ children }: { children: string }) {
  return (
    <AnimatedGradientText className="gap-0 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
      <Sparkles className="size-3 text-brand-accent" />
      <span className="mx-2 h-3.5 w-px bg-brand/25" />
      <span className="animate-gradient bg-gradient-to-r from-brand-dark via-brand-accent to-brand-light bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
        {children}
      </span>
      <ChevronRight className="ml-1 size-3 text-brand transition-transform duration-300 group-hover:translate-x-0.5" />
    </AnimatedGradientText>
  );
}
