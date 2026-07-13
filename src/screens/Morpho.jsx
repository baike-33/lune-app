import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { navBtnStyle } from '../utils/format';
import { MORPHO_TYPES, MORPHO_CONTENT } from '../data/morpho';

function CardList({ title, items, accent }) {
  return (
    <Glass tight style={{ padding: '16px 16px' }}>
      <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.14em', color: accent, marginBottom: 10 }}>{title.toUpperCase()}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: LV3.ink2, lineHeight: 1.5 }}>
            <span style={{ color: accent, flexShrink: 0 }}>◈</span>{t}
          </div>
        ))}
      </div>
    </Glass>
  );
}

export function Morpho() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const type = s.morphoType || '?';
  const c = MORPHO_CONTENT[type] || MORPHO_CONTENT['?'];

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
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>ANALYSE MORPHOLOGIQUE</div>
          <h1 className="lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1.05 }}>
            {c.title}
          </h1>
          <p style={{ fontSize: 12.5, color: LV3.ink3, marginTop: 8, lineHeight: 1.5 }}>{c.subtitle}</p>
        </div>

        {/* Sélecteur de morphologie */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {MORPHO_TYPES.map(t => {
              const isA = type === t.k;
              return (
                <button key={t.k} onClick={() => LuneStore.set({ morphoType: t.k })} aria-pressed={isA} style={{
                  padding: '8px 13px', borderRadius: 99, border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                  background: isA ? `${m.palette.accent}26` : 'rgba(255,255,255,0.04)',
                  color: isA ? m.palette.accent : LV3.ink2, fontSize: 11.5, fontWeight: isA ? 600 : 400,
                  outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                }}>{t.icon} {t.l}</button>
              );
            })}
          </div>
        </div>

        {/* Lead + métabolisme */}
        <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Glass style={{ padding: '16px 16px', background: `linear-gradient(135deg, ${m.palette.accent}14, ${LV3.rose}06)`, borderLeft: `2px solid ${m.palette.accent}` }}>
            <div className="lv3-serif" style={{ fontSize: 14.5, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.5 }}>{c.lead}</div>
          </Glass>
          <Glass tight style={{ padding: '16px 16px' }}>
            <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.14em', color: LV3.gold, marginBottom: 6 }}>MÉTABOLISME · {c.metabolism.title.toUpperCase()}</div>
            <div style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.55 }}>{c.metabolism.text}</div>
          </Glass>
        </div>

        {/* 3 colonnes empilées */}
        <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CardList title="Forces à exploiter" items={c.strengths} accent={LV3.sage} />
          <CardList title="Zones prioritaires" items={c.priorities} accent={m.palette.accent} />
          <CardList title="Points de vigilance" items={c.watch} accent={LV3.rose} />
        </div>

        {/* Conclusion */}
        <div style={{ padding: '16px 16px 16px' }}>
          <Glass style={{ padding: '22px 20px', textAlign: 'center', background: `linear-gradient(135deg, ${LV3.gold}14, ${m.palette.accent}0A)` }}>
            <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.14em', color: LV3.gold, marginBottom: 8 }}>CONCLUSION DE L'ANALYSE</div>
            <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.45 }}>{c.conclusion}</div>
            <button onClick={() => luneNav('strategie')} style={{
              marginTop: 16, padding: '11px 22px', borderRadius: 99, border: 'none', cursor: 'pointer',
              background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`, color: '#231016',
              fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 12.5, letterSpacing: '.04em',
            }}>Voir la stratégie →</button>
          </Glass>
        </div>

        <div style={{ height: 96 }} />
      </div>
      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
