// claims-scene.jsx — animated reveal of the Forderungseinzug dashboard graphic.
const { useComposition, CompositionStage, Easing, animate, clamp,
        useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor } = window;

/* ---------- three motion helpers (all easing lives here) ---------- */
const M = {
  enter: (T, start, dur = 0.65) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeOutCubic })(T),
  draw:  (T, start, dur = 0.7)  => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeInOutQuad })(T),
  pop:   (T, start, dur = 0.7)  => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeOutBack })(T),
};

const INK = '#17161c';
const GREY = '#6f6e7e';
const SANS = '"Helvetica Neue", Helvetica, "Segoe UI", Arial, sans-serif';

const group = (n) => {
  const s = String(Math.round(n));
  let out = '';
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += "'";
    out += s[i];
  }
  return out;
};

/* ---------- icon glyphs ---------- */
const IconBars = ({ s = 20, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="10" width="4" height="10" rx="1.2" fill={c} />
    <rect x="10" y="5" width="4" height="15" rx="1.2" fill={c} />
    <rect x="16" y="13" width="4" height="7" rx="1.2" fill={c} />
  </svg>
);
const IconPerson = ({ s = 20, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={c} />
    <path d="M4.5 20c0-4.1 3.4-6.2 7.5-6.2S19.5 15.9 19.5 20" fill={c} />
  </svg>
);
const IconMail = ({ s = 18, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="5" width="19" height="14" rx="2.6" />
    <path d="M3.5 7.5 12 13.4l8.5-5.9" />
  </svg>
);
const IconPhone = ({ s = 18, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.6 3.5H4.8A1.8 1.8 0 0 0 3 5.4c0 8.4 7.2 15.6 15.6 15.6a1.8 1.8 0 0 0 1.9-1.8v-2.8l-4.3-1.5-2 2a15 15 0 0 1-5.1-5.1l2-2z" />
  </svg>
);
const IconDoc = ({ s = 18, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2.6" width="14" height="18.8" rx="2.6" />
    <path d="M8.8 8h6.4M8.8 12h6.4M8.8 16h4" />
  </svg>
);

/* ---------- small pieces ---------- */
function StepRow({ p, x, y, w, Icon, label, accent }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: 52,
      borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', gap: 12,
      paddingLeft: 10, boxSizing: 'border-box',
      boxShadow: '0 2px 6px rgba(60,45,120,0.06), 0 8px 22px rgba(60,45,120,0.05)',
      opacity: clamp(p, 0, 1),
      transform: `translateX(${(1 - p) * -16}px) scale(${0.97 + p * 0.03})`,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9, background: '#f2effd',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
      }}><Icon c={accent} /></div>
      <div style={{ font: `500 15.5px/1 ${SANS}`, color: '#3d3c48', letterSpacing: 0.1 }}>{label}</div>
    </div>
  );
}

function Channel({ T, x, label, Icon, startPanel, startRows, dotStart, lineStart, accent, mirror }) {
  const railX = mirror ? 245 : 25;
  const rowX = mirror ? 15 : 52;
  const pPanel = M.enter(T, startPanel, 0.75);
  const rows = [
    { Icon: IconMail, label: '1. Mahnung' },
    { Icon: IconPhone, label: 'Kontakt' },
    { Icon: IconDoc, label: 'Inkasso' },
  ];
  const pLine = M.draw(T, lineStart, 0.75);
  return (
    <div style={{
      position: 'absolute', left: x, top: 148, width: 270, height: 362,
      borderRadius: 20, background: '#f6f5fb',
      opacity: clamp(pPanel, 0, 1),
      transform: `translateY(${(1 - pPanel) * 24}px) scale(${0.96 + pPanel * 0.04})`,
      transformOrigin: '50% 20%',
    }}>
      <div style={{ position: 'absolute', left: 24, top: 26, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13, background: '#e9e5fa',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${0.8 + M.pop(T, startPanel + 0.15, 0.6) * 0.2})`,
        }}><Icon s={24} c={accent} /></div>
        <div style={{ font: `700 23px/1 ${SANS}`, color: INK, letterSpacing: -0.2 }}>{label}</div>
      </div>
      {rows.map((r, i) => (
        <StepRow key={r.label} p={M.pop(T, startRows + i * 0.16, 0.65)}
          x={rowX} y={110 + i * 89} w={203} Icon={r.Icon} label={r.label} accent={accent} />
      ))}
      <svg width="270" height="362" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <line x1={railX} y1="136" x2={railX} y2="314" stroke={accent} strokeWidth="2.4"
          pathLength="1" strokeDasharray="1" strokeDashoffset={1 - pLine} opacity="0.85" />
        {[136, 225, 314].map((cy, i) => {
          const d = M.pop(T, dotStart + i * 0.13, 0.5);
          return <circle key={cy} cx={railX} cy={cy} r={8 * clamp(d, 0, 1)} fill={accent} />;
        })}
      </svg>
    </div>
  );
}

function StatCard({ T, top, tag, Icon, target, heights, start, accent, glow }) {
  const p = M.enter(T, start, 0.8);
  const n = Math.round(animate({ from: 0, to: target, start: start + 0.5, end: start + 1.8, ease: Easing.easeOutQuart })(T));
  const max = Math.max.apply(null, heights);
  return (
    <div style={{
      position: 'absolute', left: 1028, top, width: 330, height: 238,
      borderRadius: 22, background: '#fff',
      boxShadow: '0 4px 14px rgba(60,45,120,0.05), 0 22px 50px rgba(60,45,120,0.07)',
      opacity: clamp(p, 0, 1),
      transform: `translateX(${(1 - p) * 46}px) scale(${0.96 + p * 0.04})`,
    }}>
      <div style={{ position: 'absolute', left: 26, top: 24, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 15, background: '#eeeafb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${0.82 + M.pop(T, start + 0.2, 0.6) * 0.18})`,
        }}><Icon s={26} c={accent} /></div>
        <div>
          <div style={{ font: `500 18px/1 ${SANS}`, color: GREY, marginBottom: 10 }}>{tag}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ font: `800 46px/0.95 ${SANS}`, color: INK, letterSpacing: -1.4, fontVariantNumeric: 'tabular-nums' }}>{n}</div>
            <div style={{ font: `500 26px/1 ${SANS}`, color: GREY }}>Fälle</div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 28, bottom: 24, display: 'flex', alignItems: 'flex-end', gap: 10, height: max }}>
        {heights.map((h, i) => {
          const g = M.pop(T, start + 0.6 + i * 0.07, 0.6);
          const hi = i === 6;
          const pulse = hi && glow ? 1 + 0.04 * Math.sin(T * 2.4) : 1;
          return (
            <div key={i} style={{
              width: 21, height: Math.max(3, h * clamp(g, 0, 1) * pulse), borderRadius: 6,
              background: hi ? accent : '#e9e5fa',
              boxShadow: hi && glow ? `0 0 18px ${accent}55` : 'none',
            }} />
          );
        })}
      </div>
    </div>
  );
}

/* ---------- the piece ---------- */
function Piece({ tweaks }) {
  const { T, CUES } = useComposition();
  const accent = tweaks.accent || '#7C5CF0';
  const glow = tweaks.effects !== false;

  const pCard = M.pop(T, 0.15, 1.0);
  const pLabel = M.enter(T, 0.75, 0.6);
  const amount = animate({ from: 0, to: 12480, start: 0.95, end: 3.0, ease: Easing.easeOutQuart })(T);
  const pAmt = M.enter(T, 0.9, 0.5);

  const pFlow = M.draw(T, CUES.Flow + 1.2, 1.1);
  const pRight1 = M.draw(T, CUES.Stats + 0.4, 0.7);
  const pRight2 = M.draw(T, CUES.Stats + 1.3, 0.7);

  const pBox = M.pop(T, CUES.Payment + 0.1, 0.85);
  const pCheck = M.pop(T, CUES.Payment + 0.5, 0.7);
  const pTick = M.draw(T, CUES.Payment + 0.75, 0.4);
  const pSpark = M.enter(T, CUES.Payment + 0.85, 0.7);
  const pPayText = M.enter(T, CUES.Payment + 0.7, 0.6);

  // pulses travelling down each channel line during Flow
  const travel = (offset) => {
    const q = animate({ from: 0, to: 1, start: CUES.Flow + 2.35 + offset, end: CUES.Flow + 3.1 + offset, ease: Easing.easeInOutSine })(T);
    return { y: 462 + q * 74, on: q > 0.001 && q < 0.999 && pFlow > 0.995 };
  };
  const camZ = animate({ from: 1.045, to: 1.0, start: 0, end: 2.2, ease: Easing.easeOutCubic })(T)
    + animate({ from: 0, to: 0.035, start: 3.0, end: 18.8, ease: Easing.linear })(T);
  const camX = animate({ from: 0, to: -10, start: 3.0, end: 18.8, ease: Easing.linear })(T);

  const dot = (cx, cy, at, r = 8) => {
    const d = M.pop(T, at, 0.5);
    return <circle cx={cx} cy={cy} r={r * clamp(d, 0, 1)} fill={accent} />;
  };

  return (
    <div data-screen-label={`t=${T.toFixed(0)}s`} style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: 'radial-gradient(64% 70% at 50% 44%, #F1ECFB 0%, #F8F4FD 44%, #FFFFFF 80%)',
      fontFamily: SANS,
    }}>
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(${camX}px) scale(${camZ})`, transformOrigin: '46% 50%' }}>

        {/* connectors to the stat cards */}
        <svg width="1424" height="900" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
          <path d="M934 344 C 976 344 984 264 1020 264" fill="none" stroke={accent} strokeWidth="2.2" opacity="0.55"
            pathLength="1" strokeDasharray="1" strokeDashoffset={1 - pRight1} />
          <path d="M934 512 C 976 512 984 591 1020 591" fill="none" stroke={accent} strokeWidth="2.2" opacity="0.55"
            pathLength="1" strokeDasharray="1" strokeDashoffset={1 - pRight2} />
          {dot(1020, 264, CUES.Stats + 1.0)}
          {dot(1020, 591, CUES.Stats + 1.9)}
        </svg>

        {/* main card */}
        <div style={{
          position: 'absolute', left: 318, top: 80, width: 616, height: 720,
          borderRadius: 30, background: '#fff',
          boxShadow: '0 6px 18px rgba(60,45,120,0.05), 0 34px 80px rgba(60,45,120,0.09)',
          opacity: clamp(pCard, 0, 1),
          transform: `scale(${0.94 + pCard * 0.06})`, transformOrigin: '50% 46%',
        }}>
          <div style={{
            position: 'absolute', top: 33, left: 0, right: 0, textAlign: 'center',
            font: `600 13.5px/1 ${SANS}`, letterSpacing: 3.4, color: accent,
            opacity: clamp(pLabel, 0, 1), transform: `translateY(${(1 - pLabel) * 8}px)`,
          }}>FORDERUNGSEINZUG</div>
          <div style={{
            position: 'absolute', top: 62, left: 0, right: 0, textAlign: 'center',
            font: `800 58px/1.2 ${SANS}`, letterSpacing: -2, color: INK,
            fontVariantNumeric: 'tabular-nums',
            opacity: clamp(pAmt, 0, 1), transform: `scale(${0.94 + clamp(pAmt, 0, 1) * 0.06})`,
          }}>CHF {group(amount)}</div>

          <Channel T={T} x={23} label="B2B" Icon={IconBars} accent={accent}
            startPanel={CUES.Channels} startRows={CUES.Channels + 0.5}
            dotStart={CUES.Flow + 0.1} lineStart={CUES.Flow + 0.55} />
          <Channel T={T} x={323} label="B2C" Icon={IconPerson} accent={accent}
            startPanel={CUES.Channels + 0.28} startRows={CUES.Channels + 0.78}
            dotStart={CUES.Flow + 0.22} lineStart={CUES.Flow + 0.7} mirror={true} />

          {/* converging flow into the payment banner */}
          <svg width="616" height="720" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
            <g stroke={accent} strokeWidth="2.4" fill="none" opacity="0.85"
              pathLength="1" strokeDasharray="1" strokeDashoffset={1 - pFlow}>
              <path d="M48 462 V536 Q48 546 58 546 H298 Q308 546 308 556 V566" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - pFlow} />
              <path d="M568 462 V536 Q568 546 558 546 H318 Q308 546 308 556" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - pFlow} />
            </g>
            {dot(308, 566, CUES.Flow + 2.4)}
            {[0, 0.35].map((o, i) => {
              const t = travel(o);
              const x = i === 0 ? 48 : 568;
              return t.on ? (
                <g key={i}>
                  <circle cx={x} cy={t.y} r="13" fill={accent} opacity={glow ? 0.16 : 0} />
                  <circle cx={x} cy={t.y} r="5.5" fill={accent} />
                </g>
              ) : null;
            })}
          </svg>

          {/* payment banner */}
          <div style={{
            position: 'absolute', left: 60, top: 580, width: 492, height: 102,
            borderRadius: 18, background: '#e7f4ec', display: 'flex', alignItems: 'center', gap: 22,
            paddingLeft: 152, boxSizing: 'border-box',
            opacity: clamp(pBox, 0, 1),
            transform: `scale(${0.93 + clamp(pBox, 0, 1) * 0.07})`, transformOrigin: '50% 50%',
            boxShadow: glow ? `0 0 40px rgba(74,154,104,${0.20 * clamp(pSpark, 0, 1)})` : 'none',
          }}>
            <div style={{
              position: 'absolute', left: 84, top: 25,
              width: 52, height: 52, borderRadius: 26, background: '#4c9a6a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${0.6 + clamp(pCheck, 0, 1) * 0.4})`,
            }}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M8.5 15.6 13 20.1 21.6 10.9" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  pathLength="1" strokeDasharray="1" strokeDashoffset={1 - pTick} />
              </svg>
            </div>
            <svg width="160" height="120" style={{ position: 'absolute', left: 30, top: -9, overflow: 'visible' }}>
              {[-145, -110, -75, -40, 75, 110, 145, 180].map((a, i) => {
                const rad = (a * Math.PI) / 180;
                const s = clamp(pSpark, 0, 1);
                const burst = 1 - Math.abs(0.5 - s) * 2;
                const r0 = 36 + s * 8, r1 = r0 + 9;
                const cx = 80, cy = 60;
                return (
                  <line key={i}
                    x1={cx + Math.cos(rad) * r0} y1={cy + Math.sin(rad) * r0}
                    x2={cx + Math.cos(rad) * r1} y2={cy + Math.sin(rad) * r1}
                    stroke="#4c9a6a" strokeWidth="2.6" strokeLinecap="round"
                    opacity={(0.35 + burst * 0.65) * (s > 0 ? 1 : 0)} />
                );
              })}
            </svg>
            <div style={{
              font: `600 23px/1 ${SANS}`, color: '#26302a', letterSpacing: -0.2,
              opacity: clamp(pPayText, 0, 1), transform: `translateX(${(1 - pPayText) * -10}px)`,
            }}>Zahlung eingegangen</div>
          </div>
        </div>

        <StatCard T={T} top={172} tag="B2C" Icon={IconPerson} target={126}
          heights={[22, 34, 48, 30, 44, 52, 78, 46, 40]} start={CUES.Stats + 0.15} accent={accent} glow={glow} />
        <StatCard T={T} top={490} tag="B2B" Icon={IconBars} target={48}
          heights={[18, 42, 54, 30, 50, 44, 84, 58, 44]} start={CUES.Stats + 1.05} accent={accent} glow={glow} />
      </div>
    </div>
  );
}

window.ClaimsVideo = function ClaimsVideo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <CompositionStage width={1424} height={900} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#ffffff">
        <Piece tweaks={t} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Playback" />
        <TweakToggle label="Motion editor" value={t.motionEditor !== false} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakSection label="Look" />
        <TweakColor label="Accent" value={t.accent} options={['#7C5CF0', '#4F6BF0', '#0E9F8A', '#E0714C']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Glow & pulse effects" value={t.effects !== false} onChange={(v) => setTweak('effects', v)} />
      </TweaksPanel>
    </div>
  );
};
