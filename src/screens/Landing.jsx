import { useState, useEffect, useRef } from 'react';
import { LV3 } from '../theme/tokens';
import { MUSES } from '../data/muses';
import { GOALS, LuneStore } from '../store/luneStore';
import { PRIVACY_SECTIONS, TERMS_SECTIONS } from '../data/legal';
import { asset } from '../utils/format';

const NAV_LINKS = [
  { href: '#comment', l: 'Comment ça marche' },
  { href: '#objectifs', l: 'Objectifs' },
  { href: '#tarifs', l: 'Tarifs' },
];

function useIsMobileNav() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 700 : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

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

/* Mockup fidèle d'un écran de l'app, dans un cadre iPhone */
function PhoneMockup({ museKey = 'alya' }) {
  const m = MUSES[museKey];
  const macros = [['PROT', '74', LV3.peach], ['GLUC', '100', LV3.gold], ['LIP', '28', LV3.sage]];
  return (
    <div style={{ position: 'relative', width: 'clamp(230px, 60vw, 288px)', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: -34, borderRadius: 70, background: `radial-gradient(circle at 50% 26%, ${m.palette.accent}38, transparent 68%)`, filter: 'blur(34px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', borderRadius: 46, background: '#09050a', padding: 8, boxShadow: '0 50px 110px rgba(0,0,0,0.62), inset 0 0 0 1.5px rgba(255,255,255,0.09), inset 0 1px 2px rgba(255,255,255,0.14)' }}>
        <div style={{ borderRadius: 39, overflow: 'hidden', background: `linear-gradient(178deg, ${LV3.bgTop} 0%, ${LV3.bg} 46%, ${LV3.bgDeep} 100%)`, padding: '15px 14px 16px', position: 'relative' }}>
          {/* Aurora interne */}
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 60% at 20% 0%, ${m.palette.glow} 0%, transparent 52%)`, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            {/* status bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5, color: LV3.ink3, marginBottom: 14 }}>
              <span>9:41</span><span style={{ letterSpacing: '.1em' }}>◗ ◫ 100</span>
            </div>
            {/* greeting */}
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7.5, letterSpacing: '.2em', color: LV3.ink3 }}>LUNDI · JOUR 9</div>
            <div className="lv3-serif" style={{ fontSize: 23, fontStyle: 'italic', marginTop: 2, lineHeight: 1 }}>Bonjour<span style={{ color: m.palette.accent }}>,</span> toi</div>
            {/* séance card */}
            <div style={{ marginTop: 12, borderRadius: 18, overflow: 'hidden', border: `1px solid ${LV3.glassLine}`, background: 'rgba(255,224,196,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,250,242,0.14)' }}>
              <div style={{ height: 132, position: 'relative' }}>
                <img src={asset(m.img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 38%, ${LV3.bg}F2 100%)` }} />
                <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, letterSpacing: '.16em', color: m.palette.accent }}>SÉANCE DU JOUR</div>
                  <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', lineHeight: 1.05, marginTop: 2 }}>Lower Body A</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: LV3.ink3, marginTop: 3 }}>7 EXOS · FOLLICULAIRE</div>
                </div>
              </div>
              <div style={{ padding: 9 }}>
                <div className="lv3-fab" style={{ padding: '10px', borderRadius: 99, textAlign: 'center', background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`, color: '#231016', fontWeight: 600, fontSize: 11, letterSpacing: '.02em' }}>Commencer ✦</div>
              </div>
            </div>
            {/* macros */}
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {macros.map(([l, v, c]) => (
                <div key={l} style={{ flex: 1, padding: '9px 8px', borderRadius: 13, border: `1px solid ${LV3.glassLine}`, background: 'rgba(255,224,196,0.04)' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 6.5, letterSpacing: '.12em', color: LV3.ink3 }}>{l}</div>
                  <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', marginTop: 1 }}>{v}</div>
                  <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.08)', marginTop: 5, overflow: 'hidden' }}>
                    <div style={{ width: '58%', height: '100%', background: c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Landing() {
  const [legalOpen, setLegalOpen] = useState(null); // 'privacy' | 'terms' | null
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobileNav = useIsMobileNav();
  const enter = () => LuneStore.set({ entered: true });
  const navRef = useRef(null);
  const [navH, setNavH] = useState(66);
  useEffect(() => {
    if (navRef.current) setNavH(navRef.current.getBoundingClientRect().height);
  }, [isMobileNav]);

  const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' };
  const sectionLabel = { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: LV3.peach };

  return (
    <div style={{ minHeight: '100vh', background: LV3.bg, color: LV3.ink, fontFamily: 'Manrope, sans-serif', overflowX: 'hidden' }}>
      {/* Ambient background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: `radial-gradient(120% 60% at 20% -10%, ${MUSES.lina.palette.glow} 0%, transparent 50%), radial-gradient(100% 60% at 90% 10%, ${LV3.rose}18 0%, transparent 55%)` }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Nav — fixe, se détache au scroll, vrai menu compact sur mobile */}
        <nav ref={navRef} style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
          background: `${LV3.bgDeep}D9`,
          backdropFilter: 'blur(18px) saturate(1.3)', WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
          borderBottom: `1px solid ${LV3.glassLine}`,
        }}>
          <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 24px' }}>
            <div className="lv3-serif" style={{ fontSize: 24, fontStyle: 'italic' }}>Lune<span style={{ color: LV3.peach }}>.</span></div>

            {isMobileNav ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={enter} style={{
                  padding: '9px 16px', borderRadius: 99, border: 'none', cursor: 'pointer',
                  background: `linear-gradient(135deg, ${LV3.peach}, ${LV3.peach2})`, color: '#231016', fontWeight: 600, fontSize: 12.5, fontFamily: 'Manrope, sans-serif',
                }}>Essayer</button>
                <button
                  onClick={() => setMenuOpen(v => !v)} aria-label="Menu" aria-expanded={menuOpen}
                  style={{
                    width: 38, height: 38, borderRadius: 12, border: `1px solid ${LV3.glassLine2}`, background: 'rgba(255,255,255,0.04)',
                    color: LV3.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                  }}>
                  <span aria-hidden="true" style={{ fontSize: 15 }}>{menuOpen ? '✕' : '☰'}</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 'clamp(14px, 3vw, 28px)', alignItems: 'center' }}>
                {NAV_LINKS.map(n => (
                  <a key={n.href} href={n.href} style={{ color: LV3.ink2, fontSize: 13.5, textDecoration: 'none' }}>{n.l}</a>
                ))}
                <button onClick={enter} className="lv3-fab" style={{
                  padding: '10px 20px', borderRadius: 99, border: 'none', cursor: 'pointer',
                  background: `linear-gradient(135deg, ${LV3.peach}, ${LV3.peach2})`, color: '#231016', fontWeight: 600, fontSize: 13, fontFamily: 'Manrope, sans-serif',
                }}>Essayer Lune</button>
              </div>
            )}
          </div>

          {isMobileNav && menuOpen && (
            <div className="lv3-rise" style={{ borderTop: `1px solid ${LV3.glassLine}`, padding: '6px 24px 18px', display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map(n => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} style={{
                  color: LV3.ink2, fontSize: 15, textDecoration: 'none', padding: '13px 2px', borderBottom: `1px solid ${LV3.faint}`,
                }}>{n.l}</a>
              ))}
            </div>
          )}
        </nav>
        <div style={{ height: navH }} aria-hidden="true" />

        {/* Hero */}
        <header style={{ ...wrap, padding: 'clamp(40px, 8vw, 90px) 24px clamp(50px, 8vw, 100px)', display: 'flex', gap: 'clamp(24px, 5vw, 60px)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="lv3-rise" style={{ flex: '1 1 420px', minWidth: 280 }}>
            <div style={sectionLabel}>SLIM THICK · ÉLÉGANT</div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(40px, 6.4vw, 68px)', lineHeight: 1.0, margin: '16px 0 0', fontWeight: 400, letterSpacing: '-0.015em' }}>
              Ton corps change<br />chaque semaine.<br /><em className="lv3-grad-text">Ton programme aussi.</em>
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
            <div style={{ display: 'flex', gap: 'clamp(14px,3vw,26px)', marginTop: 26, flexWrap: 'wrap', color: LV3.ink3, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, letterSpacing: '.02em' }}>
              <span>✦ 100&nbsp;% gratuit</span>
              <span>✦ Sans compte</span>
              <span>✦ Données privées</span>
            </div>
          </div>

          <div className="lune-stagger" style={{ flex: '1 1 300px', minWidth: 260, display: 'flex', gap: 14, justifyContent: 'center' }}>
            {['mira', 'alya', 'sora', 'lina'].map((k, i) => {
              const M = MUSES[k];
              return (
                <div key={k} style={{
                  width: '23%', minWidth: 70, aspectRatio: '3/4.6', borderRadius: 20, overflow: 'hidden', position: 'relative',
                  border: `1px solid ${LV3.glassLine}`, marginTop: i % 2 ? 28 : 0, boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                }}>
                  <img src={asset(M.img)} alt={M.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 16%' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 55%, ${M.palette.base}E6 100%)` }} />
                  <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 15, color: '#fff' }}>{M.name.slice(0, 1) + M.name.slice(1).toLowerCase()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </header>

        {/* Product showcase — l'app en situation */}
        <section style={{ ...wrap, padding: 'clamp(30px, 5vw, 60px) 24px' }}>
          <div style={{
            display: 'flex', gap: 'clamp(28px, 5vw, 64px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
            borderRadius: 30, padding: 'clamp(30px, 5vw, 56px) clamp(24px, 4vw, 48px)',
            border: `1px solid ${LV3.glassLine}`,
            background: `radial-gradient(120% 130% at 12% 0%, ${LV3.peach}12 0%, transparent 55%), rgba(255,255,255,0.015)`,
          }}>
            <PhoneMockup museKey="alya" />
            <div style={{ flex: '1 1 300px', minWidth: 260 }}>
              <div style={sectionLabel}>TON TABLEAU DE BORD</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(26px, 3.6vw, 38px)', margin: '10px 0 0', fontWeight: 400, lineHeight: 1.08 }}>
                Chaque matin, <em className="lv3-grad-text">tout est déjà prêt.</em>
              </h2>
              <p style={{ color: LV3.ink2, fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.65, margin: '16px 0 0', maxWidth: 440 }}>
                Ta séance du jour, tes macros, ton jour de cycle — d'un coup d'œil, sans réfléchir. Tu ouvres l'app, tu appuies sur « Commencer », c'est parti.
              </p>
              <div className="lune-stagger" style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['✦', 'La bonne séance, au bon moment du cycle'],
                  ['✦', 'Tes macros calculées, pas devinées'],
                  ['✦', 'Zéro configuration quotidienne — tout suit'],
                ].map(([i, t]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: LV3.peach, fontSize: 13 }} aria-hidden="true">{i}</span>
                    <span style={{ fontSize: 14.5, color: LV3.ink, fontStyle: 'italic', fontFamily: "'Fraunces', serif" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section id="comment" style={{ ...wrap, padding: 'clamp(40px, 6vw, 70px) 24px' }}>
          <div style={sectionLabel}>COMMENT ÇA MARCHE</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', margin: '10px 0 8px', fontWeight: 400 }}>
            Quatre muses, <em style={{ color: LV3.peach }}>une par phase</em>
          </h2>
          <p style={{ color: LV3.ink3, fontSize: 14.5, maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>
            Le programme suit ton cycle réel — séances, macros et recommandations changent avec ta phase. Cycle irrégulier, absent, contraception ou ménopause ? Choisis simplement l'énergie qui te correspond : elle reste stable, sans jamais te forcer à suivre un cycle que tu n'as pas.
          </p>
          <div className="lune-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {['mira', 'alya', 'sora', 'lina'].map(k => {
              const M = MUSES[k];
              return (
                <div key={k} style={{ padding: 20, borderRadius: 20, border: `1px solid ${LV3.glassLine}`, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', border: `1px solid ${M.palette.accent}` }}>
                      <img src={asset(M.head)} alt={M.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%' }} />
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

        {/* Fonctionnalités */}
        <section style={{ ...wrap, padding: 'clamp(40px, 6vw, 70px) 24px' }}>
          <div style={sectionLabel}>TOUT EN UN</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', margin: '10px 0 8px', fontWeight: 400 }}>
            Ta coach de poche, <em style={{ color: LV3.peach }}>vraiment complète</em>
          </h2>
          <p style={{ color: LV3.ink3, fontSize: 14.5, maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>
            Pas une app de plus. Un accompagnement entier : t'entraîner, manger juste, suivre tes progrès — pensé pour ton corps de femme, phase par phase.
          </p>
          <div className="lune-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { i: '∿', t: 'Programme jour par jour', d: "Un split hebdo structuré (fessiers, posture, core), à la maison ou en salle. Chaque exercice démontré en photo ou en vidéo." },
              { i: '◇', t: 'Nutrition sur mesure', d: 'Tes macros calculées depuis ton profil réel — pas une table générique. Recettes et liste de courses générées pour ta phase.' },
              { i: '○', t: 'Synchronisé à ton cycle', d: "Séances allégées en phase menstruelle, volume réduit en lutéale, plein gaz en phase d'or. Ou une énergie fixe si tu n'as pas de cycle." },
              { i: '◐', t: 'Progrès en images', d: 'Photos avant/après, mesures, poids : le miroir le plus honnête de ta transformation, bien plus que la balance.' },
              { i: '✚', t: 'Adapté à toi', d: "Blessures aux genoux ou au dos ? Les exercices à risque sont retirés et remplacés automatiquement. Morphologie et objectif pris en compte." },
              { i: '☾', t: 'Privé & hors-ligne', d: 'Tout reste sur ton appareil. Aucun compte, aucune donnée envoyée ailleurs, aucune pub. Ton corps ne regarde que toi.' },
            ].map((f, i) => (
              <div key={i} style={{ padding: 22, borderRadius: 20, border: `1px solid ${LV3.glassLine}`, background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${LV3.peach}18`, color: LV3.peach, fontSize: 20, marginBottom: 14 }} aria-hidden="true">{f.i}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 19, color: LV3.ink }}>{f.t}</div>
                <div style={{ fontSize: 12.5, color: LV3.ink2, marginTop: 8, lineHeight: 1.55 }}>{f.d}</div>
              </div>
            ))}
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
          <div className="lune-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
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

        {/* CTA de clôture */}
        <section style={{ ...wrap, padding: 'clamp(30px, 5vw, 50px) 24px clamp(50px, 7vw, 80px)' }}>
          <div style={{
            position: 'relative', overflow: 'hidden', borderRadius: 28, padding: 'clamp(34px, 6vw, 60px) clamp(24px, 5vw, 54px)', textAlign: 'center',
            border: `1px solid ${LV3.peach}44`,
            background: `radial-gradient(120% 140% at 50% 0%, ${LV3.peach}1F 0%, ${LV3.rose}12 40%, transparent 75%), rgba(255,255,255,0.02)`,
          }}>
            <div style={sectionLabel}>PRÊTE ?</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(28px, 4.5vw, 46px)', margin: '12px auto 0', fontWeight: 400, maxWidth: 620, lineHeight: 1.08 }}>
              Ton programme t'attend.<br /><em style={{ color: LV3.peach }}>Il change avec toi.</em>
            </h2>
            <p style={{ color: LV3.ink2, fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.6, maxWidth: 460, margin: '18px auto 0' }}>
              Deux minutes pour te configurer, et tu as ta première séance. Gratuit, sans compte, sans engagement.
            </p>
            <button onClick={enter} className="lv3-fab" style={{
              marginTop: 28, padding: '17px 34px', borderRadius: 99, border: 'none', cursor: 'pointer',
              background: `linear-gradient(135deg, ${LV3.peach}, ${LV3.peach2})`, color: '#231016', fontWeight: 600, fontSize: 15, fontFamily: 'Manrope, sans-serif',
            }}>Commencer gratuitement →</button>
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
