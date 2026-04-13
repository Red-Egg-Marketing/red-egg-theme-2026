/**
 * Insights Block – Frontend Component
 *
 * Hydrates #InsightsBlockRoot with data from
 * the red-egg/v2/resources REST endpoint.
 * Renders resource cards in a grid layout.
 */

const { render, Fragment, useState, useEffect } = wp.element;

const RootElement = document.getElementById( 'InsightsBlockRoot' );

const InsightsFrontend = ( { postsToShow, category } ) => {
    const [ posts, setPosts ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        let url = '/red-egg/v2/posts?ppp=' + postsToShow;
        if ( category && category !== 'all' ) {
            url += '&category=' + category;
        }
        wp.apiRequest( { path: url } ).then( ( data ) => {
            setPosts( data );
            setLoading( false );
        } ).catch( () => {
            setPosts( [] );
            setLoading( false );
        } );
    }, [] );

    if ( loading ) {
        return (
            <div className="insights-block__loading">
                <p>Loading posts…</p>
            </div>
        );
    }

    if ( posts.length === 0 ) {
        return null;
    }

    return (
        <Fragment>
            { posts.map( ( post, i ) => (
                <div className="resource-card" key={ post.ID || i }>
                    <div className="resource-extra">
                        <a className="resource-wrap" href={ post.link || '#' }>
                            <div className="cont-wrap">
                                { ( post.featured_image || post.image ) && (
                                    <div className="image-cont">
                                        <img
                                            className="resource-img"
                                            src={ post.featured_image || post.image }
                                            alt={ post.title || '' }
                                            loading="lazy"
                                        />
                                    </div>
                                ) }
                                <div className="content">
                                    <h3 className="resource-title">{ post.title }</h3>
                                    { post.excerpt && (
                                        <p className="resource-excerpt">{ post.excerpt }</p>
                                    ) }
                                    <button className="wp-button">Read More</button>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            ) ) }
        </Fragment>
    );
};

if ( RootElement ) {
    const postsToShow = parseInt( RootElement.getAttribute( 'data-posts-to-show' ) ) || 2;
    const category = RootElement.getAttribute( 'data-category' ) || '';
    render(
        <InsightsFrontend postsToShow={ postsToShow } category={ category } />,
        RootElement
    );
}
