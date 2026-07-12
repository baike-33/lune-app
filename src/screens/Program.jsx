import { useState } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { PHASES } from '../data/phases';
import { useLune, LuneStore, phaseForDay, activePhase, luneNav, luneBack, GOALS } from '../store/luneStore';
import { getSession, EXO_POSES, getExo } from '../data/poses';
import { GOAL_TRAINING_NOTES } from '../data/goalNotes';
import { isTrainingDay, trainingWeekdaysFor } from '../data/schedule';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { MuseAvatar } from '../components/MuseAvatar';
import { ExoThumb } from '../components/ExoPose';
import { navBtnStyle } from '../utils/format';

const DAY_LETTERS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const PHASE_ORDER = ['mens', 'fol', 'ov', 'lut'];

export function Program() {
  const s = useLune();
  const todayPhase = activePhase(s);
  const muse = PHASE_TO_MUSE[todayPhase];
  const m = MUSES[muse];
  const env = s.workoutEnv || 'home';
  const goal = s.goal || 'global';
  const noCycle = s.cycleMode === 'none';
  const [selectedPhase, setSelectedPhase] = useState(todayPhase);

  const week = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    // Sans cycle : la phase (donc la muse) reste fixe tous les jours de la semaine
    const ph = noCycle ? todayPhase : phaseForDay(((s.cycleDay - 1 + i) % s.cycleLength + s.cycleLength) % s.cycleLength + 1);
    return {
      i, phase: ph, letter: DAY_LETTERS[date.getDay()], dayNum: date.getDate(),
      training: isTrainingDay(ph, goal, date, s.preferredTrainingDays || []), session: getSession(env, ph, s.injuries || []),
    };
  });
  const weeklyCount = trainingWeekdaysFor(todayPhase, goal, s.preferredTrainingDays || []).length;

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />
      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => luneBack() || luneNav('today')} aria-label="Retour" style={navBtnStyle()}>
            <span aria-hidden="true">←</span> <span className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.10em' }}>Aujourd'hui</span>
          </button>
          {/* Toggle Maison / Salle */}
          <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine}` }}>
            {['home', 'gym'].map(e => {
              const isA = e === env;
              return (
                <button key={e} onClick={() => LuneStore.set({ workoutEnv: e })} aria-pressed={isA} style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 99, border: 'none', cursor: 'pointer',
                  background: isA ? `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})` : 'transparent',
                  color: isA ? '#231016' : LV3.ink2, fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', fontWeight: 600,
                }}>
                  <span aria-hidden="true">{getSession(e, todayPhase, s.injuries || []).icon}</span>{getSession(e, todayPhase, s.injuries || []).label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: m.palette.accent }}>TON PROGRAMME</div>
          <h1 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Adapté à ton <em style={{ color: m.palette.accent }}>cycle</em>
          </h1>
          <button onClick={() => luneNav('settings')} style={{
            marginTop: 10, padding: '6px 12px', borderRadius: 99, border: `1px solid ${LV3.glassLine}`, background: 'rgba(255,255,255,0.04)',
            color: LV3.ink2, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, cursor: 'pointer',
          }}>Objectif · {GOALS[goal].label} ›</button>
        </div>

        {/* Cette semaine */}
        <div style={{ padding: '20px 0 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '0 18px 10px', paddingLeft: 4 }}>
            <span style={lv3Label}>Cette semaine</span>
            <span className="lv3-mono" style={{ fontSize: 9.5, color: m.palette.accent }}>{weeklyCount}× cette phase</span>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 18px 4px' }}>
            {week.map(d => {
              const dm = MUSES[PHASE_TO_MUSE[d.phase]];
              const isToday = d.i === 0;
              return (
                <Glass tight key={d.i} onClick={() => setSelectedPhase(d.phase)} style={{
                  minWidth: 84, padding: '12px 10px', textAlign: 'center', flexShrink: 0,
                  opacity: d.training ? 1 : .6,
                  outline: isToday ? `1px solid ${dm.palette.accent}` : 'none',
                }}>
                  <div className="lv3-mono" style={{ fontSize: 9, color: isToday ? dm.palette.accent : LV3.ink3, letterSpacing: '.08em' }}>{d.letter} {d.dayNum}</div>
                  {d.training ? (
                    <>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: dm.palette.accent, margin: '8px auto' }} />
                      <div className="lv3-serif" style={{ fontSize: 13, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.2 }}>{d.session.title.split(' ')[0]}</div>
                      <div className="lv3-mono" style={{ fontSize: 8.5, color: LV3.ink3, marginTop: 4 }}>{d.session.exos.length} exos</div>
                    </>
                  ) : (
                    <>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', border: `1px solid ${LV3.ink3}`, margin: '8px auto' }} />
                      <div className="lv3-serif" style={{ fontSize: 13, fontStyle: 'italic', color: LV3.ink3, lineHeight: 1.2 }}>Repos</div>
                      <div className="lv3-mono" style={{ fontSize: 8.5, color: LV3.ink3, marginTop: 4, opacity: 0 }}>·</div>
                    </>
                  )}
                </Glass>
              );
            })}
          </div>
        </div>

        {/* Les 4 phases */}
        <div style={{ padding: '22px 16px 8px' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, margin: '0 4px 10px' }}>Les 4 phases de ton programme</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PHASE_ORDER.map(ph => {
              const pm = MUSES[PHASE_TO_MUSE[ph]];
              const session = getSession(env, ph, s.injuries || []);
              const isOpen = selectedPhase === ph;
              const goalNote = GOAL_TRAINING_NOTES[goal]?.[ph];
              return (
                <Glass key={ph} style={{ padding: 0, overflow: 'hidden' }}>
                  <div
                    onClick={() => setSelectedPhase(isOpen ? null : ph)}
                    role="button" tabIndex={0} aria-expanded={isOpen}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPhase(isOpen ? null : ph); } }}
                    style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
                  >
                    <MuseAvatar muse={PHASE_TO_MUSE[ph]} size={44} ring={isOpen} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.14em', color: pm.palette.accent }}>{PHASES[ph].label.toUpperCase()} · {PHASES[ph].days} · {trainingWeekdaysFor(ph, goal, s.preferredTrainingDays || []).length}×/sem</div>
                      <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', color: LV3.ink, marginTop: 3, lineHeight: 1.1 }}>{session.title}</div>
                    </div>
                    <span aria-hidden="true" style={{ color: LV3.ink3, fontSize: 14, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>⌄</span>
                  </div>

                  {isOpen && (
                    <div style={{ padding: '0 16px 16px' }}>
                      <div style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.5, marginBottom: 10 }}>{session.note}</div>
                      {session.adapted && (
                        <div style={{ padding: '9px 12px', borderRadius: 12, background: `${LV3.sage}14`, borderLeft: `2px solid ${LV3.sage}`, marginBottom: 12 }}>
                          <div style={{ fontSize: 11.5, color: LV3.ink2, lineHeight: 1.5 }}>Séance adaptée à tes limitations physiques (Réglages › Entraînement).</div>
                        </div>
                      )}
                      {goalNote && (
                        <div style={{ padding: '10px 12px', borderRadius: 12, background: `${pm.palette.accent}14`, borderLeft: `2px solid ${pm.palette.accent}`, marginBottom: 12 }}>
                          <div className="lv3-mono" style={{ fontSize: 8, letterSpacing: '.12em', color: pm.palette.accent, marginBottom: 4 }}>{GOALS[goal].label.toUpperCase()}</div>
                          <div style={{ fontSize: 12, color: LV3.ink, lineHeight: 1.5, fontStyle: 'italic' }}>{goalNote}</div>
                        </div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {session.exos.map(id => {
                          const e = getExo(id);
                          const pose = EXO_POSES[id];
                          return (
                            <div key={id} onClick={() => { LuneStore.set({ detailExoId: id }); luneNav('exo'); }}
                              role="button" tabIndex={0}
                              onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); LuneStore.set({ detailExoId: id }); luneNav('exo'); } }}
                              aria-label={`Voir ${e.name}`}
                              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px', cursor: 'pointer', borderRadius: 10 }}>
                              <ExoThumb exoId={id} size={36} round={9} />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 12.5, color: LV3.ink }}>{e.name}</div>
                                <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 1 }}>{e.sets}×{e.reps} · {e.charge}</div>
                              </div>
                              <span aria-hidden="true" style={{ color: MUSES[pose.muse].palette.accent, fontSize: 12 }}>›</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Glass>
              );
            })}
          </div>
        </div>

        <div style={{ height: 100 }} />
      </div>

      <LV3TabBar active="programme" muse={muse} />
      <HomeBar />
    </div>
  );
}
