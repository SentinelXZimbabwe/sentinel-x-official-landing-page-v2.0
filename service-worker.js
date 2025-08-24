self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('sentinel-x-cache-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './favicon.ico',
        './logos/main-logo.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
