/**
 * Insights Block – Edit Component
 */

const { Fragment, useState, useEffect } = wp.element;
const { RichText, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, RangeControl, Spinner } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const EditInsights = ( { attributes, setAttributes, clientId } ) => {
    const {
        sectionLabel,
        heading,
        postsToShow,
        padding,
        margin,
    } = attributes;

    const blockId = `block-${ clientId }`;

    const [ posts, setPosts ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        setLoading( true );
        wp.apiRequest( {
            path: '/red-egg/v2/resources',
        } ).then( ( data ) => {
            setPosts( data.slice( 0, postsToShow ) );
            setLoading( false );
        } ).catch( () => {
            setPosts( [] );
            setLoading( false );
        } );
    }, [ postsToShow ] );


    const blockProps = useBlockProps( {
        id: blockId,
        className: 'insights-block',
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Insights Settings', 'red-egg' ) }>
                    <RangeControl
                        label={ __( 'Number of Posts', 'red-egg' ) }
                        value={ postsToShow }
                        onChange={ ( val ) => setAttributes( { postsToShow: val } ) }
                        min={ 1 }
                        max={ 4 }
                    />
                </PanelBody>
                
                
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ blockId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ blockId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps }>
                <div className="block-wrapper">
                    <div className="insights-block__header">
                        <RichText
                            tagName="p"
                            className="insights-block__label"
                            value={ sectionLabel }
                            onChange={ ( val ) => setAttributes( { sectionLabel: val } ) }
                            placeholder={ __( 'Section label…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="h2"
                            className="insights-block__heading"
                            value={ heading }
                            onChange={ ( val ) => setAttributes( { heading: val } ) }
                            placeholder={ __( 'Heading…', 'red-egg' ) }
                        />
                    </div>

                    <div className="insights-block__posts">
                        { loading && (
                            <div className="insights-block__loading">
                                <Spinner />
                                <p>{ __( 'Loading posts…', 'red-egg' ) }</p>
                            </div>
                        ) }
                        { ! loading && posts.length === 0 && (
                            <p className="insights-block__empty">
                                { __( 'No resources found.', 'red-egg' ) }
                            </p>
                        ) }
                        { ! loading && posts.length > 0 && (
                            <div className="insights-block__cards">
                                { posts.map( ( post, i ) => (
                                    <div className="insight-card" key={ i }>
                                        <p className="insight-card__date">{ post.date || '' }</p>
                                        <h3 className="insight-card__title">{ post.title || '' }</h3>
                                        <p className="insight-card__excerpt">{ post.excerpt || '' }</p>
                                        <span className="btn-gray">
                                            <span>READ MORE</span>
                                            <span className="btn-arrow"></span>
                                        </span>
                                    </div>
                                ) ) }
                            </div>
                        ) }
                    </div>
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditInsights;
