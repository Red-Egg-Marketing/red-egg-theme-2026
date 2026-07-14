/**
 * Blob Undulate – gentle shape animation
 *
 * Animates any visible <path class="blob-animation"> in an inline SVG.
 *
 * Two modes:
 *  1. Author-drawn phases (preferred): add hidden target shapes in the
 *     SAME <svg>, e.g.
 *         <path class="blob-phase-1" d="…"/>
 *         <path class="blob-phase-2" d="…"/>
 *     The visible path morphs through them (in numeric order) and back
 *     to its original shape, on a loop. Phase paths are hidden via CSS
 *     (_blob-animation.scss) so they never render.
 *  2. Fallback: if no phase paths are found, the path gently wobbles
 *     its own points (auto-jitter).
 *
 * Requires GSAP + MorphSVGPlugin (already enqueued). Respects
 * prefers-reduced-motion. Guarded against the double main.js enqueue.
 *
 * NOTE: shapes should be curve/line based (M/L/C/S/Q/H/V/Z) — arc (A)
 * commands carry boolean flags that must not be perturbed by jitter.
 */

( function () {

    function phaseNum( el ) {
        const m = ( el.getAttribute( 'class' ) || '' ).match( /blob-phase-(\d+)/ );
        return m ? parseInt( m[ 1 ], 10 ) : 0;
    }

    // Nudge each coordinate; phase varies displacement per point so the
    // bulge travels around the shape rather than pulsing uniformly.
    function jitter( d, amp, phase ) {
        let i = -1;
        return d.replace( /-?\d*\.?\d+(?:e[-+]?\d+)?/gi, function ( n ) {
            i++;
            const off = Math.sin( i * 1.9 + phase ) * amp;
            return ( parseFloat( n ) + off ).toFixed( 3 );
        } );
    }

    function init() {
        if ( typeof gsap === 'undefined' || typeof MorphSVGPlugin === 'undefined' ) return;
        gsap.registerPlugin( MorphSVGPlugin );

        const reduce = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
        if ( reduce ) return;

        const paths = document.querySelectorAll( 'path.blob-animation' );
        if ( ! paths.length ) return;

        paths.forEach( function ( path ) {
            if ( path.dataset.undulateBound ) return;
            path.dataset.undulateBound = '1';

            const base = path.getAttribute( 'd' );
            if ( ! base ) return;

            // Collect author-drawn phase shapes from the same SVG.
            let phases = [];
            const svg = path.closest( 'svg' );
            if ( svg ) {
                const els = Array.prototype.slice.call( svg.querySelectorAll( '[class*="blob-phase-"]' ) );
                els.sort( function ( a, b ) { return phaseNum( a ) - phaseNum( b ); } );
                phases = els.map( function ( el ) { return el.getAttribute( 'd' ); } ).filter( Boolean );
            }

            const tl = gsap.timeline( { repeat: -1, defaults: { duration: 3.2, ease: 'sine.inOut' } } );

            if ( phases.length ) {
                // Morph through each drawn phase, then back to the original.
                phases.forEach( function ( d ) {
                    tl.to( path, { morphSVG: { shape: d } } );
                } );
                tl.to( path, { morphSVG: { shape: base } } );
            } else {
                // Fallback: gentle self-jitter (~2% of the shape size).
                let amp = 2;
                try {
                    const bb = path.getBBox();
                    amp = Math.max( bb.width, bb.height ) * 0.08;
                } catch ( e ) {}

                tl.to( path, { morphSVG: { shape: jitter( base, amp, 0 ) } } )
                  .to( path, { morphSVG: { shape: jitter( base, amp, 2.1 ) } } )
                  .to( path, { morphSVG: { shape: jitter( base, amp, 4.2 ) } } )
                  .to( path, { morphSVG: { shape: base } } );
            }
        } );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }
} )();
