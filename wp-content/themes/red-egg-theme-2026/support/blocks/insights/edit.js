/**
 * Insights Block – Edit Component
 *
 * InnerBlocks for header-intro. Fetches posts from
 * /red-egg/v2/resources with optional category filter.
 * Displays ResourceCard components in a grid.
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, RangeControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

import ResourceCard from '../../components/ResourceCard.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BlobAnimation from '../../components/BlobAnimation.js';

const apiUrl = '/wp-json/red-egg/v2/posts';
const catUrl = '/wp-json/wp/v2/categories?per_page=100';
const industriesUrl = '/wp-json/red-egg/v2/industries';

const template = [
    [ 'red-egg-block/header-intro', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
];

const EditInsights = ( { attributes, setAttributes, isSelected, clientId } ) => {
    const {
        category, postsToShow, bgColor, bgSlug,
        padding, margin, blockId,
        blobEnabled, blobShape, blobSpeed, blobPosition,
        industry
    } = attributes;

    const [ resources, setResources ] = useState( false );
    const [ currentCats, setCurrentCats ] = useState( false );
    const [ industries, setIndustries ] = useState( false );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'insights-block' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    // Set blockId on mount
    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    // Fetch categories for filter dropdown
    useEffect( () => {
        if ( currentCats === false ) {
            wp.apiFetch( { url: catUrl } ).then( ( categories ) => {
                let cats = [ { label: 'All', value: 'all' } ];
                categories.forEach( ( cat ) => {
                    cats.push( {
                        label: cat.name,
                        value: cat.id.toString(),
                    } );
                } );
                setCurrentCats( cats );
            } );
        }
    }, [] );

    // Fetch industries for the filter dropdown
    useEffect( () => {
        if ( industries === false ) {
            wp.apiFetch( { url: industriesUrl } ).then( ( terms ) => {
                let opts = [ { label: 'All', value: '' } ];
                terms.forEach( ( term ) => {
                    opts.push( { label: term.name, value: term.slug } );
                } );
                setIndustries( opts );
            } );
        }
    }, [] );

    // Fetch resources (initial + when category or postsToShow changes)
    useEffect( () => {
        let url = apiUrl + '?ppp=' + postsToShow;
        if ( category && category !== 'all' ) {
            url += '&category=' + category;
        }
        if ( industry ) {
            url += '&industry=' + industry;
        }
        wp.apiFetch( { url } ).then( ( data ) => {
            setResources( data );
        } ).catch( () => {
            setResources( [] );
        } );
    }, [ category, industry, postsToShow ] );

    const setCategoryPosts = ( value ) => {
        setAttributes( { category: value } );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Filter by Category', 'red-egg' ) }
                    initialOpen={ true }
                >
                    { currentCats && (
                        <SelectControl
                            label={ __( 'Category', 'red-egg' ) }
                            value={ category }
                            options={ currentCats }
                            onChange={ setCategoryPosts }
                        />
                    ) }
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
                        min={ 1 }
                        max={ 6 }
                    />
                </PanelBody>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                    title="Meta Info Color"
                />
                <BlobAnimation.Controls
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobSpeed={ blobSpeed }
                    blobPosition={ blobPosition }
                    setAttributes={ setAttributes }
                />
                <PanelBody
                    title={ __( 'Squiggle Decoration', 'red-egg' ) }
                    initialOpen={ false }
                >
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
                     <BlobAnimation.Preview
                        blobEnabled={ blobEnabled }
                        blobShape={ blobShape }
                        blobPosition={ blobPosition }
                      />
               
                    <header className="insights-block__header">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </header>

                    <div className="resources grid">
                        { resources && resources.length > 0 && resources.map( ( resource, i ) => (
                            <div className="resource-card" key={ resource.ID || resource.id || i }>
                                <div className="resource-extra">
                                    <div className="resource-wrap">
                                        <div className="cont-wrap">
                                            <div className="content">
                                                { resource.date && (
                                                    <span className="resource-date">{ resource.date }</span>
                                                ) }
                                                <h3 className="resource-title">{ resource.title }</h3>
                                                { resource.excerpt && (
                                                    <p className="resource-excerpt">{ resource.excerpt }</p>
                                                ) }
                                                <div className="wp-block-button is-style-outline-gray">
                                                    <button className="wp-button wp-block-button__link wp-element-button">Read More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) ) }
                        { resources && resources.length === 0 && (
                            <p className="insights-block__empty">
                                { __( 'No posts found. Try a different category.', 'red-egg' ) }
                            </p>
                        ) }
                        { resources === false && (
                            <p>{ __( 'Loading posts…', 'red-egg' ) }</p>
                        ) }
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditInsights;
