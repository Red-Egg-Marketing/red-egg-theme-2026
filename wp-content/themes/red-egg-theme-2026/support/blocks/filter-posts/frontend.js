/**
 * Filter Posts – Frontend Component
 *
 * Hydrates #FilterPostsRoot with data from the
 * red-egg/v2/filter-posts REST endpoint.
 *
 * - Taxonomies hidden in the editor (data-hidden-taxonomies)
 *   are dropped from the filter bar.
 * - Filter state is mirrored to the URL query string
 *   (?taxonomy-slug=term-slug,term-slug) so selections are
 *   shareable / deep-linkable, and read back on load.
 * - Matching is AND: a post must have every selected term.
 */

import { onPageView } from '../../js/lifecycle';

if ( typeof wp !== 'undefined' && wp.element ) {

const { render, Fragment, useState, useEffect } = wp.element;

const apiUrl = '/red-egg/v2/filter-posts';

// Parsed from the root's data attribute inside initFilterPosts()
// (the root may not exist until an SPA swap brings it in).
let hiddenTax = [];

// Display config read from the root's data attributes in
// initFilterPosts() (initial page size + server sort).
let cfg = { orderby: 'date', order: 'DESC', initialCount: 9 };

// Taxonomy slug for a tax_array group (from its first term).
const groupTaxSlug = ( groupValue ) => {
    const first = Object.values( groupValue )[ 0 ];
    return first ? first.taxonomy : '';
};

/**
 * Filter dropdowns
 */
const PostFilters = ( props ) => {
    const { taxonomies, currentTax } = props;
    if ( ! taxonomies || Object.keys( taxonomies ).length === 0 ) {
        return null;
    }
    return (
        <form className="form-filters" onSubmit={ ( e ) => e.preventDefault() }>
            <div className="wrapper filter-items">
                { Object.entries( taxonomies ).map( function( entry ) {
                    var key = entry[0];
                    var value = entry[1];
                    return (
                        <div className="filter-block" key={ key }>
                            <button
                                type="button"
                                className="tax-filter-button"
                                onClick={ function( event ) { props.toggleCats( event.currentTarget ); } }
                            >
                                { key } <span className="filt-plus">+</span>
                            </button>
                            <div className="tax-cont">
                                <div className="tax-wrapper">
                                    <button
                                        type="button"
                                        className="tax-close"
                                        onClick={ function( event ) { props.toggleCats( event.currentTarget ); } }
                                    >
                                        ×
                                    </button>
                                    <ul className="tax-list">
                                        { Object.entries( value ).map( function( t ) {
                                            var taxName = t[0];
                                            var taxData = t[1];
                                            var checked = currentTax && currentTax.indexOf( taxData.tax_id ) > -1;
                                            return (
                                                <li className="tax-item" key={ taxData.tax_id }>
                                                    <div className="tax-wrap">
                                                        <input
                                                            id={ 'filter-' + taxData.tax_id }
                                                            value={ taxData.tax_id }
                                                            type="checkbox"
                                                            checked={ checked }
                                                            className="checkbox-component"
                                                            onChange={ function( e ) {
                                                                props.filterCats( e.currentTarget.checked, taxData.tax_id );
                                                            } }
                                                        />
                                                        <label htmlFor={ 'filter-' + taxData.tax_id }>
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
                    );
                } ) }
            </div>
        </form>
    );
};

/**
 * Post card
 */
const PostCard = ( { resource } ) => {
    return (
        <div className="post-card">
            <a className="post-card__link" href={ resource.link || '#' }>
                { resource.media_url && (
                    <div className="post-card__image">
                        <img src={ resource.media_url } alt={ resource.post_title || '' } loading="lazy" />
                    </div>
                ) }
                <div className="post-card__content">
                    <h3 className="post-card__title">{ resource.post_title || resource.title }</h3>
                    { resource.post_excerpt && (
                        <p className="post-card__excerpt">{ resource.post_excerpt }</p>
                    ) }
                </div>
            </a>
        </div>
    );
};

/**
 * Main
 */
const FilterPostsFrontend = () => {
    const [ allResources, setAllResources ] = useState( [] );
    const [ resources, setResources ] = useState( [] );
    const [ taxonomy, setTaxonomy ] = useState( {} );
    const [ selectTax, setSelectTax ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ visibleCount, setVisibleCount ] = useState( cfg.initialCount );

    // term_id -> { taxonomy, term_slug }; and "taxSlug|termSlug" -> term_id
    const [ lookups, setLookups ] = useState( { byId: {}, bySlug: {} } );

    // Close dropdowns on outside click
    useEffect( () => {
        var handleClick = function( event ) {
            if ( event.target.closest( '.filter-items' ) == null ) {
                document.querySelectorAll( '.tax-filter-button' ).forEach( function( button ) {
                    button.parentElement.classList.remove( 'active' );
                } );
            }
        };
        document.addEventListener( 'click', handleClick, false );
        return function() { document.removeEventListener( 'click', handleClick, false ); };
    }, [] );

    // AND filter helper
    var runFilter = function( source, selected ) {
        if ( selected.length === 0 ) return source;
        return source.filter( function( post ) {
            if ( ! post.taxonomies ) return false;
            var ids = [];
            Object.values( post.taxonomies ).forEach( function( terms ) {
                terms.forEach( function( term ) { ids.push( String( term.term_id ) ); } );
            } );
            return selected.every( function( id ) { return ids.indexOf( String( id ) ) > -1; } );
        } );
    };

    // Sync selected terms -> URL (?taxSlug=termSlug,termSlug)
    var updateUrl = function( selected, byId ) {
        var groups = {};
        selected.forEach( function( id ) {
            var info = byId[ id ];
            if ( ! info ) return;
            if ( ! groups[ info.taxonomy ] ) groups[ info.taxonomy ] = [];
            groups[ info.taxonomy ].push( info.term_slug );
        } );
        var params = new URLSearchParams();
        Object.keys( groups ).forEach( function( taxSlug ) {
            params.set( taxSlug, groups[ taxSlug ].join( ',' ) );
        } );
        var qs = params.toString();
        var newUrl = window.location.pathname + ( qs ? '?' + qs : '' ) + window.location.hash;
        window.history.replaceState( {}, '', newUrl );
    };

    // Initial fetch
    useEffect( () => {
        wp.apiRequest( {
            path: apiUrl + '?orderby=' + encodeURIComponent( cfg.orderby ) + '&order=' + encodeURIComponent( cfg.order ),
        } ).then( function( data ) {
            var posts = ( data && data[0] && data[0].resources ) ? data[0].resources : [];
            var taxes = ( data && data[1] ) ? data[1] : {};

            // Drop taxonomies hidden in the editor
            var visible = {};
            Object.keys( taxes ).forEach( function( label ) {
                if ( hiddenTax.indexOf( groupTaxSlug( taxes[ label ] ) ) === -1 ) {
                    visible[ label ] = taxes[ label ];
                }
            } );

            // Build lookups from visible taxonomies only
            var byId = {}, bySlug = {};
            Object.values( visible ).forEach( function( group ) {
                Object.values( group ).forEach( function( term ) {
                    byId[ term.tax_id ] = { taxonomy: term.taxonomy, term_slug: term.tax_slug };
                    bySlug[ term.taxonomy + '|' + term.tax_slug ] = term.tax_id;
                } );
            } );

            // Read initial selection from the URL
            var initial = [];
            var qp = new URLSearchParams( window.location.search );
            qp.forEach( function( val, key ) {
                val.split( ',' ).forEach( function( slug ) {
                    var id = bySlug[ key + '|' + slug ];
                    if ( id && initial.indexOf( id ) === -1 ) initial.push( id );
                } );
            } );

            setAllResources( posts );
            setTaxonomy( visible );
            setLookups( { byId: byId, bySlug: bySlug } );
            setSelectTax( initial );
            setResources( runFilter( posts, initial ) );
            setLoading( false );
        } ).catch( function() {
            setAllResources( [] );
            setResources( [] );
            setLoading( false );
        } );
    }, [] );

    var toggleCats = function( item ) {
        var parent = item.parentElement;
        document.querySelectorAll( '.filter-block' ).forEach( function( filt ) {
            if ( parent !== filt ) filt.classList.remove( 'active' );
        } );
        parent.classList.toggle( 'active' );
    };

    var filterCats = function( checked, id ) {
        var updated = selectTax.slice();
        if ( checked ) {
            if ( updated.indexOf( id ) === -1 ) updated.push( id );
        } else {
            var index = updated.indexOf( id );
            if ( index > -1 ) updated.splice( index, 1 );
        }
        setSelectTax( updated );
        setResources( runFilter( allResources, updated ) );
        setVisibleCount( cfg.initialCount );
        updateUrl( updated, lookups.byId );
    };

    var clearAll = function() {
        setSelectTax( [] );
        setResources( allResources );
        setVisibleCount( cfg.initialCount );
        updateUrl( [], lookups.byId );
    };

    if ( loading ) {
        return (
            <div className="filter-posts__loading">
                <p>Loading posts…</p>
            </div>
        );
    }

    return (
        <Fragment>
            <div className="filter-posts__filters">
                <PostFilters
                    filterCats={ filterCats }
                    taxonomies={ taxonomy }
                    toggleCats={ toggleCats }
                    currentTax={ selectTax }
                />
                { selectTax.length > 0 && (
                    <button type="button" className="filter-clear" onClick={ clearAll }>
                        Clear filters <span className="filter-clear__x">×</span>
                    </button>
                ) }
            </div>

            <div className="filter-posts__grid">
                { resources.length > 0 && resources.slice( 0, visibleCount ).map( function( resource, i ) {
                    return <PostCard key={ resource.ID || i } resource={ resource } />;
                } ) }
                { resources.length === 0 && (
                    <div className="filter-posts__empty">
                        <h3>No posts match your filters. Try a different selection.</h3>
                    </div>
                ) }
            </div>

            { resources.length > visibleCount && (
                <div className="filter-load-more-wrap">
                    <button
                        type="button"
                        className="filter-load-more"
                        onClick={ function() { setVisibleCount( visibleCount + cfg.initialCount ); } }
                    >
                        Load more
                    </button>
                </div>
            ) }
        </Fragment>
    );
};

function initFilterPosts() {
    const root = document.getElementById( 'FilterPostsRoot' );
    if ( ! root || root.dataset.reMounted ) return;
    root.dataset.reMounted = '1';

    try {
        hiddenTax = JSON.parse( root.getAttribute( 'data-hidden-taxonomies' ) || '[]' );
    } catch ( e ) {
        hiddenTax = [];
    }

    var count = parseInt( root.getAttribute( 'data-initial-count' ), 10 );
    cfg = {
        orderby: root.getAttribute( 'data-orderby' ) || 'date',
        order: root.getAttribute( 'data-order' ) || 'DESC',
        initialCount: count > 0 ? count : 9,
    };

    render( <FilterPostsFrontend />, root );
}

onPageView( initFilterPosts );

} // end wp check
