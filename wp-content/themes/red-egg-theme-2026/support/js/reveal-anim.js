/**
 * Reveal Animation – header reveals on scroll (GSAP)
 *
 * Animates the text / CTA elements inside any header block that opted
 * in via the "Reveal animation" control (block-extensions/reveal-anim.js
 * writes `has-reveal has-reveal--{style}` on the block wrapper):
 *
 *   reveal-up : rises up from behind a clip mask (reveal from the bottom)
 *   fade-up   : fade in + rise
 *   fade-in   : fade in
 *
 * No-flash + accessible:
 *   - A tiny <head> script adds `re-anim` to <html> before first paint
 *     (only when motion is allowed), and _reveal-anim.scss pre-hides the
 *     targets under `html.re-anim`. So targets never flash visible, and
 *     no-JS / reduced-motion users get the content shown normally.
 *   - This module then animates the pre-hidden targets to visible.
 *
 * SPA-safe: re-scans on page view, tears down on leave.
 */

( function () {
	if ( window.__reRevealBound ) return;
	window.__reRevealBound = true;

	var TARGETS = 'h1, h2, h3, h4, h5, h6, p, .eyebrow, .wp-block-button, .btn';

	var reduce = window.matchMedia
		? window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		: false;

	var tweens = [];

	function fromVarsFor( style ) {
		if ( style === 'reveal-up' ) {
			return { clipPath: 'inset(100% 0 0 0)', webkitClipPath: 'inset(100% 0 0 0)', y: 24 };
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
			stagger: 0.12,
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

	function styleOf( block ) {
		var m = block.className.match( /has-reveal--([\w-]+)/ );
		return m ? m[ 1 ] : '';
	}

	function scan() {
		if ( typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' ) {
			return;
		}
		gsap.registerPlugin( ScrollTrigger );

		Array.prototype.slice
			.call( document.querySelectorAll( '.has-reveal' ) )
			.forEach( function ( block ) {
				if ( block.dataset.revealed ) return;
				block.dataset.revealed = '1';

				var style = styleOf( block );
				if ( ! style ) return;

				// Only elements not already claimed by a nested reveal.
				var targets = Array.prototype.slice
					.call( block.querySelectorAll( TARGETS ) )
					.filter( function ( el ) {
						return ! el.dataset.revealTarget;
					} );
				if ( ! targets.length ) return;

				targets.forEach( function ( el ) {
					el.dataset.revealTarget = '1';
				} );

				var to = toVarsFor( style );
				to.scrollTrigger = {
					trigger: block,
					start: 'top 80%',
					toggleActions: 'play none none none',
				};

				tweens.push( gsap.fromTo( targets, fromVarsFor( style ), to ) );
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

	// Reduced motion (or set after load): make sure nothing stays hidden.
	function reveal_all_static() {
		document.documentElement.classList.remove( 're-anim' );
	}

	function init() {
		if ( reduce ) {
			reveal_all_static();
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
