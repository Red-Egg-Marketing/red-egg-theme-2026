/**
 * Awards Section – Frontend
 *
 * Initializes Swiper on all .awards-section__swiper elements.
 * Reads config from data attributes.
 */

( function() {

    function initAwardsSliders() {
        var sliders = document.querySelectorAll( '.awards-section__swiper' );

        if ( sliders.length === 0 ) return;

        sliders.forEach( function( el ) {
            var slidesPerView = parseInt( el.getAttribute( 'data-slides-per-view' ) ) || 6;
            var spaceBetween = parseInt( el.getAttribute( 'data-space-between' ) ) || 30;
            var prevEl = el.querySelector( '.swiper-button-prev' );
            var nextEl = el.querySelector( '.swiper-button-next' );

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

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', initAwardsSliders );
    } else {
        initAwardsSliders();
    }

} )();
