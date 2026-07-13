import { useState } from 'react';
import { LV3, lv3Phone, lv3Label } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { navBtnStyle } from '../utils/format';
import { MANTRAS, WEEKLY_TRACKER_ITEMS } from '../data/mantras';
import { weekKey } from '../utils/dateScope';

export function Mantras() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const [open, setOpen] = useState(null);

  const currentWeek = weekKey();
  const tracker = s.mentalTracker && s.mentalTracker.weekKey === currentWeek ? s.mentalTracker : { weekKey: currentWeek, done: [] };
  const doneSet = new Set(tracker.done);
  const toggleItem = (i) => {
    const n = new Set(doneSet);
    n.has(i) ? n.delete(i) : n.add(i);
    LuneStore.set({ mentalTracker: { weekKey: currentWeek, done: [...n] } });
  };
  const resetTracker = () => LuneStore.set({ mentalTracker: { weekKey: currentWeek, done: [] } });

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
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>MENTAL</div>
          <h1 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Ce qu'il faut se <em style={{ color: m.palette.accent }}>rappeler</em>
          </h1>
          <p style={{ fontSize: 12.5, color: LV3.ink3, marginTop: 8, lineHeight: 1.5, maxWidth: 300 }}>
            Touche une carte pour développer.
          </p>
        </div>

        <div style={{ padding: '18px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MANTRAS.map((mo, i) => {
            const isOpen = open === i;
            return (
              <Glass key={i} onClick={() => setOpen(isOpen ? null : i)} style={{ padding: '18px 18px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 22, color: m.palette.accent, flexShrink: 0 }} aria-hidden="true">{mo.icon}</span>
                  <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', color: LV3.ink, flex: 1, lineHeight: 1.2 }}>{mo.title}</div>
                  <span aria-hidden="true" style={{ color: LV3.ink3, fontSize: 13, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>⌄</span>
                </div>
                <div style={{ fontSize: 13, color: LV3.ink2, marginTop: 10, lineHeight: 1.55 }}>
                  {isOpen ? mo.detail : mo.front}
                </div>
              </Glass>
            );
          })}
        </div>

        {/* Tracker hebdomadaire */}
        <div style={{ padding: '4px 16px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, padding: '0 4px' }}>
            <div style={{ ...lv3Label, color: LV3.ink3 }}>Cette semaine · checklist</div>
            <span className="lv3-mono" style={{ fontSize: 10, color: m.palette.accent }}>{doneSet.size} / {WEEKLY_TRACKER_ITEMS.length}</span>
          </div>
          <Glass tight style={{ padding: '4px 4px' }}>
            {WEEKLY_TRACKER_ITEMS.map((item, i) => {
              const done = doneSet.has(i);
              return (
                <div key={i} onClick={() => toggleItem(i)} role="checkbox" aria-checked={done} tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(i); } }}
                  style={{
                    padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                    borderBottom: i < WEEKLY_TRACKER_ITEMS.length - 1 ? `1px solid ${LV3.faint}` : 'none',
                  }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                    border: done ? 'none' : `1.5px solid ${LV3.glassLine2}`,
                    background: done ? m.palette.accent : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#231016', fontSize: 12, fontWeight: 700,
                  }}>{done && '✓'}</div>
                  <span style={{ fontSize: 12.5, color: done ? LV3.ink3 : LV3.ink2, textDecorationLine: done ? 'line-through' : 'none', lineHeight: 1.4 }}>{item}</span>
                </div>
              );
            })}
          </Glass>
          {doneSet.size > 0 && (
            <button onClick={resetTracker} style={{
              marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', color: LV3.ink3,
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, padding: 0, letterSpacing: '.04em',
            }}>↺ Réinitialiser</button>
          )}
        </div>

        <div style={{ height: 96 }} />
      </div>
      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
