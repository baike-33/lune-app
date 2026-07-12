import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { navBtnStyle } from '../utils/format';

export function About() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const values = [
    { i: '☾', l: 'Le cycle au centre', d: "Ton corps change chaque semaine — ton programme aussi. Rien n'est figé." },
    { i: '✦', l: 'Bienveillant, jamais culpabilisant', d: "Pas de « queen », pas d'injonction. Une sœur qui coache, pas qui juge." },
    { i: '◈', l: 'Beau et fonctionnel', d: "Une app qu'on a envie d'ouvrir, où chaque détail sert ton objectif." },
  ];
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

        <div style={{ padding: '24px 20px 8px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: -14, borderRadius: '50%', background: `radial-gradient(circle, ${m.palette.glow}, transparent 65%)`, filter: 'blur(14px)' }} />
            <div style={{ position: 'relative', fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 44, color: m.palette.accent }}>L<span style={{ color: LV3.ink }}>.</span></div>
          </div>
          <h1 className="lv3-serif" style={{ fontSize: 40, fontStyle: 'italic', margin: 0, lineHeight: 1 }}>Lune</h1>
          <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.28em', color: m.palette.accent, marginTop: 10 }}>SLIM THICK · ÉLÉGANT</div>
        </div>

        <div style={{ padding: '14px 20px 8px' }}>
          <Glass style={{ padding: '20px 20px' }}>
            <p className="lv3-serif" style={{ fontSize: 19, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.45, margin: 0 }}>
              « Mon corps n'est pas un projet à finir. C'est un endroit où je vis. »
            </p>
            <p style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.6, marginTop: 14 }}>
              Lune synchronise entraînement, nutrition et mental avec ton cycle menstruel. Quatre muses t'accompagnent, une par phase, pour un programme qui suit vraiment ton corps — semaine après semaine, en douceur et avec constance.
            </p>
          </Glass>
        </div>

        <div style={{ padding: '8px 16px 8px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {values.map((v, i) => (
            <Glass tight key={i} style={{ padding: '15px 15px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: `${m.palette.accent}1F`, color: m.palette.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }} aria-hidden="true">{v.i}</div>
              <div style={{ flex: 1 }}>
                <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', color: LV3.ink }}>{v.l}</div>
                <div style={{ fontSize: 12, color: LV3.ink2, marginTop: 4, lineHeight: 1.55 }}>{v.d}</div>
              </div>
            </Glass>
          ))}
        </div>

        <div style={{ padding: '14px 20px 8px', textAlign: 'center' }}>
          <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, lineHeight: 1.8 }}>
            VERSION 3.0 · 2026<br />Conçu avec soin pour ton bien-être<br />© Lune · Slim Thick Élégant
          </div>
        </div>
        <div style={{ height: 96 }} />
      </div>
      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
