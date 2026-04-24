/**
 * Image Slider – Frontend
 *
 * Initializes Swiper on all .image-slider__swiper elements.
 * Reads config from data attributes.
 */

( function() {

    function initImageSliders() {
        var sliders = document.querySelectorAll( '.image-slider__swiper' );

        if ( sliders.length === 0 ) return;

        sliders.forEach( function( el ) {
            var slidesPerView = parseInt( el.getAttribute( 'data-slides-per-view' ) ) || 3;
            var spaceBetween = parseInt( el.getAttribute( 'data-space-between' ) ) || 20;
            var parent = el.closest( '.image-slider' );
            var prevEl = el.querySelector( '.swiper-button-prev' );
            var nextEl = el.querySelector( '.swiper-button-next' );

            new Swiper( el, {
                loop: false,
                slidesPerView: 1.15,
                spaceBetween: 10,
                speed: 500,
                breakpoints: {
                    768: {
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
        document.addEventListener( 'DOMContentLoaded', initImageSliders );
    } else {
        initImageSliders();
    }

} )();
