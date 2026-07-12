/* Régimes & allergies — filtrage des recettes et des aliments par mots-clés. */

export const ALLERGENS = [
  { k: 'gluten', l: 'Sans gluten', keywords: ['avoine', 'flocons', 'tortilla', 'blé'] },
  { k: 'lactose', l: 'Sans lactose', keywords: ['lait', 'skyr', 'feta', 'yaourt', 'fromage'] },
  { k: 'fruitsACoque', l: 'Sans fruits à coque', keywords: ['amande', 'noix', 'cacahuète', 'noisette'] },
  { k: 'poisson', l: 'Sans poisson', keywords: ['saumon', 'sardine', 'morue', 'poisson'] },
  { k: 'oeufs', l: 'Sans œufs', keywords: ['œuf', 'oeuf'] },
  { k: 'soja', l: 'Sans soja', keywords: ['soja', 'tofu'] },
];

export const DIETS = [
  { k: 'vegetarien', l: 'Végétarien' },
  { k: 'vegan', l: 'Végan' },
];

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* Renvoie les tags d'allergènes détectés dans un texte (nom d'ingrédient ou d'aliment) */
export function detectAllergens(text) {
  const n = normalize(text);
  return ALLERGENS.filter(a => a.keywords.some(k => n.includes(normalize(k)))).map(a => a.k);
}

/* Une recette est "sûre" si aucun de ses ingrédients ne contient un allergène évité,
   et si elle satisfait tous les régimes sélectionnés */
export function isRecipeSafe(recipe, allergies, dietPrefs) {
  if (allergies && allergies.length) {
    const found = new Set(recipe.ingredients.flatMap(ing => detectAllergens(ing.i)));
    if (allergies.some(a => found.has(a))) return false;
  }
  if (dietPrefs && dietPrefs.length) {
    const diets = recipe.diets || [];
    if (!dietPrefs.every(d => diets.includes(d))) return false;
  }
  return true;
}
