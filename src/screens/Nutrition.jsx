import { useState } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, GOALS, FOODS_BY_PHASE } from '../store/luneStore';
import { RECIPES } from '../data/recipes';
import { WarmAurora, Glass, RingProgress } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { AddMealSheet } from '../components/AddMealSheet';
import { computeNutritionTarget } from '../utils/nutrition';

export function Nutrition() {
  const st = useLune();
  const muse = PHASE_TO_MUSE[activePhase(st)];
  const m = MUSES[muse];
  const goalDef = GOALS[st.goal] || GOALS.global;
  const target = computeNutritionTarget(st, st.goal || 'global', goalDef);
  const log = st.mealLog || [];
  const [sheetOpen, setSheetOpen] = useState(false);

  // Totaux du jour à partir des repas réellement enregistrés
  const tot = log.reduce((a, x) => ({ kcal: a.kcal + (x.kcal || 0), p: a.p + (x.p || 0), c: a.c + (x.c || 0), f: a.f + (x.f || 0) }), { kcal: 0, p: 0, c: 0, f: 0 });
  const goals = { p: target.p, c: target.c, f: target.f, k: target.kcal };
  const removeMeal = (id, name) => {
    if (!confirm(`Supprimer « ${name} » de ton journal ?`)) return;
    LuneStore.set(s => ({ mealLog: (s.mealLog || []).filter(x => x.id !== id) }));
  };

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />

      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: LV3.ink3 }}>NUTRITION · AUJOURD'HUI</div>
            <div className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', marginTop: 4, lineHeight: 1 }}>
              Tes <em style={{ color: m.palette.accent }}>macros</em>
            </div>
          </div>
          <Glass tight pill style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: m.palette.accent }} />
            <span className="lv3-mono" style={{ fontSize: 9, color: m.palette.accent, letterSpacing: '.12em' }}>{m.phaseLabel.toUpperCase()}{st.cycleMode !== 'none' ? ` · J${st.cycleDay}` : ''}</span>
          </Glass>
        </div>

        {/* Hero rings — kcal + macros (réels vs cible objectif) */}
        <div style={{ padding: '20px 16px 12px' }}>
          <Glass style={{ padding: '22px 18px' }}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <RingProgress size={120} value={Math.min(1, tot.kcal / goals.k)} color={m.palette.accent} width={7}>
                <div className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', lineHeight: .9, color: LV3.ink }}>{tot.kcal}</div>
                <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.18em', color: LV3.ink3, marginTop: 2 }}>/ {goals.k} kcal</div>
              </RingProgress>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { l: 'Protéines', v: tot.p, g: goals.p, c: m.palette.accent },
                  { l: 'Glucides', v: tot.c, g: goals.c, c: LV3.gold },
                  { l: 'Lipides', v: tot.f, g: goals.f, c: LV3.sage },
                ].map((macro, i) => {
                  const pct = Math.min(1, macro.v / macro.g);
                  return (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                        <span className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.10em', color: LV3.ink2 }}>{macro.l}</span>
                        <span className="lv3-mono" style={{ fontSize: 10, color: LV3.ink2 }}>
                          <strong style={{ color: LV3.ink }}>{macro.v}</strong> / {macro.g} g
                        </span>
                      </div>
                      <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ width: `${pct * 100}%`, height: '100%', background: macro.c, borderRadius: 99, transition: 'width .6s' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Objectif courant */}
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${LV3.faint}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.14em', color: LV3.ink3 }}>OBJECTIF</div>
                <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', marginTop: 2, color: LV3.ink }}>{goalDef.label}</div>
              </div>
              <button onClick={() => luneNav('recipes')} style={{ background: 'none', border: `1px solid ${LV3.glassLine2}`, borderRadius: 99, padding: '7px 13px', cursor: 'pointer', color: LV3.ink2, fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, letterSpacing: '.08em' }}>Changer ›</button>
            </div>
            <div className="lv3-mono" style={{ fontSize: 9, color: target.personalized ? m.palette.accent : LV3.ink3, marginTop: 10, lineHeight: 1.5 }}>
              {target.personalized
                ? 'Calcul sur mesure · taille, poids, âge & activité'
                : <>Estimation générique — <button onClick={() => luneNav('settings')} style={{ background: 'none', border: 'none', padding: 0, color: m.palette.accent, textDecorationLine: 'underline', cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9 }}>renseigne ton profil</button> pour un calcul sur mesure</>}
            </div>
          </Glass>
        </div>

        {/* Add meal CTA */}
        <div style={{ padding: '0 16px 14px' }}>
          <button onClick={() => setSheetOpen(true)} className="lv3-fab" style={{
            width: '100%', padding: '15px 18px', borderRadius: 99, border: 'none',
            background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
            color: '#231016', fontWeight: 600, fontSize: 13, letterSpacing: '.06em', cursor: 'pointer',
            fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Enregistrer un repas
          </button>
        </div>

        {/* Phase guidance */}
        <div style={{ padding: '0 16px 12px' }}>
          <Glass tight style={{ padding: '16px 16px', background: `linear-gradient(135deg, ${m.palette.accent}10, ${LV3.rose}06)`, borderLeft: `2px solid ${m.palette.accent}` }}>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: m.palette.accent }}>{m.name} · {m.phaseLabel.toUpperCase()}</div>
            <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', marginTop: 6, lineHeight: 1.4 }}>
              {m.food}
            </div>
          </Glass>
        </div>

        {/* Journal de repas (réels) */}
        <div style={{ padding: '4px 16px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, padding: '0 4px' }}>
            <div style={{ ...lv3Label, color: LV3.ink3 }}>Mon journal · {log.length} repas</div>
            <div className="lv3-mono" style={{ fontSize: 10, color: m.palette.accent }}>{tot.kcal} kcal</div>
          </div>
          {log.length === 0 ? (
            <Glass tight style={{ padding: '24px 18px', textAlign: 'center' }}>
              <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', color: LV3.ink2, lineHeight: 1.4 }}>
                Rien encore aujourd'hui.<br />Enregistre ton premier repas <em style={{ color: m.palette.accent }}>↑</em>
              </div>
            </Glass>
          ) : (
            <Glass tight style={{ padding: '4px 4px' }}>
              {log.map((meal, i) => (
                <div key={meal.id} style={{
                  padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 14,
                  borderBottom: i < log.length - 1 ? `1px solid ${LV3.faint}` : 'none',
                }}>
                  <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: '50%', background: `${m.palette.accent}1F`, color: m.palette.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 16 }}>✓</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="lv3-mono" style={{ fontSize: 9, color: m.palette.accent, letterSpacing: '.12em' }}>{(meal.time || '').toUpperCase()}</div>
                    <div style={{ fontSize: 13, color: LV3.ink, fontWeight: 500, marginTop: 2 }}>{meal.name}</div>
                    <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 3 }}>{meal.kcal} kcal · {meal.p}P · {meal.c}G · {meal.f}L</div>
                  </div>
                  <button onClick={() => removeMeal(meal.id, meal.name)} aria-label={`Supprimer ${meal.name}`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: LV3.ink3, fontSize: 16, padding: '4px 6px', flexShrink: 0 }}>×</button>
                </div>
              ))}
            </Glass>
          )}
        </div>

        {/* Phase-appropriate foods to add */}
        <div style={{ padding: '4px 16px 12px' }}>
          <Glass tight style={{ padding: '16px 14px' }}>
            <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 8, paddingLeft: 4 }}>
              <span>À glisser cette phase</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(FOODS_BY_PHASE[activePhase(st)] || []).map((f, i) => (
                <span key={i} style={{ padding: '7px 13px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine}`, fontSize: 11, color: LV3.ink2 }}>{f}</span>
              ))}
            </div>
          </Glass>
        </div>

        {/* Idées recettes — entrée vers la bibliothèque */}
        <div style={{ padding: '4px 16px 18px' }}>
          <Glass onClick={() => luneNav('recipes')} style={{ padding: '18px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, background: `linear-gradient(135deg, ${m.palette.accent}16, ${LV3.rose}08)` }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: `${m.palette.accent}26`, color: m.palette.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 24, flexShrink: 0 }}>❉</div>
            <div style={{ flex: 1 }}>
              <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: m.palette.accent }}>IDÉES RECETTES</div>
              <div className="lv3-serif" style={{ fontSize: 19, fontStyle: 'italic', marginTop: 3, lineHeight: 1.1 }}>
                Personnalisées <em style={{ color: m.palette.accent }}>phase + objectif</em>
              </div>
              <div style={{ fontSize: 11, color: LV3.ink3, marginTop: 4 }}>{RECIPES.filter(r => r.phases.includes(activePhase(st))).length} recettes pour {m.phaseLabel.toLowerCase()}</div>
            </div>
            <span className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', color: m.palette.accent }}>→</span>
          </Glass>
        </div>

        <div style={{ height: 100 }} />
      </div>

      <AddMealSheet open={sheetOpen} onClose={() => setSheetOpen(false)} accent={m.palette.accent} />

      <LV3TabBar active="nutrition" muse={muse} />
      <HomeBar />
    </div>
  );
}
