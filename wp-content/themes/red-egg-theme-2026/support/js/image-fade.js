/**
 * Image Fade-In – SPA-aware
 *
 * Images arriving via SPA swaps (and first load) get:
 *  - a shimmer placeholder on their .img-container / .image-cont
 *    wrapper that reserves space (aspect-ratio) while loading
 *  - a fade-in once loaded, instead of abrasive progressive paint
 *
 * Already-cached images (img.complete) are left untouched so repeat
 * visits render instantly. Images injected later by async REST
 * fetches (e.g. insights) are outside this pass.
 */

import { onPageView } from './lifecycle';

( function () {

    const WRAPPERS = '.img-container, .image-cont';

    function fadeInImages() {
        const container = document.getElementById( 'content' );
        if ( ! container ) return;

        container.querySelectorAll( 'img' ).forEach( function ( img ) {
            if ( img.dataset.fadeBound ) return;
            img.dataset.fadeBound = '1';

            if ( img.complete ) return;

            img.classList.add( 're-img-pending' );

            const wrap = img.closest( WRAPPERS );
            if ( wrap ) {
                wrap.classList.add( 're-img-placeholder' );
            }

            const done = function () {
                img.classList.remove( 're-img-pending' );
                img.classList.add( 're-img-loaded' );
                if ( wrap ) {
                    wrap.classList.remove( 're-img-placeholder' );
                }
            };

            img.addEventListener( 'load', done, { once: true } );
            img.addEventListener( 'error', done, { once: true } );
        } );
    }

    onPageView( fadeInImages );

} )();
