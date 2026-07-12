export const RECIPES = [
  {
    id: 'bowl-reconfort', name: 'Bowl Lina réconfort', glyph: '◗',
    kcal: 620, p: 38, c: 65, f: 22, time: 22,
    phases: ['lut'], goals: ['global', 'energie'], diets: [],
    tags: ['glucides complexes', 'magnésium', 'protéines lentes'],
    blurb: 'Le triplé qui aide la lutéale à se poser.',
    ingredients: [
      { i: 'Patate douce rôtie', q: '180 g' },
      { i: 'Pois chiches grillés', q: '80 g' },
      { i: 'Saumon mariné', q: '120 g' },
      { i: 'Avocat', q: '½ pièce' },
      { i: 'Épinards baby', q: '1 poignée' },
      { i: 'Tahin · citron · cumin', q: '1 c. à s.' },
      { i: 'Graines de courge', q: '1 c. à s.' },
    ],
    steps: [
      { t: '10 min', s: "Patate douce en cubes au four à 200°, huile d'olive + sel." },
      { t: '6 min', s: 'Pois chiches poêle avec cumin & paprika.' },
      { t: '4 min', s: 'Saumon poêlé 2 min par face, déglacé citron.' },
      { t: '2 min', s: 'Sauce tahin : tahin + citron + eau + cumin.' },
      { t: 'Dresser', s: 'Épinards en lit, le reste autour, sauce, graines.' },
    ],
  },
  {
    id: 'porridge-cacao', name: 'Porridge cacao magnésium', glyph: '❍',
    kcal: 430, p: 24, c: 58, f: 12, time: 10,
    phases: ['lut', 'mens'], goals: ['energie', 'global'], diets: ['vegetarien'],
    tags: ['anti-fringale', 'magnésium', 'réconfort'],
    blurb: "Le câlin du matin quand l'énergie est basse.",
    ingredients: [
      { i: "Flocons d'avoine", q: '60 g' },
      { i: 'Lait (ou boisson avoine)', q: '200 ml' },
      { i: 'Cacao cru', q: '1 c. à s.' },
      { i: 'Protéine en poudre (option)', q: '1 dose' },
      { i: 'Banane', q: '½' },
      { i: 'Beurre de cacahuète', q: '1 c. à c.' },
    ],
    steps: [
      { t: '5 min', s: 'Avoine + lait + cacao à feu doux, remuer.' },
      { t: '2 min', s: 'Hors du feu, incorporer la protéine.' },
      { t: 'Dresser', s: 'Banane en rondelles + beurre de cacahuète.' },
    ],
  },
  {
    id: 'skyr-myrtille', name: 'Skyr protéiné myrtilles', glyph: '❉',
    kcal: 340, p: 32, c: 38, f: 10, time: 5,
    phases: ['fol', 'ov'], goals: ['global', 'taille'], diets: ['vegetarien'],
    tags: ['protéiné', 'rapide', 'léger'],
    blurb: 'Petit-déj express, hautes protéines, taille légère.',
    ingredients: [
      { i: 'Skyr nature', q: '200 g' },
      { i: 'Myrtilles', q: '1 poignée' },
      { i: 'Amandes effilées', q: '15 g' },
      { i: 'Graines de chia', q: '1 c. à c.' },
      { i: 'Miel (option)', q: '1 c. à c.' },
    ],
    steps: [
      { t: '2 min', s: 'Skyr + chia, laisser gonfler 2 min.' },
      { t: 'Dresser', s: 'Myrtilles, amandes, filet de miel.' },
    ],
  },
  {
    id: 'poulet-riz-glute', name: 'Poulet riz basmati — glute fuel', glyph: '▤',
    kcal: 680, p: 48, c: 78, f: 16, time: 25,
    phases: ['fol', 'ov'], goals: ['volume', 'global'], diets: [],
    tags: ['surplus', 'glucides timing', 'post-séance'],
    blurb: 'Le plat de construction : glucides hauts autour de la séance.',
    ingredients: [
      { i: 'Poulet', q: '150 g' },
      { i: 'Riz basmati', q: '90 g (cru)' },
      { i: 'Brocoli', q: '150 g' },
      { i: "Huile d'olive", q: '1 c. à s.' },
      { i: 'Sauce soja · gingembre', q: 'au goût' },
    ],
    steps: [
      { t: '12 min', s: 'Riz à cuire selon paquet.' },
      { t: '8 min', s: 'Poulet en dés poêlé, sauce soja + gingembre.' },
      { t: '5 min', s: 'Brocoli vapeur.' },
      { t: 'Dresser', s: "Tout assembler, filet d'huile d'olive." },
    ],
  },
  {
    id: 'dahl-lentilles', name: 'Dahl lentilles corail — fer', glyph: '◑',
    kcal: 520, p: 26, c: 72, f: 14, time: 30,
    phases: ['mens', 'lut'], goals: ['energie', 'global'], diets: ['vegetarien', 'vegan'],
    tags: ['fer', 'réconfort', 'batch'],
    blurb: 'Chaud, riche en fer — parfait pendant les règles.',
    ingredients: [
      { i: 'Lentilles corail', q: '120 g' },
      { i: 'Lait de coco', q: '100 ml' },
      { i: 'Tomates concassées', q: '200 g' },
      { i: 'Oignon · ail · gingembre', q: '1 set' },
      { i: 'Curcuma · cumin · curry', q: '1 c. à c. each' },
      { i: 'Épinards', q: '2 poignées' },
    ],
    steps: [
      { t: '5 min', s: 'Revenir oignon, ail, gingembre, épices.' },
      { t: '18 min', s: 'Lentilles + tomates + coco + eau, mijoter.' },
      { t: '3 min', s: 'Ajouter épinards en fin de cuisson.' },
    ],
  },
  {
    id: 'smoothie-recup', name: 'Smoothie récup banane', glyph: '❂',
    kcal: 380, p: 34, c: 48, f: 6, time: 5,
    phases: ['ov', 'fol'], goals: ['volume', 'global'], diets: ['vegetarien'],
    tags: ['post-séance', 'protéiné', 'rapide'],
    blurb: 'Fenêtre anabolique : protéines + glucides rapides.',
    ingredients: [
      { i: 'Banane', q: '1' },
      { i: 'Protéine whey/végé', q: '1 dose' },
      { i: 'Lait', q: '250 ml' },
      { i: "Flocons d'avoine", q: '30 g' },
      { i: 'Cannelle', q: '1 pincée' },
    ],
    steps: [
      { t: '2 min', s: "Tout mixer jusqu'à consistance lisse." },
      { t: 'Servir', s: 'Idéalement dans les 30 min post-séance.' },
    ],
  },
  {
    id: 'salade-taille', name: 'Salade poulet citron', glyph: '❋',
    kcal: 410, p: 40, c: 18, f: 20, time: 15,
    phases: ['ov', 'fol'], goals: ['taille'], diets: [],
    tags: ['léger', 'anti-ballonnement', 'protéiné'],
    blurb: 'Légère et fraîche, quand on vise la taille fine.',
    ingredients: [
      { i: 'Poulet grillé', q: '150 g' },
      { i: 'Salade · concombre · radis', q: '1 bol' },
      { i: 'Avocat', q: '¼' },
      { i: "Citron · huile d'olive", q: '1 c. à s.' },
      { i: 'Graines de courge', q: '1 c. à c.' },
    ],
    steps: [
      { t: '8 min', s: 'Poulet grillé, tranché.' },
      { t: '5 min', s: 'Couper les crudités.' },
      { t: 'Dresser', s: 'Vinaigrette citron-huile, mélanger.' },
    ],
  },
  {
    id: 'omelette-fer', name: 'Omelette épinards — fer', glyph: '◐',
    kcal: 320, p: 26, c: 6, f: 22, time: 10,
    phases: ['mens'], goals: ['energie', 'taille'], diets: ['vegetarien'],
    tags: ['fer', 'rapide', 'faible glucides'],
    blurb: 'Reminéralisant et doux pour les jours de règles.',
    ingredients: [
      { i: 'Œufs', q: '3' },
      { i: 'Épinards', q: '2 poignées' },
      { i: 'Feta', q: '30 g' },
      { i: "Huile d'olive", q: '1 c. à c.' },
    ],
    steps: [
      { t: '3 min', s: 'Faire tomber les épinards à la poêle.' },
      { t: '5 min', s: 'Verser les œufs battus, feta émiettée.' },
      { t: 'Servir', s: 'Plier, poivrer.' },
    ],
  },
  {
    id: 'saumon-patate', name: 'Saumon patate douce', glyph: '◗',
    kcal: 600, p: 40, c: 48, f: 26, time: 25,
    phases: ['lut'], goals: ['global', 'volume'], diets: [],
    tags: ['oméga-3', 'glucides complexes'],
    blurb: 'Lipides de qualité + glucides lents pour la lutéale.',
    ingredients: [
      { i: 'Pavé de saumon', q: '150 g' },
      { i: 'Patate douce', q: '200 g' },
      { i: 'Haricots verts', q: '150 g' },
      { i: "Huile d'olive · aneth", q: '1 c. à s.' },
    ],
    steps: [
      { t: '18 min', s: 'Patate douce en frites au four 200°.' },
      { t: '8 min', s: 'Saumon au four ou poêle.' },
      { t: '6 min', s: 'Haricots vapeur.' },
    ],
  },
  {
    id: 'wrap-oeuf', name: 'Wrap œuf avocat', glyph: '❒',
    kcal: 430, p: 24, c: 34, f: 22, time: 10,
    phases: ['fol'], goals: ['taille', 'global'], diets: ['vegetarien'],
    tags: ['rapide', 'équilibré', 'nomade'],
    blurb: 'Équilibré et transportable pour les journées actives.',
    ingredients: [
      { i: 'Tortilla complète', q: '1' },
      { i: 'Œufs brouillés', q: '2' },
      { i: 'Avocat', q: '¼' },
      { i: 'Épinards · tomate', q: 'au goût' },
    ],
    steps: [
      { t: '5 min', s: 'Brouiller les œufs.' },
      { t: 'Dresser', s: "Garnir la tortilla, rouler serré." },
    ],
  },
];

/* Recettes recommandées : matche la phase (prioritaire) et l'objectif */
export function recommendedRecipes(phase, goal) {
  return RECIPES.map(r => {
    let score = 0;
    if (r.phases.includes(phase)) score += 2;
    if (r.goals.includes(goal)) score += 2;
    return { r, score };
  }).sort((a, b) => b.score - a.score).map(x => x.r);
}
