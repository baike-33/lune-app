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
