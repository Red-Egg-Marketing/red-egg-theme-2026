/**
 * Case Studies Slider Body – Edit (Child)
 *
 * Fetches case studies from REST API, shows grid preview.
 * InnerBlocks for the CTA button row below.
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

import ResourceCard from '../../components/ResourceCard.js';

const apiUrl = '/wp-json/red-egg/v2/case-studies';
const industriesUrl = '/wp-json/red-egg/v2/industries';

const buttonTemplate = [
    [ 'core/buttons', {}, [
        [ 'core/button', { text: 'VIEW OUR WORK', url: '/work/?post-type=case-study' } ],
    ] ],
];

const buttonAllowed = [
    'core/buttons',
];

const EditSliderBody = ( { attributes, setAttributes, clientId } ) => {
    const { industry, postsToShow, blockId } = attributes;

    const [ resources, setResources ] = useState( false );
    const [ industries, setIndustries ] = useState( false );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'case-studies-slider__body',
    } );

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'cs-body-' + clientId } );
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

    // Fetch case studies
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

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Slider Settings', 'red-egg' ) }
                    initialOpen={ true }
                >
                    { industries && (
                        <SelectControl
                            label={ __( 'Filter by Industry', 'red-egg' ) }
                            value={ industry }
                            options={ industries }
                            onChange={ ( val ) => setAttributes( { industry: val } ) }
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
            </InspectorControls>

            <div { ...blockProps }>
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

                <div className="cs-slider__bottom">
                    <div className="cs-slider__cta">
                        <InnerBlocks
                            template={ buttonTemplate }
                            allowedBlocks={ buttonAllowed }
                        />
                    </div>
                    <div className="cs-slider__nav cs-slider__nav--preview">
                        <span className="cs-slider__nav-prev cs-slider__nav-btn--preview"></span>
                        <span className="cs-slider__nav-next cs-slider__nav-btn--preview"></span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditSliderBody;
