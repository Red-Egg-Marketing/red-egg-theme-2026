/**
 * Text Cards Grid Block – Edit Component
 */

const { Fragment } = wp.element;
const { RichText, MediaUpload, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const EditTextCardsGrid = ( { attributes, setAttributes, clientId } ) => {
    const {
        sectionLabel,
        heading,
        description,
        cards,
        padding,
        margin,
    } = attributes;

    const blockId = `block-${ clientId }`;


    const blockProps = useBlockProps( {
        id: blockId,
        className: 'text-cards-grid',
    } );

    const updateCard = ( index, key, value ) => {
        let newCards = JSON.parse( JSON.stringify( cards ) );
        newCards[ index ][ key ] = value;
        setAttributes( { cards: newCards } );
    };

    const addCard = () => {
        let newCards = JSON.parse( JSON.stringify( cards ) );
        newCards.push( {
            icon: '',
            iconId: 0,
            title: 'New Card',
            body: 'Card description goes here.',
            url: '#',
        } );
        setAttributes( { cards: newCards } );
    };

    const removeCard = ( index ) => {
        let newCards = JSON.parse( JSON.stringify( cards ) );
        newCards.splice( index, 1 );
        setAttributes( { cards: newCards } );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Cards', 'red-egg' ) }>
                    { cards.map( ( card, i ) => (
                        <div key={ i } style={ { marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #ddd' } }>
                            <strong>{ __( 'Card', 'red-egg' ) } { i + 1 }: { card.title }</strong>
                            <TextControl
                                label={ __( 'URL', 'red-egg' ) }
                                value={ card.url }
                                onChange={ ( val ) => updateCard( i, 'url', val ) }
                            />
                            <div className="components-base-control">
                                <label className="components-base-control__label">
                                    { __( 'Icon', 'red-egg' ) }
                                </label>
                                <MediaUpload
                                    onSelect={ ( media ) => {
                                        updateCard( i, 'icon', media.url );
                                        updateCard( i, 'iconId', media.id );
                                    } }
                                    allowedTypes={ [ 'image' ] }
                                    value={ card.iconId }
                                    render={ ( { open } ) => (
                                        <div>
                                            { card.icon && (
                                                <img
                                                    src={ card.icon }
                                                    alt=""
                                                    style={ { maxWidth: '80px', marginBottom: '8px' } }
                                                />
                                            ) }
                                            <Button onClick={ open } variant="secondary" isSmall>
                                                { card.icon ? __( 'Replace', 'red-egg' ) : __( 'Upload', 'red-egg' ) }
                                            </Button>
                                        </div>
                                    ) }
                                />
                            </div>
                            { cards.length > 1 && (
                                <Button
                                    onClick={ () => removeCard( i ) }
                                    variant="link"
                                    isDestructive
                                    isSmall
                                    style={ { marginTop: '8px' } }
                                >
                                    { __( 'Remove Card', 'red-egg' ) }
                                </Button>
                            ) }
                        </div>
                    ) ) }
                    <Button onClick={ addCard } variant="secondary">
                        { __( '+ Add Card', 'red-egg' ) }
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
                <div className="block-wrapper">
                    <div className="text-cards-grid__header">
                        <RichText
                            tagName="p"
                            className="text-cards-grid__label"
                            value={ sectionLabel }
                            onChange={ ( val ) => setAttributes( { sectionLabel: val } ) }
                            placeholder={ __( 'Section label…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="h2"
                            className="text-cards-grid__heading"
                            value={ heading }
                            onChange={ ( val ) => setAttributes( { heading: val } ) }
                            placeholder={ __( 'Heading…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="p"
                            className="text-cards-grid__description"
                            value={ description }
                            onChange={ ( val ) => setAttributes( { description: val } ) }
                            placeholder={ __( 'Description…', 'red-egg' ) }
                        />
                    </div><!-- .text-cards-grid__header -->

                    <div className="text-cards-grid__cards">
                        { cards.map( ( card, i ) => (
                            <div className="text-card" key={ i }>
                                <div className="text-card__icon">
                                    { card.icon ? (
                                        <img src={ card.icon } alt="" />
                                    ) : (
                                        <MediaUpload
                                            onSelect={ ( media ) => {
                                                updateCard( i, 'icon', media.url );
                                                updateCard( i, 'iconId', media.id );
                                            } }
                                            allowedTypes={ [ 'image' ] }
                                            value={ card.iconId }
                                            render={ ( { open } ) => (
                                                <Button
                                                    onClick={ open }
                                                    variant="secondary"
                                                    isSmall
                                                >
                                                    { __( '+ Icon', 'red-egg' ) }
                                                </Button>
                                            ) }
                                        />
                                    ) }
                                </div>
                                <RichText
                                    tagName="h3"
                                    className="text-card__title"
                                    value={ card.title }
                                    onChange={ ( val ) => updateCard( i, 'title', val ) }
                                    placeholder={ __( 'Card title…', 'red-egg' ) }
                                />
                                <RichText
                                    tagName="p"
                                    className="text-card__body"
                                    value={ card.body }
                                    onChange={ ( val ) => updateCard( i, 'body', val ) }
                                    placeholder={ __( 'Card body…', 'red-egg' ) }
                                />
                                <div className="text-card__arrow">
                                    <span className="arrow-circle">
                                        <span className="arrow-icon"></span>
                                    </span>
                                </div>
                            </div>
                        ) ) }
                    </div><!-- .text-cards-grid__cards -->
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditTextCardsGrid;
