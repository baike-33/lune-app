export const LV3 = {
  // Base palette warm plum
  bg: '#160B11',
  bg2: '#1F1018',
  bg3: '#2A1622',
  ink: '#F8EEDC',
  ink2: 'rgba(248,238,220,0.78)',
  ink3: 'rgba(248,238,220,0.56)',
  muted: 'rgba(248,238,220,0.40)',
  faint: 'rgba(248,238,220,0.16)',

  // Glass colors
  glass: 'rgba(255,220,190,0.06)',
  glass2: 'rgba(255,220,190,0.10)',
  glassLine: 'rgba(255,220,190,0.14)',
  glassLine2: 'rgba(255,220,190,0.22)',
  innerGlow: 'rgba(255,210,180,0.08)',

  // Warm accents (used as muse palette also)
  peach: '#F4B58A',
  peach2: '#F0926C',
  rose: '#E89AAB',
  rose2: '#D47A8E',
  gold: '#E8C887',
  sage: '#B0C5A7',
  lavender: '#C5B5D9',
  coral: '#F09275',
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
  background: LV3.bg,
  color: LV3.ink,
  fontFamily: "'Manrope', sans-serif",
  overflow: 'hidden',
});
