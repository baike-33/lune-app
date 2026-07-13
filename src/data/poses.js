/* Chaque exo a sa photo, sa muse, sa cadence. */
import { WEEK_EXO_POSES, WEEK_PROGRAM, PHASE_WEEK_NOTES } from './weekProgram';

const LEGACY_EXO_POSES = {
  s1: {
    muse: 'alya', image: '/muses/alya-hipthrust.png', name: 'Hip Thrust',
    objectPosition: 'center 35%', cadence: 'hipthrust', arc: 'up',
    coach: 'Pause 1s en haut. Squeeze comme si tu retenais une pièce.',
    cues: [
      { l: 'PIEDS',   s: "Largeur hanches, pointes vers l'avant." },
      { l: 'BAS DOS', s: 'Côtes scellées, pas creusé.' },
      { l: 'SQUEEZE', s: 'Pause 1s en haut. Sens-les vraiment.' },
    ],
    sets: 4, reps: '10–12', charge: 'KB 12 kg', rpe: 8,
    tempo: '2-1-2-1', avoid: ['dos'],
  },
  s2: {
    muse: 'alya', image: '/muses/alya-rdl.png', name: 'RDL Haltères',
    objectPosition: 'center 35%', cadence: 'hinge', arc: 'hinge',
    coach: 'Dos neutre. Charnière à la hanche, pas au bas du dos.',
    cues: [
      { l: 'HANCHE', s: 'Pars en arrière, comme fermer une porte avec les fesses.' },
      { l: 'JAMBES', s: 'Légère flexion stable, pas un squat.' },
      { l: 'BARRE',  s: 'Glisse le long des cuisses, juste sous le genou.' },
    ],
    sets: 3, reps: '12', charge: '2×8 kg', rpe: 7, tempo: '2-1-2-0', avoid: ['dos'],
  },
  s3: {
    muse: 'sora', image: '/muses/sora-squat.png', name: 'Squat Bulgare',
    objectPosition: 'center 40%', cadence: 'squat', arc: 'down',
    coach: "Genou aligné, descente lente. Le tronc penche un peu — c'est OK.",
    cues: [
      { l: 'PIED ARR', s: 'Sur le coup de pied, pas la pointe.' },
      { l: 'GENOU',    s: 'Aligné avec les orteils, jamais en dedans.' },
      { l: 'TRONC',    s: 'Légère inclinaison avant — focus fessier.' },
    ],
    sets: 3, reps: '10 / côté', charge: 'Poids du corps', rpe: 8, tempo: '3-0-1-0', avoid: ['genoux'],
  },
  s4: {
    muse: 'lina', image: '/muses/lina-bridge.png', name: 'Glute Bridge',
    objectPosition: 'center 40%', cadence: 'bridge', arc: 'up',
    coach: 'Squeeze 2 secondes en haut. Respire.',
    cues: [
      { l: 'PIEDS',  s: 'Près du fessier, à plat.' },
      { l: 'HANCHE', s: 'Pousse le bassin droit en haut.' },
      { l: 'PAUSE',  s: 'Compte 2 secondes, puis redescends doucement.' },
    ],
    sets: 3, reps: '15', charge: 'KB 12 kg sur bassin', rpe: 7, tempo: '2-2-2-0',
  },
  s5: {
    muse: 'sora', image: '/muses/sora-kickback.png', name: 'Kickback câble',
    objectPosition: 'center 45%', cadence: 'kickback', arc: 'out',
    coach: "Lent. Pas d'élan. Sens la contraction sur 2 secondes.",
    cues: [
      { l: 'CABLE',    s: 'Cheville à la sangle. Position basse.' },
      { l: 'TRONC',    s: "Légèrement penché vers l'avant, main d'appui." },
      { l: 'CONTROLE', s: "Pas d'élan ni de balancier. Squeeze fessier." },
    ],
    sets: 3, reps: '15 / côté', charge: '5 kg', rpe: 8, tempo: '1-1-2-1',
  },
  s6: {
    muse: 'mira', image: '/muses/mira-walk.png', name: 'Marche inclinée',
    objectPosition: 'center 50%', cadence: 'walk', arc: 'arc',
    coach: 'Bras ballants, respiration libre. Une discussion intérieure.',
    cues: [
      { l: 'INCLIN.', s: '12% · 5 km/h.' },
      { l: 'POSTURE', s: 'Épaules basses, regard loin.' },
      { l: 'DURÉE',   s: '12 minutes — fin de séance.' },
    ],
    sets: 1, reps: '12 min', charge: '12% / 5 km/h', rpe: 6, tempo: 'continu',
  },

  /* ─── Salle (gym) — mêmes mouvements, charges machines/barres ─── */
  g1: { muse: 'alya', image: '/muses/alya-hipthrust.png', name: 'Hip Thrust barre', objectPosition: 'center 35%', cadence: 'hipthrust', arc: 'up', coach: 'Barre sur les hanches, pause 1s en haut.', cues: [{ l: 'BARRE', s: 'Coussin sur le pli de hanche.' }, { l: 'PIEDS', s: 'À plat, tibias verticaux en haut.' }, { l: 'SQUEEZE', s: 'Verrouille les fessiers 1s.' }], sets: 4, reps: '8–10', charge: 'Barre 40 kg', rpe: 8, tempo: '2-1-2-1', avoid: ['dos'] },
  g2: { muse: 'alya', image: '/muses/alya-rdl.png', name: 'Soulevé roumain barre', objectPosition: 'center 35%', cadence: 'hinge', arc: 'hinge', coach: 'Charnière de hanche, dos neutre, barre proche.', cues: [{ l: 'HANCHE', s: 'Recule les fesses.' }, { l: 'DOS', s: 'Gaine, jamais arrondi.' }, { l: 'BARRE', s: 'Glisse le long des cuisses.' }], sets: 4, reps: '10', charge: 'Barre 50 kg', rpe: 8, tempo: '3-1-1-0', avoid: ['dos'] },
  g3: { muse: 'sora', image: '/muses/sora-squat.png', name: 'Presse à cuisses', objectPosition: 'center 40%', cadence: 'squat', arc: 'down', coach: 'Amplitude complète, genoux suivent les pointes.', cues: [{ l: 'PIEDS', s: 'Hauts & larges = fessiers.' }, { l: 'GENOUX', s: "Alignés, pas vers l'intérieur." }, { l: 'BAS', s: 'Ne décolle pas le bassin.' }], sets: 4, reps: '12', charge: 'Presse 80 kg', rpe: 8, tempo: '2-1-2-0', avoid: ['genoux'] },
  g4: { muse: 'sora', image: '/muses/sora-kickback.png', name: 'Abduction machine', objectPosition: 'center 45%', cadence: 'kickback', arc: 'out', coach: 'Ouvre lentement, serre 1s en fin de course.', cues: [{ l: 'BUSTE', s: 'Léger avant pour le moyen fessier.' }, { l: 'CONTRÔLE', s: "Pas d'à-coups au retour." }, { l: 'TEMPO', s: 'Lent, 2s la contraction.' }], sets: 3, reps: '15', charge: 'Machine 45 kg', rpe: 8, tempo: '1-1-2-1' },
  g5: { muse: 'lina', image: '/muses/lina-bridge.png', name: 'Leg curl allongé', objectPosition: 'center 40%', cadence: 'bridge', arc: 'up', coach: 'Ramène les talons aux fessiers, contrôle le retour.', cues: [{ l: 'BASSIN', s: 'Reste collé au banc.' }, { l: 'TALONS', s: 'Vers les fesses, complet.' }, { l: 'RETOUR', s: 'Freine la descente.' }], sets: 3, reps: '12', charge: 'Machine 30 kg', rpe: 8, tempo: '2-1-2-1' },
  g6: { muse: 'mira', image: '/muses/mira-walk.png', name: 'Stairmaster', objectPosition: 'center 50%', cadence: 'walk', arc: 'arc', coach: "Posture droite, sans t'agripper. Respiration libre.", cues: [{ l: 'NIVEAU', s: 'Niv 8 · 12 min.' }, { l: 'POSTURE', s: 'Buste haut, regard loin.' }, { l: 'MAINS', s: 'Appui léger seulement.' }], sets: 1, reps: '12 min', charge: 'Niv 8', rpe: 6, tempo: 'continu' },

  /* ─── MENSTRUELLE · Pilates & mobilité douce (Mira) ─────── */
  pm1: { muse: 'mira', image: '/muses/mira-yoga.png', name: 'Respiration & éveil', objectPosition: 'center 30%', cadence: 'breathe', arc: null, coach: 'Respire par le ventre. On réveille le corps sans forcer.', cues: [{ l: 'INSPIRE', s: '4 s par le nez, ventre qui gonfle.' }, { l: 'EXPIRE', s: '6 s, lâche les épaules.' }, { l: 'ESPRIT', s: 'Aucune performance ici.' }], sets: 1, reps: '5 min', charge: 'Au sol', rpe: 2, tempo: 'lent' },
  pm2: { muse: 'mira', image: '/muses/mira-yoga.png', name: 'Mobilité colonne (chat-vache)', objectPosition: 'center 35%', cadence: 'breathe', arc: null, coach: 'Enroule et cambre lentement, au rythme du souffle.', cues: [{ l: 'DOS', s: 'Vertèbre par vertèbre.' }, { l: 'SOUFFLE', s: 'Inspire en cambrant, expire en enroulant.' }, { l: 'BASSIN', s: 'Laisse-le bouger librement.' }], sets: 2, reps: '10', charge: 'Poids du corps', rpe: 3, tempo: 'lent' },
  pm3: { muse: 'lina', image: '/muses/lina-bridge.png', name: 'Pont fessier doux', objectPosition: 'center 40%', cadence: 'bridge', arc: 'up', coach: "Activation légère, sans charge. Juste sentir les fessiers.", cues: [{ l: 'MONTÉE', s: "Douce, pas d'à-coup." }, { l: 'PAUSE', s: '1 s en haut.' }, { l: 'RESPIRE', s: 'Ne bloque pas ton souffle.' }], sets: 2, reps: '12', charge: 'Poids du corps', rpe: 4, tempo: '2-1-2-0' },
  pm4: { muse: 'lina', image: '/muses/lina-vacuum.png', name: 'Gainage doux (dead bug)', objectPosition: 'center 35%', cadence: 'breathe', arc: null, coach: 'Bas du dos collé au sol, mouvements lents et contrôlés.', cues: [{ l: 'DOS', s: 'Plaqué au sol en permanence.' }, { l: 'RYTHME', s: 'Lent, alterné.' }, { l: 'GAINAGE', s: 'Transverse engagé, sans forcer.' }], sets: 2, reps: '10 / côté', charge: 'Poids du corps', rpe: 4, tempo: 'lent' },
  pm5: { muse: 'mira', image: '/muses/mira-yoga.png', name: 'Étirement hanches (pigeon)', objectPosition: 'center 40%', cadence: 'breathe', arc: null, coach: "Ouvre les hanches en douceur, respire dans l'inconfort.", cues: [{ l: 'HANCHE', s: 'Relâche, ne force jamais.' }, { l: 'SOUFFLE', s: 'Expire pour aller plus loin.' }, { l: 'DURÉE', s: 'Reste 1–2 min par côté.' }], sets: 1, reps: '2 min / côté', charge: 'Au sol', rpe: 2, tempo: 'tenu' },
  pm6: { muse: 'mira', image: '/muses/mira-walk.png', name: 'Marche douce', objectPosition: 'center 50%', cadence: 'walk', arc: 'arc', coach: 'Marche tranquille — circulation, humeur, rien de plus.', cues: [{ l: 'RYTHME', s: 'Confortable, tu peux parler.' }, { l: 'DURÉE', s: '15 min, à plat.' }, { l: 'ESPRIT', s: 'Un moment pour toi.' }], sets: 1, reps: '15 min', charge: 'À plat', rpe: 3, tempo: 'continu' },

  /* ─── OVULATION · Force max (Sora) ──────────────────────── */
  po1: { muse: 'alya', image: '/muses/alya-hipthrust.png', name: 'Hip Thrust lourd', objectPosition: 'center 35%', cadence: 'hipthrust', arc: 'up', coach: 'Charge maximale sur peu de reps. Explose vers le haut.', cues: [{ l: 'CHARGE', s: 'Lourd — 5 à 6 reps propres.' }, { l: 'POUSSÉE', s: 'Explosive en montée.' }, { l: 'CONTRÔLE', s: 'Descente maîtrisée.' }], sets: 5, reps: '6', charge: 'KB 16 kg', rpe: 9, tempo: '1-1-2-0', avoid: ['dos'] },
  po2: { muse: 'sora', image: '/muses/sora-squat.png', name: 'Squat bulgare lesté', objectPosition: 'center 40%', cadence: 'squat', arc: 'down', coach: 'Profond et puissant. Reste gainée.', cues: [{ l: 'PROFONDEUR', s: 'Descends bas, genou stable.' }, { l: 'LESTE', s: 'Haltères ou kettlebell.' }, { l: 'GAINAGE', s: 'Tronc solide.' }], sets: 4, reps: '8 / côté', charge: '2×8 kg', rpe: 9, tempo: '2-0-1-0', avoid: ['genoux'] },
  po3: { muse: 'alya', image: '/muses/alya-rdl.png', name: 'Soulevé roumain lourd', objectPosition: 'center 35%', cadence: 'hinge', arc: 'hinge', coach: 'Charnière puissante, ischios sous tension.', cues: [{ l: 'HANCHE', s: 'Recule fort.' }, { l: 'DOS', s: 'Neutre, gainé.' }, { l: 'CHARGE', s: 'Lourd mais propre.' }], sets: 4, reps: '8', charge: '2×12 kg', rpe: 8, tempo: '2-1-1-0', avoid: ['dos'] },
  po4: { muse: 'sora', image: '/muses/sora-kickback.png', name: 'Kickback explosif', objectPosition: 'center 45%', cadence: 'kickback', arc: 'out', coach: 'Contraction ferme en fin de course.', cues: [{ l: 'AMPLITUDE', s: 'Complète.' }, { l: 'SQUEEZE', s: 'Serre fort 1 s.' }, { l: 'CONTRÔLE', s: 'Retour maîtrisé.' }], sets: 3, reps: '12 / côté', charge: 'Bande / lestée', rpe: 8, tempo: '1-1-2-1' },
  po5: { muse: 'mira', image: '/muses/mira-walk.png', name: 'Marche active', objectPosition: 'center 50%', cadence: 'walk', arc: 'arc', coach: 'Retour au calme dynamique.', cues: [{ l: 'RYTHME', s: 'Soutenu.' }, { l: 'DURÉE', s: '10 min.' }, { l: 'RESPIRE', s: 'Récupère.' }], sets: 1, reps: '10 min', charge: 'Incliné', rpe: 5, tempo: 'continu' },

  /* ─── LUTÉALE · Glutes modéré + Pilates (Lina) ──────────── */
  pl1: { muse: 'alya', image: '/muses/alya-hipthrust.png', name: 'Hip Thrust modéré', objectPosition: 'center 35%', cadence: 'hipthrust', arc: 'up', coach: 'Charge modérée, plus de reps. Sens le muscle travailler.', cues: [{ l: 'CHARGE', s: 'Légère à modérée.' }, { l: 'REPS', s: '12 contrôlées.' }, { l: 'SQUEEZE', s: '1 s en haut.' }], sets: 3, reps: '12', charge: 'KB 10 kg', rpe: 6, tempo: '2-1-2-1' },
  pl2: { muse: 'lina', image: '/muses/lina-bridge.png', name: 'Pont fessier volume', objectPosition: 'center 40%', cadence: 'bridge', arc: 'up', coach: 'Beaucoup de reps, tension continue.', cues: [{ l: 'TENSION', s: 'Ne repose pas en bas.' }, { l: 'REPS', s: '15 lentes.' }, { l: 'PAUSE', s: 'Squeeze 2 s.' }], sets: 3, reps: '15', charge: 'Poids du corps', rpe: 6, tempo: '2-2-2-0' },
  pl3: { muse: 'sora', image: '/muses/sora-kickback.png', name: 'Kickback contrôlé', objectPosition: 'center 45%', cadence: 'kickback', arc: 'out', coach: "Lent, sans élan. Volume sur le moyen fessier.", cues: [{ l: 'LENT', s: "Pas d'à-coup." }, { l: 'SQUEEZE', s: '2 s.' }, { l: 'BUSTE', s: 'Stable.' }], sets: 3, reps: '15 / côté', charge: 'Bande', rpe: 6, tempo: '1-1-2-1' },
  pl4: { muse: 'lina', image: '/muses/lina-vacuum.png', name: 'Pilates — vacuum', objectPosition: 'center 35%', cadence: 'breathe', arc: null, coach: 'Rentre le nombril, tiens la respiration basse.', cues: [{ l: 'TRANSVERSE', s: 'Aspire le nombril.' }, { l: 'TENUE', s: '30 s.' }, { l: 'SOUFFLE', s: 'Respiration costale.' }], sets: 3, reps: '30 s', charge: 'Au sol', rpe: 4, tempo: 'tenu' },
  pl5: { muse: 'mira', image: '/muses/mira-walk.png', name: 'Marche inclinée', objectPosition: 'center 50%', cadence: 'walk', arc: 'arc', coach: 'Termine en douceur, anti-rumination.', cues: [{ l: 'INCLIN.', s: '10–12 %.' }, { l: 'DURÉE', s: '12 min.' }, { l: 'ESPRIT', s: 'Relâche la journée.' }], sets: 1, reps: '12 min', charge: 'Incliné', rpe: 5, tempo: 'continu' },
};

/* Fusion du fonds historique (mens/ov/lut doux, utilisé comme filler) et du
   programme hebdomadaire fixe importé de la référence. */
export const EXO_POSES = { ...LEGACY_EXO_POSES, ...WEEK_EXO_POSES };

/* Métadonnées d'environnement (Maison / Salle) */
export const ENV_META = {
  home: { label: 'Maison', sub: 'Poids du corps & kettlebell', icon: '⌂' },
  gym:  { label: 'Salle',  sub: 'Machines & charges libres',   icon: '▥' },
};

/* Limitations physiques déclarables — utilisées pour filtrer les exos à risque */
export const INJURY_TAGS = [
  { k: 'genoux', l: 'Genoux' },
  { k: 'dos', l: 'Bas du dos' },
];

/* Exos toujours doux (mobilité/Pilates) — utilisés en remplacement quand une
   limitation physique exclut trop d'exos d'une séance. */
const GENTLE_FILLERS = ['pm3', 'pm4', 'pl4', 'pm2', 'pm5'];

/* Séance du jour — programme hebdomadaire fixe (Lun/Mar/Jeu/Ven obligatoires,
   Sam optionnel, Mer/Dim repos). La phase du cycle module seulement la note
   de guidance affichée, jamais les exercices eux-mêmes. */
export function getDaySession(env, weekday, phase, injuries = []) {
  const meta = ENV_META[env] || ENV_META.home;
  const notes = PHASE_WEEK_NOTES[env] || PHASE_WEEK_NOTES.home;
  const note = notes[phase] || '';
  const day = (WEEK_PROGRAM[env] || WEEK_PROGRAM.home)[weekday];

  if (!day) {
    // Jour de repos officiel — si on s'entraîne quand même, on propose du
    // Pilates/mobilité douce plutôt que rien.
    return {
      key: env, label: meta.label, sub: meta.sub, icon: meta.icon,
      exos: GENTLE_FILLERS, adapted: false, isRest: true, optional: false,
      title: 'Repos actif', tag: 'Mobilité douce · optionnel', warmup: '', note,
    };
  }

  const raw = day.exos;
  const safe = injuries.length
    ? raw.filter(id => !(EXO_POSES[id]?.avoid || []).some(tag => injuries.includes(tag)))
    : raw;
  let exos = safe;
  const adapted = injuries.length > 0 && safe.length < raw.length;
  if (adapted) {
    const needed = Math.max(0, Math.min(raw.length, 3) - safe.length);
    const fillers = GENTLE_FILLERS.filter(id => !safe.includes(id)).slice(0, needed);
    exos = [...safe, ...fillers];
  }
  return {
    key: env, label: meta.label, sub: meta.sub, icon: meta.icon,
    exos, adapted, isRest: false,
    title: day.title, tag: day.tag, warmup: day.warmup, optional: day.optional, note,
  };
}

export function isTrainingWeekday(env, weekday) {
  return !!(WEEK_PROGRAM[env] || WEEK_PROGRAM.home)[weekday];
}

export function getExo(id) {
  const p = EXO_POSES[id];
  return p ? { id, name: p.name, sets: p.sets, reps: p.reps, charge: p.charge, rpe: p.rpe } : null;
}
