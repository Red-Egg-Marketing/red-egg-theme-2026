/**
 * Testimonials – Frontend
 *
 * Hydrates each .testimonials-block__root: reads the source
 * config (data-review-mode / -id / -ids), fetches reviews from
 * /red-egg/v2/reviews, renders white cards, and (when more than
 * one) runs a Swiper slider — 2-up desktop, 1 on mobile, with
 * prev/next arrows. Long reviews get an inline read-more toggle.
 */

if ( typeof wp !== 'undefined' && wp.element && document.querySelector( '.testimonials-block__root' ) ) {

const { render, Fragment, useState, useEffect, useRef } = wp.element;
const apiUrl = '/red-egg/v2/reviews';
const READMORE_LIMIT = 230; // characters before truncating

/**
 * One review card with read-more expansion.
 */
const TestimonialCard = ( { review } ) => {
    const [ expanded, setExpanded ] = useState( false );
    const rating = Math.max( 0, Math.min( 5, parseInt( review.rating, 10 ) || 0 ) );
    const text = review.review_text || '';
    const isLong = text.length > READMORE_LIMIT;

    var shown = text;
    if ( isLong && ! expanded ) {
        shown = text.slice( 0, READMORE_LIMIT ).replace( /\s+\S*$/, '' ) + '… ';
    }

    const company = review.company_name || '';
    const title = review.company_title || '';

    return (
        <div className="testimonial-card">
            { rating > 0 && (
                <div className="testimonial-card__stars">
                    { Array.from( { length: rating } ).map( function( _, i ) {
                        return <span key={ i } className="testimonial-card__star" aria-hidden="true">★</span>;
                    } ) }
                </div>
            ) }
            <p className="testimonial-card__text">
                { shown }
                { isLong && (
                    <button
                        type="button"
                        className="testimonial-card__readmore"
                        onClick={ function() { setExpanded( ! expanded ); } }
                    >
                        { expanded ? 'read less' : 'read more' }
                    </button>
                ) }
            </p>
            <div className="testimonial-card__meta">
                { review.reviewer_name && (
                    <p className="testimonial-card__name">{ review.reviewer_name }</p>
                ) }
                { ( title || company ) && (
                    <span className="testimonial-card__company">
                        { title }{ title && company ? ', ' : '' }{ company }
                    </span>
                ) }
            </div>
        </div>
    );
};

/**
 * Reviews view: single card, or Swiper slider for 2+.
 */
const TestimonialsView = ( { config } ) => {
    const [ reviews, setReviews ] = useState( null );
    const swiperRef = useRef( null );
    const prevRef = useRef( null );
    const nextRef = useRef( null );
    const instanceRef = useRef( null );

    useEffect( function() {
        wp.apiRequest( { path: apiUrl } ).then( function( data ) {
            var all = Array.isArray( data ) ? data : [];
            var list = all;
            if ( config.mode === 'single' ) {
                list = all.filter( function( r ) { return String( r.id ) === String( config.id ); } );
            } else if ( config.mode === 'selected' ) {
                var ids = config.ids.map( String );
                list = all.filter( function( r ) { return ids.indexOf( String( r.id ) ) > -1; } );
            }
            setReviews( list );
        } ).catch( function() { setReviews( [] ); } );
    }, [] );

    // Init Swiper once 2+ reviews are rendered.
    useEffect( function() {
        if ( reviews && reviews.length > 1 && swiperRef.current && typeof Swiper !== 'undefined' ) {
            instanceRef.current = new Swiper( swiperRef.current, {
                slidesPerView: 1,
                spaceBetween: 24,
                speed: 500,
                watchOverflow: true,
                breakpoints: {
                    768: { slidesPerView: 2, spaceBetween: 32 },
                },
                navigation: {
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                },
            } );
        }
        return function() {
            if ( instanceRef.current ) {
                instanceRef.current.destroy( true, true );
                instanceRef.current = null;
            }
        };
    }, [ reviews ] );

    if ( reviews === null ) {
        return <div className="testimonials-block__loading"><p>Loading reviews…</p></div>;
    }
    if ( reviews.length === 0 ) {
        return <div className="testimonials-block__empty"><p>No reviews found.</p></div>;
    }
    if ( reviews.length === 1 ) {
        return (
            <div className="testimonials-slider testimonials-slider--single">
                <TestimonialCard review={ reviews[0] } />
            </div>
        );
    }

    return (
        <div className="testimonials-slider">
            <div className="swiper testimonials-slider__swiper" ref={ swiperRef }>
                <div className="swiper-wrapper">
                    { reviews.map( function( r ) {
                        return (
                            <div className="swiper-slide" key={ r.id }>
                                <TestimonialCard review={ r } />
                            </div>
                        );
                    } ) }
                </div>
            </div>
            <div className="testimonials-slider__nav">
                <button type="button" className="testimonials-slider__arrow testimonials-slider__arrow--prev" ref={ prevRef } aria-label="Previous">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="testimonials-slider__arrow testimonials-slider__arrow--next" ref={ nextRef } aria-label="Next">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
            </div>
        </div>
    );
};

// Hydrate every testimonials block on the page.
document.querySelectorAll( '.testimonials-block__root' ).forEach( function( root ) {
    var ids = [];
    try { ids = JSON.parse( root.getAttribute( 'data-review-ids' ) || '[]' ); } catch ( e ) { ids = []; }
    var config = {
        mode: root.getAttribute( 'data-review-mode' ) || 'all',
        id: root.getAttribute( 'data-review-id' ) || '',
        ids: ids,
    };
    render( <TestimonialsView config={ config } />, root );
} );

} // end wp check
