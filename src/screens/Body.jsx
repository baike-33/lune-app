import { useState } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { AddMeasurementSheet } from '../components/AddMeasurementSheet';
import { navBtnStyle } from '../utils/format';
import { kgToDisplay, cmToDisplay, weightUnitLabel, heightUnitLabel } from '../utils/units';

const METRIC_DEFS = [
  { k: 'weight', l: 'Poids', kind: 'weight' },
  { k: 'waist', l: 'Taille', kind: 'length' },
  { k: 'hips', l: 'Hanches', kind: 'length' },
  { k: 'bust', l: 'Poitrine', kind: 'length' },
  { k: 'thigh', l: 'Cuisse', kind: 'length' },
];

function Sparkline({ pts, c }) {
  if (pts.length < 2) {
    return <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, textAlign: 'center', paddingTop: 8 }}>Pas encore d'historique</div>;
  }
  const max = Math.max(...pts), min = Math.min(...pts);
  const range = max - min || 1;
  const w = 100, h = 28;
  const d = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={d} fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={w} cy={h - ((pts[pts.length - 1] - min) / range) * (h - 4) - 2} r="2.2" fill={c} />
    </svg>
  );
}

export function Body() {
  const st = useLune();
  const phase = activePhase(st);
  const muse = PHASE_TO_MUSE[phase];
  const m = MUSES[muse];
  const [sheetOpen, setSheetOpen] = useState(false);

  const entries = (st.measurements || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const colors = { weight: LV3.sage, waist: m.palette.accent, hips: LV3.peach, bust: LV3.lavender, thigh: LV3.gold };
  const toDisplay = (kind, v) => v == null ? v : (kind === 'weight' ? kgToDisplay(v, st.units) : cmToDisplay(v, st.units));

  const measures = METRIC_DEFS.map(meta => {
    const u = meta.kind === 'weight' ? weightUnitLabel(st.units) : heightUnitLabel(st.units);
    const pts = entries.map(e => e[meta.k]).filter(v => v != null).map(v => toDisplay(meta.kind, v));
    const latest = pts[pts.length - 1];
    const prev = pts.length > 1 ? pts[pts.length - 2] : null;
    const delta = prev != null ? +(latest - prev).toFixed(1) : null;
    return { ...meta, u, c: colors[meta.k], v: latest, delta, points: pts.slice(-12) };
  });

  // Mois de programme réel, depuis la date d'onboarding
  const monthsElapsed = st.onboardedAt
    ? Math.min(12, Math.max(1, Math.floor((Date.now() - new Date(st.onboardedAt + 'T00:00:00')) / (30 * 86400000)) + 1))
    : 1;
  const pct = Math.round((monthsElapsed / 12) * 100);

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />

      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => luneBack() || luneNav('moi')} aria-label="Retour" style={navBtnStyle()}>
            <span aria-hidden="true">←</span> <span className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.10em' }}>Moi</span>
          </button>
          <div style={{ textAlign: 'right' }}>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: LV3.ink3 }}>MOIS {monthsElapsed} / 12</div>
            <div className="lv3-serif" style={{ fontSize: 22, fontStyle: 'italic', marginTop: 2, lineHeight: 1 }}>
              Ton <em style={{ color: m.palette.accent }}>évolution</em>
            </div>
          </div>
        </div>

        {/* Photos link card (vraies photos sur la page dédiée) */}
        <div style={{ padding: '18px 16px 12px' }}>
          <Glass onClick={() => luneNav('photos')} style={{ padding: '16px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, background: `linear-gradient(135deg, ${LV3.gold}18, ${m.palette.accent}08)` }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${LV3.gold}26`, color: LV3.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>◐</div>
            <div style={{ flex: 1 }}>
              <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: LV3.gold }}>PHOTOS DE PROGRESSION</div>
              <div className="lv3-serif" style={{ fontSize: 19, fontStyle: 'italic', marginTop: 3, lineHeight: 1.1 }}>
                {(st.photos || []).length > 0 ? `${(st.photos || []).length} clichés · avant/après` : 'Ajoute ta première photo'}
              </div>
              <div style={{ fontSize: 11, color: LV3.ink3, marginTop: 4 }}>Le miroir le plus honnête de ta transformation</div>
            </div>
            <span className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', color: m.palette.accent }}>→</span>
          </Glass>
        </div>

        {/* Add measurement CTA */}
        <div style={{ padding: '0 16px 12px' }}>
          <button onClick={() => setSheetOpen(true)} className="lv3-fab" style={{
            width: '100%', padding: '14px 18px', borderRadius: 99, border: 'none',
            background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
            color: '#231016', fontWeight: 600, fontSize: 13, letterSpacing: '.06em', cursor: 'pointer',
            fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Ajouter une mesure
          </button>
        </div>

        {/* Règle d'or — le poids est trompeur hors phase folliculaire */}
        {st.cycleMode !== 'none' && (
          <div style={{ padding: '0 16px 12px' }}>
            <Glass tight style={{ padding: '14px 16px', background: `linear-gradient(135deg, ${LV3.gold}14, ${m.palette.accent}08)`, borderLeft: `2px solid ${LV3.gold}` }}>
              <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.14em', color: LV3.gold, marginBottom: 4 }}>RÈGLE D'OR</div>
              <div style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.55 }}>
                {phase === 'fol'
                  ? "Tu es en phase folliculaire — c'est le meilleur moment du cycle pour te peser, le poids y est le plus représentatif."
                  : "Le poids varie de 0,5 à 2 kg selon le cycle (rétention d'eau en lutéale). Pour un chiffre fiable, pèse-toi surtout en phase folliculaire — le tour de taille compte plus que la balance le reste du temps."}
              </div>
            </Glass>
          </div>
        )}

        {/* Measurements grid */}
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Mesures récentes</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {measures.map((meas, i) => (
              <Glass tight key={i} style={{ padding: '14px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: LV3.ink3 }}>{meas.l}</span>
                  {meas.delta != null && (
                    <span className="lv3-mono" style={{ fontSize: 10, color: meas.c }}>{meas.delta > 0 ? '+' : ''}{meas.delta} {meas.u}</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                  <span className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', lineHeight: 1 }}>{meas.v != null ? meas.v : '—'}</span>
                  {meas.v != null && <span className="lv3-mono" style={{ fontSize: 11, color: LV3.ink3 }}>{meas.u}</span>}
                </div>
                <div style={{ marginTop: 10, height: 28 }}>
                  <Sparkline pts={meas.points} c={meas.c} />
                </div>
              </Glass>
            ))}
          </div>
        </div>

        {/* 12-month timeline */}
        <div style={{ padding: '4px 16px 16px' }}>
          <Glass tight style={{ padding: '14px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span style={{ ...lv3Label, color: LV3.ink3 }}>Programme · 12 mois</span>
              <span className="lv3-mono" style={{ fontSize: 10, color: m.palette.accent }}>{pct}% · mois {monthsElapsed}</span>
            </div>
            <div style={{ position: 'relative', height: 36, marginTop: 6 }}>
              {/* Phases bg */}
              <div style={{ position: 'absolute', inset: '10px 0 18px', display: 'flex', gap: 2 }}>
                {[
                  { f: 3, c: LV3.lavender, l: 'Fondation' },
                  { f: 3, c: LV3.gold, l: 'Construction' },
                  { f: 3, c: m.palette.accent, l: 'Sculpture' },
                  { f: 3, c: LV3.sage, l: 'Élégance' },
                ].map((p, i) => (
                  <div key={i} style={{ flex: p.f, background: `${p.c}33`, borderRadius: 4 }} />
                ))}
              </div>
              {/* Now pointer */}
              <div style={{ position: 'absolute', top: 0, bottom: 18, left: `${((monthsElapsed - 0.5) / 12) * 100}%`, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span className="lv3-mono" style={{ fontSize: 8.5, color: m.palette.accent, letterSpacing: '.10em' }}>M{monthsElapsed}</span>
                <div style={{ width: 2, flex: 1, background: m.palette.accent }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.palette.accent, boxShadow: `0 0 8px ${m.palette.glow}` }} />
              </div>
              {/* Labels */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex' }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="lv3-mono" style={{ flex: 1, textAlign: 'center', fontSize: 8, color: i === monthsElapsed - 1 ? m.palette.accent : LV3.ink3 }}>M{i + 1}</span>
                ))}
              </div>
            </div>
          </Glass>
        </div>

        <div style={{ height: 100 }} />
      </div>

      <AddMeasurementSheet open={sheetOpen} onClose={() => setSheetOpen(false)} accent={m.palette.accent} />

      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
