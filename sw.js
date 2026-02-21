const CACHE_NAME = 'ducninh-haven-v6';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/logo-192.png',
  '/logo-512.png',
  '/image_4.jpg'
];

// Cài đặt Service Worker và lưu trữ tài nguyên vào bộ nhớ đệm
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Phản hồi yêu cầu khi offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});