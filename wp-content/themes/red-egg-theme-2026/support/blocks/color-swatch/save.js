/**
 * Color Swatch – Save Component
 */

const { useBlockProps } = wp.blockEditor;

const SaveColorSwatch = ( { attributes } ) => {
    const { color, label, labelColor } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'color-swatch' + ( labelColor === 'white' ? ' color-swatch--label-white' : '' ),
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
