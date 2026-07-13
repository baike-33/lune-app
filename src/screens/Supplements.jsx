import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { navBtnStyle } from '../utils/format';
import { SUPPLEMENTS, SUPPLEMENT_TIERS } from '../data/supplements';

const TIER_COLOR = { yes: LV3.sage, maybe: LV3.gold, no: LV3.rose };

export function Supplements() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];

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
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>SUPPLÉMENTS</div>
          <h1 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Ce qui <em style={{ color: m.palette.accent }}>vaut le coup</em>
          </h1>
          <p style={{ fontSize: 12.5, color: LV3.ink3, marginTop: 8, lineHeight: 1.5, maxWidth: 300 }}>
            Information générale, pas un avis médical — à valider avec un·e professionnel·le de santé avant toute prise.
          </p>
        </div>

        {SUPPLEMENT_TIERS.map(tier => (
          <div key={tier.k} style={{ padding: '18px 16px 8px' }}>
            <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: TIER_COLOR[tier.k], margin: '4px 4px 10px' }}>{tier.l}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SUPPLEMENTS.filter(x => x.tier === tier.k).map((x, i) => (
                <Glass key={i} tight style={{ padding: '14px 16px', opacity: tier.k === 'no' ? 0.75 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                    <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', color: LV3.ink }}>{x.name}</div>
                    <span className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.08em', padding: '3px 9px', borderRadius: 99, background: `${TIER_COLOR[tier.k]}22`, color: TIER_COLOR[tier.k], flexShrink: 0 }}>{x.badge.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: LV3.ink2, marginTop: 6, lineHeight: 1.55 }}>{x.note}</div>
                </Glass>
              ))}
            </div>
          </div>
        ))}

        <div style={{ height: 96 }} />
      </div>
      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
