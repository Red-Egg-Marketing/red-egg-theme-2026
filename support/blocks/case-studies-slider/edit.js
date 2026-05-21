/**
 * Case Studies Slider Block – Edit Component
 *
 * Fetches case studies from REST API with optional industry filter.
 * Renders a Swiper-powered preview in the editor.
 * Uses InnerBlocks for header intro above, CTA buttons below slider.
 *
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, RangeControl, TextControl } = wp.components;
const { __ } = wp.i18n;

import ResourceCard from '../../components/ResourceCard.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const apiUrl = '/wp-json/red-egg/v2/case-studies';
const industriesUrl = '/wp-json/red-egg/v2/industries';

const template = [
    [ 'red-egg-block/header-intro', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
    'core/heading',
    'core/paragraph',
];

const EditCaseStudiesSlider = ( { attributes, setAttributes, isSelected, clientId } ) => {
    const { industry, postsToShow, padding, margin, blockId, buttonText, buttonUrl } = attributes;

    const [ resources, setResources ] = useState( false );
    const [ industries, setIndustries ] = useState( false );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'case-studies-slider',
    } );

    // Set blockId on mount
    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    // Fetch industries for the filter dropdown
    useEffect( () => {
        if ( industries === false ) {
            wp.apiFetch( { url: industriesUrl } ).then( ( terms ) => {
                let opts = [ { label: '--', value: '' } ];
                terms.forEach( ( term ) => {
                    opts.push( {
                        label: term.name,
                        value: term.slug,
                    } );
                } );
                setIndustries( opts );
            } );
        }
    }, [] );

    // Fetch case studies (initial + when industry or postsToShow changes)
    useEffect( () => {
        let url = apiUrl;
        if ( industry ) {
            url += '?industry=' + industry;
        }
        wp.apiFetch( { url } ).then( ( data ) => {
            let posts = [];
            if ( data && data[0] && data[0].resources ) {
                posts = data[0].resources;
            }
            if ( postsToShow > 0 ) {
                posts = posts.slice( 0, postsToShow );
            }
            setResources( posts );
        } ).catch( () => {
            setResources( [] );
        } );
    }, [ industry, postsToShow ] );

    const setIndustryFilter = ( value ) => {
        setAttributes( { industry: value } );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Filter by Industry', 'red-egg' ) }
                    initialOpen={ true }
                >
                    { industries && (
                        <SelectControl
                            label={ __( 'Industry', 'red-egg' ) }
                            value={ industry }
                            options={ industries }
                            onChange={ setIndustryFilter }
                        />
                    ) }
                    <RangeControl
                        label={ __( 'Posts to Show', 'red-egg' ) }
                        value={ postsToShow }
                        onChange={ ( val ) => setAttributes( { postsToShow: val } ) }
                        min={ 3 }
                        max={ 30 }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'CTA Button', 'red-egg' ) }
                    initialOpen={ false }
                >
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
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps }>
                <div className="block-wrapper">
                    <div className="case-studies-slider__header">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>

                    <div className="case-studies-slider__body">
                        { resources && resources.length > 0 && (
                            <div className="case-studies-slider__grid">
                                { resources.map( ( resource, i ) => (
                                    <ResourceCard
                                        key={ resource.ID || i }
                                        resourceIndex={ i }
                                        resourceURL={ resource.link }
                                        resourceID={ resource.ID || resource.id }
                                        resourceImg={ resource.media_url || resource.featured_image || false }
                                        resourceTitle={ resource.post_title || resource.title }
                                        resourceExcerpt={ resource.post_excerpt || '' }
                                        resourceClass=""
                                        displayButton={ false }
                                        displayExcerpt={ true }
                                    />
                                ) ) }
                            </div>
                        ) }
                        { resources && resources.length === 0 && (
                            <div className="error">
                                <h3>{ __( 'No case studies found. Try a different filter.', 'red-egg' ) }</h3>
                            </div>
                        ) }
                        { resources === false && (
                            <div className="case-studies-slider__loading">
                                <p>{ __( 'Loading case studies…', 'red-egg' ) }</p>
                            </div>
                        ) }
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditCaseStudiesSlider;
