import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { navBtnStyle } from '../utils/format';
import { todayISO } from '../utils/dateScope';

const WATER_GOAL = 8; // verres de 250 ml/jour

export function Health() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const today = todayISO();
  const manual = (s.healthManual || {})[today] || {};
  const glasses = (s.hydration || {})[today] || 0;

  const setManual = (patch) => LuneStore.set(st => ({
    healthManual: { ...(st.healthManual || {}), [today]: { ...((st.healthManual || {})[today] || {}), ...patch } },
  }));
  const setGlasses = (n) => LuneStore.set(st => ({ hydration: { ...(st.hydration || {}), [today]: Math.max(0, n) } }));

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 12, boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)', border: `1px solid ${LV3.glassLine2}`,
    color: LV3.ink, fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 20, outline: 'none', textAlign: 'center',
  };

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
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>SUIVI SANTÉ</div>
          <h1 className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Ton <em style={{ color: m.palette.accent }}>corps</em>, aujourd'hui
          </h1>
          <p style={{ fontSize: 12.5, color: LV3.ink3, marginTop: 8, lineHeight: 1.5, maxWidth: 300 }}>
            Saisie manuelle — tes données restent sur cet appareil. Aucune connexion externe requise.
          </p>
        </div>

        {/* Sommeil & pas */}
        <div style={{ padding: '18px 16px 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: '.20em', textTransform: 'uppercase', color: LV3.ink3, margin: '4px 4px 10px' }}>Sommeil & pas</div>
          <Glass tight style={{ padding: '16px 16px' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.14em', color: LV3.ink3, marginBottom: 6 }}>SOMMEIL (H)</div>
                <input type="number" inputMode="decimal" step="0.5" min="0" max="14" placeholder="—"
                  value={manual.sleepH ?? ''} onChange={e => setManual({ sleepH: e.target.value ? Number(e.target.value) : null })}
                  aria-label="Heures de sommeil" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.14em', color: LV3.ink3, marginBottom: 6 }}>PAS</div>
                <input type="number" inputMode="numeric" min="0" placeholder="—"
                  value={manual.steps ?? ''} onChange={e => setManual({ steps: e.target.value ? Number(e.target.value) : null })}
                  aria-label="Nombre de pas" style={inputStyle} />
              </div>
            </div>
            <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 12, lineHeight: 1.6 }}>
              Renseigne-les le soir ou dès le réveil — ils alimentent ton Bilan hebdo.
            </div>
          </Glass>
        </div>

        {/* Hydratation */}
        <div style={{ padding: '8px 16px 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: '.20em', textTransform: 'uppercase', color: LV3.ink3, margin: '4px 4px 10px' }}>Hydratation</div>
          <Glass style={{ padding: '18px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="lv3-serif" style={{ fontSize: 32, fontStyle: 'italic', lineHeight: 1, color: glasses >= WATER_GOAL ? LV3.sage : LV3.ink }}>
                  {glasses}<span style={{ fontSize: 15, color: LV3.ink3 }}> / {WATER_GOAL} verres</span>
                </div>
                <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 4 }}>≈ {(glasses * 0.25).toFixed(2).replace('.', ',')} L aujourd'hui</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setGlasses(glasses - 1)} aria-label="Retirer un verre" style={{
                  width: 40, height: 40, borderRadius: '50%', border: `1px solid ${LV3.glassLine2}`, background: 'transparent',
                  color: LV3.ink2, fontSize: 18, cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace",
                }}>−</button>
                <button onClick={() => setGlasses(glasses + 1)} aria-label="Ajouter un verre" className="lv3-fab" style={{
                  width: 40, height: 40, borderRadius: '50%', border: 'none',
                  background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
                  color: '#231016', fontSize: 18, cursor: 'pointer', fontWeight: 700,
                }}>+</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
              {Array.from({ length: WATER_GOAL }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 6, borderRadius: 99, background: i < glasses ? m.palette.accent : 'rgba(255,255,255,0.08)' }} />
              ))}
            </div>
          </Glass>
        </div>

        <div style={{ padding: '8px 16px 16px' }}>
          <Glass tight style={{ padding: '14px 16px' }}>
            <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, lineHeight: 1.6 }}>
              Connexion automatique (Apple Santé, Health Connect) — prévue dans une future version native. Pour l'instant, une saisie manuelle honnête vaut mieux qu'une fausse synchronisation.
            </div>
          </Glass>
        </div>
        <div style={{ height: 96 }} />
      </div>
      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
