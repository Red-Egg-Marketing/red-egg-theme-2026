/**
 * Reveal Card – Frontend
 *
 * 1. Click the toggle button to flip the card (front <-> back).
 * 2. When the back content is taller than the card, it auto-scrolls
 *    vertically (gentle yoyo), pausing on hover or touch.
 *
 * No React — plain DOM. Compiled into main.js via front-end.js.
 */

const SPEED = 26;       // px per second
const HOLD = 1400;      // pause (ms) at the top/bottom of a pass

function buildAutoScroll( card ) {
    const viewport = card.querySelector( '.reveal-card__back-scroll' );
    const inner = card.querySelector( '.reveal-card__back-inner' );
    if ( ! viewport || ! inner ) {
        return null;
    }

    let raf = null;
    let paused = false;
    let dir = 1;
    let pos = 0;
    let last = 0;
    let holdUntil = 0;

    const overflow = () => inner.scrollHeight - viewport.clientHeight;

    const step = ( ts ) => {
        if ( ! last ) {
            last = ts;
        }
        const dt = ( ts - last ) / 1000;
        last = ts;

        const max = overflow();
        if ( max <= 0 ) {
            inner.style.transform = 'translateY(0)';
            raf = null;
            return;
        }

        if ( ! paused && ts >= holdUntil ) {
            pos += dir * SPEED * dt;
            if ( pos >= max ) {
                pos = max;
                dir = -1;
                holdUntil = ts + HOLD;
            } else if ( pos <= 0 ) {
                pos = 0;
                dir = 1;
                holdUntil = ts + HOLD;
            }
            inner.style.transform = 'translateY(' + ( -pos ) + 'px)';
        }

        raf = requestAnimationFrame( step );
    };

    const start = () => {
        stop();
        last = 0;
        pos = 0;
        dir = 1;
        holdUntil = performance.now() + HOLD;
        inner.style.transform = 'translateY(0)';
        raf = requestAnimationFrame( step );
    };

    const stop = () => {
        if ( raf ) {
            cancelAnimationFrame( raf );
        }
        raf = null;
    };

    viewport.addEventListener( 'mouseenter', () => { paused = true; } );
    viewport.addEventListener( 'mouseleave', () => { paused = false; } );
    viewport.addEventListener( 'touchstart', () => { paused = true; }, { passive: true } );
    viewport.addEventListener( 'touchend', () => { paused = false; }, { passive: true } );

    return { start, stop };
}

function initRevealCard( card ) {
    const btn = card.querySelector( '.reveal-card__toggle' );
    if ( ! btn ) {
        return;
    }

    const scroller = buildAutoScroll( card );

    btn.addEventListener( 'click', () => {
        const flipped = card.classList.toggle( 'is-flipped' );
        btn.setAttribute( 'aria-expanded', flipped ? 'true' : 'false' );
        btn.setAttribute( 'aria-label', flipped ? 'Close details' : 'Show details' );

        if ( ! scroller ) {
            return;
        }
        if ( flipped ) {
            // Wait for the flip transition so heights measure correctly.
            window.setTimeout( () => scroller.start(), 650 );
        } else {
            scroller.stop();
        }
    } );
}

function initRevealCards() {
    document.querySelectorAll( '.reveal-card' ).forEach( initRevealCard );
}

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', initRevealCards );
} else {
    initRevealCards();
}
