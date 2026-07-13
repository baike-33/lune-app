/* Suppléments — information générale, pas un avis médical.
   À valider avec un·e professionnel·le de santé avant toute prise. */

export const SUPPLEMENTS = [
  {
    tier: 'yes', name: 'Whey Protéine', badge: 'Essentiel',
    note: "25–30 g post-séance ou en snack. Complète les protéines alimentaires facilement. Choisir une whey isolate en cas de sensibilité au lactose.",
  },
  {
    tier: 'yes', name: 'Créatine Monohydrate', badge: 'Très utile',
    note: "3–5 g/jour, tous les jours. Améliore la force, la récupération et le volume musculaire — sous-utilisée par les femmes à tort.",
  },
  {
    tier: 'yes', name: 'Magnésium Bisglycinate', badge: 'Précieux',
    note: "300 mg le soir. Réduit les crampes menstruelles, améliore le sommeil, diminue les fringales en phase lutéale.",
  },
  {
    tier: 'yes', name: 'Vitamine D3 + K2', badge: 'Important',
    note: "1000–2000 UI D3 + 100 µg K2 le matin. Carence très fréquente — affecte hormones, énergie et immunité.",
  },
  {
    tier: 'maybe', name: 'Oméga-3', badge: 'Optionnel',
    note: "1–2 g EPA+DHA/jour. Anti-inflammatoire, aide la récupération, régule les hormones.",
  },
  {
    tier: 'maybe', name: 'Collagène + Vitamine C', badge: 'Bonus',
    note: "5–10 g de collagène + 200 mg de vitamine C le matin. Soutient la peau, les tendons, les articulations.",
  },
  {
    tier: 'maybe', name: 'Spiruline', badge: 'Optionnel',
    note: "3 g/jour. Complément en fer, protéines végétales, énergie. Utile en cas de régime végétarien ou de fatigue en phase menstruelle.",
  },
  {
    tier: 'no', name: 'Fat Burners', badge: 'Inutile',
    note: "Caféine et extraits surdosés. Effet marginal, risque cardiovasculaire.",
  },
  {
    tier: 'no', name: 'CLA / L-Carnitine', badge: 'Inefficace',
    note: "Études très limitées chez la femme entraînée. Pas de bénéfice mesurable.",
  },
  {
    tier: 'no', name: 'Détox & « drainage »', badge: 'Arnaque',
    note: "Thés minceur, jus détox — ton foie et tes reins font déjà ce travail très bien seuls.",
  },
];

export const SUPPLEMENT_TIERS = [
  { k: 'yes', l: 'Utiles & recommandés' },
  { k: 'maybe', l: 'Optionnels selon budget' },
  { k: 'no', l: 'À éviter — marketing trompeur' },
];
