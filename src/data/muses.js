/* Quatre personas, une par phase du cycle. Chacune a sa palette, sa voix, son archétype. */

export const MUSES = {
  mira: {
    key: 'mira', name: 'MIRA', tag: "L'Équilibrée",
    phase: 'mens', phaseLabel: 'Menstruelle',
    img: '/muses/mira-portrait.png', head: '/muses/mira-head.png', full: '/muses/mira-full.png',
    palette: {
      base: '#1F1612', ink: '#F3E7D7', accent: '#E8AC8C', accent2: '#D4866A',
      glow: 'rgba(232,172,140,0.30)', soft: 'rgba(243,231,215,0.10)',
    },
    keyword: 'Écoute',
    quote: "Cette semaine, je n'ai rien à prouver — j'ai juste à m'écouter.",
    energy: 'Basse, profonde, intuitive',
    archetype: 'La Sage',
    train: 'Marche, yoga, mobilité. Pas de lourd.',
    food: 'Fer ↑, magnésium, tisane, soupes chaudes.',
    nutritionTip: "Privilégie le fer : viande rouge maigre, lentilles + poivron (la vitamine C aide l'absorption), épinards. Curcuma et gingembre en anti-inflammatoires naturels. Chocolat noir 85% autorisé, sans culpabiliser.",
    feel: 'Repos sacré. Pas de culpabilité.',
  },
  alya: {
    key: 'alya', name: 'ALYA', tag: 'La Disciplinée',
    phase: 'fol', phaseLabel: 'Folliculaire',
    img: '/muses/alya-portrait.png', head: '/muses/alya-head.png', full: '/muses/alya-full.png',
    palette: {
      base: '#15100C', ink: '#F4E8D2', accent: '#E6A765', accent2: '#C88444',
      glow: 'rgba(230,167,101,0.32)', soft: 'rgba(244,232,210,0.08)',
    },
    keyword: 'Construire',
    quote: "Discipline, consistency, freedom. C'est l'ordre, pas l'inverse.",
    energy: 'Montante, structurée, focus',
    archetype: 'La Bâtisseuse',
    train: "Phase d'or. Pousse les charges, progresse.",
    food: 'Protéines hautes, glucides timing péri-séance.',
    nutritionTip: "Glucides complexes autour des séances (riz, patate douce, avoine, quinoa) et 25–30 g de protéines par repas. Ta récupération est la plus rapide du cycle — c'est aussi la meilleure fenêtre pour un léger déficit si l'objectif est d'affiner.",
    feel: 'Confiance, énergie neuve, plans qui prennent forme.',
  },
  sora: {
    key: 'sora', name: 'SORA', tag: 'La Focalisée',
    phase: 'ov', phaseLabel: 'Ovulation',
    img: '/muses/sora-portrait.png', head: '/muses/sora-head.png', full: '/muses/sora-full.png',
    palette: {
      base: '#0F1310', ink: '#EEF3E8', accent: '#A8C490', accent2: '#7E9A66',
      glow: 'rgba(168,196,144,0.28)', soft: 'rgba(238,243,232,0.08)',
    },
    keyword: 'Performer',
    quote: "Pas d'excuses. Juste des résultats — et la technique propre.",
    energy: 'Maximale, laser, sociale',
    archetype: 'La Guerrière',
    train: 'Force max. PR possibles. Garde la technique.',
    food: 'Glucides légèrement ↑ autour des séances.',
    nutritionTip: "Antioxydants (myrtilles, framboises, thé vert), hydratation renforcée, zinc et magnésium (graines de courge, amandes). C'est le pic de performance du cycle — pas de restriction ici, mange à ta faim.",
    feel: 'Magnétique. Prends la lumière. Dis oui.',
  },
  lina: {
    key: 'lina', name: 'LINA', tag: "L'Inspirante",
    phase: 'lut', phaseLabel: 'Lutéale',
    img: '/muses/lina-portrait.png', head: '/muses/lina-head.png', full: '/muses/lina-full.png',
    palette: {
      base: '#1A0F14', ink: '#F2E0E2', accent: '#E89AAB', accent2: '#C97A8A',
      glow: 'rgba(232,154,171,0.30)', soft: 'rgba(242,224,226,0.08)',
    },
    keyword: 'Honorer',
    quote: "Je deviens ma propre source d'inspiration. Et c'est suffisant.",
    energy: 'Stable, créative, intérieure',
    archetype: "L'Artiste",
    train: 'Hypertrophie modérée. Plus de séries, moins de charge.',
    food: 'Glucides complexes ↑, magnésium, pas de restriction.',
    nutritionTip: "Magnésium le soir (amandes, chocolat noir 85%) pour limiter crampes et fringales. Un peu plus de glucides est normal ici — pas un échec. Réduis le sel si tu retiens l'eau, et ne te pèse pas cette semaine : le chiffre ment.",
    feel: 'Slow down. Routine, douceur, anti-rumination.',
  },
};

export const PHASE_TO_MUSE = { mens: 'mira', fol: 'alya', ov: 'sora', lut: 'lina' };
