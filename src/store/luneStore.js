import { useSyncExternalStore } from 'react';
import { MUSES } from '../data/muses';

/* Source unique de vérité. Persiste en localStorage.
   Le cycle (cycleDay) pilote la phase → la muse active → tout,
   sauf en mode sans-cycle où une muse fixe joue ce rôle. */

const LUNE_KEY = 'lune.store.v2';

/* Jour de cycle → phase */
export function phaseForDay(day) {
  const d = ((Number(day) - 1) % 28 + 28) % 28 + 1;
  if (d <= 5) return 'mens';
  if (d <= 13) return 'fol';
  if (d <= 16) return 'ov';
  return 'lut';
}

/* Phase active de l'app — pilote la muse, le programme, la nutrition partout.
   Cycle régulier : dérivée du jour de cycle. Sans cycle (irrégulier, absent,
   contraception, ménopause…) : la muse choisie par l'utilisatrice reste fixe. */
export function activePhase(state) {
  if (state.cycleMode === 'none' && state.fixedMuse && MUSES[state.fixedMuse]) {
    return MUSES[state.fixedMuse].phase;
  }
  return phaseForDay(state.cycleDay);
}

/* Jour représentatif d'une phase (pour quand on choisit une phase à l'onboarding) */
export const PHASE_DEFAULT_DAY = { mens: 3, fol: 9, ov: 15, lut: 22 };

/* Date des dernières règles + longueur → jour de cycle courant (vrai calcul) */
export function cycleDayFromDate(lastPeriodISO, cycleLength) {
  if (!lastPeriodISO) return null;
  const len = Number(cycleLength) || 28;
  const start = new Date(lastPeriodISO + 'T00:00:00');
  const now = new Date();
  const days = Math.floor((now - start) / 86400000);
  if (isNaN(days) || days < 0) return null;
  return ((days % len) + len) % len + 1;
}

/* Recadre + compresse une image (File) en dataURL léger pour le stockage local */
export function fileToDataURL(file, maxDim = 520, quality = 0.62) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      try { resolve({ dataUrl: c.toDataURL('image/jpeg', quality), w, h }); }
      catch (e) { reject(e); }
    };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

/* Aliments à privilégier par phase (nutrition + courses) */
export const FOODS_BY_PHASE = {
  mens: ['Foie de morue', 'Lentilles', 'Chocolat 85%', 'Camomille', 'Dattes', 'Curcuma', "Bouillon d'os", 'Sardines'],
  fol:  ['Œufs', 'Quinoa', 'Brocoli', 'Saumon', 'Avocat', 'Graines de lin', 'Chou kale', 'Amandes'],
  ov:   ['Patate douce', 'Riz basmati', 'Mangue', 'Poulet', 'Amandes', 'Maca', 'Œufs', 'Épinards'],
  lut:  ['Avoine', 'Pois chiches', 'Banane', 'Skyr', 'Magnésium', 'Cacao 85%', 'Patate douce', 'Lentilles'],
};

/* Objectifs perso → libellé + cible macros journalières */
export const GOALS = {
  volume:  { label: 'Volume fessiers', short: 'Glute growth', kcal: 2050, p: 130, c: 240, f: 65, hint: 'Léger surplus, glucides hauts autour des séances.' },
  global:  { label: 'Slim thick global', short: 'Recomposition', kcal: 1850, p: 130, c: 200, f: 70, hint: 'Recomposition : maintien calorique, protéines hautes.' },
  taille:  { label: 'Taille fine', short: 'Sculpture', kcal: 1650, p: 135, c: 150, f: 60, hint: 'Léger déficit, protéines ↑, sucres rapides ↓.' },
  energie: { label: 'Énergie & équilibre', short: 'Maintien', kcal: 1900, p: 120, c: 210, f: 68, hint: "Maintien, focus sur l'énergie stable et le confort digestif." },
  posture: { label: 'Posture & dos', short: 'Gainage', kcal: 1900, p: 125, c: 210, f: 68, hint: 'Maintien calorique, accent sur le gainage profond et la mobilité du dos.' },
};

const LUNE_DEFAULTS = {
  entered: false,               // a passé la vitrine publique
  onboarded: false,
  onboardedAt: null,           // ISO 'YYYY-MM-DD' — début du programme 12 mois
  consentGiven: false,         // consentement RGPD explicite (données de santé) — bloque l'onboarding tant que false
  consentDate: null,           // ISO — horodatage du consentement, pour traçabilité
  name: 'toi',
  lastName: '',                 // optionnel — sert aux initiales de l'avatar profil
  morphoType: null,             // 'X'|'A'|'V'|'H'|'O'|'?' — silhouette naturelle, pour l'écran Morpho
  cycleDay: 18,                // → lutéale → Lina (cohérent avec les maquettes)
  goal: 'global',              // objectif perso → cible macros + filtre recettes
  workoutEnv: 'home',          // 'home' | 'gym' — programme maison ou salle
  // profil & cycle réglages
  cycleMode: 'cycle',          // 'cycle' | 'none' — cycle régulier, ou irrégulier/absent/contraception/ménopause
  fixedMuse: null,             // muse choisie quand cycleMode==='none' : 'mira'|'alya'|'sora'|'lina'
  lastPeriod: null,            // ISO 'YYYY-MM-DD' — si renseigné, cycleDay se calcule tout seul
  cycleLength: 28,
  heightCm: 165,
  startWeight: 65.5,
  birthYear: null,             // pour le calcul nutritionnel (BMR) — optionnel
  activityLevel: 'modere',     // 'sedentaire' | 'leger' | 'modere' | 'actif' — pour le calcul nutritionnel
  units: 'metric',             // 'metric' | 'imperial' — affichage uniquement, stockage toujours en kg/cm
  injuries: [],                 // ex: ['genoux','dos'] — limitations physiques déclarées, filtrent les exos à risque
  preferredTrainingDays: [],    // ex: [1,3,5] (0=dim…6=sam) — vide = jours choisis automatiquement par phase/objectif
  kcalOverride: null,           // surcharge calorique manuelle (kcal/jour) — null = calcul automatique (BMR/TDEE)
  mealsPerDay: 4,               // pour répartir la cible nutrition par repas
  notifTrain: true,
  notifCycle: true,
  // photos de progression (exemples — remplaçables par l'utilisatrice)
  photos: [
    { id: 'ph-ex1', dataUrl: '/muses/lina-bridge.png', date: '2026-02-12', day: 8, phase: 'fol', note: '', example: true },
    { id: 'ph-ex2', dataUrl: '/muses/alya-hipthrust.png', date: '2026-05-19', day: 18, phase: 'lut', note: '', example: true },
  ],
  // mesures corporelles (mêmes dates d'exemple que les photos, pour la continuité)
  measurements: [
    { id: 'ms-ex1', date: '2026-02-12', weight: 65.5, waist: 70, hips: 97, thigh: 57.5, example: true },
    { id: 'ms-ex2', date: '2026-05-19', weight: 64.2, waist: 68, hips: 98, thigh: 58, example: true },
  ],
  // workout — démarrage propre : aucune série cochée, chrono à l'arrêt
  workoutActiveExo: 's1',
  workoutDone: {},
  detailExoId: 's1',           // exo affiché sur la fiche détail (Séance › ⓘ)
  // journal
  journalMood: 'calme',
  journalSymptoms: ['bloating'],
  journalNote: '',
  journalEnergy: 3,           // 1–5
  moodLog: {},                // { 'YYYY-MM-DD': moodKey } — historique réel des 7 derniers jours
  mentalTracker: { weekKey: null, done: [] },  // checklist hebdo (Mental) — persistée, se réinitialise chaque semaine
  quizProfile: null,            // dernier résultat du Bilan Personnalisé : { key, label, desc, tags, date }
  // nutrition
  mealLog: [                   // repas réellement enregistrés (aujourd'hui)
    { id: 'm1', time: '7h30', date: new Date().toISOString().slice(0, 10), name: 'Skyr · myrtilles · amandes', kcal: 340, p: 32, c: 38, f: 10 },
    { id: 'm2', time: '13h', date: new Date().toISOString().slice(0, 10), name: 'Poulet · riz basmati · brocoli', kcal: 560, p: 42, c: 62, f: 18 },
  ],
  savedRecipes: ['bowl-reconfort', 'porridge-cacao'],
  activeRecipe: 'bowl-reconfort',
  // régime & allergies — filtrent recettes et liste de courses
  dietPrefs: [],               // ex: ['vegetarien']
  allergies: [],                // ex: ['lactose']
  // shopping
  shoppingChecked: ['flocons-d-avoine', 'banane'],
  shoppingCustom: [],          // articles ajoutés à la main : { id, n, q }
  shoppingRemoved: [],         // clés d'articles auto-générés masqués (réversible)
  // activités hors-programme + santé
  activityLog: [
    { id: 'act-ex', type: 'Marche', icon: '⊳', date: new Date().toISOString().slice(0, 10), min: 32, kcal: 140, intensity: 'douce' },
  ],
  healthManual: {},            // { 'YYYY-MM-DD': { sleepH, steps } } — saisie manuelle réelle, par jour
  hydration: {},                // { 'YYYY-MM-DD': verres } — verres d'eau (250 ml) bus, par jour
  // nav
  screen: 'today',
  navStack: [],
};

function createLuneStore() {
  let state = (function () {
    try { return { ...LUNE_DEFAULTS, ...(JSON.parse(localStorage.getItem(LUNE_KEY)) || {}) }; }
    catch { return { ...LUNE_DEFAULTS }; }
  })();
  const listeners = new Set();
  function persist() {
    try { localStorage.setItem(LUNE_KEY, JSON.stringify(state)); } catch {}
  }
  return {
    get: () => state,
    set(patch) {
      const next = typeof patch === 'function' ? patch(state) : patch;
      state = { ...state, ...next };
      persist();
      listeners.forEach(l => l());
    },
    subscribe(l) { listeners.add(l); return () => listeners.delete(l); },
    reset() { state = { ...LUNE_DEFAULTS }; persist(); listeners.forEach(l => l()); },
  };
}

export const LuneStore = createLuneStore();

/* Hook : renvoie l'état complet (référence stable entre les set) */
export function useLune() {
  return useSyncExternalStore(LuneStore.subscribe, LuneStore.get);
}

/* Recalcule cycleDay depuis la date des règles si elle est renseignée */
export function recomputeCycle() {
  const s = LuneStore.get();
  const d = cycleDayFromDate(s.lastPeriod, s.cycleLength);
  if (d && d !== s.cycleDay) LuneStore.set({ cycleDay: d });
}

/* Navigation centralisée avec pile de retour */
export function luneNav(key) {
  const s = LuneStore.get();
  if (key === s.screen) return;
  LuneStore.set({ screen: key, navStack: [...s.navStack, s.screen] });
  try { window.history.pushState({ luneScreen: key }, ''); } catch {}
}

export function luneBack() {
  const s = LuneStore.get();
  if (s.navStack.length === 0) return false;
  const stack = [...s.navStack];
  const prev = stack.pop();
  LuneStore.set({ screen: prev, navStack: stack });
  return true;
}
