/**
 * Flip Card Block – Edit Component
 *
 * Front: MediaUpload icon + InnerBlocks (heading)
 * Back: RichText description + link/button text
 * Editor has a "Flip Side" toggle to switch views.
 */

const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { PanelBody, Button, TextControl, Flex } = wp.components;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
    [ 'core/heading', { level: 3, placeholder: 'Card Title...' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
];

const EditFlipCard = ( { attributes, setAttributes, clientId } ) => {
    const {
        icon, iconId, iconAlt, bgColor, bgSlug,
        link, content, buttonText,
    } = attributes;

    const [ flipCard, swapSide ] = useState( false );

    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'flip-card'
            + ( bgSlug ? ' ' + bgSlug : '' )
            + ( content ? '' : ' no-flip' ),
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Card Icon', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <MediaUpload
                        onSelect={ ( media ) => setAttributes( {
                            icon: media.url,
                            iconId: media.id,
                            iconAlt: media.alt || '',
                        } ) }
                        allowedTypes={ [ 'image' ] }
                        value={ iconId }
                        render={ ( { open } ) => (
                            <div>
                                { icon && (
                                    <img
                                        src={ icon }
                                        alt={ iconAlt }
                                        style={ { maxWidth: '80px', marginBottom: '8px', display: 'block' } }
                                    />
                                ) }
                                <Button onClick={ open } variant="secondary" isSmall>
                                    { icon ? __( 'Replace Icon', 'red-egg' ) : __( 'Upload Icon', 'red-egg' ) }
                                </Button>
                                { icon && (
                                    <Button
                                        onClick={ () => setAttributes( { icon: '', iconId: 0, iconAlt: '' } ) }
                                        variant="link"
                                        isDestructive
                                        isSmall
                                        style={ { marginLeft: '8px' } }
                                    >
                                        { __( 'Remove', 'red-egg' ) }
                                    </Button>
                                ) }
                            </div>
                        ) }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Back Side Content', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <TextControl
                        label={ __( 'Button Text', 'red-egg' ) }
                        value={ buttonText }
                        onChange={ ( value ) => setAttributes( { buttonText: value } ) }
                    />
                </PanelBody>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                    title="Icon Background Color"
                />
            </InspectorControls>

            <div { ...blockProps }>
                { ! flipCard && (
                    <div className="block-wrapper">
                        <div className="block-content">
                            { icon && (
                                <div className="flip-card__icon">
                                    <img src={ icon } alt={ iconAlt } />
                                </div>
                            ) }
                            <InnerBlocks
                                template={ template }
                                allowedBlocks={ allowedBlocks }
                            />
                        </div>
                    </div>
                ) }
                { flipCard && (
                    <div className="flip-card-wrap">
                        <div className="wrapper">
                            <RichText
                                className="content"
                                tagName="p"
                                value={ content }
                                placeholder={ __( 'Flip side description...', 'red-egg' ) }
                                onChange={ ( value ) => setAttributes( { content: value } ) }
                            />
                        </div>
                    </div>
                ) }
                { link && (
                    <div className="wp-buttons">
                        <a href={ link } className="flip-link">
                            <span>{ buttonText }</span>
                        </a>
                    </div>
                ) }
                <Flex>
                    <URLInputButton
                        onChange={ ( value ) => setAttributes( { link: value } ) }
                        url={ link }
                    />
                    <Button
                        isSmall
                        onClick={ () => swapSide( ! flipCard ) }
                        variant={ flipCard ? 'primary' : 'secondary' }
                    >
                        { flipCard ? __( 'Front Side', 'red-egg' ) : __( 'Flip Side', 'red-egg' ) }
                    </Button>
                </Flex>
            </div>
        </Fragment>
    );
};

export default EditFlipCard;
