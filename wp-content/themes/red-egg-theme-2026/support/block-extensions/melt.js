/**
 * Melt Reveal Toggle – Block Extension
 *
 * Adds a "Melt reveal on scroll" toggle to the core Image and Gallery
 * blocks. When on, the block wrapper gets a `has-melt` class; the
 * frontend (support/js/melt-reveal.js) gives each image its own drip
 * clip + ScrollTrigger so it melts into view.
 *
 * Same three-filter shape as the lightbox extension: register
 * attribute -> add control -> write the class to saved markup.
 */

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

const ENABLED_BLOCKS = [ 'core/image', 'core/gallery' ];
const ATTR = 'reMelt';

// 1. Register the attribute.
addFilter(
    'blocks.registerBlockType',
    'red-egg/melt-attribute',
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

// 2. Add the toggle.
const withMeltControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        const { name, attributes, setAttributes, isSelected } = props;

        if ( ! ENABLED_BLOCKS.includes( name ) ) {
            return <BlockEdit { ...props } />;
        }

        return (
            <Fragment>
                <BlockEdit { ...props } />
                { isSelected && (
                    <InspectorControls>
                        <PanelBody
                            title={ __( 'Melt Reveal', 'red-egg' ) }
                            initialOpen={ false }
                        >
                            <ToggleControl
                                label={ __( 'Melt reveal on scroll', 'red-egg' ) }
                                help={ __(
                                    'Image drips into view when it scrolls onscreen.',
                                    'red-egg'
                                ) }
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
}, 'withMeltControl' );

addFilter( 'editor.BlockEdit', 'red-egg/melt-control', withMeltControl );

// 3. Write the opt-in class to saved markup.
addFilter(
    'blocks.getSaveContent.extraProps',
    'red-egg/melt-save',
    function ( extraProps, blockType, attributes ) {
        if ( ! ENABLED_BLOCKS.includes( blockType.name ) ) {
            return extraProps;
        }
        if ( attributes[ ATTR ] ) {
            extraProps.className =
                ( extraProps.className || '' ) + ' has-melt';
        }
        return extraProps;
    }
);
