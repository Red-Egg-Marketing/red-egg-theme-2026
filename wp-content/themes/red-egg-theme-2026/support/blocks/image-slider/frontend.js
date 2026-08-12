/**
 * Image Slider – Frontend
 *
 * Initializes Swiper on all .image-slider__swiper elements, mirroring
 * case-studies-slider's setup: centeredSlides, slidesPerView:'auto',
 * looped, with the active slide emphasized via width + opacity in CSS.
 *
 * The only intentional difference from case-studies is the slide
 * duplication below: case-studies fills the loop naturally with ~15
 * fetched posts, whereas an image gallery is usually just a handful,
 * so we repeat the real slides up to a floor to give the loop enough
 * slides to peek on both edges (the same technique case-studies
 * documents for small sets).
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
            // #7492/#8178). Feed it enough REAL slides by repeating the
            // originals up to a floor so the loop always peeks both edges.
            var wrapper = el.querySelector( '.swiper-wrapper' );
            var slides = wrapper ? [].slice.call( wrapper.children ) : [];
            var originalCount = slides.length;
            var MIN_LOOP_SLIDES = 8;
            if ( wrapper && originalCount > 1 && originalCount < MIN_LOOP_SLIDES ) {
                var i = 0;
                while ( wrapper.children.length < MIN_LOOP_SLIDES ) {
                    wrapper.appendChild( slides[ i % originalCount ].cloneNode( true ) );
                    i++;
                }
            }

            // Mirror case-studies-slider: let layout settle, then init
            // with the same options.
            setTimeout( function() {
                var swiper = new Swiper( el, {
                    loop: originalCount > 1,
                    centeredSlides: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    speed: 500,
                    autoplay: true,
                    slideActiveClass: 'image-slider__slide--active',
                    breakpoints: {
                        768: {
                            slidesPerView: 'auto',
                            spaceBetween: spaceBetween,
                        },
                        1080: {
                            slidesPerView: 'auto',
                            spaceBetween: spaceBetween,
                        },
                    },
                    navigation: {
                        nextEl: nextEl,
                        prevEl: prevEl,
                    },
                } );

                // With loop + centeredSlides + uneven widths, Swiper parks
                // the wrapper one snap off from the slide that actually
                // carries the active class (and thus the wider width) — so
                // the wide slide sits left of centre and the next slides
                // bleed in. Snap directly to the active-class element (a
                // real slide, not a loop clone) so the wide slide is dead
                // centre. Load only, zero duration = no visible motion.
                requestAnimationFrame( function() {
                    if ( ! swiper || swiper.destroyed ) return;
                    swiper.update();
                    var active = el.querySelector( '.swiper-slide.image-slider__slide--active:not(.swiper-slide-duplicate)' )
                              || el.querySelector( '.swiper-slide.image-slider__slide--active' );
                    var idx = active ? swiper.slides.indexOf( active ) : swiper.activeIndex;
                    if ( idx > -1 ) swiper.slideTo( idx, 0, false );
                } );
            }, 50 );
        } );
    }

    onPageView( initImageSliders );

} )();
