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
            var prevEl = parent.querySelector( '.cs-slider__nav' );
            var nextEl = parent.querySelector( '.cs-slider__nav-next' );

            new Swiper( el, {
                loop: true,
                centeredSlides: true,
                slidesPerView: 1,
                spaceBetween: 20,
                speed: 500,
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
        } );
    }

    onPageView( initImageSliders );

} )();
