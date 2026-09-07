"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DESIGN_W = 648;
const DESIGN_H = 680;
const MONO = "ui-monospace, 'SFMono-Regular', Menlo, monospace";

const floatCard: CSSProperties = {
  position: "absolute",
  padding: "13px 18px",
  borderRadius: 16,
  background: "#ffffff",
  boxShadow:
    "0 18px 36px -16px oklch(0.4 0.07 292 / 0.35), 0 2px 6px -2px oklch(0.4 0.05 292 / 0.18)",
  border: "1px solid oklch(0.96 0.008 292)",
};
const floatLabel: CSSProperties = {
  fontSize: 8.5,
  fontWeight: 800,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "oklch(0.58 0.14 292)",
  marginBottom: 5,
};
const detailRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "11px 0",
};
const detailLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "oklch(0.52 0.02 292)",
};

/**
 * MeridiusPhone — Claude Design "Fallanalyse Phone Render" export, ported
 * verbatim (648×680 design canvas) and fitted to its column with a scale
 * transform. Purely decorative: aria-hidden, no raster phone image, all shapes
 * are divs. Site font is inherited; the mono role uses ui-monospace.
 */
export function MeridiusPhone({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);

  useIsoLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / DESIGN_W);
    };
    measure();
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${DESIGN_W} / ${DESIGN_H}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: DESIGN_W,
          height: DESIGN_H,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          fontFamily: "inherit",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* ambient lavender glow — one very soft halo that fades to nothing
            well before the edges, so there is no hard boundary on white */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "44%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, oklch(0.62 0.19 292 / 0.30) 0%, oklch(0.7 0.16 292 / 0.15) 38%, oklch(0.82 0.1 292 / 0.06) 62%, transparent 82%)",
          }}
        />

        {/* phone */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 52,
            transform: "translateX(-50%)",
            width: 288,
            height: 580,
            borderRadius: 46,
            padding: 11,
            background:
              "linear-gradient(165deg, #2b2b31 0%, #14141a 45%, #33333b 100%)",
            boxShadow:
              "0 40px 80px -24px oklch(0.35 0.09 292 / 0.38), 0 12px 28px -10px oklch(0.3 0.06 292 / 0.28), inset 0 0 0 1px rgba(255,255,255,0.08)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "absolute", left: -2, top: 132, width: 2, height: 30, borderRadius: "2px 0 0 2px", background: "#3a3a42" }} />
          <div style={{ position: "absolute", left: -2, top: 178, width: 2, height: 52, borderRadius: "2px 0 0 2px", background: "#3a3a42" }} />
          <div style={{ position: "absolute", left: -2, top: 244, width: 2, height: 52, borderRadius: "2px 0 0 2px", background: "#3a3a42" }} />
          <div style={{ position: "absolute", right: -2, top: 200, width: 2, height: 78, borderRadius: "0 2px 2px 0", background: "#3a3a42" }} />

          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 36,
              background: "#ffffff",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* status bar */}
            <div
              style={{
                height: 44,
                flex: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 22px",
                position: "relative",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "#14141a", letterSpacing: "0.01em" }}>
                9:41
              </span>
              <div style={{ position: "absolute", left: "50%", top: 9, transform: "translateX(-50%)", width: 78, height: 22, borderRadius: 12, background: "#14141a" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 1.5 }}>
                  <div style={{ width: 2.5, height: 4, borderRadius: 1, background: "#14141a" }} />
                  <div style={{ width: 2.5, height: 6, borderRadius: 1, background: "#14141a" }} />
                  <div style={{ width: 2.5, height: 8, borderRadius: 1, background: "#14141a" }} />
                  <div style={{ width: 2.5, height: 10, borderRadius: 1, background: "#14141a" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, marginLeft: 4 }}>
                  <div style={{ width: 13, height: 2.5, borderRadius: 2, background: "#14141a" }} />
                  <div style={{ width: 8, height: 2.5, borderRadius: 2, background: "#14141a" }} />
                  <div style={{ width: 3, height: 2.5, borderRadius: 2, background: "#14141a" }} />
                </div>
                <div style={{ width: 20, height: 10, borderRadius: 3, border: "1.5px solid #14141a", padding: 1.5, boxSizing: "border-box", marginLeft: 3 }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: 1, background: "#14141a" }} />
                </div>
              </div>
            </div>

            {/* logo row */}
            <div style={{ flex: "none", padding: "10px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <img
                src="/meridius-phone-logo.png"
                alt=""
                style={{ height: 14, width: 196, display: "block", objectFit: "contain", objectPosition: "left center" }}
              />
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "oklch(0.96 0.012 292)", display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: "oklch(0.5 0.12 292)" }} />
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: "oklch(0.5 0.12 292)" }} />
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: "oklch(0.5 0.12 292)" }} />
              </div>
            </div>

            {/* header */}
            <div style={{ flex: "none", padding: "18px 22px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.55 0.14 292)", background: "oklch(0.955 0.016 292)", padding: "4px 8px", borderRadius: 6 }}>
                  Fall #0931
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9.5, fontWeight: 600, color: "oklch(0.5 0.02 292)" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "oklch(0.68 0.17 145)" }} />
                  Live
                </span>
              </div>
              <div style={{ margin: 0, fontSize: 27, lineHeight: 1.1, fontWeight: 800, letterSpacing: "-0.03em", color: "#14141a" }}>
                Fallanalyse
              </div>
            </div>

            {/* detail card */}
            <div style={{ flex: "none", padding: "18px 18px 0" }}>
              <div
                style={{
                  borderRadius: 20,
                  background:
                    "linear-gradient(150deg, oklch(0.978 0.012 292), oklch(0.99 0.005 292))",
                  border: "1px solid oklch(0.93 0.014 292)",
                  padding: "4px 14px",
                }}
              >
                <div style={{ ...detailRow, borderBottom: "1px solid oklch(0.94 0.01 292)" }}>
                  <span style={detailLabel}>Priorität</span>
                  <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ffffff", background: "linear-gradient(140deg, oklch(0.6 0.19 292), oklch(0.49 0.18 280))", padding: "4px 9px", borderRadius: 999 }}>
                    Hoch
                  </span>
                </div>
                <div style={{ ...detailRow, borderBottom: "1px solid oklch(0.94 0.01 292)" }}>
                  <span style={detailLabel}>Kontaktzeitpunkt</span>
                  <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: "#17171d", letterSpacing: "-0.01em" }}>
                    14:30
                  </span>
                </div>
                <div style={{ ...detailRow, borderBottom: "1px solid oklch(0.94 0.01 292)" }}>
                  <span style={detailLabel}>Eskalationsstufe</span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: "#17171d" }}>Stufe 2</span>
                </div>
                <div style={detailRow}>
                  <span style={detailLabel}>Status</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "oklch(0.45 0.14 292)" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "oklch(0.55 0.18 292)" }} />
                    Analyse läuft
                  </span>
                </div>
              </div>
            </div>

            {/* Weitere Fälle */}
            <div style={{ flex: "none", padding: "22px 22px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.6 0.03 292)" }}>
                Weitere Fälle
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color: "oklch(0.55 0.15 292)" }}>
                ALLE
              </span>
            </div>

            <div style={{ flex: "none", padding: "10px 18px 0", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 15, background: "#ffffff", border: "1px solid oklch(0.945 0.01 292)", boxShadow: "0 2px 6px -3px oklch(0.4 0.05 292 / 0.16)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ width: 4, height: 20, borderRadius: 3, background: "oklch(0.68 0.16 292)" }} />
                  <span style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 500, color: "#17171d" }}>#0182</span>
                </span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(0.5 0.13 292)", background: "oklch(0.96 0.018 292)", padding: "4px 8px", borderRadius: 999 }}>
                  Mittel
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 15, background: "#ffffff", border: "1px solid oklch(0.945 0.01 292)", boxShadow: "0 2px 6px -3px oklch(0.4 0.05 292 / 0.16)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ width: 4, height: 20, borderRadius: 3, background: "oklch(0.86 0.05 292)" }} />
                  <span style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 500, color: "#17171d" }}>#0417</span>
                </span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(0.58 0.03 292)", background: "oklch(0.965 0.006 292)", padding: "4px 8px", borderRadius: 999 }}>
                  Niedrig
                </span>
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <div style={{ flex: "none", padding: "12px 26px 4px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 34, borderRadius: 12, background: "linear-gradient(140deg, oklch(0.34 0.09 292), oklch(0.22 0.06 284))", color: "#ffffff", fontSize: 12, fontWeight: 700, letterSpacing: "-0.01em", boxShadow: "0 8px 18px -8px oklch(0.3 0.08 292 / 0.7)" }}>
                Fall bearbeiten
              </div>
            </div>

            <div style={{ flex: "none", height: 22, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
              <div style={{ width: 96, height: 4, borderRadius: 3, background: "#14141a" }} />
            </div>
          </div>
        </div>

        {/* floating cards */}
        <div style={{ ...floatCard, left: 0, top: 96 }}>
          <div style={floatLabel}>Priorisierung</div>
          <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "#14141a" }}>Hoch</div>
        </div>
        <div style={{ ...floatCard, right: 0, top: 306 }}>
          <div style={floatLabel}>Kontaktzeitpunkt</div>
          <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 500, letterSpacing: "-0.02em", color: "#14141a" }}>14:30</div>
        </div>
        <div style={{ ...floatCard, left: 8, top: 508 }}>
          <div style={floatLabel}>Eskalationsstufe</div>
          <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "#14141a" }}>Stufe 2</div>
        </div>
      </div>
    </div>
  );
}

export default MeridiusPhone;
