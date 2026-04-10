/**
 * Case Studies Slider – Frontend Component
 * 
 * Hydrates #CaseStudiesSliderRoot with data from the
 * red_egg_return_case_studies REST endpoint.
 * Renders a slider with left/right navigation arrows.
 */

const { render, Fragment, useState, useEffect } = wp.element;

const RootElement = document.getElementById( 'CaseStudiesSliderRoot' );

const CaseStudiesSlider = ( { postsToShow } ) => {
    const [ studies, setStudies ] = useState( [] );
    const [ currentIndex, setCurrentIndex ] = useState( 0 );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        wp.apiRequest( {
            path: '/red-egg/v2/case-studies',
        } ).then( ( data ) => {
            setStudies( data.slice( 0, postsToShow ) );
            setLoading( false );
        } ).catch( () => {
            setStudies( [] );
            setLoading( false );
        } );
    }, [] );

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

    /**
     * Determine how many slides are visible at once.
     * Desktop: 3 (left preview, center feature, right preview)
     * Mobile: 1
     */
    const getVisibleCount = () => {
        if ( typeof window !== 'undefined' && window.innerWidth >= 768 ) {
            return 3;
        }
        return 1;
    };

    const visibleCount = getVisibleCount();
    const maxIndex = Math.max( 0, studies.length - visibleCount );

    const goNext = () => {
        setCurrentIndex( ( prev ) => Math.min( prev + 1, maxIndex ) );
    };

    const goPrev = () => {
        setCurrentIndex( ( prev ) => Math.max( prev - 1, 0 ) );
    };

    /**
     * Get the currently visible slides
     */
    const visibleStudies = studies.slice( currentIndex, currentIndex + visibleCount );

    return (
        <div className="case-studies-slider__track-wrapper">
            <div className="case-studies-slider__nav">
                <button
                    className={ `case-studies-slider__arrow case-studies-slider__arrow--prev ${ currentIndex === 0 ? 'is-disabled' : '' }` }
                    onClick={ goPrev }
                    disabled={ currentIndex === 0 }
                    aria-label="Previous case study"
                >
                    <span className="arrow-icon arrow-icon--left"></span>
                </button>
                <button
                    className={ `case-studies-slider__arrow case-studies-slider__arrow--next ${ currentIndex >= maxIndex ? 'is-disabled' : '' }` }
                    onClick={ goNext }
                    disabled={ currentIndex >= maxIndex }
                    aria-label="Next case study"
                >
                    <span className="arrow-icon arrow-icon--right"></span>
                </button>
            </div>

            <div className="case-studies-slider__track">
                { visibleStudies.map( ( study, i ) => {
                    // Determine card position for styling
                    let cardClass = 'case-study-card';
                    if ( visibleCount === 3 ) {
                        if ( i === 0 ) cardClass += ' case-study-card--left';
                        if ( i === 1 ) cardClass += ' case-study-card--center';
                        if ( i === 2 ) cardClass += ' case-study-card--right';
                    }

                    return (
                        <a
                            href={ study.link || '#' }
                            className={ cardClass }
                            key={ study.id || i }
                        >
                            { study.image && (
                                <div className="case-study-card__image">
                                    <img src={ study.image } alt={ study.title || '' } loading="lazy" />
                                </div>
                            ) }
                            <div className="case-study-card__content">
                                <h3 className="case-study-card__title">{ study.title }</h3>
                                { study.excerpt && (
                                    <p className="case-study-card__excerpt">{ study.excerpt }</p>
                                ) }
                            </div>
                        </a>
                    );
                } ) }
            </div>
        </div>
    );
};

if ( RootElement ) {
    const postsToShow = parseInt( RootElement.getAttribute( 'data-posts-to-show' ) ) || 6;
    render(
        <CaseStudiesSlider postsToShow={ postsToShow } />,
        RootElement
    );
}
