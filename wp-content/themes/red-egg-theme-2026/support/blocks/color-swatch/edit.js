/**
 * Color Swatch – Edit Component
 *
 * Renders a colored rectangle with editable label.
 * ColorPicker in InspectorControls for setting the swatch color,
 * plus a white/gray ColorPalette for the label text color.
 */

const { Fragment } = wp.element;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, ColorPicker, ColorPalette, TextControl } = wp.components;
const { __ } = wp.i18n;

const labelColors = [
    { name: __( 'Gray', 'red-egg' ), color: '#424042', slug: 'gray' },
    { name: __( 'White', 'red-egg' ), color: '#FFFFFF', slug: 'white' },
];

const EditColorSwatch = ( { attributes, setAttributes } ) => {
    const { color, label, labelColor } = attributes;

    const blockProps = useBlockProps( {
        className: 'color-swatch' + ( labelColor === 'white' ? ' color-swatch--label-white' : '' ),
    } );

    const setLabelColor = ( value ) => {
        const found = labelColors.find( ( c ) => c.color === value );
        setAttributes( { labelColor: found ? found.slug : 'gray' } );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Swatch Color', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <ColorPicker
                        color={ color }
                        onChangeComplete={ ( val ) => setAttributes( { color: val.hex } ) }
                        disableAlpha
                    />
                    <TextControl
                        label={ __( 'Color Label', 'red-egg' ) }
                        value={ label }
                        onChange={ ( val ) => setAttributes( { label: val } ) }
                        placeholder={ __( 'BLUE', 'red-egg' ) }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Label Color', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <ColorPalette
                        colors={ labelColors }
                        value={ labelColors.find( ( c ) => c.slug === labelColor )?.color }
                        onChange={ setLabelColor }
                        disableCustomColors={ true }
                        clearable={ false }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <div
                    className="color-swatch__color"
                    style={ { backgroundColor: color } }
                ></div>
                <div className="color-swatch__label-wrap">
                    <input
                        type="text"
                        className="color-swatch__label-input"
                        value={ label }
                        onChange={ ( e ) => setAttributes( { label: e.target.value } ) }
                        placeholder={ __( 'COLOR NAME', 'red-egg' ) }
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default EditColorSwatch;
