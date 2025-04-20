const CACHE_NAME = 'tabata-timer-v9';
const ASSETS = [
  '/apps/tabata/', // Root of your app
  '/apps/tabata/index.html', // Main entry point
  '/apps/tabata/go.mp3',
  '/apps/tabata/rest.mp3',
  '/apps/tabata/beep-go.mp3',
  '/apps/tabata/getready.mp3',
  '/apps/tabata/float.gif',
  '/apps/tabata/beep-rest.mp3',
  '/apps/tabata/welldone.mp3',
  '/apps/tabata/welldone.gif',
  '/apps/tabata/icon-192x192.png',
  '/apps/tabata/icon-512x512.png',
  '/apps/tabata/gif/gif1.gif',
  '/apps/tabata/gif/gif2.gif',
  '/apps/tabata/gif/gif3.gif',
  '/apps/tabata/gif/gif4.gif',
  '/apps/tabata/gif/gif5.gif',
  '/apps/tabata/gif/gif6.gif',
  '/apps/tabata/gif/gif7.gif',
  '/apps/tabata/gif8.gif',
  '/apps/tabata/getready.mp3',
  '/apps/tabata/gif/gif9.gif',
  '/apps/tabata/gif/gif10.gif'
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => console.log('Assets cached successfully'))
      .catch((error) => console.error('Failed to cache assets:', error))
  );
});

// Serve cached assets when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch((error) => console.error('Fetch failed:', error))
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => console.log('Old caches cleared'))
    .catch((error) => console.error('Cache cleanup failed:', error))
  );
});