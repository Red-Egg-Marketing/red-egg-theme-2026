/**
 * Filter Posts Block – Edit Component
 *
 * Editable hero (nested hero block) + live preview of the
 * post grid with taxonomy filters. InspectorControls expose
 * a visibility toggle for every registered post taxonomy.
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

import ResourceCard from '../../components/ResourceCard.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const apiUrl = '/wp-json/red-egg/v2/filter-posts';

// Hero: reuse the existing hero blocks (services hero by default).
const heroTemplate = [
    [ 'red-egg-block/hero-services', {} ],
];
const heroAllowed = [
    'red-egg-block/hero-services',
    'red-egg-block/hero-background',
    'red-egg-block/hero',
];

// Taxonomy slug for a tax_array group (grabs it from the first term).
const groupTaxSlug = ( groupValue ) => {
    const first = Object.values( groupValue )[ 0 ];
    return first ? first.taxonomy : '';
};

const EditFilterPosts = ( { attributes, setAttributes, clientId } ) => {
    const { hiddenTaxonomies, padding, margin, blockId } = attributes;

    const [ allResources, setAllResources ] = useState( false );
    const [ resources, setResources ] = useState( false );
    const [ taxonomy, setTaxonomy ] = useState( {} );
    const [ taxMeta, setTaxMeta ] = useState( [] );
    const [ selectTax, setSelectTax ] = useState( [] );

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'filter-posts',
    } );

    // Close filter dropdowns on outside click
    useEffect( () => {
        const handleClick = ( event ) => {
            if ( event.target.closest( '.filter-items' ) == null ) {
                document.querySelectorAll( '.tax-filter-button' ).forEach( ( button ) => {
                    button.parentElement.classList.remove( 'active' );
                } );
            }
        };
        document.addEventListener( 'click', handleClick, false );
        return () => document.removeEventListener( 'click', handleClick, false );
    }, [] );

    // Initial fetch
    if ( allResources === false ) {
        wp.apiFetch( { url: apiUrl } ).then( ( data ) => {
            const posts = ( data && data[0] && data[0].resources ) ? data[0].resources : [];
            const taxes = ( data && data[1] ) ? data[1] : {};
            const meta  = ( data && data[2] ) ? data[2] : [];
            setAllResources( posts );
            setResources( posts );
            setTaxonomy( taxes );
            setTaxMeta( meta );
        } ).catch( () => {
            setAllResources( [] );
            setResources( [] );
        } );
    }

    // AND filter: a post must contain ALL selected term ids.
    const applyFilter = ( selected ) => {
        if ( ! allResources ) return;
        if ( selected.length === 0 ) {
            setResources( allResources );
            return;
        }
        const filtered = allResources.filter( ( post ) => {
            if ( ! post.taxonomies ) return false;
            const ids = [];
            Object.values( post.taxonomies ).forEach( ( terms ) => {
                terms.forEach( ( term ) => ids.push( String( term.term_id ) ) );
            } );
            return selected.every( ( id ) => ids.indexOf( String( id ) ) > -1 );
        } );
        setResources( filtered );
    };

    const filterCats = ( checked, id ) => {
        let updated = [ ...selectTax ];
        if ( checked ) {
            if ( updated.indexOf( id ) === -1 ) updated.push( id );
        } else {
            const index = updated.indexOf( id );
            if ( index > -1 ) updated.splice( index, 1 );
        }
        setSelectTax( updated );
        applyFilter( updated );
    };

    const clearAll = () => {
        setSelectTax( [] );
        applyFilter( [] );
    };

    const toggleCats = ( item ) => {
        const parent = item.parentElement;
        document.querySelectorAll( '.filter-block' ).forEach( ( filt ) => {
            if ( parent !== filt ) filt.classList.remove( 'active' );
        } );
        parent.classList.toggle( 'active' );
    };

    // Visibility toggle helpers
    const isHidden = ( slug ) => hiddenTaxonomies.indexOf( slug ) > -1;
    const setHidden = ( slug, hide ) => {
        let updated = [ ...hiddenTaxonomies ];
        if ( hide ) {
            if ( updated.indexOf( slug ) === -1 ) updated.push( slug );
        } else {
            updated = updated.filter( ( s ) => s !== slug );
        }
        setAttributes( { hiddenTaxonomies: updated } );
    };

    // Only show taxonomy groups whose slug isn't hidden.
    const visibleTax = Object.entries( taxonomy ).filter(
        ( [ , value ] ) => ! isHidden( groupTaxSlug( value ) )
    );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Filter Taxonomies', 'red-egg' ) } initialOpen={ true }>
                    <p className="components-base-control__help" style={ { marginTop: 0 } }>
                        { __( 'Toggle which taxonomies appear as filters.', 'red-egg' ) }
                    </p>
                    { taxMeta.length === 0 && (
                        <p>{ __( 'Loading taxonomies…', 'red-egg' ) }</p>
                    ) }
                    { taxMeta.map( ( tx ) => (
                        <ToggleControl
                            key={ tx.slug }
                            label={ tx.label }
                            checked={ ! isHidden( tx.slug ) }
                            onChange={ ( on ) => setHidden( tx.slug, ! on ) }
                        />
                    ) ) }
                </PanelBody>
            </InspectorControls>

            <PaddingSelector padding={ padding } id={ 'block-' + clientId } setAttributes={ setAttributes } />
            <MarginSelector margin={ margin } id={ 'block-' + clientId } setAttributes={ setAttributes } />

            <section { ...blockProps }>
                { /* Hero — outside the block-wrapper */ }
                <div className="filter-posts__hero">
                    <InnerBlocks
                        template={ heroTemplate }
                        allowedBlocks={ heroAllowed }
                        templateLock={ false }
                    />
                </div>

                <div className="block-wrapper">
                    <div className="filter-posts__filters">
                        <form className="form-filters" onSubmit={ ( e ) => e.preventDefault() }>
                            <div className="wrapper filter-items">
                                { visibleTax.map( ( [ key, value ] ) => (
                                    <div className="filter-block" key={ key }>
                                        <Button
                                            className="tax-filter-button"
                                            onClick={ ( event ) => toggleCats( event.currentTarget ) }
                                        >
                                            { key } <span className="filt-plus">+</span>
                                        </Button>
                                        <div className="tax-cont">
                                            <div className="tax-wrapper">
                                                <Button
                                                    className="tax-close"
                                                    onClick={ ( event ) => toggleCats( event.currentTarget ) }
                                                >
                                                    ×
                                                </Button>
                                                <ul className="tax-list">
                                                    { Object.entries( value ).map( ( [ taxName, taxData ] ) => {
                                                        const checked = selectTax.includes( taxData.tax_id );
                                                        return (
                                                            <li className="tax-item" key={ taxData.tax_id }>
                                                                <div className="tax-wrap">
                                                                    <input
                                                                        id={ `filter-${ taxData.tax_id }` }
                                                                        value={ taxData.tax_id }
                                                                        type="checkbox"
                                                                        checked={ checked }
                                                                        className="checkbox-component"
                                                                        onChange={ ( e ) => filterCats( e.currentTarget.checked, taxData.tax_id ) }
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

                    <div className="filter-posts__grid">
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
                            <div className="filter-posts__empty">
                                <h3>{ __( 'No posts found.', 'red-egg' ) }</h3>
                            </div>
                        ) }
                        { resources === false && (
                            <div className="filter-posts__loading">
                                <p>{ __( 'Loading posts…', 'red-egg' ) }</p>
                            </div>
                        ) }
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditFilterPosts;
