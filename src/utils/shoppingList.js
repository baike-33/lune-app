import { RECIPES } from '../data/recipes';
import { FOODS_BY_PHASE } from '../store/luneStore';
import { detectAllergens, isRecipeSafe } from '../data/diet';

function slug(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* Construit la liste de courses depuis les recettes sauvegardées + les aliments recommandés pour la phase,
   en respectant le régime et les allergies. Renvoie aussi le nombre d'articles exclus, pour la transparence. */
export function buildShoppingSections(savedRecipeIds, phase, allergies = [], dietPrefs = []) {
  const allRecipes = RECIPES.filter(r => (savedRecipeIds || []).includes(r.id));
  const safeRecipes = allRecipes.filter(r => isRecipeSafe(r, allergies, dietPrefs));
  const excludedRecipes = allRecipes.length - safeRecipes.length;

  const seen = new Set();
  const recipeItems = [];
  safeRecipes.forEach(r => {
    r.ingredients.forEach(ing => {
      const key = slug(ing.i);
      if (seen.has(key)) return;
      seen.add(key);
      recipeItems.push({ k: key, n: ing.i, q: ing.q, src: r.name });
    });
  });

  const allPhaseFoods = FOODS_BY_PHASE[phase] || [];
  const safePhaseFoods = allergies.length
    ? allPhaseFoods.filter(f => !detectAllergens(f).some(a => allergies.includes(a)))
    : allPhaseFoods;
  const excludedFoods = allPhaseFoods.length - safePhaseFoods.length;

  const phaseItems = safePhaseFoods
    .filter(f => !seen.has(slug(f)))
    .map(f => ({ k: slug(f), n: f, q: '', src: 'Aliments de ta phase' }));

  const sections = [];
  if (recipeItems.length) sections.push({ l: 'Recettes sauvegardées', priority: true, items: recipeItems });
  if (phaseItems.length) sections.push({ l: 'Aliments de la phase', priority: !recipeItems.length, items: phaseItems });
  return { sections, excludedCount: excludedRecipes + excludedFoods };
}

export function shoppingListToText(sections, phaseLabel, checked) {
  const lines = [`Ta liste de courses · ${phaseLabel}`, ''];
  sections.forEach(sec => {
    lines.push(`— ${sec.l} —`);
    sec.items.forEach(it => {
      const box = checked.has(it.k) ? '[x]' : '[ ]';
      lines.push(`${box} ${it.n}${it.q ? ` (${it.q})` : ''}`);
    });
    lines.push('');
  });
  return lines.join('\n').trim();
}
