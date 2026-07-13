import { useState } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, cycleDayFromDate, luneNav, luneBack, GOALS } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { MuseAvatar } from '../components/MuseAvatar';
import { navBtnStyle } from '../utils/format';
import { requestNotifPermission, notify, notifSupported } from '../utils/notifications';
import { DIETS, ALLERGENS } from '../data/diet';
import { computeNutritionTarget, ACTIVITY_LEVELS } from '../utils/nutrition';
import { INJURY_TAGS } from '../data/poses';
import { kgToDisplay, displayToKg, cmToDisplay, displayToCm, weightUnitLabel, heightUnitLabel } from '../utils/units';

const WEEKDAYS = [
  { d: 1, l: 'L' }, { d: 2, l: 'M' }, { d: 3, l: 'M' }, { d: 4, l: 'J' },
  { d: 5, l: 'V' }, { d: 6, l: 'S' }, { d: 0, l: 'D' },
];

export function Settings() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const [notifMsg, setNotifMsg] = useState('');
  const [exported, setExported] = useState(false);

  const setField = (k, v) => LuneStore.set({ [k]: v });
  const exportData = () => {
    const blob = new Blob([JSON.stringify(LuneStore.get(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `lune-mes-donnees-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 1800);
  };
  const deleteAllData = () => {
    if (!confirm('Supprimer définitivement toutes tes données (cycle, mesures, photos, journal, recettes…) ? Cette action est irréversible.')) return;
    LuneStore.reset();
  };
  const toggleNotif = async (key) => {
    const turningOn = !s[key];
    if (turningOn) {
      if (!notifSupported()) { setNotifMsg('Ton navigateur ne supporte pas les notifications.'); return; }
      const perm = await requestNotifPermission();
      if (perm !== 'granted') { setNotifMsg('Autorise les notifications dans les réglages de ton navigateur pour activer ce rappel.'); return; }
      setNotifMsg('');
      notify('Lune', key === 'notifTrain'
        ? 'Rappel de séance activé ✓ Un mot doux chaque matin.'
        : `Rappel de phase activé ✓ Tu seras prévenue quand ${m.name} passera le relais.`);
    }
    setField(key, turningOn);
  };
  const testReminder = () => notify(`${m.name} · ${m.phaseLabel}`, `« ${m.quote} »`);
  const toggleTag = (field, k) => LuneStore.set(st => {
    const n = new Set(st[field] || []);
    n.has(k) ? n.delete(k) : n.add(k);
    return { [field]: [...n] };
  });
  const toggleDay = (d) => LuneStore.set(st => {
    const n = new Set(st.preferredTrainingDays || []);
    n.has(d) ? n.delete(d) : n.add(d);
    return { preferredTrainingDays: [...n] };
  });
  const onPeriodChange = (val) => {
    const day = cycleDayFromDate(val, s.cycleLength);
    LuneStore.set({ lastPeriod: val, ...(day ? { cycleDay: day } : {}) });
  };
  const onLenChange = (val) => {
    const len = Number(val) || 28;
    const day = cycleDayFromDate(s.lastPeriod, len);
    LuneStore.set({ cycleLength: len, ...(day ? { cycleDay: day } : {}) });
  };

  const fieldWrap = { padding: '14px 16px', borderBottom: `1px solid ${LV3.faint}` };
  const labelStyle = { ...lv3Label, fontSize: 9, color: LV3.ink3, marginBottom: 8 };
  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 12, boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
    color: LV3.ink, fontFamily: 'Manrope, sans-serif', fontSize: 14, outline: 'none',
  };

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
        </div>

        <div style={{ padding: '16px 20px 4px' }}>
          <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: m.palette.accent }}>RÉGLAGES</div>
          <h1 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Ton <em style={{ color: m.palette.accent }}>programme</em>, à toi
          </h1>
        </div>

        {/* Prénom */}
        <div style={{ padding: '18px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Identité</div>
          <Glass tight style={{ padding: '2px 0' }}>
            <div style={fieldWrap}>
              <div style={labelStyle}>PRÉNOM</div>
              <input value={s.name === 'toi' ? '' : s.name} onChange={e => setField('name', e.target.value || 'toi')} placeholder="Ton prénom" style={inputStyle} aria-label="Prénom" />
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={labelStyle}>NOM <span style={{ opacity: .5 }}>(optionnel)</span></div>
              <input value={s.lastName || ''} onChange={e => setField('lastName', e.target.value)} placeholder="" style={inputStyle} aria-label="Nom de famille" />
            </div>
          </Glass>
        </div>

        {/* Cycle */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Mon cycle</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {[{ k: 'cycle', l: 'Cycle régulier' }, { k: 'none', l: 'Irrégulier, absent, contraception…' }].map(o => {
              const isA = (s.cycleMode || 'cycle') === o.k;
              return (
                <button key={o.k} onClick={() => setField('cycleMode', o.k)} aria-pressed={isA} style={{
                  flex: 1, padding: '10px 10px', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                  background: isA ? `${m.palette.accent}26` : 'rgba(255,255,255,0.04)',
                  color: isA ? m.palette.accent : LV3.ink2, fontSize: 11.5, fontWeight: isA ? 600 : 400,
                  outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                }}>{o.l}</button>
              );
            })}
          </div>

          {s.cycleMode === 'none' ? (
            <Glass tight style={{ padding: '14px 16px' }}>
              <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginBottom: 12, lineHeight: 1.5 }}>
                Choisis l'énergie qui te correspond le plus en ce moment — elle pilote ton programme, ta nutrition et le ton de l'app, sans dépendre d'un cycle.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {Object.values(MUSES).map(mu => {
                  const isA = s.fixedMuse === mu.key;
                  return (
                    <button key={mu.key} onClick={() => setField('fixedMuse', mu.key)} aria-pressed={isA} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px', borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                      background: isA ? `${mu.palette.accent}1F` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isA ? mu.palette.accent : LV3.glassLine}`, fontFamily: 'Manrope, sans-serif',
                    }}>
                      <MuseAvatar muse={mu.key} size={34} ring={isA} />
                      <div style={{ minWidth: 0 }}>
                        <div className="lv3-serif" style={{ fontSize: 14, fontStyle: 'italic', color: isA ? mu.palette.accent : LV3.ink, lineHeight: 1 }}>{mu.name.slice(0, 1) + mu.name.slice(1).toLowerCase()}</div>
                        <div className="lv3-mono" style={{ fontSize: 8, color: LV3.ink3, marginTop: 3 }}>{mu.tag}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Glass>
          ) : (
            <Glass tight style={{ padding: '2px 0' }}>
              <div style={fieldWrap}>
                <div style={labelStyle}>1ER JOUR DES DERNIÈRES RÈGLES</div>
                <input type="date" value={s.lastPeriod || ''} onChange={e => onPeriodChange(e.target.value)} style={inputStyle} aria-label="Date des dernières règles" />
                <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 8, lineHeight: 1.5 }}>
                  {s.lastPeriod
                    ? `Aujourd'hui : jour ${s.cycleDay} · ${m.phaseLabel}. Le cycle avance tout seul.`
                    : 'Renseigne-la pour que ton jour de cycle se calcule automatiquement.'}
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={labelStyle}>LONGUEUR DU CYCLE · {s.cycleLength} JOURS</div>
                <input type="range" min="21" max="35" value={s.cycleLength} onChange={e => onLenChange(e.target.value)} aria-label="Longueur du cycle en jours" style={{ width: '100%', accentColor: m.palette.accent }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3 }}>21</span>
                  <span className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3 }}>35</span>
                </div>
              </div>
            </Glass>
          )}
        </div>

        {/* Objectif */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Objectif</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(GOALS).map(([k, g]) => {
              const isA = k === s.goal;
              return (
                <button key={k} onClick={() => setField('goal', k)} aria-pressed={isA} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 16, cursor: 'pointer', textAlign: 'left',
                  background: isA ? `${m.palette.accent}1A` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`, fontFamily: 'Manrope, sans-serif',
                }}>
                  <div style={{ flex: 1 }}>
                    <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', color: isA ? m.palette.accent : LV3.ink, lineHeight: 1 }}>{g.label}</div>
                    <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 5 }}>{(() => { const t = computeNutritionTarget(s, k, g); return `${t.kcal} kcal · ${t.p}P / ${t.c}G / ${t.f}L`; })()}</div>
                  </div>
                  <span aria-hidden="true" style={{ color: isA ? m.palette.accent : LV3.ink3, fontSize: 13 }}>{isA ? '●' : '○'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calcul calorique & répartition des repas */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Calcul calorique</div>
          <Glass tight style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: s.kcalOverride ? 14 : 0 }}>
              {[{ k: false, l: 'Automatique' }, { k: true, l: 'Manuel' }].map(o => {
                const isA = !!s.kcalOverride === o.k;
                return (
                  <button key={String(o.k)} onClick={() => setField('kcalOverride', o.k ? (s.kcalOverride || 2000) : null)} aria-pressed={isA} style={{
                    flex: 1, padding: '10px 10px', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                    background: isA ? `${m.palette.accent}26` : 'rgba(255,255,255,0.04)',
                    color: isA ? m.palette.accent : LV3.ink2, fontSize: 12, fontWeight: isA ? 600 : 400,
                    outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                  }}>{o.l}</button>
                );
              })}
            </div>
            {s.kcalOverride ? (
              <>
                <div style={labelStyle}>CIBLE · KCAL / JOUR</div>
                <input type="number" inputMode="numeric" min="1200" step="50" value={s.kcalOverride}
                  onChange={e => setField('kcalOverride', Number(e.target.value) || 1200)}
                  style={inputStyle} aria-label="Cible calorique manuelle" />
                <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 8, lineHeight: 1.6 }}>
                  Les macros sont réparties selon les ratios de ton objectif.
                </div>
              </>
            ) : (
              <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, lineHeight: 1.6 }}>
                Calculé depuis taille, poids, âge et activité (Mifflin-St Jeor).
              </div>
            )}
          </Glass>
        </div>

        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Répartition des repas</div>
          <Glass tight style={{ padding: '14px 16px' }}>
            <div style={labelStyle}>REPAS PAR JOUR</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[3, 4, 5, 6].map(n => {
                const isA = (s.mealsPerDay || 4) === n;
                return (
                  <button key={n} onClick={() => setField('mealsPerDay', n)} aria-pressed={isA} style={{
                    flex: 1, padding: '10px 0', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                    background: isA ? `${m.palette.accent}26` : 'rgba(255,255,255,0.04)',
                    color: isA ? m.palette.accent : LV3.ink2, fontSize: 13, fontWeight: isA ? 600 : 400,
                    outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                  }}>{n}</button>
                );
              })}
            </div>
            <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 10, lineHeight: 1.6 }}>
              Affiche une suggestion par repas sur l'écran Nutrition.
            </div>
          </Glass>
        </div>

        {/* Entraînement — équipement, limitations, jours préférés */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Entraînement</div>
          <Glass tight style={{ padding: '14px 16px' }}>
            <div style={labelStyle}>ÉQUIPEMENT</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {[{ k: 'home', l: 'Maison' }, { k: 'gym', l: 'Salle' }].map(o => {
                const isA = (s.workoutEnv || 'home') === o.k;
                return (
                  <button key={o.k} onClick={() => setField('workoutEnv', o.k)} aria-pressed={isA} style={{
                    flex: 1, padding: '10px 10px', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                    background: isA ? `${m.palette.accent}26` : 'rgba(255,255,255,0.04)',
                    color: isA ? m.palette.accent : LV3.ink2, fontSize: 12, fontWeight: isA ? 600 : 400,
                    outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                  }}>{o.l}</button>
                );
              })}
            </div>

            <div style={labelStyle}>LIMITATIONS PHYSIQUES</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
              {INJURY_TAGS.map(t => {
                const isA = (s.injuries || []).includes(t.k);
                return (
                  <button key={t.k} onClick={() => toggleTag('injuries', t.k)} aria-pressed={isA} style={{
                    padding: '8px 14px', borderRadius: 99, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                    background: isA ? `${LV3.rose}26` : 'rgba(255,255,255,0.04)',
                    color: isA ? LV3.rose : LV3.ink2, fontSize: 12, fontWeight: isA ? 600 : 400,
                    outline: `1px solid ${isA ? LV3.rose : LV3.glassLine}`,
                  }}>{t.l}</button>
                );
              })}
            </div>
            <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginBottom: 16, lineHeight: 1.6 }}>
              Les exos à risque sont remplacés par des variantes douces dans ta séance.
            </div>

            <div style={labelStyle}>JOURS D'ENTRAÎNEMENT PRÉFÉRÉS</div>
            <div style={{ display: 'flex', gap: 5 }}>
              {WEEKDAYS.map(w => {
                const isA = (s.preferredTrainingDays || []).includes(w.d);
                return (
                  <button key={w.d} onClick={() => toggleDay(w.d)} aria-pressed={isA} aria-label={`Jour ${w.l}`} style={{
                    flex: 1, aspectRatio: '1', borderRadius: '50%', border: 'none', cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace",
                    background: isA ? `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})` : 'rgba(255,255,255,0.04)',
                    color: isA ? '#231016' : LV3.ink2, fontSize: 11, fontWeight: 600,
                    outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                  }}>{w.l}</button>
                );
              })}
            </div>
            <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 8, lineHeight: 1.6 }}>
              {(s.preferredTrainingDays || []).length
                ? 'Le programme suit tes jours choisis.'
                : 'Aucun jour choisi — le programme sélectionne automatiquement selon ta phase.'}
            </div>
          </Glass>
        </div>

        {/* Régime & allergies */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Régime & allergies</div>
          <Glass tight style={{ padding: '14px 16px' }}>
            <div style={labelStyle}>RÉGIME</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {DIETS.map(d => {
                const isA = (s.dietPrefs || []).includes(d.k);
                return (
                  <button key={d.k} onClick={() => toggleTag('dietPrefs', d.k)} aria-pressed={isA} style={{
                    padding: '8px 14px', borderRadius: 99, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                    background: isA ? `${m.palette.accent}26` : 'rgba(255,255,255,0.04)',
                    color: isA ? m.palette.accent : LV3.ink2, fontSize: 12, fontWeight: isA ? 600 : 400,
                    outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                  }}>{d.l}</button>
                );
              })}
            </div>
            <div style={labelStyle}>ALLERGIES · INTOLÉRANCES</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {ALLERGENS.map(a => {
                const isA = (s.allergies || []).includes(a.k);
                return (
                  <button key={a.k} onClick={() => toggleTag('allergies', a.k)} aria-pressed={isA} style={{
                    padding: '8px 14px', borderRadius: 99, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                    background: isA ? `${LV3.rose}26` : 'rgba(255,255,255,0.04)',
                    color: isA ? LV3.rose : LV3.ink2, fontSize: 12, fontWeight: isA ? 600 : 400,
                    outline: `1px solid ${isA ? LV3.rose : LV3.glassLine}`,
                  }}>{a.l}</button>
                );
              })}
            </div>
            <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 12, lineHeight: 1.6 }}>
              Recettes et courses s'adaptent automatiquement à tes choix.
            </div>
          </Glass>
        </div>

        {/* Profil corps */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Mon corps</div>
          <Glass tight style={{ padding: '2px 0' }}>
            <div style={fieldWrap}>
              <div style={labelStyle}>UNITÉS</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[{ k: 'metric', l: 'kg · cm' }, { k: 'imperial', l: 'lb · in' }].map(o => {
                  const isA = (s.units || 'metric') === o.k;
                  return (
                    <button key={o.k} onClick={() => setField('units', o.k)} aria-pressed={isA} style={{
                      flex: 1, padding: '9px 10px', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                      background: isA ? `${m.palette.accent}26` : 'rgba(255,255,255,0.04)',
                      color: isA ? m.palette.accent : LV3.ink2, fontSize: 12, fontWeight: isA ? 600 : 400,
                      outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                    }}>{o.l}</button>
                  );
                })}
              </div>
            </div>
            <div style={fieldWrap}>
              <div style={labelStyle}>TAILLE · {cmToDisplay(s.heightCm, s.units)} {heightUnitLabel(s.units)}</div>
              <input type="range" min={cmToDisplay(145, s.units)} max={cmToDisplay(195, s.units)}
                value={cmToDisplay(s.heightCm, s.units)}
                onChange={e => setField('heightCm', displayToCm(e.target.value, s.units))}
                aria-label="Taille" style={{ width: '100%', accentColor: m.palette.accent }} />
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={labelStyle}>POIDS DE DÉPART · {weightUnitLabel(s.units).toUpperCase()}</div>
              <input type="number" inputMode="decimal" value={kgToDisplay(s.startWeight, s.units)}
                onChange={e => setField('startWeight', displayToKg(e.target.value, s.units))}
                style={inputStyle} aria-label="Poids de départ" />
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={labelStyle}>ANNÉE DE NAISSANCE</div>
              <input type="number" inputMode="numeric" placeholder="ex : 1994" value={s.birthYear || ''} onChange={e => setField('birthYear', e.target.value ? Number(e.target.value) : null)} style={inputStyle} aria-label="Année de naissance" />
              <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 6 }}>Sert uniquement au calcul de tes besoins caloriques réels.</div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={labelStyle}>NIVEAU D'ACTIVITÉ</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {ACTIVITY_LEVELS.map(a => {
                  const isA = (s.activityLevel || 'modere') === a.k;
                  return (
                    <button key={a.k} onClick={() => setField('activityLevel', a.k)} aria-pressed={isA} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                      background: isA ? `${m.palette.accent}1A` : 'rgba(255,255,255,0.03)', border: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`, fontFamily: 'Manrope, sans-serif',
                    }}>
                      <span style={{ fontSize: 12.5, color: isA ? m.palette.accent : LV3.ink }}>{a.l}</span>
                      <span className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3 }}>{a.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Glass>
        </div>

        {/* Notifications */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Rappels</div>
          <Glass tight style={{ padding: '2px 0' }}>
            {[
              { k: 'notifTrain', l: 'Séance du jour', s: 'Un rappel doux le matin' },
              { k: 'notifCycle', l: 'Changement de phase', s: 'Quand ta muse change' },
            ].map((r, i) => (
              <div key={r.k} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: i < 1 ? `1px solid ${LV3.faint}` : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, color: LV3.ink, fontWeight: 500 }}>{r.l}</div>
                  <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 2 }}>{r.s}</div>
                </div>
                <button onClick={() => toggleNotif(r.k)} role="switch" aria-checked={!!s[r.k]} aria-label={r.l} style={{
                  width: 46, height: 28, borderRadius: 99, border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0,
                  background: s[r.k] ? m.palette.accent : 'rgba(255,255,255,0.12)', transition: 'background .2s',
                }}>
                  <span style={{ position: 'absolute', top: 3, left: s[r.k] ? 21 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
                </button>
              </div>
            ))}
          </Glass>
          {notifMsg && <div role="alert" style={{ fontSize: 11.5, color: LV3.rose, marginTop: 10, lineHeight: 1.5 }}>{notifMsg}</div>}
          {(s.notifTrain || s.notifCycle) && (
            <button onClick={testReminder} style={{
              width: '100%', marginTop: 10, padding: '12px', borderRadius: 14, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontSize: 12,
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${LV3.glassLine}`, color: m.palette.accent, letterSpacing: '.02em',
            }}>Tester un rappel</button>
          )}
        </div>

        {/* Data / reset */}
        <div style={{ padding: '16px 16px 20px' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Données</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={exportData} style={{
              width: '100%', padding: '14px', borderRadius: 16, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontSize: 12.5,
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${LV3.glassLine}`, color: LV3.ink2, letterSpacing: '.02em',
            }}>{exported ? 'Téléchargé ✓' : '⇩ Exporter toutes mes données (JSON)'}</button>

            <button onClick={() => { if (confirm('Réinitialiser le programme et revoir l\'introduction ?')) { LuneStore.set({ onboarded: false }); luneNav('today'); } }} style={{
              width: '100%', padding: '14px', borderRadius: 16, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontSize: 12.5,
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${LV3.glassLine}`, color: LV3.ink2, letterSpacing: '.02em',
            }}>↺ Revoir l'introduction</button>

            <button onClick={deleteAllData} style={{
              width: '100%', padding: '14px', borderRadius: 16, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontSize: 12.5,
              background: 'transparent', border: `1px solid ${LV3.rose}66`, color: LV3.rose, letterSpacing: '.02em',
            }}>⌫ Supprimer définitivement toutes mes données</button>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
            <button onClick={() => luneNav('privacy')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: LV3.ink3, fontSize: 10.5, textDecorationLine: 'underline', fontFamily: 'Manrope, sans-serif' }}>Confidentialité</button>
            <span style={{ color: LV3.ink3, fontSize: 10.5 }}>·</span>
            <button onClick={() => luneNav('terms')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: LV3.ink3, fontSize: 10.5, textDecorationLine: 'underline', fontFamily: 'Manrope, sans-serif' }}>CGU</button>
          </div>

          <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
            Toutes tes données restent sur cet appareil.<br />Lune ne les envoie jamais ailleurs.
          </div>
        </div>

        <div style={{ height: 96 }} />
      </div>

      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
