import { useState } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, GOALS } from '../store/luneStore';
import { recommendedRecipes } from '../data/recipes';
import { isRecipeSafe } from '../data/diet';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { RecipeIllustration } from '../components/RecipeIllustration';

export function Recipes() {
  const st = useLune();
  const phase = activePhase(st);
  const muse = PHASE_TO_MUSE[phase];
  const m = MUSES[muse];
  const goal = st.goal || 'global';
  const [phaseOnly, setPhaseOnly] = useState(true);

  const saved = new Set(st.savedRecipes || []);
  const toggleSave = (id, e) => {
    e.stopPropagation();
    LuneStore.set(s => {
      const n = new Set(s.savedRecipes || []);
      n.has(id) ? n.delete(id) : n.add(id);
      return { savedRecipes: [...n] };
    });
  };
  const openRecipe = (id) => { LuneStore.set({ activeRecipe: id }); luneNav('recipe'); };

  let list = recommendedRecipes(phase, goal).filter(r => isRecipeSafe(r, st.allergies, st.dietPrefs));
  const excludedCount = recommendedRecipes(phase, goal).length - list.length;
  if (phaseOnly) list = list.filter(r => r.phases.includes(phase));

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />
      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: LV3.ink3 }}>IDÉES RECETTES</div>
            <div className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', marginTop: 4, lineHeight: 1 }}>
              Pour <em style={{ color: m.palette.accent }}>toi</em>, aujourd'hui
            </div>
          </div>
          <Glass tight pill style={{ padding: '8px 14px', cursor: 'pointer' }} onClick={() => luneNav('nutrition')}>
            <span className="lv3-mono" style={{ fontSize: 10, color: LV3.ink2 }}>← Nutrition</span>
          </Glass>
        </div>

        {/* Goal selector */}
        <div style={{ padding: '16px 18px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Mon objectif</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.entries(GOALS).map(([k, g]) => {
              const isA = k === goal;
              return (
                <button key={k} onClick={() => LuneStore.set({ goal: k })} style={{
                  padding: '8px 14px', borderRadius: 99, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                  background: isA ? `${m.palette.accent}26` : 'rgba(255,255,255,0.04)',
                  color: isA ? m.palette.accent : LV3.ink2, fontSize: 12, fontWeight: isA ? 600 : 400,
                  outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                }}>{g.label}</button>
              );
            })}
          </div>
        </div>

        {/* Phase filter */}
        <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', color: LV3.ink2 }}>
            Adaptées à ma phase <em style={{ color: m.palette.accent }}>({m.phaseLabel.toLowerCase()})</em>
          </div>
          <button onClick={() => setPhaseOnly(v => !v)} style={{
            width: 44, height: 26, borderRadius: 99, border: 'none', cursor: 'pointer', position: 'relative',
            background: phaseOnly ? m.palette.accent : 'rgba(255,255,255,0.10)', transition: 'background .2s',
          }}>
            <span style={{ position: 'absolute', top: 3, left: phaseOnly ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
          </button>
        </div>

        {excludedCount > 0 && (
          <div style={{ padding: '10px 18px 0' }}>
            <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3 }}>
              {excludedCount} recette{excludedCount > 1 ? 's' : ''} masquée{excludedCount > 1 ? 's' : ''} · régime & allergies
            </div>
          </div>
        )}

        {/* List */}
        <div style={{ padding: '14px 18px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map(r => {
            const isPhase = r.phases.includes(phase);
            const isGoal = r.goals.includes(goal);
            const rMuse = MUSES[PHASE_TO_MUSE[r.phases[0]]];
            return (
              <Glass key={r.id} onClick={() => openRecipe(r.id)} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                  {/* Illustration maison (pas de fausse photo de plat) */}
                  <div style={{ width: 92, flexShrink: 0, background: `linear-gradient(150deg, ${rMuse.palette.accent}44, ${rMuse.palette.base})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <RecipeIllustration visual={r.visual} color={rMuse.palette.accent} size={48} />
                  </div>
                  <div style={{ flex: 1, padding: '13px 14px', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.05 }}>{r.name}</div>
                      <button onClick={(e) => toggleSave(r.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: saved.has(r.id) ? m.palette.accent : LV3.ink3, flexShrink: 0, padding: 0 }}>
                        {saved.has(r.id) ? '♥' : '♡'}
                      </button>
                    </div>
                    <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 5 }}>{r.kcal} kcal · {r.p}P · {r.c}G · {r.f}L · {r.time} min</div>
                    <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                      {isPhase && <span className="lv3-mono" style={{ fontSize: 8, letterSpacing: '.08em', padding: '3px 7px', borderRadius: 99, background: `${m.palette.accent}22`, color: m.palette.accent }}>TA PHASE</span>}
                      {isGoal && <span className="lv3-mono" style={{ fontSize: 8, letterSpacing: '.08em', padding: '3px 7px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', color: LV3.ink2 }}>{GOALS[goal].short.toUpperCase()}</span>}
                      {r.tags.slice(0, 1).map((t, i) => <span key={i} className="lv3-mono" style={{ fontSize: 8, letterSpacing: '.06em', padding: '3px 7px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', color: LV3.ink3 }}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </Glass>
            );
          })}
          {list.length === 0 && (
            <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', color: LV3.ink3, textAlign: 'center', padding: '30px 0' }}>
              Aucune recette pour ce filtre — désactive « ma phase » pour tout voir.
            </div>
          )}
        </div>

        <div style={{ height: 96 }} />
      </div>

      <LV3TabBar active="nutrition" muse={muse} />
      <HomeBar />
    </div>
  );
}
