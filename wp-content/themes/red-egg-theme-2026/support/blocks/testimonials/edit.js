/**
 * Testimonials Block – Edit Component
 *
 * Header via InnerBlocks (header-intro). Reviews are pulled
 * from /red-egg/v2/reviews. Source can be a single review,
 * all reviews, or a hand-picked selection. Preview renders
 * white cards (static grid — the frontend runs the Swiper).
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, CheckboxControl, Spinner } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const apiUrl = '/wp-json/red-egg/v2/reviews';

const template = [
    [ 'red-egg-block/header-intro', {} ],
];
const allowedBlocks = [
    'red-egg-block/header-intro',
    'core/heading',
    'core/paragraph',
];

// Short label for a review in the picker.
const reviewLabel = ( r ) => {
    const name = r.reviewer_name || __( '(no name)', 'red-egg' );
    const snippet = ( r.review_text || '' ).slice( 0, 40 );
    return name + ' — ' + snippet + ( ( r.review_text || '' ).length > 40 ? '…' : '' );
};

// One preview card (static; matches frontend markup/classes).
const PreviewCard = ( { review } ) => {
    const rating = Math.max( 0, Math.min( 5, parseInt( review.rating, 10 ) || 0 ) );
    const company = review.company_name || '';
    const title = review.company_title || '';
    return (
        <div className="testimonial-card">
            { rating > 0 && (
                <div className="testimonial-card__stars">
                    { Array.from( { length: rating } ).map( ( _, i ) => (
                        <svg key={ i } className="testimonial-card__star" width="22" height="21" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16.711 0.747717C16.48 0.291096 16.0123 0 15.5052 0C14.9981 0 14.5304 0.291096 14.2994 0.747717L10.1523 8.97831L1.14252 10.4281C0.641038 10.508 0.224076 10.8676 0.0663066 11.3584C-0.0914629 11.8493 0.0381334 12.3858 0.393115 12.7511L6.83912 19.2865L5.4192 28.4132C5.34031 28.9212 5.54879 29.4349 5.96012 29.7374C6.37145 30.04 6.91237 30.0856 7.36878 29.8516L15.5052 25.6621L23.6359 29.8516C24.0867 30.0856 24.6333 30.04 25.0446 29.7374C25.4559 29.4349 25.6644 28.9269 25.5855 28.4132L24.16 19.2865L30.606 12.7511C30.9666 12.3858 31.0905 11.8493 30.9328 11.3584C30.775 10.8676 30.3637 10.508 29.8566 10.4281L20.8524 8.97831L16.711 0.747717Z" fill="#F6B319"/></svg>
                    ) ) }
                </div>
            ) }
            <p className="testimonial-card__text">{ review.review_text }</p>
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

const EditTestimonials = ( { attributes, setAttributes, clientId } ) => {
    const { reviewMode, reviewId, reviewIds, padding, margin, blockId } = attributes;

    const [ reviews, setReviews ] = useState( false );

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    useEffect( () => {
        wp.apiFetch( { url: apiUrl } ).then( ( data ) => {
            setReviews( Array.isArray( data ) ? data : [] );
        } ).catch( () => setReviews( [] ) );
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'testimonials-block',
    } );

    // Which reviews to preview, per the current source setting.
    const displayed = ( () => {
        if ( ! reviews || reviews.length === 0 ) return [];
        if ( reviewMode === 'single' ) {
            return reviews.filter( ( r ) => String( r.id ) === String( reviewId ) );
        }
        if ( reviewMode === 'selected' ) {
            return reviews.filter( ( r ) => reviewIds.map( String ).includes( String( r.id ) ) );
        }
        return reviews;
    } )();

    const toggleSelected = ( id, on ) => {
        let updated = reviewIds.map( String );
        if ( on ) {
            if ( ! updated.includes( String( id ) ) ) updated.push( String( id ) );
        } else {
            updated = updated.filter( ( x ) => x !== String( id ) );
        }
        setAttributes( { reviewIds: updated } );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Reviews Source', 'red-egg' ) } initialOpen={ true }>
                    <SelectControl
                        label={ __( 'Source', 'red-egg' ) }
                        value={ reviewMode }
                        options={ [
                            { label: __( 'All reviews', 'red-egg' ), value: 'all' },
                            { label: __( 'Single review', 'red-egg' ), value: 'single' },
                            { label: __( 'Selected reviews', 'red-egg' ), value: 'selected' },
                        ] }
                        onChange={ ( val ) => setAttributes( { reviewMode: val } ) }
                    />

                    { reviews === false && <Spinner /> }

                    { reviews && reviewMode === 'single' && (
                        <SelectControl
                            label={ __( 'Review', 'red-egg' ) }
                            value={ reviewId }
                            options={ [ { label: __( '— Select —', 'red-egg' ), value: '' } ].concat(
                                reviews.map( ( r ) => ( { label: reviewLabel( r ), value: String( r.id ) } ) )
                            ) }
                            onChange={ ( val ) => setAttributes( { reviewId: val } ) }
                        />
                    ) }

                    { reviews && reviewMode === 'selected' && (
                        <div className="testimonials-review-picker">
                            { reviews.map( ( r ) => (
                                <CheckboxControl
                                    key={ r.id }
                                    label={ reviewLabel( r ) }
                                    checked={ reviewIds.map( String ).includes( String( r.id ) ) }
                                    onChange={ ( on ) => toggleSelected( r.id, on ) }
                                />
                            ) ) }
                        </div>
                    ) }
                </PanelBody>
            </InspectorControls>

            <PaddingSelector padding={ padding } id={ blockId } setAttributes={ setAttributes } />
            <MarginSelector margin={ margin } id={ blockId } setAttributes={ setAttributes } />

            <section { ...blockProps }>
                <div className="testimonials-block__bg"></div>
                <div className="testimonials-block__pattern"></div>
                <div className="block-wrapper">
                    <div className="testimonials-block__header">
                        <InnerBlocks template={ template } allowedBlocks={ allowedBlocks } />
                    </div>

                    <div className={ 'testimonials-block__reviews is-preview' + ( displayed.length > 1 ? ' is-grid' : '' ) }>
                        { reviews === false && (
                            <div className="testimonials-block__loading"><Spinner /></div>
                        ) }
                        { reviews !== false && displayed.length === 0 && (
                            <p className="testimonials-block__empty">
                                { reviewMode === 'all'
                                    ? __( 'No reviews found.', 'red-egg' )
                                    : __( 'No review selected yet — pick one in the block settings →', 'red-egg' ) }
                            </p>
                        ) }
                        { displayed.map( ( r ) => (
                            <PreviewCard key={ r.id } review={ r } />
                        ) ) }
                    </div>
                    { displayed.length > 1 && (
                        <p className="testimonials-block__preview-note">
                            { __( 'Displays as a slider (2 at a time) on the live site.', 'red-egg' ) }
                        </p>
                    ) }
                </div>
            </section>
        </Fragment>
    );
};

export default EditTestimonials;
