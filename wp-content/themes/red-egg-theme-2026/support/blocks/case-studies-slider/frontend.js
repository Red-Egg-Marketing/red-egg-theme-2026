/**
 * Case Studies Slider – Frontend
 *
 * Finds .case-studies-slider__body elements, reads data attributes,
 * fetches case studies, injects Swiper into .cs-slider__swiper-wrap,
 * and wires up the nav buttons in .cs-slider__nav.
 *
 * Slides bleed outside the container (overflow visible on wrapper,
 * hidden on the swiper itself handled via CSS clip-path or not).
 */

import { onPageView } from '../../js/lifecycle';

if ( typeof wp !== 'undefined' && wp.element ) {

const { render, Fragment, useState, useEffect, useRef } = wp.element;

const SliderContent = ( { postsToShow, industry, service, navPrev, navNext } ) => {
    const [ studies, setStudies ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const swiperRef = useRef( null );
    const swiperInstanceRef = useRef( null );

    useEffect( () => {
        let url = '/red-egg/v2/case-studies';
        const params = [];
        if ( industry ) params.push( 'industry=' + industry );
        if ( service ) params.push( 'service=' + service );
        if ( params.length ) url += '?' + params.join( '&' );
        wp.apiRequest( { path: url } ).then( ( data ) => {
            let posts = [];
            if ( data && data[0] && data[0].resources ) {
                posts = data[0].resources;
            }
            if ( postsToShow > 0 ) {
                posts = posts.slice( 0, postsToShow );
            }
            setStudies( posts );
            setLoading( false );
        } ).catch( () => {
            setStudies( [] );
            setLoading( false );
        } );
    }, [] );

    // Initialize Swiper after studies load
    useEffect( () => {
        if ( ! loading && studies.length > 0 && swiperRef.current ) {
            setTimeout( () => {
                // Swiper's loop mode needs at least ~2x slidesPerView
                // worth of slides to clone a clean loop. With too few
                // (and centeredSlides + slidesPerView:auto), the last
                // slide only partially advances. So only loop when
                // there's enough material; otherwise disable loop and
                // use rewind so the arrows still cycle front-to-back.
                // Desktop shows ~2 auto slides, so 5+ is a safe floor.
                const enoughToLoop = studies.length >= 5;

                swiperInstanceRef.current = new Swiper( swiperRef.current, {
                    loop: enoughToLoop,
                    rewind: ! enoughToLoop,
                    centeredSlides: true,
                    centeredSlidesBounds: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    speed: 500,
                    slideActiveClass: 'cs-slide--active',
                    breakpoints: {
                        768: {
                            slidesPerView: 'auto',
                            spaceBetween: 24,
                        },
                        1080: {
                            slidesPerView: 'auto',
                            spaceBetween: 32,
                        },
                    },
                    navigation: {
                        nextEl: navNext,
                        prevEl: navPrev,
                    },
                } );
                document.dispatchEvent( new CustomEvent( 'csSliderReady' ) );
            }, 50 );
        }

        return () => {
            if ( swiperInstanceRef.current ) {
                swiperInstanceRef.current.destroy( true, true );
            }
        };
    }, [ loading, studies ] );

    if ( loading ) {
        return (
            <div className="case-studies-slider__loading">
                <p>Loading case studies…</p>
            </div>
        );
    }

    if ( studies.length === 0 ) {
        return null;
    }

    return (
        <div className="cs-slider__swiper swiper" ref={ swiperRef }>
            <svg viewBox="0 0 765 431" className="svg-mask" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <mask id="DripMask1">
                            <path d="M0 0H765V0C765 0 754.608 0 741.816 0C710.32 0 653.182 0 528 0C552.226 0 518.72 0 458.977 0C399.233 0 365.727 0 305.983 0C246.24 0 212.733 0 152.99 0C111.778 0 54.64 0 23.144 0C10.352 0 0 0 0 0V0Z
" fill="white" />
                        </mask>
                    </defs>
                </svg>
            <div className="swiper-wrapper">
                { studies.map( ( study, i ) => (
                    <div className="cs-slide swiper-slide" key={ study.ID || i }>
                        <a className="cs-slide__link" href={ study.link || '#' }>
                            { study.media_url && (
                                <Fragment>
                                    <div className="cs-slide__image mask-enabled">
                                        <img
                                            src={ study.media_url }
                                            alt={ study.post_title || '' }
                                            loading="lazy"
                                        />
                                    </div>
                                </Fragment>
                            ) }
                            <div className="cs-slide__content">
                                <h3 className="cs-slide__title">{ study.post_title || study.title }</h3>
                                { study.post_excerpt && (
                                    <p className="cs-slide__excerpt">{ study.post_excerpt }</p>
                                ) }
                            </div>
                        </a>
                    </div>
                ) ) }
            </div>
        </div>
    );
};

// Find all slider body elements and hydrate
function initCaseStudiesSliders() {
const bodies = document.querySelectorAll( '.case-studies-slider__body' );

bodies.forEach( ( body ) => {
    if ( body.dataset.reMounted ) return;
    body.dataset.reMounted = '1';

    const swiperWrap = body.querySelector( '.cs-slider__swiper-wrap' );
    const navPrev = body.querySelector( '.cs-slider__nav-prev' );
    const navNext = body.querySelector( '.cs-slider__nav-next' );

    if ( swiperWrap ) {
        const postsToShow = parseInt( body.getAttribute( 'data-posts-to-show' ) ) || 15;
        const industry = body.getAttribute( 'data-industry' ) || '';
        const service = body.getAttribute( 'data-service' ) || '';

        render(
            <SliderContent
                postsToShow={ postsToShow }
                industry={ industry }
                service={ service }
                navPrev={ navPrev }
                navNext={ navNext }
            />,
            swiperWrap
        );
    }
} );
}

onPageView( initCaseStudiesSliders );

} // end wp check
