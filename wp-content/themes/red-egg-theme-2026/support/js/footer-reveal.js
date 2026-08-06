/**
 * Footer Reveal (scroll-over)
 *
 * Pins the site footer to the bottom of the viewport BEHIND the page
 * content so it reveals as you scroll to the end of a page (see the
 * "Footer Reveal" section in _footer.scss for the stacking rules).
 *
 * This file owns the two dynamic pieces CSS can't do on its own:
 *
 *   1. The scroll room. The pinned footer is out of flow, so nothing
 *      pushes the document tall enough to scroll past the content and
 *      expose it. We add a bottom padding equal to the footer's height
 *      on #page (the persistent wrapper that Swup never swaps), which
 *      extends the scrollable area by exactly one footer's worth.
 *
 *   2. The safety gate. A footer taller than the viewport can't be
 *      revealed cleanly (its top would sit permanently off-screen), so
 *      we only arm the effect when it fits. body.has-reveal-footer is
 *      the switch the CSS keys off of.
 *
 * Re-measured on load, on resize (debounced), after webfonts settle,
 * and after each Swup page view (footer height is stable, but the
 * class/padding are cheap to re-assert and this keeps us correct if a
 * template ever changes the footer).
 *
 * Plain DOM, compiled into main.js via front-end.js.
 */

( function () {
    // main.js is enqueued twice (editor + frontend handles); guard so
    // we only bind listeners once.
    if ( window.__reFooterRevealBound ) return;
    window.__reFooterRevealBound = true;

    var TOLERANCE = 4; // px slack when comparing footer vs viewport

    function measure() {
        var page   = document.getElementById( 'page' );
        var footer = document.querySelector( '.site-footer' );
        if ( ! page || ! footer ) return;

        var footerH   = footer.offsetHeight;
        var viewportH = window.innerHeight;

        // Bail out (normal in-flow footer) if it can't fit on screen --
        // revealing a footer taller than the viewport would strand its
        // top edge permanently above the fold.
        if ( ! footerH || footerH > viewportH - TOLERANCE ) {
            document.body.classList.remove( 'has-reveal-footer' );
            page.style.paddingBottom = '';
            return;
        }

        document.body.classList.add( 'has-reveal-footer' );
        page.style.paddingBottom = footerH + 'px';
    }

    // Measure after layout has settled for the current frame.
    function scheduleMeasure() {
        window.requestAnimationFrame( measure );
    }

    // ---- Initial run -------------------------------------------------
    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', scheduleMeasure );
    } else {
        scheduleMeasure();
    }

    // Late layout shifts: images in the footer, full window load.
    window.addEventListener( 'load', scheduleMeasure );

    // Webfonts (Poppins/Figtree) change the footer's height once they
    // swap in; re-measure when they're ready.
    if ( document.fonts && document.fonts.ready ) {
        document.fonts.ready.then( scheduleMeasure );
    }

    // ---- Resize (debounced) -----------------------------------------
    var resizeTimer = null;
    window.addEventListener( 'resize', function () {
        window.clearTimeout( resizeTimer );
        resizeTimer = window.setTimeout( scheduleMeasure, 150 );
    } );

    // ---- Swup page view ---------------------------------------------
    // #page (and the footer) persist across swaps, so the padding
    // survives -- but re-assert cheaply in case a template changes the
    // footer, and to recover if anything cleared it.
    document.addEventListener( 'red-egg:page-view', scheduleMeasure );
} )();
