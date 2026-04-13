/**
 * Case Studies Slider – Frontend Component
 *
 * Hydrates #CaseStudiesSliderRoot with data from the
 * red-egg/v2/case-studies REST endpoint.
 * Renders a Swiper slider with resource cards.
 */

const { render, Fragment, useState, useEffect } = wp.element;
import Swiper from 'swiper/bundle';

const RootElement = document.getElementById( 'CaseStudiesSliderRoot' );

const CaseStudiesFrontend = ( { postsToShow, industry } ) => {
    const [ studies, setStudies ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        let url = '/red-egg/v2/case-studies?ppp=' + postsToShow;
        if ( industry ) {
            url += '&industry=' + industry;
        }
        wp.apiRequest( { path: url } ).then( ( data ) => {
            setStudies( data );
            setLoading( false );
        } ).catch( () => {
            setStudies( [] );
            setLoading( false );
        } );
    }, [] );

    // Initialize Swiper after studies load
    useEffect( () => {
        if ( ! loading && studies.length > 0 ) {
            new Swiper( '#CaseStudiesSliderRoot', {
                loop: false,
                slidesPerView: 1.25,
                autoplay: false,
                effect: 'slide',
                spaceBetween: 15,
                speed: 500,
                breakpoints: {
                    768: {
                        slidesPerView: 3.25,
                        spaceBetween: 20,
                    },
                },
                navigation: {
                    nextEl: '#CaseStudiesSliderRoot .swiper-button-next',
                    prevEl: '#CaseStudiesSliderRoot .swiper-button-prev',
                },
            } );
        }
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
            <div className="swiper-wrapper">
                { studies.map( ( study, i ) => (
                    <div className="resource-card swiper-slide" key={ study.id || i }>
                        <div className="resource-extra">
                            <a className="resource-wrap" href={ study.link || '#' }>
                                <div className="cont-wrap">
                                    { ( study.featured_image || study.image ) && (
                                        <div className="image-cont">
                                            <img
                                                className="resource-img"
                                                src={ study.featured_image || study.image }
                                                alt={ study.title || '' }
                                                loading="lazy"
                                            />
                                        </div>
                                    ) }
                                    <div className="content">
                                        <h3 className="resource-title">{ study.title }</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                ) ) }
            </div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </Fragment>
    );
};

if ( RootElement ) {
    const postsToShow = parseInt( RootElement.getAttribute( 'data-posts-to-show' ) ) || 15;
    const industry = RootElement.getAttribute( 'data-industry' ) || '';
    render(
        <CaseStudiesFrontend postsToShow={ postsToShow } industry={ industry } />,
        RootElement
    );
}
