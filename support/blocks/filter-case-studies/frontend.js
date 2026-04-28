/**
 * Filter Case Studies – Frontend Component
 *
 * Hydrates #FilterCaseStudiesRoot with data from
 * the red-egg/v2/case-studies REST endpoint.
 * Renders taxonomy filter dropdowns + resource card grid.
 * Cards show image + title, with hover revealing excerpt.
 */

const { render, Fragment, useState, useEffect } = wp.element;

const RootElement = document.getElementById( 'FilterCaseStudiesRoot' );
const apiUrl = '/red-egg/v2/case-studies';

/**
 * ResourceFilters – Taxonomy filter dropdowns
 */
const ResourceFilters = ( props ) => {
    const { taxonomies, currentTax } = props;

    if ( ! taxonomies || Object.keys( taxonomies ).length === 0 ) {
        return null;
    }

    return (
        <form className="form-filters" onSubmit={ ( e ) => e.preventDefault() }>
            <div className="wrapper filter-items">
                { Object.entries( taxonomies ).map( ( [ key, value ] ) => (
                    <div className="filter-block" key={ key }>
                        <button
                            type="button"
                            className="tax-filter-button"
                            onClick={ ( event ) => props.toggleCats( key, event.currentTarget ) }
                        >
                            { key } <span className="filt-plus">+</span>
                        </button>
                        <div className="tax-cont">
                            <div className="tax-wrapper">
                                <button
                                    type="button"
                                    className="tax-close"
                                    onClick={ ( event ) => props.toggleCats( key, event.currentTarget ) }
                                >
                                    ×
                                </button>
                                <ul className="tax-list">
                                    { Object.entries( value ).map( ( [ taxName, taxData ] ) => {
                                        var checked = currentTax && currentTax.includes( taxData.tax_id );
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
                                                            props.filterCats( e.currentTarget.checked, taxData.tax_id, taxData.taxonomy );
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
                ) ) }
            </div>
        </form>
    );
};

/**
 * CaseStudyCard – Individual card with hover excerpt reveal
 */
const CaseStudyCard = ( { resource } ) => {
    return (
        <div className="cs-card">
            <a className="cs-card__link" href={ resource.link || '#' }>
                { resource.media_url && (
                    <div className="cs-card__image">
                        <img
                            src={ resource.media_url }
                            alt={ resource.post_title || '' }
                            loading="lazy"
                        />
                    </div>
                ) }
                <div className="cs-card__content">
                    <h3 className="cs-card__title">{ resource.post_title || resource.title }</h3>
                    { resource.post_excerpt && (
                        <p className="cs-card__excerpt">{ resource.post_excerpt }</p>
                    ) }
                </div>
            </a>
        </div>
    );
};

/**
 * Main Frontend Component
 */
const FilterCaseStudiesFrontend = () => {
    const [ allResources, setAllResources ] = useState( [] );
    const [ resources, setResources ] = useState( [] );
    const [ taxonomy, setTaxonomy ] = useState( {} );
    const [ selectTax, setSelectTax ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    // Close dropdowns on outside click
    useEffect( () => {
        var handleClick = function( event ) {
            if ( event.target.closest( '.filter-items' ) == null ) {
                var buttons = document.querySelectorAll( '.tax-filter-button' );
                buttons.forEach( function( button ) {
                    button.parentElement.classList.remove( 'active' );
                } );
            }
        };
        document.addEventListener( 'click', handleClick, false );
        return function() {
            document.removeEventListener( 'click', handleClick, false );
        };
    }, [] );

    // Initial fetch
    useEffect( () => {
        wp.apiRequest( { path: apiUrl } ).then( ( data ) => {
            var posts = [];
            var taxes = {};
            if ( data && data[0] && data[0].resources ) {
                posts = data[0].resources;
            }
            if ( data && data[1] ) {
                taxes = data[1];
            }
            setAllResources( posts );
            setResources( posts );
            setTaxonomy( taxes );
            setLoading( false );
        } ).catch( () => {
            setAllResources( [] );
            setResources( [] );
            setLoading( false );
        } );
    }, [] );

    // Toggle dropdown
    var toggleCats = function( key, item ) {
        var allFilt = document.querySelectorAll( '.filter-block' );
        var parent = item.parentElement;

        allFilt.forEach( function( filt ) {
            if ( parent !== filt ) {
                filt.classList.remove( 'active' );
            }
        } );

        parent.classList.toggle( 'active' );
    };

    // Filter by taxonomy
    var filterCats = function( value, id, tax ) {
        var updated = selectTax.slice();

        if ( value === true ) {
            if ( updated.indexOf( id ) === -1 ) {
                updated.push( id );
            }
        } else {
            var index = updated.indexOf( id );
            if ( index > -1 ) {
                updated.splice( index, 1 );
            }
        }

        setSelectTax( updated );

        // Client-side filter from allResources
        if ( updated.length === 0 ) {
            setResources( allResources );
        } else {
            var filtered = allResources.filter( function( post ) {
                if ( ! post.taxonomies ) return false;
                var postTaxes = Object.entries( post.taxonomies );
                var matches = 0;

                updated.forEach( function( taxId ) {
                    postTaxes.forEach( function( entry ) {
                        var terms = entry[1];
                        terms.forEach( function( term ) {
                            if ( term.term_id == taxId ) {
                                matches++;
                            }
                        } );
                    } );
                } );

                return matches >= updated.length;
            } );
            setResources( filtered );
        }
    };

    if ( loading ) {
        return (
            <div className="filter-case-studies__loading">
                <p>Loading case studies…</p>
            </div>
        );
    }

    return (
        <Fragment>
            <div className="filter-case-studies__filters">
                <ResourceFilters
                    filterCats={ filterCats }
                    taxonomies={ taxonomy }
                    toggleCats={ toggleCats }
                    currentTax={ selectTax }
                />
            </div>

            <div className="filter-case-studies__grid">
                { resources.length > 0 && resources.map( ( resource, i ) => (
                    <CaseStudyCard
                        key={ resource.ID || i }
                        resource={ resource }
                    />
                ) ) }
                { resources.length === 0 && (
                    <div className="filter-case-studies__empty">
                        <h3>No case studies match your filters. Try a different selection.</h3>
                    </div>
                ) }
            </div>
        </Fragment>
    );
};

if ( RootElement ) {
    render( <FilterCaseStudiesFrontend />, RootElement );
}
