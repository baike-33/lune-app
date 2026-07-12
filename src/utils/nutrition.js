/* Calcul des besoins caloriques réels (Mifflin-St Jeor) à partir de la taille,
   du poids le plus récent, de l'âge et du niveau d'activité — plutôt qu'une
   table fixe par objectif. Repli honnête sur l'estimation générique si des
   données manquent. */

export const ACTIVITY_LEVELS = [
  { k: 'sedentaire', l: 'Sédentaire', sub: 'Peu ou pas de sport', factor: 1.2 },
  { k: 'leger', l: 'Légèrement actif', sub: '1–3 séances/semaine', factor: 1.375 },
  { k: 'modere', l: 'Modérément actif', sub: '3–5 séances/semaine', factor: 1.55 },
  { k: 'actif', l: 'Très actif', sub: '6–7 séances/semaine', factor: 1.725 },
];

/* Ajustement kcal/jour vs maintenance, par objectif */
const GOAL_ADJUSTMENT = { volume: 250, global: 0, taille: -350, energie: 0 };

export function latestWeight(state) {
  const entries = (state.measurements || [])
    .filter(m => m.weight != null)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return entries[0]?.weight ?? state.startWeight ?? null;
}

function macroRatios(goalDef) {
  const pk = goalDef.p * 4, ck = goalDef.c * 4, fk = goalDef.f * 9;
  const sum = pk + ck + fk || 1;
  return { p: pk / sum, c: ck / sum, f: fk / sum };
}

/* Renvoie { kcal, p, c, f, personalized } — personalized:false si taille/poids/âge manquent */
export function computeNutritionTarget(state, goalKey, goalDef) {
  const weight = latestWeight(state);
  const height = state.heightCm;
  const age = state.birthYear ? (new Date().getFullYear() - state.birthYear) : null;

  if (!weight || !height || !age) {
    return { kcal: goalDef.kcal, p: goalDef.p, c: goalDef.c, f: goalDef.f, personalized: false };
  }

  const activity = ACTIVITY_LEVELS.find(a => a.k === state.activityLevel) || ACTIVITY_LEVELS[2];
  const bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * activity.factor;
  const kcal = Math.max(1200, Math.round(tdee + (GOAL_ADJUSTMENT[goalKey] || 0)));
  const ratios = macroRatios(goalDef);

  return {
    kcal,
    p: Math.round((kcal * ratios.p) / 4),
    c: Math.round((kcal * ratios.c) / 4),
    f: Math.round((kcal * ratios.f) / 9),
    personalized: true,
  };
}
