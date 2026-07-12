import { useState } from 'react';
import { LV3 } from '../theme/tokens';
import { MUSES } from '../data/muses';
import { GOALS, LuneStore } from '../store/luneStore';
import { PRIVACY_SECTIONS, TERMS_SECTIONS } from '../data/legal';

const NAV_LINKS = [
  { href: '#comment', l: 'Comment ça marche' },
  { href: '#objectifs', l: 'Objectifs' },
  { href: '#tarifs', l: 'Tarifs' },
];

function LegalModal({ title, sections, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(8,4,7,0.85)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 640, maxHeight: '85vh', overflowY: 'auto',
        background: LV3.bg2, borderRadius: 24, border: `1px solid ${LV3.glassLine2}`, padding: '32px 28px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 28, color: LV3.ink, margin: 0 }}>{title}</h2>
          <button onClick={onClose} aria-label="Fermer" style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${LV3.glassLine2}`, background: 'rgba(255,255,255,0.05)', color: LV3.ink, fontSize: 16, cursor: 'pointer', flexShrink: 0 }}>×</button>
        </div>
        <div style={{ padding: '12px 16px', borderRadius: 14, border: `1px solid ${LV3.rose}66`, background: `${LV3.rose}14`, marginBottom: 18 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '.1em', color: LV3.rose, marginBottom: 4 }}>⚠ MODÈLE — NON VALIDÉ JURIDIQUEMENT</div>
          <div style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.5 }}>À faire relire par un professionnel du droit avant toute mise en ligne commerciale.</div>
        </div>
        {sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 16, color: LV3.ink }}>{sec.t}</div>
            <div style={{ fontSize: 13, color: LV3.ink2, marginTop: 6, lineHeight: 1.6 }}>{sec.b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Landing() {
  const [legalOpen, setLegalOpen] = useState(null); // 'privacy' | 'terms' | null
  const enter = () => LuneStore.set({ entered: true });

  const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' };
  const sectionLabel = { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: LV3.peach };

  return (
    <div style={{ minHeight: '100vh', background: LV3.bg, color: LV3.ink, fontFamily: 'Manrope, sans-serif', overflowX: 'hidden' }}>
      {/* Ambient background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: `radial-gradient(120% 60% at 20% -10%, ${MUSES.lina.palette.glow} 0%, transparent 50%), radial-gradient(100% 60% at 90% 10%, ${LV3.rose}18 0%, transparent 55%)` }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Nav */}
        <nav style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 26 }}>Lune<span style={{ color: LV3.peach }}>.</span></div>
          <div style={{ display: 'flex', gap: 'clamp(14px, 3vw, 28px)', alignItems: 'center', flexWrap: 'wrap' }}>
            {NAV_LINKS.map(n => (
              <a key={n.href} href={n.href} style={{ color: LV3.ink2, fontSize: 13.5, textDecoration: 'none' }}>{n.l}</a>
            ))}
            <button onClick={enter} style={{
              padding: '10px 20px', borderRadius: 99, border: 'none', cursor: 'pointer',
              background: `linear-gradient(135deg, ${LV3.peach}, ${LV3.peach2})`, color: '#231016', fontWeight: 600, fontSize: 13, fontFamily: 'Manrope, sans-serif',
            }}>Essayer Lune</button>
          </div>
        </nav>

        {/* Hero */}
        <header style={{ ...wrap, padding: 'clamp(40px, 8vw, 90px) 24px clamp(50px, 8vw, 100px)', display: 'flex', gap: 'clamp(24px, 5vw, 60px)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 420px', minWidth: 280 }}>
            <div style={sectionLabel}>SLIM THICK · ÉLÉGANT</div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(38px, 6vw, 64px)', lineHeight: 1.02, margin: '16px 0 0', fontWeight: 400 }}>
              Ton corps change<br />chaque semaine.<br /><em style={{ color: LV3.peach }}>Ton programme aussi.</em>
            </h1>
            <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: LV3.ink2, lineHeight: 1.6, marginTop: 22, maxWidth: 480 }}>
              Entraînement, nutrition et suivi qui s'adaptent à ton cycle — ou à l'énergie que tu choisis si ton cycle est irrégulier, absent, ou que tu es sous contraception ou en ménopause. Un programme sur mesure, jamais générique.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              <button onClick={enter} className="lv3-fab" style={{
                padding: '16px 28px', borderRadius: 99, border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${LV3.peach}, ${LV3.peach2})`, color: '#231016', fontWeight: 600, fontSize: 14.5, fontFamily: 'Manrope, sans-serif',
              }}>Commencer gratuitement →</button>
              <a href="#comment" style={{ padding: '16px 22px', borderRadius: 99, border: `1px solid ${LV3.glassLine2}`, color: LV3.ink2, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>Voir comment ça marche</a>
            </div>
          </div>

          <div style={{ flex: '1 1 300px', minWidth: 260, display: 'flex', gap: 14, justifyContent: 'center' }}>
            {['mira', 'alya', 'sora', 'lina'].map((k, i) => {
              const M = MUSES[k];
              return (
                <div key={k} style={{
                  width: '23%', minWidth: 70, aspectRatio: '3/4.6', borderRadius: 20, overflow: 'hidden', position: 'relative',
                  border: `1px solid ${LV3.glassLine}`, marginTop: i % 2 ? 28 : 0, boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                }}>
                  <img src={M.img} alt={M.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 16%' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 55%, ${M.palette.base}E6 100%)` }} />
                  <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 15, color: '#fff' }}>{M.name.slice(0, 1) + M.name.slice(1).toLowerCase()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </header>

        {/* Comment ça marche */}
        <section id="comment" style={{ ...wrap, padding: 'clamp(40px, 6vw, 70px) 24px' }}>
          <div style={sectionLabel}>COMMENT ÇA MARCHE</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', margin: '10px 0 8px', fontWeight: 400 }}>
            Quatre muses, <em style={{ color: LV3.peach }}>une par phase</em>
          </h2>
          <p style={{ color: LV3.ink3, fontSize: 14.5, maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>
            Le programme suit ton cycle réel — séances, macros et recommandations changent avec ta phase. Cycle irrégulier, absent, contraception ou ménopause ? Choisis simplement l'énergie qui te correspond : elle reste stable, sans jamais te forcer à suivre un cycle que tu n'as pas.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {['mira', 'alya', 'sora', 'lina'].map(k => {
              const M = MUSES[k];
              return (
                <div key={k} style={{ padding: 20, borderRadius: 20, border: `1px solid ${LV3.glassLine}`, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', border: `1px solid ${M.palette.accent}` }}>
                      <img src={M.head} alt={M.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 18, color: M.palette.accent }}>{M.name.slice(0, 1) + M.name.slice(1).toLowerCase()}</div>
                      <div style={{ fontSize: 11, color: LV3.ink3 }}>{M.phaseLabel}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, color: LV3.ink2, lineHeight: 1.5 }}>{M.train}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Objectifs */}
        <section id="objectifs" style={{ ...wrap, padding: 'clamp(40px, 6vw, 70px) 24px' }}>
          <div style={sectionLabel}>SUR MESURE</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', margin: '10px 0 8px', fontWeight: 400 }}>
            Un objectif, <em style={{ color: LV3.peach }}>un vrai calcul</em>
          </h2>
          <p style={{ color: LV3.ink3, fontSize: 14.5, maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>
            Taille, poids, âge et activité renseignés → tes besoins caloriques sont calculés pour toi, pas piochés dans une table générique. Séances, fréquence d'entraînement et recettes suivent.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {Object.entries(GOALS).map(([k, g]) => (
              <div key={k} style={{ padding: 20, borderRadius: 20, border: `1px solid ${LV3.glassLine}`, background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 19, color: LV3.ink }}>{g.label}</div>
                <div style={{ fontSize: 12.5, color: LV3.ink2, marginTop: 8, lineHeight: 1.5 }}>{g.hint}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tarifs */}
        <section id="tarifs" style={{ ...wrap, padding: 'clamp(40px, 6vw, 70px) 24px' }}>
          <div style={sectionLabel}>TARIFS</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', margin: '10px 0 30px', fontWeight: 400 }}>
            Simple, <em style={{ color: LV3.peach }}>sans surprise</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { l: 'Gratuit', p: '0€', d: 'Programme complet adapté à ton cycle ou ta vibe, nutrition, journal, courses.', cta: 'Commencer', featured: false },
              { l: 'Premium', p: 'à venir', d: 'Suivi de progression avancé, export illimité, synchronisation multi-appareil.', cta: 'Bientôt disponible', featured: true },
            ].map((tier, i) => (
              <div key={i} style={{
                padding: 26, borderRadius: 22, border: `1px solid ${tier.featured ? LV3.peach : LV3.glassLine}`,
                background: tier.featured ? `${LV3.peach}0F` : 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 22, color: LV3.ink }}>{tier.l}</div>
                <div style={{ fontSize: 28, color: LV3.peach, marginTop: 8, fontWeight: 600 }}>{tier.p}</div>
                <div style={{ fontSize: 12.5, color: LV3.ink2, marginTop: 10, lineHeight: 1.5, minHeight: 54 }}>{tier.d}</div>
                <button onClick={tier.featured ? undefined : enter} disabled={tier.featured} style={{
                  width: '100%', marginTop: 16, padding: '13px', borderRadius: 99, border: tier.featured ? `1px solid ${LV3.glassLine2}` : 'none', cursor: tier.featured ? 'default' : 'pointer',
                  background: tier.featured ? 'transparent' : `linear-gradient(135deg, ${LV3.peach}, ${LV3.peach2})`,
                  color: tier.featured ? LV3.ink3 : '#231016', fontWeight: 600, fontSize: 13, fontFamily: 'Manrope, sans-serif',
                }}>{tier.cta}</button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ ...wrap, padding: '40px 24px', borderTop: `1px solid ${LV3.faint}`, marginTop: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ maxWidth: 380 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 20 }}>Lune<span style={{ color: LV3.peach }}>.</span></div>
              <div style={{ fontSize: 11.5, color: LV3.ink3, marginTop: 10, lineHeight: 1.6 }}>
                Tes données restent sur ton appareil, jamais envoyées ailleurs. Lune n'est pas un dispositif médical et ne remplace pas l'avis d'un professionnel de santé.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 20, fontSize: 12.5 }}>
              <button onClick={() => setLegalOpen('privacy')} style={{ background: 'none', border: 'none', color: LV3.ink2, cursor: 'pointer', textDecorationLine: 'underline', fontFamily: 'Manrope, sans-serif' }}>Confidentialité</button>
              <button onClick={() => setLegalOpen('terms')} style={{ background: 'none', border: 'none', color: LV3.ink2, cursor: 'pointer', textDecorationLine: 'underline', fontFamily: 'Manrope, sans-serif' }}>CGU</button>
            </div>
          </div>
          <div style={{ fontSize: 10.5, color: LV3.ink3, marginTop: 24 }}>© Lune · Slim Thick Élégant</div>
        </footer>
      </div>

      {legalOpen === 'privacy' && <LegalModal title="Politique de confidentialité" sections={PRIVACY_SECTIONS} onClose={() => setLegalOpen(null)} />}
      {legalOpen === 'terms' && <LegalModal title="Conditions d'utilisation" sections={TERMS_SECTIONS} onClose={() => setLegalOpen(null)} />}
    </div>
  );
}
