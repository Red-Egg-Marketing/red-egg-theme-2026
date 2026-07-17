/**
 * Mobile Nav
 *
 * Hamburger opens the full-screen #mobile-menu overlay (scroll-locks the
 * body; the overlay itself scrolls if taller than the screen). Parents
 * with children get a toggle button that expands an accordion — multiple
 * can be open at once. Close via the X, Escape, or a link click.
 */

( function () {
    if ( window.__reMobileNavBound ) return;
    window.__reMobileNavBound = true;

    var toggleBtn = document.querySelector( '.mobile-menu-toggle' );
    var menu = document.getElementById( 'mobile-menu' );
    if ( ! toggleBtn || ! menu ) return;

    var closeBtn = menu.querySelector( '.mobile-nav__close' );

    function open() {
        menu.classList.add( 'is-open' );
        menu.setAttribute( 'aria-hidden', 'false' );
        toggleBtn.setAttribute( 'aria-expanded', 'true' );
        document.body.classList.add( 'mobile-nav-open' );
        if ( closeBtn ) closeBtn.focus();
    }

    function close() {
        menu.classList.remove( 'is-open' );
        menu.setAttribute( 'aria-hidden', 'true' );
        toggleBtn.setAttribute( 'aria-expanded', 'false' );
        document.body.classList.remove( 'mobile-nav-open' );
        toggleBtn.focus();
    }

    toggleBtn.addEventListener( 'click', function () {
        if ( menu.classList.contains( 'is-open' ) ) { close(); } else { open(); }
    } );

    if ( closeBtn ) closeBtn.addEventListener( 'click', close );

    // Accordion toggles (multiple can stay open).
    menu.querySelectorAll( '.mobile-nav__toggle' ).forEach( function ( btn ) {
        btn.addEventListener( 'click', function () {
            var item = btn.closest( '.mobile-nav__item' );
            if ( ! item ) return;
            var isOpen = item.classList.toggle( 'is-open' );
            btn.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
        } );
    } );

    // Close when a real link is tapped (let navigation proceed).
    menu.querySelectorAll( 'a[href]' ).forEach( function ( link ) {
        link.addEventListener( 'click', function () {
            if ( link.getAttribute( 'href' ) !== '#' ) close();
        } );
    } );

    // Escape closes.
    document.addEventListener( 'keydown', function ( e ) {
        if ( e.key === 'Escape' && menu.classList.contains( 'is-open' ) ) close();
    } );
} )();
