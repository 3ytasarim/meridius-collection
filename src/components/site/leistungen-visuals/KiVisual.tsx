"use client";

import type { ReactNode } from "react";
import { motion, type TargetAndTransition } from "framer-motion";
import {
  Activity,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Layers,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ScaleBox, useSequence } from "./primitives";

const W = 640;
const H = 440;

const CHECKLIST = [
  "Daten werden geprüft",
  "Zahlungsverhalten analysiert",
  "Kommunikationshistorie",
  "Risikobewertung",
  "Empfehlung wird erstellt",
];

const WEITERE = [
  { id: "#0182", prio: "Mittel", tone: "amber" as const },
  { id: "#0417", prio: "Niedrig", tone: "grey" as const },
  { id: "#0931", prio: "Hoch", tone: "high" as const },
];

const BARS = [26, 34, 30, 44, 40, 56, 50, 64];

/**
 * 03 — KI-Forderungsmanagement (hero visual).
 * Premium product-marketing composition rebuilt in React/CSS: a centred phone
 * running a fictional Meridius Fallanalyse app, framed by floating analysis
 * cards at different depths and joined by thin curved purple links.
 */
export function KiVisual() {
  const { ref, step, reduce } = useSequence(6, 2000);

  const checks = Math.min(step + 1, CHECKLIST.length);
  const prioSet = step >= 1;
  const eskalLevel = step >= 2 ? 2 : 0;
  const zeitSet = step >= 3;
  const done = step >= 4;

  const drift = (dy: number, delay: number): TargetAndTransition | false =>
    reduce
      ? false
      : {
          y: [0, dy, 0],
          transition: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          },
        };

  return (
    <ScaleBox w={W} h={H} boxRef={ref} className="bg-[radial-gradient(120%_120%_at_50%_0%,#F4EFFD_0%,#FCFBFF_60%)]">
      {/* curved connectors */}
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M222 150 C 200 150 190 150 186 150" fill="none" stroke="transparent" />
        <path d="M222 138 C 196 138 190 132 182 128" fill="none" stroke="#E4DAF6" strokeWidth={1.25} strokeLinecap="round" />
        <path d="M222 300 C 190 300 178 320 148 322" fill="none" stroke="#E4DAF6" strokeWidth={1.25} strokeLinecap="round" />
        <path d="M418 150 C 442 150 452 130 462 122" fill="none" stroke="#E4DAF6" strokeWidth={1.25} strokeLinecap="round" />
        <path id="ki-c1" d="M418 262 C 446 262 452 282 470 288" fill="none" stroke="#C9B9EF" strokeWidth={1.25} strokeLinecap="round" />
        <path d="M418 356 C 442 356 452 372 456 378" fill="none" stroke="#E4DAF6" strokeWidth={1.25} strokeLinecap="round" />
        {!reduce && (
          <circle r={2.4} fill="#6330C7">
            <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1">
              <mpath href="#ki-c1" />
            </animateMotion>
          </circle>
        )}
        <circle cx={472} cy={288} r={3} fill="#6330C7" />
        <circle cx={182} cy={128} r={3} fill="#6330C7" />
      </svg>

      {/* ── floating cards ───────────────────────────── */}
      <motion.div className="absolute" style={{ left: 10, top: 84 }} animate={drift(-3, 0)}>
        <InfoCard
          icon={<BarChart3 className="size-3.5" strokeWidth={2.4} />}
          label="Priorisierung"
          value={prioSet ? "Hoch" : "…"}
          note="Automatische Einstufung auf Basis von Risiko, Betrag und Historie."
          active={prioSet}
        />
      </motion.div>

      <motion.div className="absolute" style={{ left: 22, top: 236 }} animate={drift(3, 1.5)}>
        <div className="w-[190px] rounded-2xl border border-[#EEE7FA] bg-white/95 p-3 shadow-[0_20px_46px_-20px_rgba(99,48,199,0.3)] backdrop-blur-[2px]">
          <div className="text-[9px] font-semibold text-[#2B2433]">
            Laufende Analyse
          </div>
          <div className="mt-2 space-y-1.5">
            {CHECKLIST.map((c, i) => {
              const isDone = i < checks;
              return (
                <div key={c} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "grid size-3 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                      isDone
                        ? "border-[#6330C7] bg-[#6330C7] text-white"
                        : "border-[#D6CCEC]",
                    )}
                  >
                    {isDone && <Check className="size-[7px]" strokeWidth={4} />}
                  </span>
                  <span
                    className={cn(
                      "text-[8px] transition-colors duration-500",
                      isDone ? "text-[#4c4658]" : "text-[#9A93A6]",
                    )}
                  >
                    {c}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute" style={{ left: 40, top: 340 }} animate={drift(-3, 3)}>
        <InfoCard
          icon={<Layers className="size-3.5" strokeWidth={2.4} />}
          label="Eskalationsstufe"
          value={`Stufe ${eskalLevel}`}
          note="Automatisch empfohlen auf Basis der Analyse."
          active={eskalLevel > 0}
        />
      </motion.div>

      <motion.div className="absolute" style={{ left: 456, top: 84 }} animate={drift(-3, 0.8)}>
        <div className="w-[178px] rounded-2xl border border-[#EEE7FA] bg-white/95 p-3 shadow-[0_20px_46px_-20px_rgba(99,48,199,0.3)] backdrop-blur-[2px]">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-semibold text-[#4c4658]">
              Entwicklung
            </span>
            <span className="flex items-center gap-0.5 rounded-md border border-[#F0EBF9] px-1 py-[1px] text-[6.5px] font-semibold text-[#9A93A6]">
              Letzte 30 Tage <ChevronRight className="size-2 rotate-90" />
            </span>
          </div>
          <div className="mt-2.5 flex h-12 items-end gap-1">
            {BARS.map((b, i) => (
              <span
                key={i}
                className={cn(
                  "flex-1 rounded-sm",
                  i >= BARS.length - 2 ? "bg-[#6330C7]" : "bg-[#E4DAF6]",
                )}
                style={{ height: `${b}%` }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute" style={{ left: 462, top: 236 }} animate={drift(3, 2.3)}>
        <InfoCard
          icon={<Clock className="size-3.5" strokeWidth={2.4} />}
          label="Kontaktzeitpunkt"
          value="14:30"
          note="Optimaler Zeitpunkt für höchste Erfolgsquote."
          active={zeitSet}
        />
      </motion.div>

      <motion.div className="absolute" style={{ left: 448, top: 344 }} animate={drift(-2, 4)}>
        <div className="flex w-[184px] items-center gap-2.5 rounded-2xl border border-[#EEE7FA] bg-white/95 p-3 shadow-[0_20px_46px_-20px_rgba(99,48,199,0.3)] backdrop-blur-[2px]">
          <span className="relative grid size-9 shrink-0 place-items-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#EEE7FA" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#6330C7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={94.25}
                strokeDashoffset={done ? 4 : 62}
                className="transition-[stroke-dashoffset] duration-700"
              />
            </svg>
            <Check className="size-3 text-[#6330C7]" strokeWidth={3} />
          </span>
          <div className="min-w-0">
            <div className="text-[9px] font-semibold text-[#2B2433]">
              Analyse abgeschlossen
            </div>
            <div className="mt-1 space-y-1">
              <span className="block h-1 w-full rounded bg-[#EBE4F8]" />
              <span className="block h-1 w-7/12 rounded bg-[#EBE4F8]" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── phone ────────────────────────────────────── */}
      <div className="absolute" style={{ left: 222, top: 16 }}>
        <div
          className="relative rounded-[2.4rem] bg-gradient-to-b from-[#2b2140] to-[#161022] p-[6px] shadow-[0_50px_90px_-30px_rgba(43,20,80,0.5),0_16px_32px_-12px_rgba(43,20,80,0.4)]"
          style={{ width: 196, height: 408 }}
        >
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.95rem] bg-white">
            {/* dynamic island */}
            <div className="absolute left-1/2 top-[8px] z-20 h-[16px] w-[58px] -translate-x-1/2 rounded-full bg-[#0f0a1a]" />

            {/* status bar */}
            <div className="flex items-center justify-between px-4 pt-[9px] text-[7.5px] font-semibold text-[#2B2433]">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="flex items-end gap-[1px]">
                  {[3, 5, 7, 9].map((h) => (
                    <span key={h} className="w-[2px] rounded-[1px] bg-[#2B2433]" style={{ height: h }} />
                  ))}
                </span>
                <span className="ml-0.5 h-[8px] w-[13px] rounded-[3px] border border-[#2B2433]/60 p-[1px]">
                  <span className="block h-full w-8/12 rounded-[1px] bg-[#2B2433]" />
                </span>
              </span>
            </div>

            {/* app header */}
            <div className="px-4 pt-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[7px] font-bold uppercase tracking-[0.28em] text-[#6330C7]">
                    Meridius
                  </div>
                  <div className="mt-0.5 text-[15px] font-semibold tracking-tight text-[#2B2433]">
                    Fallanalyse
                  </div>
                </div>
                <span className="grid size-5 place-items-center rounded-full bg-[#F3EFFC] text-[#6330C7]">
                  <MoreHorizontal className="size-3" />
                </span>
              </div>
              <p className="mt-1 text-[7.5px] leading-[1.5] text-[#9A93A6]">
                Intelligente Analyse.
                <br />
                Schnellere Entscheidungen.
              </p>
            </div>

            {/* focus case */}
            <div className="mx-3.5 mt-2.5 rounded-2xl border border-[#EEE7FA] bg-white px-3 py-2.5 shadow-[0_10px_26px_-16px_rgba(99,48,199,0.25)]">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold tabular-nums text-[#2B2433]">
                  Fall #0931
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-[1.5px] text-[7px] font-bold uppercase tracking-wide transition-colors duration-500",
                    done
                      ? "bg-[#E8F5EC] text-[#2E8B57]"
                      : "bg-[#F3EFFC] text-[#6330C7]",
                  )}
                >
                  {done ? "Abgeschlossen" : "In Analyse"}
                </span>
              </div>

              <ScreenRow
                label="Priorität"
                value={
                  prioSet ? (
                    <span className="rounded-full bg-[#6330C7] px-1.5 py-[1.5px] text-[7px] font-bold uppercase tracking-wide text-white">
                      Hoch
                    </span>
                  ) : (
                    <span className="text-[9px] font-medium text-[#9A93A6]">
                      Analyse …
                    </span>
                  )
                }
              />
              <ScreenRow label="Kontaktzeitpunkt" value="14:30" />
              <ScreenRow
                label="Eskalationsstufe"
                value={
                  <span className="flex items-center gap-1">
                    <span className="flex gap-0.5">
                      {[0, 1, 2].map((s) => (
                        <span
                          key={s}
                          className={cn(
                            "h-1 w-2.5 rounded-full transition-colors duration-500",
                            s < eskalLevel ? "bg-[#6330C7]" : "bg-[#EBE4F8]",
                          )}
                        />
                      ))}
                    </span>
                    <span className="text-[9px] font-semibold text-[#2B2433]">
                      Stufe {eskalLevel}
                    </span>
                  </span>
                }
              />
              <ScreenRow
                label="Status"
                value={
                  <span
                    className={cn(
                      "flex items-center gap-1 text-[8.5px] font-semibold transition-colors duration-500",
                      done ? "text-[#2E8B57]" : "text-[#9A93A6]",
                    )}
                  >
                    {done && <Check className="size-2.5" strokeWidth={3} />}
                    {done ? "Analyse abgeschlossen" : "Analyse läuft"}
                  </span>
                }
              />
            </div>

            {/* weitere fälle */}
            <div className="mx-3.5 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-semibold text-[#2B2433]">
                  Weitere Fälle
                </span>
                <span className="flex items-center gap-0.5 text-[7px] font-semibold text-[#6330C7]">
                  Alle anzeigen <ChevronRight className="size-2" />
                </span>
              </div>
              <div className="mt-1.5 space-y-1">
                {WEITERE.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 rounded-lg border border-[#F2EEF9] bg-white px-2 py-1.5"
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        c.tone === "high"
                          ? "bg-[#6330C7]"
                          : c.tone === "amber"
                            ? "bg-[#E6A23C]"
                            : "bg-[#CFC6E2]",
                      )}
                    />
                    <span className="flex-1 text-[8.5px] font-semibold tabular-nums text-[#4c4658]">
                      {c.id}
                    </span>
                    <PrioPill tone={c.tone}>{c.prio}</PrioPill>
                    <ChevronRight className="size-2.5 text-[#C7BCE4]" />
                  </div>
                ))}
              </div>
            </div>

            {/* tab bar */}
            <div className="mt-auto flex items-center justify-around border-t border-[#F2EEF9] px-3 pb-2 pt-2">
              {[
                { icon: FileText, label: "Fälle", active: true },
                { icon: Activity, label: "Analyse" },
                { icon: CalendarDays, label: "Kalender" },
                { icon: MoreHorizontal, label: "Mehr" },
              ].map((t) => (
                <span
                  key={t.label}
                  className={cn(
                    "flex flex-col items-center gap-0.5 text-[6.5px] font-semibold",
                    t.active ? "text-[#6330C7]" : "text-[#B7AECC]",
                  )}
                >
                  <t.icon className="size-3" strokeWidth={2.4} />
                  {t.label}
                  {t.active && (
                    <span className="mt-[1px] h-[2px] w-3 rounded-full bg-[#6330C7]" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScaleBox>
  );
}

function InfoCard({
  icon,
  label,
  value,
  note,
  active,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  note: string;
  active: boolean;
}) {
  return (
    <div className="w-[176px] rounded-2xl border border-[#EEE7FA] bg-white/95 p-3 shadow-[0_20px_46px_-20px_rgba(99,48,199,0.3)] backdrop-blur-[2px]">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-lg transition-colors duration-500",
            active ? "bg-[#6330C7] text-white" : "bg-[#F3EFFC] text-[#6330C7]",
          )}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-[6.5px] font-bold uppercase tracking-[0.16em] text-[#9A93A6]">
            {label}
          </div>
          <div className="text-[12px] font-semibold leading-tight text-[#2B2433]">
            {value}
          </div>
        </div>
      </div>
      <p className="mt-2 text-[7.5px] leading-[1.5] text-[#9A93A6]">{note}</p>
    </div>
  );
}

function ScreenRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="mt-2 flex items-center justify-between border-t border-[#F2EEF9] pt-2 first-of-type:mt-2.5">
      <span className="text-[8px] font-medium text-[#9A93A6]">{label}</span>
      <span className="text-[9px] font-semibold text-[#2B2433]">{value}</span>
    </div>
  );
}

function PrioPill({
  tone,
  children,
}: {
  tone: "high" | "amber" | "grey";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "rounded-full px-1.5 py-[1px] text-[6.5px] font-bold uppercase tracking-wide",
        tone === "high" && "bg-[#F3EFFC] text-[#6330C7]",
        tone === "amber" && "bg-[#FBF1E1] text-[#B77B22]",
        tone === "grey" && "bg-[#F1EFF5] text-[#9A93A6]",
      )}
    >
      {children}
    </span>
  );
}

export default KiVisual;
