/**
 * Awards Section – Frontend
 *
 * Initializes Swiper on all .awards-section__swiper elements.
 * Reads config from data attributes.
 */

import { onPageView } from '../../js/lifecycle';

( function() {

    function initAwardsSliders() {
        var sliders = document.querySelectorAll( '.awards-section__swiper' );

        if ( sliders.length === 0 ) return;

        sliders.forEach( function( el ) {
            if ( el.dataset.swiperInit ) return;
            el.dataset.swiperInit = '1';

            var slidesPerView = parseInt( el.getAttribute( 'data-slides-per-view' ) ) || 6;
            var spaceBetween = parseInt( el.getAttribute( 'data-space-between' ) ) || 32;
            var prevEl = el.querySelector( '.cs-slider__nav-prev' );
            var nextEl = el.querySelector( '.cs-slider__nav-next' );

            new Swiper( el, {
                loop: false,
                slidesPerView: 2,
                spaceBetween: 15,
                speed: 500,
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1080: {
                        slidesPerView: slidesPerView,
                        spaceBetween: 32,
                    },
                },
                navigation: {
                    nextEl: nextEl,
                    prevEl: prevEl,
                },
            } );
        } );
    }

    onPageView( initAwardsSliders );

} )();
