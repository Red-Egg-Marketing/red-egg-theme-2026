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
                // Swiper 11's loop won't reliably generate clones for a
                // small set with slidesPerView:'auto' (loopAdditionalSlides
                // silently no-ops -- issues #7492/#8178). So instead of
                // relying on Swiper to clone, we feed it enough REAL
                // slides by repeating the studies data (see loopStudies
                // below). With plenty of real slides, native loop works
                // cleanly and there are always slides peeking both sides.
                // centeredSlidesBounds intentionally omitted (issue #6277).
                swiperInstanceRef.current = new Swiper( swiperRef.current, {
                    loop: studies.length > 2 ? true : false,
                    centeredSlides: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    speed: 500,
                    autoplay: true,
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

    // Repeat the studies so loop mode always has enough real slides to
    // fill both edges (Swiper won't clone reliably for small sets with
    // slidesPerView:'auto'). Target ~8 slides -- comfortably above the
    // ~2-up auto layout's needs. With enough real slides already, no
    // repetition happens. Keys stay unique via the repeat index.
    const MIN_LOOP_SLIDES = 2;
    let loopStudies = studies;
    if ( studies.length > 0 && studies.length < MIN_LOOP_SLIDES ) {
        loopStudies = [];
        let r = 0;
        while ( loopStudies.length < MIN_LOOP_SLIDES ) {
            studies.forEach( ( study ) => {
                loopStudies.push( { study: study, repeat: r } );
            } );
            r++;
        }
    } else {
        loopStudies = studies.map( ( study ) => ( { study: study, repeat: 0 } ) );
    }

    return (
        <div className="cs-slider__swiper swiper" ref={ swiperRef }>
            <svg viewBox="0 0 765 431" className="svg-mask" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        {/* Safari can't reliably resolve `mask: url(#svgMask)` on HTML
                            elements (userSpaceOnUse coords get resolved globally, not
                            per-element, so only some cards reveal). clipPath is resolved
                            per-element in Safari + Chrome, so we clip instead of mask.
                            MorphSVG still animates `#DripMask1 path` exactly as before. */}
                        <clipPath id="DripMask1">
                            <path d="M0 0H765V0C765 0 754.608 0 741.816 0C710.32 0 653.182 0 528 0C552.226 0 518.72 0 458.977 0C399.233 0 365.727 0 305.983 0C246.24 0 212.733 0 152.99 0C111.778 0 54.64 0 23.144 0C10.352 0 0 0 0 0V0Z
" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            <div className="swiper-wrapper">
                { loopStudies.map( ( { study, repeat }, i ) => (
                    <div className="cs-slide swiper-slide" key={ ( study.ID || i ) + '-' + repeat }>
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
