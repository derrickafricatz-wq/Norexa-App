const CACHE_NAME = "afya-care-v7";

const APP_FILES = [
  "/AFYA-CARE/",
  "/AFYA-CARE/index.html",
  "/AFYA-CARE/images/ad3.png",
  "/AFYA-CARE/images/one.jpg"
];

self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))

  );

  self.skipWaiting();

});

self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then((keys) => {

      return Promise.all(

        keys.map((key) => {

          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }

        })

      );

    })

  );

  self.clients.claim();

});

self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request)
      .then((cached) => {

        return cached || fetch(event.request);

      })

  );

});