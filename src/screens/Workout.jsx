import { useState, useEffect } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, GOALS } from '../store/luneStore';
import { EXO_POSES, ENV_META, getDaySession, getExo } from '../data/poses';
import { GOAL_TRAINING_NOTES } from '../data/goalNotes';
import { REST_SECONDS_BY_GOAL, resolveSessionWeekday } from '../data/schedule';
import { WarmAurora, Glass, RingProgress } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { ExoPose, ExoThumb } from '../components/ExoPose';

/* ════════════════════════════════════════════════════════
   WORKOUT · live tracker avec muse en motion
   ════════════════════════════════════════════════════════ */
export function Workout() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const env = s.workoutEnv || 'home';
  const phaseKey = activePhase(s);
  const todayWeekday = resolveSessionWeekday(new Date().getDay(), s.preferredTrainingDays || []);
  const session = getDaySession(env, todayWeekday, phaseKey, s.injuries || []);
  const exos = session.exos;
  const goalNote = GOAL_TRAINING_NOTES[s.goal || 'global']?.[phaseKey];
  const restDuration = REST_SECONDS_BY_GOAL[s.goal || 'global'] || 75;
  const setEnv = (e) => LuneStore.set({ workoutEnv: e, workoutActiveExo: getDaySession(e, todayWeekday, phaseKey, s.injuries || []).exos[0], workoutDone: {} });
  const activeExo = exos.includes(s.workoutActiveExo) ? s.workoutActiveExo : exos[0];
  const setActiveExo = (id) => LuneStore.set({ workoutActiveExo: id });
  const done = s.workoutDone || {};
  const setDone = (updater) => LuneStore.set(st => ({ workoutDone: typeof updater === 'function' ? updater(st.workoutDone || {}) : updater }));
  const [rest, setRest] = useState(restDuration);
  const [restRunning, setRestRunning] = useState(false);
  useEffect(() => {
    if (!restRunning) return;
    const id = setInterval(() => setRest(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [restRunning]);

  const exo = getExo(activeExo) || getExo(exos[0]);
  const pose = EXO_POSES[activeExo];
  const poseMuse = MUSES[pose.muse];

  const toggleSet = (id, i) => {
    let nowChecked = false;
    setDone(d => {
      const cur = d[id] || Array((getExo(id) || {}).sets || 4).fill(false);
      const arr = [...cur];
      arr[i] = !arr[i];
      nowChecked = arr[i];
      return { ...d, [id]: arr };
    });
    // Le chrono ne démarre QUE quand on valide une série (jamais tout seul)
    if (nowChecked) { setRest(restDuration); setRestRunning(true); }
  };

  const setsForCurrent = done[activeExo] || Array(exo.sets).fill(false);
  const currentSetIdx = setsForCurrent.findIndex(d => !d);

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />
      <div className="lv3-grain"></div>

      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Top bar */}
        <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 6, position: 'relative' }}>
          <Glass tight pill onClick={() => luneNav('today')} style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <span style={{ fontSize: 14, color: LV3.ink2 }}>←</span>
            <span className="lv3-mono" style={{ fontSize: 10, color: LV3.ink2, letterSpacing: '.10em' }}>Sortir</span>
          </Glass>
          {/* Toggle Maison / Salle */}
          <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine}` }}>
            {['home', 'gym'].map(e => {
              const isA = e === env;
              return (
                <button key={e} onClick={() => setEnv(e)} aria-pressed={isA} style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 99, border: 'none', cursor: 'pointer',
                  background: isA ? `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})` : 'transparent',
                  color: isA ? '#231016' : LV3.ink2, fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', fontWeight: 600,
                }}>
                  <span aria-hidden="true">{ENV_META[e].icon}</span>{ENV_META[e].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero — Real pose photo */}
        <div style={{ padding: '14px 18px 0' }}>
          <Glass tight style={{ padding: '12px 14px', background: `linear-gradient(135deg, ${m.palette.accent}14, ${LV3.rose}06)`, borderLeft: `2px solid ${m.palette.accent}` }}>
            <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.14em', color: m.palette.accent }}>{m.phaseLabel.toUpperCase()} · {session.title.toUpperCase()}</div>
            <div className="lv3-serif" style={{ fontSize: 14.5, fontStyle: 'italic', color: LV3.ink, marginTop: 5, lineHeight: 1.4 }}>{session.note}</div>
            {session.adapted && (
              <div className="lv3-mono" style={{ fontSize: 9, color: LV3.sage, marginTop: 8 }}>✓ Séance adaptée à tes limitations physiques.</div>
            )}
            {session.phaseAdapted && (
              <div className="lv3-mono" style={{ fontSize: 9, color: LV3.sage, marginTop: 8 }}>✓ Pilates doux · phase menstruelle.</div>
            )}
            {session.volumeReduced && (
              <div className="lv3-mono" style={{ fontSize: 9, color: LV3.gold, marginTop: 8 }}>✓ Volume réduit ~20% · phase lutéale.</div>
            )}
            {goalNote && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${LV3.faint}` }}>
                <div className="lv3-mono" style={{ fontSize: 7.5, letterSpacing: '.14em', color: LV3.ink3 }}>OBJECTIF · {GOALS[s.goal || 'global'].label.toUpperCase()}</div>
                <div style={{ fontSize: 12.5, color: LV3.ink2, marginTop: 4, lineHeight: 1.4, fontStyle: 'italic' }}>{goalNote}</div>
                <div className="lv3-mono" style={{ fontSize: 8.5, color: m.palette.accent, marginTop: 6 }}>Repos entre séries : {restDuration}s</div>
              </div>
            )}
          </Glass>
        </div>

        {/* Hero — Real pose photo */}
        <div style={{ padding: '14px 18px 8px' }}>
          <div style={{ position: 'relative' }}>
            <ExoPose exoId={activeExo} aspectRatio="4/5" round={28} showArrow={true} showCredit={true} showTitle={false} />

            {/* Floating rep counter */}
            <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 6 }}>
              <Glass tight style={{ padding: '10px 14px', textAlign: 'center' }}>
                <div className="lv3-mono" style={{ fontSize: 9, color: poseMuse.palette.accent, letterSpacing: '.18em' }}>REPS</div>
                <div className="lv3-counter-pulse lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', color: LV3.ink, lineHeight: .9, marginTop: 2 }}>
                  {exo.reps.replace('–', '-')}
                </div>
              </Glass>
            </div>

            {/* Floating sets/charge pill */}
            <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 6 }}>
              <Glass tight pill style={{ padding: '6px 12px' }}>
                <span className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink2, letterSpacing: '.12em' }}>
                  EXO {String(exos.indexOf(activeExo) + 1).padStart(2, '0')} / {String(exos.length).padStart(2, '0')}
                </span>
              </Glass>
            </div>
          </div>
        </div>

        {/* Title under photo */}
        <div style={{ padding: '14px 24px 0', textAlign: 'center' }}>
          <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: poseMuse.palette.accent }}>
            {m.phaseLabel.toUpperCase()} · « DÉMONTRÉE PAR {poseMuse.name} »
          </div>
          <div className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', marginTop: 4, lineHeight: 1 }}>
            {exo.name}
          </div>
        </div>

        {/* Coach line */}
        <div style={{ padding: '10px 22px 14px', textAlign: 'center' }}>
          <div className="lv3-serif" style={{ fontSize: 14, fontStyle: 'italic', color: LV3.ink2, lineHeight: 1.5 }}>
            « {pose.coach} »
          </div>
          <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: LV3.ink3, marginTop: 6 }}>— {poseMuse.name}</div>
        </div>

        {/* Sets row */}
        <div style={{ padding: '8px 18px 12px' }}>
          <Glass tight style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <div style={lv3Label}>Tes séries</div>
              <div className="lv3-mono" style={{ fontSize: 10, color: LV3.ink3 }}>
                {setsForCurrent.filter(Boolean).length} / {exo.sets}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {setsForCurrent.map((d, i) => {
                const isCur = i === currentSetIdx;
                return (
                  <button key={i} onClick={() => toggleSet(activeExo, i)} style={{
                    flex: 1, padding: '14px 0', borderRadius: 14, border: 'none',
                    background: d ? `linear-gradient(135deg, ${poseMuse.palette.accent}, ${LV3.peach2})` : (isCur ? `${poseMuse.palette.accent}1A` : 'rgba(255,255,255,0.04)'),
                    color: d ? '#231016' : (isCur ? poseMuse.palette.accent : LV3.ink2),
                    fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 22,
                    cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    boxShadow: d ? `0 6px 16px ${poseMuse.palette.accent}40` : (isCur ? `inset 0 0 0 1px ${poseMuse.palette.accent}` : 'inset 0 0 0 1px rgba(255,255,255,0.05)'),
                    transition: 'all .2s',
                  }}>
                    {d ? '✓' : i + 1}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${LV3.faint}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ ...lv3Label, fontSize: 8.5, color: LV3.ink3 }}>CHARGE</div>
                <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', marginTop: 2 }}>{exo.charge}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ ...lv3Label, fontSize: 8.5, color: LV3.ink3 }}>RPE</div>
                <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', marginTop: 2 }}>{exo.rpe}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ ...lv3Label, fontSize: 8.5, color: LV3.ink3 }}>TEMPO</div>
                <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', marginTop: 2 }}>{pose.tempo}</div>
              </div>
            </div>
          </Glass>
        </div>

        {/* Program list */}
        <div style={{ padding: '4px 18px 12px' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4, display: 'flex', justifyContent: 'space-between' }}>
            <span>Séance {session.label} · {exos.length} exos</span>
            <span style={{ color: m.palette.accent }}>{session.sub}</span>
          </div>
          <button onClick={() => luneNav('programme')} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%',
            padding: '9px', marginBottom: 10, borderRadius: 99, cursor: 'pointer',
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${LV3.glassLine}`, color: m.palette.accent,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '.06em',
          }}>Voir le programme complet · la semaine →</button>
          <Glass tight style={{ padding: '6px 6px' }}>
            {exos.map((id, i) => {
              const e = getExo(id);
              const sets = done[id] || Array(e.sets).fill(false);
              const completed = sets.filter(Boolean).length;
              const isActive = id === activeExo;
              const allDone = completed === e.sets;
              const exoPose = EXO_POSES[id];
              const exoMuse = MUSES[exoPose.muse];
              return (
                <div key={id} onClick={() => setActiveExo(id)} role="button" tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveExo(id); } }}
                  aria-label={`Choisir ${e.name} comme exercice actif`} style={{
                  padding: '8px 10px', borderRadius: 14,
                  background: isActive ? `${exoMuse.palette.accent}18` : 'transparent',
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  opacity: allDone && !isActive ? .55 : 1, transition: 'all .2s',
                }}>
                  <ExoThumb exoId={id} size={44} round={10} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: isActive ? exoMuse.palette.accent : LV3.ink, fontWeight: isActive ? 600 : 500 }}>{e.name}</div>
                    <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 2 }}>{e.sets}×{e.reps} · {e.charge}</div>
                  </div>
                  <div className="lv3-mono" style={{ fontSize: 10, color: allDone ? LV3.sage : LV3.ink3 }}>
                    {allDone ? '✓' : `${completed}/${e.sets}`}
                  </div>
                  <button
                    onClick={(ev) => { ev.stopPropagation(); LuneStore.set({ detailExoId: id }); luneNav('exo'); }}
                    aria-label={`Voir la fiche de ${e.name}`}
                    style={{ width: 26, height: 26, borderRadius: '50%', border: `1px solid ${LV3.glassLine}`, background: 'rgba(255,255,255,0.04)', color: LV3.ink3, fontSize: 11, cursor: 'pointer', flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace" }}
                  >ⓘ</button>
                </div>
              );
            })}
          </Glass>
        </div>

        <div style={{ height: 140 }} />
      </div>

      {/* Rest timer floating */}
      <div style={{ position: 'absolute', bottom: 18, left: 14, right: 14, zIndex: 9 }}>
        <Glass style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <RingProgress size={48} value={rest / restDuration} color={m.palette.accent} width={3}>
              <div className="lv3-mono" style={{ fontSize: 11, fontWeight: 600, color: LV3.ink }}>{rest}</div>
            </RingProgress>
          </div>
          <div style={{ flex: 1 }}>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: m.palette.accent }}>● REPOS</div>
            <div className="lv3-serif lv3-bob" style={{ fontSize: 24, fontStyle: 'italic', lineHeight: 1, marginTop: 3 }}>
              {String(Math.floor(rest / 60)).padStart(2, '0')}:{String(rest % 60).padStart(2, '0')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setRest(r => Math.max(0, r - 15))} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${LV3.glassLine2}`, background: 'transparent', color: LV3.ink2, fontSize: 10, cursor: 'pointer', fontFamily: 'IBM Plex Mono, monospace' }}>−15</button>
            <button onClick={() => setRestRunning(!restRunning)} className="lv3-fab" style={{ width: 42, height: 42, borderRadius: '50%', border: 'none', background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`, color: '#231016', fontSize: 14, cursor: 'pointer', fontWeight: 700 }}>{restRunning ? '⏸' : '▶'}</button>
            <button onClick={() => setRest(r => r + 15)} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${LV3.glassLine2}`, background: 'transparent', color: LV3.ink2, fontSize: 10, cursor: 'pointer', fontFamily: 'IBM Plex Mono, monospace' }}>+15</button>
          </div>
        </Glass>
      </div>

      <HomeBar />
    </div>
  );
}
