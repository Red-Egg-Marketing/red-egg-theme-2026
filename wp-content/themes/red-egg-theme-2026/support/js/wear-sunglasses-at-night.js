/**
 *   ( •_•)
 *   ( •_•)>⌐■-■
 *   (⌐■_■)
 *
 * Red Egg team "Glassify" easter egg.
 *
 * Type any team member's first name anywhere on the site to teleport to their
 * bio page with sunglasses dropped over their face. If you're already on that
 * member's bio page, typing their name toggles the shades on/off.
 *
 * The first-name -> [bio URLs] map is injected from PHP as
 * window.REDEGG_GLASSES.members (see inc/team-glasses-easter-egg.php).
 */
(function () {
	'use strict';

	var data = window.REDEGG_GLASSES || {};
	var members = data.members || {};

	var CLASS = 'glassified';
	var FLAG = 'redeggGlassify'; // sessionStorage flag carried across navigation

	var names = Object.keys(members);
	var longest = names.reduce(function (max, name) {
		return Math.max(max, name.length);
	}, 0);

	// --- On arrival: if we teleported here for glasses, put them on. ---------
	function applyOnLoad() {
		var body = document.body;
		if (!body) {
			return;
		}

		var wanted = false;
		try {
			wanted = sessionStorage.getItem(FLAG) === '1';
		} catch (e) {}

		// Also honor a #glassified hash so the effect is shareable via URL.
		if (window.location.hash === '#' + CLASS) {
			wanted = true;
		}

		if (wanted && body.classList.contains('single-gs_team')) {
			body.classList.add(CLASS);
		}

		try {
			sessionStorage.removeItem(FLAG);
		} catch (e) {}
	}

	// --- Path helpers (trailing slashes normalized for comparison) -----------
	function normalizePath(path) {
		return String(path).replace(/\/+$/, '');
	}

	function currentPath() {
		return normalizePath(window.location.pathname);
	}

	function urlPath(url) {
		try {
			return normalizePath(new URL(url, window.location.origin).pathname);
		} catch (e) {
			return normalizePath(url);
		}
	}

	// --- Act on a matched first name -----------------------------------------
	function trigger(first) {
		var urls = members[first];
		if (!urls || !urls.length) {
			return;
		}

		var here = currentPath();

		// Are we already on one of the members who share this first name?
		var idx = -1;
		for (var i = 0; i < urls.length; i++) {
			if (urlPath(urls[i]) === here) {
				idx = i;
				break;
			}
		}

		if (idx !== -1) {
			// Only one person with this name AND we're already on their page:
			// just toggle the shades in place — no navigation needed.
			if (urls.length === 1) {
				document.body.classList.toggle(CLASS);
				return;
			}
			// Shared first name: cycle to the next person who has it.
			var next = urls[(idx + 1) % urls.length];
			go(next);
			return;
		}

		// Not on any of them yet — go to the first.
		go(urls[0]);
	}

	function go(url) {
		try {
			sessionStorage.setItem(FLAG, '1');
		} catch (e) {}
		window.location.href = url;
	}

	// --- Keystroke buffer ----------------------------------------------------
	var buffer = '';

	function onKeydown(e) {
		// Skip modified keys (shortcuts) ...
		if (e.ctrlKey || e.metaKey || e.altKey) {
			return;
		}
		// ... and anything typed into a field, so the newsletter box etc.
		// doesn't launch you across the site.
		var t = e.target;
		if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) {
			return;
		}

		var key = e.key;
		if (!key || key.length !== 1 || !/[a-zA-Z]/.test(key)) {
			return;
		}

		// Roll a window the length of the longest name; test its tail.
		buffer = (buffer + key.toLowerCase()).slice(-longest);

		for (var i = 0; i < names.length; i++) {
			if (buffer.length >= names[i].length && buffer.slice(-names[i].length) === names[i]) {
				buffer = '';
				trigger(names[i]);
				return;
			}
		}
	}

	// --- Wire up -------------------------------------------------------------
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', applyOnLoad);
	} else {
		applyOnLoad();
	}

	if (longest > 0) {
		document.addEventListener('keydown', onKeydown);
	}
})();