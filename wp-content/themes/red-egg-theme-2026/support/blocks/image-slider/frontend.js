/**
 * Image Slider – Frontend
 *
 * Initializes Swiper on all .image-slider__swiper elements.
 * Uses centeredSlides with active slide emphasis
 * (matching case-studies-slider behavior).
 */

import { onPageView } from '../../js/lifecycle';

( function() {

    function initImageSliders() {
        var sliders = document.querySelectorAll( '.image-slider__swiper' );

        if ( sliders.length === 0 ) return;

        sliders.forEach( function( el ) {
            if ( el.dataset.swiperInit ) return;
            el.dataset.swiperInit = '1';

            var spaceBetween = parseInt( el.getAttribute( 'data-space-between' ) ) || 20;
            var parent = el.closest( '.image-slider' );
            var prevEl = parent.querySelector( '.cs-slider__nav-prev' );
            var nextEl = parent.querySelector( '.cs-slider__nav-next' );

            // Swiper 11 won't reliably clone slides for a small set with
            // slidesPerView:'auto' (loopAdditionalSlides no-ops — issues
            // #7492/#8178). So, matching case-studies-slider, we feed it
            // enough REAL slides by repeating the originals up to a floor.
            // With plenty of real slides, native loop works cleanly and
            // slides always peek on both edges. (These are static save
            // markup, so we clone DOM nodes rather than a data array.)
            // A single image gets no loop and no duplication.
            var wrapper = el.querySelector( '.swiper-wrapper' );
            var slides = wrapper ? [].slice.call( wrapper.children ) : [];
            var originalCount = slides.length;
            var canLoop = originalCount > 1;
            var MIN_LOOP_SLIDES = 8;
            if ( wrapper && canLoop && originalCount < MIN_LOOP_SLIDES ) {
                var i = 0;
                while ( wrapper.children.length < MIN_LOOP_SLIDES ) {
                    wrapper.appendChild( slides[ i % originalCount ].cloneNode( true ) );
                    i++;
                }
            }

            var swiper = new Swiper( el, {
                loop: canLoop,
                centeredSlides: true,
                slidesPerView: 1,
                spaceBetween: 20,
                speed: 700,
                slideActiveClass: 'image-slider__slide--active',
                breakpoints: {
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: spaceBetween,
                    },
                },
                navigation: {
                    nextEl: nextEl,
                    prevEl: prevEl,
                },
            } );

            // centeredSlides measures widths at init — but the active
            // slide is wider (its width comes from the active class
            // Swiper applies) and its image is lazy-loaded, so the first
            // measurement is stale and the slider centers off (next peeks
            // more than prev, then drifts). Re-measure on the next frame
            // (active class now applied) and again as each lazy image
            // finishes loading, re-snapping to the active slide so it
            // stays centered.
            var recenter = function() {
                if ( ! swiper || swiper.destroyed ) return;
                swiper.update();
                swiper.slideToLoop( swiper.realIndex, 0, false );
            };
            requestAnimationFrame( recenter );
            el.querySelectorAll( 'img' ).forEach( function( img ) {
                if ( ! img.complete ) {
                    img.addEventListener( 'load', recenter, { once: true } );
                }
            } );
        } );
    }

    onPageView( initImageSliders );

} )();
