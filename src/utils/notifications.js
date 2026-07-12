/* Notifications navigateur locales — pas de backend, permission + Notification API. */

export function notifSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function notifPermission() {
  return notifSupported() ? Notification.permission : 'unsupported';
}

export async function requestNotifPermission() {
  if (!notifSupported()) return 'unsupported';
  if (Notification.permission === 'granted' || Notification.permission === 'denied') return Notification.permission;
  try { return await Notification.requestPermission(); } catch { return 'denied'; }
}

export function notify(title, body) {
  if (!notifSupported() || Notification.permission !== 'granted') return false;
  try { new Notification(title, { body }); return true; } catch { return false; }
}
