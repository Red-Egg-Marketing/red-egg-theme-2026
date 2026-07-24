/**
 * mediaSizes helper
 *
 * Shared logic for serving responsive, non-full-size images from block
 * attributes. Designers upload huge originals; these helpers pull our
 * registered intermediate sizes (see inc/media.php) so blocks emit a
 * real srcset instead of the full-size file.
 *
 * Usage in edit.js (on media select):
 *   import { pickSizes } from '../../components/mediaSizes.js';
 *   const picked = pickSizes( img, [ 'hero-landscape-large', 'hero-landscape-medium', 'hero-landscape', 'large' ] );
 *   setAttributes( { media: { id: img.id, alt: img.alt, source: picked.source, srcset: picked.srcset } } );
 *
 * Usage in save.js:
 *   import { buildSrcSet } from '../../components/mediaSizes.js';
 *   const srcSet = buildSrcSet( media.srcset );
 *   <img src={ media.source } srcSet={ srcSet } sizes={ sizes } />
 *
 * Notes:
 * - A registered size only exists on img.sizes once the image has been
 *   (re)generated for it. Until then we degrade to WP defaults, then to
 *   the full url as a last resort -- never breaking, just less optimal.
 * - srcset entries are de-duplicated by width so the fallback-to-full
 *   case doesn't emit the same width twice.
 */

/**
 * Extract a source URL + a de-duplicated srcset array from a WP media
 * object, preferring the given registered size names in order.
 *
 * @param {Object} img         WP media object (from MediaUpload onSelect)
 * @param {Array}  sizeNames   Registered size slugs, largest first,
 *                             ending with WP defaults / 'full' as needed.
 * @return {Object} { source, srcset: [ { url, width } ] }
 */
export function pickSizes( img, sizeNames ) {
    if ( ! img ) {
        return { source: '', srcset: [] };
    }

    const seenWidths = {};
    const srcset = [];
    let fullFallback = null;

    ( sizeNames || [] ).forEach( ( name ) => {
        if ( name === 'full' ) {
            // Hold the full-size as a fallback only; don't add it
            // alongside real registered sizes (it would become the
            // largest srcset entry and let browsers pull the huge
            // original on big screens -- exactly what we're avoiding).
            if ( img.url ) {
                fullFallback = { url: img.url, width: img.width || 0 };
            }
            return;
        }
        if ( img.sizes && img.sizes[ name ] ) {
            const url = img.sizes[ name ].url;
            const width = img.sizes[ name ].width || 0;
            if ( url && width && ! seenWidths[ width ] ) {
                seenWidths[ width ] = true;
                srcset.push( { url: url, width: width } );
            }
        }
    } );

    // Only use the full-size if NO registered size matched (image not
    // regenerated yet). Never mix it in with real sizes.
    if ( srcset.length === 0 ) {
        if ( fullFallback && fullFallback.width ) {
            srcset.push( fullFallback );
        } else if ( img.url ) {
            srcset.push( { url: img.url, width: img.width || 0 } );
        }
    }

    // Source = largest available (last in the width-sorted set), so the
    // no-srcset case still gets the biggest sensible file.
    const sorted = srcset.slice().sort( ( a, b ) => a.width - b.width );
    const source = sorted.length ? sorted[ sorted.length - 1 ].url : ( img.url || '' );

    return { source: source, srcset: srcset };
}

/**
 * Build a srcset attribute string from a stored srcset array.
 * Skips entries without a real width. Returns '' if none qualify.
 *
 * @param {Array} srcset  [ { url, width } ]
 * @return {string} "url1 400w, url2 800w"
 */
export function buildSrcSet( srcset ) {
    if ( ! Array.isArray( srcset ) ) {
        return '';
    }
    return srcset
        .filter( ( s ) => s && s.url && s.width )
        .sort( ( a, b ) => a.width - b.width )
        .map( ( s ) => s.url + ' ' + s.width + 'w' )
        .join( ', ' );
}
