/* Programme sportif hebdomadaire fixe — Lundi/Mardi/Jeudi/Vendredi obligatoires,
   Samedi optionnel, Mercredi/Dimanche repos. Même structure quel que soit le
   cycle : seules les notes de phase changent (voir PHASE_WEEK_NOTES). */

export const WEEK_EXO_POSES = {
  wmlun1: {
    muse: "alya", image: "/muses/alya-hipthrust.png", name: "Hip Thrust KB 8 kg (canapé)",
    objectPosition: "center 35%", cadence: "hipthrust", arc: "up",
    coach: "Pousser par les talons, tenir 1 sec en haut. Élastique autour des genoux en progression",
    cues: [{ l: "FORME", s: "Pousser par les talons, tenir 1 sec en haut. Élastique autour des genoux en progression" }, { l: "SQUEEZE", s: "Verrouille les fessiers 1 seconde en haut." }],
    sets: 4, reps: "10–12", charge: "KB 8 kg", rpe: 7, tempo: "3-1-1",
  },
  wmlun2: {
    muse: "alya", image: "/muses/alya-rdl.png", name: "Romanian Deadlift KB 8 kg",
    objectPosition: "center 35%", cadence: "hinge", arc: "hinge",
    coach: "Descente lente, dos neutre — sentir l'étirement ischios",
    cues: [{ l: "FORME", s: "Descente lente, dos neutre — sentir l'étirement ischios" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "10", charge: "KB 8 kg", rpe: 7, tempo: "3-1-2", avoid: ['dos']
  },
  wmlun3: {
    muse: "sora", image: "/muses/sora-squat.png", name: "Bulgarian Split Squat (poids corps)",
    objectPosition: "center 40%", cadence: "squat", arc: "down",
    coach: "Pied sur chaise, genou avant ne dépasse pas les orteils",
    cues: [{ l: "FORME", s: "Pied sur chaise, genou avant ne dépasse pas les orteils" }, { l: "GENOU", s: "Aligné avec les orteils, jamais vers l'intérieur." }],
    sets: 3, reps: "8/côté", charge: "poids corps", rpe: 7, tempo: "3-1-1", avoid: ['genoux']
  },
  wmlun4: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Donkey Kick élastique",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Connexion fessier — pas momentum de hanche",
    cues: [{ l: "FORME", s: "Connexion fessier — pas momentum de hanche" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 3, reps: "15/côté", charge: "Élastique", rpe: 7, tempo: "2-1-1",
  },
  wmlun5: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Abduction couchée (cerceau Pilates)",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Glute médius — brûlure ciblée hanches",
    cues: [{ l: "FORME", s: "Glute médius — brûlure ciblée hanches" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 3, reps: "20", charge: "cerceau Pilates", rpe: 7, tempo: "2-2-1",
  },
  wmlun6: {
    muse: "lina", image: "/muses/lina-bridge.png", name: "Glute Bridge 1 jambe",
    objectPosition: "center 40%", cadence: "bridge", arc: "up",
    coach: "Squeeze maximal en haut",
    cues: [{ l: "FORME", s: "Squeeze maximal en haut" }, { l: "BASSIN", s: "Monte droit, sans creuser le bas du dos." }],
    sets: 3, reps: "12/côté", charge: "—", rpe: 7, tempo: "2-2-1",
  },
  wmlun7: {
    muse: "mira", image: "/muses/mira-walk.png", name: "Corde à sauter finisher",
    objectPosition: "center 50%", cadence: "walk", arc: "arc",
    coach: "Intensité modérée",
    cues: [{ l: "FORME", s: "Intensité modérée" }, { l: "RESPIRE", s: "Rythme soutenable, respiration libre." }],
    sets: 1, reps: "5–10 min", charge: "—", rpe: 7, tempo: "—",
  },
  wmmar1: {
    muse: "alya", noPhoto: true, zone: "Dos", name: "Bent-over Row élastique (ou KB 8 kg léger)",
    coach: "Omoplate pincée — dos sculpté",
    cues: [{ l: "FORME", s: "Omoplate pincée — dos sculpté" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 4, reps: "12", charge: "KB 8 kg", rpe: 7, tempo: "2-1-3", avoid: ['dos']
  },
  wmmar2: {
    muse: "alya", noPhoto: true, zone: "Dos · Épaules", name: "Reverse Fly élastique",
    coach: "Rhomboïdes + posture",
    cues: [{ l: "FORME", s: "Rhomboïdes + posture" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "15", charge: "Élastique", rpe: 7, tempo: "2-2-1", avoid: ['dos']
  },
  wmmar3: {
    muse: "alya", noPhoto: true, zone: "Épaules arrière", name: "Face Pull élastique",
    coach: "Épaules arrière — anti-voûte",
    cues: [{ l: "FORME", s: "Épaules arrière — anti-voûte" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "15", charge: "Élastique", rpe: 7, tempo: "2-1-2", avoid: ['dos']
  },
  wmmar4: {
    muse: "alya", noPhoto: true, zone: "Épaules", name: "Élévation latérale (haltères 2–3 kg)",
    coach: "Épaules larges = taille visuellement plus fine",
    cues: [{ l: "FORME", s: "Épaules larges = taille visuellement plus fine" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "15", charge: "haltères 2–3 kg", rpe: 7, tempo: "2-1-2", avoid: ['dos']
  },
  wmmar5: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Superman Hold",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Érecteurs, dos bas",
    cues: [{ l: "FORME", s: "Érecteurs, dos bas" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "10 × 3″", charge: "—", rpe: 7, tempo: "—",
  },
  wmmar6: {
    muse: "alya", noPhoto: true, zone: "Poitrine", name: "Pompes inclinées (mains surélevées)",
    coach: "Poitrine haute + core engagé",
    cues: [{ l: "FORME", s: "Poitrine haute + core engagé" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "8–12", charge: "—", rpe: 7, tempo: "3-1-1", avoid: ['dos']
  },
  wmmar7: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Vacuum × 3 séries",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "À jeun ou ventre vide",
    cues: [{ l: "FORME", s: "À jeun ou ventre vide" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "20–30 sec", charge: "—", rpe: 7, tempo: "—",
  },
  wmjeu1: {
    muse: "alya", image: "/muses/alya-rdl.png", name: "RDL à 1 jambe KB 8 kg",
    objectPosition: "center 35%", cadence: "hinge", arc: "hinge",
    coach: "Équilibre + ischio ciblé",
    cues: [{ l: "FORME", s: "Équilibre + ischio ciblé" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "10/côté", charge: "KB 8 kg", rpe: 7, tempo: "3-1-2", avoid: ['dos']
  },
  wmjeu2: {
    muse: "sora", image: "/muses/sora-squat.png", name: "Step-up KB (chaise haute)",
    objectPosition: "center 40%", cadence: "squat", arc: "down",
    coach: "Pousser par le talon",
    cues: [{ l: "FORME", s: "Pousser par le talon" }, { l: "GENOU", s: "Aligné avec les orteils, jamais vers l'intérieur." }],
    sets: 3, reps: "10/côté", charge: "—", rpe: 7, tempo: "2-1-2", avoid: ['genoux']
  },
  wmjeu3: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Clamshell élastique fort",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Glute médius isolé — hanches pleines",
    cues: [{ l: "FORME", s: "Glute médius isolé — hanches pleines" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 3, reps: "20/côté", charge: "Élastique", rpe: 7, tempo: "2-2-1",
  },
  wmjeu4: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Kickback debout élastique",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Extension complète, pas de bascule lombaire",
    cues: [{ l: "FORME", s: "Extension complète, pas de bascule lombaire" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 3, reps: "15/côté", charge: "Élastique", rpe: 7, tempo: "2-1-2",
  },
  wmjeu5: {
    muse: "alya", image: "/muses/alya-rdl.png", name: "Good Morning KB 8 kg",
    objectPosition: "center 35%", cadence: "hinge", arc: "hinge",
    coach: "Ischios + bas du dos",
    cues: [{ l: "FORME", s: "Ischios + bas du dos" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "12", charge: "KB 8 kg", rpe: 7, tempo: "3-1-2", avoid: ['dos']
  },
  wmjeu6: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Fire Hydrant cerceau Pilates",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Hanche latérale, brûlure glute médius",
    cues: [{ l: "FORME", s: "Hanche latérale, brûlure glute médius" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 3, reps: "15/côté", charge: "—", rpe: 7, tempo: "2-2-1",
  },
  wmven1: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Vacuum abdominal",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Debout ou 4 pattes, à jeun si possible",
    cues: [{ l: "FORME", s: "Debout ou 4 pattes, à jeun si possible" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "30 sec", charge: "—", rpe: 7, tempo: "—",
  },
  wmven2: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Dead Bug (ballon entre mains/genoux)",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Lombaires collées au sol — priorité absolue",
    cues: [{ l: "FORME", s: "Lombaires collées au sol — priorité absolue" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "8/côté", charge: "ballon entre mains/genoux", rpe: 7, tempo: "—",
  },
  wmven3: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Teaser Pilates",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Colonne vertébrale article par article",
    cues: [{ l: "FORME", s: "Colonne vertébrale article par article" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "8", charge: "—", rpe: 7, tempo: "—",
  },
  wmven4: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Hundred Pilates",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Respiration 5 in / 5 out",
    cues: [{ l: "FORME", s: "Respiration 5 in / 5 out" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 2, reps: "100 pulsations", charge: "—", rpe: 7, tempo: "—",
  },
  wmven5: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Side Plank avec ballon Pilates",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Hanche levée, obliques actifs",
    cues: [{ l: "FORME", s: "Hanche levée, obliques actifs" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "30 sec/côté", charge: "—", rpe: 7, tempo: "—",
  },
  wmven6: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Leg Circles Pilates",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Stabilisation lombo-pelvienne",
    cues: [{ l: "FORME", s: "Stabilisation lombo-pelvienne" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 2, reps: "10/côté", charge: "—", rpe: 7, tempo: "—",
  },
  wmven7: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Swan Dive (ouverture thoracique)",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Posture + érecteurs doux",
    cues: [{ l: "FORME", s: "Posture + érecteurs doux" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "10", charge: "—", rpe: 7, tempo: "—",
  },
  wmven8: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Étirements + mobilité",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Hanche flexors, ischios, dos",
    cues: [{ l: "FORME", s: "Hanche flexors, ischios, dos" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "10 min", charge: "—", rpe: 7, tempo: "—",
  },
  wmsam1: {
    muse: "sora", image: "/muses/sora-squat.png", name: "Sumo Squat pulse KB 8 kg",
    objectPosition: "center 40%", cadence: "squat", arc: "down",
    coach: "Intérieur cuisses + fessiers",
    cues: [{ l: "FORME", s: "Intérieur cuisses + fessiers" }, { l: "GENOU", s: "Aligné avec les orteils, jamais vers l'intérieur." }],
    sets: 1, reps: "40 sec", charge: "KB 8 kg", rpe: 7, tempo: "—", avoid: ['genoux']
  },
  wmsam2: {
    muse: "alya", noPhoto: true, zone: "Dos", name: "Bent-over Row élastique",
    coach: "Dos + posture",
    cues: [{ l: "FORME", s: "Dos + posture" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 1, reps: "40 sec", charge: "Élastique", rpe: 7, tempo: "—", avoid: ['dos']
  },
  wmsam3: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Reverse Lunge + Kickback",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Fessiers + ischios enchaînés",
    cues: [{ l: "FORME", s: "Fessiers + ischios enchaînés" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 1, reps: "40 sec", charge: "—", rpe: 7, tempo: "—",
  },
  wmsam4: {
    muse: "alya", noPhoto: true, zone: "Poitrine · Core", name: "Pompes + rotation T",
    coach: "Poitrine + core + posture",
    cues: [{ l: "FORME", s: "Poitrine + core + posture" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 1, reps: "40 sec", charge: "—", rpe: 7, tempo: "—", avoid: ['dos']
  },
  wmsam5: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Clamshell rapide élastique",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Glute médius activation",
    cues: [{ l: "FORME", s: "Glute médius activation" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 1, reps: "40 sec", charge: "Élastique", rpe: 7, tempo: "—",
  },
  wmsam6: {
    muse: "mira", image: "/muses/mira-walk.png", name: "Mountain Climbers lents",
    objectPosition: "center 50%", cadence: "walk", arc: "arc",
    coach: "Core + cardio modéré",
    cues: [{ l: "FORME", s: "Core + cardio modéré" }, { l: "RESPIRE", s: "Rythme soutenable, respiration libre." }],
    sets: 1, reps: "40 sec", charge: "—", rpe: 7, tempo: "—",
  },
  wslun1: {
    muse: "alya", image: "/muses/alya-hipthrust.png", name: "Hip Thrust guidé Smith",
    objectPosition: "center 35%", cadence: "hipthrust", arc: "up",
    coach: "Pousse fort par les talons, verrouille en haut.",
    cues: [{ l: "FORME", s: "Pousse fort par les talons, verrouille en haut." }, { l: "SQUEEZE", s: "Verrouille les fessiers 1 seconde en haut." }],
    sets: 4, reps: "10–12", charge: "Smith Machine + pad", rpe: 7, tempo: "3-1-1",
  },
  wslun2: {
    muse: "alya", image: "/muses/alya-rdl.png", name: "Romanian Deadlift Barre",
    objectPosition: "center 35%", cadence: "hinge", arc: "hinge",
    coach: "Charnière à la hanche, dos neutre du début à la fin.",
    cues: [{ l: "FORME", s: "Charnière à la hanche, dos neutre du début à la fin." }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "10", charge: "Barre olympique 20–30 kg", rpe: 7, tempo: "3-1-2", avoid: ['dos']
  },
  wslun3: {
    muse: "sora", image: "/muses/sora-squat.png", name: "Bulgarian Split Squat Haltères",
    objectPosition: "center 40%", cadence: "squat", arc: "down",
    coach: "Descente contrôlée, genou dans l'axe du pied.",
    cues: [{ l: "FORME", s: "Descente contrôlée, genou dans l'axe du pied." }, { l: "GENOU", s: "Aligné avec les orteils, jamais vers l'intérieur." }],
    sets: 3, reps: "8/côté", charge: "Haltères 8–12 kg / main", rpe: 7, tempo: "3-1-1", avoid: ['genoux']
  },
  wslun4: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Abducteur assis Machine",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Amplitude complète, zéro élan.",
    cues: [{ l: "FORME", s: "Amplitude complète, zéro élan." }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 4, reps: "15–20", charge: "Machine abducteur", rpe: 7, tempo: "2-2-1",
  },
  wslun5: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Câble Kickback Câble bas",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Amplitude complète, zéro élan.",
    cues: [{ l: "FORME", s: "Amplitude complète, zéro élan." }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 3, reps: "15/côté", charge: "Cheville attachée", rpe: 7, tempo: "2-1-2",
  },
  wslun6: {
    muse: "lina", image: "/muses/lina-bridge.png", name: "Glute Bridge unilatéral Banc",
    objectPosition: "center 40%", cadence: "bridge", arc: "up",
    coach: "Squeeze maximal en haut, redescends lentement.",
    cues: [{ l: "FORME", s: "Squeeze maximal en haut, redescends lentement." }, { l: "BASSIN", s: "Monte droit, sans creuser le bas du dos." }],
    sets: 3, reps: "12/côté", charge: "Banc plat + haltère", rpe: 7, tempo: "2-2-1",
  },
  wslun7: {
    muse: "mira", image: "/muses/mira-walk.png", name: "Escalier / Tapis incliné",
    objectPosition: "center 50%", cadence: "walk", arc: "arc",
    coach: "Allure soutenue mais respirable.",
    cues: [{ l: "FORME", s: "Allure soutenue mais respirable." }, { l: "RESPIRE", s: "Rythme soutenable, respiration libre." }],
    sets: 1, reps: "10–15 min", charge: "Tapis roulant 5–8% incliné", rpe: 7, tempo: "—",
  },
  wsmar1: {
    muse: "alya", noPhoto: true, zone: "Dos", name: "Tirage horizontal prise neutre Câble",
    coach: "Charnière à la hanche, dos neutre du début à la fin.",
    cues: [{ l: "FORME", s: "Charnière à la hanche, dos neutre du début à la fin." }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 4, reps: "12", charge: "Câble bas, barre V", rpe: 7, tempo: "2-1-3", avoid: ['dos']
  },
  wsmar2: {
    muse: "alya", noPhoto: true, zone: "Dos", name: "Tirage vertical dos large Poulie",
    coach: "Charnière à la hanche, dos neutre du début à la fin.",
    cues: [{ l: "FORME", s: "Charnière à la hanche, dos neutre du début à la fin." }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "10", charge: "Poulie haute, prise large", rpe: 7, tempo: "2-1-2", avoid: ['dos']
  },
  wsmar3: {
    muse: "alya", noPhoto: true, zone: "Dos · Épaules", name: "Reverse Fly / Pec Deck inversé Machine",
    coach: "Charnière à la hanche, dos neutre du début à la fin.",
    cues: [{ l: "FORME", s: "Charnière à la hanche, dos neutre du début à la fin." }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "15", charge: "Machine pec deck à l'envers", rpe: 7, tempo: "2-2-1", avoid: ['dos']
  },
  wsmar4: {
    muse: "alya", noPhoto: true, zone: "Épaules arrière", name: "Face Pull Câble",
    coach: "Charnière à la hanche, dos neutre du début à la fin.",
    cues: [{ l: "FORME", s: "Charnière à la hanche, dos neutre du début à la fin." }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "15", charge: "Corde, câble à hauteur visage", rpe: 7, tempo: "2-1-2", avoid: ['dos']
  },
  wsmar5: {
    muse: "alya", noPhoto: true, zone: "Épaules", name: "Élévation latérale Haltères",
    coach: "Charnière à la hanche, dos neutre du début à la fin.",
    cues: [{ l: "FORME", s: "Charnière à la hanche, dos neutre du début à la fin." }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "15", charge: "Haltères 4–6 kg", rpe: 7, tempo: "2-1-2", avoid: ['dos']
  },
  wsmar6: {
    muse: "alya", noPhoto: true, zone: "Poitrine", name: "Développé incliné léger Haltères",
    coach: "Charnière à la hanche, dos neutre du début à la fin.",
    cues: [{ l: "FORME", s: "Charnière à la hanche, dos neutre du début à la fin." }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "12", charge: "Haltères 6–10 kg, angle 30°", rpe: 7, tempo: "3-1-1", avoid: ['dos']
  },
  wsmar7: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Vacuum debout × 3 + Gainage planche",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Connexion corps-esprit, respiration profonde.",
    cues: [{ l: "FORME", s: "Connexion corps-esprit, respiration profonde." }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "30 sec", charge: "Tapis au sol", rpe: 7, tempo: "—",
  },
  wsjeu1: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Leg Curl couché Machine",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Amplitude complète, zéro élan.",
    cues: [{ l: "FORME", s: "Amplitude complète, zéro élan." }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 4, reps: "12", charge: "Machine leg curl", rpe: 7, tempo: "2-2-2",
  },
  wsjeu2: {
    muse: "alya", image: "/muses/alya-rdl.png", name: "RDL à 1 jambe Haltère",
    objectPosition: "center 35%", cadence: "hinge", arc: "hinge",
    coach: "Charnière à la hanche, dos neutre du début à la fin.",
    cues: [{ l: "FORME", s: "Charnière à la hanche, dos neutre du début à la fin." }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "10/côté", charge: "Haltère 10–14 kg", rpe: 7, tempo: "3-1-2", avoid: ['dos']
  },
  wsjeu3: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Abducteur debout câble Câble",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Amplitude complète, zéro élan.",
    cues: [{ l: "FORME", s: "Amplitude complète, zéro élan." }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 3, reps: "15/côté", charge: "Câble bas, cheville", rpe: 7, tempo: "2-1-2",
  },
  wsjeu4: {
    muse: "alya", image: "/muses/alya-rdl.png", name: "Sumo Deadlift Barre / KB",
    objectPosition: "center 35%", cadence: "hinge", arc: "hinge",
    coach: "Charnière à la hanche, dos neutre du début à la fin.",
    cues: [{ l: "FORME", s: "Charnière à la hanche, dos neutre du début à la fin." }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 3, reps: "10", charge: "Barre 30–40 kg ou KB 16 kg", rpe: 7, tempo: "3-1-2", avoid: ['dos']
  },
  wsjeu5: {
    muse: "sora", image: "/muses/sora-squat.png", name: "Step-up sur box Haltères",
    objectPosition: "center 40%", cadence: "squat", arc: "down",
    coach: "Descente contrôlée, genou dans l'axe du pied.",
    cues: [{ l: "FORME", s: "Descente contrôlée, genou dans l'axe du pied." }, { l: "GENOU", s: "Aligné avec les orteils, jamais vers l'intérieur." }],
    sets: 3, reps: "10/côté", charge: "Box 40–50 cm, haltères 8 kg", rpe: 7, tempo: "2-1-2", avoid: ['genoux']
  },
  wsjeu6: {
    muse: "sora", image: "/muses/sora-squat.png", name: "Leg Press pieds hauts/larges Machine",
    objectPosition: "center 40%", cadence: "squat", arc: "down",
    coach: "Descente contrôlée, genou dans l'axe du pied.",
    cues: [{ l: "FORME", s: "Descente contrôlée, genou dans l'axe du pied." }, { l: "GENOU", s: "Aligné avec les orteils, jamais vers l'intérieur." }],
    sets: 3, reps: "15", charge: "Fessiers pas quadriceps", rpe: 7, tempo: "2-2-1", avoid: ['genoux']
  },
  wsjeu7: {
    muse: "alya", image: "/muses/alya-hipthrust.png", name: "Hip Thrust fin de séance Barre",
    objectPosition: "center 35%", cadence: "hipthrust", arc: "up",
    coach: "Pousse fort par les talons, verrouille en haut.",
    cues: [{ l: "FORME", s: "Pousse fort par les talons, verrouille en haut." }, { l: "SQUEEZE", s: "Verrouille les fessiers 1 seconde en haut." }],
    sets: 2, reps: "20", charge: "Charges légères, volume", rpe: 7, tempo: "1-1-1",
  },
  wsven1: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Vacuum debout / 4 pattes",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "À faire en début de séance ventre vide",
    cues: [{ l: "FORME", s: "À faire en début de séance ventre vide" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "30–45 sec", charge: "Tapis", rpe: 7, tempo: "—",
  },
  wsven2: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Rotation câble debout Câble",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Anti-rotation, pas d'obliques lourds",
    cues: [{ l: "FORME", s: "Anti-rotation, pas d'obliques lourds" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "12/côté", charge: "Câble mi-hauteur, léger", rpe: 7, tempo: "—",
  },
  wsven3: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Dead Bug + planche forearm",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Lombaires collées au sol",
    cues: [{ l: "FORME", s: "Lombaires collées au sol" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "8 + 30 sec", charge: "Tapis", rpe: 7, tempo: "—",
  },
  wsven4: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Side Plank avec abduction Câble",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Obliques + glute médius",
    cues: [{ l: "FORME", s: "Obliques + glute médius" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 3, reps: "10/côté", charge: "Câble cheville latérale", rpe: 7, tempo: "—",
  },
  wsven5: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Hundred + Teaser Pilates",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Core profond — respiration",
    cues: [{ l: "FORME", s: "Core profond — respiration" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 2, reps: "100 + 8", charge: "Tapis", rpe: 7, tempo: "—",
  },
  wsven6: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Stretching complet",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Hanche, dos, ischios",
    cues: [{ l: "FORME", s: "Hanche, dos, ischios" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 3, reps: "10–15 min", charge: "Tapis / mousse", rpe: 7, tempo: "—",
  },
  wssam1: {
    muse: "alya", image: "/muses/alya-hipthrust.png", name: "Hip Thrust guidé léger Smith",
    objectPosition: "center 35%", cadence: "hipthrust", arc: "up",
    coach: "Fessiers + endurance",
    cues: [{ l: "FORME", s: "Fessiers + endurance" }, { l: "SQUEEZE", s: "Verrouille les fessiers 1 seconde en haut." }],
    sets: 1, reps: "40 sec", charge: "Charge -30% habituels", rpe: 7, tempo: "—",
  },
  wssam2: {
    muse: "alya", noPhoto: true, zone: "Dos", name: "Tirage horizontal câble",
    coach: "Dos + posture",
    cues: [{ l: "FORME", s: "Dos + posture" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 1, reps: "40 sec", charge: "Charge modérée", rpe: 7, tempo: "—", avoid: ['dos']
  },
  wssam3: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Abducteur machine",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Glute médius pump",
    cues: [{ l: "FORME", s: "Glute médius pump" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 1, reps: "40 sec", charge: "Charge légère rapide", rpe: 7, tempo: "—",
  },
  wssam4: {
    muse: "alya", noPhoto: true, zone: "Épaules", name: "Élévation latérale haltères",
    coach: "Épaules rondes",
    cues: [{ l: "FORME", s: "Épaules rondes" }, { l: "DOS", s: "Dos neutre, la charnière part de la hanche." }],
    sets: 1, reps: "40 sec", charge: "Haltères 4 kg", rpe: 7, tempo: "—", avoid: ['dos']
  },
  wssam5: {
    muse: "sora", image: "/muses/sora-kickback.png", name: "Leg Curl couché léger",
    objectPosition: "center 45%", cadence: "kickback", arc: "out",
    coach: "Ischios endurance",
    cues: [{ l: "FORME", s: "Ischios endurance" }, { l: "CONTRÔLE", s: "Pas d'élan — la contraction fait le travail." }],
    sets: 1, reps: "40 sec", charge: "-40% charge max", rpe: 7, tempo: "—",
  },
  wssam6: {
    muse: "lina", image: "/muses/lina-vacuum.png", name: "Gainage planche + rotation",
    objectPosition: "center 35%", cadence: "breathe", arc: null,
    coach: "Core finisher",
    cues: [{ l: "FORME", s: "Core finisher" }, { l: "SOUFFLE", s: "Ne bloque jamais la respiration plus que nécessaire." }],
    sets: 1, reps: "40 sec", charge: "Tapis", rpe: 7, tempo: "—",
  },
};

export const WEEK_PROGRAM = {
  home: {
    1: { title: "Lower Body A · Maison", tag: "Glutes · Ischios · Hip Thrust 🍑", warmup: "Échauffement 8 min : rotations hanches · activation fessiers élastique · hip hinge à vide × 15", exos: ["wmlun1", "wmlun2", "wmlun3", "wmlun4", "wmlun5", "wmlun6", "wmlun7"], optional: false },
    2: { title: "Upper Body + Posture · Maison", tag: "Dos · Épaules · Taille · Poitrine 💎", warmup: "Échauffement 5 min : rotations épaules · mobilité thoracique · pull élastique × 15", exos: ["wmmar1", "wmmar2", "wmmar3", "wmmar4", "wmmar5", "wmmar6", "wmmar7"], optional: false },
    4: { title: "Lower Body B · Maison", tag: "Ischios · Glute Médius · Hanches 🌙", warmup: "Échauffement 8 min : marche genoux hauts · clamshell × 20 · hip circles × 10", exos: ["wmjeu1", "wmjeu2", "wmjeu3", "wmjeu4", "wmjeu5", "wmjeu6"], optional: false },
    5: { title: "Pilates Core & Taille · Maison", tag: "Core · Vacuum · Pilates · Taille Fine 🧘", warmup: "Ambiance douce, respirations profondes, connexion corps-esprit", exos: ["wmven1", "wmven2", "wmven3", "wmven4", "wmven5", "wmven6", "wmven7", "wmven8"], optional: false },
    6: { title: "Sculpt Full Body · Maison", tag: "Circuit · Cardio · Full Body Tonique ✨", warmup: "4 rounds × 6 exercices — 40 sec travail / 20 sec repos", exos: ["wmsam1", "wmsam2", "wmsam3", "wmsam4", "wmsam5", "wmsam6"], optional: true },
  },
  gym: {
    1: { title: "Lower Body A · FitnessPark", tag: "Glutes · Hip Thrust guidé · Smith Machine 🍑", warmup: "Échauffement : 5 min vélo doux + bandes élastiques activation fessiers × 20", exos: ["wslun1", "wslun2", "wslun3", "wslun4", "wslun5", "wslun6", "wslun7"], optional: false },
    2: { title: "Upper Body + Dos · FitnessPark", tag: "Dos sculpté · Épaules · Poitrine · Posture 💎", warmup: "Échauffement : band pull apart × 20 + rotation thoracique × 10/côté", exos: ["wsmar1", "wsmar2", "wsmar3", "wsmar4", "wsmar5", "wsmar6", "wsmar7"], optional: false },
    4: { title: "Lower Body B · FitnessPark", tag: "Ischios · Glute Médius · Leg Curl · Câble 🌙", warmup: "Échauffement : step machine 5 min + clamshell élastique × 20", exos: ["wsjeu1", "wsjeu2", "wsjeu3", "wsjeu4", "wsjeu5", "wsjeu6", "wsjeu7"], optional: false },
    5: { title: "Core & Taille Fine · FitnessPark", tag: "Core câble · Pilates au sol · Vacuum · Taille 🧘", warmup: "Séance douce, axée sur le deep core et la posture — connexion corps-esprit", exos: ["wsven1", "wsven2", "wsven3", "wsven4", "wsven5", "wsven6"], optional: false },
    6: { title: "Full Body Circuit · FitnessPark", tag: "Circuit Machines · Tonique · Full Body ✨", warmup: "3–4 rounds × 6 stations — 40 sec travail / 20 sec repos — charges légères à modérées", exos: ["wssam1", "wssam2", "wssam3", "wssam4", "wssam5", "wssam6"], optional: true },
  },
};

/* Note de guidance par phase de cycle — n'affecte pas les exercices du jour,
   seulement le ton et l'intensité recommandée (fidèle à la référence). */
export const PHASE_WEEK_NOTES = {
  home: {
    mens: "Phase menstruelle — intensité réduite. Remplace les séances Lower Body intenses par du Pilates doux ou de la marche. Si tu te sens bien, la séance Upper légère et le Pilates core restent OK. Pas de vacuum jours 1–2. Priorise le repos et le fer alimentaire.",
    fol: "Phase folliculaire — ta phase d'or. Énergie haute, récupération rapide. C'est ici que tu progresses le plus. Pousse les charges (KB 8 kg), augmente les séries. Toutes les séances au programme.",
    ov: "Ovulation — pic de performance. Force et endurance au maximum. Séances les plus lourdes de ton cycle — profites-en pour dépasser tes records de KB. Attention : ligaments plus laxes → échauffement soigné.",
    lut: "Phase lutéale — adapter et écouter. Réduis le volume de ~20% (pas l'intensité). Plus de Pilates, moins d'explosif. Rétention d'eau normale : ne te pèse pas. Magnésium le soir pour les crampes.",
  },
  gym: {
    mens: "Phase menstruelle — adapte à la salle. Évite les machines à charge maximale. Privilégie câbles légers, abducteur assis, étirements profonds. La séance Upper légère reste OK. Si douleurs intenses : Pilates au sol ou marche sur tapis.",
    fol: "Phase folliculaire — plein gaz à la salle. Profite des machines pour charger : hip thrust guidé, leg curl couché, câble kickback. Augmente les charges chaque semaine. C'est la période reine pour la surcharge progressive.",
    ov: "Ovulation — teste tes records à la salle. Charge maximale sur hip thrust et leg curl. Excellent moment pour progresser sur les poids. Échauffement articulaire soigné (ligaments laxes). Full body intense possible.",
    lut: "Phase lutéale — volume réduit à la salle. Même exercices, -20% séries. Privilégie les câbles et les machines guidées sur les libres. Le cardio doux (vélo assis léger, elliptique) remplace les séances les plus intenses en fin de phase.",
  },
};
