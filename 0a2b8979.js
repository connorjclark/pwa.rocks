'use strict';

const PREFIX = 'pwa.rocks';
const HASH = '0a2b8979'; // Computed at build time.
const OFFLINE_CACHE = `${PREFIX}-${HASH}`;

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(OFFLINE_CACHE).then(function(cache) {
			return cache.addAll([
				'/pwa.rocks/',
				'/pwa.rocks/favicon.ico',
				'/pwa.rocks/screen.css',
				'/pwa.rocks/script.js',
				'/pwa.rocks/fonts/permanent-marker.woff',
				'/pwa.rocks/fonts/permanent-marker.woff2',
				'/pwa.rocks/images/icon-228x228.png',
				'/pwa.rocks/images/icon.svg',
				'/pwa.rocks/apps/air-horner.svg',
				'/pwa.rocks/apps/aliexpress.svg',
				'/pwa.rocks/apps/babe.svg',
				'/pwa.rocks/apps/billings-gazette.svg',
				'/pwa.rocks/apps/bubble.svg',
				'/pwa.rocks/apps/chrome-status.svg',
				'/pwa.rocks/apps/cloud-four.svg',
				'/pwa.rocks/apps/currency-x.svg',
				'/pwa.rocks/apps/datememe.svg',
				'/pwa.rocks/apps/dev-opera.svg',
				'/pwa.rocks/apps/digikala.svg',
				'/pwa.rocks/apps/emojoy.svg',
				'/pwa.rocks/apps/english-accents-map.svg',
				'/pwa.rocks/apps/expense-manager.svg',
				'/pwa.rocks/apps/financial-times.svg',
				'/pwa.rocks/apps/firefox.png',
				'/pwa.rocks/apps/flipboard.svg',
				'/pwa.rocks/apps/flipkart.svg',
				'/pwa.rocks/apps/geo-news.svg',
				'/pwa.rocks/apps/get-kana.svg',
				'/pwa.rocks/apps/google-io.svg',
				'/pwa.rocks/apps/guitar-tuner.svg',
				'/pwa.rocks/apps/housing.svg',
				'/pwa.rocks/apps/inbox-attack.svg',
				'/pwa.rocks/apps/jalantikus.svg',
				'/pwa.rocks/apps/konga.svg',
				'/pwa.rocks/apps/meatscope.svg',
				'/pwa.rocks/apps/nasa_logo.svg',
				'/pwa.rocks/apps/notes.svg',
				'/pwa.rocks/apps/oumy.svg',
				'/pwa.rocks/apps/paper-planes.svg',
				'/pwa.rocks/apps/piiko.png',
				'/pwa.rocks/apps/podle.svg',
				'/pwa.rocks/apps/pokedex.png',
				'/pwa.rocks/apps/poly-mail.svg',
				'/pwa.rocks/apps/polytimer.svg',
				'/pwa.rocks/apps/prog-beer.svg',
				'/pwa.rocks/apps/puzzle-2048.svg',
				'/pwa.rocks/apps/qrcode.svg',
				'/pwa.rocks/apps/reacthn.svg',
				'/pwa.rocks/apps/resilient-web-design.svg',
				'/pwa.rocks/apps/riorun.svg',
				'/pwa.rocks/apps/selio.svg',
				'/pwa.rocks/apps/session.svg',
				'/pwa.rocks/apps/smaller-pictures.svg',
				'/pwa.rocks/apps/snapdrop.svg',
				'/pwa.rocks/apps/snapwat.svg',
				'/pwa.rocks/apps/soundslice.svg',
				'/pwa.rocks/apps/svgomg.svg',
				'/pwa.rocks/apps/telegram.svg',
				'/pwa.rocks/apps/voice-memos.svg',
				'/pwa.rocks/apps/washington-post.svg',
				'/pwa.rocks/apps/wave-pd1.svg',
				'/pwa.rocks/apps/web-flap.png',
				'/pwa.rocks/apps/webnfc.svg',
				'/pwa.rocks/apps/wiki-offline.svg'
			]); // Computed at build time.
		})
	);
});

self.addEventListener('activate', function(event) {
	// Delete old asset caches.
	event.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(
				keys.map(function(key) {
					if (
						key != OFFLINE_CACHE &&
						key.startsWith(`${PREFIX}-`)
					) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	if (event.request.mode == 'navigate') {
		console.log('Handling fetch event for', event.request.url);
		console.log(event.request);
		event.respondWith(
			fetch(event.request).catch(function(exception) {
				// The `catch` is only triggered if `fetch()` throws an exception,
				// which most likely happens due to the server being unreachable.
				console.error(
					'Fetch failed; returning offline page instead.',
					exception
				);
				return caches.open(OFFLINE_CACHE).then(function(cache) {
					return cache.match('/');
				});
			})
		);
	} else {
		// It’s not a request for an HTML document, but rather for a CSS or SVG
		// file or whatever…
		event.respondWith(
			caches.match(event.request).then(function(response) {
				return response || fetch(event.request);
			})
		);
	}

});
