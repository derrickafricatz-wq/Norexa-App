const CACHE_NAME = "afya-care-v3";

const urlsToCache = [
  "/AFYA-CARE/",
  "/AFYA-CARE/index.html",

  // VIDEOS
  "/AFYA-CARE/videos/choo.mp4",
  "/AFYA-CARE/videos/usafi.mp4",
  "/AFYA-CARE/videos/chanjo.mp4",
  "/AFYA-CARE/videos/meno.mp4"

  // IMAGES
  "/AFYA-CARE/images/ad3.png",
  "/AFYA-CARE/images/one.jpg"
];

self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching files...");
        return cache.addAll(urlsToCache);
      })

  );

});

self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request)
      .then((response) => {

        // Return cached version if found
        if(response){
          return response;
        }

        // Otherwise fetch from internet
        return fetch(event.request);

      })

  );

});
