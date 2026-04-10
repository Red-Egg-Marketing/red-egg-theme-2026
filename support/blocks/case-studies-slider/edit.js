/**
 * Case Studies Slider Block – Edit Component
 * 
 * Fetches case studies from the REST API for preview
 * in the editor. Frontend rendering handled by frontend.js.
 */

const { Fragment, useState, useEffect } = wp.element;
const { RichText, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, RangeControl, Spinner } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const EditCaseStudiesSlider = ( { attributes, setAttributes, clientId } ) => {
    const {
        sectionLabel,
        heading,
        description,
        buttonText,
        buttonUrl,
        postsToShow,
        padding,
        margin,
    } = attributes;

    const blockId = `block-${ clientId }`;

    const [ caseStudies, setCaseStudies ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        setLoading( true );
        wp.apiRequest( {
            path: '/red-egg/v2/case-studies',
        } ).then( ( data ) => {
            setCaseStudies( data.slice( 0, postsToShow ) );
            setLoading( false );
        } ).catch( () => {
            setCaseStudies( [] );
            setLoading( false );
        } );
    }, [ postsToShow ] );


    const blockProps = useBlockProps( {
        id: blockId,
        className: 'case-studies-slider',
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Slider Settings', 'red-egg' ) }>
                    <RangeControl
                        label={ __( 'Number of Case Studies', 'red-egg' ) }
                        value={ postsToShow }
                        onChange={ ( val ) => setAttributes( { postsToShow: val } ) }
                        min={ 2 }
                        max={ 12 }
                    />
                    <TextControl
                        label={ __( 'Button Text', 'red-egg' ) }
                        value={ buttonText }
                        onChange={ ( val ) => setAttributes( { buttonText: val } ) }
                    />
                    <TextControl
                        label={ __( 'Button URL', 'red-egg' ) }
                        value={ buttonUrl }
                        onChange={ ( val ) => setAttributes( { buttonUrl: val } ) }
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
                <div className="block-wrapper">
                    <div className="case-studies-slider__header">
                        <div className="case-studies-slider__header-left">
                            <RichText
                                tagName="p"
                                className="case-studies-slider__label"
                                value={ sectionLabel }
                                onChange={ ( val ) => setAttributes( { sectionLabel: val } ) }
                                placeholder={ __( 'Section label…', 'red-egg' ) }
                            />
                            <RichText
                                tagName="h2"
                                className="case-studies-slider__heading"
                                value={ heading }
                                onChange={ ( val ) => setAttributes( { heading: val } ) }
                                placeholder={ __( 'Heading…', 'red-egg' ) }
                            />
                        </div>
                        <RichText
                            tagName="p"
                            className="case-studies-slider__description"
                            value={ description }
                            onChange={ ( val ) => setAttributes( { description: val } ) }
                            placeholder={ __( 'Description…', 'red-egg' ) }
                        />
                    </div><!-- .case-studies-slider__header -->

                    <div className="case-studies-slider__preview">
                        { loading && (
                            <div className="case-studies-slider__loading">
                                <Spinner />
                                <p>{ __( 'Loading case studies…', 'red-egg' ) }</p>
                            </div>
                        ) }
                        { ! loading && caseStudies.length === 0 && (
                            <p className="case-studies-slider__empty">
                                { __( 'No case studies found. Add case studies to see a preview.', 'red-egg' ) }
                            </p>
                        ) }
                        { ! loading && caseStudies.length > 0 && (
                            <div className="case-studies-slider__slides-preview">
                                { caseStudies.slice( 0, 3 ).map( ( study, i ) => (
                                    <div className="case-study-card" key={ i }>
                                        { study.image && (
                                            <div className="case-study-card__image">
                                                <img src={ study.image } alt={ study.title || '' } />
                                            </div>
                                        ) }
                                        <div className="case-study-card__content">
                                            <h3 className="case-study-card__title">{ study.title }</h3>
                                            { study.excerpt && (
                                                <p className="case-study-card__excerpt">{ study.excerpt }</p>
                                            ) }
                                        </div>
                                    </div>
                                ) ) }
                            </div>
                        ) }
                    </div><!-- .case-studies-slider__preview -->

                    <div className="case-studies-slider__footer">
                        <span className="btn-gray">
                            <span>{ buttonText }</span>
                            <span className="btn-arrow"></span>
                        </span>
                    </div>
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditCaseStudiesSlider;
