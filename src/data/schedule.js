/* Jours d'entraînement de la semaine (0=dim … 6=sam) — programme fixe,
   fidèle à la référence : Lun/Mar/Jeu/Ven obligatoires, Sam optionnel,
   Mer/Dim repos. Modifiable via `preferredTrainingDays` dans Réglages. */

const FIXED_TRAINING_DAYS = [1, 2, 4, 5, 6]; // lun, mar, jeu, ven, +sam optionnel

/* Repos entre les séries, modulé par objectif (secondes) */
export const REST_SECONDS_BY_GOAL = { volume: 90, global: 75, taille: 60, energie: 75, posture: 60 };

const REST_MESSAGES = {
  mens: "Repos sacré — mobilité douce si tu en as envie, rien d'obligatoire.",
  fol: 'Repos programmé pour laisser le corps absorber la charge.',
  ov: 'Récupération entre deux séances à haute intensité.',
  lut: 'Repos actif — une marche suffit, pas besoin de plus.',
};

/* Jours d'entraînement de la semaine. Si `preferredDays` est renseigné
   (dispos choisies dans Réglages), on les utilise à la place du programme fixe. */
export function trainingWeekdaysFor(phase, goal = 'global', preferredDays = []) {
  if (preferredDays && preferredDays.length) {
    return [...new Set(preferredDays)].sort((a, b) => a - b);
  }
  return FIXED_TRAINING_DAYS;
}

export function isTrainingDay(phase, goal = 'global', date = new Date(), preferredDays = []) {
  return trainingWeekdaysFor(phase, goal, preferredDays).includes(date.getDay());
}

export function restMessage(phase) {
  return REST_MESSAGES[phase] || 'Jour de repos programmé.';
}

/* Si l'utilisatrice a choisi ses propres jours (Réglages), on garde le même
   contenu de séances mais on le décale sur les jours qu'elle préfère —
   position i de ses jours choisis ↔ position i du programme fixe.
   Renvoie le jour "de référence" (clé du programme) à utiliser pour `weekday`
   réel, ou null si ce n'est pas un jour d'entraînement choisi. */
export function resolveSessionWeekday(weekday, preferredDays = []) {
  if (!preferredDays || !preferredDays.length) return weekday;
  const sorted = [...new Set(preferredDays)].sort((a, b) => a - b);
  const idx = sorted.indexOf(weekday);
  if (idx === -1) return null;
  return FIXED_TRAINING_DAYS[idx] ?? null;
}
