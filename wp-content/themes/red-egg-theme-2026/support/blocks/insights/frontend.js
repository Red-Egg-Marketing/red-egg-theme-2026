/**
 * Insights Block – Frontend Component
 *
 * Hydrates #InsightsBlockRoot with data from
 * the red-egg/v2/posts REST endpoint.
 * Renders resource cards with date, title,
 * excerpt, and read more button.
 */

import { onPageView } from '../../js/lifecycle';

if ( typeof wp !== 'undefined' && wp.element ) {

const { render, Fragment, useState, useEffect } = wp.element;

const InsightsFrontend = ( { postsToShow, category, industry } ) => {
    const [ posts, setPosts ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        let url = '/red-egg/v2/posts?ppp=' + postsToShow;
        if ( category && category !== 'all' ) {
            url += '&category=' + category;
        }
        if ( industry ) {
            url += '&industry=' + industry;
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
                                <div className="content">
                                    { post.date && (
                                        <span className="resource-date">{ post.date }</span>
                                    ) }
                                    <h3 className="resource-title">{ post.title }</h3>
                                    { post.excerpt && (
                                        <p className="resource-excerpt">{ post.excerpt }</p>
                                    ) }
                                    <div className="wp-block-button is-style-outline-gray">
                                        <button className="wp-button wp-block-button__link wp-element-button">Read More</button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            ) ) }
        </Fragment>
    );
};

function initInsights() {
    const RootElement = document.getElementById( 'InsightsBlockRoot' );
    if ( ! RootElement || RootElement.dataset.reMounted ) return;
    RootElement.dataset.reMounted = '1';

    const postsToShow = parseInt( RootElement.getAttribute( 'data-posts-to-show' ) ) || 2;
    const category = RootElement.getAttribute( 'data-category' ) || '';
    const industry = RootElement.getAttribute( 'data-industry' ) || '';
    render(
        <InsightsFrontend postsToShow={ postsToShow } category={ category } industry={ industry } />,
        RootElement
    );
}

onPageView( initInsights );

} // end wp check
