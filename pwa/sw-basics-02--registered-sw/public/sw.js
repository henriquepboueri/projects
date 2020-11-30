self.addEventListener("install", (event) => {
  console.log("Installed", event);
});

self.addEventListener("activate", (event) => {
  console.log("Activated", event);
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching something", event);
  event.respondWith(fetch(event.request));
});
