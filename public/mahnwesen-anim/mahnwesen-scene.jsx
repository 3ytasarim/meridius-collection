// mahnwesen-scene.jsx — subtle reveal of the Mahnwesen process graphic.
const { useComposition, CompositionStage, Easing, animate, clamp,
        useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor } = window;

const M = {
  enter: (T, start, dur = 0.7) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeOutCubic })(T),
  draw:  (T, start, dur = 0.8) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeInOutQuad })(T),
  pop:   (T, start, dur = 0.7) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeOutBack })(T),
};

const INK = '#191823';
const GREY = '#9a99ab';
const SKEL = '#eceaf3';
const SANS = '"Helvetica Neue", Helvetica, "Segoe UI", Arial, sans-serif';

const Mail = ({ c }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="5" width="19" height="14" rx="3" fill={c} />
    <path d="M4.5 8 12 13.2 19.5 8" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Doc = ({ c }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3.4h7.4L18 8v12.6H6z" />
    <path d="M9.4 12.4h5.2M9.4 16h5.2" />
  </svg>
);
const Bank = ({ c }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill={c}>
    <path d="M12 3 22 8H2z" />
    <rect x="4.6" y="10" width="2.6" height="8" rx="0.8" />
    <rect x="10.7" y="10" width="2.6" height="8" rx="0.8" />
    <rect x="16.8" y="10" width="2.6" height="8" rx="0.8" />
    <rect x="2.6" y="19.4" width="18.8" height="2.2" rx="1" />
  </svg>
);
const Gavel = ({ c }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill={c}>
    <rect x="3" y="19.2" width="18" height="2.4" rx="1.2" />
    <g transform="rotate(-38 12 11)">
      <rect x="6.6" y="3.6" width="10.8" height="4.6" rx="1.6" />
      <rect x="10.6" y="8.2" width="2.8" height="9" rx="1.2" />
    </g>
  </svg>
);
const Shield = ({ c }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M12 2.6 20 5.4v6.2c0 4.6-3.3 8.2-8 9.8-4.7-1.6-8-5.2-8-9.8V5.4z" fill={c} />
    <path d="M8.4 12.2 11 14.8l4.6-5" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Skeleton({ p, w, h = 9, top, left, delay = 0 }) {
  return (
    <div style={{
      position: 'absolute', left, top, height: h, borderRadius: h / 2, background: SKEL,
      width: Math.max(0, w * clamp(p, 0, 1)),
    }} />
  );
}

function Dots({ left, top }) {
  return (
    <div style={{ position: 'absolute', left, top, display: 'flex', gap: 5 }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: '#d8d6e4' }} />)}
    </div>
  );
}

function StepRow({ T, start, y, Icon, label, accent, two }) {
  const p = M.pop(T, start, 0.7);
  const pb = M.draw(T, start + 0.3, 0.6);
  return (
    <div style={{ position: 'absolute', left: 40, top: y, width: 392, height: 96, opacity: clamp(p, 0, 1) }}>
      <div style={{
        position: 'absolute', left: 0, top: 15, width: 66, height: 66, borderRadius: 33,
        background: '#f2effc', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: `scale(${0.7 + clamp(p, 0, 1) * 0.3})`,
      }}><Icon c={accent} /></div>
      <div style={{
        position: 'absolute', left: 94, top: 8, width: 298, height: 80, borderRadius: 14, background: '#f4f3f8',
        transform: `translateX(${(1 - clamp(p, 0, 1)) * 14}px)`,
      }}>
        <div style={{
          position: 'absolute', left: 22, top: two ? 12 : 22, right: 18,
          font: `500 20.5px/1.34 ${SANS}`, color: INK, letterSpacing: -0.2, whiteSpace: 'pre-line',
        }}>{label}</div>
        <Skeleton p={pb} w={186} top={two ? 62 : 54} left={22} />
      </div>
    </div>
  );
}

function Ring({ T, start, accent, pct }) {
  const p = M.draw(T, start, 1.5);
  const n = Math.round(animate({ from: 0, to: pct, start, end: start + 1.5, ease: Easing.easeOutQuart })(T));
  const r = 52, C = 2 * Math.PI * r;
  return (
    <div style={{ position: 'absolute', left: 26, top: 52, width: 132, height: 132 }}>
      <svg width="132" height="132" viewBox="0 0 132 132">
        <circle cx="66" cy="66" r={r} fill="none" stroke="#eae7f7" strokeWidth="15" />
        <circle cx="66" cy="66" r={r} fill="none" stroke={accent} strokeWidth="15" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - (pct / 100) * clamp(p, 0, 1))}
          transform="rotate(-90 66 66)" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        font: `600 25px/1 ${SANS}`, color: INK, fontVariantNumeric: 'tabular-nums',
      }}>{n}%</div>
    </div>
  );
}

function Piece({ tweaks }) {
  const { T, CUES } = useComposition();
  const accent = tweaks.accent || '#7C5CF0';
  const glow = tweaks.effects !== false;
  const pct = 72;

  const pCard = M.pop(T, 0, 0.7);
  const pTitle = M.enter(T, 0.28, 0.5);
  const pOrbit = M.draw(T, 0.12, 1.4);

  const pStatus = M.enter(T, CUES.Sides, 0.8);
  const pNext = M.enter(T, CUES.Sides + 0.2, 0.8);
  const pProg = M.enter(T, CUES.Sides + 0.4, 0.8);

  const link = (i) => M.draw(T, CUES.Links + i * 0.22, 0.8);
  const dot = (cx, cy, at, r = 8, c) => {
    const d = M.pop(T, at, 0.5);
    return <circle cx={cx} cy={cy} r={r * clamp(d, 0, 1)} fill={c || accent} />;
  };

  const camZ = animate({ from: 1.03, to: 1, start: 0, end: 1.4, ease: Easing.easeOutCubic })(T)
    + animate({ from: 0, to: 0.018, start: 1.8, end: 10, ease: Easing.linear })(T);

  const steps = [
    { Icon: Mail, label: '1. Mahnung' },
    { Icon: Doc, label: 'Vorgerichtlich' },
    { Icon: Bank, label: 'Gerichtliches\nMahnverfahren', two: true },
    { Icon: Gavel, label: 'Betreibung' },
    { Icon: Shield, label: 'Verfahrensbegleitung' },
  ];
  const rowY = [150, 274, 398, 528, 652];
  const railP = M.draw(T, CUES.Steps + 1.05, 1.3);

  return (
    <div data-screen-label={`t=${T.toFixed(0)}s`} style={{
      position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: SANS,
      background: '#fbfaff',
    }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${camZ})`, transformOrigin: '50% 50%' }}>

        {/* connectors */}
        <svg width="1600" height="900" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
          <path d="M566 266 C 536 266 526 366 494 366" fill="none" stroke={accent} strokeWidth="2.2" opacity="0.7"
            pathLength="1" strokeDasharray="1" strokeDashoffset={1 - link(0)} />
          <path d="M1034 266 C 1064 266 1074 328 1106 328" fill="none" stroke={accent} strokeWidth="2.2" opacity="0.7"
            pathLength="1" strokeDasharray="1" strokeDashoffset={1 - link(1)} />
          <path d="M1034 548 C 1064 548 1074 592 1106 592" fill="none" stroke={accent} strokeWidth="2.2" opacity="0.7"
            pathLength="1" strokeDasharray="1" strokeDashoffset={1 - link(2)} />
          {dot(566, 266, CUES.Links + 0.55)}
          {dot(494, 366, CUES.Links + 0.7)}
          {dot(1034, 266, CUES.Links + 0.8, 7, '#b6a6f4')}
          {dot(1106, 328, CUES.Links + 0.92, 7, '#b6a6f4')}
          {dot(1034, 548, CUES.Links + 1.0)}
          {dot(1106, 592, CUES.Links + 1.12, 7, '#b6a6f4')}
        </svg>

        {/* STATUS card */}
        <div style={{
          position: 'absolute', left: 122, top: 292, width: 360, height: 200, borderRadius: 24, background: '#fff',
          boxShadow: '0 4px 14px rgba(60,45,120,0.045), 0 24px 54px rgba(60,45,120,0.07)',
          opacity: clamp(pStatus, 0, 1), transform: `translateX(${(1 - pStatus) * -34}px) scale(${0.97 + pStatus * 0.03})`,
        }}>
          <div style={{ position: 'absolute', left: 30, top: 30, font: `600 15px/1 ${SANS}`, letterSpacing: 2.6, color: GREY }}>STATUS</div>
          <Dots left={302} top={34} />
          <div style={{ position: 'absolute', left: 28, top: 76, display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20, background: '#ece7fb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${0.75 + M.pop(T, CUES.Sides + 0.35, 0.6) * 0.25})`,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 9, background: accent,
                boxShadow: glow ? `0 0 ${10 + 6 * Math.sin(T * 2.2)}px ${accent}88` : 'none',
              }} />
            </div>
            <div style={{ font: `500 25px/1 ${SANS}`, color: INK, letterSpacing: -0.4 }}>In Bearbeitung</div>
          </div>
          <Skeleton p={M.draw(T, CUES.Sides + 0.6, 0.7)} w={276} h={11} top={140} left={28} />
          <Skeleton p={M.draw(T, CUES.Sides + 0.75, 0.7)} w={190} h={11} top={162} left={28} />
        </div>

        {/* MAHNWESEN card */}
        <div style={{
          position: 'absolute', left: 566, top: 78, width: 468, height: 760, borderRadius: 30, background: '#fcfbfe',
          boxShadow: '0 6px 20px rgba(60,45,120,0.05), 0 36px 84px rgba(60,45,120,0.08)',
          opacity: clamp(pCard, 0, 1), transform: `scale(${0.95 + pCard * 0.05})`, transformOrigin: '50% 45%',
        }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 52, textAlign: 'center',
            font: `700 36px/1 ${SANS}`, letterSpacing: 4.5, color: INK,
            opacity: clamp(pTitle, 0, 1), transform: `translateY(${(1 - pTitle) * 10}px)`,
          }}>MAHNWESEN</div>

          <svg width="468" height="760" style={{ position: 'absolute', left: 0, top: 0 }}>
            <line x1="73" y1="226" x2="73" y2="682" stroke={accent} strokeWidth="2.2" opacity="0.55"
              pathLength="1" strokeDasharray="1" strokeDashoffset={1 - railP} />
          </svg>

          {steps.map((s, i) => (
            <StepRow key={s.label} T={T} start={CUES.Steps + 0.55 + i * 0.2} y={rowY[i]}
              Icon={s.Icon} label={s.label} accent={accent} two={s.two} />
          ))}
        </div>

        {/* NÄCHSTER SCHRITT */}
        <div style={{
          position: 'absolute', left: 1106, top: 205, width: 388, height: 206, borderRadius: 24, background: '#fff',
          boxShadow: '0 4px 14px rgba(60,45,120,0.045), 0 24px 54px rgba(60,45,120,0.07)',
          opacity: clamp(pNext, 0, 1), transform: `translateX(${(1 - pNext) * 34}px) scale(${0.97 + pNext * 0.03})`,
        }}>
          <div style={{ position: 'absolute', left: 32, top: 32, font: `600 15px/1 ${SANS}`, letterSpacing: 2.6, color: GREY }}>NÄCHSTER SCHRITT</div>
          <Dots left={330} top={36} />
          <div style={{ position: 'absolute', left: 30, top: 78, display: 'flex', alignItems: 'center', gap: 22 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 18, background: '#f1eefc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${0.78 + M.pop(T, CUES.Sides + 0.5, 0.6) * 0.22})`,
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3.4h7.4L18 8v12.6H6z" />
                <path d="M9.4 12.4h5.2M9.4 16h5.2" />
              </svg>
            </div>
            <div style={{ font: `500 30px/1 ${SANS}`, color: INK, letterSpacing: -0.6 }}>Mahnbescheid</div>
          </div>
          <Skeleton p={M.draw(T, CUES.Sides + 0.8, 0.7)} w={232} h={11} top={162} left={124} />
          <Skeleton p={M.draw(T, CUES.Sides + 0.95, 0.7)} w={168} h={11} top={184} left={124} />
        </div>

        {/* FORTSCHRITT */}
        <div style={{
          position: 'absolute', left: 1106, top: 458, width: 372, height: 236, borderRadius: 24, background: '#fff',
          boxShadow: '0 4px 14px rgba(60,45,120,0.045), 0 24px 54px rgba(60,45,120,0.07)',
          opacity: clamp(pProg, 0, 1), transform: `translateX(${(1 - pProg) * 34}px) scale(${0.97 + pProg * 0.03})`,
        }}>
          <div style={{ position: 'absolute', left: 32, top: 32, font: `600 15px/1 ${SANS}`, letterSpacing: 2.6, color: GREY }}>FORTSCHRITT</div>
          <Dots left={310} top={36} />
          <Ring T={T} start={CUES.Progress} accent={accent} pct={pct} />
          <Skeleton p={M.draw(T, CUES.Progress + 0.3, 0.6)} w={168} h={11} top={82} left={188} />
          <Skeleton p={M.draw(T, CUES.Progress + 0.45, 0.6)} w={140} h={11} top={112} left={188} />
          <Skeleton p={M.draw(T, CUES.Progress + 0.6, 0.6)} w={168} h={11} top={142} left={188} />
        </div>
      </div>
    </div>
  );
}

window.MahnwesenVideo = function MahnwesenVideo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <CompositionStage width={1600} height={900} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#fbfaff">
        <Piece tweaks={t} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Look" />
        <TweakColor label="Accent" value={t.accent} options={['#7C5CF0', '#4F6BF0', '#0E9F8A', '#E0714C']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Glow effects" value={t.effects !== false} onChange={(v) => setTweak('effects', v)} />
      </TweaksPanel>
    </div>
  );
};
