/**
 * Lightbox (GLightbox)
 *
 * Wires up any image the editor opted into. Two markers are supported:
 *
 *   Core blocks (block-extensions/lightbox.js writes `has-lightbox`):
 *     .wp-block-gallery.has-lightbox -> grouped set
 *     .wp-block-image.has-lightbox   -> single image
 *
 *   Custom blocks (save markup adds a data attribute on a container):
 *     [data-re-lightbox="group"]     -> all its images become one set
 *                                       (awards slider, image slider)
 *     [data-re-lightbox="single"]    -> each image opens on its own
 *                                       (image-text, media-content)
 *
 * Uses click DELEGATION rather than per-image binding, so it doesn't
 * matter when Swiper injects its loop clones or when a slider re-inits
 * -- a click on any image (clone included) resolves to the right slide.
 * GLightbox instances are built lazily on first click and cached on
 * their container, then torn down on Swup page-leave.
 *
 * Rules:
 *   - Clones (.swiper-slide-duplicate) are excluded from the canonical
 *     element list but still clickable; the click maps back by URL.
 *   - Images wrapped in a real navigation link (an <a> whose href is
 *     NOT an image file, e.g. an award linking to its announcement)
 *     are left alone -- the link wins, no lightbox.
 *
 * Full-size URL resolves from a wrapping media link, then the widest
 * srcset candidate, then the plain src. GLightbox loads from CDN as a
 * global (see functions.php).
 */

( function () {
    if ( window.__reLightboxBound ) return;
    window.__reLightboxBound = true;

    var IMG_EXT = /\.(jpe?g|png|gif|webp|avif|bmp|svg)(\?.*)?$/i;
    var GROUP_SEL = '[data-re-lightbox="group"], .wp-block-gallery.has-lightbox';
    var SINGLE_SEL = '[data-re-lightbox="single"], .wp-block-image.has-lightbox';

    var OPTS = {
        touchNavigation: true,
        loop: true,
        zoomable: true,
        closeButton: true,
    };

    // Live instances, torn down before the next page renders.
    var instances = [];

    // A real navigation link (not an image file) — leave it alone.
    function isNavLink( img ) {
        var a = img.closest( 'a' );
        var href = a && a.getAttribute( 'href' );
        return !! ( href && ! IMG_EXT.test( href ) );
    }

    function bestSrc( img ) {
        var a = img.closest( 'a' );
        if ( a && a.href && IMG_EXT.test( a.href ) ) {
            return a.href;
        }
        if ( img.srcset ) {
            var widest = img.srcset
                .split( ',' )
                .map( function ( part ) {
                    var bits = part.trim().split( /\s+/ );
                    return {
                        url: bits[ 0 ],
                        w:
                            bits[ 1 ] && bits[ 1 ].slice( -1 ) === 'w'
                                ? parseInt( bits[ 1 ], 10 )
                                : 0,
                    };
                } )
                .sort( function ( x, y ) {
                    return y.w - x.w;
                } )[ 0 ];
            if ( widest && widest.url ) return widest.url;
        }
        return img.currentSrc || img.src;
    }

    // Canonical images for a group: DOM order, minus Swiper clones and
    // minus anything that's really a navigation link.
    function groupImages( container ) {
        return Array.prototype.slice
            .call( container.querySelectorAll( 'img' ) )
            .filter( function ( img ) {
                return (
                    ! img.closest( '.swiper-slide-duplicate' ) &&
                    ! isNavLink( img )
                );
            } );
    }

    function elementsFor( imgs ) {
        return imgs.map( function ( img ) {
            return { href: bestSrc( img ), type: 'image', alt: img.alt || '' };
        } );
    }

    // Lazily build + cache a grouped lightbox on its container.
    function groupInstance( container ) {
        if ( container.__reGL ) return container.__reGL;
        var imgs = groupImages( container );
        if ( ! imgs.length ) return null;
        var elements = elementsFor( imgs );
        var gl = GLightbox( Object.assign( {}, OPTS, { elements: elements } ) );
        container.__reGL = gl;
        container.__reHrefs = elements.map( function ( el ) {
            return el.href;
        } );
        instances.push( gl );
        return gl;
    }

    // Lazily build + cache a single-image lightbox on the image itself.
    function singleInstance( img ) {
        if ( img.__reGL ) return img.__reGL;
        var gl = GLightbox(
            Object.assign( {}, OPTS, { elements: elementsFor( [ img ] ) } )
        );
        img.__reGL = gl;
        instances.push( gl );
        return gl;
    }

    // ---- Delegated click --------------------------------------------
    document.addEventListener(
        'click',
        function ( e ) {
            if ( typeof GLightbox === 'undefined' ) return;

            var img = e.target.closest && e.target.closest( 'img' );
            if ( ! img || isNavLink( img ) ) return;

            var group = img.closest( GROUP_SEL );
            if ( group ) {
                var gl = groupInstance( group );
                if ( ! gl ) return;
                e.preventDefault();
                var href = bestSrc( img );
                var idx = ( group.__reHrefs || [] ).indexOf( href );
                gl.openAt( idx < 0 ? 0 : idx );
                return;
            }

            var single = img.closest( SINGLE_SEL );
            if ( single ) {
                e.preventDefault();
                singleInstance( img ).openAt( 0 );
            }
        },
        false
    );

    // ---- Cursor affordance (respects nav links) ---------------------
    function markCursors() {
        document
            .querySelectorAll(
                GROUP_SEL.split( ', ' ).join( ' img, ' ) +
                    ' img, ' +
                    SINGLE_SEL.split( ', ' ).join( ' img, ' ) +
                    ' img'
            )
            .forEach( function ( img ) {
                if ( ! isNavLink( img ) ) img.style.cursor = 'zoom-in';
            } );
    }

    function teardown() {
        instances.forEach( function ( gl ) {
            try {
                gl.destroy();
            } catch ( e ) {}
        } );
        instances = [];
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', markCursors );
    } else {
        markCursors();
    }

    document.addEventListener( 'red-egg:page-view', markCursors );
    document.addEventListener( 'red-egg:page-leave', teardown );
} )();
