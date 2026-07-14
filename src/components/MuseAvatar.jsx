import { LV3 } from '../theme/tokens';
import { MUSES } from '../data/muses';
import { asset } from '../utils/format';

/* ─── Petit avatar de muse (sans motion arc) ───────────── */
export function MuseAvatar({ muse, size = 44, ring = false }) {
  const m = MUSES[muse];
  return (
    <div style={{
      position: 'relative', width: size, height: size, borderRadius: '50%', overflow: 'hidden',
      border: ring ? `2px solid ${m.palette.accent}` : `1px solid ${LV3.glassLine}`,
      flexShrink: 0,
    }}>
      <img src={asset(m.head)} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%' }} />
      {ring && <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', boxShadow: `0 0 12px ${m.palette.glow}`, pointerEvents: 'none' }} />}
    </div>
  );
}

/* ─── Muse en mouvement (photo en rep-cadence) ─────────── */
const EXO_MOTION = {
  s1: { type: 'hipthrust', arc: 'up' },
  s2: { type: 'hinge', arc: 'hinge' },
  s3: { type: 'squat', arc: 'down' },
  s4: { type: 'bridge', arc: 'up' },
  s5: { type: 'kickback', arc: 'out' },
  s6: { type: 'walk', arc: 'arc' },
};

export function MuseInMotion({ muse = 'lina', exoId = 's1', size = 280, withArc = true }) {
  const m = MUSES[muse];
  const motion = EXO_MOTION[exoId] || EXO_MOTION.s1;
  const repClass = `lv3-rep-${motion.type}`;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Glow halo */}
      <div className="lv3-ring-pulse" style={{
        position: 'absolute', inset: -12, borderRadius: '50%',
        background: `radial-gradient(circle, ${m.palette.glow} 0%, transparent 65%)`,
        filter: 'blur(16px)', pointerEvents: 'none',
      }} />

      {/* Photo circle */}
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        borderRadius: '50%', overflow: 'hidden',
        background: m.palette.base,
        boxShadow: `inset 0 -20px 40px rgba(0,0,0,0.4)`,
        border: `1px solid ${LV3.glassLine2}`,
      }}>
        <img
          src={asset(m.img)}
          alt={m.name}
          className={repClass}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 16%',
            willChange: 'transform',
          }}
        />
        {/* Inner vignette */}
        <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 60px ${m.palette.base}AA`, pointerEvents: 'none' }} />
      </div>

      {/* Motion arc/arrow overlay */}
      {withArc && (
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: '-6%', width: '112%', height: '112%', pointerEvents: 'none' }}>
          <defs>
            <marker id={`arr-${exoId}`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={m.palette.accent} />
            </marker>
          </defs>
          {motion.arc === 'up' && (
            <path d="M 50 78 Q 50 50 50 22" fill="none" stroke={m.palette.accent} strokeWidth="1.2" strokeLinecap="round" markerEnd={`url(#arr-${exoId})`} className="lv3-arrow-anim" />
          )}
          {motion.arc === 'down' && (
            <path d="M 50 22 Q 50 50 50 78" fill="none" stroke={m.palette.accent} strokeWidth="1.2" strokeLinecap="round" markerEnd={`url(#arr-${exoId})`} className="lv3-arrow-anim" />
          )}
          {motion.arc === 'hinge' && (
            <path d="M 30 30 Q 50 50 50 75" fill="none" stroke={m.palette.accent} strokeWidth="1.2" strokeLinecap="round" markerEnd={`url(#arr-${exoId})`} className="lv3-arrow-anim" />
          )}
          {motion.arc === 'out' && (
            <path d="M 50 50 Q 75 35 92 24" fill="none" stroke={m.palette.accent} strokeWidth="1.2" strokeLinecap="round" markerEnd={`url(#arr-${exoId})`} className="lv3-arrow-anim" />
          )}
          {motion.arc === 'arc' && (
            <path d="M 12 60 Q 50 28 88 60" fill="none" stroke={m.palette.accent} strokeWidth="1.2" strokeLinecap="round" className="lv3-arrow-anim" />
          )}
        </svg>
      )}
    </div>
  );
}
