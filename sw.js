// ==========================================================================
// RAMAZAN TOZ BARBER STUDIO - ENTERPRISE SERVICE WORKER (OFFLINE-FIRST)
// Sürüm: v6.2.1
// ==========================================================================

const CACHE_VERSION = 'v6.2.1';
const STATIC_CACHE_NAME = `barberflow-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `barberflow-dynamic-${CACHE_VERSION}`;

// 100% Çevrimdışı Çalışma İçin Önbelleklenecek Yerel Varlıklar
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './vendor/tailwind.min.js',
  './vendor/lucide.min.js',
  './icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png',
  './apple-touch-icon.png',
  './img/icon.png',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/icon-maskable.png',
  './IMG/icon.png'
];

// Service Worker Kurulumu (Install)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      // Yerel paketlenmiş varlıkları önbelleğe al
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      // Yeni service worker'ı hemen etkinleştir
      return self.skipWaiting();
    })
  );
});

// Service Worker Etkinleştirme (Activate)
// DİKKAT: Bu işlem yalnızca Cache Storage'daki eski statik sürümleri siler.
// IndexedDB ('BarberFlow_DB') ve kullanıcı verileri ASLA etkilenmez ve silinmez!
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      // Tüm açık sekmelerde kontrolü hemen devral
      return self.clients.claim();
    })
  );
});

// Akıllı Ağ İstek Yönetimi (Fetch Strategy)
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Yalnızca GET isteklerini önbelleğe al
  if (request.method !== 'GET') {
    return;
  }

  // 1. Navigasyon (Sayfa Açılışı / HTML İstekleri) -> Network-First (Offline Fallback ile)
  if (request.mode === 'navigate' || (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Ağ yanıtını önbelleğe güncelle
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Çevrimdışıyken önbellekteki index.html'i ver
          return caches.match('./index.html').then((cachedIndex) => {
            return cachedIndex || caches.match('./');
          });
        })
    );
    return;
  }

  // 2. Statik Yerel Varlıklar (vendor/, ikonlar, manifest) -> Cache-First (Network Fallback ile)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Üçüncü Parti Dış Kaynaklar (Google Fonts vb.) -> Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        // Çevrimdışıyken dış kaynak hata verirse sessizce önbelleği dön
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
