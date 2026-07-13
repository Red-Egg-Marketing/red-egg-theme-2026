/**
 * Icon Card Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveIconCard = ( { attributes } ) => {
    const { icon, iconAlt, svgMarkup } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'icon-card',
    } );

    let iconEl;
    if ( svgMarkup ) {
        iconEl = (
            <div
                className="icon-card__icon icon-card__icon--svg"
                dangerouslySetInnerHTML={ { __html: svgMarkup } }
            />
        );
    } else if ( icon ) {
        iconEl = (
            <div className="icon-card__icon icon-card__icon--img">
                <img src={ icon } alt={ iconAlt || '' } loading="lazy" />
            </div>
        );
    } else {
        iconEl = null;
    }

    return (
        <div { ...blockProps }>
            { iconEl }
            <div className="icon-card__content">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default SaveIconCard;
