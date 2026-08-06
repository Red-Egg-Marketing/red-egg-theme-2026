/**
 * Lightbox Toggle – Block Extension
 *
 * Adds an "Open in lightbox" toggle to the core Image and Gallery
 * blocks. When on, the block wrapper gets a `has-lightbox` class; the
 * frontend script (support/js/lightbox.js) finds those, wires up
 * GLightbox, and groups a gallery's images so they can be arrowed
 * through as a set.
 *
 * Three standard filters: register attribute -> add the control ->
 * write the class to saved markup. No editor-canvas class is added,
 * since the toggle has no visual effect inside the editor (the
 * lightbox itself is frontend-only).
 *
 *    ____          _   _____
 *   |  _ \ ___  __| | | ____|__ _  __ _
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |
 *   |  _ <  __/ (_| | | |__| (_| | (_| |
 *   |_| \_\___|\__,_| |_____\__, |\__, |
 *                            |___/ |___/
 */

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

// Blocks that get the lightbox toggle.
const ENABLED_BLOCKS = [ 'core/image', 'core/gallery' ];

// Attribute name (prefixed so it can't collide with core's own
// lightbox/behaviors support).
const ATTR = 'reLightbox';

/**
 * 1. Register the attribute on the enabled blocks.
 */
addFilter(
    'blocks.registerBlockType',
    'red-egg/lightbox-attribute',
    function ( settings, name ) {
        if ( ! ENABLED_BLOCKS.includes( name ) ) {
            return settings;
        }
        settings.attributes = {
            ...settings.attributes,
            [ ATTR ]: { type: 'boolean', default: false },
        };
        return settings;
    }
);

/**
 * 2. Add the toggle to the block's Inspector sidebar.
 */
const withLightboxControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        const { name, attributes, setAttributes, isSelected } = props;

        if ( ! ENABLED_BLOCKS.includes( name ) ) {
            return <BlockEdit { ...props } />;
        }

        const isGallery = name === 'core/gallery';

        return (
            <Fragment>
                <BlockEdit { ...props } />
                { isSelected && (
                    <InspectorControls>
                        <PanelBody
                            title={ __( 'Lightbox', 'red-egg' ) }
                            initialOpen={ false }
                        >
                            <ToggleControl
                                label={ __( 'Open in lightbox', 'red-egg' ) }
                                help={
                                    isGallery
                                        ? __(
                                              'Let visitors click any image to view the gallery fullscreen, with next/previous navigation.',
                                              'red-egg'
                                          )
                                        : __(
                                              'Let visitors click the image to view it fullscreen.',
                                              'red-egg'
                                          )
                                }
                                checked={ !! attributes[ ATTR ] }
                                onChange={ ( value ) =>
                                    setAttributes( { [ ATTR ]: value } )
                                }
                                __nextHasNoMarginBottom
                            />
                        </PanelBody>
                    </InspectorControls>
                ) }
            </Fragment>
        );
    };
}, 'withLightboxControl' );

addFilter(
    'editor.BlockEdit',
    'red-egg/lightbox-control',
    withLightboxControl
);

/**
 * 3. Write the opt-in class to the saved markup (frontend).
 */
addFilter(
    'blocks.getSaveContent.extraProps',
    'red-egg/lightbox-save',
    function ( extraProps, blockType, attributes ) {
        if ( ! ENABLED_BLOCKS.includes( blockType.name ) ) {
            return extraProps;
        }
        if ( attributes[ ATTR ] ) {
            extraProps.className =
                ( extraProps.className || '' ) + ' has-lightbox';
        }
        return extraProps;
    }
);
