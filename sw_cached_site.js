const cacheName = 'v2';

// Store the entire response into the caches WEB API storage

// Call Install Event
self.addEventListener('install', ( event ) => {
    console.log('Service Worker Installed');
    
    // // Updated caches WEB API storage with the desired pages
    // event.waitUntil(
    //     caches
    //         .open(cacheName)
    //         .then(cache => {
    //             console.log('Service Worker: Caching Files');
    //             cache.addAll(cachedAssets)
    //         })
    //         .then(() => self.skipWaiting())
    // )
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
    // when service worker is fetched, cache all files
    event.respondWith(
        fetch(event.request)
            .then(res => {
                // make copy/clone of the response
                const resClone = res.clone();
                
                // Open Cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // Add response to cache
                        cache.put( event.request, resClone )
                    })
                return res;
            }  )
            .catch(( err ) => caches.match(event.request).then( res =>  res ))
    )
} )