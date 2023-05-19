// Make sure Service Workers are supported
if ('serviceWorker' in navigator) {
    // Or if( navigator.serviceWorker )

    window.addEventListener('load', () => {
        // Register Service Worker
        navigator.serviceWorker
        .register('../sw_cached_site.js')
            .then(res => console.log('Service Worker Registered'))
            .catch( err => console.log('Service Worker : Error: ', err))     
    } )
}