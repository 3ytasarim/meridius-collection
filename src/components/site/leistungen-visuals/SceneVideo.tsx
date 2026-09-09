"use client";

import * as React from "react";

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

/** CSS injected into the embedded scene doc to strip the standalone viewer
 * chrome (scrub bar, "Unpacking…" toast) and the dark letterbox wrapper. */
const HIDE_CHROME_CSS = `
  html, body { background: #ffffff !important; overflow: hidden !important; margin: 0 !important; }
  #__bundler_loading, #__bundler_err { display: none !important; }
  [data-omelette-chrome] { display: none !important; }
  [data-om-starter="animations-v3"] { background: #ffffff !important; padding: 0 !important; }
  [data-om-starter="animations-v3"] > * { flex: 1 1 auto !important; width: 100% !important; }
  /* drop the big dark canvas drop-shadow so there is no framed "window" behind the scene */
  svg[data-om-exportable-video-with-duration-secs],
  [data-om-starter="animations-v3"] svg { box-shadow: none !important; }
`;

/**
 * SceneFrame — same framing as SceneVideo, but embeds a self-contained motion
 * HTML export (Claude Design) in an iframe for scenes that ship as code rather
 * than a rendered video. Same-origin, so it re-injects a stylesheet into the
 * embedded doc to remove the standalone player chrome (which the bundle
 * re-adds after its async unpack).
 */
export function SceneFrame({
  src,
  title = "Animation",
  aspect = "aspect-[16/9]",
  ratios,
  className,
}: {
  src: string;
  title?: string;
  /** Tailwind aspect-ratio class matching the scene's composition stage. */
  aspect?: string;
  /**
   * Opt-in responsive framing: when the embed itself switches to a portrait
   * composition below 640px, pass its two `aspect-ratio` values (e.g.
   * `{ landscape: "1424 / 900", portrait: "736 / 1560" }`). SceneFrame then
   * measures its own width and swaps the box ratio to match, so the scene is
   * never letterboxed. When omitted, the `aspect` class is used unchanged.
   */
  ratios?: { landscape: string; portrait: string };
  className?: string;
}) {
  const ref = React.useRef<HTMLIFrameElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [isPortrait, setIsPortrait] = React.useState(false);

  React.useEffect(() => {
    if (!ratios) return;
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setIsPortrait(el.clientWidth < 640);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ratios]);

  // When the box ratio flips, the embed's own auto-fit observer needs a nudge
  // to re-measure against the new height (it can latch a transient value while
  // the iframe is mid-resize).
  React.useEffect(() => {
    if (!ratios) return;
    const win = ref.current?.contentWindow;
    if (!win) return;
    const nudge = () => {
      try {
        win.dispatchEvent(new Event("resize"));
      } catch {
        /* ignore */
      }
    };
    const r = requestAnimationFrame(nudge);
    const t = window.setTimeout(nudge, 250);
    return () => {
      cancelAnimationFrame(r);
      window.clearTimeout(t);
    };
  }, [isPortrait, ratios]);

  React.useEffect(() => {
    let stop = false;
    const inject = () => {
      const doc = ref.current?.contentDocument;
      if (!doc) return;
      const host = doc.head ?? doc.documentElement;
      if (!host) return;
      let style = doc.getElementById("__scene_hide_chrome");
      if (!style) {
        style = doc.createElement("style");
        style.id = "__scene_hide_chrome";
        host.appendChild(style);
      }
      if (style.textContent !== HIDE_CHROME_CSS) style.textContent = HIDE_CHROME_CSS;
    };
    const id = window.setInterval(() => {
      if (stop) return;
      try {
        inject();
      } catch {
        /* cross-origin or not ready yet */
      }
    }, 350);
    const stopTimer = window.setTimeout(() => {
      stop = true;
      window.clearInterval(id);
    }, 8000);
    return () => {
      stop = true;
      window.clearInterval(id);
      window.clearTimeout(stopTimer);
    };
  }, [src]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative mx-auto w-full max-w-[560px] overflow-hidden [mask-image:radial-gradient(88%_92%_at_50%_50%,#000_62%,transparent_100%)] lg:mx-0 lg:max-w-none",
        className,
      )}
    >
      <iframe
        ref={ref}
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        onLoad={() => {
          try {
            const doc = ref.current?.contentDocument;
            const host = doc?.head ?? doc?.documentElement;
            if (doc && host && !doc.getElementById("__scene_hide_chrome")) {
              const s = doc.createElement("style");
              s.id = "__scene_hide_chrome";
              s.textContent = HIDE_CHROME_CSS;
              host.appendChild(s);
            }
          } catch {
            /* ignore */
          }
        }}
        style={
          ratios
            ? { aspectRatio: isPortrait ? ratios.portrait : ratios.landscape }
            : undefined
        }
        className={cn(
          "mx-auto block w-full border-0 bg-white",
          ratios ? null : aspect,
        )}
      />
    </div>
  );
}

export default SceneVideo;
