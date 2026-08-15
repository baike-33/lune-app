/* Service worker Lune — coquille applicative hors-ligne.
   Les assets buildés par Vite portent un hash dans leur nom : ils sont
   immuables, donc servis depuis le cache en priorité. Le HTML, lui, passe
   par le réseau d'abord pour ne jamais bloquer une mise à jour. */

const VERSION = 'lune-v1';
const CORE = './';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll([CORE])).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigation : réseau d'abord, cache en secours (mode avion)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(CORE, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(CORE).then((r) => r || Response.error()))
    );
    return;
  }

  // Assets : cache d'abord, puis réseau (et on met en cache au passage)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy)).catch(() => {});
        }
        return res;
      });
    })
  );
});
