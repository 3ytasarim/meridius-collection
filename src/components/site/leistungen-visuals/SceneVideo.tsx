"use client";

import { cn } from "@/lib/utils";

/**
 * SceneVideo — plays a rendered motion scene (Claude Design export) in place of
 * a service visual. Autoplaying, looping, muted and inline so it behaves like a
 * decorative graphic; framed to match the other Leistungen visuals.
 */
export function SceneVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[520px] overflow-hidden rounded-2xl bg-[#F1F0F6] shadow-[0_28px_60px_-16px_rgba(99,48,199,0.4)] ring-1 ring-inset ring-brand/10 lg:mx-0 lg:max-w-none",
        className,
      )}
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
        className="block aspect-[16/10] w-full object-cover"
      />
    </div>
  );
}

export default SceneVideo;
