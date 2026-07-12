import { useState } from 'react';
import { LV3, lv3Label } from '../theme/tokens';
import { LuneStore } from '../store/luneStore';
import { useEscapeClose } from '../utils/useEscapeClose';

const FIELDS = [
  { k: 'weight', l: 'Poids (kg)' },
  { k: 'waist', l: 'Taille (cm)' },
  { k: 'hips', l: 'Hanches (cm)' },
  { k: 'thigh', l: 'Cuisse (cm)' },
];

export function AddMeasurementSheet({ open, onClose, accent }) {
  const [values, setValues] = useState({ weight: '', waist: '', hips: '', thigh: '' });
  useEscapeClose(open, onClose);
  if (!open) return null;

  const setField = (k, v) => setValues(s => ({ ...s, [k]: v.replace(/[^0-9.]/g, '') }));
  const hasAny = FIELDS.some(f => values[f.k].trim() !== '');

  const submit = () => {
    if (!hasAny) return;
    const entry = { id: 'ms' + Date.now(), date: new Date().toISOString().slice(0, 10) };
    FIELDS.forEach(f => { if (values[f.k].trim() !== '') entry[f.k] = Number(values[f.k]); });
    LuneStore.set(s => ({ measurements: [...(s.measurements || []), entry] }));
    setValues({ weight: '', waist: '', hips: '', thigh: '' });
    onClose();
  };

  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(8,4,7,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxHeight: '88%', overflowY: 'auto',
        background: LV3.bg2, borderTopLeftRadius: 30, borderTopRightRadius: 30,
        border: `1px solid ${LV3.glassLine2}`, padding: '10px 18px 28px',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.18)', margin: '8px auto 16px' }} />
        <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: accent }}>NOUVELLE MESURE</div>
        <div className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', margin: '6px 0 16px', lineHeight: 1 }}>
          Où en es-tu <em style={{ color: accent }}>aujourd'hui</em> ?
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {FIELDS.map(f => (
            <div key={f.k}>
              <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.14em', color: LV3.ink3, marginBottom: 4 }}>{f.l.toUpperCase()}</div>
              <input
                value={values[f.k]} onChange={e => setField(f.k, e.target.value)}
                inputMode="decimal" placeholder="—" aria-label={f.l}
                style={{
                  width: '100%', padding: '12px 10px', borderRadius: 12, textAlign: 'center', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
                  color: LV3.ink, fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 18, outline: 'none',
                }}
              />
            </div>
          ))}
        </div>

        <button onClick={submit} disabled={!hasAny} className={hasAny ? 'lv3-fab' : ''} style={{
          width: '100%', padding: '15px', borderRadius: 99, border: 'none',
          background: hasAny ? `linear-gradient(135deg, ${accent}, ${LV3.peach2})` : 'rgba(255,255,255,0.06)',
          color: hasAny ? '#231016' : LV3.ink3, fontWeight: 600, fontSize: 13, letterSpacing: '.06em',
          cursor: hasAny ? 'pointer' : 'default', fontFamily: 'Manrope, sans-serif',
        }}>Enregistrer</button>
        <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, textAlign: 'center', marginTop: 10, letterSpacing: '.04em' }}>
          Remplis au moins un champ · le reste est optionnel
        </div>
      </div>
    </div>
  );
}
