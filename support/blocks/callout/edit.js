/**
 * Callout Block – Edit Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

const TEMPLATE = [
    [ 'core/heading', { level: 3, placeholder: __( 'Callout title…', 'red-egg' ) } ],
    [ 'core/paragraph', { placeholder: __( 'Callout text…', 'red-egg' ) } ],
];

const EditCallout = ( { attributes, setAttributes } ) => {
    const { icon } = attributes;

    const blockProps = useBlockProps( {
        className: 'callout-block',
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Callout Settings', 'red-egg' ) } initialOpen={ true }>
                    <TextControl
                        label={ __( 'Icon class (Font Awesome)', 'red-egg' ) }
                        help={ __( 'e.g. fa-solid fa-triangle-exclamation. Leave blank for no icon.', 'red-egg' ) }
                        value={ icon }
                        onChange={ ( val ) => setAttributes( { icon: val } ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <div className="callout-block__inner">
                    { icon && (
                        <span className="callout-block__icon">
                            <i className={ icon }></i>
                        </span>
                    ) }
                    <div className="callout-block__content">
                        <InnerBlocks template={ TEMPLATE } />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditCallout;
