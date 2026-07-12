import { MUSES } from '../data/muses';
import { LV3 } from '../theme/tokens';
import { luneNav } from '../store/luneStore';
import { Glass } from './Glass';

export function LV3TabBar({ active, muse }) {
  const m = MUSES[muse];
  const items = [
    { k: 'today', l: 'Today', i: '◐' },
    { k: 'seance', l: 'Séance', i: '∿' },
    { k: 'nutrition', l: 'Manger', i: '◇' },
    { k: 'cycle', l: 'Cycle', i: '○' },
    { k: 'moi', l: 'Moi', i: '✿' },
  ];
  return (
    <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, zIndex: 9 }}>
      <Glass pill style={{ padding: '8px 4px', display: 'flex' }}>
        {items.map(i => {
          const isA = i.k === active;
          return (
            <button key={i.k} onClick={() => luneNav(i.k)} style={{ flex: 1, textAlign: 'center', padding: '6px 0', color: isA ? m.palette.accent : LV3.ink3, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
              <div style={{ fontSize: 16, lineHeight: 1 }}>{i.i}</div>
              <div className="lv3-mono" style={{ fontSize: 8.5, marginTop: 4, letterSpacing: '.08em' }}>{i.l}</div>
            </button>
          );
        })}
      </Glass>
    </div>
  );
}
