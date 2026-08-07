/**
 * Filter Case Studies Block – Edit Component
 *
 * Fetches case studies from REST API for live editor preview.
 * Shows taxonomy filters + resource card grid.
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, RangeControl, SelectControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

import ResourceCard from '../../components/ResourceCard.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const apiUrl = '/wp-json/red-egg/v2/case-studies';

const ORDERBY_OPTIONS = [
    { label: __( 'Date', 'red-egg' ), value: 'date' },
    { label: __( 'Modified date', 'red-egg' ), value: 'modified' },
    { label: __( 'Menu order', 'red-egg' ), value: 'menu_order' },
    { label: __( 'Title', 'red-egg' ), value: 'title' },
    { label: __( 'Author', 'red-egg' ), value: 'author' },
    { label: __( 'Slug (name)', 'red-egg' ), value: 'name' },
    { label: __( 'Random', 'red-egg' ), value: 'rand' },
];

const ORDER_OPTIONS = [
    { label: __( 'Descending', 'red-egg' ), value: 'DESC' },
    { label: __( 'Ascending', 'red-egg' ), value: 'ASC' },
];

// Hero: reuse the existing hero blocks (services hero by default).
const heroTemplate = [
    [ 'red-egg-block/hero-services', {} ],
];
const heroAllowed = [
    'red-egg-block/hero-services',
    'red-egg-block/hero-background',
    'red-egg-block/hero',
];

const EditFilterCaseStudies = ( { attributes, setAttributes, clientId } ) => {
    const { initialCount, orderby, order, melt, padding, margin, blockId } = attributes;

    const sortedUrl = apiUrl + '?orderby=' + encodeURIComponent( orderby ) + '&order=' + encodeURIComponent( order );

    const [ resources, setResources ] = useState( false );
    const [ taxonomy, setTaxonomy ] = useState( [] );
    const [ selectTax, setSelectTax ] = useState( [] );

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'filter-case-studies',
    } );

    // Close filter dropdowns on outside click
    useEffect( () => {
        const handleClick = ( event ) => {
            if ( event.target.closest( '.filter-items' ) == null ) {
                let buttons = document.querySelectorAll( '.tax-filter-button' );
                buttons.forEach( ( button ) => {
                    let par = button.parentElement;
                    par.classList.remove( 'active' );
                } );
            }
        };
        document.addEventListener( 'click', handleClick, false );
        return () => document.removeEventListener( 'click', handleClick, false );
    }, [] );

    // Filter handler
    const filterCats = ( value, id, tax ) => {
        let updated = [ ...selectTax ];

        if ( value === true ) {
            if ( updated.indexOf( id ) === -1 ) {
                updated.push( id );
            }
        } else {
            let index = updated.indexOf( id );
            if ( index > -1 ) {
                updated.splice( index, 1 );
            }
        }

        setSelectTax( updated );

        // Re-fetch and filter client-side
        wp.apiFetch( { url: sortedUrl } ).then( ( data ) => {
            let posts = [];
            if ( data && data[0] && data[0].resources ) {
                posts = data[0].resources;
            }

            if ( updated.length > 0 ) {
                posts = posts.filter( ( post ) => {
                    if ( ! post.taxonomies ) return false;
                    let postTaxes = Object.entries( post.taxonomies );
                    let matches = 0;

                    updated.forEach( ( taxId ) => {
                        postTaxes.forEach( ( [ , terms ] ) => {
                            terms.forEach( ( term ) => {
                                if ( term.term_id == taxId ) {
                                    matches++;
                                }
                            } );
                        } );
                    } );

                    return matches >= updated.length;
                } );
            }

            setResources( posts );
        } );
    };

    // Clear all selected filters
    const clearAll = () => {
        setSelectTax( [] );
        wp.apiFetch( { url: sortedUrl } ).then( ( data ) => {
            let posts = ( data && data[0] && data[0].resources ) ? data[0].resources : [];
            setResources( posts );
        } );
    };

    // Toggle dropdown
    const toggleCats = ( key, item ) => {
        let allFilt = document.querySelectorAll( '.filter-block' );
        let parent = item.parentElement;

        allFilt.forEach( ( filt ) => {
            if ( parent !== filt ) {
                filt.classList.remove( 'active' );
            }
        } );

        parent.classList.toggle( 'active' );
    };

    // Fetch preview data. Re-runs when sort changes so the preview
    // reflects the chosen order (sort resets the filter selection).
    useEffect( () => {
        wp.apiFetch( { url: sortedUrl } ).then( ( data ) => {
            let posts = [];
            let taxes = [];
            if ( data && data[0] && data[0].resources ) {
                posts = data[0].resources;
            }
            if ( data && data[1] ) {
                taxes = data[1];
            }
            setResources( posts );
            setTaxonomy( taxes );
            setSelectTax( [] );
        } ).catch( () => {
            setResources( [] );
        } );
    }, [ orderby, order ] );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Display', 'red-egg' ) } initialOpen={ true }>
                    <RangeControl
                        label={ __( 'Case studies to initially load', 'red-egg' ) }
                        value={ initialCount }
                        onChange={ ( val ) => setAttributes( { initialCount: val || 1 } ) }
                        min={ 1 }
                        max={ 48 }
                    />
                    <SelectControl
                        label={ __( 'Order by', 'red-egg' ) }
                        value={ orderby }
                        options={ ORDERBY_OPTIONS }
                        onChange={ ( val ) => setAttributes( { orderby: val } ) }
                    />
                    <SelectControl
                        label={ __( 'Order', 'red-egg' ) }
                        value={ order }
                        options={ ORDER_OPTIONS }
                        onChange={ ( val ) => setAttributes( { order: val } ) }
                        disabled={ orderby === 'rand' }
                        help={ orderby === 'rand' ? __( 'Random ignores order direction.', 'red-egg' ) : undefined }
                    />
                    <ToggleControl
                        label={ __( 'Melt reveal on scroll', 'red-egg' ) }
                        help={ __( 'Cards drip into view as they scroll onscreen.', 'red-egg' ) }
                        checked={ !! melt }
                        onChange={ () => setAttributes( { melt: ! melt } ) }
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
                <div className="filter-case-studies__hero">
                    <InnerBlocks
                        template={ heroTemplate }
                        allowedBlocks={ heroAllowed }
                        templateLock={ false }
                    />
                </div>
                <div className="block-wrapper">
                    <div className="filter-case-studies__filters">
                        <form className="form-filters">
                            <div className="wrapper filter-items">
                                { taxonomy && Object.entries( taxonomy ).map( ( [ key, value ] ) => (
                                    <div className="filter-block" key={ key }>
                                        <Button
                                            className="tax-filter-button"
                                            onClick={ ( event ) => toggleCats( key, event.currentTarget ) }
                                        >
                                            { key } <span className="filt-plus">+</span>
                                        </Button>
                                        <div className="tax-cont">
                                            <div className="tax-wrapper">
                                                <Button
                                                    className="tax-close"
                                                    onClick={ ( event ) => toggleCats( key, event.currentTarget ) }
                                                >
                                                    ×
                                                </Button>
                                                <ul className="tax-list">
                                                    { Object.entries( value ).map( ( [ taxName, taxData ] ) => {
                                                        let checked = selectTax.includes( taxData.tax_id );
                                                        return (
                                                            <li className="tax-item" key={ taxData.tax_id }>
                                                                <div className="tax-wrap">
                                                                    <input
                                                                        id={ `filter-${ taxData.tax_id }` }
                                                                        value={ taxData.tax_id }
                                                                        type="checkbox"
                                                                        checked={ checked }
                                                                        className="checkbox-component"
                                                                        onChange={ ( e ) => {
                                                                            filterCats( e.currentTarget.checked, taxData.tax_id, taxData.taxonomy );
                                                                        } }
                                                                    />
                                                                    <label htmlFor={ `filter-${ taxData.tax_id }` }>
                                                                        { taxName }
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        );
                                                    } ) }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ) ) }
                            </div>
                        </form>
                        { selectTax.length > 0 && (
                            <button type="button" className="filter-clear" onClick={ clearAll }>
                                { __( 'Clear filters', 'red-egg' ) } <span className="filter-clear__x">×</span>
                            </button>
                        ) }
                    </div>

                    <div className="filter-case-studies__grid">
                        { resources && resources.length > 0 && resources.slice( 0, initialCount ).map( ( resource, i ) => (
                            <ResourceCard
                                key={ resource.ID || i }
                                resourceIndex={ i }
                                resourceURL={ resource.link }
                                resourceID={ resource.ID }
                                resourceImg={ resource.media_url }
                                resourceTitle={ resource.post_title }
                                resourceExcerpt={ resource.post_excerpt }
                                displayButton={ false }
                            />
                        ) ) }
                        { resources && resources.length === 0 && (
                            <div className="filter-case-studies__empty">
                                <h3>{ __( 'No case studies found.', 'red-egg' ) }</h3>
                            </div>
                        ) }
                        { resources === false && (
                            <div className="filter-case-studies__loading">
                                <p>{ __( 'Loading case studies…', 'red-egg' ) }</p>
                            </div>
                        ) }
                        { resources && resources.length > initialCount && (
                            <p className="filter-case-studies__more-note">
                                { `${ resources.length - initialCount } more shown via “Load more” on the frontend.` }
                            </p>
                        ) }
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditFilterCaseStudies;
