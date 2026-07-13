import { useState } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, luneBack, GOALS } from '../store/luneStore';
import { getDaySession, EXO_POSES, getExo, ENV_META } from '../data/poses';
import { resolveSessionWeekday } from '../data/schedule';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { ExoThumb } from '../components/ExoPose';
import { navBtnStyle } from '../utils/format';

const WEEKDAYS = [
  { d: 1, l: 'L', label: 'Lun' },
  { d: 2, l: 'M', label: 'Mar' },
  { d: 3, l: 'M', label: 'Mer' },
  { d: 4, l: 'J', label: 'Jeu' },
  { d: 5, l: 'V', label: 'Ven' },
  { d: 6, l: 'S', label: 'Sam' },
  { d: 0, l: 'D', label: 'Dim' },
];

export function Program() {
  const s = useLune();
  const phase = activePhase(s);
  const muse = PHASE_TO_MUSE[phase];
  const m = MUSES[muse];
  const env = s.workoutEnv || 'home';
  const goal = s.goal || 'global';
  const injuries = s.injuries || [];
  const preferredDays = s.preferredTrainingDays || [];
  const todayReal = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(todayReal);

  const week = WEEKDAYS.map(w => {
    const sessionDay = resolveSessionWeekday(w.d, preferredDays);
    const session = getDaySession(env, sessionDay, phase, injuries);
    return { ...w, session, isToday: w.d === todayReal };
  });

  const selectedSessionDay = resolveSessionWeekday(selectedDay, preferredDays);
  const selectedSession = getDaySession(env, selectedSessionDay, phase, injuries);
  const selectedLabel = WEEKDAYS.find(w => w.d === selectedDay)?.label || '';

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
                  <span aria-hidden="true">{ENV_META[e].icon}</span>{ENV_META[e].label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: m.palette.accent }}>TON PROGRAMME</div>
          <h1 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Ta semaine <em style={{ color: m.palette.accent }}>type</em>
          </h1>
          <button onClick={() => luneNav('settings')} style={{
            marginTop: 10, padding: '6px 12px', borderRadius: 99, border: `1px solid ${LV3.glassLine}`, background: 'rgba(255,255,255,0.04)',
            color: LV3.ink2, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, cursor: 'pointer',
          }}>Objectif · {GOALS[goal].label} ›</button>
        </div>

        {/* Note de phase */}
        <div style={{ padding: '18px 16px 0' }}>
          <Glass tight style={{ padding: '14px 16px', background: `linear-gradient(135deg, ${m.palette.accent}14, ${LV3.rose}06)`, borderLeft: `2px solid ${m.palette.accent}` }}>
            <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.14em', color: m.palette.accent, marginBottom: 6 }}>{m.phaseLabel.toUpperCase()} · {ENV_META[env].label.toUpperCase()}</div>
            <div style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.55 }}>{selectedSession.note}</div>
          </Glass>
        </div>

        {/* Grille de la semaine */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Cette semaine</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
            {week.map(d => {
              const isSel = selectedDay === d.d;
              return (
                <Glass tight key={d.d} onClick={() => setSelectedDay(d.d)} style={{
                  padding: '10px 3px', textAlign: 'center', cursor: 'pointer',
                  outline: isSel ? `1px solid ${m.palette.accent}` : d.isToday ? `1px solid ${LV3.glassLine2}` : 'none',
                  opacity: d.session.isRest ? .55 : 1,
                }}>
                  <div className="lv3-mono" style={{ fontSize: 8.5, color: d.isToday ? m.palette.accent : LV3.ink3, letterSpacing: '.04em' }}>{d.l}</div>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', margin: '7px auto',
                    background: d.session.isRest ? 'transparent' : m.palette.accent,
                    border: d.session.isRest ? `1px solid ${LV3.ink3}` : 'none',
                  }} />
                  <div className="lv3-serif" style={{ fontSize: 10, fontStyle: 'italic', color: isSel ? m.palette.accent : LV3.ink, lineHeight: 1.15 }}>
                    {d.session.isRest ? 'Repos' : d.session.title.split(' ')[0]}
                  </div>
                </Glass>
              );
            })}
          </div>
        </div>

        {/* Détail du jour sélectionné */}
        <div style={{ padding: '20px 16px 8px' }}>
          <Glass style={{ padding: '18px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
              <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.14em', color: m.palette.accent }}>{selectedLabel.toUpperCase()}</div>
              {selectedSession.optional && (
                <span className="lv3-mono" style={{ fontSize: 8, letterSpacing: '.08em', padding: '3px 9px', borderRadius: 99, background: `${LV3.gold}22`, color: LV3.gold }}>OPTIONNEL</span>
              )}
            </div>
            <div className="lv3-serif" style={{ fontSize: 22, fontStyle: 'italic', color: LV3.ink, marginTop: 4, lineHeight: 1.1 }}>
              {selectedSession.isRest ? 'Repos actif' : selectedSession.title}
            </div>
            {selectedSession.tag && <div style={{ fontSize: 11.5, color: LV3.ink3, marginTop: 6 }}>{selectedSession.tag}</div>}

            {selectedSession.adapted && (
              <div style={{ padding: '9px 12px', borderRadius: 12, background: `${LV3.sage}14`, borderLeft: `2px solid ${LV3.sage}`, marginTop: 12 }}>
                <div style={{ fontSize: 11.5, color: LV3.ink2, lineHeight: 1.5 }}>Séance adaptée à tes limitations physiques (Réglages › Entraînement).</div>
              </div>
            )}
            {selectedSession.warmup && (
              <div style={{ fontSize: 12, color: LV3.ink3, marginTop: 12, lineHeight: 1.5 }}>{selectedSession.warmup}</div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
              {selectedSession.exos.map(id => {
                const e = getExo(id);
                const pose = EXO_POSES[id];
                if (!e || !pose) return null;
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
          </Glass>
        </div>

        <div style={{ height: 100 }} />
      </div>

      <LV3TabBar active="programme" muse={muse} />
      <HomeBar />
    </div>
  );
}
