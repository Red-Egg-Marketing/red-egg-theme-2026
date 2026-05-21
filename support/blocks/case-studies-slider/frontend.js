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

if ( typeof wp !== 'undefined' && wp.element ) {

const { render, Fragment, useState, useEffect, useRef } = wp.element;

const SliderContent = ( { postsToShow, industry, navPrev, navNext } ) => {
    const [ studies, setStudies ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const swiperRef = useRef( null );
    const swiperInstanceRef = useRef( null );

    useEffect( () => {
        let url = '/red-egg/v2/case-studies';
        if ( industry ) {
            url += '?industry=' + industry;
        }
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
                swiperInstanceRef.current = new Swiper( swiperRef.current, {
                    loop: true,
                    centeredSlides: true,
                    slidesPerView: 1.15,
                    spaceBetween: 16,
                    speed: 500,
                    slideActiveClass: 'cs-slide--active',
                    breakpoints: {
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 24,
                        },
                        1080: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                    },
                    navigation: {
                        nextEl: navNext,
                        prevEl: navPrev,
                    },
                } );
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
            <div className="swiper-wrapper">
                { studies.map( ( study, i ) => (
                    <div className="cs-slide swiper-slide" key={ study.ID || i }>
                        <a className="cs-slide__link" href={ study.link || '#' }>
                            { study.media_url && (
                                <div className="cs-slide__image">
                                    <img
                                        src={ study.media_url }
                                        alt={ study.post_title || '' }
                                        loading="lazy"
                                    />
                                </div>
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
const bodies = document.querySelectorAll( '.case-studies-slider__body' );

bodies.forEach( ( body ) => {
    const swiperWrap = body.querySelector( '.cs-slider__swiper-wrap' );
    const navPrev = body.querySelector( '.cs-slider__nav-prev' );
    const navNext = body.querySelector( '.cs-slider__nav-next' );

    if ( swiperWrap ) {
        const postsToShow = parseInt( body.getAttribute( 'data-posts-to-show' ) ) || 15;
        const industry = body.getAttribute( 'data-industry' ) || '';

        render(
            <SliderContent
                postsToShow={ postsToShow }
                industry={ industry }
                navPrev={ navPrev }
                navNext={ navNext }
            />,
            swiperWrap
        );
    }
} );

} // end wp check
