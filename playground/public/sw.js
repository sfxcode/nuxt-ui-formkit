// Minimal service worker for Nuxt UI
// This prevents the "No match found for location with path '/sw.js'" error

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  self.clients.claim()
})

// Simple fetch handler that passes through all requests
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request))
})

