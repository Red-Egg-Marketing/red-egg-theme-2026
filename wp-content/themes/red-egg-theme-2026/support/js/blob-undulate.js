/**
 * Blob Undulate – gentle point wobble
 *
 * Any SVG <path class="blob-animation"> gently undulates: its points
 * drift by a small amount and settle, on a slow loop. Unlike
 * js/blob-animation.js (which morphs between distinct blob shapes),
 * this keeps the SAME shape and only nudges its own points, so it
 * reads as a soft, organic breathing motion. Intended for the blob
 * backing on SVG upload areas.
 *
 * Requires GSAP + MorphSVGPlugin (already enqueued). Respects
 * prefers-reduced-motion. Guarded against the double main.js enqueue.
 *
 * NOTE: paths should be curve/line based (M/L/C/S/Q/H/V/Z). Arc (A)
 * commands carry boolean flags that must not be perturbed.
 */

( function () {
    function init() {
        if ( typeof gsap === 'undefined' || typeof MorphSVGPlugin === 'undefined' ) return;
        gsap.registerPlugin( MorphSVGPlugin );

        const reduce = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
        if ( reduce ) return;

        const paths = document.querySelectorAll( 'path.blob-animation' );
        if ( ! paths.length ) return;

        // Nudge each coordinate in the path data. Phase varies the
        // displacement per point so different points bulge at different
        // times → a travelling undulation rather than a uniform pulse.
        const jitter = function ( d, amp, phase ) {
            let i = -1;
            return d.replace( /-?\d*\.?\d+(?:e[-+]?\d+)?/gi, function ( n ) {
                i++;
                const off = Math.sin( i * 1.9 + phase ) * amp;
                return ( parseFloat( n ) + off ).toFixed( 3 );
            } );
        };

        paths.forEach( function ( path ) {
            if ( path.dataset.undulateBound ) return;
            path.dataset.undulateBound = '1';

            const base = path.getAttribute( 'd' );
            if ( ! base ) return;

            // Amplitude ~2% of the shape's largest dimension, so it
            // looks the same on a 65px icon or a large decoration.
            let amp = 2;
            try {
                const bb = path.getBBox();
                amp = Math.max( bb.width, bb.height ) * 0.08;
            } catch ( e ) {}

            const a = jitter( base, amp, 0 );
            const b = jitter( base, amp, 2.1 );
            const c = jitter( base, amp, 4.2 );

            gsap.timeline( { repeat: -1, defaults: { duration: 3.2, ease: 'sine.inOut' } } )
                .to( path, { morphSVG: { shape: a } } )
                .to( path, { morphSVG: { shape: b } } )
                .to( path, { morphSVG: { shape: c } } )
                .to( path, { morphSVG: { shape: base } } );
        } );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }
} )();
