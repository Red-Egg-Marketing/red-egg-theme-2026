/**
 * Font Family – Block Extension
 *
 * Adds a "Font Family" dropdown INTO the core Typography panel for
 * text blocks, letting editors force one of the theme's two brand
 * families (Poppins / Figtree). This is the manual fix for the stray
 * spots where a block's font drifts from the intended family.
 *
 * Output: a flat `font-{slug}` class on the block. Styled in
 * _base.scss with the theme's SCSS font variables — no inline styles,
 * no CSS custom properties, matching the rest of the theme.
 *
 * Four standard filters: register attribute → add control →
 * reflect class in the editor canvas → write class to saved markup.
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
const { SelectControl } = wp.components;
const { __ } = wp.i18n;

// Blocks that get the Font Family control.
const ENABLED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/quote',
    'core/button',
];

// Attribute name (prefixed so it can't collide with core's own
// typography.fontFamily support).
const ATTR = 'redEggFontFamily';

// Dropdown options. Values are the SCSS-mapped slugs; '' = leave the
// block's default family alone.
const FONT_OPTIONS = [
    { label: __( 'Default', 'red-egg' ), value: '' },
    { label: __( 'Poppins (Headings)', 'red-egg' ), value: 'poppins' },
    { label: __( 'Figtree (Body)', 'red-egg' ), value: 'figtree' },
];

/**
 * 1. Register the attribute on the enabled blocks.
 */
addFilter(
    'blocks.registerBlockType',
    'red-egg/font-family-attribute',
    function ( settings, name ) {
        if ( ! ENABLED_BLOCKS.includes( name ) ) {
            return settings;
        }
        settings.attributes = {
            ...settings.attributes,
            [ ATTR ]: { type: 'string', default: '' },
        };
        return settings;
    }
);

/**
 * 2. Add the dropdown into the Typography panel (group="typography").
 */
const withFontFamilyControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        const { name, attributes, setAttributes, isSelected } = props;

        if ( ! ENABLED_BLOCKS.includes( name ) ) {
            return <BlockEdit { ...props } />;
        }

        return (
            <Fragment>
                <BlockEdit { ...props } />
                { isSelected && (
                    <InspectorControls group="typography">
                        <SelectControl
                            label={ __( 'Font Family', 'red-egg' ) }
                            value={ attributes[ ATTR ] || '' }
                            options={ FONT_OPTIONS }
                            onChange={ ( value ) =>
                                setAttributes( { [ ATTR ]: value } )
                            }
                            __nextHasNoMarginBottom
                        />
                    </InspectorControls>
                ) }
            </Fragment>
        );
    };
}, 'withFontFamilyControl' );

addFilter(
    'editor.BlockEdit',
    'red-egg/font-family-control',
    withFontFamilyControl
);

/**
 * 3. Reflect the class on the block wrapper in the editor canvas so
 *    the preview updates live.
 */
const withFontFamilyClassEditor = createHigherOrderComponent(
    ( BlockListBlock ) => {
        return ( props ) => {
            const { name, attributes } = props;
            const font = ENABLED_BLOCKS.includes( name )
                ? attributes[ ATTR ]
                : '';

            if ( ! font ) {
                return <BlockListBlock { ...props } />;
            }

            return (
                <BlockListBlock
                    { ...props }
                    className={
                        ( props.className || '' ) + ' font-' + font
                    }
                />
            );
        };
    },
    'withFontFamilyClassEditor'
);

addFilter(
    'editor.BlockListBlock',
    'red-egg/font-family-class-editor',
    withFontFamilyClassEditor
);

/**
 * 4. Write the class to the saved markup (frontend).
 */
addFilter(
    'blocks.getSaveContent.extraProps',
    'red-egg/font-family-save',
    function ( extraProps, blockType, attributes ) {
        if ( ! ENABLED_BLOCKS.includes( blockType.name ) ) {
            return extraProps;
        }
        const font = attributes[ ATTR ];
        if ( font ) {
            extraProps.className =
                ( extraProps.className || '' ) + ' font-' + font;
        }
        return extraProps;
    }
);
