/* ═══════════════════════════════════════════════
   IRONFIT Service Worker
   Estratégia: Cache-first com fallback de rede
   Versão: 1.0.0
═══════════════════════════════════════════════ */

const CACHE_NAME = 'ironfit-v1.0.0';
const OFFLINE_URL = '/index.html';

// Arquivos que serão cacheados na instalação
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-256x256.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/splash-2048x2048.png',
  // Fontes do Google (cache externo)
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap',
];

/* ══ INSTALL ══ */
self.addEventListener('install', event => {
  console.log('[SW] Instalando IRONFIT v1.0.0...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cacheando arquivos essenciais');
        // Cachear um a um para não falhar tudo se um arquivo falhar
        return Promise.allSettled(
          PRECACHE_URLS.map(url =>
            cache.add(url).catch(err => console.warn(`[SW] Falha ao cachear ${url}:`, err))
          )
        );
      })
      .then(() => {
        console.log('[SW] Instalação completa!');
        return self.skipWaiting();
      })
  );
});

/* ══ ACTIVATE ══ */
self.addEventListener('activate', event => {
  console.log('[SW] Ativando novo Service Worker...');
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log('[SW] Removendo cache antigo:', name);
              return caches.delete(name);
            })
        );
      }),
      // Tomar controle imediato
      self.clients.claim()
    ])
  );
});

/* ══ FETCH — Estratégia Cache First ══ */
self.addEventListener('fetch', event => {
  // Ignora requests não-GET e chrome-extensions
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;

  // Para navegação (páginas HTML): Network first, fallback para cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cachear resposta fresquinha
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Offline: servir do cache
          return caches.match(OFFLINE_URL) || caches.match('/');
        })
    );
    return;
  }

  // Para assets (JS, CSS, imagens, fontes): Cache first
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Servir do cache imediatamente e atualizar em background
          const fetchPromise = fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return networkResponse;
          }).catch(() => {}); // Silenciar erro de rede

          return cachedResponse;
        }

        // Não está no cache: buscar da rede e cachear
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          return response;
        });
      })
  );
});

/* ══ MESSAGE — Forçar atualização ══ */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Forçando atualização...');
    self.skipWaiting();
  }
});

/* ══ PUSH NOTIFICATIONS (estrutura para futuro) ══ */
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'IRONFIT';
  const options = {
    body: data.body || 'Hora do treino! 💪',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Abrir App' },
      { action: 'dismiss', title: 'Depois' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow(event.notification.data?.url || '/');
      })
    );
  }
});

console.log('[SW] IRONFIT Service Worker carregado ✅');
