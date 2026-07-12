import { useState } from 'react';
import { LV3, lv3Label } from '../theme/tokens';
import { LuneStore } from '../store/luneStore';
import { useEscapeClose } from '../utils/useEscapeClose';

export function AddShoppingItemSheet({ open, onClose, accent }) {
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  useEscapeClose(open, onClose);
  if (!open) return null;

  const submit = () => {
    if (!name.trim()) return;
    LuneStore.set(s => ({
      shoppingCustom: [...(s.shoppingCustom || []), { id: 'cust' + Date.now(), n: name.trim(), q: qty.trim() }],
    }));
    setName(''); setQty(''); onClose();
  };

  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(8,4,7,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxHeight: '88%', overflowY: 'auto',
        background: LV3.bg2, borderTopLeftRadius: 30, borderTopRightRadius: 30,
        border: `1px solid ${LV3.glassLine2}`, padding: '10px 18px 28px',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.18)', margin: '8px auto 16px' }} />
        <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: accent }}>AJOUTER UN ARTICLE</div>
        <div className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', margin: '6px 0 16px', lineHeight: 1 }}>
          Quoi d'<em style={{ color: accent }}>autre</em> ?
        </div>

        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom de l'article" autoFocus style={{
          width: '100%', padding: '14px 16px', borderRadius: 14, marginBottom: 10, boxSizing: 'border-box',
          background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
          color: LV3.ink, fontFamily: 'Manrope, sans-serif', fontSize: 14, outline: 'none',
        }} />
        <input value={qty} onChange={e => setQty(e.target.value)} placeholder="Quantité (optionnel)" style={{
          width: '100%', padding: '14px 16px', borderRadius: 14, marginBottom: 18, boxSizing: 'border-box',
          background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
          color: LV3.ink, fontFamily: 'Manrope, sans-serif', fontSize: 14, outline: 'none',
        }} />

        <button onClick={submit} disabled={!name.trim()} className={name.trim() ? 'lv3-fab' : ''} style={{
          width: '100%', padding: '15px', borderRadius: 99, border: 'none',
          background: name.trim() ? `linear-gradient(135deg, ${accent}, ${LV3.peach2})` : 'rgba(255,255,255,0.06)',
          color: name.trim() ? '#231016' : LV3.ink3, fontWeight: 600, fontSize: 13, letterSpacing: '.06em',
          cursor: name.trim() ? 'pointer' : 'default', fontFamily: 'Manrope, sans-serif',
        }}>Ajouter à la liste</button>
      </div>
    </div>
  );
}
