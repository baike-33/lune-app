import { useState } from 'react';
import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, luneBack, GOALS } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { navBtnStyle } from '../utils/format';
import { todayISO } from '../utils/dateScope';
import { QUIZ_QUESTIONS, QUIZ_PROFILES, quizRecommendations } from '../data/quiz';

export function Quiz() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(!!s.quizProfile);

  const q = QUIZ_QUESTIONS[step];
  const pct = ((step + 1) / QUIZ_QUESTIONS.length) * 100;

  const pick = (val) => {
    const next = { ...answers, [q.k]: val };
    setAnswers(next);
    if (step < QUIZ_QUESTIONS.length - 1) setStep(step + 1);
    else finish(next);
  };

  const finish = (all) => {
    const profileKey = all.goal || 'global';
    const profile = QUIZ_PROFILES[profileKey];
    LuneStore.set({ quizProfile: { key: profileKey, label: profile.label, desc: profile.desc, tags: quizRecommendations(all), date: todayISO() } });
    setShowResult(true);
  };

  const restart = () => { setStep(0); setAnswers({}); setShowResult(false); };
  const applyGoal = () => { if (s.quizProfile) LuneStore.set({ goal: s.quizProfile.key }); luneNav('nutrition'); };

  const result = s.quizProfile;

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />
      <PhoneStatus dark={true} />
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ padding: '14px 18px 0' }}>
          <button onClick={() => luneBack() || luneNav('moi')} aria-label="Retour" style={navBtnStyle()}>
            <span aria-hidden="true">←</span> <span className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.10em' }}>Moi</span>
          </button>
        </div>
        <div style={{ padding: '16px 20px 0' }}>
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>BILAN PERSONNALISÉ</div>
          <h1 className="lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1.05 }}>
            {showResult ? <>Ton <em style={{ color: m.palette.accent }}>profil</em></> : <>5 questions pour <em style={{ color: m.palette.accent }}>affiner</em></>}
          </h1>
        </div>

        {!showResult ? (
          <div style={{ padding: '20px 18px 0' }}>
            <Glass style={{ padding: '26px 22px' }}>
              <div className="lv3-serif" style={{ fontSize: 20, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.3, marginBottom: 20 }}>{q.q}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map(o => (
                  <button key={o.v} onClick={() => pick(o.v)} style={{
                    padding: '13px 16px', borderRadius: 14, border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: 'rgba(255,255,255,0.04)', outline: `1px solid ${LV3.glassLine}`,
                    color: LV3.ink, fontFamily: 'Manrope, sans-serif', fontSize: 13.5, transition: 'all .15s',
                  }}>
                    {o.icon ? `${o.icon} ` : ''}{o.l}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
                <div style={{ flex: 1, height: 3, background: LV3.faint, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: m.palette.accent, borderRadius: 2, transition: 'width .3s' }} />
                </div>
                <span className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3 }}>{step + 1} / {QUIZ_QUESTIONS.length}</span>
              </div>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} style={{
                  marginTop: 14, background: 'none', border: 'none', cursor: 'pointer', color: LV3.ink3,
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, padding: 0,
                }}>← Retour</button>
              )}
            </Glass>
          </div>
        ) : (
          <div style={{ padding: '20px 18px 0' }}>
            <Glass style={{ padding: '26px 22px' }}>
              <div className="lv3-serif" style={{ fontSize: 24, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.1 }}>
                Ton profil : <em style={{ color: m.palette.accent }}>{result.label}</em>
              </div>
              <div style={{ fontSize: 13, color: LV3.ink2, lineHeight: 1.6, marginTop: 12 }}>{result.desc}</div>
              {result.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                  {result.tags.map((t, i) => (
                    <span key={i} className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.04em', padding: '5px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', color: LV3.ink2 }}>{t}</span>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 22 }}>
                <button onClick={applyGoal} className="lv3-fab" style={{
                  padding: '13px 18px', borderRadius: 99, border: 'none', cursor: 'pointer',
                  background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`, color: '#231016',
                  fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '.02em',
                }}>Appliquer « {GOALS[result.key]?.label} » comme objectif →</button>
                <button onClick={restart} style={{
                  padding: '12px 18px', borderRadius: 99, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontSize: 12,
                  background: 'transparent', border: `1px solid ${LV3.glassLine}`, color: LV3.ink2,
                }}>Refaire le bilan</button>
              </div>
            </Glass>
          </div>
        )}

        <div style={{ height: 96 }} />
      </div>
      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
