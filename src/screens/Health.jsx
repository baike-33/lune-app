import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { navBtnStyle } from '../utils/format';

export function Health() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const connected = s.healthConnected;

  const connect = () => {
    // Démo : on simule la synchronisation Apple Santé
    LuneStore.set({
      healthConnected: true, health: {
        steps: 7240, restingHR: 61, sleepH: 7.2, bp: '112/72', meds: true, contraception: 'Pilule',
      },
    });
  };
  const disconnect = () => LuneStore.set({ healthConnected: false, health: { steps: 0, restingHR: 0, sleepH: 0, bp: '—', meds: false, contraception: '—' } });

  const dataTypes = [
    { k: 'cycle', l: 'Règles & cycle', s: 'Lune écrit ta phase dans Santé', i: '☾', c: LV3.rose },
    { k: 'steps', l: 'Pas & activité', s: 'Tes pas alimentent ton bilan', i: '⊳', c: m.palette.accent, v: connected ? `${s.health.steps.toLocaleString('fr-FR')} pas` : null },
    { k: 'hr', l: 'Fréquence cardiaque', s: 'FC de repos & variabilité', i: '♥', c: LV3.peach, v: connected ? `${s.health.restingHR} bpm` : null },
    { k: 'bp', l: 'Tension artérielle', s: 'Suivi tension', i: '◈', c: LV3.gold, v: connected ? s.health.bp : null },
    { k: 'sleep', l: 'Sommeil', s: 'Durée & qualité', i: '☽', c: LV3.lavender, v: connected ? `${s.health.sleepH} h` : null },
    { k: 'meds', l: 'Médicaments', s: 'Prises & rappels', i: '✚', c: LV3.sage, v: connected ? (s.health.meds ? 'Suivi actif' : '—') : null },
    { k: 'contra', l: 'Contraception', s: 'Pilule, stérilet…', i: '◯', c: LV3.rose, v: connected ? s.health.contraception : null },
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
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>CONNEXION SANTÉ</div>
          <h1 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Tout, au <em style={{ color: m.palette.accent }}>même endroit</em>
          </h1>
          <p style={{ fontSize: 12.5, color: LV3.ink3, marginTop: 8, lineHeight: 1.5, maxWidth: 300 }}>
            Connecte Apple Santé : Lune lit tes pas, ton sommeil, ta tension, tes prises de médicaments et écrit ta phase de cycle — tout reste interconnecté.
          </p>
        </div>

        {/* Connect card */}
        <div style={{ padding: '18px 16px 8px' }}>
          <Glass style={{ padding: '18px 18px', background: connected ? `linear-gradient(135deg, ${LV3.sage}1F, rgba(255,255,255,0.02))` : `linear-gradient(135deg, ${m.palette.accent}1A, ${LV3.rose}0C)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: connected ? `${LV3.sage}26` : `${m.palette.accent}26`, color: connected ? LV3.sage : m.palette.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }} aria-hidden="true">♥</div>
              <div style={{ flex: 1 }}>
                <div className="lv3-serif" style={{ fontSize: 19, fontStyle: 'italic' }}>Apple Santé</div>
                <div className="lv3-mono" style={{ fontSize: 9.5, color: connected ? LV3.sage : LV3.ink3, marginTop: 3, letterSpacing: '.06em' }}>
                  {connected ? '● CONNECTÉ · SYNCHRONISÉ' : '○ NON CONNECTÉ'}
                </div>
              </div>
            </div>
            <button onClick={connected ? disconnect : connect} className={connected ? '' : 'lv3-fab'} style={{
              width: '100%', marginTop: 16, padding: '14px', borderRadius: 99, border: connected ? `1px solid ${LV3.glassLine2}` : 'none', cursor: 'pointer',
              background: connected ? 'transparent' : `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
              color: connected ? LV3.ink2 : '#231016', fontWeight: 600, fontSize: 13, letterSpacing: '.04em', fontFamily: 'Manrope, sans-serif',
            }}>
              {connected ? 'Déconnecter' : 'Connecter Apple Santé'}
            </button>
          </Glass>
        </div>

        {/* Data types */}
        <div style={{ padding: '8px 16px 16px' }}>
          <div style={{ fontSize: 10, letterSpacing: '.20em', textTransform: 'uppercase', color: LV3.ink3, margin: '8px 4px 10px' }}>Données interconnectées</div>
          <Glass tight style={{ padding: '4px 4px' }}>
            {dataTypes.map((d, i) => (
              <div key={d.k} style={{ padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 13, borderBottom: i < dataTypes.length - 1 ? `1px solid ${LV3.faint}` : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: `${d.c}1F`, color: d.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }} aria-hidden="true">{d.i}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: LV3.ink, fontWeight: 500 }}>{d.l}</div>
                  <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 1 }}>{d.s}</div>
                </div>
                {connected
                  ? (d.v ? <span className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', color: d.c }}>{d.v}</span>
                    : <span className="lv3-mono" style={{ fontSize: 9, color: LV3.sage }}>✓</span>)
                  : <span aria-hidden="true" style={{ color: LV3.ink3, fontSize: 18 }}>○</span>}
              </div>
            ))}
          </Glass>
          <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
            Démo · la connexion réelle à Apple Santé (HealthKit)<br />se fait dans l'app iOS native.
          </div>
        </div>
        <div style={{ height: 96 }} />
      </div>
      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
