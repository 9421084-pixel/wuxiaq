const V='wxq-v587';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.headers.has('range'))return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(/\.(mp4|webm)$/.test(u.pathname))return;
 if(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html')){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res})))});
