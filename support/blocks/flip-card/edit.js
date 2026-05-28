/**
 * Flip Card Block – Edit Component
 *
 * Front: MediaUpload icon (or inline SVG) + InnerBlocks (heading)
 * Back: RichText description + link/button text
 * Hover overlay: optional text that fades in on hover
 * Editor has a "Flip Side" toggle to switch views.
 */

const { Fragment, useState, RawHTML } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { PanelBody, Button, TextControl, TextareaControl, Flex } = wp.components;
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
        link, content, buttonText, svgMarkup, hoverText,
    } = attributes;

    const [ flipCard, swapSide ] = useState( false );

    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'flip-card'
            + ( bgSlug ? ' ' + bgSlug : '' )
            + ( content ? '' : ' no-flip' )
            + ( hoverText ? ' has-hover-overlay' : '' ),
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
                    title={ __( 'Inline SVG Icon', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <TextareaControl
                        label={ __( 'SVG Markup', 'red-egg' ) }
                        help={ __( 'Paste raw SVG code. Displays alongside or instead of the image icon.', 'red-egg' ) }
                        value={ svgMarkup }
                        onChange={ ( val ) => setAttributes( { svgMarkup: val } ) }
                        rows={ 6 }
                    />
                    { svgMarkup && (
                        <div style={ { marginTop: '8px' } }>
                            <p style={ { fontSize: '12px', marginBottom: '4px' } }>{ __( 'Preview:', 'red-egg' ) }</p>
                            <div
                                className="flip-card__svg-preview"
                                style={ { maxWidth: '80px' } }
                                dangerouslySetInnerHTML={ { __html: svgMarkup } }
                            />
                        </div>
                    ) }
                </PanelBody>
                <PanelBody
                    title={ __( 'Hover Overlay', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <TextareaControl
                        label={ __( 'Hover Text', 'red-egg' ) }
                        help={ __( 'Text revealed on hover with a fade overlay.', 'red-egg' ) }
                        value={ hoverText }
                        onChange={ ( val ) => setAttributes( { hoverText: val } ) }
                        rows={ 3 }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Back Side Content', 'red-egg' ) }
                    initialOpen={ false }
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
                    <div className="wrapper">
                        <div className="block-content">
                            { svgMarkup && (
                                <div
                                    className="flip-card__svg-icon"
                                    dangerouslySetInnerHTML={ { __html: svgMarkup } }
                                />
                            ) }
                            { icon && (
                                <div className="flip-card__icon">
                                    <img src={ icon } alt={ iconAlt } />
                                </div>
                            ) }
                            <InnerBlocks
                                template={ template }
                                allowedBlocks={ allowedBlocks }
                            />
                            { hoverText && (
                                <p className="flip-card__hover-text-preview" style={ { opacity: 0.5, fontStyle: 'italic', fontSize: '13px', marginTop: '0.5rem' } }>
                                    { __( 'Hover text: ', 'red-egg' ) }{ hoverText }
                                </p>
                            ) }
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
