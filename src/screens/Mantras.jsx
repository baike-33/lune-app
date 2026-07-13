import { useState } from 'react';
import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { navBtnStyle } from '../utils/format';
import { MANTRAS } from '../data/mantras';

export function Mantras() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const [open, setOpen] = useState(null);

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

        <div style={{ height: 96 }} />
      </div>
      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
