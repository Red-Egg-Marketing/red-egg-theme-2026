/**
 * Color Swatch – Edit Component
 *
 * Renders a colored rectangle with editable label.
 * ColorPicker in InspectorControls for setting the swatch color.
 */

const { Fragment } = wp.element;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, ColorPicker, TextControl } = wp.components;
const { __ } = wp.i18n;

const EditColorSwatch = ( { attributes, setAttributes } ) => {
    const { color, label } = attributes;

    const blockProps = useBlockProps( {
        className: 'color-swatch',
    } );

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
