const CACHE_NAME = 'e-smart-shop-v1';

// Files to cache (basic app assets only)
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.png',
  '/minilogo.png',
  '/manifest.json'
];

// Install event: cache app files
self.addEventListener('install', (event) => {
  self.skipWaiting(); // activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate event: delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
  self.clients.claim(); // take control immediately
});

// Fetch event: network-first for app files
self.addEventListener('fetch', (event) => {
  // Only handle requests to your own origin
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Update cache with latest response
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(event.request)) // fallback if offline
    );
  } else {
    // Other requests (API calls) go straight to network
    event.respondWith(fetch(event.request));
  }
});
