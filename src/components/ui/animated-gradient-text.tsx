import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md transition-shadow duration-500 ease-out [--bg-size:300%] shadow-[inset_0_-8px_10px_color-mix(in_oklab,var(--brand-light)_18%,transparent)] hover:shadow-[inset_0_-5px_10px_color-mix(in_oklab,var(--brand-light)_30%,transparent)]",
        className,
      )}
    >
      <div className="absolute inset-0 block h-full w-full animate-gradient bg-[linear-gradient(to_right,var(--brand-light),var(--brand-accent),var(--brand-light))] bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />

      {children}
    </div>
  );
}
