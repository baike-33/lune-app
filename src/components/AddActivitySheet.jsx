import { useState } from 'react';
import { LV3, lv3Label } from '../theme/tokens';
import { LuneStore } from '../store/luneStore';
import { useEscapeClose } from '../utils/useEscapeClose';

const ACTIVITY_TYPES = [
  { t: 'Marche', icon: '⊳', rate: 4.5 },
  { t: 'Course', icon: '➤', rate: 10 },
  { t: 'Vélo', icon: '◉', rate: 7 },
  { t: 'Natation', icon: '≈', rate: 8 },
  { t: 'Yoga', icon: '✦', rate: 3 },
  { t: 'Danse', icon: '❋', rate: 6 },
  { t: 'HIIT', icon: '⚡', rate: 11 },
  { t: 'Autre', icon: '○', rate: 5 },
];

export function AddActivitySheet({ open, onClose, accent }) {
  const [type, setType] = useState(ACTIVITY_TYPES[0]);
  const [min, setMin] = useState(30);
  const [intensity, setIntensity] = useState('modérée');
  useEscapeClose(open, onClose);
  if (!open) return null;
  const factor = intensity === 'douce' ? 0.8 : intensity === 'intense' ? 1.3 : 1;
  const kcal = Math.round(type.rate * min * factor);
  const save = () => {
    LuneStore.set(st => ({
      activityLog: [...(st.activityLog || []), {
        id: 'act' + Date.now(), type: type.t, icon: type.icon,
        date: new Date().toISOString().slice(0, 10), min: Number(min), kcal, intensity,
      }],
    }));
    onClose();
  };
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(8,4,7,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxHeight: '88%', overflowY: 'auto', background: LV3.bg2, borderTopLeftRadius: 30, borderTopRightRadius: 30, border: `1px solid ${LV3.glassLine2}`, padding: '10px 18px 28px' }}>
        <div style={{ width: 40, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.18)', margin: '8px auto 16px' }} />
        <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: accent }}>ACTIVITÉ HORS PROGRAMME</div>
        <div className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', margin: '6px 0 16px', lineHeight: 1 }}>
          Tu as bougé <em style={{ color: accent }}>autrement</em> ?
        </div>
        {/* Type grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 18 }}>
          {ACTIVITY_TYPES.map(a => {
            const isA = a.t === type.t;
            return (
              <button key={a.t} onClick={() => setType(a)} aria-pressed={isA} style={{
                padding: '12px 4px', borderRadius: 14, border: `1px solid ${isA ? accent : LV3.glassLine}`, cursor: 'pointer',
                background: isA ? `${accent}1F` : 'rgba(255,255,255,0.03)', color: isA ? accent : LV3.ink2,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontFamily: 'Manrope, sans-serif',
              }}>
                <span style={{ fontSize: 18 }} aria-hidden="true">{a.icon}</span>
                <span style={{ fontSize: 9.5 }}>{a.t}</span>
              </button>
            );
          })}
        </div>
        {/* Duration */}
        <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: LV3.ink3, marginBottom: 8 }}>DURÉE · {min} MIN</div>
        <input type="range" min="5" max="120" step="5" value={min} onChange={e => setMin(Number(e.target.value))} aria-label="Durée en minutes" style={{ width: '100%', accentColor: accent }} />
        {/* Intensity */}
        <div style={{ display: 'flex', gap: 6, margin: '12px 0 18px' }}>
          {['douce', 'modérée', 'intense'].map(x => (
            <button key={x} onClick={() => setIntensity(x)} aria-pressed={intensity === x} style={{
              flex: 1, padding: '10px', borderRadius: 12, border: `1px solid ${intensity === x ? accent : LV3.glassLine}`, cursor: 'pointer',
              background: intensity === x ? `${accent}1A` : 'transparent', color: intensity === x ? accent : LV3.ink2,
              fontFamily: 'Manrope, sans-serif', fontSize: 12,
            }}>{x}</button>
          ))}
        </div>
        <div className="lv3-mono" style={{ fontSize: 11, color: LV3.ink3, textAlign: 'right', marginBottom: 14 }}>≈ {kcal} kcal · compte dans ton bilan</div>
        <button onClick={save} className="lv3-fab" style={{ width: '100%', padding: '15px', borderRadius: 99, border: 'none', background: `linear-gradient(135deg, ${accent}, ${LV3.peach2})`, color: '#231016', fontWeight: 600, fontSize: 13, letterSpacing: '.04em', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
          Enregistrer l'activité
        </button>
      </div>
    </div>
  );
}
