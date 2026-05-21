/**
 * Case Studies Slider – Frontend Component
 *
 * Hydrates #CaseStudiesSliderRoot with data from the
 * red-egg/v2/case-studies REST endpoint.
 * Renders a Swiper slider with resource cards.
 *
 * Layout:
 *   - Swiper with centeredSlides, active slide wider
 *   - Bottom row: CTA button (left) + nav arrows (right)
 *   - Cards show excerpt on hover
 */

if ( typeof wp !== 'undefined' && wp.element && document.getElementById( 'CaseStudiesSliderRoot' ) ) {

const { render, Fragment, useState, useEffect, useRef } = wp.element;

const RootElement = document.getElementById( 'CaseStudiesSliderRoot' );

const CaseStudiesFrontend = ( { postsToShow, industry, buttonText, buttonUrl } ) => {
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
            // Small delay to let DOM render
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
                        nextEl: '#CaseStudiesSliderRoot .cs-slider__nav-next',
                        prevEl: '#CaseStudiesSliderRoot .cs-slider__nav-prev',
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
        <Fragment>
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

            <div className="cs-slider__bottom">
                <div className="cs-slider__cta">
                    <a className="outline-gray" href={ buttonUrl }>{ buttonText }</a>
                </div>
                <div className="cs-slider__nav">
                    <button className="cs-slider__nav-prev" aria-label="Previous slide">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 2L3.5 7L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button className="cs-slider__nav-next" aria-label="Next slide">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 2L10.5 7L5.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

if ( RootElement ) {
    const postsToShow = parseInt( RootElement.getAttribute( 'data-posts-to-show' ) ) || 15;
    const industry = RootElement.getAttribute( 'data-industry' ) || '';
    const buttonText = RootElement.getAttribute( 'data-button-text' ) || 'VIEW OUR WORK';
    const buttonUrl = RootElement.getAttribute( 'data-button-url' ) || '/work/?post-type=case-study';
    render(
        <CaseStudiesFrontend
            postsToShow={ postsToShow }
            industry={ industry }
            buttonText={ buttonText }
            buttonUrl={ buttonUrl }
        />,
        RootElement
    );
}

} // end wp check
