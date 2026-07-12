import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { PhaseDot } from '../components/PhaseDot';
import { navBtnStyle } from '../utils/format';

export function Help() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const faqs = [
    { q: 'Comment Lune connaît ma phase ?', a: 'À partir de la date de tes dernières règles (Réglages › Cycle). Ton jour de cycle avance tout seul chaque jour, et ta muse change avec ta phase.' },
    { q: 'Que sont les muses ?', a: 'Quatre archétypes, un par phase : Mira (menstruelle), Alya (folliculaire), Sora (ovulation), Lina (lutéale). La muse active teinte l\'app et adapte séances, nutrition et conseils.' },
    { q: 'Maison ou salle ?', a: 'Dans la séance, bascule Maison ⌂ / Salle ▥ : mêmes mouvements, matériel adapté (kettlebell & poids du corps, ou machines & charges libres).' },
    { q: 'Le chrono de repos', a: 'Il démarre uniquement quand tu valides une série. Utilise −15 / +15 pour ajuster, et ▶/⏸ pour le contrôler.' },
    { q: 'Activités hors-programme', a: 'Depuis l\'accueil › Activité, enregistre marche, yoga, natation… Elles comptent dans ton Bilan et ton équilibre énergétique.' },
    { q: 'Apple Santé', a: 'Moi › Santé connecte tes pas, sommeil, tension, médicaments et contraception, et écrit ta phase dans Santé — tout reste interconnecté.' },
  ];
  const phaseGuide = [
    { k: 'mens', t: 'Menstruelle · J1–5', d: 'Repos actif, mobilité. Fer & magnésium. Écoute-toi.' },
    { k: 'fol', t: 'Folliculaire · J6–13', d: 'Énergie qui monte : pousse les charges, protéines hautes.' },
    { k: 'ov', t: 'Ovulation · J14–16', d: 'Pic de force : PR possibles. Reste sociale et solaire.' },
    { k: 'lut', t: 'Lutéale · J17–28', d: 'Hypertrophie douce, glucides complexes, anti-fringale.' },
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
        <div style={{ padding: '16px 20px 0' }}>
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>AIDE & GUIDE</div>
          <h1 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Lire ton <em style={{ color: m.palette.accent }}>cycle</em>
          </h1>
        </div>

        <div style={{ padding: '18px 16px 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: '.20em', textTransform: 'uppercase', color: LV3.ink3, margin: '0 4px 10px' }}>Les 4 phases</div>
          <Glass tight style={{ padding: '4px 4px' }}>
            {phaseGuide.map((p, i) => (
              <div key={p.k} style={{ padding: '13px 14px', display: 'flex', gap: 13, alignItems: 'flex-start', borderBottom: i < phaseGuide.length - 1 ? `1px solid ${LV3.faint}` : 'none' }}>
                <div style={{ marginTop: 3 }}><PhaseDot phase={p.k} size={9} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: LV3.ink, fontWeight: 600 }}>{p.t}</div>
                  <div style={{ fontSize: 11.5, color: LV3.ink3, marginTop: 3, lineHeight: 1.5 }}>{p.d}</div>
                </div>
              </div>
            ))}
          </Glass>
        </div>

        <div style={{ padding: '8px 16px 16px' }}>
          <div style={{ fontSize: 10, letterSpacing: '.20em', textTransform: 'uppercase', color: LV3.ink3, margin: '6px 4px 10px' }}>Questions fréquentes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((f, i) => (
              <Glass tight key={i} style={{ padding: '14px 15px' }}>
                <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.25 }}>{f.q}</div>
                <div style={{ fontSize: 12, color: LV3.ink2, marginTop: 6, lineHeight: 1.55 }}>{f.a}</div>
              </Glass>
            ))}
          </div>
        </div>
        <div style={{ height: 96 }} />
      </div>
      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
