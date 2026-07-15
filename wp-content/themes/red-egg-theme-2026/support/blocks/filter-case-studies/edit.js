/**
 * Filter Case Studies Block – Edit Component
 *
 * Fetches case studies from REST API for live editor preview.
 * Shows taxonomy filters + resource card grid.
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

import ResourceCard from '../../components/ResourceCard.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const apiUrl = '/wp-json/red-egg/v2/case-studies';

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
    const { padding, margin, blockId } = attributes;

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
        wp.apiFetch( { url: apiUrl } ).then( ( data ) => {
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
        wp.apiFetch( { url: apiUrl } ).then( ( data ) => {
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

    // Initial fetch
    if ( resources === false ) {
        wp.apiFetch( { url: apiUrl } ).then( ( data ) => {
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
        } ).catch( () => {
            setResources( [] );
        } );
    }

    return (
        <Fragment>
            <InspectorControls>
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
                        { resources && resources.length > 0 && resources.map( ( resource, i ) => (
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
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditFilterCaseStudies;
