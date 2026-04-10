/**
 * Insights Block – Frontend Component
 * 
 * Hydrates #InsightsBlockRoot with data from
 * the red_egg_return_resources REST endpoint.
 * Renders peach-colored blog post cards.
 */

const { render, Fragment, useState, useEffect } = wp.element;

const RootElement = document.getElementById( 'InsightsBlockRoot' );

const InsightsBlock = ( { postsToShow } ) => {
    const [ posts, setPosts ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        wp.apiRequest( {
            path: '/red-egg/v2/resources',
        } ).then( ( data ) => {
            setPosts( data.slice( 0, postsToShow ) );
            setLoading( false );
        } ).catch( () => {
            setPosts( [] );
            setLoading( false );
        } );
    }, [] );

    if ( loading ) {
        return (
            <div className="insights-block__loading">
                <p>Loading insights…</p>
            </div>
        );
    }

    if ( posts.length === 0 ) {
        return null;
    }

    return (
        <div className="insights-block__cards">
            { posts.map( ( post, i ) => (
                <a href={ post.link || '#' } className="insight-card" key={ post.id || i }>
                    <div className="insight-card__inner">
                        <p className="insight-card__date">{ post.date || '' }</p>
                        <h3 className="insight-card__title">{ post.title || '' }</h3>
                        <p className="insight-card__excerpt">{ post.excerpt || '' }</p>
                        <span className="btn-gray">
                            <span>READ MORE</span>
                            <span className="btn-arrow"></span>
                        </span>
                    </div>
                </a>
            ) ) }
        </div>
    );
};

if ( RootElement ) {
    const postsToShow = parseInt( RootElement.getAttribute( 'data-posts-to-show' ) ) || 2;
    render(
        <InsightsBlock postsToShow={ postsToShow } />,
        RootElement
    );
}
