// SEGUNDO BLOQUE
importScripts('js/sw-utils.js');

// PRIMER BLOQUE
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    //'/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/carnage.jpg',
    'img/avatars/greengoblin.jpg',
    'img/avatars/punisher.jpg',
    'img/avatars/wolverine.jpg',
    'img/avatars/venom.jpg',
    'img/avatars/ghostrider.jpg',
    'img/avatars/deadpool.jpg',
    'js/app.js',
    // AGREGAR HASTA EL SEGUNDO
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'

];

// INSTALACIÓN DEL SERVICE WORKER CON MANEJO DE ERRORES

self.addEventListener('install', e=> {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL).catch(err => {
            console.error('ERROR AL AGREGAR AL CACHÉ ESTATICO', err);
        })
    );

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => 
        cache.addAll(APP_SHELL_INMUTABLE).catch(err => {
            console.error('ERROR AL AGREGAR AL CACHE INMUTABLE', err);
        })
    );
    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

// ACTIVACIÓN DEL SERVICE WORKER
self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys => {
        return Promise.all(
            keys.map(key => {
                if (key !== STATIC_CACHE && key.includes('static')) {
                    return caches.delete(key);
                }
            })
        );
    });

    e.waitUntil(respuesta);
});

// CACHE CON NETWORK 2DA PARTE

self.addEventListener(fetch, e=>{
    const respuesta = caches.match(e.request).then(res=>{
        if(res){
            return res;
        } else {
            return fetch(e.request).then(newRes => {
                return actualizarCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            });
        }
    });
    e.respondWith(respuesta);
});