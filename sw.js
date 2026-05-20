const CACHE_NAME = "afya-care-v9";

const APP_FILES = [
  "/AFYA-CARE/",
  "/AFYA-CARE/index.html",
  "/AFYA-CARE/images/ad3.png",
  "/AFYA-CARE/images/one.jpg",
  "/AFYA-CARE/videos/choo.mp4",
  "/AFYA-CARE/videos/usafi.mp4",
  "/AFYA-CARE/videos/chanjo.mp4",
  "/AFYA-CARE/videos/meno.mp4"
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
