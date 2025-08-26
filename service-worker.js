const CACHE_NAME = "fds-cache-v1";
const FILES_TO_CACHE = [
  "./index.html",
  "./FDS-ORTONEX-023.pdf",
  "./FDS-HIPOCLORITO-65.pdf",
  "./FDS-TRICLORO.pdf"
];

// Instala o Service Worker e guarda os arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Ativa o Service Worker e remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Busca arquivos: primeiro offline, depois online
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
