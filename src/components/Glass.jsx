import { LV3 } from '../theme/tokens';
import { MUSES } from '../data/muses';

/* ─── Warm aurora background ───────────────────────────── */
export function WarmAurora({ muse = 'lina', intensity = 1 }) {
  const m = MUSES[muse];
  return (
    <div className="lv3-soft-bg" style={{ opacity: intensity }}>
      {/* Deep warm radial — fond dimensionnel, plus dramatique */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(125% 82% at 16% -6%, ${m.palette.glow} 0%, transparent 50%), radial-gradient(118% 78% at 86% 106%, ${LV3.rose}2E 0%, transparent 58%), linear-gradient(177deg, ${LV3.bgTop} 0%, ${LV3.bg} 44%, ${LV3.bgDeep} 100%)` }} />
      {/* Drifting blobs — halo plus présent */}
      <div className="lv3-blob" style={{ width: 340, height: 340, left: '-18%', top: '-12%', background: `radial-gradient(circle, ${m.palette.accent}72, transparent 66%)`, animationDelay: '0s' }} />
      <div className="lv3-blob" style={{ width: 280, height: 280, right: '-12%', top: '38%', background: `radial-gradient(circle, ${LV3.rose}58, transparent 66%)`, animationDelay: '-6s' }} />
      <div className="lv3-blob" style={{ width: 230, height: 230, left: '28%', bottom: '-12%', background: `radial-gradient(circle, ${LV3.gold}42, transparent 66%)`, animationDelay: '-12s' }} />
    </div>
  );
}

/* ─── Glass card ───────────────────────────────────────── */
export function Glass({ children, style = {}, tight = false, pill = false, onClick, ...rest }) {
  const cls = ['lv3-glass'];
  if (tight) cls.push('lv3-glass-tight');
  if (pill) cls.push('lv3-glass-pill');
  // Rendues cliquables au clavier automatiquement dès qu'un onClick est fourni
  const a11y = onClick ? {
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } },
  } : {};
  return <div className={cls.join(' ')} style={style} onClick={onClick} {...a11y} {...rest}>{children}</div>;
}

/* ─── Animated progress ring ───────────────────────────── */
export function RingProgress({ size = 80, value = 0.5, color = LV3.peach, track = 'rgba(255,255,255,0.08)', width = 5, children }) {
  const r = (size - width) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={width} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={width} strokeDasharray={c} strokeDashoffset={c * (1 - value)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.2,.7,.3,1)' }} />
      </svg>
      {children && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>{children}</div>}
    </div>
  );
}

/* ─── Cycle ring (rounded, glassy) ─────────────────────── */
export function CycleRingV3({ size = 140, day = 18, phase = 'lut' }) {
  const phaseColors = { mens: LV3.rose, fol: LV3.gold, ov: LV3.peach2, lut: LV3.sage };
  const c = phaseColors[phase] || LV3.peach;
  return (
    <RingProgress size={size} value={day / 28} color={c} width={6}>
      <div className="lv3-serif" style={{ fontSize: size * 0.30, fontStyle: 'italic', color: LV3.ink, lineHeight: .9 }}>{day}</div>
      <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.16em', color: LV3.ink3, marginTop: 4 }}>/ 28</div>
    </RingProgress>
  );
}
