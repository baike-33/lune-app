export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function isToday(dateISO) {
  return !!dateISO && dateISO === todayISO();
}

/* true si dateISO tombe dans les `days` derniers jours (aujourd'hui inclus) */
export function isWithinDays(dateISO, days) {
  if (!dateISO) return false;
  const d = new Date(dateISO + 'T00:00:00');
  if (isNaN(d)) return false;
  const diff = Math.floor((new Date() - d) / 86400000);
  return diff >= 0 && diff < days;
}

/* Jours consécutifs jusqu'à l'entrée la plus récente — 0 si la dernière
   entrée date de plus d'un jour (le streak "casse" si on saute un jour) */
export function computeStreak(dateKeys) {
  if (!dateKeys || !dateKeys.length) return 0;
  const sorted = [...new Set(dateKeys)].sort().reverse();
  const mostRecent = sorted[0];
  const daysSince = Math.floor((new Date(todayISO() + 'T00:00:00') - new Date(mostRecent + 'T00:00:00')) / 86400000);
  if (daysSince > 1) return 0;
  let streak = 1;
  const cursor = new Date(mostRecent + 'T00:00:00');
  for (let i = 1; i < sorted.length; i++) {
    cursor.setDate(cursor.getDate() - 1);
    if (sorted[i] === cursor.toISOString().slice(0, 10)) streak++;
    else break;
  }
  return streak;
}
