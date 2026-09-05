import agile from "@/assets/agile.png";
import ai from "@/assets/artificial-intelligence.png";
import brain from "@/assets/brain-power.png";
import meeting from "@/assets/business-meeting.png";
import fairPlay from "@/assets/fair-play.png";
import objective from "@/assets/objective.png";

const ICONS = [agile, ai, brain, meeting, fairPlay, objective];

type Item = {
  url: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

// Deterministic layout (no hydration mismatch)
const ITEMS: Item[] = [
  { left: 2, size: 44, duration: 17, delay: 0, opacity: 0.5 },
  { left: 9, size: 30, duration: 22, delay: 3.5, opacity: 0.35 },
  { left: 14, size: 54, duration: 19, delay: 7, opacity: 0.45 },
  { left: 20, size: 28, duration: 26, delay: 12, opacity: 0.3 },
  { left: 24, size: 38, duration: 28, delay: 15, opacity: 0.33 },
  { left: 30, size: 34, duration: 25, delay: 1.5, opacity: 0.3 },
  { left: 36, size: 46, duration: 20, delay: 9, opacity: 0.42 },
  { left: 42, size: 26, duration: 29, delay: 6, opacity: 0.28 },
  { left: 48, size: 40, duration: 23, delay: 10, opacity: 0.36 },
  { left: 54, size: 28, duration: 23, delay: 5, opacity: 0.32 },
  { left: 59, size: 48, duration: 21, delay: 14, opacity: 0.44 },
  { left: 64, size: 50, duration: 18, delay: 11, opacity: 0.46 },
  { left: 69, size: 40, duration: 27, delay: 17, opacity: 0.36 },
  { left: 74, size: 36, duration: 24, delay: 2.5, opacity: 0.34 },
  { left: 79, size: 32, duration: 30, delay: 4, opacity: 0.3 },
  { left: 84, size: 42, duration: 21, delay: 8, opacity: 0.4 },
  { left: 89, size: 30, duration: 31, delay: 16, opacity: 0.32 },
  { left: 92, size: 32, duration: 26, delay: 13, opacity: 0.3 },
  { left: 96, size: 38, duration: 28, delay: 19, opacity: 0.34 },
  { left: 12, size: 24, duration: 33, delay: 18, opacity: 0.26 },
  { left: 47, size: 22, duration: 35, delay: 21, opacity: 0.24 },
  { left: 82, size: 26, duration: 34, delay: 23, opacity: 0.28 },
].map((it, i) => ({ ...it, url: ICONS[i % ICONS.length]! }));

export function FloatingIcons() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to top, transparent 0%, #000 18%, #000 55%, transparent 92%)",
        WebkitMaskImage:
          "linear-gradient(to top, transparent 0%, #000 18%, #000 55%, transparent 92%)",
      }}
    >
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="absolute bottom-0 block animate-[icon-rise_20s_linear_infinite]"
          style={{
            left: `${item.left}%`,
            width: item.size,
            height: item.size,
            opacity: item.opacity,
            animationDuration: `${item.duration}s`,
            animationDelay: `-${item.delay}s`,
            backgroundColor: i % 3 === 0 ? "var(--brand)" : i % 3 === 1 ? "var(--brand-accent)" : "var(--brand-light)",
            maskImage: `url(${item.url})`,
            WebkitMaskImage: `url(${item.url})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      ))}
    </div>
  );
}
