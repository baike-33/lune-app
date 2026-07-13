import { LV3, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, activePhase, luneNav, GOALS } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { MuseAvatar } from '../components/MuseAvatar';
import { LV3TabBar } from '../components/LV3TabBar';

export function Profile() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const goal = GOALS[s.goal] || GOALS.global;
  const photoCount = (s.photos || []).length;
  const noCycle = s.cycleMode === 'none';

  const tiles = [
    { k: 'photos', i: '◐', l: 'Photos', s: `${photoCount} cliché${photoCount > 1 ? 's' : ''} · avant/après`, c: LV3.gold },
    { k: 'mesures', i: '⊙', l: 'Mesures', s: 'Poids · taille · hanches · graph', c: LV3.rose },
    { k: 'bilan', i: '◈', l: 'Bilan', s: 'Ta semaine en un coup d\'œil', c: LV3.sage },
    { k: 'health', i: '♥', l: 'Santé', s: 'Sommeil, pas, hydratation', c: LV3.peach },
    { k: 'cycle', i: '○', l: 'Mon cycle', s: noCycle ? `${m.phaseLabel} · vibe fixe` : `${m.phaseLabel} · jour ${s.cycleDay}`, c: m.palette.accent },
    { k: 'settings', i: '✷', l: 'Réglages', s: 'Objectif · cycle · profil · données', c: LV3.lavender },
  ];

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />
      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Identity header */}
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <MuseAvatar muse={muse} size={66} ring={true} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="lv3-serif" style={{ fontSize: 28, fontStyle: 'italic', lineHeight: 1 }}>
                {s.name || 'toi'}{s.lastName ? ` ${s.lastName.trim().slice(0, 1).toUpperCase()}.` : ''}
              </div>
              <div className="lv3-mono" style={{ fontSize: 10, color: LV3.ink3, marginTop: 5, letterSpacing: '.04em' }}>
                {goal.label} · {photoCount > 0 ? `${photoCount} photos` : 'objectif actif'}
              </div>
            </div>
          </div>

          {/* Snapshot stats */}
          <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
            {[
              { v: noCycle ? m.phaseLabel : `J${s.cycleDay}`, l: 'Cycle' },
              { v: `${s.startWeight}`, l: 'Départ kg' },
              { v: `${photoCount}`, l: 'Photos' },
              { v: `${(s.savedRecipes || []).length}`, l: 'Recettes ♥' },
            ].map((x, i) => (
              <Glass tight key={i} style={{ flex: 1, padding: '12px 6px', textAlign: 'center' }}>
                <div className="lv3-serif" style={{ fontSize: 22, fontStyle: 'italic', lineHeight: 1 }}>{x.v}</div>
                <div className="lv3-mono" style={{ fontSize: 8, color: LV3.ink3, letterSpacing: '.10em', marginTop: 5 }}>{x.l.toUpperCase()}</div>
              </Glass>
            ))}
          </div>
        </div>

        {/* Tiles */}
        <div style={{ padding: '18px 16px 10px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {tiles.map(t => (
              <button key={t.k} onClick={() => luneNav(t.k)} aria-label={t.l} style={{
                textAlign: 'left', border: `1px solid ${LV3.glassLine}`, cursor: 'pointer',
                background: 'linear-gradient(135deg, rgba(255,220,190,0.08), rgba(255,220,190,0.03))',
                borderRadius: 20, padding: '16px 16px', minHeight: 96, fontFamily: 'Manrope, sans-serif',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: `${t.c}22`, color: t.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{t.i}</div>
                <div>
                  <div className="lv3-serif" style={{ fontSize: 19, fontStyle: 'italic', color: LV3.ink, lineHeight: 1 }}>{t.l}</div>
                  <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 5, lineHeight: 1.4 }}>{t.s}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress encouragement */}
        <div style={{ padding: '4px 16px 12px' }}>
          <Glass style={{ padding: '18px 18px', background: `linear-gradient(135deg, ${m.palette.accent}16, ${LV3.rose}08)` }}>
            <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.20em', textTransform: 'uppercase', color: m.palette.accent }}>TA CONSTANCE</div>
            <div className="lv3-serif" style={{ fontSize: 19, fontStyle: 'italic', marginTop: 8, lineHeight: 1.35 }}>
              « Le corps suit. Ce qui compte, c'est que tu sois <em style={{ color: m.palette.accent }}>revenue</em>. »
            </div>
          </Glass>
        </div>

        {/* Mode + account row */}
        <div style={{ padding: '4px 16px 16px' }}>
          <Glass tight style={{ padding: '4px 4px' }}>
            {[
              { l: 'Bilan personnalisé', s: '5 questions · ton profil', i: '◈', to: 'quiz' },
              { l: 'Morphologie', s: 'Ton analyse silhouette', i: '⌛', to: 'morpho' },
              { l: 'Stratégie', s: 'Roadmap 12 mois', i: '▤', to: 'strategie' },
              { l: 'Suppléments', s: 'Ce qui vaut le coup', i: '✚', to: 'supplements' },
              { l: 'Mental', s: 'Mantras à se rappeler', i: '☾', to: 'mantras' },
              { l: 'Aide & guide', s: 'Comment lire ton cycle', i: '?', to: 'help' },
              { l: 'À propos de Lune', s: 'Slim Thick · Élégant', i: '❍', to: 'about' },
            ].map((r, i, arr) => (
              <div key={i} onClick={() => luneNav(r.to)} role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); luneNav(r.to); } }}
                style={{ padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', borderBottom: i < arr.length - 1 ? `1px solid ${LV3.faint}` : 'none' }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(255,255,255,0.05)', color: LV3.ink2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{r.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: LV3.ink, fontWeight: 500 }}>{r.l}</div>
                  <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 1 }}>{r.s}</div>
                </div>
                <span style={{ color: LV3.ink3 }}>›</span>
              </div>
            ))}
          </Glass>
        </div>

        <div style={{ height: 96 }} />
      </div>

      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
