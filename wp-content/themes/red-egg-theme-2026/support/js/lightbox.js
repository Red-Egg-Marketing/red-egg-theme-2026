/**
 * Lightbox (GLightbox)
 *
 * Wires up any Image / Gallery block the editor opted into via the
 * "Open in lightbox" toggle (block-extensions/lightbox.js writes a
 * `has-lightbox` class on the block wrapper).
 *
 *   - .wp-block-gallery.has-lightbox  -> all its images become ONE
 *     lightbox group, so you can arrow through them as a set.
 *   - .wp-block-image.has-lightbox    -> a single-image lightbox
 *     (skipped if it lives inside a gallery that's already grouped).
 *
 * We build GLightbox's `elements` arrays in JS rather than relying on
 * the block's "link to media file" setting, so the toggle works no
 * matter how the image was inserted. The full-size URL is resolved
 * from a wrapping media link, then the largest srcset candidate, then
 * the plain src.
 *
 * SPA-aware: #content is swapped by Swup, so re-init on
 * red-egg:page-view and tear down the previous instances first.
 *
 * GLightbox loads from CDN as a global (see functions.php).
 */

( function () {
    // main.js is enqueued twice (editor + frontend handles); only bind
    // the lifecycle listener once.
    if ( window.__reLightboxBound ) return;
    window.__reLightboxBound = true;

    var IMG_EXT = /\.(jpe?g|png|gif|webp|avif|bmp|svg)(\?.*)?$/i;

    // Live instances so we can destroy them before re-initialising on
    // the next page view (otherwise stale galleries stack up).
    var instances = [];

    // Best full-size URL for an image: a wrapping image link wins, then
    // the widest srcset candidate, then whatever the browser resolved.
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
            if ( widest && widest.url ) {
                return widest.url;
            }
        }

        return img.currentSrc || img.src;
    }

    function toElement( img ) {
        return { href: bestSrc( img ), type: 'image', alt: img.alt || '' };
    }

    // Open a prepared GLightbox at a given index when its image is
    // clicked, swallowing any wrapping-link navigation.
    function bindOpeners( imgs, gl ) {
        imgs.forEach( function ( img, i ) {
            img.style.cursor = 'zoom-in';
            img.addEventListener( 'click', function ( e ) {
                e.preventDefault();
                gl.openAt( i );
            } );
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

    function init() {
        if ( typeof GLightbox === 'undefined' ) return;

        teardown();

        var opts = {
            touchNavigation: true,
            loop: true,
            zoomable: true,
            closeButton: true,
        };

        // ---- Galleries: one grouped lightbox per gallery ----
        document
            .querySelectorAll( '.wp-block-gallery.has-lightbox' )
            .forEach( function ( gallery ) {
                var imgs = Array.prototype.slice.call(
                    gallery.querySelectorAll( 'img' )
                );
                if ( ! imgs.length ) return;

                var gl = GLightbox(
                    Object.assign( {}, opts, {
                        elements: imgs.map( toElement ),
                    } )
                );
                bindOpeners( imgs, gl );
                instances.push( gl );
            } );

        // ---- Standalone images ----
        document
            .querySelectorAll( '.wp-block-image.has-lightbox' )
            .forEach( function ( fig ) {
                // Skip images already covered by a grouped gallery.
                if ( fig.closest( '.wp-block-gallery.has-lightbox' ) ) {
                    return;
                }
                var img = fig.querySelector( 'img' );
                if ( ! img ) return;

                var gl = GLightbox(
                    Object.assign( {}, opts, {
                        elements: [ toElement( img ) ],
                    } )
                );
                bindOpeners( [ img ], gl );
                instances.push( gl );
            } );
    }

    // ---- Initial run + SPA re-init ----------------------------------
    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }

    document.addEventListener( 'red-egg:page-view', init );
    document.addEventListener( 'red-egg:page-leave', teardown );
} )();
