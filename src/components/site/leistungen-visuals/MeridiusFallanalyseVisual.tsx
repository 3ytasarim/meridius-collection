"use client";

/**
 * MeridiusFallanalyseVisual — animated product visual for "KI-Forderungsmanagement".
 * User-supplied composition, adapted to the project:
 *  - TypeScript + isomorphic layout effect (SSR-safe)
 *  - inherits the site font (no bundled Plus Jakarta / IBM Plex)
 *  - fixed 1000×700 design canvas scaled to the column width, so the whole
 *    composition always fits the 58% right column without wrapping or overflow
 *  - backdrop is a soft lavender core that fades to pure white at every edge
 *    (no solid purple block, no frame)
 */

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const CSS = `
@keyframes mfFloatA { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-4px,0); } }
@keyframes mfFloatB { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,3px,0); } }
@keyframes mfFloatC { 0%,100% { transform: translate3d(0,-2px,0); } 50% { transform: translate3d(0,2px,0); } }
@keyframes mfPill { 0%,100% { box-shadow: 0 0 0 0 rgba(226,74,102,0); } 50% { box-shadow: 0 0 0 5px rgba(226,74,102,0.10); } }
@keyframes mfRiseBar { from { transform: scaleY(0.35); } to { transform: scaleY(1); } }
@keyframes mfBarWave { 0%,100% { transform: scaleY(0.9); } 50% { transform: scaleY(1); } }
@keyframes mfRiseIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes mfSweep { 0% { transform: translateX(-130%); } 55%,100% { transform: translateX(240%); } }
@keyframes mfBlink { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(0.82); } }
@keyframes mfGlowRow { 0%,100% { box-shadow: 0 0 0 0 rgba(110,58,224,0); } 50% { box-shadow: 0 0 0 3px rgba(110,58,224,0.09); } }
@keyframes mfDrawIn { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes mfDotPulse { 0%,100% { r: 4.2px; opacity: 1; } 50% { r: 5.2px; opacity: 0.82; } }
@media (prefers-reduced-motion: reduce) {
  .mf-scene *, .mf-scene *::before, .mf-scene *::after { animation: none !important; }
}
`;

const DESIGN_W = 1000;
const DESIGN_H = 700;

const INK = "#1A1626";
const MUTED = "#66607E";
const BODY = "#6A6482";
const PURPLE = "#6E3AE0";

const STEPS = [
  "Daten werden geprüft",
  "Zahlungsverhalten analysiert",
  "Kommunikationshistorie",
  "Risikobewertung",
  "Empfehlung wird erstellt",
];

const BARS = [
  { h: 100, from: "#6E3AE0", to: "#CBB6F9" },
  { h: 86, from: "#7E52E8", to: "#D2C0FA" },
  { h: 70, from: "#9C7BEE", to: "#DCCEFB" },
  { h: 64, from: "#9C7BEE", to: "#DCCEFB" },
  { h: 56, from: "#B49CF3", to: "#E3D8FC" },
  { h: 52, from: "#B49CF3", to: "#E3D8FC" },
  { h: 47, from: "#BDA8F4", to: "#E7DEFC" },
  { h: 34, from: "#CFC0F7", to: "#EFE9FD" },
  { h: 30, from: "#CFC0F7", to: "#EFE9FD" },
  { h: 26, from: "#CFC0F7", to: "#EFE9FD" },
];

const CASES = [
  { id: "#0182", tag: "MITTEL", color: "#B0741A", bg: "#FDF3E3", active: false },
  { id: "#0417", tag: "NIEDRIG", color: "#6B6880", bg: "#F0EFF5", active: false },
  { id: "#0931", tag: "HOCH", color: "#D9375B", bg: "#FDEBEF", active: true },
];

const card: CSSProperties = {
  position: "relative",
  zIndex: 2,
  background: "#FFFFFF",
  border: "1px solid rgba(110,58,224,0.07)",
  borderRadius: 18,
  padding: "16px 18px 18px",
  boxShadow:
    "0 22px 44px -26px rgba(52,28,102,0.30), 0 2px 6px rgba(52,28,102,0.04)",
};
const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  color: MUTED,
  textTransform: "uppercase",
  lineHeight: 1.3,
  whiteSpace: "nowrap",
};
const bigValue: CSSProperties = {
  minWidth: 0,
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: "-0.02em",
};
const cardBody: CSSProperties = {
  marginTop: 9,
  fontSize: 11.5,
  lineHeight: 1.45,
  color: BODY,
};
const iconBox: CSSProperties = {
  flex: "0 0 auto",
  width: 38,
  height: 38,
  borderRadius: 12,
  background: "linear-gradient(160deg,#F2ECFF,#E7DEFF)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const glassCard: CSSProperties = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(110,58,224,0.08)",
  borderRadius: 18,
  padding: "16px 18px",
  boxShadow: "0 18px 38px -28px rgba(52,28,102,0.24)",
};
const phoneRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "3.4cqw 4.8cqw",
  gap: "2cqw",
};
const rowLabel: CSSProperties = { fontSize: "3.9cqw", color: BODY };
const rowValue: CSSProperties = {
  fontSize: "3.9cqw",
  fontWeight: 700,
  whiteSpace: "nowrap",
};
const divider: CSSProperties = {
  height: 1,
  background: "#F5F2FC",
  margin: "0 4.8cqw",
};
const navLabel: CSSProperties = { fontSize: "2.9cqw", color: "#8B85A0" };
const navItem: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.4cqw",
  width: "20%",
};

const CONNECTORS = [
  { key: "prio", side: "L", frac: 0.15, dur: "6s", begin: "0s" },
  { key: "esk", side: "L", frac: 0.82, dur: "7s", begin: "1.4s" },
  { key: "chart", side: "R", frac: 0.13, dur: "6.5s", begin: "2.2s" },
  { key: "kontakt", side: "R", frac: 0.5, dur: "7.5s", begin: "0.7s" },
] as const;

type Box = { l: number; r: number; t: number; b: number; h: number };
type Link = {
  key: string;
  d: string;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  startR: number;
  dur: string;
  begin: string;
};

type Props = {
  logoSrc?: string;
  animate?: boolean;
  showConnectors?: boolean;
  dotColor?: string;
};

export default function MeridiusFallanalyseVisual({
  logoSrc = "/meridius-logo-lockup.png",
  animate = true,
  showConnectors = true,
  dotColor = "#D93BE0",
}: Props) {
  const [tick, setTick] = useState(5);
  const [scale, setScale] = useState(0.7);
  const [links, setLinks] = useState<Link[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<Record<string, HTMLElement | null>>({});
  const setNode = (k: string) => (el: HTMLElement | null) => {
    nodes.current[k] = el;
  };

  useEffect(() => {
    if (!animate) return;
    const t = setInterval(() => setTick((v) => (v + 1) % 8), 1900);
    return () => clearInterval(t);
  }, [animate]);

  useIsoLayoutEffect(() => {
    const measure = () => {
      const root = rootRef.current;
      if (!root) return;
      const w = root.clientWidth;
      if (w > 0) setScale(w / DESIGN_W);

      if (!showConnectors) {
        setLinks((prev) => (prev.length ? [] : prev));
        return;
      }
      const rr = root.getBoundingClientRect();
      const box = (k: string): Box | null => {
        const el = nodes.current[k];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          l: r.left - rr.left,
          r: r.right - rr.left,
          t: r.top - rr.top,
          b: r.bottom - rr.top,
          h: r.height,
        };
      };
      const phone = box("phone");
      const overlaps = (c: Box | null) =>
        !!c && !!phone && Math.min(c.b, phone.b) - Math.max(c.t, phone.t) > 24;
      if (!phone || !overlaps(box("prio")) || !overlaps(box("kontakt"))) {
        setLinks((prev) => (prev.length ? [] : prev));
        return;
      }
      const next = CONNECTORS.map((d): Link | null => {
        const c = box(d.key);
        if (!c) return null;
        const sx = d.side === "L" ? c.r : c.l;
        const sy = (c.t + c.b) / 2;
        const ex = d.side === "L" ? phone.l - 4 : phone.r + 4;
        const ey = phone.t + phone.h * d.frac;
        const dx = ex - sx;
        const span = Math.abs(dx);
        if (span < 8) return null;
        const c1x = sx + dx * 0.72;
        const c2x = ex - dx * 0.55;
        return {
          key: d.key,
          d: `M${sx.toFixed(1)} ${sy.toFixed(1)} C${c1x.toFixed(1)} ${sy.toFixed(1)}, ${c2x.toFixed(1)} ${ey.toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)}`,
          sx,
          sy,
          ex,
          ey,
          startR: span > 40 ? 2.2 : 0,
          dur: d.dur,
          begin: d.begin,
        };
      }).filter((x): x is Link => x !== null);
      setLinks((prev) =>
        prev.length === next.length && prev.every((l, i) => l.d === next[i]?.d)
          ? prev
          : next,
      );
    };
    measure();
    const timers = [120, 400, 900].map((ms) => setTimeout(measure, ms));
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && rootRef.current) {
      ro = new ResizeObserver(measure);
      ro.observe(rootRef.current);
    }
    window.addEventListener("resize", measure);
    return () => {
      timers.forEach(clearTimeout);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [showConnectors]);

  const done = animate ? Math.min(tick, 5) : 5;
  const phase = done <= 2 ? "early" : done <= 4 ? "mid" : "done";
  const status = {
    early: {
      label: "Daten werden geprüft",
      color: PURPLE,
      bg: "#F1ECFE",
      width: "32%",
    },
    mid: {
      label: "Risikobewertung läuft",
      color: "#B0741A",
      bg: "#FDF3E3",
      width: "72%",
    },
    done: {
      label: "Analyse abgeschlossen",
      color: "#1E8A5F",
      bg: "#E6F6EE",
      width: "100%",
    },
  }[phase];

  return (
    <div
      ref={rootRef}
      className="mf-scene"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        aspectRatio: "1000 / 700",
        background:
          "radial-gradient(46% 48% at 50% 50%, #F0EAFB 0%, #F7F4FD 42%, #FFFFFF 72%)",
        // feather every edge into the page so there is no visible frame
        WebkitMaskImage:
          "radial-gradient(74% 76% at 50% 48%, #000 42%, transparent 100%)",
        maskImage:
          "radial-gradient(74% 76% at 50% 48%, #000 42%, transparent 100%)",
        color: INK,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          padding: 40,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
          }}
        >
          {/* left column */}
          <div
            style={{
              flex: "0 0 202px",
              width: 202,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              ref={setNode("prio")}
              style={{
                position: "relative",
                animation: "mfFloatA 9s ease-in-out infinite",
              }}
            >
              <div style={card}>
                <div style={eyebrow}>Priorisierung</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      ...iconBox,
                      alignItems: "flex-end",
                      gap: 3,
                      paddingBottom: 13,
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 10,
                        borderRadius: 2,
                        background: "#9B7BF0",
                      }}
                    />
                    <div
                      style={{
                        width: 5,
                        height: 17,
                        borderRadius: 2,
                        background: PURPLE,
                      }}
                    />
                    <div
                      style={{
                        width: 5,
                        height: 13,
                        borderRadius: 2,
                        background: "#8560EA",
                      }}
                    />
                  </div>
                  <div style={bigValue}>Hoch</div>
                </div>
                <div style={cardBody}>
                  Automatische Einstufung auf Basis von Risiko, Betrag und
                  Historie.
                </div>
              </div>
            </div>

            <div
              style={{
                ...glassCard,
                animation: "mfFloatC 11s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                Laufende Analyse
              </div>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {STEPS.map((label, i) => {
                  const ok = i < done;
                  return (
                    <div
                      key={label}
                      style={{ display: "flex", alignItems: "center", gap: 11 }}
                    >
                      {ok ? (
                        <div
                          style={{
                            flex: "0 0 auto",
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            background: PURPLE,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: 7,
                              height: 4,
                              borderLeft: "1.6px solid #fff",
                              borderBottom: "1.6px solid #fff",
                              transform: "rotate(-45deg) translate(0px,-1px)",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            flex: "0 0 auto",
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border: "1.6px solid #DDD6EE",
                            boxSizing: "border-box",
                          }}
                        />
                      )}
                      <div
                        style={{ fontSize: 11.5, color: ok ? "#3B3550" : MUTED }}
                      >
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              ref={setNode("esk")}
              style={{
                position: "relative",
                animation: "mfFloatB 10s ease-in-out infinite",
              }}
            >
              <div style={card}>
                <div style={eyebrow}>Eskalationsstufe</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginTop: 8,
                  }}
                >
                  <div style={{ ...iconBox, flexDirection: "column", gap: 3 }}>
                    <div
                      style={{
                        width: 18,
                        height: 5,
                        borderRadius: 2,
                        background: PURPLE,
                      }}
                    />
                    <div
                      style={{
                        width: 14,
                        height: 5,
                        borderRadius: 2,
                        background: "#8560EA",
                      }}
                    />
                    <div
                      style={{
                        width: 10,
                        height: 5,
                        borderRadius: 2,
                        background: "#B9A3F4",
                      }}
                    />
                  </div>
                  <div style={bigValue}>Stufe 2</div>
                </div>
                <div style={cardBody}>
                  Automatisch empfohlen auf Basis der Analyse.
                </div>
              </div>
            </div>
          </div>

          {/* phone */}
          <div
            ref={setNode("phone")}
            style={{
              flex: "0 0 auto",
              width: 258,
              filter:
                "drop-shadow(0 48px 66px rgba(46,24,92,0.14)) drop-shadow(0 10px 20px rgba(46,24,92,0.07))",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "352/730",
                borderRadius: "12.5%/6%",
                padding: "1.6%",
                boxSizing: "border-box",
                background:
                  "linear-gradient(150deg,#4A4655 0%,#1D1B24 32%,#2B2833 62%,#100F16 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "12.5%/6%",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: "11.2%/5.4%",
                  background: "#FFFFFF",
                  overflow: "hidden",
                  containerType: "inline-size",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1.6cqw",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "31cqw",
                    height: "8.4cqw",
                    borderRadius: 99,
                    background: "#0C0B12",
                    zIndex: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "2.4cqw",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: "2cqw",
                      height: "2cqw",
                      borderRadius: "50%",
                      background: "#25203A",
                    }}
                  />
                </div>

                {/* status bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "3.2cqw 6cqw 0",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3.9cqw",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    9:41
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.6cqw",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "0.5cqw",
                      }}
                    >
                      {[1.6, 2.3, 3, 3.6].map((h) => (
                        <div
                          key={h}
                          style={{
                            width: "0.9cqw",
                            height: `${h}cqw`,
                            borderRadius: 1,
                            background: INK,
                          }}
                        />
                      ))}
                    </div>
                    <svg
                      viewBox="0 0 16 12"
                      width="4.2cqw"
                      height="3.2cqw"
                      fill="none"
                      aria-hidden="true"
                      style={{ display: "block" }}
                    >
                      <path
                        d="M1 4.2C2.9 2.5 5.3 1.6 8 1.6s5.1 0.9 7 2.6"
                        stroke={INK}
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M3.4 7C4.7 5.9 6.3 5.3 8 5.3s3.3 0.6 4.6 1.7"
                        stroke={INK}
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="9.9" r="1.2" fill={INK} />
                    </svg>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4cqw",
                      }}
                    >
                      <div
                        style={{
                          width: "6.4cqw",
                          height: "3.2cqw",
                          border: `1.1px solid ${INK}`,
                          borderRadius: "1cqw",
                          padding: "0.55cqw",
                          boxSizing: "border-box",
                        }}
                      >
                        <div
                          style={{
                            width: "78%",
                            height: "100%",
                            borderRadius: "0.45cqw",
                            background: INK,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: "0.75cqw",
                          height: "1.3cqw",
                          borderRadius: "0 0.5cqw 0.5cqw 0",
                          background: INK,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    flex: "1 1 auto",
                    overflow: "hidden",
                    padding: "0 6cqw",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "6.6cqw",
                    }}
                  >
                    <img
                      src={logoSrc}
                      alt="Meridius"
                      style={{ display: "block", width: "38cqw", height: "auto" }}
                    />
                    <div
                      style={{
                        width: "8.6cqw",
                        height: "8.6cqw",
                        borderRadius: "50%",
                        background: "#F4F1FD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.9cqw",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: "1.2cqw",
                            height: "1.2cqw",
                            borderRadius: "50%",
                            background: PURPLE,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "8.4cqw",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      marginTop: "2.4cqw",
                      animation:
                        "mfRiseIn 0.8s cubic-bezier(.22,.9,.24,1) both 0.12s",
                    }}
                  >
                    Fallanalyse
                  </div>
                  <div
                    style={{
                      fontSize: "3.9cqw",
                      lineHeight: 1.45,
                      color: MUTED,
                      marginTop: "1.6cqw",
                      animation:
                        "mfRiseIn 0.8s cubic-bezier(.22,.9,.24,1) both 0.22s",
                    }}
                  >
                    Intelligente Analyse.
                    <br />
                    Schnellere Entscheidungen.
                  </div>

                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      marginTop: "5.2cqw",
                      border: "1px solid #EFEBFA",
                      borderRadius: "5cqw",
                      background: "#FDFCFF",
                      boxShadow: "0 3cqw 6cqw -4cqw rgba(52,28,102,0.16)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "45%",
                        height: "100%",
                        background:
                          "linear-gradient(100deg, rgba(110,58,224,0) 0%, rgba(110,58,224,0.055) 50%, rgba(110,58,224,0) 100%)",
                        animation:
                          "mfSweep 6.5s cubic-bezier(.5,0,.5,1) infinite 1.2s",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "4.6cqw 4.8cqw 3.4cqw",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "5.6cqw",
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Fall #0931
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.4cqw",
                          fontSize: "3.1cqw",
                          fontWeight: 600,
                          color: PURPLE,
                          background: "#F1ECFE",
                          borderRadius: 99,
                          padding: "1.3cqw 2.8cqw",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <div
                          style={{
                            width: "1.5cqw",
                            height: "1.5cqw",
                            borderRadius: "50%",
                            background: PURPLE,
                            animation: "mfBlink 1.6s ease-in-out infinite",
                          }}
                        />
                        <div>In Analyse</div>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "0.7cqw",
                        margin: "0 4.8cqw 2.6cqw",
                        borderRadius: 99,
                        background: "#F1EDFB",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: status.width,
                          borderRadius: 99,
                          background: "linear-gradient(90deg,#8560EA,#6E3AE0)",
                          transition: "width 900ms cubic-bezier(.22,.9,.24,1)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        height: 1,
                        background: "#F1EDFB",
                        margin: "0 4.8cqw",
                      }}
                    />

                    <div style={phoneRow}>
                      <div style={rowLabel}>Priorität</div>
                      <div
                        style={{
                          fontSize: "3.3cqw",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          color: "#D9375B",
                          background: "#FDEBEF",
                          borderRadius: 99,
                          padding: "1.2cqw 3cqw",
                          animation: "mfPill 3.2s ease-in-out infinite",
                        }}
                      >
                        HOCH
                      </div>
                    </div>
                    <div style={divider} />
                    <div style={phoneRow}>
                      <div style={rowLabel}>Kontaktzeitpunkt</div>
                      <div style={rowValue}>14:30</div>
                    </div>
                    <div style={divider} />
                    <div style={phoneRow}>
                      <div style={rowLabel}>Eskalationsstufe</div>
                      <div style={rowValue}>Stufe 2</div>
                    </div>
                    <div style={divider} />
                    <div style={{ ...phoneRow, padding: "3.4cqw 4.8cqw 4.4cqw" }}>
                      <div style={rowLabel}>Status</div>
                      <div
                        style={{
                          fontSize: "3.3cqw",
                          fontWeight: 600,
                          borderRadius: 99,
                          padding: "1.4cqw 3cqw",
                          whiteSpace: "nowrap",
                          color: status.color,
                          background: status.bg,
                          transition: "background 600ms ease, color 600ms ease",
                        }}
                      >
                        {status.label}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "5.6cqw",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "4.6cqw",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Weitere Fälle
                    </div>
                    <div
                      style={{
                        fontSize: "3.5cqw",
                        fontWeight: 600,
                        color: PURPLE,
                      }}
                    >
                      Alle anzeigen →
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "2.6cqw",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.6cqw",
                      animation:
                        "mfRiseIn 0.9s cubic-bezier(.22,.9,.24,1) both 0.55s",
                    }}
                  >
                    {CASES.map((c) => (
                      <div
                        key={c.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2.8cqw",
                          background: c.active ? "#F5F1FE" : "#FAF9FE",
                          border: c.active ? "1px solid #E7DEFF" : "none",
                          borderRadius: "3.4cqw",
                          padding: "3cqw 3.6cqw",
                          animation: c.active
                            ? "mfGlowRow 3.8s ease-in-out infinite"
                            : "none",
                        }}
                      >
                        <div
                          style={{
                            width: "2.4cqw",
                            height: "2.4cqw",
                            borderRadius: "50%",
                            background: c.active ? PURPLE : "#DED7F3",
                            animation: c.active
                              ? "mfBlink 2.4s ease-in-out infinite"
                              : "none",
                          }}
                        />
                        <div
                          style={{
                            flex: "1 1 auto",
                            fontSize: "3.9cqw",
                            fontWeight: c.active ? 700 : 600,
                            fontFamily: "ui-monospace, monospace",
                          }}
                        >
                          {c.id}
                        </div>
                        <div
                          style={{
                            fontSize: "3cqw",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            color: c.color,
                            background: c.bg,
                            borderRadius: 99,
                            padding: "1cqw 2.4cqw",
                          }}
                        >
                          {c.tag}
                        </div>
                        <div
                          style={{
                            width: "1.8cqw",
                            height: "1.8cqw",
                            borderTop: `1.2px solid ${c.active ? "#8560EA" : "#B7B1C8"}`,
                            borderRight: `1.2px solid ${c.active ? "#8560EA" : "#B7B1C8"}`,
                            transform: "rotate(45deg)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* bottom nav */}
                <div
                  style={{
                    flex: "0 0 auto",
                    borderTop: "1px solid #F2EFFA",
                    background: "rgba(255,255,255,0.92)",
                    padding: "3.2cqw 5cqw 4.4cqw",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={navItem}>
                    <div
                      style={{
                        width: "4.6cqw",
                        height: "5.4cqw",
                        border: `1.4px solid ${PURPLE}`,
                        borderRadius: "1cqw",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "0.8cqw",
                        padding: "0 1cqw",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          height: "0.7cqw",
                          background: PURPLE,
                          borderRadius: 1,
                        }}
                      />
                      <div
                        style={{
                          height: "0.7cqw",
                          background: PURPLE,
                          borderRadius: 1,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "2.9cqw",
                        fontWeight: 600,
                        color: PURPLE,
                      }}
                    >
                      Fälle
                    </div>
                    <div
                      style={{
                        width: "5cqw",
                        height: "0.7cqw",
                        borderRadius: 99,
                        background: PURPLE,
                      }}
                    />
                  </div>
                  <div style={navItem}>
                    <div
                      style={{
                        width: "5.2cqw",
                        height: "5.2cqw",
                        border: "1.4px solid #8B85A0",
                        borderRadius: "50%",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          width: "2.2cqw",
                          height: "1.1cqw",
                          background: "#8B85A0",
                          borderRadius: 1,
                          transform: "translate(-46%,-50%) rotate(-38deg)",
                          transformOrigin: "left center",
                        }}
                      />
                    </div>
                    <div style={navLabel}>Analyse</div>
                  </div>
                  <div style={navItem}>
                    <div
                      style={{
                        width: "5.2cqw",
                        height: "5cqw",
                        border: "1.4px solid #8B85A0",
                        borderRadius: "1.1cqw",
                        borderTopWidth: "2.4cqw",
                        boxSizing: "border-box",
                      }}
                    />
                    <div style={navLabel}>Kalender</div>
                  </div>
                  <div style={navItem}>
                    <div
                      style={{
                        height: "5.2cqw",
                        display: "flex",
                        alignItems: "center",
                        gap: "1cqw",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: "1.2cqw",
                            height: "1.2cqw",
                            borderRadius: "50%",
                            background: "#8B85A0",
                          }}
                        />
                      ))}
                    </div>
                    <div style={navLabel}>Mehr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right column */}
          <div
            style={{
              flex: "0 0 202px",
              width: 202,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              ref={setNode("chart")}
              style={{
                ...glassCard,
                background: "rgba(255,255,255,0.66)",
                animation: "mfFloatC 12s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flex: "0 0 auto",
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      background: "#F1ECFE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 11,
                        height: 6,
                        borderLeft: `1.6px solid ${PURPLE}`,
                        borderBottom: `1.6px solid ${PURPLE}`,
                        transform: "rotate(-24deg)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Bearbeitungsdauer
                  </div>
                </div>
                <div
                  style={{
                    flex: "0 0 auto",
                    whiteSpace: "nowrap",
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: BODY,
                    background: "#F4F2FB",
                    border: "1px solid rgba(110,58,224,0.07)",
                    borderRadius: 99,
                    padding: "5px 10px",
                  }}
                >
                  30 Tage ⌄
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  marginTop: 14,
                  height: 78,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 5,
                }}
              >
                {BARS.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${b.h}%`,
                      borderRadius: "4px 4px 2px 2px",
                      background: `linear-gradient(${b.from},${b.to})`,
                      transformOrigin: "bottom",
                      animation: `mfRiseBar 1.1s cubic-bezier(.22,.9,.24,1) both ${(
                        0.05 +
                        i * 0.07
                      ).toFixed(2)}s, mfBarWave ${(3.2 + i * 0.25).toFixed(
                        2,
                      )}s ease-in-out infinite ${(1.39 + i * 0.09).toFixed(2)}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              ref={setNode("kontakt")}
              style={{
                position: "relative",
                animation: "mfFloatB 9.5s ease-in-out infinite",
              }}
            >
              <div style={card}>
                <div style={eyebrow}>Kontaktzeitpunkt</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginTop: 8,
                  }}
                >
                  <div style={iconBox}>
                    <div
                      style={{
                        position: "relative",
                        width: 22,
                        height: 22,
                        border: `1.8px solid ${PURPLE}`,
                        borderRadius: "50%",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          width: 1.6,
                          height: 7,
                          background: PURPLE,
                          borderRadius: 1,
                          transformOrigin: "bottom center",
                          transform: "translate(-50%,-100%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          width: 1.6,
                          height: 5,
                          background: PURPLE,
                          borderRadius: 1,
                          transformOrigin: "bottom center",
                          transform: "translate(-50%,-100%) rotate(96deg)",
                        }}
                      />
                    </div>
                  </div>
                  <div style={bigValue}>14:30</div>
                </div>
                <div style={cardBody}>
                  Optimaler Zeitpunkt für die nächste Kontaktaufnahme.
                </div>
              </div>
            </div>

            <div
              style={{
                ...glassCard,
                animation: "mfFloatA 13s ease-in-out infinite",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    flex: "0 0 auto",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background:
                      "conic-gradient(#6E3AE0 0 72%, #EDE8FA 72% 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "#FFFFFF",
                    }}
                  />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                    }}
                  >
                    {status.label}
                  </div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>
                    Fall #0931 · Stufe 2
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    height: 6,
                    borderRadius: 99,
                    background: "#EDE8FA",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "78%",
                      borderRadius: 99,
                      background: "#B7A2F2",
                    }}
                  />
                </div>
                <div
                  style={{
                    height: 6,
                    borderRadius: 99,
                    background: "#EDE8FA",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "58%",
                      borderRadius: 99,
                      background: "#D6CBF7",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {links.length > 0 && (
        <svg
          fill="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 6,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          {links.map((l) => (
            <g key={l.key}>
              <path
                d={l.d}
                stroke="#9E86EE"
                strokeOpacity="0.55"
                strokeWidth="1.25"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                style={{
                  animation: "mfDrawIn 1.5s cubic-bezier(.4,.05,.2,1) both",
                }}
              />
              <circle cx={l.sx} cy={l.sy} r={l.startR} fill="#C9B8F2" />
              <circle
                cx={l.ex}
                cy={l.ey}
                r="4.2"
                fill={dotColor}
                style={{ animation: "mfDotPulse 3.4s ease-in-out infinite" }}
              />
              <circle r="2.4" fill={dotColor} opacity="0">
                <animateMotion
                  dur={l.dur}
                  begin={l.begin}
                  repeatCount="indefinite"
                  path={l.d}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.95;0.95;0"
                  dur={l.dur}
                  begin={l.begin}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
