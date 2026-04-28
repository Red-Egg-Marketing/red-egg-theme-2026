/**
 * Color Swatch – Save Component
 */

const { useBlockProps } = wp.blockEditor;

const SaveColorSwatch = ( { attributes } ) => {
    const { color, label } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'color-swatch',
    } );

    return (
        <div { ...blockProps }>
            <div
                className="color-swatch__color"
                style={ { backgroundColor: color } }
            ></div>
            { label && (
                <p className="color-swatch__label">{ label }</p>
            ) }
        </div>
    );
};

export default SaveColorSwatch;
