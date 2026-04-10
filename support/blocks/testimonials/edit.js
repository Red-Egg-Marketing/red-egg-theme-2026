/**
 * Testimonials Block – Edit Component
 */

const { Fragment, useState, useEffect } = wp.element;
const { RichText, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, RangeControl, Spinner } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const EditTestimonials = ( { attributes, setAttributes, clientId } ) => {
    const {
        sectionLabel,
        heading,
        postsToShow,
        truncateLength,
        padding,
        margin,
    } = attributes;

    const blockId = `block-${ clientId }`;

    const [ reviews, setReviews ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        setLoading( true );
        wp.apiRequest( {
            path: '/red-egg/v2/reviews',
        } ).then( ( data ) => {
            setReviews( data.slice( 0, postsToShow ) );
            setLoading( false );
        } ).catch( () => {
            setReviews( [] );
            setLoading( false );
        } );
    }, [ postsToShow ] );


    const blockProps = useBlockProps( {
        id: blockId,
        className: 'testimonials-block',
    } );

    /**
     * Render star icons (5 stars)
     */
    const renderStars = () => {
        return (
            <div className="testimonials-block__stars">
                { [ 1, 2, 3, 4, 5 ].map( ( star ) => (
                    <span className="testimonials-block__star" key={ star }>★</span>
                ) ) }
            </div>
        );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Testimonials Settings', 'red-egg' ) }>
                    <RangeControl
                        label={ __( 'Number of Reviews', 'red-egg' ) }
                        value={ postsToShow }
                        onChange={ ( val ) => setAttributes( { postsToShow: val } ) }
                        min={ 2 }
                        max={ 12 }
                    />
                    <RangeControl
                        label={ __( 'Truncate Length (characters)', 'red-egg' ) }
                        value={ truncateLength }
                        onChange={ ( val ) => setAttributes( { truncateLength: val } ) }
                        min={ 100 }
                        max={ 600 }
                        step={ 50 }
                    />
                </PanelBody>
                
                
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ blockId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ blockId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps }>
                <div className="testimonials-block__bg"></div>
                <div className="testimonials-block__pattern"></div>
                <div className="block-wrapper">
                    <div className="testimonials-block__header">
                        <RichText
                            tagName="p"
                            className="testimonials-block__label"
                            value={ sectionLabel }
                            onChange={ ( val ) => setAttributes( { sectionLabel: val } ) }
                            placeholder={ __( 'Section label…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="h2"
                            className="testimonials-block__heading"
                            value={ heading }
                            onChange={ ( val ) => setAttributes( { heading: val } ) }
                            placeholder={ __( 'Heading…', 'red-egg' ) }
                        />
                    </div>

                    <div className="testimonials-block__preview">
                        { loading && (
                            <div className="testimonials-block__loading">
                                <Spinner />
                                <p>{ __( 'Loading reviews…', 'red-egg' ) }</p>
                            </div>
                        ) }
                        { ! loading && reviews.length > 0 && (
                            <div className="testimonials-block__cards">
                                { reviews.slice( 0, 2 ).map( ( review, i ) => (
                                    <div className="testimonial-card" key={ i }>
                                        { renderStars() }
                                        <p className="testimonial-card__quote">
                                            { review.content
                                                ? review.content.substring( 0, truncateLength ) + ( review.content.length > truncateLength ? '...' : '' )
                                                : '' }
                                        </p>
                                        <div className="testimonial-card__reviewer">
                                            <p className="testimonial-card__name">{ review.reviewer_name || '' }</p>
                                            <p className="testimonial-card__title">{ review.reviewer_title || '' }</p>
                                        </div>
                                    </div>
                                ) ) }
                            </div>
                        ) }
                    </div>
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditTestimonials;
