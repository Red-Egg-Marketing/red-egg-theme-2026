/**
 * Feature Card Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveFeatureCard = ( { attributes } ) => {
    const { faClass, icon, iconAlt, svgMarkup } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'feature-card',
    } );

    let iconEl;
    if ( faClass ) {
        iconEl = (
            <div className="feature-card__icon feature-card__icon--fa">
                <i className={ faClass }></i>
            </div>
        );
    } else if ( svgMarkup ) {
        iconEl = (
            <div
                className="feature-card__icon feature-card__icon--svg"
                dangerouslySetInnerHTML={ { __html: svgMarkup } }
            />
        );
    } else if ( icon ) {
        iconEl = (
            <div className="feature-card__icon feature-card__icon--img">
                <img src={ icon } alt={ iconAlt || '' } loading="lazy" />
            </div>
        );
    } else {
        iconEl = null;
    }

    return (
        <div { ...blockProps }>
            { iconEl }
            <div className="feature-card__content">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default SaveFeatureCard;
