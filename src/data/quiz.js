/* Bilan Personnalisé — quiz de 5 questions, indépendant de l'onboarding.
   Rejouable à tout moment ; le résultat est un profil + des recommandations. */

export const QUIZ_QUESTIONS = [
  {
    k: 'goal', q: 'Quel est ton objectif principal ?',
    options: [
      { v: 'volume', l: 'Plus de volume fessiers', icon: '🍑' },
      { v: 'taille', l: 'Taille plus fine', icon: '⌛' },
      { v: 'global', l: 'Transformation globale slim thick', icon: '✨' },
      { v: 'posture', l: 'Meilleure posture & dos', icon: '🦋' },
    ],
  },
  {
    k: 'frequency', q: 'Combien de séances par semaine ?',
    options: [
      { v: '2-3', l: '2–3 séances' },
      { v: '3-4', l: '3–4 séances' },
      { v: '4-5', l: '4–5 séances' },
    ],
  },
  {
    k: 'experience', q: "Où en es-tu avec l'entraînement ?",
    options: [
      { v: 'debut', l: 'Débutante complète', icon: '🌱' },
      { v: 'inter', l: "Quelques mois d'expérience", icon: '💪' },
      { v: 'confirm', l: '1+ an régulier', icon: '🔥' },
    ],
  },
  {
    k: 'blocker', q: "Qu'est-ce qui te freine habituellement ?",
    options: [
      { v: 'temps', l: 'Le manque de temps', icon: '⏱' },
      { v: 'constance', l: 'La constance', icon: '🔄' },
      { v: 'nutrition', l: 'La nutrition', icon: '🥗' },
      { v: 'motivation', l: 'La motivation', icon: '💭' },
    ],
  },
  {
    k: 'nutrition', q: 'Où en es-tu avec ta nutrition ?',
    options: [
      { v: 'perdu', l: 'Je ne sais pas quoi manger', icon: '😅' },
      { v: 'restrict', l: 'Je mange trop peu', icon: '🚫' },
      { v: 'ok', l: 'Équilibrée mais sans stratégie', icon: '👌' },
      { v: 'macros', l: 'Je connais mes macros', icon: '📊' },
    ],
  },
];

export const QUIZ_PROFILES = {
  volume: { label: 'Glute Growth Focused', desc: "Ton objectif principal est le volume fessier — parfait, c'est exactement ce que ce programme est conçu pour. Le hip thrust et le RDL vont devenir tes meilleurs amis. Concentre-toi d'abord sur la connexion esprit-muscle avant d'augmenter les charges." },
  taille: { label: 'Sculptor Élégante', desc: "Tu veux une taille très fine — le vacuum abdominal quotidien et le Pilates core vont tout changer. Les résultats sur la taille sont visibles en 4–6 semaines avec une pratique quotidienne régulière." },
  global: { label: 'Slim Thick Potentiel', desc: "Tu vises la transformation globale slim thick — l'objectif le plus complet et motivant de ce programme. Structure hebdomadaire complète, nutrition optimale et gestion du cycle sont tes trois piliers." },
  posture: { label: 'Posture & Présence', desc: "Une belle posture transforme n'importe quelle silhouette. Le gainage profond et le travail de dos vont redessiner ta façon de te tenir, de marcher, de prendre l'espace." },
};

/* Tags de recommandation — chaque règle est indépendante, non exclusive */
export function quizRecommendations(answers) {
  const tags = [];
  if (answers.frequency === '2-3') tags.push('3 séances minimum recommandées', 'Marche quotidienne essentielle');
  if (answers.frequency === '4-5') tags.push('Programme 5 séances activé', 'Journée sculpture recommandée');
  if (answers.blocker === 'nutrition') tags.push('Section Nutrition en priorité', 'Cible calorique à renseigner');
  if (answers.blocker === 'constance') tags.push('Tracker hebdomadaire à activer', 'Photos mensuelles à planifier');
  if (answers.experience === 'debut') tags.push('Phase Fondation d\'abord', 'Technique avant les charges');
  if (answers.experience === 'confirm') tags.push('Phase Construction directe', 'Charges progressives rapides');
  if (answers.nutrition === 'restrict') tags.push('Augmenter les calories en priorité', 'Ne pas descendre sous 1800 kcal');
  return tags;
}
