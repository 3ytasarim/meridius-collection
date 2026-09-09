"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 04 — Massenforderungen.
 * Bulk-processing visual from the design handoff bundle: viele Fälle → BATCH →
 * automatisierte Verarbeitung → strukturierte Ergebnisse. Purely decorative,
 * all figures are demo data. Ported to the project: TypeScript, inherits the
 * site font, site mono face, namespaced `mfv-*` CSS injected locally (touches
 * no global styles), panel radius aligned to the Meridius scale.
 */

const CASES = [
  ["MR-92841", "CHF 840.00"],
  ["MR-92842", "CHF 1'290.00"],
  ["MR-92843", "CHF 420.00"],
  ["MR-92844", "CHF 2'180.00"],
  ["MR-92845", "CHF 760.00"],
  ["MR-92846", "CHF 3'240.00"],
  ["MR-92847", "CHF 980.00"],
] as const;

const RESULTS = [
  ["Klassifiziert", "1'842", "4.2s"],
  ["Priorisiert", "428", "5.9s"],
  ["Zugeordnet", "210", "6.25s"],
] as const;

const BARS = [38, 62, 48, 84, 66, 100, 72, 54];
const BAR_COLORS = [
  "#EDE7FB",
  "#DFD5F8",
  "#EDE7FB",
  "#C9B8F2",
  "#DFD5F8",
  "#7C57E0",
  "#C9B8F2",
  "#DFD5F8",
];

const WIRES = [
  ["mfA", "M236 176 C286 176 268 246 304 262", "2.6s", "0s", 3.6],
  ["mfB", "M236 262 C280 262 282 264 304 268", "2.6s", "0.9s", 3.6],
  ["mfC", "M236 356 C286 356 270 288 304 274", "2.6s", "1.7s", 3.6],
  ["mfD", "M470 268 C500 268 494 214 524 206", "2.4s", "0.4s", 3.2],
  ["mfE", "M470 272 C500 272 500 276 524 278", "2.4s", "1.2s", 3.2],
  ["mfF", "M470 276 C500 276 496 342 524 350", "2.4s", "2s", 3.2],
] as const;

const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "'");

const CSS = `
.mfv-wrap { width: 100%; max-width: 760px; container-type: inline-size; color: #14121C; }

.mfv-panel { position: relative; width: 100%; aspect-ratio: 760 / 540; overflow: hidden;
  background: radial-gradient(44% 46% at 50% 50%, #F0EAFB 0%, #F7F4FD 42%, #FFFFFF 72%);
  -webkit-mask-image: radial-gradient(86% 90% at 50% 50%, #000 60%, transparent 100%);
  mask-image: radial-gradient(86% 90% at 50% 50%, #000 60%, transparent 100%); }

.mfv-wires { position: absolute; inset: 0; width: 100%; height: 100%; }

.mfv-grid { position: absolute; inset: 0; box-sizing: border-box; padding: 6.5cqw;
  display: grid; grid-template-columns: 1.2fr 1.35fr 0.95fr; align-items: center; gap: 3.2cqw; }

/* incoming column */
.mfv-col-in { position: relative; min-width: 0; }
.mfv-ghosts { position: absolute; inset: 0; pointer-events: none; filter: blur(1.3px);
  display: flex; flex-direction: column; justify-content: center; gap: 1.2cqw; }
.mfv-ghosts span { height: 1.2cqw; border-radius: 1cqw; background: #EBE5FA;
  animation: mfGhost 4.4s linear infinite; }

.mfv-eyebrow { font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; font-size: clamp(9.5px, 1.35cqw, 11px);
  letter-spacing: .16em; color: #9B92B4; margin-bottom: 1.4cqw; }
.mfv-eyebrow-out { margin: 0 0 0 .4cqw; }

.mfv-cases { position: relative; display: flex; flex-direction: column; gap: .9cqw; }
.mfv-case { display: flex; justify-content: space-between; align-items: center; gap: 1cqw;
  padding: 1.15cqw 1.5cqw; border-radius: 1.2cqw; background: #fff;
  box-shadow: 0 1.6cqw 3cqw -2.4cqw rgba(52,30,130,.45);
  animation: mfCase 7.5s cubic-bezier(.4,0,.2,1) infinite; }
.mfv-ref { font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; font-size: clamp(11px, 1.6cqw, 13px);
  color: #6E6880; white-space: nowrap; }
.mfv-amount { font-size: clamp(11px, 1.6cqw, 13px); font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }

.mfv-batch { position: absolute; right: -3.6cqw; top: 50%; padding: .9cqw 1.3cqw; border-radius: 1.1cqw;
  background: #7C57E0; color: #fff; white-space: nowrap;
  box-shadow: 0 1.6cqw 3cqw -1.8cqw rgba(70,42,180,.85);
  animation: mfBatch 7.5s cubic-bezier(.4,0,.2,1) infinite; }
.mfv-batch-id { font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; font-size: clamp(9px, 1.25cqw, 10px); letter-spacing: .14em; }
.mfv-batch-count { font-size: clamp(11px, 1.5cqw, 12px); font-weight: 600; opacity: .88; }

/* processing engine */
.mfv-engine { min-width: 0; border-radius: 2.6cqw; background: #fff; padding: 3.4cqw;
  box-shadow: 0 5cqw 8cqw -4.6cqw rgba(44,24,110,.55); animation: mfFloat 7.5s ease-in-out infinite; }
.mfv-engine-label { font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; font-size: clamp(9.5px, 1.35cqw, 11px);
  letter-spacing: .18em; color: #7C57E0; }
.mfv-counter { display: flex; align-items: baseline; gap: 1.1cqw; margin-top: 1.8cqw; }
.mfv-counter-num { font-size: clamp(34px, 6.4cqw, 52px); font-weight: 600; letter-spacing: -.035em; line-height: 1; font-variant-numeric: tabular-nums; }
.mfv-counter-unit { font-size: clamp(14px, 2.1cqw, 17px); color: #6E6880; }
.mfv-engine-sub { margin-top: 1cqw; font-size: clamp(12px, 1.8cqw, 14px); color: #6E6880; }
.mfv-track { margin-top: 2.8cqw; height: .32cqw; min-height: 2px; background: #EFEAFC; border-radius: 1cqw; overflow: hidden; }
.mfv-progress { height: 100%; background: #7C57E0; transform-origin: left center;
  animation: mfLine 7.5s cubic-bezier(.35,0,.25,1) infinite; }
.mfv-meta { display: flex; justify-content: space-between; gap: 1cqw; margin-top: 1.1cqw;
  font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; font-size: clamp(9.5px, 1.35cqw, 11px);
  letter-spacing: .1em; color: #A49CBA; }
.mfv-bars { display: flex; gap: .5cqw; align-items: flex-end; height: 3.4cqw; min-height: 18px; margin-top: 2.6cqw; }
.mfv-bars span { flex: 1; border-radius: .4cqw; display: block; }

/* results column */
.mfv-col-out { min-width: 0; display: flex; flex-direction: column; gap: 1.6cqw; }
.mfv-result { display: flex; align-items: center; justify-content: space-between; gap: 1.2cqw;
  padding: 1.6cqw; border-radius: 1.4cqw; background: #fff;
  box-shadow: 0 2cqw 3.6cqw -2.8cqw rgba(52,30,130,.45);
  opacity: 0; animation: mfRes 7.5s ease infinite both; }
.mfv-result-label { display: flex; align-items: center; gap: 1cqw; font-size: clamp(12px, 1.75cqw, 14px); }
.mfv-check { width: 1.9cqw; min-width: 14px; height: 1.9cqw; min-height: 14px; border-radius: 50%;
  background: #7C57E0; color: #fff; font-size: clamp(8px, 1.1cqw, 9px);
  display: flex; align-items: center; justify-content: center; }
.mfv-result-value { font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; font-size: clamp(11px, 1.6cqw, 13px);
  color: #6E6880; font-variant-numeric: tabular-nums; white-space: nowrap; }

/* ---- animation (7.5s master loop) ---- */
@keyframes mfCase {
  0%   { opacity: 0; transform: translateX(-16px); }
  5%   { opacity: 1; transform: translateX(0); }
  24%  { opacity: 1; transform: translateX(0); }
  34%  { opacity: 0; transform: translateX(96px) scale(.96); }
  35%, 54% { opacity: 0; transform: translateX(-16px); }
  59%  { opacity: 1; transform: translateX(0); }
  76%  { opacity: 1; transform: translateX(0); }
  86%  { opacity: 0; transform: translateX(96px) scale(.96); }
  87%, 100% { opacity: 0; transform: translateX(-16px); }
}
@keyframes mfGhost {
  0%   { opacity: 0; transform: translateY(10px); }
  35%  { opacity: .55; transform: translateY(0); }
  75%  { opacity: .3; transform: translateY(-6px); }
  100% { opacity: 0; transform: translateY(-14px); }
}
@keyframes mfBatch {
  0%, 17%  { opacity: 0; transform: translate(-14px, 0) scale(.94); }
  22%      { opacity: 1; transform: translate(-4px, 0) scale(1); }
  31%      { opacity: 1; transform: translate(12px, 0) scale(1); }
  37%      { opacity: 0; transform: translate(34px, 0) scale(.96); }
  38%, 72% { opacity: 0; transform: translate(-14px, 0) scale(.94); }
  77%      { opacity: 1; transform: translate(-4px, 0) scale(1); }
  85%      { opacity: 1; transform: translate(12px, 0) scale(1); }
  91%      { opacity: 0; transform: translate(34px, 0) scale(.96); }
  92%, 100%{ opacity: 0; transform: translate(-14px, 0) scale(.94); }
}
@keyframes mfLine { 0% { transform: scaleX(0); } 55% { transform: scaleX(.62); } 92%, 100% { transform: scaleX(1); } }
@keyframes mfRes {
  0%   { opacity: 0; transform: translateY(8px); }
  5%   { opacity: 1; transform: translateY(0); }
  92%  { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(8px); }
}
@keyframes mfFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

/* ---- stacked / mobile ---- */
@container (max-width: 560px) {
  .mfv-panel { aspect-ratio: auto; }
  .mfv-grid { position: relative; inset: auto; grid-template-columns: 1fr; align-items: stretch; gap: 16px; padding: 20px; }
  .mfv-wires { display: none; }
  .mfv-ghosts { display: none; }
  .mfv-batch { position: relative; right: auto; top: auto; width: max-content; margin: 0 auto;
    padding: 8px 12px; border-radius: 10px; align-self: center; }
  .mfv-track { height: 2px; }
  .mfv-bars { height: 22px; }
}

/* ---- reduced motion: show the finished state ---- */
@media (prefers-reduced-motion: reduce) {
  .mfv-case, .mfv-batch, .mfv-result, .mfv-engine, .mfv-progress {
    animation: none !important; opacity: 1 !important; transform: none !important;
  }
  .mfv-progress { transform: scaleX(1) !important; }
  .mfv-ghosts, [data-anim="dot"] { display: none !important; }
}
`;

type Props = {
  counterStart?: number;
  counterIntervalMs?: number;
};

export function MassenVisual({
  counterStart = 2436,
  counterIntervalMs = 850,
}: Props) {
  const [n, setN] = useState(counterStart);
  const reduced = useRef<boolean>(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) {
      setN(counterStart + 44);
      return;
    }
    const id = setInterval(() => {
      setN((v) => {
        const next = v + 3 + Math.floor(Math.random() * 7);
        return next > counterStart + 340 ? counterStart : next;
      });
    }, counterIntervalMs);
    return () => clearInterval(id);
  }, [counterStart, counterIntervalMs]);

  return (
    <div className="mfv-wrap">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="mfv-panel" data-mf="panel">
        <svg
          className="mfv-wires"
          viewBox="0 0 760 540"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-mf="wires"
        >
          <g fill="none" stroke="#DED5F7" strokeWidth="1">
            {WIRES.map(([id, d]) => (
              <path key={id} id={id} d={d} />
            ))}
          </g>
          <g fill="#8B6CE8" data-anim="dot">
            {WIRES.map(([id, , dur, begin, r]) => (
              <circle key={id + "-dot"} r={r}>
                <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
                  <mpath href={"#" + id} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        </svg>

        <div className="mfv-grid" data-mf="grid">
          {/* 1 — incoming Fälle */}
          <div className="mfv-col-in">
            <div className="mfv-ghosts" aria-hidden="true">
              {[0, 0.7, 1.5, 2.3, 3.1].map((d) => (
                <span
                  key={d}
                  data-anim="ghost"
                  style={{ animationDelay: d + "s" }}
                />
              ))}
            </div>
            <div className="mfv-eyebrow">EINGANG · LAUFEND</div>
            <div className="mfv-cases">
              {CASES.map(([ref, amount], i) => (
                <div
                  key={ref}
                  className="mfv-case"
                  data-anim="case"
                  style={{ animationDelay: (i * 0.18).toFixed(2) + "s" }}
                >
                  <span className="mfv-ref">{ref}</span>
                  <span className="mfv-amount">{amount}</span>
                </div>
              ))}
            </div>
            <div className="mfv-batch" data-anim="batch" data-mf="batch">
              <div className="mfv-batch-id">BATCH 024</div>
              <div className="mfv-batch-count">48 Fälle</div>
            </div>
          </div>

          {/* 2 — processing engine */}
          <div className="mfv-engine" data-anim="float">
            <div className="mfv-engine-label">MASSENVERARBEITUNG</div>
            <div className="mfv-counter">
              <span className="mfv-counter-num">{group(n)}</span>
              <span className="mfv-counter-unit">Fälle</span>
            </div>
            <div className="mfv-engine-sub">Automatisierte Verarbeitung</div>
            <div className="mfv-track">
              <div className="mfv-progress" data-anim="line" />
            </div>
            <div className="mfv-meta">
              <span>BATCH AKTIV</span>
              <span>98.7 % AUTOMATISIERT</span>
            </div>
            <div className="mfv-bars" aria-hidden="true">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  style={{ height: h + "%", background: BAR_COLORS[i] ?? "#EDE7FB" }}
                />
              ))}
            </div>
          </div>

          {/* 3 — structured results */}
          <div className="mfv-col-out">
            {RESULTS.map(([label, value, delay]) => (
              <div
                key={label}
                className="mfv-result"
                data-anim="res"
                style={{ animationDelay: delay }}
              >
                <span className="mfv-result-label">
                  <span className="mfv-check">✓</span>
                  {label}
                </span>
                <span className="mfv-result-value">{value}</span>
              </div>
            ))}
            <div className="mfv-eyebrow mfv-eyebrow-out">
              STRUKTURIERTE ERGEBNISSE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MassenVisual;
