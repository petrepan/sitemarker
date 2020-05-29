const initialCache = "initial-cache6";
const unloadCache = "unloaded-cache2";
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

//limit cache size
const cacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(cacheSize(name, size))
            }
        })
    })
}

//install service worker
self.addEventListener("install", (installEvt) => {
    //store all assets
  installEvt.waitUntil(
    caches.open(initialCache).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// //activate service worker
self.addEventListener("activate", (actEvt) => {
    actEvt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== initialCache && key !== unloadCache)
                .map(key => caches.delete(key))
            )
        })
    )
});

//fetch service worker
self.addEventListener("fetch", fetchEvt => {
    //fetch assets using the fetch event
    fetchEvt.respondWith(
        caches.match(fetchEvt.request).then(cacheRes => {
            return cacheRes || fetch(fetchEvt.request).then(fetchRes => {
                return caches.open(unloadCache).then(cache => {
                    cache.put(fetchEvt.request.url, fetchRes.clone());
                    //removing keys in cache
                    cacheSize(unloadCache, 15);
                    return fetchRes;
                })
            })
        }).catch(()=> caches.match("/index.html"))
    )
});
