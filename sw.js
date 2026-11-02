// Trail race planner: offline cache. Change VERSION after editing any file.
const VERSION = 'trailplan-v9';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  // cache:'reload' skips the browser's HTTP cache, so a new VERSION really gets the new files.
  e.waitUntil(caches.open(VERSION)
    .then(c => c.addAll(CORE.map(u => new Request(u, { cache:'reload' }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Serve from cache first so the app opens with no signal, then refresh the cache in the background.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !isFont) return;
  const nav = req.mode === 'navigate';
  let key = req;
  if (nav){
    // Only the app's own page is stored as the app shell. Other pages on the site
    // (README.md, etc.) go straight to the network and are never cached.
    const scope = new URL(self.registration.scope).pathname;
    if (url.pathname !== scope && url.pathname !== scope + 'index.html') return;
    key = new URL('index.html', self.registration.scope).href;
  }
  const cacheP = caches.open(VERSION);
  const netP = fetch(req).then(async res => {
    if (res && (res.ok || res.type === 'opaque') && !res.redirected){ const c = await cacheP; await c.put(key, res.clone()); }
    return res;
  });
  // Keep the worker alive until the background refresh has been written to the cache.
  e.waitUntil(netP.catch(() => {}));
  e.respondWith(cacheP.then(c => c.match(key, { ignoreSearch: nav })).then(hit => hit || netP));
});
