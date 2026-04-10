/**
 * Numbered List Items Block – Edit Component
 */

const { Fragment } = wp.element;
const { RichText, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const EditNumberedList = ( { attributes, setAttributes, clientId } ) => {
    const {
        heading,
        introText,
        items,
        padding,
        margin,
    } = attributes;

    const blockId = `block-${ clientId }`;


    const blockProps = useBlockProps( {
        id: blockId,
        className: 'numbered-list',
    } );

    const updateItem = ( index, key, value ) => {
        let newItems = JSON.parse( JSON.stringify( items ) );
        newItems[ index ][ key ] = value;
        setAttributes( { items: newItems } );
    };

    const addItem = () => {
        let newItems = JSON.parse( JSON.stringify( items ) );
        newItems.push( {
            title: 'New Item',
            body: 'Item description goes here.',
        } );
        setAttributes( { items: newItems } );
    };

    const removeItem = ( index ) => {
        let newItems = JSON.parse( JSON.stringify( items ) );
        newItems.splice( index, 1 );
        setAttributes( { items: newItems } );
    };

    /**
     * Zero-pad number for display: 1 → "01", 10 → "10"
     */
    const padNumber = ( num ) => {
        return String( num ).padStart( 2, '0' );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'List Items', 'red-egg' ) }>
                    { items.map( ( item, i ) => (
                        <div key={ i } style={ { marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #ddd' } }>
                            <strong>{ padNumber( i + 1 ) }: { item.title }</strong>
                            { items.length > 1 && (
                                <Button
                                    onClick={ () => removeItem( i ) }
                                    variant="link"
                                    isDestructive
                                    isSmall
                                    style={ { marginLeft: '8px' } }
                                >
                                    { __( 'Remove', 'red-egg' ) }
                                </Button>
                            ) }
                        </div>
                    ) ) }
                    <Button onClick={ addItem } variant="secondary">
                        { __( '+ Add Item', 'red-egg' ) }
                    </Button>
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
                <div className="numbered-list__bg"></div>
                <div className="block-wrapper">
                    <div className="numbered-list__left">
                        <RichText
                            tagName="h2"
                            className="numbered-list__heading"
                            value={ heading }
                            onChange={ ( val ) => setAttributes( { heading: val } ) }
                            placeholder={ __( 'Heading…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="p"
                            className="numbered-list__intro"
                            value={ introText }
                            onChange={ ( val ) => setAttributes( { introText: val } ) }
                            placeholder={ __( 'Intro text…', 'red-egg' ) }
                        />
                        <div className="numbered-list__logo-mark"></div>
                    </div><!-- .numbered-list__left -->

                    <div className="numbered-list__right">
                        { items.map( ( item, i ) => (
                            <div className="numbered-list__item" key={ i }>
                                <span className="numbered-list__number">
                                    { padNumber( i + 1 ) }
                                </span>
                                <div className="numbered-list__item-content">
                                    <RichText
                                        tagName="h3"
                                        className="numbered-list__item-title"
                                        value={ item.title }
                                        onChange={ ( val ) => updateItem( i, 'title', val ) }
                                        placeholder={ __( 'Item title…', 'red-egg' ) }
                                    />
                                    <RichText
                                        tagName="p"
                                        className="numbered-list__item-body"
                                        value={ item.body }
                                        onChange={ ( val ) => updateItem( i, 'body', val ) }
                                        placeholder={ __( 'Item description…', 'red-egg' ) }
                                    />
                                </div>
                            </div>
                        ) ) }
                    </div><!-- .numbered-list__right -->
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditNumberedList;
