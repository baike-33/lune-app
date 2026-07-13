/* Stratégie 12 mois — roadmap, philosophie de recomposition, tactiques
   fessiers/taille, évitement quadriceps, protocole vacuum. */

export const MUSE_ROLES = {
  alya: "Te montre les compounds lourds. Hip thrust, RDL, bent-over row, sumo squat.",
  mira: "Te montre le Pilates, le vacuum, la marche, le yoga. Quand ton corps demande de la douceur.",
  sora: "Te montre la salle hard : split squat, kickback, tirages, leg press. Quand tu pousses.",
  lina: "Te montre l'iso fessiers et le shaping. Bridge, clamshell, donkey kick. L'esthétique.",
};

export const STRATEGY_TIMELINE = [
  {
    num: '01', period: 'Mois 1–3 · Phase Fondation', title: 'Activation & Connexion',
    bullets: [
      'Connexion neuromusculaire fessiers/dos',
      'Core profond activé (vacuum quotidien)',
      'Ventre plus ferme, taille plus marquée',
      'Posture améliorée, dos dessiné',
      '+300–500 kcal vs habitudes antérieures',
    ],
    detail: {
      training: ['3–4 séances / sem', 'Technique avant les charges', 'Hip thrust, RDL, kickbacks', 'Pilates core 2×/sem'],
      nutrition: ['1900–2000 kcal/jour', '100–110g protéines', 'Pas de restriction sévère', 'Hydratation 2.5L/jour'],
      results: ['Posture transformée', 'Ventre plus ferme', 'Taille visuellement plus fine', 'Énergie améliorée'],
    },
  },
  {
    num: '02', period: 'Mois 4–6 · Phase Construction', title: 'Volume & Relief',
    bullets: [
      'Fessiers plus volumineux et projetés',
      'Ischios développés, galbe visible',
      'Dos esthétique avec taille marquée',
      'Transformation visuelle significative',
      '+1 à +2 kg corporels (muscle)',
    ],
    detail: {
      training: ['4–5 séances / sem', '+10–20% charges vs M1-3', 'Bulgarian split squat chargé', 'Volume fessiers augmenté'],
      nutrition: ['2000–2100 kcal/jour', '110–115g protéines', 'Glucides autour des séances'],
      results: ['Fessiers notablement plus ronds', 'Dos sculpté et esthétique', 'Hanches plus pleines'],
    },
  },
  {
    num: '03', period: 'Mois 7–9 · Phase Intensification', title: 'Sculpture & Définition',
    bullets: [
      'Ajout KB 12 kg / haltères salle',
      'Surcharge progressive systématique',
      'Silhouette slim thick nettement visible',
      'Confiance physique transformée',
    ],
    detail: {
      training: ['5 séances / sem', 'KB 12 kg + haltères salle', 'Deload toutes les 4–5 sem.'],
      nutrition: ['2100 kcal jours intensifs', 'Glucides cyclés selon intensité'],
      results: ['Silhouette slim thick visible', 'Fessiers projetés', 'Corps athlétique féminin'],
    },
  },
  {
    num: '04', period: 'Mois 10–12 · Phase Raffinement', title: 'Physique Abouti',
    bullets: [
      'Silhouette mature, sensuelle, athlétique',
      'Résultats maintenus avec le mode de vie',
      'Autonomie totale sur nutrition/sport',
      'Projection : physique "model fit" élégant',
    ],
    detail: {
      results: ['Silhouette mature, sensuelle, athlétique', 'Autonomie totale sur nutrition/sport', 'Physique "model fit" élégant', 'Mode de vie ancré sur le long terme'],
    },
  },
];

export const RECOMP_PHILOSOPHY = [
  {
    label: 'Légère surplus calorique intelligente', title: '+150 à +300 kcal',
    text: "Plutôt que déficit, on mange en légère surplus pour nourrir la construction musculaire. La recomposition = perdre du gras ET gagner du muscle simultanément — possible grâce à un métabolisme réactif.",
  },
  {
    label: "Ce qu'on évite absolument", title: 'Pas de déficit agressif',
    text: 'Couper les calories trop fort ramène vite à un aspect "skinny sans forme". L\'objectif est de construire avant d\'affiner.',
  },
];

export const GLUTE_WAIST_STRATEGY = [
  {
    label: 'Pour le fessier intermédiaire/long', title: 'Hip Thrust plat en priorité',
    text: "Pour un fessier à insertion intermédiaire/longue, l'exercice roi est le hip thrust horizontal. La contraction maximale en extension complète est ce qui donne le plus de volume et de projection.",
    list: [
      'Hip Thrust KB / Smith Machine → priorité absolue',
      'Glute Bridge unilatéral → isolation + équilibre',
      'RDL → ischio-fessier, rondeur sous le fessier',
      'Kickback élastique / câble → glute max, partie haute',
      'Clamshell / abducteur → glute médius, hanches pleines',
    ],
  },
  {
    label: 'Pour la taille très fine', title: 'Vacuum + Core Profond',
    text: "La taille fine ne vient PAS des obliques (qui élargissent) mais du transverse de l'abdomen — le corset naturel profond.",
    list: [
      'Vacuum abdominal quotidien (matin ou soir)',
      'Dead Bug — transverse profond',
      'Planche forearms — gainage anti-rotation',
      'Éviter les crunches rotatifs lourds',
      'Éviter les obliques lestés',
    ],
  },
];

export const QUAD_AVOIDANCE = {
  avoid: ['Squats profonds chargés', 'Hack squat machine', 'Leg press pieds bas/centrés', 'Lunge avant grande amplitude', 'Vélo résistance haute'],
  alternatives: ['Split squat bulgare (accent fessier)', 'Step-up talon (pas orteils)', 'Squat sumo (accent adducteurs/fessiers)', 'Lunge arrière (moins de quad)', 'RDL (ischio-dominant)'],
  warnings: ['Tu sens la brûlure devant la cuisse', 'Le genou avance beaucoup devant le pied', 'La charge est sur l\'avant du pied', '→ Ajuste toujours vers l\'arrière'],
};

export const VACUUM_PROTOCOL = [
  'À faire à jeun (matin) ou 2h après le repas',
  'Position : debout, à 4 pattes, ou assis',
  "Expire TOUT l'air des poumons",
  'Rentre le ventre au maximum vers la colonne',
  'Tiens 20–30 sec, respiration bloquée',
  '3 répétitions. Progression : 45 sec → 1 min',
  'Résultats visibles : 4–6 semaines quotidiennes',
];
