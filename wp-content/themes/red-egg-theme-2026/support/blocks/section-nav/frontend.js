/**
 * Section Nav – Frontend (scrollspy)
 *
 * For each .section-nav, maps its anchor buttons to their target
 * sections and marks the button whose section is currently in view
 * with .is-active. Smooth scrolling is handled globally by
 * js/smooth-scroll.js. Plain DOM; compiled into main.js.
 */

( function () {
    if ( window.__reSectionNavBound ) return;
    window.__reSectionNavBound = true;

    function initNav( nav ) {
        // Toggle .is-stuck when the bar is pinned under the header, so the
        // background only shows while stuck.
        ( function () {
            function stuckOffset() {
                var header = document.querySelector( '.site-header' );
                return header ? header.offsetHeight : 0;
            }
            var stuckTicking = false;
            function checkStuck() {
                var pinned = Math.round( nav.getBoundingClientRect().top ) <= stuckOffset() + 1;
                nav.classList.toggle( 'is-stuck', pinned );
            }
            function onStuckScroll() {
                if ( stuckTicking ) return;
                stuckTicking = true;
                window.requestAnimationFrame( function () { checkStuck(); stuckTicking = false; } );
            }
            window.addEventListener( 'scroll', onStuckScroll, { passive: true } );
            window.addEventListener( 'resize', onStuckScroll, { passive: true } );
            checkStuck();
        } )();

        var links = Array.prototype.slice.call( nav.querySelectorAll( 'a[href^="#"]' ) );
        var map = [];
        links.forEach( function ( link ) {
            var href = link.getAttribute( 'href' ) || '';
            var id = href.charAt( 0 ) === '#' ? href.slice( 1 ) : '';
            var target = id ? document.getElementById( id ) : null;
            if ( target ) {
                map.push( { btn: link.closest( '.wp-block-button' ) || link, target: target } );
            }
        } );
        if ( ! map.length ) return;

        function offsetLine() {
            var header = document.querySelector( '.site-header' );
            var hh = header ? header.offsetHeight : 0;
            var nh = nav.offsetHeight || 0;
            return hh + nh + 8;
        }

        function update() {
            var line = offsetLine();
            var current = map[ 0 ].target;
            for ( var i = 0; i < map.length; i++ ) {
                if ( map[ i ].target.getBoundingClientRect().top - line <= 0 ) {
                    current = map[ i ].target;
                }
            }
            map.forEach( function ( m ) {
                m.btn.classList.toggle( 'is-active', m.target === current );
            } );
        }

        var ticking = false;
        function onScroll() {
            if ( ticking ) return;
            ticking = true;
            window.requestAnimationFrame( function () { update(); ticking = false; } );
        }

        window.addEventListener( 'scroll', onScroll, { passive: true } );
        window.addEventListener( 'resize', onScroll, { passive: true } );
        update();
    }

    document.querySelectorAll( '.section-nav' ).forEach( initNav );
} )();
