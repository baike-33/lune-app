import { LV3 } from '../theme/tokens';

/* Préfixe les chemins publics absolus (ex. '/muses/x.png') avec le base
   path Vite, pour que les images restent valides une fois déployées sous
   un sous-chemin (ex. GitHub Pages : /lune-app/). */
export function asset(path) {
  if (!path || !path.startsWith('/')) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}

const MONTHS_FR = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const MONTHS_FR_FULL = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const WEEKDAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

/* Parse un 'YYYY-MM-DD' en date locale (évite le décalage UTC de `new Date(iso)`) */
function parseLocalDate(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  if (!y || !m || !d) return new Date(NaN);
  return new Date(y, m - 1, d);
}

export function fmtDate(iso) {
  const d = parseLocalDate(iso);
  if (isNaN(d)) return '';
  return `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}

export function monthKey(iso) {
  const d = parseLocalDate(iso);
  return `${d.getFullYear()}-${String(d.getMonth()).padStart(2, '0')}`;
}

export function monthLabel(iso) {
  const d = parseLocalDate(iso);
  return `${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}

/* "MARDI 19 MAI" — libellé du jour courant, en majuscules */
export function todayLabel() {
  const d = new Date();
  return `${WEEKDAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR_FULL[d.getMonth()]}`.toUpperCase();
}

/* "21:47" — heure courante */
export function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function navBtnStyle(accent) {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', minHeight: 40,
    borderRadius: 99, cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
    background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent ? accent + '66' : LV3.glassLine}`,
    color: accent || LV3.ink2,
  };
}
