import { useState, useEffect, useRef } from 'react';
import { LV3 } from './theme/tokens';
import { MUSES, PHASE_TO_MUSE } from './data/muses';
import { useLune, LuneStore, activePhase, luneNav, luneBack } from './store/luneStore';
import { CycleRingV3 } from './components/Glass';
import { MuseAvatar } from './components/MuseAvatar';
import { SplashIntro } from './components/SplashIntro';
import { notify } from './utils/notifications';
import { asset } from './utils/format';
import { Onboarding } from './screens/Onboarding';
import { Welcome } from './screens/Welcome';
import { Dashboard } from './screens/Dashboard';
import { Workout } from './screens/Workout';
import { Nutrition } from './screens/Nutrition';
import { Constellation } from './screens/Constellation';
import { Profile } from './screens/Profile';
import { Body } from './screens/Body';
import { Photos } from './screens/Photos';
import { Settings } from './screens/Settings';
import { Journal } from './screens/Journal';
import { Recipe } from './screens/Recipe';
import { Recipes } from './screens/Recipes';
import { Shopping } from './screens/Shopping';
import { ExoDetail } from './screens/ExoDetail';
import { Bilan } from './screens/Bilan';
import { Health } from './screens/Health';
import { Help } from './screens/Help';
import { About } from './screens/About';
import { Program } from './screens/Program';
import { Privacy } from './screens/Privacy';
import { Terms } from './screens/Terms';
import { Landing } from './screens/Landing';
import { Supplements } from './screens/Supplements';
import { Mantras } from './screens/Mantras';
import { Quiz } from './screens/Quiz';
import { Morpho } from './screens/Morpho';
import { Strategie } from './screens/Strategie';

/* ─── Router : map clé → écran ─────────────────────────── */
const SCREENS = {
  today: Dashboard,
  seance: Workout,
  nutrition: Nutrition,
  cycle: Constellation,
  moi: Profile,
  mesures: Body,
  photos: Photos,
  settings: Settings,
  journal: Journal,
  recipe: Recipe,
  recipes: Recipes,
  shopping: Shopping,
  exo: ExoDetail,
  bilan: Bilan,
  health: Health,
  help: Help,
  about: About,
  welcome: Welcome,
  programme: Program,
  privacy: Privacy,
  terms: Terms,
  supplements: Supplements,
  mantras: Mantras,
  quiz: Quiz,
  morpho: Morpho,
  strategie: Strategie,
};

/* ─── App Shell ────────────────────────────────────────── */
function AppShell() {
  const s = useLune();
  const screen = s.screen || 'today';
  const onboarded = !!s.onboarded;
  const [splash, setSplash] = useState(true);

  // Hardware / browser back button → pop the nav stack
  useEffect(() => {
    const onPop = () => { luneBack(); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Notification réelle quand la phase (donc la muse) change vraiment
  const phase = activePhase(s);
  const prevPhase = useRef(phase);
  useEffect(() => {
    if (onboarded && s.notifCycle && prevPhase.current !== phase) {
      const nm = MUSES[PHASE_TO_MUSE[phase]];
      notify('Ta phase a changé', `${nm.name} prend le relais · ${nm.phaseLabel}.`);
    }
    prevPhase.current = phase;
  }, [phase, onboarded, s.notifCycle]);

  const needsOnboarding = !onboarded;
  const Screen = SCREENS[screen] || Dashboard;

  return (
    <PhoneFrame>
      {splash && <SplashIntro onDone={() => setSplash(false)} />}
      {needsOnboarding ? (
        <Onboarding onDone={() => LuneStore.set({ onboarded: true })} />
      ) : (
        <div key={screen} className="lune-screen-in" style={{ position: 'absolute', inset: 0 }}>
          <Screen />
        </div>
      )}
    </PhoneFrame>
  );
}

/* ─── Breakpoint hook ──────────────────────────────────── */
function useViewport() {
  const get = () => (typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [w, setW] = useState(get);
  useEffect(() => {
    const r = () => setW(get());
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  // tiers: 'mobile' (<600) | 'device' (600–1199) | 'desktop' (≥1200)
  const tier = w < 600 ? 'mobile' : w < 1200 ? 'device' : 'desktop';
  return { w, tier };
}

/* ─── Device shell (bezel + screen reflection) ─────────── */
function DeviceShell({ children, height = 'min(896px, 94vh)' }) {
  return (
    <div style={{
      position: 'relative', width: 414, height,
      borderRadius: 46, background: '#0a0508',
      padding: 9,
      boxShadow: '0 50px 120px rgba(0,0,0,0.65), 0 8px 28px rgba(0,0,0,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.12)',
      flexShrink: 0,
    }}>
      {/* Screen */}
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 38, overflow: 'hidden', background: LV3.bg }}>
        {children}
        {/* Glass reflection sweep */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50,
          background: 'linear-gradient(120deg, rgba(255,255,255,0.06) 0%, transparent 22%, transparent 100%)',
        }} />
      </div>
    </div>
  );
}

/* ─── Desktop side panels (cycle-reactive) ─────────────── */
function DesktopAside({ children }) {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const noCycle = s.cycleMode === 'none';

  const jumps = [
    { k: 'today', l: "Aujourd'hui", i: '◐' },
    { k: 'seance', l: 'Séance', i: '∿' },
    { k: 'nutrition', l: 'Nutrition', i: '◇' },
    { k: 'recipes', l: 'Recettes', i: '❉' },
    { k: 'cycle', l: 'Cycle', i: '○' },
    { k: 'photos', l: 'Photos', i: '◐' },
    { k: 'journal', l: 'Journal', i: '✎' },
    { k: 'moi', l: 'Moi', i: '✿' },
  ];
  const screen = s.screen;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(26px, 4vw, 76px)' }}>
      {/* LEFT — brand + muse of the week */}
      <aside style={{ width: 288, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div>
          <div className="lv3-serif" style={{ fontSize: 46, fontStyle: 'italic', lineHeight: .9, color: LV3.ink, letterSpacing: '-0.02em' }}>
            Lune<span style={{ color: m.palette.accent }}>.</span>
          </div>
          <div className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.28em', color: LV3.ink3, marginTop: 8 }}>SLIM THICK · ÉLÉGANT</div>
        </div>

        {/* Muse card */}
        <div className="lv3-glass" style={{ padding: 0, overflow: 'hidden', borderRadius: 26 }}>
          <div style={{ position: 'relative', height: 230, background: m.palette.base }}>
            <img src={asset(m.img)} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 14%' }} />
            <div className="lv3-grain"></div>
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${m.palette.base}F0 100%)` }} />
            <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
              <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.2em', color: m.palette.accent }}>TA MUSE CETTE SEMAINE</div>
              <div className="lv3-serif" style={{ fontSize: 34, fontStyle: 'italic', color: LV3.ink, lineHeight: .95, marginTop: 4 }}>
                {m.name.slice(0, 1) + m.name.slice(1).toLowerCase()}
              </div>
              <div className="lv3-mono" style={{ fontSize: 10, color: LV3.ink2, marginTop: 4, letterSpacing: '.04em' }}>{m.tag} · {m.phaseLabel}</div>
            </div>
          </div>
          <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            {noCycle ? <MuseAvatar muse={muse} size={56} ring /> : <CycleRingV3 size={56} day={s.cycleDay} phase={activePhase(s)} />}
            <div style={{ flex: 1 }}>
              <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.16em', color: LV3.ink3 }}>{noCycle ? 'VIBE FIXE' : `JOUR ${s.cycleDay} / 28`}</div>
              <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', color: LV3.ink, marginTop: 3, lineHeight: 1.3 }}>{m.energy}.</div>
            </div>
          </div>
        </div>

        <div className="lv3-serif" style={{ fontSize: 17, fontStyle: 'italic', color: LV3.ink2, lineHeight: 1.45 }}>
          « {m.quote} »
        </div>
      </aside>

      {/* CENTER — device */}
      {children}

      {/* RIGHT — quick nav + context */}
      <aside style={{ width: 224, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div className="lv3-mono" style={{ fontSize: 9.5, letterSpacing: '.24em', color: LV3.ink3, marginBottom: 14 }}>NAVIGUER</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {jumps.map(j => {
              const isA = j.k === screen;
              return (
                <button key={j.k} onClick={() => luneNav(j.k)} style={{
                  display: 'flex', alignItems: 'center', gap: 13, padding: '11px 15px', borderRadius: 16, cursor: 'pointer',
                  textAlign: 'left', fontFamily: 'Manrope, sans-serif', transition: 'all .2s',
                  background: isA ? `${m.palette.accent}1E` : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${isA ? m.palette.accent + '66' : LV3.glassLine}`,
                  color: isA ? m.palette.accent : LV3.ink2,
                }}>
                  <span style={{ fontSize: 16, width: 18, textAlign: 'center' }}>{j.i}</span>
                  <span style={{ fontSize: 13.5, fontWeight: isA ? 600 : 400 }}>{j.l}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lv3-glass" style={{ padding: '16px 18px', borderRadius: 20 }}>
          <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.18em', color: m.palette.accent }}>ASTUCE</div>
          <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', color: LV3.ink2, marginTop: 6, lineHeight: 1.4 }}>
            Le cycle pilote tout. Change ta phase dans <em style={{ color: m.palette.accent }}>Cycle</em> — toute l'app se reteinte.
          </div>
        </div>

        <div className="lv3-mono" style={{ fontSize: 9, letterSpacing: '.12em', color: LV3.ink3, lineHeight: 1.7 }}>
          Maquette interactive · données fictives.<br />Glisse en plein écran sur mobile.
        </div>
      </aside>
    </div>
  );
}

/* ─── Phone frame responsive ───────────────────────────── */
function PhoneFrame({ children }) {
  const { tier } = useViewport();
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];

  if (tier === 'mobile') {
    // Fill the viewport on mobile
    return (
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: LV3.bg }}>
        {children}
      </div>
    );
  }

  // Ambient backdrop tinted by the active muse (shared by device + desktop tiers)
  const backdrop = (
    <>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 90% at 18% 0%, ${m.palette.glow} 0%, transparent 45%), radial-gradient(100% 80% at 88% 100%, ${LV3.rose}22 0%, transparent 55%), radial-gradient(circle at 50% 30%, #241420, #09060A 72%)`, transition: 'background .8s' }} />
      <div className="lv3-blob" style={{ position: 'absolute', width: 480, height: 480, left: '-8%', top: '-12%', borderRadius: '50%', background: `radial-gradient(circle, ${m.palette.accent}30, transparent 65%)`, filter: 'blur(60px)' }} />
      <div className="lv3-blob" style={{ position: 'absolute', width: 420, height: 420, right: '-6%', bottom: '-14%', borderRadius: '50%', background: `radial-gradient(circle, ${LV3.rose}26, transparent 65%)`, filter: 'blur(60px)', animationDelay: '-8s' }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: .5, mixBlendMode: 'overlay', pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      }} />
    </>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
      {backdrop}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {tier === 'desktop'
          ? <DesktopAside><DeviceShell>{children}</DeviceShell></DesktopAside>
          : <DeviceShell>{children}</DeviceShell>}
      </div>
    </div>
  );
}

/* ─── Racine : vitrine publique avant l'entrée dans l'app ──── */
function Root() {
  const s = useLune();
  if (!s.entered) return <Landing />;
  return <AppShell />;
}

export default Root;
