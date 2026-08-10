export const LV3 = {
  // Base palette warm plum — profondeur retravaillée
  bg: '#140A10',
  bg2: '#1F1018',
  bg3: '#2A1622',
  bgDeep: '#0C0610',
  bgTop: '#20111C',
  ink: '#FBF2E2',
  ink2: 'rgba(251,242,226,0.80)',
  ink3: 'rgba(251,242,226,0.56)',
  muted: 'rgba(251,242,226,0.40)',
  faint: 'rgba(251,242,226,0.15)',

  // Glass colors — surfaces plus définies, bord qui accroche la lumière
  glass: 'rgba(255,224,196,0.07)',
  glass2: 'rgba(255,224,196,0.12)',
  glassLine: 'rgba(255,226,200,0.17)',
  glassLine2: 'rgba(255,228,204,0.26)',
  innerGlow: 'rgba(255,212,182,0.10)',

  // Warm accents (used as muse palette also)
  peach: '#F6BC90',
  peach2: '#F0926C',
  rose: '#E89AAB',
  rose2: '#D47A8E',
  gold: '#EACB85',
  sage: '#B0C5A7',
  lavender: '#C5B5D9',
  coral: '#F09275',

  // Dégradé signature — CTA lumineux, joaillier
  grad: 'linear-gradient(135deg, #F8CB9E 0%, #F0926C 54%, #E88FA1 100%)',
};

export const lv3Label = {
  fontSize: 10,
  letterSpacing: '.20em',
  textTransform: 'uppercase',
  fontFamily: 'Manrope, sans-serif',
  fontWeight: 500,
};

export const lv3Phone = () => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  background: `linear-gradient(178deg, ${LV3.bgTop} 0%, ${LV3.bg} 46%, ${LV3.bgDeep} 100%)`,
  color: LV3.ink,
  fontFamily: "'Manrope', sans-serif",
  overflow: 'hidden',
});
