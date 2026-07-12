import { useState } from 'react';
import { LV3 } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { PHASES } from '../data/phases';
import { LuneStore, cycleDayFromDate, phaseForDay, PHASE_DEFAULT_DAY } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { MuseAvatar } from '../components/MuseAvatar';
import { ExoPose } from '../components/ExoPose';
import { INJURY_TAGS } from '../data/poses';

const TOTAL_STEPS = 7;

function ctaStyle(accent) {
  return {
    width: '100%', padding: '16px 22px', borderRadius: 99, border: 'none',
    background: `linear-gradient(135deg, ${accent}, ${LV3.peach2})`,
    color: '#231016', fontWeight: 600, fontSize: 14, letterSpacing: '.06em', cursor: 'pointer',
    fontFamily: 'Manrope, sans-serif',
  };
}
function ctaDisabledStyle(accent) {
  return { ...ctaStyle(accent), opacity: .4, cursor: 'default' };
}

export function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [cycleMode, setCycleMode] = useState(null); // 'cycle' | 'none'
  const [phase, setPhase] = useState(null);
  const [periodDate, setPeriodDate] = useState('');
  const [fixedMuse, setFixedMuse] = useState(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [heightInput, setHeightInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [birthYearInput, setBirthYearInput] = useState('');
  const [equipment, setEquipment] = useState('home');
  const [injuriesSel, setInjuriesSel] = useState([]);
  const toggleInjury = (k) => setInjuriesSel(cur => cur.includes(k) ? cur.filter(x => x !== k) : [...cur, k]);

  const activeMuseKey = cycleMode === 'none' ? fixedMuse : (phase ? PHASE_TO_MUSE[phase] : null);
  const muse = activeMuseKey ? MUSES[activeMuseKey] : MUSES.lina;
  const accent = muse.palette.accent;

  const cycleLength = LuneStore.get().cycleLength;

  const onDate = (val) => {
    setPeriodDate(val);
    const d = cycleDayFromDate(val, cycleLength);
    if (d) setPhase(phaseForDay(d));
  };

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => Math.max(0, s - 1));

  const finish = () => {
    const dayFromDate = cycleDayFromDate(periodDate, cycleLength);
    const prev = LuneStore.get();
    const weight = weightInput.trim() ? Number(weightInput) : null;
    const newMeasurement = weight ? {
      id: 'ms' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      weight,
    } : null;

    LuneStore.set({
      onboarded: true,
      onboardedAt: prev.onboardedAt || new Date().toISOString().slice(0, 10),
      consentGiven: true,
      consentDate: new Date().toISOString(),
      name: name.trim() || 'toi',
      cycleMode: cycleMode || 'cycle',
      fixedMuse: cycleMode === 'none' ? (fixedMuse || 'lina') : null,
      ...(cycleMode !== 'none' && periodDate ? { lastPeriod: periodDate } : {}),
      ...(cycleMode !== 'none' ? { cycleDay: dayFromDate || PHASE_DEFAULT_DAY[phase || 'lut'] } : {}),
      ...(heightInput.trim() ? { heightCm: Number(heightInput) } : {}),
      ...(weight ? { startWeight: weight } : {}),
      ...(newMeasurement ? { measurements: [newMeasurement] } : {}),
      ...(birthYearInput.trim() ? { birthYear: Number(birthYearInput) } : {}),
      workoutEnv: equipment,
      injuries: injuriesSel,
    });
    onDone();
  };

  const canContinueStep2 = cycleMode !== null;
  const canContinueStep3 = cycleMode === 'none' ? !!fixedMuse : !!phase;

  return (
    <div style={{ position: 'absolute', inset: 0, background: LV3.bg, color: LV3.ink, fontFamily: "'Manrope', sans-serif", overflow: 'hidden' }}>
      <WarmAurora muse={activeMuseKey || 'lina'} />
      <div className="lv3-grain"></div>
      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '56px 26px 30px', zIndex: 5 }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 30 }}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= step ? accent : 'rgba(255,255,255,0.10)', transition: 'background .3s' }} />
          ))}
        </div>

        {/* STEP 0 — Welcome */}
        {step === 0 && (
          <div className="lv3-rise" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: accent }}>SLIM THICK · ÉLÉGANT</div>
            <h1 className="lv3-serif" style={{ fontSize: 54, fontStyle: 'italic', lineHeight: .95, margin: '16px 0 0' }}>
              Ton corps<br />change chaque<br /><em style={{ color: accent }}>semaine</em>.
            </h1>
            <p className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', color: LV3.ink2, lineHeight: 1.45, marginTop: 18 }}>
              Ton programme aussi. Quatre muses t'accompagnent — avec ou sans cycle régulier. Découvre-les.
            </p>
            <div style={{ flex: 1 }} />
            <button onClick={next} className="lv3-fab" style={ctaStyle(accent)}>Commencer →</button>
          </div>
        )}

        {/* STEP 1 — Meet the muses */}
        {step === 1 && (
          <div className="lv3-rise" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: accent }}>TES QUATRE MUSES</div>
            <h2 className="lv3-serif" style={{ fontSize: 34, fontStyle: 'italic', margin: '10px 0 18px', lineHeight: 1 }}>
              Une femme, <em style={{ color: accent }}>quatre saisons</em>.
            </h2>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
              {['mira', 'alya', 'sora', 'lina'].map(k => {
                const M = MUSES[k];
                return (
                  <Glass tight key={k} style={{ padding: '12px 14px', display: 'flex', gap: 14, alignItems: 'center' }}>
                    <MuseAvatar muse={k} size={52} ring={true} />
                    <div style={{ flex: 1 }}>
                      <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.14em', color: M.palette.accent }}>{M.phaseLabel.toUpperCase()}</div>
                      <div className="lv3-serif" style={{ fontSize: 22, fontStyle: 'italic', lineHeight: 1, marginTop: 2 }}>
                        {M.name.slice(0, 1) + M.name.slice(1).toLowerCase()} <span style={{ fontSize: 13, color: LV3.ink3 }}>· {M.tag}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: LV3.ink2, marginTop: 4 }}>« {M.keyword} » — {M.energy}</div>
                    </div>
                  </Glass>
                );
              })}
            </div>
            <button onClick={next} className="lv3-fab" style={{ ...ctaStyle(accent), marginTop: 16 }}>Je les ai rencontrées →</button>
          </div>
        )}

        {/* STEP 2 — Consentement RGPD */}
        {step === 2 && (
          <div className="lv3-rise" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: accent }}>AVANT DE CONTINUER</div>
            <h2 className="lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', margin: '10px 0 14px', lineHeight: 1.05 }}>
              Tes données <em style={{ color: accent }}>t'appartiennent</em>
            </h2>
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <Glass tight style={{ padding: '16px 16px', marginBottom: 10 }}>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    "Tes données de cycle, de santé et de mensurations restent uniquement sur cet appareil — jamais envoyées à un serveur.",
                    'Tu peux les exporter ou les supprimer intégralement à tout moment, depuis Réglages › Données.',
                    "Lune n'est pas un dispositif médical et ne remplace pas l'avis d'un professionnel de santé.",
                  ].map((t, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, fontSize: 12.5, color: LV3.ink2, lineHeight: 1.5 }}>
                      <span style={{ color: accent, flexShrink: 0 }}>◈</span>{t}
                    </li>
                  ))}
                </ul>
              </Glass>
              <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, lineHeight: 1.6, marginBottom: 14 }}>
                Politique de confidentialité et CGU complètes disponibles à tout moment dans Réglages.
              </div>
              <button onClick={() => setConsentChecked(v => !v)} role="checkbox" aria-checked={consentChecked} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', padding: '14px 16px', borderRadius: 16, cursor: 'pointer',
                background: consentChecked ? `${accent}1A` : 'rgba(255,255,255,0.04)', border: `1px solid ${consentChecked ? accent : LV3.glassLine2}`,
                textAlign: 'left', fontFamily: 'Manrope, sans-serif',
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                  border: consentChecked ? 'none' : `1.5px solid ${LV3.glassLine2}`,
                  background: consentChecked ? accent : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#231016', fontSize: 12, fontWeight: 700,
                }}>{consentChecked && '✓'}</div>
                <span style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.5 }}>
                  J'accepte que Lune traite mes données de cycle, de santé et de mensurations pour me proposer un programme personnalisé.
                </span>
              </button>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={back} style={{ padding: '16px 20px', borderRadius: 99, border: `1px solid ${LV3.glassLine}`, background: 'transparent', color: LV3.ink2, fontFamily: 'Manrope, sans-serif', fontSize: 13, cursor: 'pointer' }}>←</button>
              <button onClick={consentChecked ? next : undefined} className={consentChecked ? 'lv3-fab' : ''} style={{ ...(consentChecked ? ctaStyle(accent) : ctaDisabledStyle(accent)), flex: 1 }}>
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Statut du cycle */}
        {step === 3 && (
          <div className="lv3-rise" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: accent }}>TON CORPS, TON RYTHME</div>
            <h2 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '10px 0 6px', lineHeight: 1.05 }}>
              Comment est ton <em style={{ color: accent }}>cycle</em> en ce moment ?
            </h2>
            <p style={{ fontSize: 13, color: LV3.ink3, marginBottom: 18 }}>Aucune situation n'est un problème — le programme s'adapte.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => setCycleMode('cycle')} style={{
                padding: '16px 18px', borderRadius: 18, cursor: 'pointer', textAlign: 'left', border: 'none',
                background: cycleMode === 'cycle' ? `${accent}1F` : 'rgba(255,255,255,0.04)',
                outline: `1px solid ${cycleMode === 'cycle' ? accent : LV3.glassLine}`, fontFamily: 'Manrope, sans-serif',
              }}>
                <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', color: cycleMode === 'cycle' ? accent : LV3.ink }}>J'ai un cycle régulier</div>
                <div className="lv3-mono" style={{ fontSize: 10, color: LV3.ink3, marginTop: 4 }}>Le programme suit tes 4 phases automatiquement</div>
              </button>
              <button onClick={() => setCycleMode('none')} style={{
                padding: '16px 18px', borderRadius: 18, cursor: 'pointer', textAlign: 'left', border: 'none',
                background: cycleMode === 'none' ? `${accent}1F` : 'rgba(255,255,255,0.04)',
                outline: `1px solid ${cycleMode === 'none' ? accent : LV3.glassLine}`, fontFamily: 'Manrope, sans-serif',
              }}>
                <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', color: cycleMode === 'none' ? accent : LV3.ink }}>Irrégulier, absent, contraception, ménopause…</div>
                <div className="lv3-mono" style={{ fontSize: 10, color: LV3.ink3, marginTop: 4, lineHeight: 1.5 }}>Tu choisis l'énergie qui te correspond, elle reste stable</div>
              </button>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={back} style={{ padding: '16px 20px', borderRadius: 99, border: `1px solid ${LV3.glassLine}`, background: 'transparent', color: LV3.ink2, fontFamily: 'Manrope, sans-serif', fontSize: 13, cursor: 'pointer' }}>←</button>
              <button onClick={canContinueStep2 ? next : undefined} className={canContinueStep2 ? 'lv3-fab' : ''} style={{ ...(canContinueStep2 ? ctaStyle(accent) : ctaDisabledStyle(accent)), flex: 1 }}>
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — Détail : date/phase (cycle) ou muse fixe (sans cycle) */}
        {step === 4 && cycleMode === 'cycle' && (
          <div className="lv3-rise" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: accent }}>OÙ EN ES-TU ?</div>
            <h2 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '10px 0 6px', lineHeight: 1 }}>
              Ta phase <em style={{ color: accent }}>actuelle</em>
            </h2>
            <p style={{ fontSize: 13, color: LV3.ink3, marginBottom: 18 }}>Le programme adaptera séances et nutrition automatiquement.</p>
            <Glass tight style={{ padding: '14px 16px', marginBottom: 14 }}>
              <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.16em', color: LV3.ink3, marginBottom: 8 }}>1ER JOUR DE TES DERNIÈRES RÈGLES</div>
              <input type="date" value={periodDate} onChange={e => onDate(e.target.value)} aria-label="Date des dernières règles" style={{
                width: '100%', padding: '12px 14px', borderRadius: 12, boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
                color: LV3.ink, fontFamily: 'Manrope, sans-serif', fontSize: 14, outline: 'none',
              }} />
              <div className="lv3-mono" style={{ fontSize: 9.5, color: periodDate ? accent : LV3.ink3, marginTop: 8, lineHeight: 1.5 }}>
                {periodDate ? `On y est : jour ${cycleDayFromDate(periodDate, cycleLength)} · ${MUSES[PHASE_TO_MUSE[phase]].phaseLabel}.` : 'Le plus précis — ton cycle avancera tout seul.'}
              </div>
            </Glass>
            <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.14em', color: LV3.ink3, textAlign: 'center', margin: '0 0 12px' }}>— OU CHOISIS TA PHASE —</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { k: 'mens', sub: 'J1–5 · règles' },
                { k: 'fol', sub: 'J6–13 · post-règles, énergie ↑' },
                { k: 'ov', sub: 'J14–16 · milieu de cycle' },
                { k: 'lut', sub: 'J17–28 · avant les règles' },
              ].map(p => {
                const M = MUSES[PHASE_TO_MUSE[p.k]];
                const isA = phase === p.k;
                return (
                  <button key={p.k} onClick={() => setPhase(p.k)} style={{
                    padding: '14px 16px', borderRadius: 18, cursor: 'pointer', textAlign: 'left',
                    border: 'none', display: 'flex', alignItems: 'center', gap: 14,
                    background: isA ? `${M.palette.accent}1F` : 'rgba(255,255,255,0.04)',
                    outline: `1px solid ${isA ? M.palette.accent : LV3.glassLine}`,
                    fontFamily: 'Manrope, sans-serif', transition: 'all .2s',
                  }}>
                    <MuseAvatar muse={PHASE_TO_MUSE[p.k]} size={40} ring={isA} />
                    <div style={{ flex: 1 }}>
                      <div className="lv3-serif" style={{ fontSize: 19, fontStyle: 'italic', color: isA ? M.palette.accent : LV3.ink, lineHeight: 1 }}>{PHASES[p.k].label}</div>
                      <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 4, letterSpacing: '.06em' }}>{p.sub}</div>
                    </div>
                    <div style={{ fontSize: 11, color: isA ? M.palette.accent : LV3.ink3 }}>{isA ? '●' : '○'}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={back} style={{ padding: '16px 20px', borderRadius: 99, border: `1px solid ${LV3.glassLine}`, background: 'transparent', color: LV3.ink2, fontFamily: 'Manrope, sans-serif', fontSize: 13, cursor: 'pointer' }}>←</button>
              <button onClick={canContinueStep3 ? next : undefined} className={canContinueStep3 ? 'lv3-fab' : ''} style={{ ...(canContinueStep3 ? ctaStyle(accent) : ctaDisabledStyle(accent)), flex: 1 }}>
                {phase ? 'Continuer →' : 'Choisis une phase'}
              </button>
            </div>
          </div>
        )}

        {step === 4 && cycleMode === 'none' && (
          <div className="lv3-rise" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: accent }}>TA VIBE</div>
            <h2 className="lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', margin: '10px 0 6px', lineHeight: 1.05 }}>
              Choisis l'énergie qui te <em style={{ color: accent }}>ressemble</em>
            </h2>
            <p style={{ fontSize: 13, color: LV3.ink3, marginBottom: 16 }}>Cette muse restera la tienne — modifiable à tout moment dans Cycle.</p>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
              {['mira', 'alya', 'sora', 'lina'].map(k => {
                const M = MUSES[k];
                const isA = fixedMuse === k;
                return (
                  <button key={k} onClick={() => setFixedMuse(k)} style={{
                    display: 'flex', gap: 14, alignItems: 'center', padding: '12px 14px', borderRadius: 18, cursor: 'pointer', textAlign: 'left', border: 'none',
                    background: isA ? `${M.palette.accent}1F` : 'rgba(255,255,255,0.04)',
                    outline: `1px solid ${isA ? M.palette.accent : LV3.glassLine}`, fontFamily: 'Manrope, sans-serif',
                  }}>
                    <MuseAvatar muse={k} size={52} ring={isA} />
                    <div style={{ flex: 1 }}>
                      <div className="lv3-serif" style={{ fontSize: 20, fontStyle: 'italic', lineHeight: 1, color: isA ? M.palette.accent : LV3.ink }}>
                        {M.name.slice(0, 1) + M.name.slice(1).toLowerCase()} <span style={{ fontSize: 12, color: LV3.ink3 }}>· {M.tag}</span>
                      </div>
                      <div style={{ fontSize: 11, color: LV3.ink2, marginTop: 4 }}>{M.energy}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={back} style={{ padding: '16px 20px', borderRadius: 99, border: `1px solid ${LV3.glassLine}`, background: 'transparent', color: LV3.ink2, fontFamily: 'Manrope, sans-serif', fontSize: 13, cursor: 'pointer' }}>←</button>
              <button onClick={canContinueStep3 ? next : undefined} className={canContinueStep3 ? 'lv3-fab' : ''} style={{ ...(canContinueStep3 ? ctaStyle(accent) : ctaDisabledStyle(accent)), flex: 1 }}>
                {fixedMuse ? 'Continuer →' : 'Choisis une muse'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 — Prénom + mensurations de départ + finish */}
        {step === 5 && (
          <div className="lv3-rise" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 14px' }}>
              <ExoPose pose={{ image: muse.img ? muse.img.replace('portrait', 'head') : muse.head, muse: activeMuseKey || 'lina', cadence: 'breathe', objectPosition: 'center 16%', name: '' }} aspectRatio="1" round={999} showArrow={false} showCredit={false} style={{ width: 90, height: 90 }} />
            </div>
            <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: accent, textAlign: 'center' }}>
              {muse.name} T'ACCOMPAGNE
            </div>
            <h2 className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', margin: '10px 0 14px', lineHeight: 1, textAlign: 'center' }}>
              On t'appelle <em style={{ color: accent }}>comment</em> ?
            </h2>
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ton prénom"
                style={{
                  width: '100%', padding: '15px 18px', borderRadius: 16, marginBottom: 14, boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
                  color: LV3.ink, fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 20,
                  textAlign: 'center', outline: 'none',
                }}
              />
              <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.14em', color: LV3.ink3, marginBottom: 8, textAlign: 'center' }}>
                POUR UN PROGRAMME SUR MESURE · OPTIONNEL
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { v: heightInput, set: setHeightInput, ph: 'Taille (cm)' },
                  { v: weightInput, set: setWeightInput, ph: 'Poids (kg)' },
                  { v: birthYearInput, set: setBirthYearInput, ph: 'Année naissance' },
                ].map((f, i) => (
                  <input key={i} value={f.v} onChange={e => f.set(e.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" placeholder={f.ph} style={{
                    flex: 1, minWidth: 0, padding: '12px 8px', borderRadius: 14, textAlign: 'center', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
                    color: LV3.ink, fontFamily: 'Manrope, sans-serif', fontSize: 12.5, outline: 'none',
                  }} />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={back} style={{ padding: '16px 20px', borderRadius: 99, border: `1px solid ${LV3.glassLine}`, background: 'transparent', color: LV3.ink2, fontFamily: 'Manrope, sans-serif', fontSize: 13, cursor: 'pointer' }}>←</button>
              <button onClick={next} className="lv3-fab" style={{ ...ctaStyle(accent), flex: 1 }}>
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* STEP 6 — Équipement + limitations physiques */}
        {step === 6 && (
          <div className="lv3-rise" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: accent }}>TON ENTRAÎNEMENT</div>
            <h2 className="lv3-serif" style={{ fontSize: 28, fontStyle: 'italic', margin: '10px 0 6px', lineHeight: 1.05 }}>
              Où t'<em style={{ color: accent }}>entraînes</em>-tu ?
            </h2>
            <p style={{ fontSize: 13, color: LV3.ink3, marginBottom: 16 }}>Modifiable à tout moment dans Réglages.</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
              {[{ k: 'home', l: 'Maison', s: 'Poids du corps & kettlebell' }, { k: 'gym', l: 'Salle', s: 'Machines & charges libres' }].map(o => {
                const isA = equipment === o.k;
                return (
                  <button key={o.k} onClick={() => setEquipment(o.k)} style={{
                    flex: 1, padding: '16px 14px', borderRadius: 18, cursor: 'pointer', textAlign: 'left', border: 'none',
                    background: isA ? `${accent}1F` : 'rgba(255,255,255,0.04)',
                    outline: `1px solid ${isA ? accent : LV3.glassLine}`, fontFamily: 'Manrope, sans-serif',
                  }}>
                    <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', color: isA ? accent : LV3.ink }}>{o.l}</div>
                    <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 4, lineHeight: 1.4 }}>{o.s}</div>
                  </button>
                );
              })}
            </div>
            <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.14em', color: LV3.ink3, marginBottom: 10 }}>
              LIMITATIONS PHYSIQUES · OPTIONNEL
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {INJURY_TAGS.map(t => {
                const isA = injuriesSel.includes(t.k);
                return (
                  <button key={t.k} onClick={() => toggleInjury(t.k)} aria-pressed={isA} style={{
                    padding: '10px 16px', borderRadius: 99, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                    background: isA ? `${LV3.rose}26` : 'rgba(255,255,255,0.04)',
                    color: isA ? LV3.rose : LV3.ink2, fontSize: 13, fontWeight: isA ? 600 : 400,
                    outline: `1px solid ${isA ? LV3.rose : LV3.glassLine}`,
                  }}>{t.l}</button>
                );
              })}
            </div>
            <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 10, lineHeight: 1.6 }}>
              On adapte les exos à risque avec des variantes douces.
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={back} style={{ padding: '16px 20px', borderRadius: 99, border: `1px solid ${LV3.glassLine}`, background: 'transparent', color: LV3.ink2, fontFamily: 'Manrope, sans-serif', fontSize: 13, cursor: 'pointer' }}>←</button>
              <button onClick={finish} className="lv3-fab" style={{ ...ctaStyle(accent), flex: 1 }}>
                Voir mon programme ✨
              </button>
            </div>
          </div>
        )}
      </div>
      <HomeBar />
    </div>
  );
}
