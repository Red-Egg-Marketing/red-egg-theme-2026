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
                        <button className="cs-slider__nav-prev" aria-label="Previous slide">
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35 17.5C35 7.83398 27.166 -6.84869e-07 17.5 -1.5299e-06C7.83399 -2.37493e-06 2.37493e-06 7.83398 1.5299e-06 17.5C6.84869e-07 27.166 7.83398 35 17.5 35C27.166 35 35 27.166 35 17.5ZM18.5254 9.22851C19.168 8.58594 20.207 8.58594 20.8428 9.22851C21.4785 9.87109 21.4854 10.9102 20.8428 11.5459L14.8955 17.4932L20.8428 23.4404C21.4854 24.083 21.4854 25.1221 20.8428 25.7578C20.2002 26.3936 19.1611 26.4004 18.5254 25.7578L11.416 18.6621C10.7734 18.0195 10.7734 16.9805 11.416 16.3447L18.5254 9.22851Z" fill="#424042"/>
                        </svg>
                    </button>
                    <button className="cs-slider__nav-next" aria-label="Next slide">
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 17.5C0 27.166 7.83398 35 17.5 35C27.166 35 35 27.166 35 17.5C35 7.83398 27.166 0 17.5 0C7.83398 0 0 7.83398 0 17.5ZM16.4746 25.7715C15.832 26.4141 14.793 26.4141 14.1572 25.7715C13.5215 25.1289 13.5146 24.0898 14.1572 23.4541L20.1045 17.5068L14.1572 11.5596C13.5146 10.917 13.5146 9.87793 14.1572 9.24219C14.7998 8.60645 15.8389 8.59961 16.4746 9.24219L23.584 16.3379C24.2266 16.9805 24.2266 18.0195 23.584 18.6553L16.4746 25.7715Z" fill="#424042"/>
                        </svg>
                    </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditSliderBody;
