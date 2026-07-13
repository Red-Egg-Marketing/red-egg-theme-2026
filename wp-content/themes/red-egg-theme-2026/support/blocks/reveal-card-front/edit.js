/**
 * Reveal Card Front (child) – Edit Component
 *
 * Sidebar: icon source (FA class / inline SVG / image) + blob color.
 * Body: icon preview + InnerBlocks (heading + description).
 */

const { Fragment } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps, MediaUpload } = wp.blockEditor;
const { PanelBody, TextControl, TextareaControl, Button } = wp.components;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
    [ 'core/heading', { level: 3, placeholder: 'Card title…' } ],
    [ 'core/paragraph', { placeholder: 'Short description…' } ],
];

const allowedBlocks = [ 'core/heading', 'core/paragraph' ];

const EditRevealCardFront = ( { attributes, setAttributes } ) => {
    const {
        faClass, svgMarkup, icon, iconId, iconAlt, iconBgColor, iconBgSlug,
    } = attributes;

    const blockProps = useBlockProps( {
        className: 'reveal-card__face reveal-card__face--front',
    } );

    const hasIcon = faClass || svgMarkup || icon;

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Icon', 'red-egg' ) } initialOpen={ true }>
                    <TextControl
                        label={ __( 'FontAwesome Class', 'red-egg' ) }
                        help={ __( 'e.g. "fa-light fa-bullseye-arrow". Takes priority over SVG/image.', 'red-egg' ) }
                        value={ faClass }
                        onChange={ ( val ) => setAttributes( { faClass: val } ) }
                    />
                    <TextareaControl
                        label={ __( 'Inline SVG', 'red-egg' ) }
                        help={ __( 'Paste raw SVG markup. Used if no FA class is set.', 'red-egg' ) }
                        value={ svgMarkup }
                        onChange={ ( val ) => setAttributes( { svgMarkup: val } ) }
                        rows={ 6 }
                    />
                    <MediaUpload
                        onSelect={ ( media ) => setAttributes( {
                            icon: media.url,
                            iconId: media.id,
                            iconAlt: media.alt || '',
                        } ) }
                        allowedTypes={ [ 'image' ] }
                        value={ iconId }
                        render={ ( { open } ) => (
                            <div style={ { marginTop: '8px' } }>
                                { icon && (
                                    <img
                                        src={ icon }
                                        alt={ iconAlt }
                                        style={ { maxWidth: '70px', marginBottom: '8px', display: 'block' } }
                                    />
                                ) }
                                <Button onClick={ open } variant="secondary" isSmall>
                                    { icon ? __( 'Replace Image', 'red-egg' ) : __( 'Upload Image', 'red-egg' ) }
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
                <BackgroundColor
                    bgColor={ iconBgColor }
                    bgSlug={ iconBgSlug }
                    updateProp="iconBgColor"
                    updateSlug="iconBgSlug"
                    setAttributes={ setAttributes }
                    title="Icon Blob Color"
                />
            </InspectorControls>

            <div { ...blockProps }>
                <div className="reveal-card__face-inner">
                    { hasIcon && (
                        <div className={ 'reveal-card__icon' + ( iconBgSlug ? ' ' + iconBgSlug : '' ) }>
                            { faClass && <i className={ faClass }></i> }
                            { ! faClass && svgMarkup && (
                                <span
                                    className="reveal-card__icon-svg"
                                    dangerouslySetInnerHTML={ { __html: svgMarkup } }
                                />
                            ) }
                            { ! faClass && ! svgMarkup && icon && (
                                <img src={ icon } alt={ iconAlt } />
                            ) }
                        </div>
                    ) }
                    <div className="reveal-card__front-content">
                        <InnerBlocks
                            template={ template }
                            templateLock={ false }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditRevealCardFront;
