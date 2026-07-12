import { useState } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, phaseForDay, activePhase, luneNav, GOALS } from '../store/luneStore';
import { getSession } from '../data/poses';
import { WarmAurora, Glass, CycleRingV3 } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { MuseAvatar } from '../components/MuseAvatar';
import { ExoPose } from '../components/ExoPose';
import { LV3TabBar } from '../components/LV3TabBar';
import { AddActivitySheet } from '../components/AddActivitySheet';
import { todayLabel } from '../utils/format';
import { isTrainingDay, restMessage } from '../data/schedule';
import { computeNutritionTarget } from '../utils/nutrition';

/* ════════════════════════════════════════════════════════
   DASHBOARD · today
   ════════════════════════════════════════════════════════ */
export function Dashboard() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const [actSheet, setActSheet] = useState(false);
  const phaseKey = activePhase(s);
  const session = getSession(s.workoutEnv || 'home', phaseKey);
  const training = isTrainingDay(phaseKey, s.goal || 'global');
  const goal = computeNutritionTarget(s, s.goal || 'global', GOALS[s.goal] || GOALS.global);
  const mealTotals = (s.mealLog || []).reduce((a, x) => ({ p: a.p + (x.p || 0), c: a.c + (x.c || 0), f: a.f + (x.f || 0) }), { p: 0, c: 0, f: 0 });
  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />

      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Top row */}
        <div style={{ padding: '14px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 6, position: 'relative' }}>
          <div>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: LV3.ink3 }}>{todayLabel()}</div>
            <div className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', marginTop: 4, lineHeight: 1 }}>
              Bonjour, <em style={{ color: m.palette.accent }}>{s.name || 'toi'}</em>
            </div>
          </div>
          <MuseAvatar muse={muse} size={44} ring={true} />
        </div>

        {/* Hero glass card — séance du jour, ou repos programmé */}
        <div style={{ padding: '18px 16px 12px' }}>
          {training ? (
            <Glass style={{ padding: '16px 16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
                <div style={{ width: 104, flexShrink: 0 }}>
                  <ExoPose exoId={session.exos[0]} aspectRatio="3/4" round={18} showArrow={true} showCredit={false} />
                </div>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                  <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: m.palette.accent }}>SÉANCE DU JOUR</div>
                  <div className="lv3-serif" style={{ fontSize: 22, fontStyle: 'italic', marginTop: 6, lineHeight: 1.05, color: LV3.ink }}>
                    {session.title}
                  </div>
                  <div className="lv3-mono" style={{ fontSize: 10.5, color: LV3.ink2, marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span>{session.exos.length} exos</span>
                    <span style={{ opacity: .4 }}>·</span>
                    <span style={{ color: m.palette.accent }}>{session.phaseSub}</span>
                  </div>
                  <div style={{ flex: 1 }} />
                  <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 8, letterSpacing: '.08em' }}>
                    Adaptée à ta phase · {m.phaseLabel}
                  </div>
                </div>
              </div>
              <button onClick={() => luneNav('seance')} className="lv3-fab" style={{
                marginTop: 16, width: '100%', padding: '14px 18px',
                borderRadius: 99, border: 'none',
                background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
                color: '#231016', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '.08em', cursor: 'pointer',
              }}>
                Commencer ✨
              </button>
            </Glass>
          ) : (
            <Glass style={{ padding: '20px 18px' }}>
              <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: m.palette.accent }}>JOUR DE REPOS</div>
              <div className="lv3-serif" style={{ fontSize: 22, fontStyle: 'italic', marginTop: 8, lineHeight: 1.2, color: LV3.ink }}>
                Rien de prévu aujourd'hui.
              </div>
              <div style={{ fontSize: 13, color: LV3.ink2, marginTop: 8, lineHeight: 1.5 }}>{restMessage(phaseKey)}</div>
              <button onClick={() => luneNav('seance')} style={{
                marginTop: 16, width: '100%', padding: '13px 18px',
                borderRadius: 99, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontSize: 12.5,
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${LV3.glassLine}`, color: LV3.ink2,
              }}>
                S'entraîner quand même →
              </button>
            </Glass>
          )}
        </div>

        {/* Cycle pill, ou vibe fixe si pas de cycle suivi */}
        <div style={{ padding: '0 16px 12px' }}>
          <Glass tight style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
            {s.cycleMode === 'none' ? (
              <>
                <MuseAvatar muse={muse} size={64} ring />
                <div style={{ flex: 1 }}>
                  <div style={lv3Label}>Ta vibe · {m.phaseLabel}</div>
                  <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', marginTop: 4, color: LV3.ink }}>
                    {m.energy}.
                  </div>
                  <button onClick={() => luneNav('cycle')} className="lv3-mono" style={{ fontSize: 9.5, color: m.palette.accent, marginTop: 8, background: 'none', border: 'none', padding: 0, cursor: 'pointer', letterSpacing: '.06em' }}>Changer de muse ›</button>
                </div>
              </>
            ) : (
              <>
                <CycleRingV3 size={64} day={s.cycleDay} phase={activePhase(s)} />
                <div style={{ flex: 1 }}>
                  <div style={lv3Label}>Cycle · {m.phaseLabel}</div>
                  <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', marginTop: 4, color: LV3.ink }}>
                    {m.energy}.
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                    {Array.from({ length: 28 }).map((_, i) => {
                      const phase = phaseForDay(i + 1);
                      const cols = { mens: LV3.rose, fol: LV3.gold, ov: LV3.peach2, lut: LV3.sage };
                      const isToday = i === (s.cycleDay - 1);
                      return <div key={i} style={{ flex: 1, height: isToday ? 6 : 3, borderRadius: 2, background: cols[phase], opacity: isToday ? 1 : .35 }} />;
                    })}
                  </div>
                </div>
              </>
            )}
          </Glass>
        </div>

        {/* Macros — 3 glass tiles */}
        <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
          {[
            { l: 'Protéines', v: mealTotals.p, g: goal.p, c: m.palette.accent },
            { l: 'Glucides', v: mealTotals.c, g: goal.c, c: LV3.gold },
            { l: 'Lipides', v: mealTotals.f, g: goal.f, c: LV3.sage },
          ].map((macro, i) => {
            const pct = Math.min(1, macro.v / macro.g);
            return (
              <Glass tight key={i} style={{ flex: 1, padding: '14px 12px' }}>
                <div style={lv3Label}>{macro.l}</div>
                <div className="lv3-serif" style={{ fontSize: 24, fontStyle: 'italic', marginTop: 6, lineHeight: 1 }}>
                  {macro.v}<span style={{ fontSize: 11, color: LV3.ink3, marginLeft: 2 }}>/{macro.g}</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 99, marginTop: 10, overflow: 'hidden' }}>
                  <div style={{ width: `${pct * 100}%`, height: '100%', background: macro.c, borderRadius: 99 }} />
                </div>
              </Glass>
            );
          })}
        </div>

        {/* Quick actions */}
        <div style={{ padding: '4px 16px 12px' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Et aussi…</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { l: 'Programme', s: 'Ta semaine · les 4 phases', i: '▤', c: m.palette.accent, to: 'programme' },
              { l: 'Activité', s: 'Marche, yoga… hors programme', i: '⊳', c: LV3.sage, act: true },
              { l: 'Bilan', s: 'Ta semaine en un coup d\'œil', i: '◈', c: m.palette.accent, to: 'bilan' },
              { l: 'Journal', s: 'Mood · sommeil · symptômes', i: '✎', c: LV3.lavender, to: 'journal' },
              { l: 'Mesures', s: 'Taille · hanches · cuisses', i: '⊙', c: LV3.rose, to: 'mesures' },
              { l: 'Photo', s: 'Progression · avant/après', i: '◐', c: LV3.gold, to: 'photos' },
              { l: 'Courses', s: 'Liste du jour · auto', i: '◇', c: LV3.sage, to: 'shopping' },
            ].map((a, i) => (
              <Glass tight key={i} onClick={() => a.act ? setActSheet(true) : luneNav(a.to)} style={{ padding: '12px 12px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${a.c}22`, color: a.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{a.i}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: LV3.ink }}>{a.l}</div>
                </div>
                <div style={{ fontSize: 10, color: LV3.ink3, marginTop: 6 }}>{a.s}</div>
              </Glass>
            ))}
          </div>
        </div>

        {/* Mantra */}
        <div style={{ padding: '4px 16px 24px' }}>
          <Glass style={{ padding: '18px 18px', background: `linear-gradient(135deg, ${m.palette.accent}1A, ${LV3.rose}10)` }}>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: m.palette.accent }}>MANTRA · {m.phaseLabel.toUpperCase()}</div>
            <div className="lv3-serif" style={{ fontSize: 19, fontStyle: 'italic', marginTop: 8, lineHeight: 1.4 }}>
              « {m.quote} »
            </div>
          </Glass>
        </div>

        <div style={{ height: 90 }} />
      </div>

      <AddActivitySheet open={actSheet} onClose={() => setActSheet(false)} accent={m.palette.accent} />

      <LV3TabBar active="today" muse={muse} />
      <HomeBar />
    </div>
  );
}
