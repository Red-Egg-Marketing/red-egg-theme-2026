/**
 * Text Card Block – Edit Component
 *
 * Icon + URL live in InspectorControls (config).
 * Title + body are InnerBlocks content.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps, InspectorControls, MediaUpload } = wp.blockEditor;
const { PanelBody, Button, TextControl } = wp.components;
const { __ } = wp.i18n;

const template = [
    [ 'core/heading', { level: 3, placeholder: 'Card title…' } ],
    [ 'core/paragraph', { placeholder: 'Card description…' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/list',
    'core/list-item',
];

const EditTextCard = ( { attributes, setAttributes, clientId } ) => {
    const { icon, iconId, iconAlt, url } = attributes;

    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'text-card',
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Card Settings', 'red-egg' ) }>
                    <TextControl
                        label={ __( 'Card Link URL', 'red-egg' ) }
                        value={ url }
                        onChange={ ( val ) => setAttributes( { url: val } ) }
                        placeholder="/services/branding/"
                    />
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            { __( 'Card Icon', 'red-egg' ) }
                        </label>
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
                    </div>
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                { icon && (
                    <div className="text-card__icon">
                        <img src={ icon } alt={ iconAlt } />
                    </div>
                ) }
                <div className="text-card__content">
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                        templateLock={ false }
                    />
                </div>
                <div className="text-card__arrow">
                    <span className="arrow-circle">
                        <span className="arrow-icon"></span>
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTextCard;
