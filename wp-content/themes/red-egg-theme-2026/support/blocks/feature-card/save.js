/**
 * Feature Card Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

import { BLOB_SHAPES } from './shapes.js';

const SaveFeatureCard = ( { attributes } ) => {
    const { faClass, icon, iconAlt, svgMarkup, iconShape, iconColor } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'feature-card',
    } );

    let iconEl;
    if ( faClass ) {
        const isBlob = iconShape && iconShape !== 'circle' && BLOB_SHAPES[ iconShape ];
        const shapeClass = isBlob ? ' feature-card__icon--blob feature-card__icon--' + iconShape : '';
        iconEl = (
            <div className={ 'feature-card__icon feature-card__icon--fa' + shapeClass }>
                { isBlob && (
                    <span
                        className="feature-card__icon-shape"
                        dangerouslySetInnerHTML={ { __html: BLOB_SHAPES[ iconShape ] } }
                    />
                ) }
                <i className={ faClass } style={ iconColor ? { color: iconColor } : {} }></i>
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
