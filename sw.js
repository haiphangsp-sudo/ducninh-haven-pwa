const CACHE_NAME = 'ducninh-haven-v12'; // Nhớ tăng số phiên bản
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/image_4.jpg'
];

self.addEventListener('install', event => {
    self.skipWaiting(); // Ép cài đặt ngay
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            clients.claim(), // Chiếm quyền ngay
            caches.keys().then(keys => Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            ))
        ])
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});