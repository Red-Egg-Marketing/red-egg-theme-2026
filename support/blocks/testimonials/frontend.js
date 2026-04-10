/**
 * Testimonials Block – Frontend Component
 * 
 * Hydrates #TestimonialsSliderRoot with data from
 * the red_egg_return_reviews REST endpoint.
 * Displays review cards in a paginated slider.
 */

const { render, Fragment, useState, useEffect } = wp.element;

const RootElement = document.getElementById( 'TestimonialsSliderRoot' );

const Stars = () => {
    return (
        <div className="testimonials-block__stars">
            { [ 1, 2, 3, 4, 5 ].map( ( star ) => (
                <span className="testimonials-block__star" key={ star }>★</span>
            ) ) }
        </div>
    );
};

const TestimonialsSlider = ( { postsToShow, truncateLength } ) => {
    const [ reviews, setReviews ] = useState( [] );
    const [ currentPage, setCurrentPage ] = useState( 0 );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        wp.apiRequest( {
            path: '/red-egg/v2/reviews',
        } ).then( ( data ) => {
            setReviews( data.slice( 0, postsToShow ) );
            setLoading( false );
        } ).catch( () => {
            setReviews( [] );
            setLoading( false );
        } );
    }, [] );

    if ( loading ) {
        return (
            <div className="testimonials-block__loading">
                <p>Loading testimonials…</p>
            </div>
        );
    }

    if ( reviews.length === 0 ) {
        return null;
    }

    // Desktop shows 2 per page, mobile shows 1
    const getPerPage = () => {
        if ( typeof window !== 'undefined' && window.innerWidth >= 768 ) {
            return 2;
        }
        return 1;
    };

    const perPage = getPerPage();
    const totalPages = Math.ceil( reviews.length / perPage );
    const startIndex = currentPage * perPage;
    const visibleReviews = reviews.slice( startIndex, startIndex + perPage );

    const goNext = () => {
        setCurrentPage( ( prev ) => Math.min( prev + 1, totalPages - 1 ) );
    };

    const goPrev = () => {
        setCurrentPage( ( prev ) => Math.max( prev - 1, 0 ) );
    };

    const truncateText = ( text, length ) => {
        if ( ! text ) return '';
        if ( text.length <= length ) return text;
        return text.substring( 0, length ) + '...';
    };

    return (
        <Fragment>
            <div className="testimonials-block__nav">
                <button
                    className={ `testimonials-block__arrow testimonials-block__arrow--prev ${ currentPage === 0 ? 'is-disabled' : '' }` }
                    onClick={ goPrev }
                    disabled={ currentPage === 0 }
                    aria-label="Previous testimonial"
                >
                    <span className="arrow-icon arrow-icon--left"></span>
                </button>
                <button
                    className={ `testimonials-block__arrow testimonials-block__arrow--next ${ currentPage >= totalPages - 1 ? 'is-disabled' : '' }` }
                    onClick={ goNext }
                    disabled={ currentPage >= totalPages - 1 }
                    aria-label="Next testimonial"
                >
                    <span className="arrow-icon arrow-icon--right"></span>
                </button>
            </div>

            <div className="testimonials-block__cards">
                { visibleReviews.map( ( review, i ) => (
                    <div className="testimonial-card" key={ review.id || i }>
                        <Stars />
                        <p className="testimonial-card__quote">
                            { truncateText( review.content, truncateLength ) }
                        </p>
                        { review.content && review.content.length > truncateLength && review.link && (
                            <a href={ review.link } className="testimonial-card__read-more">
                                read more
                            </a>
                        ) }
                        <div className="testimonial-card__reviewer">
                            <p className="testimonial-card__name">{ review.reviewer_name || '' }</p>
                            <p className="testimonial-card__title">{ review.reviewer_title || '' }</p>
                        </div>
                    </div>
                ) ) }
            </div>
        </Fragment>
    );
};

if ( RootElement ) {
    const postsToShow = parseInt( RootElement.getAttribute( 'data-posts-to-show' ) ) || 6;
    const truncateLength = parseInt( RootElement.getAttribute( 'data-truncate-length' ) ) || 300;
    render(
        <TestimonialsSlider postsToShow={ postsToShow } truncateLength={ truncateLength } />,
        RootElement
    );
}
