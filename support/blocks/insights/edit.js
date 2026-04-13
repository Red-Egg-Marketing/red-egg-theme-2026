/**
 * Insights Block – Edit Component
 *
 * InnerBlocks for header-intro. Fetches posts from
 * /red-egg/v2/resources with optional category filter.
 * Displays ResourceCard components in a grid.
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

import ResourceCard from '../../components/ResourceCard.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const apiUrl = '/wp-json/red-egg/v2/resources';
const catUrl = '/wp-json/wp/v2/categories?per_page=100';

const template = [
    [ 'red-egg-block/header-intro', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
];

const EditInsights = ( { attributes, setAttributes, isSelected, clientId } ) => {
    const { category, postsToShow, bgColor, bgSlug, padding, margin, blockId } = attributes;

    const [ resources, setResources ] = useState( false );
    const [ currentCats, setCurrentCats ] = useState( false );

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

    // Fetch resources (initial + when category or postsToShow changes)
    useEffect( () => {
        let url = apiUrl + '?ppp=' + postsToShow;
        if ( category && category !== 'all' ) {
            url += '&category=' + category;
        }
        wp.apiFetch( { url } ).then( ( data ) => {
            setResources( data );
        } ).catch( () => {
            setResources( [] );
        } );
    }, [ category, postsToShow ] );

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
                    <header className="insights-block__header">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </header>

                    <div className="resources grid">
                        { resources && resources.length > 0 && resources.map( ( resource, i ) => (
                            <ResourceCard
                                key={ resource.ID || resource.id || i }
                                resourceIndex={ i }
                                resourceURL={ resource.link }
                                resourceID={ resource.ID || resource.id }
                                resourceImg={ resource.featured_image || resource.image || false }
                                resourceTitle={ resource.title }
                                resourceExcerpt={ resource.excerpt }
                                updateResourceImage={ null }
                                updateResourceText={ null }
                                updateResourceExcerpt={ null }
                                displayButton={ true }
                                displayExcerpt={ true }
                            />
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
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditInsights;
