/* global caches, fetch, self */

const cacheName = 'playjs-v1'
const contentToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/assets/style.css',
  '/assets/images/44.png',
  '/assets/images/50.png',
  '/assets/images/150.png',
  '/assets/images/192.png',
  '/assets/images/512.png',
  '/assets/images/maskable-192.png',
  '/assets/images/maskable-512.png',
  '/assets/app.js',
  'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/mode/javascript/javascript.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/addon/selection/active-line.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.min.css'
]

self.addEventListener('install', function (e) {
  console.log('[Service Worker] Install')
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[Service Worker] Caching all: app shell and content')
      return cache.addAll(contentToCache)
    })
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheName.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log('[Service Worker] Fetching resource: ' + e.request.url)
      return r || fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function (cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url)
          cache.put(e.request, response.clone())
          return response
        })
      })
    })
  )
})
