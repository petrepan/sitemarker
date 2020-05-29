const initialCache = "initial-cache";

const assets = [
  "/",
  "/index.html",
  "/app/control.js",
  "/app/index.js",
  "/app/toggler.js",
  "/public/style.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css",
  "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,400&display=swap",
  "https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xMIzIXKMnyrYk.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/webfonts/fa-solid-900.woff2"
];

//install service worker
self.addEventListener("install", (installEvt) => {
    //store all assets
  installEvt.waitUntil(
    caches.open(initialCache).then((cache) => {
      cache.addAll(assets);
    })
  );
});



//fetch service worker
self.addEventListener("fetch", fetchEvt => {
    //fetch assets using the fetch event
    fetchEvt.respondWith(
        caches.match(fetchEvt.request).then(cacheRes => {
            return cacheRes || fetch(fetchEvt.request)
        })
    )
});
