import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav, luneBack, GOALS } from '../store/luneStore';
import { WarmAurora, Glass, CycleRingV3 } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { MuseAvatar } from '../components/MuseAvatar';
import { navBtnStyle } from '../utils/format';
import { computeNutritionTarget } from '../utils/nutrition';

function Stat({ v, l, sub, c }) {
  return (
    <Glass tight style={{ flex: 1, padding: '16px 14px' }}>
      <div className="lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', lineHeight: 1, color: c || LV3.ink }}>{v}</div>
      <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.10em', color: LV3.ink3, marginTop: 6 }}>{l.toUpperCase()}</div>
      {sub && <div className="lv3-mono" style={{ fontSize: 9, color: c || LV3.ink3, marginTop: 3 }}>{sub}</div>}
    </Glass>
  );
}

export function Bilan() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const goal = computeNutritionTarget(s, s.goal || 'global', GOALS[s.goal] || GOALS.global);

  // Agrégats
  const acts = s.activityLog || [];
  const actMin = acts.reduce((a, x) => a + (x.min || 0), 0);
  const actKcal = acts.reduce((a, x) => a + (x.kcal || 0), 0);
  const meals = s.mealLog || [];
  const kcalToday = meals.reduce((a, x) => a + (x.kcal || 0), 0);
  const sessionDone = Object.values(s.workoutDone || {}).filter(arr => arr && arr.every(Boolean) && arr.length).length;
  const photos = (s.photos || []).length;
  const steps = s.healthConnected ? s.health.steps : null;

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
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>BILAN · CETTE SEMAINE</div>
          <h1 className="lv3-serif" style={{ fontSize: 34, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Ton <em style={{ color: m.palette.accent }}>tableau de bord</em>
          </h1>
        </div>

        {/* Cycle band */}
        <div style={{ padding: '18px 16px 8px' }}>
          <Glass style={{ padding: '16px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
            {s.cycleMode === 'none' ? <MuseAvatar muse={muse} size={58} ring /> : <CycleRingV3 size={58} day={s.cycleDay} phase={activePhase(s)} />}
            <div style={{ flex: 1 }}>
              <div style={lv3Label}>Phase · {m.phaseLabel}</div>
              <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', marginTop: 3, lineHeight: 1.3 }}>
                {m.energy}. Programme adapté à <em style={{ color: m.palette.accent }}>{m.name}</em>.
              </div>
            </div>
          </Glass>
        </div>

        {/* Stats grid */}
        <div style={{ padding: '0 16px 8px', display: 'flex', gap: 8 }}>
          <Stat v={sessionDone} l="Exos finis" c={m.palette.accent} />
          <Stat v={acts.length} l="Activités" sub={`${actMin} min`} c={LV3.sage} />
          <Stat v={steps != null ? (steps / 1000).toFixed(1) + 'k' : '—'} l="Pas (Santé)" c={LV3.peach} />
        </div>
        <div style={{ padding: '0 16px 8px', display: 'flex', gap: 8 }}>
          <Stat v={kcalToday} l="Kcal mangées" sub={`cible ${goal.kcal}`} c={LV3.gold} />
          <Stat v={actKcal} l="Kcal dépensées" sub="activités" c={LV3.sage} />
          <Stat v={photos} l="Photos" c={LV3.lavender} />
        </div>

        {/* Energy balance */}
        <div style={{ padding: '8px 16px 8px' }}>
          <Glass tight style={{ padding: '16px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span style={lv3Label}>Équilibre énergétique</span>
              <span className="lv3-mono" style={{ fontSize: 10, color: m.palette.accent }}>{kcalToday - actKcal} kcal net</span>
            </div>
            <div style={{ display: 'flex', height: 10, borderRadius: 99, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
              <div style={{ width: `${Math.min(100, (kcalToday / (goal.kcal * 1.4)) * 100)}%`, background: LV3.gold }} />
              <div style={{ width: `${Math.min(100, (actKcal / (goal.kcal * 1.4)) * 100)}%`, background: LV3.sage }} />
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
              <span className="lv3-mono" style={{ fontSize: 9.5, color: LV3.gold }}>● Entrées {kcalToday}</span>
              <span className="lv3-mono" style={{ fontSize: 9.5, color: LV3.sage }}>● Sorties {actKcal}</span>
            </div>
          </Glass>
        </div>

        {/* Activities log */}
        <div style={{ padding: '8px 16px 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: '.20em', textTransform: 'uppercase', color: LV3.ink3, margin: '4px 4px 10px' }}>Activités enregistrées</div>
          <Glass tight style={{ padding: acts.length ? '4px 4px' : '18px' }}>
            {acts.length === 0
              ? <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', color: LV3.ink3, textAlign: 'center' }}>Aucune activité encore. Ajoute-en une depuis l'accueil.</div>
              : acts.slice().reverse().map((a, i) => (
                <div key={a.id} style={{ padding: '12px 12px', display: 'flex', alignItems: 'center', gap: 13, borderBottom: i < acts.length - 1 ? `1px solid ${LV3.faint}` : 'none' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: `${LV3.sage}1F`, color: LV3.sage, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }} aria-hidden="true">{a.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: LV3.ink, fontWeight: 500 }}>{a.type}</div>
                    <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 1 }}>{a.min} min · {a.intensity}</div>
                  </div>
                  <div className="lv3-mono" style={{ fontSize: 11, color: LV3.sage }}>{a.kcal} kcal</div>
                </div>
              ))}
          </Glass>
        </div>

        {/* Health hint */}
        {!s.healthConnected && (
          <div style={{ padding: '4px 16px 16px' }}>
            <Glass onClick={() => luneNav('health')} style={{ padding: '16px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, background: `linear-gradient(135deg, ${LV3.rose}16, ${m.palette.accent}08)` }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${LV3.rose}26`, color: LV3.rose, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }} aria-hidden="true">♥</div>
              <div style={{ flex: 1 }}>
                <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic' }}>Connecte Apple Santé</div>
                <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 2 }}>Pas, sommeil, tension, cycle — interconnectés</div>
              </div>
              <span className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', color: m.palette.accent }}>→</span>
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
