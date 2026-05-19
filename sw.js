const CACHE_NAME = "afya-care-v6-smart";

/* ONLY CORE FILES PRE-CACHED */
const CORE_FILES = [
  "/AFYA-CARE/",
  "/AFYA-CARE/index.html",

  // IMAGES
  "/AFYA-CARE/images/ad3.png",
  "/AFYA-CARE/images/one.jpg"
];

/* INSTALL */
self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then((cache) => {

        console.log("Core cache ready");

        return cache.addAll(CORE_FILES);

      })

  );

  self.skipWaiting();

});

/* ACTIVATE */
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

/* SMART FETCH */
self.addEventListener("fetch", (event) => {

  const req = event.request;

  event.respondWith(

    caches.match(req).then((cached) => {

      // RETURN CACHE FIRST
      if (cached) {
        return cached;
      }

      // FETCH FROM INTERNET
      return fetch(req).then((response) => {

        // CACHE MP4 + IMAGES DYNAMICALLY
        if (
          req.url.includes(".mp4") ||
          req.url.includes(".png") ||
          req.url.includes(".jpg") ||
          req.url.includes(".jpeg")
        ) {

          const responseClone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseClone);
          });

        }

        return response;

      }).catch(() => {

        // OFFLINE VIDEO FALLBACK
        if (req.destination === "video") {
          return caches.match("/AFYA-CARE/videos/choo.mp4");
        }

      });

    })

  );

});
