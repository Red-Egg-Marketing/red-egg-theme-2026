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
                        return <svg key={ i } className="testimonial-card__star" width="22" height="21" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16.711 0.747717C16.48 0.291096 16.0123 0 15.5052 0C14.9981 0 14.5304 0.291096 14.2994 0.747717L10.1523 8.97831L1.14252 10.4281C0.641038 10.508 0.224076 10.8676 0.0663066 11.3584C-0.0914629 11.8493 0.0381334 12.3858 0.393115 12.7511L6.83912 19.2865L5.4192 28.4132C5.34031 28.9212 5.54879 29.4349 5.96012 29.7374C6.37145 30.04 6.91237 30.0856 7.36878 29.8516L15.5052 25.6621L23.6359 29.8516C24.0867 30.0856 24.6333 30.04 25.0446 29.7374C25.4559 29.4349 25.6644 28.9269 25.5855 28.4132L24.16 19.2865L30.606 12.7511C30.9666 12.3858 31.0905 11.8493 30.9328 11.3584C30.775 10.8676 30.3637 10.508 29.8566 10.4281L20.8524 8.97831L16.711 0.747717Z" fill="#F6B319"/></svg>;
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

    // Equalize card heights so slides don't jump between pairs.
    useEffect( function() {
        if ( ! reviews || reviews.length < 2 || ! swiperRef.current ) return;
        var el = swiperRef.current;
        var equalize = function() {
            var cards = el.querySelectorAll( '.testimonial-card' );
            if ( ! cards.length ) return;
            var max = 0;
            cards.forEach( function( c ) { c.style.minHeight = ''; } );
            cards.forEach( function( c ) { max = Math.max( max, c.offsetHeight ); } );
            cards.forEach( function( c ) { c.style.minHeight = max + 'px'; } );
        };
        var t = setTimeout( equalize, 80 );
        window.addEventListener( 'resize', equalize );
        return function() {
            clearTimeout( t );
            window.removeEventListener( 'resize', equalize );
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
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 17.5C35 7.83398 27.166 -6.84869e-07 17.5 -1.5299e-06C7.83399 -2.37493e-06 2.37493e-06 7.83398 1.5299e-06 17.5C6.84869e-07 27.166 7.83398 35 17.5 35C27.166 35 35 27.166 35 17.5ZM18.5254 9.22851C19.168 8.58594 20.207 8.58594 20.8428 9.22851C21.4785 9.87109 21.4854 10.9102 20.8428 11.5459L14.8955 17.4932L20.8428 23.4404C21.4854 24.083 21.4854 25.1221 20.8428 25.7578C20.2002 26.3936 19.1611 26.4004 18.5254 25.7578L11.416 18.6621C10.7734 18.0195 10.7734 16.9805 11.416 16.3447L18.5254 9.22851Z" fill="white"/></svg>
                </button>
                <button type="button" className="testimonials-slider__arrow testimonials-slider__arrow--next" ref={ nextRef } aria-label="Next">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 17.5C0 27.166 7.83398 35 17.5 35C27.166 35 35 27.166 35 17.5C35 7.83398 27.166 0 17.5 0C7.83398 0 0 7.83398 0 17.5ZM16.4746 25.7715C15.832 26.4141 14.793 26.4141 14.1572 25.7715C13.5215 25.1289 13.5146 24.0898 14.1572 23.4541L20.1045 17.5068L14.1572 11.5596C13.5146 10.917 13.5146 9.87793 14.1572 9.24219C14.7998 8.60645 15.8389 8.59961 16.4746 9.24219L23.584 16.3379C24.2266 16.9805 24.2266 18.0195 23.584 18.6553L16.4746 25.7715Z" fill="white"/></svg>
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
