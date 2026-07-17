/**
 * Smooth Scroll – Internal Anchor Links
 *
 * Delegated click handler for any same-page anchor (<a href="#id">).
 * Smoothly scrolls to the target with an offset equal to the sticky
 * header height, updates the URL hash, and moves focus for a11y.
 * Also corrects the landing position when arriving via a
 * cross-page link like /page/#anchor.
 *
 * Opt a link out with data-no-smooth.
 * Plain DOM, compiled into main.js via front-end.js.
 */

( function () {
    // main.js is enqueued twice, so guard against binding twice.
    if ( window.__reSmoothScrollBound ) return;
    window.__reSmoothScrollBound = true;

    const headerOffset = function () {
        const header = document.querySelector( '.site-header' );
        let h = header ? header.offsetHeight : 0;
        // Also clear a sticky section-nav bar if one is present.
        const nav = document.querySelector( '.section-nav' );
        if ( nav && getComputedStyle( nav ).position === 'sticky' ) {
            h += nav.offsetHeight;
        }
        return h + 16; // small breathing gap
    };

    const scrollToTarget = function ( target, behavior ) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
        window.scrollTo( { top: top, behavior: behavior } );
    };

    const findTarget = function ( hash ) {
        let id;
        try { id = decodeURIComponent( hash.slice( 1 ) ); } catch ( e ) { id = hash.slice( 1 ); }
        if ( ! id ) return null;
        let el = document.getElementById( id );
        if ( ! el ) {
            try { el = document.querySelector( 'a[name="' + ( window.CSS && CSS.escape ? CSS.escape( id ) : id ) + '"]' ); } catch ( e ) {}
        }
        return el;
    };

    document.addEventListener( 'click', function ( e ) {
        const link = e.target.closest && e.target.closest( 'a[href]' );
        if ( ! link || link.hasAttribute( 'data-no-smooth' ) ) return;

        const href = link.getAttribute( 'href' );
        if ( ! href || href.charAt( 0 ) !== '#' || href === '#' ) return;

        const target = findTarget( href );
        if ( ! target ) return;

        e.preventDefault();
        scrollToTarget( target, 'smooth' );

        if ( history.pushState ) {
            history.pushState( null, '', href );
        }

        // Move focus to the target without an extra jump (accessibility).
        target.setAttribute( 'tabindex', '-1' );
        target.focus( { preventScroll: true } );
    } );

    // Correct the landing position when the page loads with a hash.
    window.addEventListener( 'load', function () {
        if ( location.hash.length > 1 ) {
            const target = findTarget( location.hash );
            if ( target ) {
                setTimeout( function () { scrollToTarget( target, 'auto' ); }, 0 );
            }
        }
    } );
} )();
