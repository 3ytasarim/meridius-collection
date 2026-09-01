import withdraw from "@/assets/withdraw.png.asset.json";
import data1 from "@/assets/data_1.png.asset.json";
import data from "@/assets/data.png.asset.json";
import giveMoney from "@/assets/give-money.png.asset.json";
import agile from "@/assets/agile.png.asset.json";
import objective from "@/assets/objective.png.asset.json";

const ICONS = [withdraw, data1, data, giveMoney, agile, objective].map(
  (a) => a.url,
);

type Item = {
  url: string;
  side: "left" | "right";
  /** % offset from the section edge, inside the gutter */
  x: number;
  /** % offset from the top of the section */
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

// Deterministic layout — 4 icons per side, lower half of the section
const ITEMS: Item[] = ([
  { side: "left", x: 42, y: 34, size: 118, duration: 15, delay: 0, opacity: 0.6 },
  { side: "left", x: 32, y: 52, size: 100, duration: 19, delay: 3, opacity: 0.5 },
  { side: "left", x: 48, y: 70, size: 130, duration: 17, delay: 6, opacity: 0.55 },
  { side: "left", x: 34, y: 88, size: 108, duration: 22, delay: 9, opacity: 0.5 },
  { side: "right", x: 16, y: 36, size: 118, duration: 18, delay: 2, opacity: 0.6 },
  { side: "right", x: 2, y: 54, size: 128, duration: 16, delay: 7, opacity: 0.5 },
  { side: "right", x: 20, y: 72, size: 102, duration: 23, delay: 11, opacity: 0.55 },
  { side: "right", x: 4, y: 89, size: 116, duration: 17, delay: 4, opacity: 0.5 },
] as Omit<Item, "url">[]).map((it, i) => ({ ...it, url: ICONS[i % ICONS.length]! }));



export function SideFloatingIcons() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden md:block"
    >
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className="absolute inset-y-0 w-[20vw] max-w-[300px] lg:w-[24vw]"
          style={{ [side]: 0 } as React.CSSProperties}
        >
          {ITEMS.filter((it) => it.side === side).map((item, i) => (
            <img
              key={i}
              src={item.url}
              alt=""
              className="absolute block animate-[icon-float_20s_ease-in-out_infinite]"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.size,
                height: item.size,
                opacity: item.opacity,
                objectFit: "contain",
                filter:
                  "brightness(0) saturate(100%) invert(17%) sepia(35%) saturate(1600%) hue-rotate(232deg) brightness(92%) contrast(95%)",


                animationDuration: `${item.duration}s`,
                animationDelay: `-${item.delay}s`,
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            />
          ))}

        </div>
      ))}
    </div>
  );
}
