const CACHE_NAME = "maitre-spirituel-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "index.html",
  "manifest.json",
  "assets/images/icon-192.png",
  "assets/images/icon-144.png",
  "assets/images/icon-512.png"
];

// Installation : mise en cache initiale
self.addEventListener("install", event => {
  console.log("Installation du Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener("activate", event => {
  console.log("♻️ Activation du Service Worker...");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Interception des requêtes réseau
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});