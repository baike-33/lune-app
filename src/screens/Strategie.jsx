import { useState } from 'react';
import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav, luneBack } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { MuseAvatar } from '../components/MuseAvatar';
import { navBtnStyle } from '../utils/format';
import { MUSE_ROLES, STRATEGY_TIMELINE, RECOMP_PHILOSOPHY, GLUTE_WAIST_STRATEGY, QUAD_AVOIDANCE, VACUUM_PROTOCOL } from '../data/strategie';

function SectionLabel({ children, c }) {
  return <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.20em', textTransform: 'uppercase', color: c || LV3.ink3, margin: '4px 4px 10px' }}>{children}</div>;
}

function TacticCard({ label, title, text, list, accent }) {
  return (
    <Glass tight style={{ padding: '16px 16px' }}>
      <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.12em', color: accent, marginBottom: 6 }}>{label.toUpperCase()}</div>
      {title && <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', color: LV3.ink, marginBottom: 8 }}>{title}</div>}
      {text && <div style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.55 }}>{text}</div>}
      {list && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: text ? 12 : 0, paddingTop: text ? 12 : 0, borderTop: text ? `1px solid ${LV3.faint}` : 'none' }}>
          {list.map((t, i) => <div key={i} style={{ fontSize: 12, color: LV3.ink2, lineHeight: 1.5 }}>· {t}</div>)}
        </div>
      )}
    </Glass>
  );
}

export function Strategie() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const [openTl, setOpenTl] = useState(null);

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
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>STRATÉGIE 12 MOIS</div>
          <h1 className="lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1.05 }}>
            Projection <em style={{ color: m.palette.accent }}>réaliste</em>
          </h1>
        </div>

        {/* Muses cast */}
        <div style={{ padding: '18px 16px 0' }}>
          <SectionLabel c={m.palette.accent}>Tes 4 coachs · les muses</SectionLabel>
          <p style={{ fontSize: 12.5, color: LV3.ink3, lineHeight: 1.55, marginBottom: 12 }}>
            Chaque exercice est démontré par celle qui l'incarne le mieux. Le programme reste le même — mais selon le mouvement, c'est Alya, Mira, Sora ou Lina qui te guide.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['alya', 'mira', 'sora', 'lina'].map(k => {
              const mu = MUSES[k];
              return (
                <Glass tight key={k} style={{ padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <MuseAvatar muse={k} size={44} ring={muse === k} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.12em', color: mu.palette.accent }}>{mu.tag.toUpperCase()}</div>
                    <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', color: LV3.ink, lineHeight: 1.1, marginTop: 2 }}>{mu.name.slice(0, 1) + mu.name.slice(1).toLowerCase()}</div>
                    <div style={{ fontSize: 11, color: LV3.ink3, marginTop: 4, lineHeight: 1.4 }}>{MUSE_ROLES[k]}</div>
                  </div>
                </Glass>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionLabel>Feuille de route</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STRATEGY_TIMELINE.map((tl, i) => {
              const isOpen = openTl === i;
              return (
                <Glass key={i} style={{ padding: 0, overflow: 'hidden' }}>
                  <div onClick={() => setOpenTl(isOpen ? null : i)} role="button" tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenTl(isOpen ? null : i); } }}
                    style={{ padding: '14px 16px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="lv3-serif" style={{ fontSize: 20, fontStyle: 'italic', color: m.palette.accent, opacity: .7 }}>{tl.num}</span>
                      <div style={{ flex: 1 }}>
                        <div className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.1em', color: LV3.ink3 }}>{tl.period.toUpperCase()}</div>
                        <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', color: LV3.ink, marginTop: 2 }}>{tl.title}</div>
                      </div>
                      <span aria-hidden="true" style={{ color: LV3.ink3, fontSize: 13, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>⌄</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 10 }}>
                      {tl.bullets.map((b, bi) => <div key={bi} style={{ fontSize: 12, color: LV3.ink2, lineHeight: 1.5 }}>· {b}</div>)}
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {tl.detail.training && (
                        <div>
                          <div className="lv3-mono" style={{ fontSize: 8, letterSpacing: '.1em', color: m.palette.accent, marginBottom: 4 }}>ENTRAÎNEMENT</div>
                          {tl.detail.training.map((t, ti) => <div key={ti} style={{ fontSize: 11.5, color: LV3.ink2, lineHeight: 1.5 }}>· {t}</div>)}
                        </div>
                      )}
                      {tl.detail.nutrition && (
                        <div>
                          <div className="lv3-mono" style={{ fontSize: 8, letterSpacing: '.1em', color: LV3.gold, marginBottom: 4 }}>NUTRITION</div>
                          {tl.detail.nutrition.map((t, ti) => <div key={ti} style={{ fontSize: 11.5, color: LV3.ink2, lineHeight: 1.5 }}>· {t}</div>)}
                        </div>
                      )}
                      {tl.detail.results && (
                        <div>
                          <div className="lv3-mono" style={{ fontSize: 8, letterSpacing: '.1em', color: LV3.sage, marginBottom: 4 }}>RÉSULTATS ATTENDUS</div>
                          {tl.detail.results.map((t, ti) => <div key={ti} style={{ fontSize: 11.5, color: LV3.ink2, lineHeight: 1.5 }}>· {t}</div>)}
                        </div>
                      )}
                    </div>
                  )}
                </Glass>
              );
            })}
          </div>
        </div>

        {/* Philosophie de recomposition */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionLabel>Stratégie de recomposition corporelle</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {RECOMP_PHILOSOPHY.map((c, i) => (
              <TacticCard key={i} label={c.label} title={c.title} text={c.text} accent={i === 0 ? m.palette.accent : LV3.sage} />
            ))}
          </div>
        </div>

        {/* Fessiers & taille */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionLabel>Stratégie fessiers & taille</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {GLUTE_WAIST_STRATEGY.map((c, i) => (
              <TacticCard key={i} label={c.label} title={c.title} text={c.text} list={c.list} accent={i === 0 ? m.palette.accent : LV3.gold} />
            ))}
          </div>
        </div>

        {/* Évitement quadriceps */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionLabel>Éviter l'excès de quadriceps</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TacticCard label="À limiter / éviter" title="" text="" list={QUAD_AVOIDANCE.avoid} accent={LV3.rose} />
            <TacticCard label="Alternatives quad-friendly" title="" text="" list={QUAD_AVOIDANCE.alternatives} accent={LV3.sage} />
            <TacticCard label="Signaux d'alarme quad" title="" text="" list={QUAD_AVOIDANCE.warnings} accent={m.palette.accent} />
          </div>
        </div>

        {/* Protocole vacuum */}
        <div style={{ padding: '20px 16px 16px' }}>
          <SectionLabel>Vacuum — le secret de la taille fine</SectionLabel>
          <Glass tight style={{ padding: '16px 16px' }}>
            <div className="lv3-serif" style={{ fontSize: 16, fontStyle: 'italic', color: LV3.ink, marginBottom: 10 }}>Protocole vacuum quotidien</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {VACUUM_PROTOCOL.map((t, i) => <div key={i} style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.5 }}>· {t}</div>)}
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
