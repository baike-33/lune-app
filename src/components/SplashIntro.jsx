import { useState, useEffect } from 'react';
import { LV3 } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase } from '../store/luneStore';

export function SplashIntro({ onDone }) {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setClosing(true), 2100);
    const t2 = setTimeout(() => onDone && onDone(), 2750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className={`lune-splash${closing ? ' done' : ''}`} role="img" aria-label="Lune">
      <div style={{ position: 'relative', width: 130, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: -30, borderRadius: '50%', background: `radial-gradient(circle, ${m.palette.glow}, transparent 65%)`, filter: 'blur(20px)', animation: 'lune-splash-glow 2.4s ease-in-out infinite' }} />
        <svg width="130" height="130" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
          <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle cx="65" cy="65" r="54" fill="none" stroke={m.palette.accent} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="339" style={{ animation: 'lune-splash-ring 1.8s cubic-bezier(.4,0,.2,1) forwards' }} />
        </svg>
        <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 34, color: LV3.ink, animation: 'lune-splash-in 1s ease forwards' }}>
          L<span style={{ color: m.palette.accent }}>.</span>
        </div>
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 40, color: LV3.ink, marginTop: 26, animation: 'lune-splash-in 1s ease .25s both' }}>
        Lune<span style={{ color: m.palette.accent }}>.</span>
      </div>
      <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.30em', color: LV3.ink3, marginTop: 12, animation: 'lune-splash-sub 2s ease both' }}>
        SLIM THICK · ÉLÉGANT
      </div>
    </div>
  );
}
