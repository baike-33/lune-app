import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { MuseInMotion } from '../components/MuseAvatar';
import { nowTime } from '../utils/format';

/* ════════════════════════════════════════════════════════
   WELCOME · cover du soir
   ════════════════════════════════════════════════════════ */
export function Welcome() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const exoForMuse = { mira: 's6', alya: 's1', sora: 's3', lina: 's4' }[muse] || 's4';
  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />
      <div className="lv3-grain"></div>

      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, padding: '58px 22px 26px', display: 'flex', flexDirection: 'column', zIndex: 5 }}>
        {/* Top brand row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="lv3-mono" style={{ fontSize: 10, color: LV3.ink3, letterSpacing: '.12em' }}>Slim Thick · Élégant</div>
          <Glass tight pill style={{ padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.palette.accent }} />
            <span className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink2, letterSpacing: '.10em' }}>{nowTime()}</span>
          </Glass>
        </div>

        {/* Centerpiece */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="lv3-rise" style={{ ...lv3Label, fontSize: 10, color: m.palette.accent }}>Ta muse · ce soir</div>
          <div className="lv3-rise" style={{ animationDelay: '.1s', margin: '18px 0 20px' }}>
            <MuseInMotion muse={muse} exoId={exoForMuse} size={240} withArc={false} />
          </div>

          <div className="lv3-rise lv3-serif" style={{ animationDelay: '.25s', fontSize: 62, fontStyle: 'italic', lineHeight: .9, letterSpacing: '-0.02em', color: LV3.ink }}>
            {m.name.slice(0, 1) + m.name.slice(1).toLowerCase()}<span style={{ color: m.palette.accent }}>.</span>
          </div>
          <div className="lv3-rise lv3-mono" style={{ animationDelay: '.35s', fontSize: 10, color: m.palette.accent, marginTop: 6, letterSpacing: '.16em' }}>
            {m.tag.toUpperCase()} · {m.phaseLabel.toUpperCase()}
          </div>
        </div>

        {/* Quote glass card */}
        <Glass className="lv3-rise" style={{ animationDelay: '.45s', padding: '18px 20px', marginBottom: 14 }}>
          <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', lineHeight: 1.4, color: LV3.ink }}>
            « {m.quote} »
          </div>
        </Glass>

        {/* CTA */}
        <div className="lv3-rise" style={{ animationDelay: '.55s', display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => luneNav('today')} style={{ flex: 1, textAlign: 'left', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}>
            <Glass tight style={{ padding: '14px 18px' }}>
              <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, letterSpacing: '.16em' }}>JOUR {s.cycleDay} / 28</div>
              <div className="lv3-serif" style={{ fontSize: 18, fontStyle: 'italic', marginTop: 2, color: LV3.ink }}>Entre, doucement.</div>
            </Glass>
          </button>
          <button onClick={() => luneNav('today')} className="lv3-fab" style={{
            width: 56, height: 56, borderRadius: '50%', border: 'none',
            background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
            color: '#231016', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>→</button>
        </div>
      </div>

      <HomeBar />
    </div>
  );
}
