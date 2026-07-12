import { useState } from 'react';
import { LV3, lv3Label } from '../theme/tokens';
import { LuneStore, useLune, activePhase } from '../store/luneStore';
import { recommendedRecipes } from '../data/recipes';
import { isRecipeSafe } from '../data/diet';
import { useEscapeClose } from '../utils/useEscapeClose';

export function AddMealSheet({ open, onClose, accent }) {
  const st = useLune();
  const phase = activePhase(st);
  const [name, setName] = useState('');
  const [p, setP] = useState('');
  const [c, setC] = useState('');
  const [f, setF] = useState('');
  useEscapeClose(open, onClose);
  if (!open) return null;

  const kcal = (Number(p) || 0) * 4 + (Number(c) || 0) * 4 + (Number(f) || 0) * 9;
  const reset = () => { setName(''); setP(''); setC(''); setF(''); };
  const fmtTime = () => { const d = new Date(); return `${d.getHours()}h${String(d.getMinutes()).padStart(2, '0')}`; };

  const logMeal = (meal) => {
    LuneStore.set(s => ({ mealLog: [...(s.mealLog || []), { id: 'm' + Date.now(), time: fmtTime(), ...meal }] }));
    reset(); onClose();
  };
  const submit = () => {
    if (!name.trim()) return;
    logMeal({ name: name.trim(), kcal, p: Number(p) || 0, c: Number(c) || 0, f: Number(f) || 0 });
  };

  const suggestions = recommendedRecipes(phase, st.goal).filter(r => isRecipeSafe(r, st.allergies, st.dietPrefs)).slice(0, 3);

  const field = (label, val, setVal) => (
    <div style={{ flex: 1 }}>
      <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.14em', color: LV3.ink3, marginBottom: 4 }}>{label}</div>
      <input value={val} onChange={e => setVal(e.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" placeholder="0" style={{
        width: '100%', padding: '10px 8px', borderRadius: 12, textAlign: 'center',
        background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
        color: LV3.ink, fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 18, outline: 'none',
      }} />
    </div>
  );

  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(8,4,7,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxHeight: '88%', overflowY: 'auto',
        background: LV3.bg2, borderTopLeftRadius: 30, borderTopRightRadius: 30,
        border: `1px solid ${LV3.glassLine2}`, borderBottom: 'none',
        padding: '10px 18px 28px', boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.18)', margin: '8px auto 16px' }} />
        <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: accent }}>ENREGISTRER UN REPAS</div>
        <div className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', margin: '6px 0 16px', lineHeight: 1 }}>
          Qu'as-tu <em style={{ color: accent }}>mangé</em> ?
        </div>

        {/* Manual entry */}
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom du repas (ex : Poulet riz brocoli)" style={{
          width: '100%', padding: '14px 16px', borderRadius: 14, marginBottom: 10,
          background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
          color: LV3.ink, fontFamily: 'Manrope, sans-serif', fontSize: 14, outline: 'none', boxSizing: 'border-box',
        }} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {field('PROTÉINES (g)', p, setP)}
          {field('GLUCIDES (g)', c, setC)}
          {field('LIPIDES (g)', f, setF)}
        </div>
        <div className="lv3-mono" style={{ fontSize: 10, color: LV3.ink3, textAlign: 'right', marginBottom: 14 }}>≈ {kcal} kcal</div>
        <button onClick={submit} disabled={!name.trim()} className={name.trim() ? 'lv3-fab' : ''} style={{
          width: '100%', padding: '15px', borderRadius: 99, border: 'none', marginBottom: 20,
          background: name.trim() ? `linear-gradient(135deg, ${accent}, ${LV3.peach2})` : 'rgba(255,255,255,0.06)',
          color: name.trim() ? '#231016' : LV3.ink3, fontWeight: 600, fontSize: 13, letterSpacing: '.06em',
          cursor: name.trim() ? 'pointer' : 'default', fontFamily: 'Manrope, sans-serif',
        }}>Ajouter au journal</button>

        {/* Quick suggestions */}
        <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10 }}>Suggestions · ta phase & ton objectif</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {suggestions.map(r => (
            <button key={r.id} onClick={() => logMeal({ name: r.name, kcal: r.kcal, p: r.p, c: r.c, f: r.f })} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, cursor: 'pointer',
              background: 'rgba(255,255,255,0.04)', border: `1px solid ${LV3.glassLine}`, textAlign: 'left', fontFamily: 'Manrope, sans-serif',
            }}>
              <span className="lv3-serif" style={{ fontSize: 22, color: accent, lineHeight: 1 }}>{r.glyph}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: LV3.ink }}>{r.name}</div>
                <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 2 }}>{r.kcal} kcal · {r.p}P · {r.c}G · {r.f}L</div>
              </div>
              <span style={{ fontSize: 16, color: accent }}>+</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
