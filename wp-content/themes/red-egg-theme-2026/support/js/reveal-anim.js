/**
 * Reveal Animation – heading reveals on scroll (GSAP)
 *
 * Animates any core Heading (h1–h6) that opted in via the "Reveal
 * animation" control (block-extensions/reveal-anim.js writes
 * `has-reveal has-reveal--{style}` on the heading):
 *
 *   reveal-up : rises up from behind a clip mask (reveal from the bottom)
 *   fade-up   : fade in + rise
 *   fade-in   : fade in
 *
 * No-flash + accessible:
 *   - A tiny <head> script adds `re-anim` to <html> before first paint
 *     (only when motion is allowed), and _reveal-anim.scss pre-hides the
 *     tagged headings under `html.re-anim`. So they never flash visible,
 *     and no-JS / reduced-motion visitors get the content shown normally.
 *   - This module then animates each pre-hidden heading to visible.
 *
 * Each heading reveals independently as it enters the viewport. SPA-safe:
 * re-scans on page view, tears down on leave.
 */

( function () {
	if ( window.__reRevealBound ) return;
	window.__reRevealBound = true;

	var reduce = window.matchMedia
		? window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		: false;

	var tweens = [];

	function fromVarsFor( style ) {
		if ( style === 'reveal-up' ) {
			return {
				clipPath: 'inset(100% 0 0 0)',
				webkitClipPath: 'inset(100% 0 0 0)',
				y: 24,
			};
		}
		if ( style === 'fade-up' ) {
			return { opacity: 0, y: 40 };
		}
		return { opacity: 0 }; // fade-in
	}

	function toVarsFor( style ) {
		var base = {
			duration: style === 'fade-in' ? 0.8 : 1,
			ease: 'power3.out',
			clearProps: 'transform,clipPath,-webkit-clip-path,will-change',
		};
		if ( style === 'reveal-up' ) {
			base.clipPath = 'inset(0% 0 0 0)';
			base.webkitClipPath = 'inset(0% 0 0 0)';
			base.y = 0;
		} else if ( style === 'fade-up' ) {
			base.opacity = 1;
			base.y = 0;
		} else {
			base.opacity = 1;
		}
		return base;
	}

	function styleOf( el ) {
		var m = el.className.match( /has-reveal--([\w-]+)/ );
		return m ? m[ 1 ] : '';
	}

	function scan() {
		if ( typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' ) {
			return;
		}
		gsap.registerPlugin( ScrollTrigger );

		Array.prototype.slice
			.call( document.querySelectorAll( '.has-reveal' ) )
			.forEach( function ( el ) {
				if ( el.dataset.revealed ) return;
				el.dataset.revealed = '1';

				var style = styleOf( el );
				if ( ! style ) return;

				var to = toVarsFor( style );
				to.scrollTrigger = {
					trigger: el,
					start: 'top 85%',
					toggleActions: 'play none none none',
				};

				tweens.push( gsap.fromTo( el, fromVarsFor( style ), to ) );
			} );
	}

	function teardown() {
		tweens.forEach( function ( t ) {
			try {
				if ( t.scrollTrigger ) t.scrollTrigger.kill();
				t.kill();
			} catch ( e ) {}
		} );
		tweens = [];
	}

	function init() {
		if ( reduce ) {
			// Ensure nothing stays pre-hidden if motion is disabled.
			document.documentElement.classList.remove( 're-anim' );
			return;
		}
		teardown();
		scan();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

	document.addEventListener( 'red-egg:page-view', init );
	document.addEventListener( 'red-egg:page-leave', teardown );
} )();
