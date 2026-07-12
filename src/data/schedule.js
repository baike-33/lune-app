/* Jours d'entraînement programmés par phase (0=dim … 6=sam), modulés par l'objectif.
   Un vrai programme n'entraîne pas 7j/7 : la fréquence et l'espacement
   varient avec l'énergie de la phase — et avec ce que tu vises. */

/* Jours candidats par phase, du plus prioritaire au plus optionnel.
   Le nombre de base (BASE_COUNT) définit combien sont retenus par défaut ;
   l'objectif ajoute ou retire des jours en piochant dans cet ordre. */
const TRAINING_PRIORITY = {
  mens: [2, 5, 0],        // mar, ven, +dim en option
  fol: [1, 4, 2, 5, 6],   // lun, jeu, mar, ven, +sam en option
  ov: [1, 5, 3, 6],       // lun, ven, mer, +sam en option
  lut: [1, 3, 6, 4],      // lun, mer, sam, +jeu en option
};

const BASE_COUNT = { mens: 2, fol: 4, ov: 3, lut: 3 };

/* Volume fessiers → +1 jour (fréquence pour la croissance) ·
   Énergie & équilibre → -1 jour (respecte l'énergie basse) ·
   les autres objectifs gardent le rythme de base de la phase */
const GOAL_FREQUENCY_DELTA = { volume: 1, global: 0, taille: 0, energie: -1 };

/* Repos entre les séries, modulé par objectif (secondes) */
export const REST_SECONDS_BY_GOAL = { volume: 90, global: 75, taille: 60, energie: 75 };

const REST_MESSAGES = {
  mens: "Repos sacré — mobilité douce si tu en as envie, rien d'obligatoire.",
  fol: 'Repos programmé pour laisser le corps absorber la charge.',
  ov: 'Récupération entre deux séances à haute intensité.',
  lut: 'Repos actif — une marche suffit, pas besoin de plus.',
};

/* Jours d'entraînement de la semaine pour une phase, ajustés par l'objectif */
export function trainingWeekdaysFor(phase, goal = 'global') {
  const priority = TRAINING_PRIORITY[phase] || [];
  const base = BASE_COUNT[phase] || 0;
  const delta = GOAL_FREQUENCY_DELTA[goal] || 0;
  const count = Math.max(1, Math.min(priority.length, base + delta));
  return priority.slice(0, count).sort((a, b) => a - b);
}

export function isTrainingDay(phase, goal = 'global', date = new Date()) {
  return trainingWeekdaysFor(phase, goal).includes(date.getDay());
}

export function restMessage(phase) {
  return REST_MESSAGES[phase] || 'Jour de repos programmé.';
}
