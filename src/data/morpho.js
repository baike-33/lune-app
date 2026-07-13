/* Analyse morphologique — contenu réel par silhouette (contrairement à la
   référence statique, chaque type a ses propres forces, zones prioritaires
   et points de vigilance). Ton encourageant, jamais normatif. */

export const MORPHO_TYPES = [
  { k: 'X', l: 'X / Sablier', icon: '⌛' },
  { k: 'A', l: 'A / Pyramide', icon: '🍐' },
  { k: 'V', l: 'V / Trapèze', icon: '🔻' },
  { k: 'H', l: 'H / Rectangle', icon: '📏' },
  { k: 'O', l: 'O / Ronde', icon: '⭕' },
  { k: '?', l: 'Je ne sais pas', icon: '💭' },
];

export const MORPHO_CONTENT = {
  X: {
    title: 'Type X / Sablier',
    subtitle: 'Taille naturellement marquée, ossature fine, hanches et épaules proportionnées.',
    lead: "C'est l'archétype le plus avantageux pour le physique slim thick — la structure de base est déjà là.",
    metabolism: { title: 'Réactif & Puissant', text: "Tu prends du muscle vite avec de la régularité, tu perds vite en déficit. Ce métabolisme est une arme, pas un problème. Il faut manger pour construire et ne jamais sous-manger." },
    strengths: [
      'Taille naturellement fine — gainage pour l\'accentuer',
      'Fessier intermédiaire/long — fort potentiel de projection',
      'Ossature fine — donne du relief avec peu de muscle',
      'Rapport jambes/buste équilibré — silhouette harmonieuse',
      'Métabolisme réactif — résultats visibles dès 6–8 semaines',
    ],
    priorities: [
      'Glute max + médius → volume & projection des fessiers',
      'Ischios → rondeur sous-fessière, jambes sculptées',
      'Dos (rhomboïdes, trapèzes bas) → posture & taille marquée',
      'Taille fine → vacuum + core profond Pilates',
    ],
    watch: [
      'Quadriceps — éviter hack squat, leg press haut',
      'Sous-manger → perds le muscle trop vite → silhouette "ado"',
      'Trop de cardio → compense le travail musculaire',
    ],
    conclusion: "Tu as tous les fondamentaux génétiques pour atteindre un physique slim thick athlétique élégant. La structure est là. Ce qu'il faut maintenant, c'est la stratégie et la constance.",
  },
  A: {
    title: 'Type A / Pyramide',
    subtitle: 'Hanches et fessiers plus larges que les épaules, taille souvent moins marquée naturellement.',
    lead: "C'est la silhouette la plus rapide à sculpter côté fessiers — le potentiel de volume est déjà présent, il ne demande qu'à être révélé.",
    metabolism: { title: 'Stockage bas du corps', text: "Ton corps stocke plus facilement sur les hanches et les cuisses. C'est un terrain de jeu, pas un problème : le volume fessier vient naturellement avec un entraînement ciblé et une nutrition qui nourrit la construction." },
    strengths: [
      'Fessier et hanches déjà généreux — projection facile à développer',
      'Réponse rapide à l\'entraînement glute-focus',
      'Silhouette slim thick naturellement proche',
      'Bon potentiel de contraste taille/hanches avec le bon travail de dos',
    ],
    priorities: [
      'Dos (dorsaux, trapèzes) → élargir visuellement le haut, équilibrer la silhouette',
      'Taille → vacuum quotidien pour creuser le contraste avec les hanches',
      'Épaules → structure légère pour équilibrer les proportions',
      'Fessier médius → hanches pleines, pas seulement projetées',
    ],
    watch: [
      'Éviter le surplus calorique trop agressif — le bas du corps stocke vite',
      'Ne pas négliger le haut du corps sous prétexte que "ça vient déjà en bas"',
      'Quadriceps — même vigilance que les autres types sur les mouvements genou-dominants',
    ],
    conclusion: "Ta silhouette a déjà la base slim thick la plus recherchée. Le travail : creuser la taille et structurer légèrement le dos pour révéler le contraste que tu as déjà.",
  },
  V: {
    title: 'Type V / Trapèze',
    subtitle: 'Épaules et buste plus larges que les hanches, bas du corps naturellement plus fin.',
    lead: "Ta priorité est inversée par rapport à la majorité des programmes fessiers classiques : construire le bas du corps pour équilibrer un haut déjà présent.",
    metabolism: { title: 'Équilibré, réponse lente en bas', text: "Le haut du corps se muscle et se dessine facilement ; le bas répond plus lentement. Patience et constance sur le volume fessier sont la clé — les résultats viennent, mais demandent plus de répétitions dans le temps." },
    strengths: [
      'Haut du corps déjà structuré — posture naturellement affirmée',
      'Bonne réponse musculaire générale à l\'entraînement',
      'Potentiel de contraste visuel fort une fois le bas développé',
    ],
    priorities: [
      'Glute max + médius → priorité absolue, volume à construire',
      'Ischios & fessier → toute la chaîne postérieure en priorité',
      'Taille → vacuum pour ne pas accentuer la largeur du haut',
      'Éviter le sur-travail du haut du corps qui accentuerait le déséquilibre',
    ],
    watch: [
      'Patience sur le bas du corps — la réponse est plus lente, pas absente',
      'Ne pas ajouter de volume inutile sur épaules/dos si l\'objectif est l\'équilibre',
      'Quadriceps — même vigilance, privilégier hip thrust et RDL au squat profond',
    ],
    conclusion: "Ton potentiel slim thick passe par la patience sur le bas du corps. Chaque séance fessier compte double pour toi — la régularité paiera plus que pour n'importe quel autre type.",
  },
  H: {
    title: 'Type H / Rectangle',
    subtitle: 'Peu de différence entre épaules, taille et hanches — silhouette droite et proportionnée.',
    lead: "C'est la silhouette la plus « modulable » : elle répond fort au sculptage ciblé, dans n'importe quelle direction que tu choisis.",
    metabolism: { title: 'Neutre, très réactif au ciblage', text: "Sans zone de stockage dominante, ton corps répond directement à où tu mets l'effort. C'est un avantage : le programme fessier + taille dessine littéralement la silhouette slim thick à partir d'une base neutre." },
    strengths: [
      'Silhouette neutre — répond fortement à un travail ciblé',
      'Facile de créer un contraste taille/hanches qui n\'existait pas au départ',
      'Bonne base pour toutes les stratégies de recomposition',
    ],
    priorities: [
      'Glute max + médius → créer le volume et la courbe qui n\'est pas là par défaut',
      'Taille → le vacuum est ton outil le plus puissant, le contraste vient de là',
      'Hanches (moyen fessier) → donner de la largeur là où la silhouette est droite',
      'Dos → garder les épaules structurées sans élargir davantage',
    ],
    watch: [
      'Sans zone naturelle de stockage, le surplus calorique doit rester léger et ciblé',
      'Quadriceps — même vigilance sur les mouvements genou-dominants',
      'La régularité compte plus que l\'intensité : la silhouette se façonne progressivement',
    ],
    conclusion: "Ta silhouette est une toile presque vierge pour la recomposition slim thick — chaque séance fessier et chaque séance vacuum construisent visiblement la courbe que tu vises.",
  },
  O: {
    title: 'Type O / Ronde',
    subtitle: 'Masse plus présente autour du buste et du ventre, bras et jambes souvent plus fins en comparaison.',
    lead: "La priorité ici n'est pas de « maigrir » mais de construire du muscle sur tout le bas du corps pour créer un contraste naturel avec le buste.",
    metabolism: { title: 'Sensible au stress et au sommeil', text: "Ce profil réagit fortement au cortisol : stress et manque de sommeil ralentissent la recomposition plus que pour d'autres types. Le sommeil et la gestion du stress sont ici de vrais leviers d'entraînement, pas des extras." },
    strengths: [
      'Bonne masse musculaire générale, réponse solide à la construction',
      'Fort potentiel de transformation visuelle une fois le bas du corps sculpté',
      'Silhouette qui se transforme vite avec constance et sommeil réglé',
    ],
    priorities: [
      'Glute max + médius → volume bas du corps pour équilibrer le buste',
      'Core profond (vacuum, gainage) → soutien postural, pas esthétique uniquement',
      'Sommeil & gestion du stress → aussi prioritaires que les séances elles-mêmes',
      'Marche & activité douce → soutien du système hormonal',
    ],
    watch: [
      'Éviter le déficit calorique agressif — il augmente le stress et ralentit les résultats',
      'Quadriceps — même vigilance que les autres profils',
      'Le poids seul est un mauvais indicateur ici plus que pour tout autre type — se fier aux mensurations et aux photos',
    ],
    conclusion: "Ta transformation passe autant par le sommeil et la gestion du stress que par les séances. Construis le bas du corps avec constance : le contraste viendra, et il sera net.",
  },
  '?': {
    title: 'Silhouette à découvrir',
    subtitle: "Pas de souci — la morphologie n'est qu'un point de départ, pas une case obligatoire.",
    lead: "Le programme reste entièrement valable sans cette information : phase du cycle, objectif et données réelles (poids, taille) suffisent à le personnaliser. Tu pourras préciser ta morphologie plus tard dans Réglages si tu le souhaites.",
    metabolism: { title: 'Observation en cours', text: "Sans repère de morphologie, la meilleure approche est d'observer tes propres mesures sur 4 à 8 semaines (Mesures → graphique) : c'est ton corps, en conditions réelles, qui te dira où il répond le plus vite." },
    strengths: [
      'Le programme s\'adapte déjà à ta phase de cycle et ton objectif',
      'Les mesures réelles (taille, hanches, cuisse) sont plus fiables qu\'une case cochée',
      'Tu peux toujours préciser ta morphologie plus tard sans rien perdre',
    ],
    priorities: [
      'Glute max + médius → base commune à toutes les silhouettes pour l\'objectif slim thick',
      'Taille → vacuum quotidien, utile quel que soit le type',
      'Observation → renseigne une mesure toutes les 2–4 semaines pour voir où ton corps répond',
    ],
    watch: [
      'Quadriceps — vigilance générale sur les mouvements genou-dominants',
      'Ne pas sur-interpréter les premières semaines — laisse le temps aux données de parler',
    ],
    conclusion: "Pas besoin de connaître ta morphologie pour commencer. Suis le programme, mesure-toi régulièrement, et le tableau se précisera de lui-même.",
  },
};
