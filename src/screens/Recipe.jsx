import { LV3, lv3Phone, lv3Label } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { RECIPES } from '../data/recipes';
import { useLune, LuneStore, luneNav, luneBack } from '../store/luneStore';
import { Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';

export function Recipe() {
  const st = useLune();
  const recipe = RECIPES.find(r => r.id === st.activeRecipe) || RECIPES[0];
  const m = MUSES[PHASE_TO_MUSE[recipe.phases[0]]];
  const saved = (st.savedRecipes || []).includes(recipe.id);
  const toggleSave = () => LuneStore.set(s => {
    const n = new Set(s.savedRecipes || []);
    n.has(recipe.id) ? n.delete(recipe.id) : n.add(recipe.id);
    return { savedRecipes: [...n] };
  });
  const logToJournal = () => {
    const fmtTime = () => { const d = new Date(); return `${d.getHours()}h${String(d.getMinutes()).padStart(2, '0')}`; };
    LuneStore.set(s => ({ mealLog: [...(s.mealLog || []), { id: 'm' + Date.now(), time: fmtTime(), name: recipe.name, kcal: recipe.kcal, p: recipe.p, c: recipe.c, f: recipe.f }] }));
    luneNav('nutrition');
  };
  const phaseLabels = recipe.phases.map(p => MUSES[PHASE_TO_MUSE[p]].phaseLabel).join(' · ');

  return (
    <div style={lv3Phone(PHASE_TO_MUSE[recipe.phases[0]])}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', background: LV3.bg }}>
        {/* Hero — gradient glyph (pas de fausse photo de plat) */}
        <div style={{ position: 'relative', height: 300, background: `linear-gradient(155deg, ${m.palette.accent}55, ${m.palette.base} 75%)`, overflow: 'hidden' }}>
          <div className="lv3-grain"></div>
          <div className="lv3-glow" style={{ position: 'absolute', top: '-20%', right: '-15%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${m.palette.glow}, transparent 65%)`, filter: 'blur(20px)' }} />
          <span className="lv3-serif lv3-bob" style={{ position: 'absolute', top: 70, left: '50%', transform: 'translateX(-50%)', fontSize: 120, fontStyle: 'italic', color: m.palette.accent, opacity: .85, lineHeight: 1 }}>{recipe.glyph}</span>

          <PhoneStatus dark={true} />

          <div style={{ position: 'absolute', top: 48, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
            <Glass tight pill onClick={() => luneBack() || luneNav('recipes')} style={{ padding: '8px 14px', cursor: 'pointer' }}>
              <span className="lv3-mono" style={{ fontSize: 10, color: '#fff' }}>← Retour</span>
            </Glass>
            <Glass tight pill onClick={toggleSave} style={{ padding: '8px 12px', display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: 13, color: m.palette.accent }}>{saved ? '♥' : '♡'}</span>
              <span className="lv3-mono" style={{ fontSize: 10, color: '#fff' }}>{saved ? 'Enregistrée' : 'Save'}</span>
            </Glass>
          </div>

          <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18 }}>
            <div className="lv3-mono" style={{ fontSize: 9.5, color: m.palette.accent, letterSpacing: '.18em' }}>{phaseLabels.toUpperCase()}</div>
            <div className="lv3-serif" style={{ fontSize: 34, fontStyle: 'italic', color: '#fff', marginTop: 6, lineHeight: .98, textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}>
              {recipe.name}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ padding: '12px 18px 0', display: 'flex', gap: 8 }}>
          {[
            { l: 'KCAL', v: String(recipe.kcal) },
            { l: 'PROT', v: recipe.p + ' g' },
            { l: 'GLUC', v: recipe.c + ' g' },
            { l: 'LIP', v: recipe.f + ' g' },
            { l: 'PRÉPA', v: recipe.time + ' min' },
          ].map((s, i) => (
            <Glass tight key={i} style={{ flex: 1, padding: '10px 6px', textAlign: 'center' }}>
              <div className="lv3-mono" style={{ fontSize: 8.5, color: LV3.ink3, letterSpacing: '.12em' }}>{s.l}</div>
              <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', marginTop: 2 }}>{s.v}</div>
            </Glass>
          ))}
        </div>

        {/* Why this recipe */}
        <div style={{ padding: '14px 18px 0' }}>
          <Glass tight style={{ padding: '12px 14px', background: `linear-gradient(135deg, ${m.palette.accent}14, ${LV3.rose}06)`, borderLeft: `2px solid ${m.palette.accent}` }}>
            <div className="lv3-serif" style={{ fontSize: 14.5, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.45 }}>{recipe.blurb}</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
              {recipe.tags.map((t, i) => <span key={i} className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.06em', padding: '4px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', color: LV3.ink2 }}>{t}</span>)}
            </div>
          </Glass>
        </div>

        {/* Ingredients */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Ingrédients · 1 portion</div>
          <Glass tight style={{ padding: '4px 4px' }}>
            {recipe.ingredients.map((ing, i) => (
              <div key={i} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < recipe.ingredients.length - 1 ? `1px solid ${LV3.faint}` : 'none' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.palette.accent }} />
                <span style={{ fontSize: 13, color: LV3.ink, flex: 1 }}>{ing.i}</span>
                <span className="lv3-mono" style={{ fontSize: 10.5, color: LV3.ink3 }}>{ing.q}</span>
              </div>
            ))}
          </Glass>
        </div>

        {/* Steps */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Préparation · {recipe.time} min</div>
          {recipe.steps.map((stp, i) => (
            <Glass tight key={i} style={{ padding: '12px 14px', marginBottom: 8, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div className="lv3-serif" style={{ fontSize: 24, fontStyle: 'italic', color: m.palette.accent, lineHeight: .9, minWidth: 32 }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ flex: 1 }}>
                <div className="lv3-mono" style={{ fontSize: 9, color: m.palette.accent, letterSpacing: '.12em' }}>{stp.t.toUpperCase()}</div>
                <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', color: LV3.ink, marginTop: 4, lineHeight: 1.4 }}>{stp.s}</div>
              </div>
            </Glass>
          ))}
        </div>

        {/* CTA — log to meal journal */}
        <div style={{ padding: '14px 18px 22px' }}>
          <button onClick={logToJournal} className="lv3-fab" style={{
            width: '100%', padding: '16px 22px', borderRadius: 99, border: 'none',
            background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
            color: '#231016', fontWeight: 600, fontSize: 13, letterSpacing: '.08em', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            Enregistrer dans mon journal
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>→</span>
          </button>
        </div>

        <div style={{ height: 30 }} />
      </div>

      <HomeBar />
    </div>
  );
}
