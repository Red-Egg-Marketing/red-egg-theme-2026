/**
 * Squiggle Decoration – Scroll Animation
 *
 * Uses GSAP ScrollTrigger to animate the squiggle SVG
 * with a left-to-right clip-path reveal as the user
 * scrolls into view.
 *
 * Targets: [data-squiggle-animate="true"]
 *
 * SPA-aware: re-runs on every red-egg:page-view (ScrollTriggers on
 * outgoing content are killed globally by js/spa-nav.js).
 */

import { onPageView } from './lifecycle';

( function () {

    function initSquiggles() {
        if ( typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' ) return;

        gsap.registerPlugin( ScrollTrigger );

        const squiggles = document.querySelectorAll( '[data-squiggle-animate="true"]' );

        if ( ! squiggles.length ) return;

        squiggles.forEach( function ( el ) {
            if ( el.dataset.squiggleInit ) return;
            el.dataset.squiggleInit = '1';

            // Start fully clipped (hidden), reveal left to right
            gsap.set( el, {
                clipPath: 'inset(0 100% 0 0)',
            } );

            gsap.to( el, {
                clipPath: 'inset(0 0% 0 0)',
                duration: 6.25,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 71.5%',
                    // once: true,
                },
            } );
        } );
    }

    onPageView( initSquiggles );

} )();
