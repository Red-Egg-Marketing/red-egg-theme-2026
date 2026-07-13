/**
 * Squiggle Decoration – Scroll Animation
 *
 * Uses GSAP ScrollTrigger to animate the squiggle SVG
 * with a left-to-right clip-path reveal as the user
 * scrolls into view.
 *
 * Targets: [data-squiggle-animate="true"]
 */

( function () {
    if ( typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' ) return;

    gsap.registerPlugin( ScrollTrigger );

    const squiggles = document.querySelectorAll( '[data-squiggle-animate="true"]' );

    if ( ! squiggles.length ) return;

    squiggles.forEach( function ( el ) {
        // Start fully clipped (hidden), reveal left to right
        gsap.set( el, {
            clipPath: 'inset(0 100% 0 0)',
        } );

        gsap.to( el, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 50%',
                // once: true,
            },
        } );
    } );
} )();
