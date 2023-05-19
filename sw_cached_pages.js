const cacheName = 'v1';

const cachedAssets = [
    'index.html',
    'about.html',
    '/js/main.js',
    '/css/style.css'
]

// Call Install Event
// when service worker is installed, cache all files
self.addEventListener('install', ( event ) => {
    console.log('Service Worker Installed');
    
    // Updated caches WEB API storage with the desired pages
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cachedAssets)
            })
            .then(() => self.skipWaiting())
    )
})

// Call Activate Event
self.addEventListener('activate', ( event ) => {
    console.log('Service Worker Activated');
    
    // Remove Unwanted Caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cacheName !== cache) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                } )
            )
        } )
    )
})

// Call Fetch Event
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    
    // first check if live site is avialble, if not available the fetch the caches assets
    event.respondWith(
        // if live site available, it won't go into catch callback
        // if live site fails, catch callback will be used to serve cached assets
        fetch( event.request ).catch( () => caches.match( event.request ) )
    )
} )