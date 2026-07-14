import { useState } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase as getActivePhase, PHASE_DEFAULT_DAY, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { asset } from '../utils/format';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';

export function Constellation() {
  const s = useLune();
  const noCycle = s.cycleMode === 'none';
  const myPhase = getActivePhase(s);
  const [active, setActive] = useState(PHASE_TO_MUSE[myPhase]);
  const m = MUSES[active];
  const selectedPhaseKey = m.phase;
  const isMyPhase = selectedPhaseKey === myPhase;
  const setAsMyPhase = () => {
    if (noCycle) LuneStore.set({ fixedMuse: active });
    else LuneStore.set({ cycleDay: PHASE_DEFAULT_DAY[selectedPhaseKey] });
  };
  return (
    <div style={lv3Phone(active)}>
      <WarmAurora muse={active} />
      <div className="lv3-grain"></div>

      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between' }}>
          <Glass tight pill onClick={() => luneBack() || luneNav('today')} style={{ padding: '8px 14px', cursor: 'pointer' }}>
            <span className="lv3-mono" style={{ fontSize: 10, color: LV3.ink2 }}>← Retour</span>
          </Glass>
          <Glass tight pill style={{ padding: '8px 14px' }}>
            <span className="lv3-mono" style={{ fontSize: 10, color: LV3.ink2 }}>{noCycle ? 'VIBE FIXE' : 'CYCLE · 28 J'}</span>
          </Glass>
        </div>

        {/* Title */}
        <div style={{ padding: '22px 22px 0' }}>
          <div className="lv3-mono" style={{ ...lv3Label, fontSize: 10, color: m.palette.accent }}>Constellation</div>
          <h1 className="lv3-serif" style={{ fontSize: 38, fontStyle: 'italic', margin: '6px 0 0', lineHeight: .95, color: LV3.ink }}>
            Quatre <em style={{ color: m.palette.accent }}>femmes</em>,<br />une seule.
          </h1>
        </div>

        {/* Circle */}
        <div style={{ position: 'relative', margin: '30px auto 8px', width: 300, height: 300 }}>
          {/* Connecting arcs */}
          <svg viewBox="0 0 300 300" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="150" cy="150" r="115" fill="none" stroke={LV3.glassLine} strokeWidth="1" strokeDasharray="3 5" />
          </svg>
          {[
            { k: 'mira', angle: -Math.PI / 2, daysLabel: 'J1–5' },
            { k: 'alya', angle: 0, daysLabel: 'J6–13' },
            { k: 'sora', angle: Math.PI / 2, daysLabel: 'J14–16' },
            { k: 'lina', angle: Math.PI, daysLabel: 'J17–28' },
          ].map(({ k, angle }) => {
            const M = MUSES[k];
            const isA = k === active;
            const r = 100;
            const cx = 150 + r * Math.cos(angle);
            const cy = 150 + r * Math.sin(angle);
            const size = isA ? 104 : 72;
            return (
              <div key={k} onClick={() => setActive(k)} role="button" tabIndex={0} aria-pressed={isA}
                aria-label={`Voir ${M.name} · ${M.phaseLabel}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(k); } }}
                style={{
                position: 'absolute', left: cx - size / 2, top: cy - size / 2,
                width: size, height: size,
                borderRadius: '50%', overflow: 'hidden',
                cursor: 'pointer', transition: 'all .5s cubic-bezier(.2,.7,.3,1)',
                border: isA ? `2px solid ${M.palette.accent}` : `1px solid ${LV3.glassLine}`,
                boxShadow: isA ? `0 0 28px ${M.palette.glow}, 0 12px 28px rgba(0,0,0,0.3)` : '0 4px 14px rgba(0,0,0,0.25)',
              }}>
                <img src={asset(M.head)} alt={M.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%', filter: isA ? 'none' : 'grayscale(40%) brightness(.85)' }} />
                {isA && <div className="lv3-ring-pulse" style={{ position: 'absolute', inset: -3, borderRadius: '50%', boxShadow: `inset 0 0 0 1px ${M.palette.accent}`, pointerEvents: 'none' }} />}
              </div>
            );
          })}
          {/* Center label */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', pointerEvents: 'none' }}>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: m.palette.accent }}>{m.phaseLabel.toUpperCase()}</div>
            <div className="lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', color: LV3.ink, marginTop: 4 }}>
              {m.name.slice(0, 1) + m.name.slice(1).toLowerCase()}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div style={{ padding: '14px 22px 16px', textAlign: 'center' }}>
          <Glass style={{ padding: '18px 22px', background: `linear-gradient(135deg, ${m.palette.accent}14, ${LV3.rose}08)` }}>
            <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', lineHeight: 1.4 }}>
              « {m.quote} »
            </div>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: m.palette.accent, marginTop: 12 }}>
              — {m.name}
            </div>
          </Glass>
        </div>

        {/* Set as my phase */}
        <div style={{ padding: '2px 22px 14px' }}>
          <button onClick={setAsMyPhase} disabled={isMyPhase} className={isMyPhase ? '' : 'lv3-fab'} style={{
            width: '100%', padding: '14px 18px', borderRadius: 99, border: isMyPhase ? `1px solid ${LV3.glassLine2}` : 'none',
            background: isMyPhase ? 'transparent' : `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
            color: isMyPhase ? LV3.ink3 : '#231016',
            fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 12.5, letterSpacing: '.06em',
            cursor: isMyPhase ? 'default' : 'pointer',
          }}>
            {isMyPhase
              ? (noCycle ? "✓ C'est ta muse actuelle" : `✓ C'est ta phase actuelle · J${s.cycleDay}`)
              : `Définir ${m.name.slice(0, 1) + m.name.slice(1).toLowerCase()} comme ma ${noCycle ? 'muse' : 'phase'}`}
          </button>
        </div>

        {/* Three guidance cards */}
        <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { l: 'Entraîne', body: m.train, i: '∿' },
            { l: 'Nourris', body: m.food, i: '◇' },
            { l: 'Ressens', body: m.feel, i: '✿' },
          ].map((row, i) => (
            <Glass tight key={i} style={{ padding: '14px 14px', display: 'flex', gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${m.palette.accent}1F`, color: m.palette.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{row.i}</div>
              <div style={{ flex: 1 }}>
                <div style={{ ...lv3Label, fontSize: 9, color: m.palette.accent }}>{row.l.toUpperCase()}</div>
                <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', color: LV3.ink, marginTop: 4, lineHeight: 1.4 }}>{row.body}</div>
              </div>
            </Glass>
          ))}
        </div>

        <div style={{ height: 100 }} />
      </div>

      <LV3TabBar active="cycle" muse={active} />
      <HomeBar />
    </div>
  );
}
