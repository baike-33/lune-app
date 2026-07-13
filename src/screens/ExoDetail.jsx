import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES } from '../data/muses';
import { EXO_POSES, getDaySession } from '../data/poses';
import { useLune, LuneStore, activePhase, luneNav, luneBack } from '../store/luneStore';
import { resolveSessionWeekday } from '../data/schedule';
import { WarmAurora, Glass, RingProgress } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { MuseAvatar } from '../components/MuseAvatar';
import { ExoPose } from '../components/ExoPose';

/* ════════════════════════════════════════════════════════
   EXERCISE DETAIL · plein écran
   ════════════════════════════════════════════════════════ */
export function ExoDetail() {
  const s = useLune();
  const exoId = EXO_POSES[s.detailExoId] ? s.detailExoId : 's1';
  const pose = EXO_POSES[exoId];
  const muse = pose.muse;
  const m = MUSES[muse];
  const phase = activePhase(s);
  const todayWeekday = resolveSessionWeekday(new Date().getDay(), s.preferredTrainingDays || []);
  const session = getDaySession(s.workoutEnv || 'home', todayWeekday, phase, s.injuries || []);
  const inToday = session.exos.includes(exoId);
  const doneSets = (s.workoutDone || {})[exoId] || [];
  const completed = doneSets.filter(Boolean).length;

  const start = () => { LuneStore.set({ workoutActiveExo: exoId }); luneNav('seance'); };

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />
      <div className="lv3-grain"></div>

      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Top bar */}
        <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between' }}>
          <Glass tight pill onClick={() => luneBack() || luneNav('seance')} style={{ padding: '8px 14px', cursor: 'pointer' }}>
            <span className="lv3-mono" style={{ fontSize: 10, color: LV3.ink2 }}>← Programme</span>
          </Glass>
          <Glass tight pill style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <MuseAvatar muse={muse} size={20} />
            <span className="lv3-mono" style={{ fontSize: 10, color: m.palette.accent }}>{m.name}</span>
          </Glass>
        </div>

        {/* Title */}
        <div style={{ padding: '18px 22px 0' }}>
          <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: m.palette.accent }}>EXO · {m.phaseLabel.toUpperCase()}</div>
          <div className="lv3-serif" style={{ fontSize: 38, fontStyle: 'italic', lineHeight: .98, marginTop: 6 }}>
            {pose.name}
          </div>
        </div>

        {/* Demo — real pose */}
        <div style={{ padding: '20px 18px 8px' }}>
          <ExoPose exoId={exoId} aspectRatio="4/5" round={28} showArrow={true} showCredit={true} showTitle={false} />
        </div>

        {/* Tempo + charge + RPE */}
        <div style={{ padding: '8px 18px 14px', display: 'flex', gap: 8 }}>
          <Glass tight style={{ flex: 1, padding: '14px 14px' }}>
            <div style={{ ...lv3Label, fontSize: 9, color: LV3.ink3 }}>TEMPO</div>
            <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', marginTop: 4 }}>{pose.tempo}</div>
          </Glass>
          <Glass tight style={{ flex: 1, padding: '14px 14px' }}>
            <div style={{ ...lv3Label, fontSize: 9, color: LV3.ink3 }}>CHARGE</div>
            <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', marginTop: 4 }}>{pose.charge}</div>
          </Glass>
          <Glass tight style={{ flex: 1, padding: '14px 14px' }}>
            <div style={{ ...lv3Label, fontSize: 9, color: LV3.ink3 }}>RPE</div>
            <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', marginTop: 4 }}>{pose.rpe}</div>
          </Glass>
        </div>

        {/* Form notes */}
        <div style={{ padding: '4px 18px 14px' }}>
          <Glass style={{ padding: '16px 16px' }}>
            <div style={{ ...lv3Label, fontSize: 9.5, color: m.palette.accent, marginBottom: 10 }}>Forme · 3 cues</div>
            {pose.cues.map((c, i) => (
              <div key={i} style={{ padding: '8px 0', borderTop: i > 0 ? `1px solid ${LV3.faint}` : 'none', display: 'flex', gap: 14, alignItems: 'baseline' }}>
                <div className="lv3-mono" style={{ fontSize: 9.5, color: m.palette.accent, letterSpacing: '.14em', minWidth: 60 }}>0{i + 1} {c.l}</div>
                <div className="lv3-serif" style={{ fontSize: 14, fontStyle: 'italic', color: LV3.ink, flex: 1 }}>{c.s}</div>
              </div>
            ))}
          </Glass>
        </div>

        {/* Progression aujourd'hui — données réelles de la séance en cours */}
        <div style={{ padding: '4px 18px 16px' }}>
          <Glass tight style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
            {inToday ? (
              <>
                <RingProgress size={48} value={pose.sets ? completed / pose.sets : 0} color={m.palette.accent} width={4}>
                  <div className="lv3-mono" style={{ fontSize: 10, fontWeight: 600, color: LV3.ink }}>{completed}/{pose.sets}</div>
                </RingProgress>
                <div style={{ flex: 1 }}>
                  <div style={lv3Label}>Aujourd'hui</div>
                  <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', marginTop: 3 }}>
                    {completed === pose.sets ? 'Exercice terminé ✓' : `${completed} série${completed > 1 ? 's' : ''} sur ${pose.sets} validée${completed > 1 ? 's' : ''}`}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ flex: 1 }}>
                <div style={lv3Label}>Aujourd'hui</div>
                <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', marginTop: 3, color: LV3.ink2 }}>
                  Pas prévu dans la séance {session.label.toLowerCase()} de {m.phaseLabel.toLowerCase()}.
                </div>
              </div>
            )}
          </Glass>
        </div>

        {/* CTA */}
        <div style={{ padding: '4px 18px 24px' }}>
          <button onClick={start} className="lv3-fab" style={{
            width: '100%', padding: '16px 22px',
            borderRadius: 99, border: 'none',
            background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
            color: '#231016', fontWeight: 600, fontSize: 13, letterSpacing: '.10em', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            Commencer cet exercice
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>→</span>
          </button>
        </div>

        <div style={{ height: 30 }} />
      </div>

      <HomeBar />
    </div>
  );
}
