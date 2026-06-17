/**
 * Feature Card Block – Edit Component
 *
 * Icon (image or inline SVG, edited via Dropdown popover)
 * + InnerBlocks for title (heading) and body (paragraph).
 */

const { Fragment } = wp.element;
const { InnerBlocks, InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, TextareaControl } = wp.components;
const { __ } = wp.i18n;

const template = [
    [ 'core/heading', { level: 3, placeholder: 'Card title…', className: 'feature-card__title' } ],
    [ 'core/paragraph', { placeholder: 'Card description…', className: 'feature-card__body' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
];

const renderIconPreview = ( { icon, iconAlt, svgMarkup } ) => {
    if ( svgMarkup ) {
        return (
            <div
                className="feature-card__icon feature-card__icon--svg"
                dangerouslySetInnerHTML={ { __html: svgMarkup } }
            />
        );
    }
    if ( icon ) {
        return (
            <div className="feature-card__icon feature-card__icon--img">
                <img src={ icon } alt={ iconAlt || '' } />
            </div>
        );
    }
    return (
        <div className="feature-card__icon feature-card__icon--placeholder"></div>
    );
};

const EditFeatureCard = ( { attributes, setAttributes } ) => {
    const { icon, iconId, iconAlt, svgMarkup } = attributes;

    const blockProps = useBlockProps( {
        className: 'feature-card',
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
                                        style={ { maxWidth: '60px', marginBottom: '8px', display: 'block' } }
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
                    <TextareaControl
                        label={ __( 'Inline SVG', 'red-egg' ) }
                        help={ __( 'Paste raw SVG. Overrides image.', 'red-egg' ) }
                        value={ svgMarkup }
                        onChange={ ( val ) => setAttributes( { svgMarkup: val } ) }
                        rows={ 5 }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                { renderIconPreview( { icon, iconAlt, svgMarkup } ) }
                <div className="feature-card__content">
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                        templateLock="insert"
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default EditFeatureCard;
