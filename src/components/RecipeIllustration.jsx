/* Illustrations vectorielles maison pour les recettes — pas de photo culinaire
   disponible, donc un système d'icônes cohérent avec le design system (traits
   fins, teinte accent de la muse) plutôt qu'un visuel générique ou absent. */

const ICONS = {
  bowl: ({ color }) => (
    <>
      <path d="M12 30h40a20 18 0 0 1-40 0Z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="26" r="2.4" fill={color} />
      <circle cx="33" cy="23" r="2" fill={color} />
      <circle cx="41" cy="27" r="2.4" fill={color} />
      <path d="M20 22c2-3 5-4 12-4s10 1 12 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </>
  ),
  porridge: ({ color }) => (
    <>
      <path d="M12 30h40a20 18 0 0 1-40 0Z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M26 12c0 3-3 3-3 6M32 10c0 3-3 3-3 6M38 12c0 3-3 3-3 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <line x1="44" y1="26" x2="50" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="51" cy="18" r="2.2" fill="none" stroke={color} strokeWidth="1.6" />
    </>
  ),
  yogurt: ({ color }) => (
    <>
      <path d="M22 12h20l-3 34a4 4 0 0 1-4 3.6h-6a4 4 0 0 1-4-3.6Z" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="21" y1="22" x2="43" y2="22" stroke={color} strokeWidth="1.6" opacity="0.6" />
      <line x1="22.4" y1="30" x2="41.6" y2="30" stroke={color} strokeWidth="1.6" opacity="0.6" />
      <line x1="40" y1="14" x2="46" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  plate: ({ color }) => (
    <>
      <circle cx="32" cy="32" r="19" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="32" cy="32" r="12.5" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.4" opacity="0.7" />
      <ellipse cx="28" cy="30" rx="6" ry="4.2" fill={color} fillOpacity="0.4" />
      <circle cx="38" cy="27" r="2" fill={color} />
      <circle cx="39" cy="35" r="1.8" fill={color} />
      <line x1="10" y1="14" x2="10" y2="26" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <line x1="54" y1="14" x2="54" y2="26" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </>
  ),
  stew: ({ color }) => (
    <>
      <path d="M14 26h36l-3 16a6 6 0 0 1-6 5H23a6 6 0 0 1-6-5Z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 28h4M52 28h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M26 10c0 3-3 3-3 6M33 8c0 3-3 3-3 6M40 10c0 3-3 3-3 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </>
  ),
  smoothie: ({ color }) => (
    <>
      <path d="M20 12h24l-4 38a3 3 0 0 1-3 2.6H27a3 3 0 0 1-3-2.6Z" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M18.4 22h27.2" stroke={color} strokeWidth="1.6" opacity="0.6" />
      <line x1="34" y1="12" x2="40" y2="2" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <rect x="24" y="30" width="4" height="4" rx="1" fill={color} opacity="0.5" />
      <rect x="34" y="34" width="4" height="4" rx="1" fill={color} opacity="0.5" />
    </>
  ),
  salad: ({ color }) => (
    <>
      <path d="M12 30h40a20 18 0 0 1-40 0Z" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M22 25c2-4 5-2 4-7" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M31 23c1-4 5-3 5-8" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M40 25c1-3 4-2 4-6" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="27" cy="28" r="1.8" fill={color} />
      <circle cx="37" cy="27" r="1.8" fill={color} />
    </>
  ),
  wrap: ({ color }) => (
    <>
      <rect x="10" y="24" width="44" height="16" rx="8" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="2" />
      <line x1="20" y1="24" x2="24" y2="40" stroke={color} strokeWidth="1.4" opacity="0.55" />
      <line x1="30" y1="24" x2="32" y2="40" stroke={color} strokeWidth="1.4" opacity="0.55" />
      <line x1="40" y1="24" x2="40" y2="40" stroke={color} strokeWidth="1.4" opacity="0.55" />
    </>
  ),
};

const VISUAL_FALLBACK = 'bowl';

export function RecipeIllustration({ visual, color, size = 64 }) {
  const Icon = ICONS[visual] || ICONS[VISUAL_FALLBACK];
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <Icon color={color} />
    </svg>
  );
}
