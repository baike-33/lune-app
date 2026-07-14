import { LV3 } from '../theme/tokens';
import { MUSES } from '../data/muses';
import { EXO_POSES } from '../data/poses';
import { Glass } from './Glass';
import { asset } from '../utils/format';

/* ─── Composant principal : ExoPose ────────────────────── */
export function ExoPose({
  exoId,
  pose: overridePose,
  width = '100%',
  height = 'auto',
  aspectRatio = '3/4',
  showArrow = true,
  showCredit = true,
  showTitle = false,
  animate = true,
  round = 24,
  vignette = true,
  style = {},
}) {
  const pose = overridePose || EXO_POSES[exoId];
  if (!pose) return null;
  const m = MUSES[pose.muse];
  return (
    <div style={{
      position: 'relative', width, height, aspectRatio,
      borderRadius: round, overflow: 'hidden',
      background: m.palette.base,
      boxShadow: `0 18px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)`,
      border: `1px solid ${LV3.glassLine}`,
      ...style,
    }}>
      <img
        src={asset(pose.image)}
        alt={pose.name || ''}
        className={animate ? `lv3-rep-${pose.cadence}` : ''}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: pose.objectPosition,
        }}
      />
      {vignette && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%),
                     radial-gradient(120% 80% at 50% 30%, transparent 50%, rgba(0,0,0,0.25) 100%)`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      )}
      <div className="lv3-grain"></div>

      {/* Motion arc overlay */}
      {showArrow && pose.arc && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4 }}>
          <defs>
            <marker id={`epm-${exoId || 'p'}`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={m.palette.accent} />
            </marker>
          </defs>
          {pose.arc === 'up' && <path d="M 50 78 Q 50 50 50 22" fill="none" stroke={m.palette.accent} strokeWidth="0.7" strokeLinecap="round" markerEnd={`url(#epm-${exoId || 'p'})`} className="lv3-arrow-anim" opacity=".95" />}
          {pose.arc === 'down' && <path d="M 50 22 Q 50 50 50 78" fill="none" stroke={m.palette.accent} strokeWidth="0.7" strokeLinecap="round" markerEnd={`url(#epm-${exoId || 'p'})`} className="lv3-arrow-anim" opacity=".95" />}
          {pose.arc === 'hinge' && <path d="M 30 30 Q 50 50 60 76" fill="none" stroke={m.palette.accent} strokeWidth="0.7" strokeLinecap="round" markerEnd={`url(#epm-${exoId || 'p'})`} className="lv3-arrow-anim" opacity=".95" />}
          {pose.arc === 'out' && <path d="M 50 60 Q 75 45 92 32" fill="none" stroke={m.palette.accent} strokeWidth="0.7" strokeLinecap="round" markerEnd={`url(#epm-${exoId || 'p'})`} className="lv3-arrow-anim" opacity=".95" />}
          {pose.arc === 'arc' && <path d="M 12 60 Q 50 28 88 60" fill="none" stroke={m.palette.accent} strokeWidth="0.7" strokeLinecap="round" className="lv3-arrow-anim" opacity=".95" />}
        </svg>
      )}

      {/* Title overlay */}
      {showTitle && (
        <div style={{ position: 'absolute', top: 14, left: 14, right: 14, zIndex: 6 }}>
          <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: m.palette.accent, fontWeight: 600 }}>
            DÉMO · {m.name}
          </div>
          <div className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', color: '#fff', marginTop: 4, lineHeight: 1, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            {pose.name}
          </div>
        </div>
      )}

      {/* Credit pill */}
      {showCredit && (
        <div style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 6 }}>
          <Glass tight pill style={{ padding: '5px 11px 5px 5px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `1px solid ${m.palette.accent}` }}>
              <img src={asset(MUSES[pose.muse].head)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%' }} />
            </div>
            <span className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.12em', color: m.palette.accent, fontWeight: 600 }}>{m.name}</span>
          </Glass>
        </div>
      )}
    </div>
  );
}

/* ─── ExoThumb — micro version pour les listes ─────────── */
export function ExoThumb({ exoId, size = 44, round = 12 }) {
  const pose = EXO_POSES[exoId];
  if (!pose) return null;
  const m = MUSES[pose.muse];
  return (
    <div style={{
      width: size, height: size, borderRadius: round, overflow: 'hidden',
      flexShrink: 0, position: 'relative',
      border: `1px solid ${LV3.glassLine}`,
      background: m.palette.base,
    }}>
      <img src={asset(pose.image)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pose.objectPosition }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 50%, ${m.palette.base}77 100%)`, pointerEvents: 'none' }} />
    </div>
  );
}
