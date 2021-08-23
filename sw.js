const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js"
] //Guarda todos los archivos o lo que descarga en caché

const CACHE_NAME = "v2_cache_contador_react" //Le pone un nombre a lo que guarda en caché

//self = this. no hay diferencia entre usar uno u otro

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS)
            .then( () => {
                self.skipWaiting()
            })
            .catch(console.log)
        })
    )
}); //Instala en caché los archivos que desea

self.addEventListener("activate", (e) => {

    const cacheWhiteList = [CACHE_NAME]

    //Valida la versión guardada en cache del navegador respecto al de la webapp. Si no, lo borra y pone el nuevo
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
                return (cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName) 
                )
            }))
        }).then(() => self.clients.claim())
    )
});

//Compara lo que tiene que descargar con la caché. Si es lo mismo, usa lo de la caché.
/*self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if(res) {
                return res
            }
            return fetch(e.request);
        })
    })
});*/

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if(res) {
                return res
            }
            return fetch(e.request);
        })
    )
})