import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { navBtnStyle } from '../utils/format';
import { PRIVACY_SECTIONS as SECTIONS } from '../data/legal';

export function Privacy() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />
      <PhoneStatus dark={true} />
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ padding: '14px 18px 0' }}>
          <button onClick={() => luneBack() || luneNav('settings')} aria-label="Retour" style={navBtnStyle()}>
            <span aria-hidden="true">←</span> <span className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.10em' }}>Réglages</span>
          </button>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>CONFIDENTIALITÉ</div>
          <h1 className="lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1.05 }}>
            Politique de <em style={{ color: m.palette.accent }}>confidentialité</em>
          </h1>
        </div>

        <div style={{ padding: '16px 18px 0' }}>
          <Glass tight style={{ padding: '14px 16px', border: `1px solid ${LV3.rose}66`, background: `${LV3.rose}14` }}>
            <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.12em', color: LV3.rose, marginBottom: 6 }}>⚠ MODÈLE — NON VALIDÉ JURIDIQUEMENT</div>
            <div style={{ fontSize: 12, color: LV3.ink2, lineHeight: 1.5 }}>
              Ce texte pose les bases techniques (RGPD, données de santé) mais doit être relu et validé par un professionnel du droit avant toute mise en ligne commerciale.
            </div>
          </Glass>
        </div>

        <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SECTIONS.map((sec, i) => (
            <Glass tight key={i} style={{ padding: '14px 16px' }}>
              <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', color: LV3.ink }}>{sec.t}</div>
              <div style={{ fontSize: 12, color: LV3.ink2, marginTop: 6, lineHeight: 1.55 }}>{sec.b}</div>
            </Glass>
          ))}
        </div>

        <div style={{ height: 40 }} />
      </div>
      <HomeBar />
    </div>
  );
}
